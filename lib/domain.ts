import type { FundingType, Scholarship, StudyLevel } from "@/data/scholarships";

export type StudentProfile = {
  region: string;
  studyLevel: StudyLevel | "";
  field: string;
  destination: string;
  fundingType: FundingType | "";
  deadlineBefore: string;
};

export const emptyProfile: StudentProfile = { region: "", studyLevel: "", field: "", destination: "", fundingType: "", deadlineBefore: "" };

export function isProfile(value: unknown): value is StudentProfile {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const p = value as Record<string, unknown>;
  if (!Object.keys(emptyProfile).every((key) => typeof p[key] === "string")) return false;
  if (!Object.keys(p).every((key) => Object.hasOwn(emptyProfile, key))) return false;
  if (!["", "undergraduate", "postgraduate", "doctoral"].includes(p.studyLevel as string) || !["", "full", "tuition", "partial", "varies"].includes(p.fundingType as string)) return false;
  const date = p.deadlineBefore as string;
  return !date || (/^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date);
}

export type CriterionResult = {
  label: string;
  status: "match" | "mismatch" | "unknown";
  detail: string;
};

export type EligibilityResult = {
  scholarshipId: string;
  score: number;
  criteria: CriterionResult[];
  summary: string;
};

const normalized = (value: string) => value.trim().toLowerCase();
const unspecifiedCountry = (value: string) => !value.trim() || normalized(value) === "any country";
const listed = (values: string[], value: string) => values.some((entry) => normalized(entry) === normalized(value));

const listedField = (values: string[], value: string) => values.some((entry) => normalized(entry) === normalized(value));

function countryStatus(scholarship: Scholarship, value: string): CriterionResult["status"] {
  if (unspecifiedCountry(value)) return "unknown";
  if (scholarship.countryEvidence === "worldwide") return "match";
  if (listed(scholarship.eligibleRegions, value)) return scholarship.countryEvidence === "complete" || scholarship.countryEvidence === "partial" ? "match" : "unknown";
  return scholarship.countryEvidence === "complete" ? "mismatch" : "unknown";
}

function fieldStatus(scholarship: Scholarship, value: string): CriterionResult["status"] {
  if (!value.trim()) return "unknown";
  if (scholarship.fieldEvidence === "broad" || listedField(scholarship.fields, value)) return "match";
  return scholarship.fieldEvidence === "specific" ? "mismatch" : "unknown";
}

function studyLevelsFor(profile: StudentProfile, scholarship: Scholarship): StudyLevel[] {
  return Object.entries(scholarship.studyLevelsByRegion ?? {}).find(([region]) => normalized(region) === normalized(profile.region))?.[1] ?? scholarship.studyLevels;
}

export type RankedScholarship = Scholarship & {
  eligibility: EligibilityResult;
  ranking: { rank: number; tiedCount: number; explanation: string };
};

export function checkEligibility(profile: StudentProfile, scholarship: Scholarship): EligibilityResult {
  const studyLevels = studyLevelsFor(profile, scholarship);
  const criteria: CriterionResult[] = [
    {
      label: "Study level",
      status: profile.studyLevel ? (studyLevels.includes(profile.studyLevel) ? "match" : "mismatch") : "unknown",
      detail: profile.studyLevel ? `${studyLevels.join(", ")} listed; check programme-specific conditions` : "Add your study level to check",
    },
    {
      label: "Field of study",
      status: fieldStatus(scholarship, profile.field),
      detail: profile.field ? `${scholarship.fields.join(", ")} · ${scholarship.fieldEvidence.replaceAll("-", " ")} evidence` : "Add your intended study subject to check",
    },
    {
      label: "Applicant citizenship or country route",
      status: countryStatus(scholarship, profile.region),
      detail: !unspecifiedCountry(profile.region) ? `${scholarship.eligibleRegions.join(", ")} · ${scholarship.countryEvidence.replaceAll("-", " ")} evidence; residence or fee status may also apply` : "Add your citizenship or programme country route to check",
    },
    {
      label: "Study destination",
      status: unspecifiedCountry(profile.destination) || scholarship.destinations.includes("Any country") ? "unknown" : (listed(scholarship.destinations, profile.destination) ? "match" : "mismatch"),
      detail: scholarship.destinations.includes("Any country") ? "Destination depends on the selected partner or programme" : profile.destination ? `${scholarship.destinations.join(", ")}` : "Destination is optional",
    },
    {
      label: "Current application route",
      status: scholarship.applicationReady && scholarship.cycleStatus === "open" ? "match" : scholarship.cycleStatus === "closed" ? "mismatch" : "unknown",
      detail: scholarship.applicationReady && scholarship.cycleStatus === "open" ? "Current route and core steps are recorded" : scholarship.cycleStatus === "closed" ? "The last verified cycle is closed" : "Select the exact course, partner, country call or current cycle before applying",
    },
  ];

  const score = criteria.filter((criterion) => criterion.status === "match").length / criteria.length;
  const mismatches = criteria.filter((criterion) => criterion.status === "mismatch").length;
  const summary = mismatches ? "Review the mismatch before applying" : criteria.some((criterion) => criterion.status === "unknown") ? "Partial profile match — verify unknown criteria" : "Known profile criteria match — verify provider requirements";
  return { scholarshipId: scholarship.id, score, criteria, summary };
}

export function searchScholarships(profile: StudentProfile, allScholarships: Scholarship[]): RankedScholarship[] {
  const results = allScholarships
    .filter((scholarship) => !profile.studyLevel || studyLevelsFor(profile, scholarship).includes(profile.studyLevel))
    .filter((scholarship) => !profile.field || fieldStatus(scholarship, profile.field) !== "mismatch")
    .filter((scholarship) => !profile.region || countryStatus(scholarship, profile.region) !== "mismatch")
    .filter((scholarship) => unspecifiedCountry(profile.destination) || scholarship.destinations.includes("Any country") || listed(scholarship.destinations, profile.destination))
    .filter((scholarship) => !profile.fundingType || scholarship.fundingType === profile.fundingType)
    .filter((scholarship) => !profile.deadlineBefore || (!!scholarship.deadlineDate && scholarship.deadlineDate <= profile.deadlineBefore && scholarship.cycleStatus !== "closed"))
    .map((scholarship) => ({ ...scholarship, eligibility: checkEligibility(profile, scholarship) }))
    .sort((a, b) => b.eligibility.score - a.eligibility.score || a.title.localeCompare(b.title, "en") || a.id.localeCompare(b.id, "en"));
  return results.map((scholarship) => ({
    ...scholarship,
    ranking: {
      rank: results.findIndex((result) => result.eligibility.score === scholarship.eligibility.score) + 1,
      tiedCount: results.filter((result) => result.eligibility.score === scholarship.eligibility.score).length,
      explanation: "Ranked only by confirmed catalog signals out of five checks; unknowns add no points. Equal scores share a rank and appear alphabetically. Directory records, closed cycles and application-readiness are not quality judgments.",
    },
  }));
}

export function checklistId(scholarshipId: string, label: string) {
  // Identity follows the requirement, never its position. Changed text needs fresh review.
  return `${scholarshipId}:document:${encodeURIComponent(label)}`;
}

export function createChecklist(scholarship: Scholarship, checked: Record<string, boolean> = {}) {
  return scholarship.documents.map((label) => {
    const id = checklistId(scholarship.id, label);
    return { id, label, completed: checked[id] === true };
  });
}

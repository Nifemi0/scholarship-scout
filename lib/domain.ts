import type { Scholarship, StudyLevel } from "@/data/scholarships";

export type StudentProfile = {
  region: string;
  studyLevel: StudyLevel | "";
  field: string;
  destination: string;
  deadlineBefore: string;
};

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

const matches = (values: string[], value: string) =>
  !value || values.some((entry) => entry.toLowerCase() === value.toLowerCase()) || values.includes("Any country");

export function checkEligibility(profile: StudentProfile, scholarship: Scholarship): EligibilityResult {
  const criteria: CriterionResult[] = [
    {
      label: "Study level",
      status: profile.studyLevel ? (scholarship.studyLevels.includes(profile.studyLevel) ? "match" : "mismatch") : "unknown",
      detail: profile.studyLevel ? `${scholarship.studyLevels.join(", ")} accepted` : "Add your study level to check",
    },
    {
      label: "Field of study",
      status: profile.field ? (scholarship.fields.some((field) => field.toLowerCase() === profile.field.toLowerCase()) ? "match" : "unknown") : "unknown",
      detail: profile.field ? `${scholarship.fields.join(", ")}` : "Add your field to check",
    },
    {
      label: "Applicant region",
      status: profile.region ? (matches(scholarship.eligibleRegions, profile.region) ? "match" : "mismatch") : "unknown",
      detail: profile.region ? `${scholarship.eligibleRegions.join(", ")}` : "Add your location to check",
    },
    {
      label: "Study destination",
      status: profile.destination ? (matches(scholarship.destinations, profile.destination) ? "match" : "unknown") : "unknown",
      detail: profile.destination ? `${scholarship.destinations.join(", ")}` : "Destination is optional",
    },
  ];

  const score = criteria.reduce((total, criterion) => total + (criterion.status === "match" ? 1 : criterion.status === "unknown" ? 0.5 : 0), 0) / criteria.length;
  const mismatches = criteria.filter((criterion) => criterion.status === "mismatch").length;
  const summary = mismatches ? "Review the mismatch before applying" : score >= 0.75 ? "Strong starting match" : "Promising, but more information is needed";
  return { scholarshipId: scholarship.id, score, criteria, summary };
}

export function searchScholarships(profile: StudentProfile, allScholarships: Scholarship[]): Scholarship[] {
  return allScholarships
    .filter((scholarship) => !profile.studyLevel || scholarship.studyLevels.includes(profile.studyLevel))
    .filter((scholarship) => !profile.field || scholarship.fields.some((field) => field.toLowerCase() === profile.field.toLowerCase()))
    .filter((scholarship) => !profile.region || matches(scholarship.eligibleRegions, profile.region))
    .filter((scholarship) => !profile.deadlineBefore || scholarship.deadline <= profile.deadlineBefore)
    .sort((a, b) => b.lastVerified.localeCompare(a.lastVerified));
}

export function createChecklist(scholarship: Scholarship) {
  return scholarship.documents.map((label, index) => ({ id: `${scholarship.id}-${index}`, label, completed: false }));
}

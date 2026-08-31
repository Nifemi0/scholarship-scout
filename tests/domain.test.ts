import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scholarships } from "../data/scholarships";
import { checkEligibility, createChecklist, searchScholarships, type StudentProfile } from "../lib/domain";

const profile: StudentProfile = { region: "Nigeria", studyLevel: "undergraduate", field: "Computer Science", destination: "", fundingType: "", deadlineBefore: "" };

describe("scholarship matching", () => {
  it("honors a destination filter without excluding partner-dependent destinations", () => {
    const results = searchScholarships({ ...profile, studyLevel: "", destination: " canada " }, scholarships);
    assert.ok(results.some((result) => result.id === "lester-b-pearson"));
    assert.ok(results.some((result) => result.id === "mastercard-scholars"));
    assert.ok(results.every((result) => result.destinations.includes("Canada") || result.destinations.includes("Any country")));
    assert.equal(checkEligibility({ ...profile, destination: "Canada" }, scholarships.find((s) => s.id === "chevening")!).criteria.find((c) => c.label === "Study destination")?.status, "mismatch");
  });

  it("treats the Any country profile option as an unspecified region", () => {
    const broad = { ...profile, studyLevel: "" as const };
    assert.deepEqual(searchScholarships({ ...broad, region: "Any country" }, scholarships), searchScholarships({ ...broad, region: "" }, scholarships));
    assert.equal(checkEligibility({ ...profile, region: "Any country" }, scholarships[0]).criteria.find((c) => c.label === "Applicant citizenship or country route")?.status, "unknown");
  });

  it("does not treat missing profile facts as a strong match", () => {
    const result = checkEligibility({ ...profile, studyLevel: "", destination: "" }, scholarships[0]);
    assert.equal(result.score, 0);
    assert.equal(result.summary, "Partial profile match — verify unknown criteria");
  });

  it("gives tied results the same rank and stable alphabetical order", () => {
    const tied = scholarships.filter((s) => ["commonwealth-masters", "chevening"].includes(s.id));
    const results = searchScholarships({ ...profile, studyLevel: "", deadlineBefore: "" }, tied);
    assert.deepEqual(results.map((s) => s.id), ["chevening", "commonwealth-masters"]);
    assert.deepEqual(results.map((s) => s.ranking.rank), [1, 2]);
    assert.ok(results.every((s) => s.ranking.tiedCount === 1));
    assert.deepEqual(results, searchScholarships({ ...profile, studyLevel: "" }, [...tied].reverse()));
  });

  it("excludes Manaaki for Nigeria and respects country-specific study levels", () => {
    const manaaki = scholarships.find((s) => s.id === "manaaki-new-zealand")!;
    assert.ok(!searchScholarships({ ...profile, studyLevel: "" }, [manaaki]).length);
    assert.ok(!searchScholarships({ ...profile, region: "Fiji" }, [manaaki]).length);
    assert.equal(searchScholarships({ ...profile, region: "Fiji", studyLevel: "postgraduate" }, [manaaki]).length, 1);
    assert.equal(searchScholarships({ ...profile, region: "Timor-Leste", studyLevel: "undergraduate" }, [manaaki]).length, 1);
    assert.equal(manaaki.sourceUrl, "https://www.nzscholarships.govt.nz/check-eligible-countries/");
  });

  it("finds a relevant undergraduate computer science opportunity", () => {
    const results = searchScholarships(profile, scholarships);
    assert.ok(results.map((result) => result.id).includes("mastercard-scholars"));
    assert.equal(checkEligibility(profile, scholarships.find((item) => item.id === "mastercard-scholars")!).criteria.find((criterion) => criterion.label === "Applicant citizenship or country route")?.status, "unknown");
  });

  it("reports a clear mismatch for an incompatible study level", () => {
    const result = checkEligibility(profile, scholarships.find((item) => item.id === "commonwealth-masters")!);
    assert.equal(result.criteria.find((criterion) => criterion.label === "Study level")?.status, "mismatch");
  });

  it("preserves unknown when the student leaves a field blank", () => {
    const result = checkEligibility({ ...profile, field: "" }, scholarships[0]);
    assert.equal(result.criteria.find((criterion) => criterion.label === "Field of study")?.status, "unknown");
  });

  it("filters out scholarships after the requested deadline", () => {
    const results = searchScholarships({ ...profile, deadlineBefore: "2026-09-30" }, scholarships);
    assert.equal(results.length, 0, "unknown deadlines must not pass a requested deadline cutoff");
    assert.ok(results.every((result) => result.deadlineDate && result.deadlineDate <= "2026-09-30" && result.cycleStatus !== "closed"));
  });

  it("filters the catalog by funding type", () => {
    const results = searchScholarships({ ...profile, fundingType: "full" }, scholarships);
    assert.ok(results.length > 0);
    assert.ok(results.every((result) => result.fundingType === "full"));
  });

  it("contains the scoped real catalog with official sources", () => {
    assert.ok(scholarships.length >= 30);
    assert.ok(scholarships.every((scholarship) => scholarship.sourceUrl.startsWith("https://") && scholarship.sourceAuthority && scholarship.verificationStatus && scholarship.lastVerified));
  });

  it("corrects the highest-risk audited records", () => {
    const vlir = scholarships.find((item) => item.id === "vlir-uos")!;
    const monash = scholarships.find((item) => item.id === "monash-leadership")!;
    const swiss = scholarships.find((item) => item.id === "swiss-government-excellence")!;
    assert.equal(checkEligibility(profile, vlir).criteria.find((criterion) => criterion.label === "Applicant citizenship or country route")?.status, "unknown");
    assert.deepEqual(monash.studyLevels, ["undergraduate"]);
    assert.equal(monash.fundingType, "tuition");
    assert.ok(monash.documents.some((item) => item.includes("No separate scholarship application")));
    assert.ok(swiss.sourceUrl.includes("sbfi.admin.ch"));
    assert.equal(swiss.fundingType, "partial");
  });

  it("creates one checklist task per required document", () => {
    assert.equal(createChecklist(scholarships[0]).length, scholarships[0].documents.length);
  });
});

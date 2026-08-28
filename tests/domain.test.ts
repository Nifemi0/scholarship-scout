import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scholarships } from "../data/scholarships";
import { checkEligibility, createChecklist, searchScholarships, type StudentProfile } from "../lib/domain";

const profile: StudentProfile = { region: "Nigeria", studyLevel: "undergraduate", field: "Computer Science", destination: "", deadlineBefore: "2026-12-31" };

describe("scholarship matching", () => {
  it("finds a relevant undergraduate computer science opportunity", () => {
    const results = searchScholarships(profile, scholarships);
    assert.ok(results.map((result) => result.id).includes("mastercard-scholars"));
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
    assert.ok(results.every((result) => !result.deadlineDate || result.deadlineDate <= "2026-09-30"));
  });

  it("creates one checklist task per required document", () => {
    assert.equal(createChecklist(scholarships[0]).length, scholarships[0].documents.length);
  });
});

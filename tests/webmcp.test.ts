import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scholarships } from "../data/scholarships";
import { registerScholarshipTools } from "../lib/webmcp";
import type { StudentProfile } from "../lib/domain";

describe("WebMCP tool registration", () => {
  it("shares agent search profiles with the UI and subsequent eligibility calls", () => {
    const registered: Array<{ name: string; execute: (input: Record<string, unknown>) => unknown }> = [];
    let current: StudentProfile = { region: "Nigeria", studyLevel: "", field: "Computer Science", destination: "", fundingType: "", deadlineBefore: "" };
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, "document", { configurable: true, value: { modelContext: { registerTool: (tool: typeof registered[number]) => registered.push(tool) } } });
    try {
      registerScholarshipTools({ getChecked: () => ({}), setComparison: () => undefined, scholarships, getProfile: () => current, setProfile: (profile) => { current = profile; }, saveShortlist: () => undefined, updateChecklist: () => undefined, getScholarship: (id) => scholarships.find((item) => item.id === id) });
      const search = registered.find((tool) => tool.name === "search_scholarships")!;
      const eligibility = registered.find((tool) => tool.name === "check_eligibility")!;
      search.execute({ studyLevel: "undergraduate", destination: "Canada" });
      assert.equal(current.studyLevel, "undergraduate");
      assert.equal(current.destination, "Canada");
      assert.equal(current.region, "Nigeria");
      const result = eligibility.execute({ scholarshipId: "commonwealth-masters" }) as { criteria: Array<{ label: string; status: string }> };
      assert.equal(result.criteria.find((c) => c.label === "Study level")?.status, "mismatch");
      assert.equal(result.criteria.find((c) => c.label === "Study destination")?.status, "mismatch");
      current = { ...current, studyLevel: "postgraduate" };
      const edited = eligibility.execute({ scholarshipId: "commonwealth-masters" }) as typeof result;
      assert.equal(edited.criteria.find((c) => c.label === "Study level")?.status, "match");
      search.execute({ destination: "" });
      assert.equal(current.destination, "");
    } finally {
      Object.defineProperty(globalThis, "document", { configurable: true, value: originalDocument });
    }
  });

  it("registers the six scoped tools with strict object schemas", () => {
    const registered: Array<{ name: string; inputSchema: Record<string, unknown> }> = [];
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, "document", { configurable: true, value: { modelContext: { registerTool: (tool: typeof registered[number]) => registered.push(tool) } } });
    try {
      registerScholarshipTools({ getChecked: () => ({}), setComparison: () => undefined, scholarships, getProfile: () => ({ region: "Nigeria", studyLevel: "undergraduate", field: "Computer Science", destination: "", fundingType: "", deadlineBefore: "2026-12-31" }), setProfile: () => undefined, saveShortlist: () => undefined, updateChecklist: () => undefined, getScholarship: (id) => scholarships.find((item) => item.id === id) });
      assert.deepEqual(registered.map((tool) => tool.name), ["search_scholarships", "check_eligibility", "compare_scholarships", "save_to_shortlist", "generate_application_checklist", "update_checklist_item"]);
      assert.equal(registered.every((tool) => tool.inputSchema.additionalProperties === false), true);
    } finally {
      Object.defineProperty(globalThis, "document", { configurable: true, value: originalDocument });
    }
  });

  it("does not mutate shortlist state without explicit confirmation", () => {
    const registered: Array<{ name: string; execute: (input: Record<string, unknown>) => unknown }> = [];
    let saved = false;
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, "document", { configurable: true, value: { modelContext: { registerTool: (tool: typeof registered[number]) => registered.push(tool) } } });
    try {
      registerScholarshipTools({ getChecked: () => ({}), setComparison: () => undefined, scholarships, getProfile: () => ({ region: "", studyLevel: "", field: "", destination: "", fundingType: "", deadlineBefore: "" }), setProfile: () => undefined, saveShortlist: () => { saved = true; }, updateChecklist: () => undefined, getScholarship: (id) => scholarships.find((item) => item.id === id) });
      const saveTool = registered.find((tool) => tool.name === "save_to_shortlist")!;
      assert.deepEqual(saveTool.execute({ scholarshipId: "mastercard-scholars" }), { saved: false, requiresConfirmation: true, scholarshipId: "mastercard-scholars" });
      assert.equal(saved, false);
      saveTool.execute({ scholarshipId: "mastercard-scholars", confirmedByStudent: true });
      assert.equal(saved, true);
    } finally {
      Object.defineProperty(globalThis, "document", { configurable: true, value: originalDocument });
    }
  });
});

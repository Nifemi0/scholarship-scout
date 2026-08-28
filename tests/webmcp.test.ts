import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scholarships } from "../data/scholarships";
import { registerScholarshipTools } from "../lib/webmcp";

describe("WebMCP tool registration", () => {
  it("registers the six scoped tools with strict object schemas", () => {
    const registered: Array<{ name: string; inputSchema: Record<string, unknown> }> = [];
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, "document", { configurable: true, value: { modelContext: { registerTool: (tool: typeof registered[number]) => registered.push(tool) } } });
    try {
      registerScholarshipTools({ scholarships, getProfile: () => ({ region: "Nigeria", studyLevel: "undergraduate", field: "Computer Science", destination: "", fundingType: "", deadlineBefore: "2026-12-31" }), saveShortlist: () => undefined, updateChecklist: () => undefined, getScholarship: (id) => scholarships.find((item) => item.id === id) });
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
      registerScholarshipTools({ scholarships, getProfile: () => ({ region: "", studyLevel: "", field: "", destination: "", fundingType: "", deadlineBefore: "" }), saveShortlist: () => { saved = true; }, updateChecklist: () => undefined, getScholarship: (id) => scholarships.find((item) => item.id === id) });
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

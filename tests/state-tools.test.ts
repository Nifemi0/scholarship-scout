import assert from "node:assert/strict";
import { test } from "node:test";
import { scholarships } from "../data/scholarships";
import { createChecklist, emptyProfile } from "../lib/domain";
import { registerScholarshipTools } from "../lib/webmcp";

test("agent mutations validate identity and share completion/comparison immediately", () => {
  const original = globalThis.document;
  const tools: Array<{ name: string; execute: (input: Record<string, unknown>) => unknown }> = [];
  const saved: string[] = [];
  let checked: Record<string, boolean> = {};
  let comparison: string[] = [];
  let profile = { ...emptyProfile };
  Object.defineProperty(globalThis, "document", { configurable: true, value: { modelContext: { registerTool: (tool: typeof tools[number]) => tools.push(tool) } } });
  try {
    registerScholarshipTools({ scholarships, getProfile: () => profile, setProfile: (next) => { profile = next; }, getChecked: () => checked, setComparison: (ids) => { comparison = ids; }, saveShortlist: (id) => saved.push(id), updateChecklist: (id, value) => { checked = { ...checked, [id]: value }; }, getScholarship: (id) => scholarships.find((item) => item.id === id) });
    const call = (name: string, input: Record<string, unknown>) => tools.find((tool) => tool.name === name)!.execute(input);
    const failed = (result: unknown) => assert.ok((result as { error?: string }).error);
    failed(call("save_to_shortlist", { scholarshipId: "missing", confirmedByStudent: true }));
    failed(call("update_checklist_item", { itemId: "missing", completed: true, confirmedByStudent: true }));
    assert.deepEqual(saved, []);
    assert.deepEqual(checked, {});
    const item = createChecklist(scholarships[0])[0];
    failed(call("update_checklist_item", { itemId: item.id, completed: "false", confirmedByStudent: true }));
    call("update_checklist_item", { itemId: item.id, completed: true });
    assert.deepEqual(checked, {});
    call("update_checklist_item", { itemId: item.id, completed: true, confirmedByStudent: true });
    let tasks = call("generate_application_checklist", { scholarshipId: scholarships[0].id }) as ReturnType<typeof createChecklist>;
    assert.equal(tasks[0].completed, true);
    checked = { [item.id]: false }; // Same getter also reflects manual UI changes.
    tasks = call("generate_application_checklist", { scholarshipId: scholarships[0].id }) as typeof tasks;
    assert.equal(tasks[0].completed, false);
    const ids = scholarships.slice(0, 3).map((s) => s.id);
    assert.equal((call("compare_scholarships", { scholarshipIds: ids }) as unknown[]).length, 3);
    assert.deepEqual(comparison, ids);
    for (const invalid of [[ids[0], "missing"], [ids[0], ids[0]], [ids[0]], [...ids, scholarships[3].id]]) failed(call("compare_scholarships", { scholarshipIds: invalid }));
    assert.deepEqual(comparison, ids);
    for (const invalid of [{ region: 42 }, { deadlineBefore: "not-a-date" }, { studyLevel: "wrong" }, { extra: "unexpected" }]) failed(call("search_scholarships", invalid));
    assert.deepEqual(profile, emptyProfile);
  } finally {
    Object.defineProperty(globalThis, "document", { configurable: true, value: original });
  }
});

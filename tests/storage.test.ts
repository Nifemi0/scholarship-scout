import assert from "node:assert/strict";
import { test } from "node:test";
import { scholarships } from "../data/scholarships";
import { createChecklist, emptyProfile, isProfile } from "../lib/domain";
import { isChecked, loadBrowserState, migrateChecklist, saveBrowserValue, storageKeys } from "../lib/storage";

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return { data, getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } };
}

test("new users have no implicit nationality, subject or deadline", () => {
  const storage = memoryStorage();
  assert.ok(Object.values(loadBrowserState(storage, scholarships).profile).every((v) => v === ""));
  assert.equal(storage.data.size, 0);
});

test("corrupt profile does not discard or rewrite other valid state", () => {
  const storage = memoryStorage({ [storageKeys.profile]: "{bad", [storageKeys.shortlist]: '["chevening"]', [storageKeys.checked]: '{"stable-task":true}' });
  const before = [...storage.data];
  const state = loadBrowserState(storage, scholarships);
  assert.deepEqual(state.profile, emptyProfile);
  assert.deepEqual(state.shortlist, ["chevening"]);
  assert.equal(state.checked["stable-task"], true);
  assert.equal(state.warnings.length, 1);
  assert.deepEqual([...storage.data], before);
});

test("valid JSON with wrong types cannot reach page state", () => {
  for (const payload of ["null", "[]", "42", '{"region":42}', JSON.stringify({ ...emptyProfile, region: 42 })]) {
    const state = loadBrowserState(memoryStorage({ [storageKeys.profile]: payload, [storageKeys.shortlist]: "null", [storageKeys.checked]: "[]" }), scholarships);
    assert.deepEqual(state.profile, emptyProfile);
    assert.deepEqual(state.shortlist, []);
    assert.deepEqual(state.checked, {});
  }
});

test("profile validation rejects wrong enums, impossible dates and unknown fields", () => {
  assert.equal(isProfile({ ...emptyProfile, deadlineBefore: "2026-02-30" }), false);
  assert.equal(isProfile({ ...emptyProfile, studyLevel: "wrong" }), false);
  assert.equal(isProfile({ ...emptyProfile, extra: "x" }), false);
  assert.equal(isProfile({ ...emptyProfile, deadlineBefore: "2028-02-29" }), true);
});

test("storage failures return safe values and do not throw", () => {
  const storage = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("quota"); } };
  assert.deepEqual(loadBrowserState(storage, scholarships).profile, emptyProfile);
  assert.equal(saveBrowserValue(storage, storageKeys.checked, {}, isChecked), false);
});

test("explicit writes preserve malformed originals in recovery storage", () => {
  const storage = memoryStorage({ [storageKeys.profile]: "{bad" });
  assert.equal(saveBrowserValue(storage, storageKeys.profile, emptyProfile, isProfile), true);
  assert.deepEqual(JSON.parse(storage.getItem(`${storageKeys.profile}-recovery`)!), ["{bad"]);
});

test("backup failure never overwrites the corrupt original", () => {
  const storage = memoryStorage({ [storageKeys.profile]: "{bad" });
  assert.equal(saveBrowserValue({ getItem: storage.getItem, setItem: () => { throw new Error("quota"); } }, storageKeys.profile, emptyProfile, isProfile), false);
  assert.equal(storage.getItem(storageKeys.profile), "{bad");
});

test("stable completion survives reordered tasks but not changed requirements", () => {
  const s = scholarships.find((item) => item.id === "chevening")!;
  const first = createChecklist(s)[0];
  const checked = { [first.id]: true };
  const reordered = createChecklist({ ...s, documents: [...s.documents].reverse() }, checked);
  assert.equal(reordered.find((task) => task.label === first.label)?.completed, true);
  assert.equal(reordered.filter((task) => task.completed).length, 1);
  assert.ok(createChecklist({ ...s, documents: s.documents.slice(1) }, checked).every((task) => !task.completed));
});

test("legacy completion does not transfer when audited requirement labels changed", () => {
  const s = scholarships.find((item) => item.id === "chevening")!;
  const changed = { ...s, documents: [...s.documents].reverse() };
  const checked = migrateChecklist({ "chevening-0": true, "ghost-0": true }, [changed]);
  const tasks = createChecklist(changed, checked);
  assert.ok(tasks.every((task) => !task.completed));
  assert.equal(Object.keys(checked).length, 0);
});

test("legacy checklist remains untouched and v2 wins after explicit updates", () => {
  const storage = memoryStorage({ "scholarship-scout-checklist": '{"chevening-0":true}' });
  const migrated = loadBrowserState(storage, scholarships);
  assert.deepEqual(migrated.checked, {});
  assert.ok(migrated.warnings.some((warning) => warning.includes("no longer match")));
  saveBrowserValue(storage, storageKeys.checked, {}, isChecked);
  assert.deepEqual(loadBrowserState(storage, scholarships).checked, {});
  assert.equal(storage.getItem("scholarship-scout-checklist"), '{"chevening-0":true}');
});

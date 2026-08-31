import type { Scholarship } from "@/data/scholarships";
import { checklistId, emptyProfile, isProfile } from "@/lib/domain";

type BrowserStorage = Pick<Storage, "getItem" | "setItem">;
export const storageKeys = {
  profile: "scholarship-scout-profile",
  shortlist: "scholarship-scout-shortlist",
  checked: "scholarship-scout-checklist-v2",
};

const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
export const isShortlist = (value: unknown): value is string[] => Array.isArray(value) && value.every((id) => typeof id === "string");
export const isChecked = (value: unknown): value is Record<string, boolean> => record(value) && Object.values(value).every((v) => typeof v === "boolean");

// Frozen pre-migration labels: never derive legacy index IDs from a changing catalog.
const legacyCore: Record<string, string[]> = {
  "mastercard-scholars": ["Academic records", "Personal statement", "Partner-specific documents"],
  "commonwealth-masters": ["University qualifications", "Personal statement", "Supporting application evidence"],
  "chevening": ["Course choices", "Leadership and influence essays", "References"],
  "cambridge-mastercard": ["Degree records", "Course application", "Scholarship statement"],
};
const legacyGeneric = new Set(["fulbright-foreign-student", "erasmus-mundus", "daad-epos", "global-korea-scholarship", "mext-scholarship", "turkiye-burslari", "stipendium-hungaricum", "australia-awards", "manaaki-new-zealand", "si-global-professionals", "ireland-fellows", "vlir-uos", "eiffel-excellence", "swiss-government-excellence", "gates-cambridge", "rhodes-scholarship", "clarendon-fund", "knight-hennessy", "schwarzman-scholars", "yenching-academy", "weidenfeld-hoffmann", "lester-b-pearson", "ubc-international-scholars", "york-presidents", "macquarie-vice-chancellor", "monash-leadership"]);

export function migrateChecklist(legacy: Record<string, boolean>, catalog: Scholarship[]) {
  const result: Record<string, boolean> = {};
  for (const scholarship of catalog) {
    const labels = legacyCore[scholarship.id] ?? (legacyGeneric.has(scholarship.id) ? ["Academic records", "Personal statement or study plan", "Provider-specific supporting documents"] : []);
    labels.forEach((label, index) => {
      if (scholarship.documents.includes(label) && typeof legacy[`${scholarship.id}-${index}`] === "boolean") result[checklistId(scholarship.id, label)] = legacy[`${scholarship.id}-${index}`];
    });
  }
  return result;
}

export function loadBrowserState(storage: BrowserStorage, catalog: Scholarship[]) {
  const warnings: string[] = [];
  function read<T>(key: string, fallback: T, valid: (value: unknown) => value is T): T {
    try {
      const raw = storage.getItem(key);
      if (raw === null) return fallback;
      const value: unknown = JSON.parse(raw);
      if (valid(value)) return value;
    } catch { /* Recover each slice independently; loading never writes. */ }
    warnings.push(`Could not restore ${key.replace("scholarship-scout-", "")}. The original saved data has not been changed.`);
    return fallback;
  }
  const profile = read(storageKeys.profile, { ...emptyProfile }, isProfile);
  const shortlist = read(storageKeys.shortlist, [], isShortlist);
  let checked: Record<string, boolean> = {};
  try {
    if (storage.getItem(storageKeys.checked) === null) {
      const legacy = read("scholarship-scout-checklist", {}, isChecked);
      checked = migrateChecklist(legacy, catalog);
      if (Object.values(legacy).filter(Boolean).length > Object.values(checked).filter(Boolean).length) warnings.push("Some older completed tasks no longer match current requirements. Review the new tasks; the original saved checklist is retained.");
    } else checked = read(storageKeys.checked, {}, isChecked);
  } catch { warnings.push("Checklist storage is unavailable. Changes will remain in memory."); }
  return { profile, shortlist: [...new Set(shortlist)], checked, warnings };
}

export function saveBrowserValue(storage: BrowserStorage, key: string, value: unknown, valid: (value: unknown) => boolean) {
  try {
    const raw = storage.getItem(key);
    if (raw !== null) {
      let healthy = false;
      try { healthy = valid(JSON.parse(raw)); } catch { /* Keep corrupt data recoverable. */ }
      if (!healthy) {
        // If backing up fails, do not overwrite the original.
        const recoveryKey = `${key}-recovery`;
        const existing = storage.getItem(recoveryKey);
        const backups: string[] = existing ? JSON.parse(existing) : [];
        if (!Array.isArray(backups) || !backups.every((entry) => typeof entry === "string")) return false;
        if (!backups.includes(raw)) storage.setItem(recoveryKey, JSON.stringify([...backups, raw]));
      }
    }
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch { return false; }
}

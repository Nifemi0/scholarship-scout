import type { Scholarship } from "@/data/scholarships";
import { checkEligibility, createChecklist, isProfile, searchScholarships, type StudentProfile } from "@/lib/domain";

type Tool = { name: string; description: string; inputSchema: Record<string, unknown>; execute: (input: Record<string, unknown>) => unknown };

const objectSchema = (properties: Record<string, unknown>, required: string[] = []) => ({ type: "object", properties, required, additionalProperties: false });

export function registerScholarshipTools(args: {
  scholarships: Scholarship[];
  getProfile: () => StudentProfile;
  setProfile: (profile: StudentProfile) => void;
  saveShortlist: (id: string) => void;
  updateChecklist: (id: string, completed: boolean) => void;
  getChecked: () => Record<string, boolean>;
  setComparison: (ids: string[]) => void;
  getScholarship: (id: string) => Scholarship | undefined;
}) {
  if (typeof document === "undefined") return false;
  const modelContext = (document as Document & { modelContext?: { registerTool: (tool: Tool) => void; unregisterTool?: (name: string) => void } }).modelContext;
  if (!modelContext) return false;

  const tool = (name: string, description: string, inputSchema: Record<string, unknown>, execute: Tool["execute"]): Tool => ({ name, description, inputSchema, execute: (input) => {
    const properties = inputSchema.properties as Record<string, { type: string }>;
    const required = inputSchema.required as string[];
    if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).some((key) => !Object.hasOwn(properties, key)) || required.some((key) => !Object.hasOwn(input, key) && key !== "confirmedByStudent")) return { error: "Invalid tool input" };
    if (Object.entries(input).some(([key, value]) => properties[key].type === "array" ? !Array.isArray(value) : typeof value !== properties[key].type)) return { error: "Invalid tool input type" };
    return execute(input);
  } });
  const registered = [
    tool("search_scholarships", "Search using the student's requested profile and update the visible search filters. Subsequent eligibility checks use this same profile. Results include eligibility and shared ranks: tied scores are not a best-scholarship recommendation. Unknown destinations remain candidates requiring verification.", objectSchema({ region: { type: "string" }, studyLevel: { type: "string", enum: ["", "undergraduate", "postgraduate", "doctoral"] }, field: { type: "string" }, destination: { type: "string" }, fundingType: { type: "string", enum: ["", "full", "tuition", "partial", "varies"] }, deadlineBefore: { type: "string" }}), (input) => {
      const profile = { ...args.getProfile(), ...input } as StudentProfile;
      if (!isProfile(profile)) return { error: "Invalid search profile or date" };
      const results = searchScholarships(profile, args.scholarships);
      args.setProfile(profile);
      return results;
    }),
    tool("check_eligibility", "Explain which scholarship criteria match, mismatch, or remain unknown.", objectSchema({ scholarshipId: { type: "string" } }, ["scholarshipId"]), (input) => { const scholarship = args.getScholarship(String(input.scholarshipId)); return scholarship ? checkEligibility(args.getProfile(), scholarship) : { error: "Scholarship not found" }; }),
    tool("compare_scholarships", "Compare two or three distinct scholarships and show them in the visible comparison workspace.", objectSchema({ scholarshipIds: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 3, uniqueItems: true } }, ["scholarshipIds"]), (input) => {
      const ids = input.scholarshipIds;
      if (!Array.isArray(ids) || ids.length < 2 || ids.length > 3 || ids.some((id) => typeof id !== "string") || new Set(ids).size !== ids.length) return { error: "Choose two or three distinct scholarship IDs" };
      const items = ids.map((id) => args.getScholarship(id));
      if (items.some((item) => !item)) return { error: "Scholarship not found" };
      args.setComparison(ids);
      return items;
    }),
    tool("save_to_shortlist", "Save a scholarship only after the student has confirmed the action.", objectSchema({ scholarshipId: { type: "string" }, confirmedByStudent: { type: "boolean", const: true } }, ["scholarshipId", "confirmedByStudent"]), (input) => { if (typeof input.scholarshipId !== "string" || !args.getScholarship(input.scholarshipId)) return { error: "Scholarship not found", saved: false }; if (input.confirmedByStudent !== true) return { saved: false, requiresConfirmation: true, scholarshipId: input.scholarshipId }; args.saveShortlist(input.scholarshipId); return { saved: true, scholarshipId: input.scholarshipId }; }),
    tool("generate_application_checklist", "Return catalog application tasks with their current saved completion state. Generic catalog tasks still require provider verification.", objectSchema({ scholarshipId: { type: "string" } }, ["scholarshipId"]), (input) => { const scholarship = typeof input.scholarshipId === "string" ? args.getScholarship(input.scholarshipId) : undefined; return scholarship ? createChecklist(scholarship, args.getChecked()) : { error: "Scholarship not found" }; }),
    tool("update_checklist_item", "Update an existing checklist item only after the student has confirmed the action. Use the stable item ID returned by checklist generation.", objectSchema({ itemId: { type: "string" }, completed: { type: "boolean" }, confirmedByStudent: { type: "boolean", const: true } }, ["itemId", "completed", "confirmedByStudent"]), (input) => {
      if (typeof input.itemId !== "string" || typeof input.completed !== "boolean" || !args.scholarships.some((scholarship) => createChecklist(scholarship).some((item) => item.id === input.itemId))) return { error: "Invalid checklist item or completion value", updated: false };
      if (input.confirmedByStudent !== true) return { updated: false, requiresConfirmation: true, itemId: input.itemId };
      args.updateChecklist(input.itemId, input.completed);
      return { updated: true, id: input.itemId, completed: input.completed };
    }),
  ];
  registered.forEach((entry) => modelContext.registerTool(entry));
  return () => registered.forEach((entry) => modelContext.unregisterTool?.(entry.name));
}

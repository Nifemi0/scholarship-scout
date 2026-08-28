import type { Scholarship } from "@/data/scholarships";
import { checkEligibility, createChecklist, searchScholarships, type StudentProfile } from "@/lib/domain";

type Tool = { name: string; description: string; inputSchema: Record<string, unknown>; execute: (input: Record<string, unknown>) => unknown };

const objectSchema = (properties: Record<string, unknown>, required: string[] = []) => ({ type: "object", properties, required, additionalProperties: false });

export function registerScholarshipTools(args: {
  scholarships: Scholarship[];
  getProfile: () => StudentProfile;
  saveShortlist: (id: string) => void;
  updateChecklist: (id: string, completed: boolean) => void;
  getScholarship: (id: string) => Scholarship | undefined;
}) {
  if (typeof document === "undefined") return false;
  const modelContext = (document as Document & { modelContext?: { registerTool: (tool: Tool) => void } }).modelContext;
  if (!modelContext) return false;

  const tool = (name: string, description: string, inputSchema: Record<string, unknown>, execute: Tool["execute"]): Tool => ({ name, description, inputSchema, execute });
  [
    tool("search_scholarships", "Find scholarships matching the student's profile and constraints.", objectSchema({ region: { type: "string" }, studyLevel: { type: "string", enum: ["", "undergraduate", "postgraduate", "doctoral"] }, field: { type: "string" }, destination: { type: "string" }, deadlineBefore: { type: "string" }}), (input) => searchScholarships({ ...args.getProfile(), ...input } as StudentProfile, args.scholarships)),
    tool("check_eligibility", "Explain which scholarship criteria match, mismatch, or remain unknown.", objectSchema({ scholarshipId: { type: "string" } }, ["scholarshipId"]), (input) => { const scholarship = args.getScholarship(String(input.scholarshipId)); return scholarship ? checkEligibility(args.getProfile(), scholarship) : { error: "Scholarship not found" }; }),
    tool("compare_scholarships", "Return normalized scholarship details for comparison.", objectSchema({ scholarshipIds: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 2 } }, ["scholarshipIds"]), (input) => (Array.isArray(input.scholarshipIds) ? input.scholarshipIds.map((id) => args.getScholarship(String(id))).filter(Boolean) : [])),
    tool("save_to_shortlist", "Save a scholarship only after the student has confirmed the action.", objectSchema({ scholarshipId: { type: "string" }, confirmedByStudent: { type: "boolean", const: true } }, ["scholarshipId", "confirmedByStudent"]), (input) => { if (input.confirmedByStudent !== true) return { saved: false, requiresConfirmation: true, scholarshipId: String(input.scholarshipId) }; args.saveShortlist(String(input.scholarshipId)); return { saved: true, scholarshipId: String(input.scholarshipId) }; }),
    tool("generate_application_checklist", "Generate application tasks for a scholarship.", objectSchema({ scholarshipId: { type: "string" } }, ["scholarshipId"]), (input) => { const scholarship = args.getScholarship(String(input.scholarshipId)); return scholarship ? createChecklist(scholarship) : { error: "Scholarship not found" }; }),
    tool("update_checklist_item", "Update a checklist item only after the student has confirmed the action.", objectSchema({ itemId: { type: "string" }, completed: { type: "boolean" }, confirmedByStudent: { type: "boolean", const: true } }, ["itemId", "completed", "confirmedByStudent"]), (input) => { if (input.confirmedByStudent !== true) return { updated: false, requiresConfirmation: true, itemId: String(input.itemId) }; args.updateChecklist(String(input.itemId), Boolean(input.completed)); return { updated: true, id: String(input.itemId), completed: Boolean(input.completed) }; }),
  ].forEach((entry) => modelContext.registerTool(entry));
  return true;
}

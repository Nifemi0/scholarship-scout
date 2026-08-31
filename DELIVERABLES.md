# Scholarship Scout Deliverables

## August 31 local runtime and workflow fixes

- [x] Validate saved state independently; prevent mount-time overwrites; back up malformed values before explicit replacement.
- [x] Stable requirement-based checklist IDs and conservative legacy progress migration.
- [x] Shared current checklist progress between the UI and agent-generated checklists.
- [x] Reject invalid input types and unknown scholarship/task IDs before mutation.
- [x] Dedicated saved-items view and removal controls, independent of active filters.
- [x] Shared two- or three-way comparison with deadlines, requirements, checklist progress, and sources.
- [x] Neutral new-user profile with no assumed country, subject, or deadline.
- [x] Twenty-seven tests, type-check, and lint pass; local browser checks verify the evidence-first catalog behavior alongside three-way comparison, persistence, and shortlist controls.
- [x] Authorized production deployment completed August 31: `dpl_6tjiEzEG9ohtb7ouEzho44ARysw3`, READY, aliased to `https://scholarship-scout-brown.vercel.app`.
- [x] Production smoke checks: all six WebMCP tools discovered; three-way comparison updates the UI; eligibility/checklist generation return structured results; invalid scholarship/task mutations rejected; existing profile and unavailable legacy shortlist entry retained. Fresh-page browser error/warning log empty; no error/fatal runtime logs returned for this deployment.
- Deployment source: tested working tree based on `b1e3311`, with uncommitted fixes uploaded via CLI; no GitHub push. Remote Next.js 16.3.3 build passed (about 15 seconds from building to ready). Added `.vercelignore` to omit video assets, dependency/build folders, and local workflow state. Log drains and ongoing monitoring were not assessed or configured.
- Six opaque browser error entries appeared during the old-to-new page navigation; they did not recur in a fresh production tab. Their cause was not established.
- Catalog factual remediation remains separate and incomplete; no scholarship facts or submission materials changed in this runtime follow-up.

## August 31 catalog audit

- [x] Audit all 30 local catalog records against official-source evidence; findings and limitations in `CATALOG-AUDIT-2026-08-31.md`.
- [x] Verify catalog measurements: 26 generic checklists, 29 broad verification labels, 22 universal applicant-country fields, and only two machine-readable closing dates.
- [x] Remediate contradicted eligibility, funding, source, checklist and deadline/status fields; unresolved facts are explicitly unknown rather than inferred.
- [x] Encode current-cycle, country/field evidence scope, and application-readiness states so unresolved routes cannot be mistaken for verified matches.
- Audit only: no catalog/application-code changes, deployment or submission updates. Earlier implementation checkmarks do not establish factual correctness of all scholarship fields.

## August 30 local bug-fix follow-up

- [x] Destination filtering regression test and fix, including explicit unknown partner destinations.
- [x] Shared UI/agent search profile with immediate subsequent eligibility checks.
- [x] Equal scores share ranks; unknown facts no longer inflate match scores.
- [x] Manaaki country and study-level restrictions corrected against its official country page.
- [x] Fifteen tests, type-check, and lint pass.
- [x] Updated production build and local browser verification: Canada/undergraduate search returns three Canadian records plus one unknown partner destination; eligibility immediately reflects the same profile. Manual profile edits, comparison, checklist generation, and profile persistence after reload verified. No captured browser warnings/errors.
- [x] Updated demo and submission drafts remove the earlier fixed 30-match / 0.75-score claims.
- [x] Full catalog audit documented on August 31; the targeted Manaaki correction does not certify every record.
- [x] Apply high-risk audit corrections and preserve unresolved facts as unknown; a catalog record is not presented as full factual verification of every current route.

## Product deliverables

- [x] Product shell and responsive layout.
- [x] Student profile form with validation.
- [x] Curated 30-record discovery catalog with source links, evidence scope, cycle status, application readiness, and explicit unknown states.
- [x] Search and filter experience.
- [x] Deterministic eligibility evaluator.
- [x] Explainable match, mismatch, and unknown states.
- [x] Scholarship details view.
- [x] Side-by-side comparison.
- [x] Human-approved shortlist.
- [x] Personalized application checklist.
- [x] Local persistence and reset controls.
- [x] Privacy, uncertainty, and data-source messaging.

## WebMCP deliverables

- [x] `search_scholarships` tool registration.
- [x] `check_eligibility` tool registration.
- [x] `compare_scholarships` tool registration.
- [x] `save_to_shortlist` tool registration.
- [x] `generate_application_checklist` tool registration.
- [x] `update_checklist_item` tool registration.
- [x] Tool registration and example behavior documented in the project specification.
- [x] Confirmation boundaries tested in code for state-changing tools.
- [x] WebMCP behavior tested in ChatGPT's in-app browser: six tools discovered; search, eligibility, comparison, and checklist calls completed successfully.

## Engineering deliverables

- [x] TypeScript domain types and validation boundaries.
- [x] Unit tests for search, eligibility, and unknown states.
- [x] Tests for strict WebMCP schemas and confirmation-safe malformed calls.
- [x] Accessible labels, keyboard navigation, and error states.
- [x] Production build configuration.
- [x] Open-source license file.
- [x] Clean-checkout setup instructions.
- [x] No secrets or personal data in the repository.

## Hackathon submission deliverables

- [x] Working live URL.
- [x] Public code repository URL.
- [x] English project description explaining WebMCP fit.
- [x] Explanation of what humans and agents can do together.
- [x] Brief implementation explanation.
- [ ] Refreshed public YouTube demo under three minutes with audio; local render and upload verification pending.
- [x] Demo runbook shows search, eligibility reasoning, approval, and checklist generation.
- [x] Final test of the live URL in ChatGPT's in-app browser with WebMCP enabled.

## Milestones

### Milestone 1 — Foundation

**Exit criteria:** App boots, domain types exist, catalog fixtures are validated, and the README explains local setup.

### Milestone 2 — Matching engine

**Exit criteria:** Search, filters, eligibility, comparison, and checklist functions pass tests without requiring an LLM.

### Milestone 3 — Product flow

**Exit criteria:** A student can complete profile → results → detail → shortlist → checklist in the browser.

### Milestone 4 — WebMCP

**Exit criteria:** All six tools are registered, callable, typed, documented, and visibly affect the same product state with confirmation where needed.

### Milestone 5 — Submission

**Exit criteria:** Live deployment, public repository, license, clean setup, demo video, and submission copy are all verified.

## Final acceptance test

Given a student profile, the agent must be able to:

1. Search for matching scholarships.
2. Explain at least one match and one unknown criterion.
3. Compare two results.
4. Save one only after confirmation.
5. Generate a checklist from the saved scholarship.
6. Update a checklist item.
7. Show the official source URL and last-verified date.

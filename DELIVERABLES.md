# Scholarship Scout Deliverables

## Product deliverables

- [x] Product shell and responsive layout.
- [x] Student profile form with validation.
- [x] Curated demo scholarship catalog with source, deadline, eligibility, and freshness metadata.
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
- [ ] Confirmation boundaries tested for state-changing tools in a WebMCP-enabled browser.
- [ ] WebMCP behavior tested in the target browser.

## Engineering deliverables

- [x] TypeScript domain types and validation boundaries.
- [x] Unit tests for search, eligibility, and unknown states.
- [ ] Tests for malformed WebMCP inputs and unknown fields.
- [x] Accessible labels, keyboard navigation, and error states.
- [x] Production build configuration.
- [x] Open-source license file.
- [x] Clean-checkout setup instructions.
- [x] No secrets or personal data in the repository.

## Hackathon submission deliverables

- [ ] Working live URL.
- [ ] Public code repository URL.
- [ ] English project description explaining WebMCP fit.
- [ ] Explanation of what humans and agents can do together.
- [ ] Brief implementation explanation.
- [ ] Public YouTube demo under three minutes with audio.
- [ ] Demo shows search, eligibility reasoning, approval, and checklist generation.
- [ ] Final test of the live URL in ChatGPT's in-app browser or Chrome with WebMCP enabled.

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

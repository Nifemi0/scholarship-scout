# Scholarship Scout Agent Guide

## Purpose

This file guides coding agents and contributors working on Scholarship Scout. Read `project.md`, `SCOPE.md`, and `DELIVERABLES.md` before making product or architecture decisions.

## Mission

Build a trustworthy WebMCP scholarship discovery workflow where an agent helps a student search, understand, compare, shortlist, and prepare applications while the student remains in control.

## Current status

- **Status:** August 31 release candidate implements the runtime fixes and catalog trust remediation. Thirty named programme records now carry evidence scope, country/field coverage, cycle state, and application readiness; contradicted high-risk facts were corrected and unresolved facts remain unknown. The public deployment, repository, demo, and submission are re-verified as a separate release step.
- **Phase:** Safe persistence, shared UI/agent state, validated mutations, saved-item management, three-way comparison, neutral profile defaults, evidence-aware ranking, and source-aware checklists are implemented. Twenty-seven tests, type-check, lint, and local browser checks pass.
- **Next milestone:** Render and verify the refreshed demo, publish the tested release, re-run live WebMCP verification, and update the hackathon entry.
- **Known constraint:** The root workspace contains unrelated Downrail files. Work inside `scholarship-scout/` unless explicitly asked otherwise.

## Non-negotiable rules

- Read `project.md` before changing the product direction.
- Read `SCOPE.md` before adding features.
- Never invent scholarship facts, deadlines, eligibility rules, providers, or URLs.
- Represent incomplete information as `unknown`, not as a positive or negative assumption.
- Keep matching, filtering, sorting, and checklist generation deterministic.
- Do not let an LLM decide eligibility from unstructured prose in the MVP.
- Never submit applications, send emails, upload documents, or make purchases automatically.
- Require confirmation before changing a shortlist or checklist.
- Do not collect or store passports, passwords, bank details, or identity documents.
- Keep source URLs and last-verified dates visible.
- Label fixtures, simulations, and AI-generated drafts clearly.
- Do not commit secrets, API keys, personal data, or real student records.
- Preserve unrelated workspace files and user changes.

## Preferred implementation approach

1. Define domain types and validation rules.
2. Add a small curated catalog with explicit source metadata.
3. Implement pure functions for search and eligibility.
4. Write tests before changing matching behavior.
5. Build the UI around the deterministic engine.
6. Register WebMCP tools around the same application functions.
7. Add persistence only after the in-memory flow works.
8. Deploy and test the exact live URL in a WebMCP-capable browser.

## Quality gates

Before calling a phase complete, verify:

- Type checking passes.
- Linting passes.
- Unit tests cover match, mismatch, unknown, deadline, and no-result states.
- The UI has accessible labels and keyboard operation.
- WebMCP tool schemas reject malformed inputs.
- Tool results contain stable IDs and source metadata.
- Mutating tools do not silently change state.
- The production build has no mock or debug-only behavior hidden from users.

## Recommended repository shape

```text
scholarship-scout/
  app/
  components/
  data/
    scholarships.ts
    schema.ts
  features/
    search/
    eligibility/
    shortlist/
    checklist/
  lib/
    domain/
    webmcp/
  tests/
  public/
  project.md
  agent.md
  SCOPE.md
  DELIVERABLES.md
  README.md
```

## Status update format

When work progresses, update `Current status` in this file and the matching milestone in `DELIVERABLES.md`. Record verified facts, blockers, and the next concrete action. Do not mark a feature verified until it has been tested.

## Definition of done

The project is complete when a reviewer can open the live URL, provide a student profile, use an agent to find and compare scholarships through WebMCP, approve a shortlist, generate a checklist, inspect sources and uncertainty, and reproduce the setup from the public repository.

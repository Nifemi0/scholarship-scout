# Scholarship Scout Project Specification

## Project snapshot

- **Project:** Scholarship Scout
- **Tagline:** Find the opportunities that fit. Apply with confidence.
- **Hackathon:** The WebMCP Challenge
- **Submission deadline:** September 3, 2026 at 1:00 PM PDT
- **Current phase:** Submission release candidate — implementation and catalog trust remediation complete; final publication verification in progress
- **Primary audience:** Students searching for scholarships and funding opportunities
- **Product type:** WebMCP-powered web application

## What we are building

Scholarship Scout is a guided scholarship discovery and application-preparation experience. A student creates a profile, explains their goals and constraints, and works with an agent to find relevant opportunities.

The agent does structured research and preparation through explicit WebMCP tools. The student remains in control of decisions, saved opportunities, and application content.

Example user intent:

> I am a Nigerian computer science student looking for undergraduate scholarships that accept international applicants and close within the next three months.

Scholarship Scout responds with a ranked, explainable shortlist, eligibility reasons, missing information, deadlines, and a personalized checklist for each selected opportunity.

## Problem

Scholarship information is scattered across institutions, foundations, government sites, and education portals. Students often cannot tell whether they qualify, which deadlines are trustworthy, or what documents they need until they have already spent significant time researching.

Generic AI answers can also invent opportunities, misread eligibility rules, or hide uncertainty. Scholarship Scout makes the data and reasoning inspectable, labels source freshness, and keeps final decisions with the student.

## Product thesis

Websites should expose reliable, structured actions to agents instead of forcing agents to guess how to navigate a page. Scholarship Scout demonstrates this through a useful human-agent workflow: the agent searches and organizes opportunities while the student supplies context, resolves ambiguity, and approves actions.

## Target users

### Primary user

A student applying for undergraduate, postgraduate, vocational, or international study funding.

### Secondary users

- School counselors helping multiple students.
- Parents or mentors reviewing application plans.
- Scholarship organizations interested in making opportunities easier to discover.

## Core user journey

1. The student opens Scholarship Scout.
2. The student enters a lightweight profile: location, study level, field, academic information, financial context, and target dates.
3. The agent searches the curated scholarship catalog using WebMCP.
4. The agent explains why each result may fit and flags unknown or missing eligibility information.
5. The student filters, compares, and approves scholarships for a shortlist.
6. The agent generates an application checklist for each shortlisted opportunity.
7. The student marks requirements complete and optionally asks the agent to draft non-submitted planning content.
8. The app shows deadlines, next actions, source links, and freshness warnings.

## MVP scope

The MVP must deliver one complete, polished workflow:

- Responsive web interface for profile setup and scholarship discovery.
- Curated dataset of approximately 30–50 scholarships.
- Search and filters for study level, field, destination, applicant location, funding type, and deadline.
- Explainable eligibility matching with match, mismatch, and unknown states.
- Scholarship detail page with source URL, deadline, requirements, award information, and last-verified date.
- Shortlist with explicit human approval.
- Side-by-side comparison for selected scholarships.
- Personalized application checklist.
- WebMCP registration for the core actions listed below.
- Clear labels distinguishing verified catalog data, user-provided information, and AI-generated suggestions.
- Demo path that works without authentication and without exposing private student data.

## WebMCP tools

The app should expose meaningful tools, not decorative tool names:

```ts
document.modelContext.registerTool({
  name: "search_scholarships",
  description: "Find scholarships matching a student's profile and constraints.",
  inputSchema: { /* typed filters and profile fields */ },
  execute: async (input) => { /* deterministic catalog search */ }
});
```

Recommended tools:

- `search_scholarships` — search the catalog using explicit filters.
- `check_eligibility` — evaluate a student profile against one scholarship's rules.
- `compare_scholarships` — return normalized differences across selected scholarships.
- `save_to_shortlist` — add a scholarship after user confirmation.
- `generate_application_checklist` — create requirements and next actions for one scholarship.
- `update_checklist_item` — mark an application task complete or reopen it.

Tool results should be structured, deterministic where possible, and safe to repeat. Mutating actions must require clear confirmation in the interface or agent flow.

## Data model

Each scholarship record should include:

- Stable ID and title.
- Provider and official source URL.
- Eligible countries or applicant regions.
- Study levels and fields.
- Study destinations.
- Award amount or funding description.
- Opening and closing dates, if known.
- Eligibility requirements.
- Required documents.
- Application URL.
- Last-verified date.
- Data confidence and source notes.

The catalog must be labeled as curated real data only when each record has been independently verified from an authoritative source; otherwise it must be labeled as demo data.

## Architecture

### Frontend

- Next.js with TypeScript.
- Accessible responsive interface.
- Profile form, results, detail, comparison, shortlist, and checklist views.

### Application layer

- Pure deterministic catalog search and filter functions.
- Eligibility evaluator with explicit rule outputs.
- Checklist generator.
- WebMCP adapter and tool registration.

### Persistence

- MVP may use local browser persistence for profile, shortlist, and checklist state.
- Do not store sensitive identity documents or financial records.
- No account system is required for the demo.

## Product invariants

- Never guarantee that a student is eligible or will receive an award.
- Never invent a scholarship, deadline, requirement, provider, or source URL.
- Show `unknown` when the catalog does not contain enough information.
- Keep the original source link visible for every opportunity.
- Do not submit applications or send emails automatically in the MVP.
- Do not request passports, bank details, passwords, or unnecessary sensitive information.
- Keep eligibility calculations deterministic and testable.
- Agent-generated writing must be labeled as a draft and reviewed by the student.
- Mutating actions require explicit human confirmation.

## Success criteria

### Product success

- A new user can reach a useful shortlist in under five minutes.
- Every recommendation includes a concise, understandable reason.
- A student can see exactly which criteria matched, mismatched, or remain unknown.
- A student can turn a scholarship into an actionable checklist in one interaction.
- The core workflow works without an LLM, proving that the agent is using WebMCP tools rather than receiving hidden hard-coded answers.

### Hackathon success

- Live deployed URL accessible in ChatGPT's in-app browser or Chrome with WebMCP enabled.
- Public source repository with an open-source license.
- Non-trivial WebMCP implementation with documented tools.
- Clear English description of the human-agent collaboration.
- Public YouTube demo video under three minutes with audio.
- Demo clearly shows tool invocation and the resulting product state.

## Demo script

1. Introduce a student profile and a specific funding goal.
2. Ask the agent to find matching scholarships before a chosen deadline.
3. Show structured WebMCP search results.
4. Open one result and show match, mismatch, and unknown eligibility criteria.
5. Compare two opportunities.
6. Ask the agent to save one after the student confirms.
7. Generate the personalized application checklist.
8. Mark a task complete and show the next recommended action.
9. Close with the source links, freshness labels, and human approval boundary.

## Delivery phases

### Phase 0 — Product and data foundation

- Confirm framework and deployment target.
- Define TypeScript domain types.
- Create and label the initial curated catalog.
- Write catalog validation tests.

### Phase 1 — Deterministic scholarship engine

- Implement search, filters, normalization, and sorting.
- Implement eligibility match/mismatch/unknown results.
- Implement comparison and checklist generation.
- Add unit tests for edge cases and stale deadlines.

### Phase 2 — User experience

- Build profile, results, detail, comparison, shortlist, and checklist screens.
- Add accessible empty, loading, error, and no-match states.
- Add privacy and data-confidence copy.

### Phase 3 — WebMCP integration

- Register and test the six core tools.
- Make tool inputs and outputs typed and documented.
- Test with ChatGPT's in-app browser and Chrome WebMCP testing mode.
- Ensure user-confirmation boundaries are visible.

### Phase 4 — Submission quality

- Deploy the production build.
- Complete README and setup instructions.
- Record the under-three-minute demo.
- Verify public repository, license, URL, and submission copy.

## Main risks and mitigations

### Stale scholarship data

Mitigation: show last-verified dates, source links, confidence labels, and a report-data issue action.

### Hallucinated eligibility

Mitigation: calculate matches from explicit catalog fields and show unknown instead of guessing.

### Overly broad scope

Mitigation: use a curated dataset and complete one discovery-to-checklist journey before adding accounts, scraping, or application submission.

### Weak WebMCP leverage

Mitigation: expose useful search, comparison, shortlist, and checklist actions with structured inputs and outputs.

### Privacy risk

Mitigation: collect only information needed for matching; keep MVP state local; never request identity documents or credentials.

## Implementation status — August 31, 2026

- Application foundation created in `app/`, with Next.js, TypeScript, React, local persistence, and an MIT license.
- Curated catalog created with 30 official provider/program pages, explicit source notes, freshness metadata, and conservative deadline labels.
- Deterministic search, filtering, eligibility match/mismatch/unknown states, comparison, shortlist, and checklist behavior implemented.
- Six WebMCP tool registrations implemented in `lib/webmcp.ts`, with strict schemas and confirmation-safe state changes.
- Typecheck, lint, 27 tests, and local browser smoke checks pass for the catalog-remediation release candidate.
- Funding-type filtering is exposed in the profile UI, deterministic search engine, and `search_scholarships` WebMCP schema.
- Live browser smoke test confirms the provenance panel and per-record source-proof panel are readable on production.
- Results are ranked deterministically across five evidence checks. Known mismatches are filtered, unknowns add no points, and discovery-only records are labeled rather than presented as verified matches.
- ChatGPT's in-app browser discovered all six page-defined WebMCP tools and successfully invoked the search, eligibility, comparison, and checklist tools against the production deployment on August 29, 2026.
- The live deployment, repository, video, and submission are re-verified after the release candidate is published.
- Production URL: `https://scholarship-scout-brown.vercel.app`
- Public repository: `https://github.com/Nifemi0/scholarship-scout`
- Deployment: Vercel production deployment `dpl_HWv9ypwdccEnV1HZEhE3q7e6RfA8`, verified READY on August 28, 2026.

## Submission demo profile

The final demo uses a Nigerian Computer Science student with study level and destination left open. It demonstrates a ranked candidate set—not 30 guaranteed matches—a transparent three-way comparison, and a source-aware checklist for the top result.

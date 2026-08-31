# Scholarship Scout

Scholarship Scout is a WebMCP-powered application that helps students discover scholarships, understand their eligibility, and prepare personalized application checklists with an AI agent.

## Run locally

Requirements: Node.js 20 or newer and npm.

```bash
git clone https://github.com/Nifemi0/scholarship-scout.git
cd scholarship-scout
npm ci
npm run dev
```

Open <http://localhost:3000>. No account, API key, or private test data is required.

For a production check:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

## WebMCP tools

The browser registers six tools from [`lib/webmcp.ts`](lib/webmcp.ts):

- `search_scholarships`
- `check_eligibility`
- `compare_scholarships`
- `save_to_shortlist`
- `generate_application_checklist`
- `update_checklist_item`

Search, eligibility, comparison, and checklist generation are deterministic. Shortlist and checklist updates share state with the visible UI; state-changing calls require explicit student confirmation where applicable.

## Project documents

- [Project specification](project.md) — product direction, architecture, and success criteria.
- [Agent guide](agent.md) — instructions and guardrails for coding agents and contributors.
- [Scope](SCOPE.md) — what is included, deferred, and explicitly out of scope.
- [Deliverables](DELIVERABLES.md) — implementation milestones and submission checklist.
- [Submission draft](SUBMISSION.md) — project narrative and public links.
- [Demo runbook](DEMO.md) — timed recording path.

## Current status

**August 31 production release:** Matching, persistence, comparison, and catalog-trust remediation are live in deployment `dpl_Gjd6b1DgPgWsnCgywUZwYxjaZR6Y`. GitHub is synchronized at commit `dc1bbda`. The catalog contains 30 named programme records, but the app distinguishes current application routes from partner directories and unresolved discovery records. Unknown facts do not increase a ranking.

**Submission candidate — implemented, deployed, and WebMCP-verified.**

The production app is live at <https://scholarship-scout-brown.vercel.app>. Its six page-defined WebMCP tools were discovered and invoked successfully after the August 31 release. A clean Nigeria + Computer Science + any-level + any-funding run returned 25 candidates, preserved unknowns in the top-three eligibility checks, updated a three-way comparison, and generated three Chevening planning tasks.

The current implementation uses a curated catalog of 30 named scholarship and funding programme records with official provider/program pages. A record is not automatically a verified match or an open application. Deadlines and eligibility can change, so users are directed to the official source before relying on a result.

## Judge test prompt

Open the live app in ChatGPT's in-app browser and ask:

> Find scholarships for a Nigerian computer-science student, compare the best three, and create an application checklist for the top result.

The expected WebMCP path uses `search_scholarships`, `check_eligibility`, `compare_scholarships`, and `generate_application_checklist`. Comparison accepts two or three distinct scholarship IDs and updates the visible comparison workspace. Judges should inspect evidence states instead of expecting a fixed result count or score.

### Runtime and workflow fixes — August 31, 2026 (deployed August 31)

- New profiles start with blank filters: no nationality, subject, study level, funding preference, destination, or deadline is assumed.
- Profile, shortlist, and checklist storage load independently with validation. Loading never writes back defaults. On an explicit edit, malformed data is backed up to the corresponding `-recovery` key before replacement; if backup fails, the original is left untouched and the UI warns that changes are not saved.
- Checklist IDs use the scholarship ID and exact requirement label, not its position. Existing progress migrates using a frozen snapshot of the original requirements; unmatched marks are not reassigned. The old storage key remains intact. A changed requirement label intentionally needs fresh review.
- Checklist generation reads current completion marks, including manual UI edits. Mutating tools reject unknown scholarship/task IDs and invalid inputs without changing state; confirmation remains required.
- Saved scholarships have a dedicated view independent of search filters, with removal controls including unavailable legacy records.
- Two- or three-way comparisons show funding, deadlines, requirements, checklist progress, and official-source links. Both manual and agent comparisons use the same visible workspace.
- Regression coverage includes corrupted/unavailable storage, migration and task reordering, invalid tool calls, shared progress, and comparison state. Local browser checks cover agent/UI synchronization, persistence after reload, and shortlist removal.

These fixes do not correct the scholarship facts identified in [the catalog audit](CATALOG-AUDIT-2026-08-31.md) or update the submitted demo. The app deployment was separately authorized and completed August 31.

### Matching corrections — August 30, 2026 (deployed August 31)

- Agent searches update the same profile shown in the UI. Omitted fields retain their current values; an empty string clears a filter. Subsequent eligibility calls use that profile immediately, and UI edits are also visible to the tools.
- Destination filtering excludes known incompatible destinations. Partner-dependent destinations remain candidates with an unknown destination criterion. Unknown deadlines likewise remain candidates requiring verification.
- Search results retain scholarship fields and add `eligibility` and `ranking` metadata. Confirmed matches contribute one point across five evidence checks; unknowns add no points. Equal scores share a rank and are displayed alphabetically, not by scholarship quality. Never describe tied results as objectively best.
- Manaaki's country and study-level restrictions were corrected from its [official country eligibility page](https://www.nzscholarships.govt.nz/check-eligible-countries/) on August 30. It no longer matches Nigeria. The example Nigeria / Computer Science / any-level search now returns 29 candidates, not 30 verified eligible awards. This correction is not a full catalog re-audit.
- The demo and testing instructions avoid fixed result counts and numeric fit scores because profile details and catalog evidence determine the output.

## Data provenance and review

Scholarship Scout is the catalog maintainer; it is not the scholarship provider. Each record names the provider, links to an official HTTPS page, records the review date, and labels its evidence scope, country/field coverage, cycle status, and application readiness. Facts that were not established from the linked source remain unknown. Students must open the official source before applying.

## Important limitations

- The 30-record catalog is curated rather than an exhaustive global scholarship index.
- A higher rank means more known profile signals matched; it is not a guarantee of eligibility, quality, or an award.
- Programme rules and deadlines can change after the recorded review date.
- The app stores profile, shortlist, and checklist state locally in the browser and never submits scholarship applications.

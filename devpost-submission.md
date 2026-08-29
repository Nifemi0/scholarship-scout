# Title

Scholarship Scout

## One-line Summary

A source-transparent WebMCP scholarship workspace that lets students and agents search, explain, compare, shortlist, and plan applications together.

## Problem

Scholarship research is fragmented across provider websites, eligibility pages, partner institutions, and changing deadlines. Students—especially international applicants—can spend hours opening tabs only to discover that an opportunity does not match their country, study level, field, or funding needs. Generic search and chat answers compound the problem when they hide uncertainty or omit the official source.

## Solution

Scholarship Scout turns scholarship research into a structured human-and-agent workflow. A student provides a lightweight profile such as country, field, study level, funding preference, and optional deadline. The app searches a curated catalog of 30 real opportunities, displays official provider links and provenance, explains each matching signal, compares selected options, and generates a practical application checklist.

The same workflow is available to agents through six typed WebMCP tools. An agent can search and analyze the catalog without scraping the visual interface, while the student remains in control of state-changing actions and final decisions.

## Why This Matters

For students, a missed requirement or stale deadline can cost an application cycle. Scholarship Scout makes uncertainty visible instead of presenting guesses as facts. It helps a student narrow a broad catalog into credible next steps while keeping every official source one click away.

WebMCP is a strong fit because scholarship research naturally alternates between machine-friendly operations and human judgment. Agents are good at filtering, comparing, and organizing; students must still verify partner-specific requirements, decide where to apply, and provide their own application materials. WebMCP connects those roles through explicit, typed actions rather than brittle page automation.

## How We Used AI

Scholarship Scout is designed for use by AI agents through WebMCP. The production page registers six typed tools with strict input schemas:

1. `search_scholarships`
2. `check_eligibility`
3. `compare_scholarships`
4. `save_to_shortlist`
5. `generate_application_checklist`
6. `update_checklist_item`

The matching engine itself is deterministic and explainable: it reports match, mismatch, or unknown signals instead of inventing eligibility. Read operations can be invoked directly. Shortlist changes require explicit confirmation, and the app never submits scholarship applications or collects passports, passwords, or identity documents.

## How We Used Codex

Codex helped scaffold and iterate on the Next.js application, define the typed WebMCP schemas, debug browser integration, write automated tests, audit privacy and trust boundaries, verify the production deployment, and prepare the public documentation and demo. It was also used to research official scholarship-provider pages and turn those findings into source-linked catalog records without placeholder data.

The final implementation was tested through ChatGPT’s in-app browser against the live deployment. Codex also ran the full local test, type-check, lint, build, repository, and media-verification checks used for submission readiness.

## Key Features

- Structured search by applicant country, field, study level, funding type, destination, and deadline.
- A curated catalog of 30 named scholarship opportunities with official HTTPS provider links and provenance.
- Explainable eligibility signals that distinguish matches, mismatches, and unknowns.
- Pairwise comparison of funding, destination, level, deadline, and source details.
- Human-confirmed shortlisting for state-changing actions.
- Application checklist generation and checklist-item updates.
- Six page-defined WebMCP tools with strict object schemas.
- A privacy-first profile that does not request identity documents or credentials.

## Architecture

- Next.js 16 App Router and React 19
- TypeScript
- Browser-native `document.modelContext.registerTool(...)` WebMCP registration
- Deterministic client-side matching and checklist logic
- Curated, source-linked scholarship catalog stored with the application
- Vercel production deployment
- Node test runner coverage for matching behavior, catalog integrity, tool schemas, and confirmation boundaries

## Testing Instructions

No login or credentials are required.

1. Open https://scholarship-scout-brown.vercel.app in ChatGPT’s in-app browser, which supports WebMCP by default.
2. Ask: “Find scholarships for a Nigerian computer-science student, compare the best three, and create an application checklist for the top result.”
3. Confirm that the page exposes these six tools: `search_scholarships`, `check_eligibility`, `compare_scholarships`, `save_to_shortlist`, `generate_application_checklist`, and `update_checklist_item`.
4. Invoke `search_scholarships` with applicant country Nigeria, field Computer Science, any study level, and any funding type. The verified production test returned 30 matches.
5. Run `check_eligibility` for the first three results. The verified test returned a 0.75 strong-match score for each.
6. Compare the results in pairs because `compare_scholarships` accepts at most two IDs per call.
7. Generate the checklist for `mastercard-scholars`. The verified production result contains Academic records, Personal statement, and Partner-specific documents.
8. Open an official-source link from a result to inspect the underlying provider page.

## Public Demo Link

https://scholarship-scout-brown.vercel.app

## Public Repository Link

https://github.com/Nifemi0/scholarship-scout

The repository is public, contains the complete source and setup instructions, and has an MIT license detected in the GitHub About section.

## Demo Video

Local final artifact: `demo-video/out/scholarship-scout-demo.mp4`

- Verified duration: 60.05 seconds
- Video: H.264, 1280×720
- Audio: stereo AAC
- Content: working product flow and the verified production WebMCP call sequence
- Public YouTube URL: **TODO after upload**

## Screenshot Shot List

1. Landing page and privacy-first search profile.
2. Search results showing official-source provenance.
3. Eligibility detail with match and unknown signals.
4. Pairwise comparison workspace.
5. Generated Mastercard Foundation application checklist.
6. WebMCP production-proof panel from the final demo.

## Submission Readiness Notes

- Live deployment: verified.
- Public repository: verified.
- MIT license and GitHub About metadata: verified.
- Six WebMCP tools in ChatGPT’s in-app browser: verified.
- Automated tests: 9 passed.
- Type check and lint: passed.
- Production build: passed.
- Demo media streams, dimensions, duration, and visual layout: verified.
- Public YouTube upload: pending.
- Devpost project creation, thumbnail, and final entry: pending explicit approval.

## Known Limitations

- The catalog is curated and manually reviewed rather than continuously synchronized with every provider; students must verify current partner details on the linked official source.
- Deadlines and study levels can be partner-dependent and are shown as unknown when the catalog cannot support a definitive claim.
- Eligibility scores are transparent matching heuristics, not guarantees of acceptance.
- Checklist tasks are planning aids and may require additional partner-specific documents.
- The app does not submit applications or store sensitive identity documents.

## TODO Official Form Fields

| Official field | Draft answer |
| --- | --- |
| Submitter Type | Individual |
| Country of residence | Nigeria |
| Organization name | Not applicable |
| App Status | New — first repository commit was August 28, 2026, after the August 25 submission period began |
| Live URL | https://scholarship-scout-brown.vercel.app |
| Testing instructions | Use the steps in the Testing Instructions section above; no credentials required |
| Public code repository | https://github.com/Nifemi0/scholarship-scout |
| Agents or clients tested | ChatGPT in-app browser against the live production deployment |
| AI tools leveraged | OpenAI Codex and ChatGPT |
| Level of learning | **USER CONFIRMATION NEEDED: None, Moderate, or Significant** |
| Career AI value | **USER CONFIRMATION NEEDED: Yes or No** |
| Public YouTube video | **TODO after upload** |


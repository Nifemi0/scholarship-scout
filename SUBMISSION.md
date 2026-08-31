# Scholarship Scout — Submission Draft

## One-line pitch

Scholarship Scout helps students find funding opportunities that fit, understand why they fit, and turn the best options into an application plan—with an AI agent that uses structured WebMCP tools while the student stays in control.

## Why WebMCP is a strong fit

Scholarship search is a structured workflow, not just a question-and-answer task. Scholarship Scout exposes search, eligibility, comparison, shortlist, and checklist actions as WebMCP tools so an agent can operate on reliable fields and return stable results instead of guessing how to navigate a page.

## What people and agents do together

The student supplies personal goals and constraints, resolves unknown eligibility details, and approves state-changing actions. The agent searches the catalog, explains match and mismatch criteria, compares opportunities, and prepares an application checklist. This makes a scattered research task understandable without giving the agent authority to submit an application.

## Implementation

The application is built with Next.js 16, React, and TypeScript. Search, filtering, eligibility scoring, comparison, and checklist generation are deterministic functions shared by the UI and WebMCP adapter. Shortlist and checklist state persist locally in the browser. State-changing tools require an explicit `confirmedByStudent: true` input, and every record exposes source and freshness metadata.

## Working features

- Search and rank candidates across 30 named programme records by country, field, study level, funding type, destination, deadline, and current-route evidence.
- Explain eligibility as match, mismatch, or unknown instead of inventing missing facts.
- Compare normalized scholarship records and expose the official provider source for every result.
- Save a human-approved shortlist and generate a locally persistent application checklist.
- Expose six structured WebMCP tools that operate on the same deterministic domain layer and browser state as the visible interface.

## Verified WebMCP test

After the August 31 production release, ChatGPT's in-app browser discovered all six tools and completed the search, eligibility, comparison, and checklist path. A clean Nigeria + Computer Science + any-level + any-funding run returned 25 candidates; the count is a reproducible test result, not a promise that all candidates are eligible or objectively best.

## How Codex was used

Codex helped scope the product, implement the deterministic domain layer and WebMCP adapter, verify official-source provenance, add tests and confirmation boundaries, debug browser exposure, deploy the app to Vercel, and generate and render the narrated demo artifact using genuine production captures. Human review determined the project idea, trust boundaries, catalog policy, and submission claims.

## Testing instructions

1. Open https://scholarship-scout-brown.vercel.app in ChatGPT's in-app browser.
2. Ask: “Find scholarships for a Nigerian computer-science student, compare the best three, and create an application checklist for the top result.”
3. Confirm profile transmission when prompted.
4. Verify that the agent discovers six page tools and uses the search, eligibility, comparison, and checklist tools.
5. Check that results expose official sources, review dates, evidence scope, cycle status, and unknown criteria instead of unsupported claims.

No login or credentials are required.

## Links

- Live app: https://scholarship-scout-brown.vercel.app
- Public repository: https://github.com/Nifemi0/scholarship-scout
- Deployment inspector: https://vercel.com/nifemi0s-projects/scholarship-scout/Gjd6b1DgPgWsnCgywUZwYxjaZR6Y
- Demo video: refreshed public YouTube link is added after the final render and upload
- Devpost project: https://devpost.com/software/scholarship-scout

## Disclosure

The current build uses a curated catalog of 30 named programme records and official provider/program pages. Some records are discovery directories or have unresolved route facts; those states are labeled rather than counted as verified matches. The application does not submit applications or guarantee eligibility or awards.

## Known limitations

- The catalog is intentionally small and curated; it is not exhaustive.
- Some programme cycles and country routes remain unknown until the student checks the official source.
- Comparison accepts two or three IDs per call.
- Browser persistence is device-local and there is no account synchronization.

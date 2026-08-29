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

- Search and rank 30 named funding opportunities by country, field, study level, funding type, destination, and deadline.
- Explain eligibility as match, mismatch, or unknown instead of inventing missing facts.
- Compare normalized scholarship records and expose the official provider source for every result.
- Save a human-approved shortlist and generate a locally persistent application checklist.
- Expose six structured WebMCP tools that operate on the same deterministic domain layer and browser state as the visible interface.

## Verified WebMCP test

On August 29, 2026, ChatGPT's in-app browser discovered all six tools on the production deployment. A real WebMCP run searched for Nigerian Computer Science opportunities, checked the top three eligibility results, compared the top result against the next two, and generated a three-item Mastercard Foundation application checklist. The calls used `search_scholarships`, `check_eligibility`, `compare_scholarships`, and `generate_application_checklist`; they did not fall back to visual page navigation.

## How Codex was used

Codex helped scope the product, implement the deterministic domain layer and WebMCP adapter, verify official-source provenance, add tests and confirmation boundaries, debug browser exposure, deploy the app to Vercel, and generate and render the narrated demo artifact. Human review determined the project idea, trust boundaries, catalog policy, and submission claims.

## Testing instructions

1. Open https://scholarship-scout-brown.vercel.app in ChatGPT's in-app browser.
2. Ask: “Find scholarships for a Nigerian computer-science student, compare the best three, and create an application checklist for the top result.”
3. Confirm profile transmission when prompted.
4. Verify that the agent discovers six page tools and uses the search, eligibility, comparison, and checklist tools.
5. Check that the top result includes an official source, manual review date, and unknown criteria instead of unsupported claims.

No login or credentials are required.

## Links

- Live app: https://scholarship-scout-brown.vercel.app
- Public repository: https://github.com/Nifemi0/scholarship-scout
- Deployment inspector: https://vercel.com/nifemi0s-projects/scholarship-scout/GtP9YY5aPEucGVZwd4J5yaLMC2QB
- Demo video: TODO — upload `demo-video/out/scholarship-scout-demo.mp4` publicly to YouTube

## Disclosure

The current build uses a curated catalog of real scholarship programs and official provider/program pages. Deadlines and eligibility rules can change, so each opportunity must still be checked against its linked provider before a student relies on it. The application does not submit applications or guarantee eligibility or awards.

## Known limitations

- The catalog is intentionally small and curated; it is not exhaustive.
- Most programme cycles use conservative “varies” labels where the official source controls the current deadline.
- Comparison accepts two IDs per call, so comparing three results requires two calls.
- Browser persistence is device-local and there is no account synchronization.

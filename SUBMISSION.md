# Scholarship Scout — Submission Draft

## One-line pitch

Scholarship Scout helps students find funding opportunities that fit, understand why they fit, and turn the best options into an application plan—with an AI agent that uses structured WebMCP tools while the student stays in control.

## Why WebMCP is a strong fit

Scholarship search is a structured workflow, not just a question-and-answer task. Scholarship Scout exposes search, eligibility, comparison, shortlist, and checklist actions as WebMCP tools so an agent can operate on reliable fields and return stable results instead of guessing how to navigate a page.

## What people and agents do together

The student supplies personal goals and constraints, resolves unknown eligibility details, and approves state-changing actions. The agent searches the catalog, explains match and mismatch criteria, compares opportunities, and prepares an application checklist. This makes a scattered research task understandable without giving the agent authority to submit an application.

## Implementation

The application is built with Next.js 16, React, and TypeScript. Search, filtering, eligibility scoring, comparison, and checklist generation are deterministic functions shared by the UI and WebMCP adapter. Shortlist and checklist state persist locally in the browser. State-changing tools require an explicit `confirmedByStudent: true` input, and every record exposes source and freshness metadata.

## Links

- Live app: https://scholarship-scout-brown.vercel.app
- Public repository: https://github.com/Nifemi0/scholarship-scout
- Deployment inspector: https://vercel.com/nifemi0s-projects/scholarship-scout/GtP9YY5aPEucGVZwd4J5yaLMC2QB

## Disclosure

The current build uses a curated catalog of real scholarship programs and official provider/program pages. Deadlines and eligibility rules can change, so each opportunity must still be checked against its linked provider before a student relies on it. The application does not submit applications or guarantee eligibility or awards.

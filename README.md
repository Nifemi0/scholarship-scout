# Scholarship Scout

Scholarship Scout is a WebMCP-powered application that helps students discover scholarships, understand their eligibility, and prepare personalized application checklists with an AI agent.

## Project documents

- [Project specification](project.md) — product direction, architecture, and success criteria.
- [Agent guide](agent.md) — instructions and guardrails for coding agents and contributors.
- [Scope](SCOPE.md) — what is included, deferred, and explicitly out of scope.
- [Deliverables](DELIVERABLES.md) — implementation milestones and submission checklist.
- [Submission draft](SUBMISSION.md) — project narrative and public links.
- [Demo runbook](DEMO.md) — timed recording path.

## Current status

**Not started — planning scaffold complete.**

The current implementation uses a curated catalog of 30 real scholarship and funding programmes with official provider/program pages. Deadlines and eligibility can change, so users are directed to the official source before applying.

## Data provenance and review

Scholarship Scout is the catalog maintainer; it is not the scholarship provider. Each record names the provider, links to the provider or university’s official HTTPS page, records the last manual review date, and explains any partner- or course-dependent facts. Before updating a record, the maintainer checks the linked official page for the programme identity, provider, eligibility scope, funding description, deadline or “varies” status, and application route. The app does not claim that a record is current after its review date, and students should open the official source before applying.

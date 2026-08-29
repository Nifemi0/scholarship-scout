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

**Submission candidate — implemented, deployed, and WebMCP-verified.**

The production app is live at <https://scholarship-scout-brown.vercel.app>. Its six page-defined WebMCP tools have been discovered and invoked successfully in ChatGPT's in-app browser, including a complete search → eligibility → comparison → checklist flow.

The current implementation uses a curated catalog of 30 real scholarship and funding programmes with official provider/program pages. Deadlines and eligibility can change, so users are directed to the official source before applying.

## Judge test prompt

Open the live app in ChatGPT's in-app browser and ask:

> Find scholarships for a Nigerian computer-science student, compare the best three, and create an application checklist for the top result.

The expected WebMCP path uses `search_scholarships`, `check_eligibility`, `compare_scholarships`, and `generate_application_checklist`. The comparison tool accepts two scholarship IDs per call, so an agent may use two comparison calls to cover three results.

## Data provenance and review

Scholarship Scout is the catalog maintainer; it is not the scholarship provider. Each record names the provider, links to the provider or university’s official HTTPS page, records the last manual review date, and explains any partner- or course-dependent facts. Before updating a record, the maintainer checks the linked official page for the programme identity, provider, eligibility scope, funding description, deadline or “varies” status, and application route. The app does not claim that a record is current after its review date, and students should open the official source before applying.

## Important limitations

- The 30-record catalog is curated rather than an exhaustive global scholarship index.
- “Strong match” means the known catalog fields fit; it is not a guarantee of eligibility or an award.
- Programme rules and deadlines can change after the recorded review date.
- The app stores profile, shortlist, and checklist state locally in the browser and never submits scholarship applications.

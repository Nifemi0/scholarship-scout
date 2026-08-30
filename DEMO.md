# Scholarship Scout Demo Runbook

Target length: 60 seconds.

A 60-second narrated demo artifact is included at `demo-video/out/scholarship-scout-demo.mp4`. It combines genuine captures of the live production deployment with the verified WebMCP results: 30 search matches, a 0.75 eligibility score, a two-scholarship comparison, and a three-task checklist. It does not replace the required public YouTube upload.

To re-render it: `cd demo-video` then `npx remotion render src/index.ts ScholarshipScoutDemo out/scholarship-scout-demo.mp4 --codec=h264`.

## 0:00–0:20 — The problem

Show the landing page. Explain that scholarship information is scattered and that generic AI can hide uncertainty or invent details.

## 0:20–0:45 — Set the profile

Use one example profile: Nigeria, any study level, Computer Science, deadline before December 31, 2026. Make clear that Scholarship Scout supports students across countries and fields, and that the app collects matching fields, not identity documents or passwords.

## 0:45–1:10 — Search and explain

Show the starting matches. Open “Check my fit” on one opportunity. Point to match, mismatch, and unknown states and explain that the result is generated from structured data.

## 1:10–1:35 — Compare and shortlist

Select “Compare” on both results. Show the comparison workspace, then save one opportunity to the shortlist. Emphasize that saving is a human-approved action.

## 1:35–2:05 — Build an application plan

Open the saved opportunity, show the required-document checklist, and mark one task complete. Refresh the page to demonstrate local persistence.

## 2:05–2:30 — WebMCP and trust boundary

In a WebMCP-enabled browser, show the registered tools or invoke `search_scholarships`, `check_eligibility`, and `generate_application_checklist`. Close by showing the official-source link, last-verified date, curated-provider-data label, and the rule that applications are never submitted automatically.

## Recording checklist

- [x] Use a public YouTube link with audio: https://youtu.be/azGoUx1tYdo
- [x] Keep the video under three minutes (verified duration: 60.05 seconds).
- [x] Show the live URL, not only a local build.
- [x] Show genuine results from production WebMCP tool invocations.
- [x] Avoid copyrighted music and private student data.

# Scholarship Scout Demo Runbook

Target length: 60 seconds.

An offline 60-second narrated demo artifact is included at `demo-video/out/scholarship-scout-demo.mp4`. It shows the verified production call sequence (30 search matches, three 0.75 eligibility checks, pairwise comparison, and a three-task checklist). It is a visual submission aid and does not replace the required public YouTube upload.

To re-render it: `cd demo-video` then `npx remotion render src/index.ts ScholarshipScoutDemo out/scholarship-scout-demo.mp4 --codec=h264`.

## 0:00–0:20 — The problem

Show the landing page. Explain that scholarship information is scattered and that generic AI can hide uncertainty or invent details.

## 0:20–0:45 — Set the profile

Use the default profile: Nigeria, any study level, Computer Science, deadline before December 31, 2026. Point out that the app collects matching fields, not identity documents or passwords.

## 0:45–1:10 — Search and explain

Show the starting matches. Open “Check my fit” on one opportunity. Point to match, mismatch, and unknown states and explain that the result is generated from structured data.

## 1:10–1:35 — Compare and shortlist

Select “Compare” on both results. Show the comparison workspace, then save one opportunity to the shortlist. Emphasize that saving is a human-approved action.

## 1:35–2:05 — Build an application plan

Open the saved opportunity, show the required-document checklist, and mark one task complete. Refresh the page to demonstrate local persistence.

## 2:05–2:30 — WebMCP and trust boundary

In a WebMCP-enabled browser, show the registered tools or invoke `search_scholarships`, `check_eligibility`, and `generate_application_checklist`. Close by showing the official-source link, last-verified date, curated-provider-data label, and the rule that applications are never submitted automatically.

## Recording checklist

- [ ] Use a public YouTube link with audio.
- [x] Keep the video under three minutes (verified duration: 60.05 seconds).
- [ ] Show the live URL, not only a local build.
- [ ] Show at least one WebMCP tool invocation.
- [ ] Avoid copyrighted music and private student data.

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { scholarships, type FundingType } from "@/data/scholarships";
import { checkEligibility, createChecklist, emptyProfile, isProfile, searchScholarships, type StudentProfile } from "@/lib/domain";
import { registerScholarshipTools } from "@/lib/webmcp";
import { isChecked, isShortlist, loadBrowserState, saveBrowserValue, storageKeys } from "@/lib/storage";

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile>(emptyProfile);
  const profileRef = useRef(emptyProfile);
  const [notice, setNotice] = useState("");
  const persist = useCallback((key: string, value: unknown, valid: (value: unknown) => boolean) => {
    try {
      if (saveBrowserValue(window.localStorage, key, value, valid)) return;
    } catch { /* Storage access itself may be blocked. */ }
    setNotice("Changes are available in this tab but could not be saved. Existing browser data has not been discarded.");
  }, []);
  const commitProfile = useCallback((next: StudentProfile) => {
    // Update the tool-facing profile immediately, before React's next render.
    profileRef.current = next;
    setProfile(next);
    persist(storageKeys.profile, next, isProfile);
  }, [persist]);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const shortlistRef = useRef<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checkedRef = useRef<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const results = useMemo(() => searchScholarships(profile, scholarships), [profile]);
  const displayedResults = savedOnly ? searchScholarships(emptyProfile, scholarships).filter((item) => shortlist.includes(item.id)) : results;
  const visibleResults = showAll ? displayedResults : displayedResults.slice(0, 8);

  const update = (key: keyof StudentProfile, value: string) => commitProfile({ ...profileRef.current, [key]: value });
  const getScholarship = (id: string) => scholarships.find((item) => item.id === id);
  const changeShortlist = useCallback((id: string, save: boolean) => {
    if (!scholarships.some((item) => item.id === id) && save) return;
    const next = save ? [...new Set([...shortlistRef.current, id])] : shortlistRef.current.filter((item) => item !== id);
    shortlistRef.current = next;
    setShortlist(next);
    persist(storageKeys.shortlist, next, isShortlist);
  }, [persist]);
  const changeChecked = useCallback((id: string, completed: boolean) => {
    const next = { ...checkedRef.current, [id]: completed };
    checkedRef.current = next;
    setChecked(next);
    persist(storageKeys.checked, next, isChecked);
  }, [persist]);
  const toggleCompare = (id: string) => setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);

  useEffect(() => {
    try {
      const saved = loadBrowserState(window.localStorage, scholarships);
      profileRef.current = saved.profile;
      shortlistRef.current = saved.shortlist;
      checkedRef.current = saved.checked;
      setProfile(saved.profile);
      setShortlist(saved.shortlist);
      setChecked(saved.checked);
      setNotice(saved.warnings.join(" "));
    } catch { setNotice("Browser storage is unavailable. You can still use this tab without saving changes."); }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const unregister = registerScholarshipTools({
      scholarships,
      getProfile: () => profileRef.current,
      setProfile: (next) => { commitProfile(next); setSavedOnly(false); },
      saveShortlist: (id) => changeShortlist(id, true),
      updateChecklist: changeChecked,
      getChecked: () => checkedRef.current,
      setComparison: setCompareIds,
      getScholarship: (id) => scholarships.find((item) => item.id === id),
    });
    if (unregister) return unregister;
  }, [hydrated, commitProfile, changeShortlist, changeChecked]);

  if (!hydrated) return <main className="shell"><p role="status">Loading your saved workspace…</p></main>;

  return (
    <main className="shell">
      <nav className="topbar"><div className="brand"><span className="brand-mark">✦</span> Scholarship Scout</div><span className="eyebrow">Human + agent research</span></nav>
      {notice && <p className="agent-note" role="status">{notice}</p>}
      <section className="hero"><div className="eyebrow">Funding, made clearer</div><h1>Find the opportunities that fit.</h1><p>Tell us what you are studying and where you want to go. Scholarship Scout works with an agent to turn scattered funding opportunities into a shortlist you can actually act on.</p></section>
      <section className="provenance" aria-labelledby="provenance-title"><div><div className="eyebrow">Data provenance</div><h2 id="provenance-title">Where the scholarship facts come from</h2><p>Scholarship Scout is the catalog maintainer. Provider and university pages are the source of truth. A named programme can still be only a discovery record: it is not a verified match or an open application until the exact route and cycle are recorded.</p></div><div className="provenance-facts"><span><strong>{scholarships.length}</strong> named programme records</span><span><strong>100%</strong> HTTPS official-source links</span><span><strong>Per-record</strong> evidence scope and cycle status</span></div><details><summary>How updates are judged</summary><p>The August 31 audit reviewed all 30 programme records. Contradicted facts were corrected where official evidence was sufficient; unresolved country calls, courses, deadlines and document lists are now labeled unknown or partner-dependent. A review date describes the stated evidence scope, never blanket verification. Always recheck the official source before applying.</p></details></section>
      <div className="layout">
        <aside className="panel">
          <h2>Your search profile</h2>
          <div className="field"><label htmlFor="region">Applicant country</label><input id="region" value={profile.region} placeholder="Any country" onChange={(e) => update("region", e.target.value)} /><p className="footer-note">Country rules may depend on citizenship and residence. Confirm both with the provider.</p></div>
          <div className="field"><label htmlFor="level">Study level</label><select id="level" value={profile.studyLevel} onChange={(e) => update("studyLevel", e.target.value)}><option value="">Any level</option><option value="undergraduate">Undergraduate</option><option value="postgraduate">Postgraduate</option><option value="doctoral">Doctoral</option></select></div>
          <div className="field"><label htmlFor="field">Field of study</label><input id="field" value={profile.field} placeholder="Any field" onChange={(e) => update("field", e.target.value)} /></div>
          <div className="field"><label htmlFor="destination">Study destination</label><input id="destination" value={profile.destination} placeholder="Any destination" onChange={(e) => update("destination", e.target.value)} /></div>
          <div className="field"><label htmlFor="funding">Funding type</label><select id="funding" value={profile.fundingType} onChange={(e) => update("fundingType", e.target.value as FundingType | "")}><option value="">Any funding</option><option value="full">Full funding</option><option value="tuition">Tuition support</option><option value="partial">Partial funding</option><option value="varies">Varies by programme</option></select></div>
          <div className="field"><label htmlFor="deadline">Deadline before</label><input id="deadline" type="date" value={profile.deadlineBefore} onChange={(e) => update("deadlineBefore", e.target.value)} /></div>
          <button className="primary" type="button" onClick={() => { setSavedOnly(false); setExpanded(null); }}>Show matches <span aria-hidden="true">→</span></button>
          <button className="secondary show-more" type="button" onClick={() => { commitProfile({ ...emptyProfile }); setSavedOnly(false); }}>Clear search filters</button>
          <p className="footer-note">We only use this profile to calculate matches in your browser. No documents or passwords are needed.</p>
        </aside>
        <section className="results" aria-labelledby="results-title">
          <div className="results-head"><div><h2 id="results-title">{savedOnly ? "Your saved scholarships" : "Your starting matches"}</h2><p aria-live="polite">{displayedResults.length} {savedOnly ? "saved opportunities · search filters do not hide saved items" : "candidates from the curated catalog · equal scores share a rank"}</p></div><button className="secondary" type="button" aria-pressed={savedOnly} onClick={() => { setSavedOnly((value) => !value); setShowAll(false); }}>{savedOnly ? "Back to search" : `View shortlist (${shortlist.length})`}</button></div>
          <p className="footer-note">Ranking counts confirmed catalog signals across five checks, including whether a current application route is recorded. Unknowns add no points. Ties appear alphabetically, not in order of award quality.</p>
          <div className="agent-note"><strong>Agent insight:</strong> I found these using your structured profile. Open a card to see what matches, what does not, and what still needs checking. <span className="muted">Curated provider data — verify current details with the official source.</span></div>
          {compareIds.length > 0 && <section className="card comparison" aria-label="Comparison workspace"><div className="provider" role="status">Comparison workspace · {compareIds.length}/3 selected</div><h3>See the trade-offs clearly</h3><button className="secondary" type="button" onClick={() => setCompareIds([])}>Clear comparison</button>{compareIds.length < 2 && <p className="muted">Select one more opportunity to compare.</p>}<div className="comparison-grid">{compareIds.map((id) => {
            const item = getScholarship(id);
            return item ? <article key={id}><h4>{item.title}</h4><button className="secondary" type="button" aria-label={`Remove ${item.title} from comparison`} onClick={() => toggleCompare(id)}>Remove</button><dl><dt>Funding</dt><dd>{item.award}</dd><dt>Deadline</dt><dd>{item.deadline}</dd><dt>Destination</dt><dd>{item.destinations.join(", ")}</dd><dt>Study levels</dt><dd>{item.studyLevels.join(", ")}</dd></dl><h5>Requirements</h5><ul>{item.requirements.map((value) => <li key={value}>{value}</li>)}</ul><h5>Catalog checklist</h5><ul>{createChecklist(item, checked).map((task) => <li key={task.id}>{task.completed ? "Complete: " : "To do: "}{task.label}</li>)}</ul><p>{checkEligibility(profile, item).summary}</p><a href={item.sourceUrl} target="_blank" rel="noreferrer">Official source ↗</a><p className="muted">{item.verificationStatus} · {item.lastVerified}</p></article> : null;
          })}</div></section>}
          {savedOnly && shortlist.filter((id) => !getScholarship(id)).map((id) => <p key={id}>An older saved opportunity is no longer in this catalog. <button className="secondary" onClick={() => changeShortlist(id, false)}>Remove unavailable saved item</button></p>)}
          <div className="cards">{visibleResults.map((scholarship) => {
            const eligibility = checkEligibility(profile, scholarship);
            const isOpen = expanded === scholarship.id;
            const isSaved = shortlist.includes(scholarship.id);
            return <article className="card" key={scholarship.id}>
              <div className="card-top"><div><div className="provider">Rank {scholarship.ranking.rank}{scholarship.ranking.tiedCount > 1 ? ` · tied with ${scholarship.ranking.tiedCount - 1} others` : ""} · {scholarship.provider}</div><h3>{scholarship.title}</h3></div><div className="award">{scholarship.award}</div></div>
              <p className="description">{scholarship.description}</p><div className="meta"><span className="tag">Deadline {scholarship.deadline}</span><span className="tag">Cycle {scholarship.cycleStatus}</span><span className="tag">{scholarship.applicationReady ? "Application route recorded" : "Discovery record — select a route"}</span><span className="tag">{eligibility.summary}</span></div>
              <div className="card-actions"><button className="secondary" type="button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : scholarship.id)}>{isOpen ? "Hide details" : "Check my fit"}</button><button className={`secondary ${isSaved ? "active" : ""}`} type="button" onClick={() => changeShortlist(scholarship.id, !isSaved)}>{isSaved ? "Remove from shortlist" : "Save to shortlist"}</button><button className={`secondary ${compareIds.includes(scholarship.id) ? "active" : ""}`} type="button" aria-pressed={compareIds.includes(scholarship.id)} disabled={compareIds.length >= 3 && !compareIds.includes(scholarship.id)} onClick={() => toggleCompare(scholarship.id)}>{compareIds.includes(scholarship.id) ? "In comparison" : "Compare"}</button></div>
              {isOpen && <div className="detail"><div className="criteria">{eligibility.criteria.map((criterion) => <div className="criterion" key={criterion.label}><span className={`dot ${criterion.status}`} /> <strong>{criterion.label}:</strong> {criterion.status} — {criterion.detail}</div>)}</div><div><div className="provider">Application checklist</div><p className="muted">Catalog planning tasks; verify the complete requirements with the provider.</p>{createChecklist(scholarship, checked).map((item) => <label className="criterion" key={item.id}><input type="checkbox" checked={item.completed} onChange={(e) => changeChecked(item.id, e.target.checked)} />{item.label}</label>)}</div><div className="source-proof"><strong>Source proof</strong><span>{scholarship.sourceAuthority}</span><span>{scholarship.verificationStatus} · {scholarship.lastVerified}</span><span>{scholarship.sourceNote}</span><a className="muted" href={scholarship.sourceUrl} target="_blank" rel="noreferrer">Open official source ↗</a></div></div>}
            </article>;
          })}</div>
          {displayedResults.length > 8 && <button className="secondary show-more" type="button" onClick={() => setShowAll((current) => !current)}>{showAll ? "Show fewer opportunities" : `Show all ${displayedResults.length} opportunities`}</button>}
          {!displayedResults.length && <div className="empty">{savedOnly ? "No saved scholarships yet. Return to search to save an opportunity." : "No matches yet. Try widening your field, region, or deadline."}</div>}
          {shortlist.length > 0 && <p className="footer-note">{shortlist.length} scholarship{shortlist.length === 1 ? "" : "s"} saved. Review each provider’s official source before applying.</p>}
        </section>
      </div>
    </main>
  );
}

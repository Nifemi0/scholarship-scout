"use client";

import { useEffect, useMemo, useState } from "react";
import { scholarships, type Scholarship, type FundingType } from "@/data/scholarships";
import { checkEligibility, createChecklist, searchScholarships, type StudentProfile } from "@/lib/domain";
import { registerScholarshipTools } from "@/lib/webmcp";

const initialProfile: StudentProfile = { region: "Nigeria", studyLevel: "", field: "Computer Science", destination: "", fundingType: "", deadlineBefore: "2026-12-31" };

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const results = useMemo(() => searchScholarships(profile, scholarships), [profile]);

  const update = (key: keyof StudentProfile, value: string) => setProfile((current) => ({ ...current, [key]: value }));
  const getScholarship = (id: string) => scholarships.find((item) => item.id === id);
  const saveShortlist = (id: string) => setShortlist((current) => current.includes(id) ? current : [...current, id]);
  const toggleCompare = (id: string) => setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 2 ? [...current, id] : [current[1], id]);

  useEffect(() => {
    try {
      setProfile({ ...initialProfile, ...JSON.parse(window.localStorage.getItem("scholarship-scout-profile") ?? "{}") });
      setShortlist(JSON.parse(window.localStorage.getItem("scholarship-scout-shortlist") ?? "[]"));
      setChecked(JSON.parse(window.localStorage.getItem("scholarship-scout-checklist") ?? "{}"));
    } catch { /* Ignore unavailable or malformed local browser state. */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("scholarship-scout-profile", JSON.stringify(profile));
    window.localStorage.setItem("scholarship-scout-shortlist", JSON.stringify(shortlist));
    window.localStorage.setItem("scholarship-scout-checklist", JSON.stringify(checked));
  }, [profile, shortlist, checked, hydrated]);

  const updateChecklist = (id: string, completed: boolean) => setChecked((current) => ({ ...current, [id]: completed }));

  useEffect(() => {
    registerScholarshipTools({ scholarships, getProfile: () => profile, saveShortlist, updateChecklist, getScholarship });
  }, [profile]);

  return (
    <main className="shell">
      <nav className="topbar"><div className="brand"><span className="brand-mark">✦</span> Scholarship Scout</div><span className="eyebrow">Human + agent research</span></nav>
      <section className="hero"><div className="eyebrow">Funding, made clearer</div><h1>Find the opportunities that fit.</h1><p>Tell us what you are studying and where you want to go. Scholarship Scout works with an agent to turn scattered funding opportunities into a shortlist you can actually act on.</p></section>
      <div className="layout">
        <aside className="panel">
          <h2>Your search profile</h2>
          <div className="field"><label htmlFor="region">Where are you based?</label><select id="region" value={profile.region} onChange={(e) => update("region", e.target.value)}><option value="">Any region</option><option>Nigeria</option><option>Ghana</option><option>Kenya</option><option>South Africa</option><option>Any country</option></select></div>
          <div className="field"><label htmlFor="level">Study level</label><select id="level" value={profile.studyLevel} onChange={(e) => update("studyLevel", e.target.value)}><option value="">Any level</option><option value="undergraduate">Undergraduate</option><option value="postgraduate">Postgraduate</option><option value="doctoral">Doctoral</option></select></div>
          <div className="field"><label htmlFor="field">Field of study</label><select id="field" value={profile.field} onChange={(e) => update("field", e.target.value)}><option value="">Any field</option><option>Computer Science</option><option>Engineering</option><option>Data Science</option><option>Public Policy</option><option>Environmental Science</option><option>Agriculture</option></select></div>
          <div className="field"><label htmlFor="funding">Funding type</label><select id="funding" value={profile.fundingType} onChange={(e) => update("fundingType", e.target.value as FundingType | "")}><option value="">Any funding</option><option value="full">Full funding</option><option value="tuition">Tuition support</option><option value="partial">Partial funding</option><option value="varies">Varies by programme</option></select></div>
          <div className="field"><label htmlFor="deadline">Deadline before</label><input id="deadline" type="date" value={profile.deadlineBefore} onChange={(e) => update("deadlineBefore", e.target.value)} /></div>
          <button className="primary" type="button" onClick={() => setExpanded(null)}>Update matches <span aria-hidden="true">→</span></button>
          <p className="footer-note">We only use this profile to calculate matches in your browser. No documents or passwords are needed.</p>
        </aside>
        <section className="results" aria-labelledby="results-title">
          <div className="results-head"><div><h2 id="results-title">Your starting matches</h2><p>{results.length} opportunities from the curated catalog</p></div><span className="muted">Updated Aug 2026</span></div>
          <div className="agent-note"><strong>Agent insight:</strong> I found these using your structured profile. Open a card to see what matches, what does not, and what still needs checking. <span className="muted">Curated provider data — verify current details with the official source.</span></div>
          {compareIds.length > 0 && <div className="card" style={{ marginBottom: 16 }}><div className="provider">Comparison workspace · {compareIds.length}/2 selected</div><h3>See the trade-offs clearly</h3><div className="meta">{compareIds.map((id) => { const item = getScholarship(id); return item ? <span className="tag" key={id}>{item.title}</span> : null; })}</div>{compareIds.length < 2 ? <p className="muted">Select one more opportunity to compare awards, deadlines, and requirements side by side.</p> : <div className="meta">{compareIds.map((id) => { const item = getScholarship(id); return item ? <span className="tag" key={id}>{item.award} · {item.requirements.length} requirements · {item.documents.length} documents</span> : null; })}</div>}</div>}
          <div className="cards">{results.map((scholarship) => {
            const eligibility = checkEligibility(profile, scholarship);
            const isOpen = expanded === scholarship.id;
            const isSaved = shortlist.includes(scholarship.id);
            return <article className="card" key={scholarship.id}>
              <div className="card-top"><div><div className="provider">{scholarship.provider}</div><h3>{scholarship.title}</h3></div><div className="award">{scholarship.award}</div></div>
              <p className="description">{scholarship.description}</p><div className="meta"><span className="tag">Deadline {scholarship.deadline}</span><span className="tag">{eligibility.summary}</span></div>
              <div className="card-actions"><button className="secondary" type="button" onClick={() => setExpanded(isOpen ? null : scholarship.id)}>{isOpen ? "Hide details" : "Check my fit"}</button><button className={`secondary ${isSaved ? "active" : ""}`} type="button" onClick={() => saveShortlist(scholarship.id)}>{isSaved ? "Saved to shortlist" : "Save to shortlist"}</button><button className={`secondary ${compareIds.includes(scholarship.id) ? "active" : ""}`} type="button" onClick={() => toggleCompare(scholarship.id)}>{compareIds.includes(scholarship.id) ? "In comparison" : "Compare"}</button></div>
              {isOpen && <div className="detail"><div className="criteria">{eligibility.criteria.map((criterion) => <div className="criterion" key={criterion.label}><span className={`dot ${criterion.status}`} /> <strong>{criterion.label}:</strong> {criterion.status} — {criterion.detail}</div>)}</div><div><div className="provider">Application checklist</div>{createChecklist(scholarship).map((item) => <label className="criterion" key={item.id}><input type="checkbox" checked={Boolean(checked[item.id])} onChange={(e) => setChecked((current) => ({ ...current, [item.id]: e.target.checked }))} />{item.label}</label>)}</div><p className="muted">{scholarship.sourceNote} Last verified {scholarship.lastVerified}.</p><a className="muted" href={scholarship.sourceUrl} target="_blank" rel="noreferrer">Review official source ↗</a></div>}
            </article>;
          })}</div>
          {!results.length && <div className="empty">No matches yet. Try widening your field, region, or deadline.</div>}
          {shortlist.length > 0 && <p className="footer-note">{shortlist.length} scholarship{shortlist.length === 1 ? "" : "s"} saved. Review each provider’s official source before applying.</p>}
        </section>
      </div>
    </main>
  );
}

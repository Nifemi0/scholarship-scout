import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  Composition,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => ({});

export const MyComposition = () => (
  <Composition
    id="ScholarshipScoutDemo"
    component={MyComponent}
    durationInFrames={1800}
    fps={30}
    width={1280}
    height={720}
    calculateMetadata={calculateMetadata}
  />
);

export const MyComponent: React.FC<Props> = () => {
  const frame = useCurrentFrame();
  const scene = Math.min(7, Math.floor(frame / 225));
  const progress = interpolate(frame % 225, [0, 32], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titles = [
    "Find the opportunities that fit",
    "A profile without sensitive data",
    "Search with structured filters",
    "See why each result fits",
    "Compare before you commit",
    "Turn a choice into a plan",
    "Verified through WebMCP",
    "Scholarship Scout",
  ];
  const subtitles = [
    "Source-transparent scholarship research.",
    "Nigeria · Computer Science · any level · any funding",
    "30 named programme records — not 30 guaranteed matches",
    "Five evidence checks; unknown facts never add points",
    "The agent can compare up to three opportunities",
    "A source-aware planning checklist for the selected route",
    "Six typed tools operate on the same visible workspace",
    "Find the opportunities that fit. Apply with confidence.",
  ];

  return (
    <AbsoluteFill className="video-root">
      <Audio src={staticFile("narration.wav")} />
      <div className="topline">
        <span className="mark">✦</span> SCHOLARSHIP SCOUT
        <span className="topline-right">HUMAN + AGENT RESEARCH</span>
      </div>
      <div className="content" style={{opacity: progress}}>
        <div className="kicker">
          {scene === 6
            ? "PRODUCTION TEST · CHATGPT IN-APP BROWSER"
            : scene === 7
              ? "THE WEBMCP CHALLENGE"
              : "FUNDING, MADE CLEARER"}
        </div>
        <h1>{titles[scene]}</h1>
        <p className="subtitle">{subtitles[scene]}</p>

        {scene === 0 && (
          <div className="hero-card">
            <div className="hero-star">✦</div>
            <strong>Structured search.</strong>
            <span>Explainable matches.</span>
            <span>Human-approved next steps.</span>
          </div>
        )}

        {scene === 1 && (
          <div className="profile-card">
            <div><small>WHERE ARE YOU BASED?</small><b>Nigeria</b></div>
            <div><small>FIELD OF STUDY</small><b>Computer Science</b></div>
            <div><small>STUDY LEVEL</small><b>Any level</b></div>
            <div className="privacy">No passports. No passwords. No identity documents.</div>
          </div>
        )}

        {scene === 2 && (
          <div className="dashboard">
            <div className="side">
              <small>YOUR SEARCH PROFILE</small>
              <div className="line active">Nigeria</div>
              <div className="line active">Computer Science</div>
              <div className="line">Any level</div>
              <div className="line">Any funding</div>
            </div>
            <div className="cards">
              <Program title="Chevening Scholarships" provider="UK FCDO" badge="Open route · verify eligibility" />
              <Program title="Commonwealth Master’s Scholarships" provider="Commonwealth Scholarship Commission" badge="UK study support" />
            </div>
          </div>
        )}

        {scene === 3 && (
          <div className="detail-card">
            <div className="program-head">
              <div><small>UK FCDO</small><h2>Chevening Scholarships</h2></div>
              <span className="pill">3 known signals · verify remaining rules</span>
            </div>
            <div className="criteria">
              <span className="good">● Applicant country — match</span>
              <span className="good">● Field of study — match</span>
              <span className="unknown">● Study level — profile not specified</span>
              <span className="good">● Current application route — open</span>
            </div>
            <div className="source">Official provider source remains visible ↗</div>
          </div>
        )}

        {scene === 4 && (
          <div className="compare">
            <div className="compare-label">WEBMCP COMPARISON · 3/3 SELECTED</div>
            <div className="compare-grid">
              <div><small>CHEVENING</small><b>Open 2027/28 route</b><span>United Kingdom</span><span>Postgraduate only</span></div>
              <div><small>COMMONWEALTH MASTER’S</small><b>UK study support</b><span>United Kingdom</span><span>Postgraduate eligibility</span></div>
              <div><small>CAMBRIDGE MASTERCARD</small><b>Course-dependent</b><span>United Kingdom</span><span>Resolve course first</span></div>
            </div>
          </div>
        )}

        {scene === 5 && (
          <div className="checklist">
            <div className="check">○ Confirm nationality, residence, and return-home rules</div>
            <div className="check">○ Prepare course choices and required essays</div>
            <div className="check">○ Plan interview-stage degree and references</div>
            <div className="next">PLANNING CHECKLIST FOR <b>Chevening Scholarships</b></div>
          </div>
        )}

        {scene === 6 && (
          <div className="proof-card">
            <div className="proof-prompt">EXAMPLE PROFILE · Nigeria · Computer Science · any level · any funding</div>
            <div className="proof-grid">
              <Proof tool="search_scholarships" result="ranked candidates + evidence" />
              <Proof tool="check_eligibility" result="match · mismatch · unknown" />
              <Proof tool="compare_scholarships" result="three-way comparison" />
              <Proof tool="generate_application_checklist" result="source-aware planning tasks" />
            </div>
            <div className="verified-row"><span>✓</span> Six page-defined tools discovered on the live deployment</div>
          </div>
        )}

        {scene === 7 && (
          <div className="end-card">
            <div className="end-mark">✦</div>
            <b>30 named programme records.</b>
            <span>6 structured WebMCP tools.</span>
            <span>0 automatic applications.</span>
            <a>scholarship-scout-brown.vercel.app</a>
          </div>
        )}
      </div>
      <div className="footer"><span>WEBMCP CHALLENGE · 2026</span><span>{String(scene + 1).padStart(2, "0")} / 08</span></div>
    </AbsoluteFill>
  );
};

const Program = ({title, provider, badge}: {title: string; provider: string; badge: string}) => (
  <div className="program"><small>{provider}</small><h2>{title}</h2><span className="pill">{badge}</span><span className="source">Review official source ↗</span></div>
);

const Proof = ({tool, result}: {tool: string; result: string}) => (
  <div className="proof"><code>{tool}</code><b>{result}</b></div>
);

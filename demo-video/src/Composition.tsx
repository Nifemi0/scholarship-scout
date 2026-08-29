import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  CanvasImage,
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
    "Scholarship discovery, made clearer.",
    "Nigeria · Computer Science · any level · any funding",
    "30 curated programmes with official provider links",
    "Match, mismatch, and unknown are always visible",
    "The agent compares two opportunities at a time",
    "A checklist generated from the selected programme",
    "Real production calls in ChatGPT’s in-app browser",
    "Find the opportunities that fit. Apply with confidence.",
  ];

  return (
    <AbsoluteFill className="video-root">
      <Audio src={staticFile("narration.wav")} />
      <div className="topline">
        <span className="mark">✦</span> SCHOLARSHIP SCOUT
        <span className="topline-right">HUMAN + AGENT RESEARCH</span>
      </div>
      {scene >= 1 && scene <= 5 ? (
        <LiveCapture scene={scene as 1 | 2 | 3 | 4 | 5} opacity={progress} />
      ) : (
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
              <Program title="Mastercard Foundation Scholars Program" provider="Mastercard Foundation" badge="Comprehensive support" />
              <Program title="Commonwealth Master’s Scholarships" provider="Commonwealth Scholarship Commission" badge="UK study support" />
            </div>
          </div>
        )}

        {scene === 3 && (
          <div className="detail-card">
            <div className="program-head">
              <div><small>MASTERCARD FOUNDATION</small><h2>Scholars Program</h2></div>
              <span className="pill">0.75 · Strong match</span>
            </div>
            <div className="criteria">
              <span className="good">● Applicant country — match</span>
              <span className="good">● Field of study — match</span>
              <span className="unknown">● Study level — verify with partner</span>
              <span className="unknown">● Deadline — partner-dependent</span>
            </div>
            <div className="source">Official provider source remains visible ↗</div>
          </div>
        )}

        {scene === 4 && (
          <div className="compare">
            <div className="compare-label">WEBMCP COMPARISON · 2/2 SELECTED</div>
            <div className="compare-grid">
              <div><small>MASTERCARD FOUNDATION</small><b>Comprehensive support</b><span>Partner-dependent destination</span><span>Partner requirements apply</span></div>
              <div><small>COMMONWEALTH MASTER’S</small><b>UK study support</b><span>United Kingdom</span><span>Postgraduate eligibility</span></div>
            </div>
          </div>
        )}

        {scene === 5 && (
          <div className="checklist">
            <div className="check">○ Academic records</div>
            <div className="check">○ Personal statement</div>
            <div className="check">○ Partner-specific documents</div>
            <div className="next">GENERATED FOR <b>Mastercard Foundation Scholars Program</b></div>
          </div>
        )}

        {scene === 6 && (
          <div className="proof-card">
            <div className="proof-prompt">EXAMPLE PROFILE · Nigeria · Computer Science · any level · any funding</div>
            <div className="proof-grid">
              <Proof tool="search_scholarships" result="30 matches" />
              <Proof tool="check_eligibility × 3" result="0.75 each" />
              <Proof tool="compare_scholarships × 2" result="2-by-2 comparison" />
              <Proof tool="generate_application_checklist" result="3 actionable tasks" />
            </div>
            <div className="verified-row"><span>✓</span> Six page-defined tools discovered on the live deployment</div>
          </div>
        )}

        {scene === 7 && (
          <div className="end-card">
            <div className="end-mark">✦</div>
            <b>30 real opportunities.</b>
            <span>6 structured WebMCP tools.</span>
            <span>0 automatic applications.</span>
            <a>scholarship-scout-brown.vercel.app</a>
          </div>
        )}
      </div>
      )}
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

const liveCaptures = {
  1: {
    image: "live/landing.png",
    label: "LIVE DEPLOYMENT",
    title: "The production app",
    call: "scholarship-scout-brown.vercel.app",
    result: "30 source-linked programmes",
  },
  2: {
    image: "live/search-results.png",
    label: "LIVE WEBMCP CALL",
    title: "Structured search",
    call: "search_scholarships",
    result: "30 matching opportunities",
  },
  3: {
    image: "live/eligibility.png",
    label: "LIVE WEBMCP CALL",
    title: "Explainable eligibility",
    call: "check_eligibility",
    result: "0.75 · Strong starting match",
  },
  4: {
    image: "live/comparison.png",
    label: "LIVE WEBMCP CALL",
    title: "Pairwise comparison",
    call: "compare_scholarships",
    result: "2 scholarships normalized",
  },
  5: {
    image: "live/checklist.png",
    label: "LIVE WEBMCP CALL",
    title: "Actionable checklist",
    call: "generate_application_checklist",
    result: "3 partner-aware tasks",
  },
} as const;

const LiveCapture = ({scene, opacity}: {scene: 1 | 2 | 3 | 4 | 5; opacity: number}) => {
  const capture = liveCaptures[scene];
  return (
    <div className="live-capture" style={{opacity}}>
      <div className="live-heading">
        <div><small>{capture.label}</small><h2>{capture.title}</h2></div>
        <div className="live-result"><code>{capture.call}</code><b>{capture.result}</b></div>
      </div>
      <div className="browser-frame">
        <div className="browser-bar"><span>●</span><span>●</span><span>●</span><b>https://scholarship-scout-brown.vercel.app</b><em>LIVE</em></div>
        <div className="browser-image">
          <CanvasImage src={staticFile(capture.image)} style={{width: "100%", height: "100%", objectFit: "cover"}} />
        </div>
      </div>
    </div>
  );
};

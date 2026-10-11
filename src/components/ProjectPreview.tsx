import { ArrowDown, ArrowRight, ArrowUpRight, Bot, GitBranch, MessageCircle, Network, Sparkles } from "lucide-react";

export type PreviewKind = "north" | "gig" | "hermes" | "arena";

function WindowBar({ name, label }: { name: string; label: string }) {
  return (
    <div className="mock-window-bar">
      <div className="mock-window-controls" aria-hidden="true"><i /><i /><i /></div>
      <span className="mock-window-name">{name}</span>
      <span className="mock-window-label">{label}</span>
    </div>
  );
}

function NorthPreview() {
  return (
    <div className="mock-window mock-north" aria-hidden="true">
      <WindowBar name="north" label="PERSONAL FINANCE" />
      <div className="north-layout">
        <div className="mock-sidebar"><span className="mock-brand-glyph">N</span><i className="sidebar-active" /><i /><i /><i /></div>
        <div className="north-content">
          <div className="mock-overline">OVERVIEW</div>
          <div className="mock-heading">Your money, in view.</div>
          <div className="north-summary-row">
            <div className="north-summary"><span>Budget</span><b className="skeleton-line w-65" /><i className="skeleton-line w-38" /></div>
            <div className="north-summary"><span>Spending</span><b className="skeleton-line w-52" /><i className="skeleton-line w-30" /></div>
            <div className="north-summary north-summary-accent"><span>Accounts</span><b className="skeleton-line w-45" /><i className="skeleton-line w-35" /></div>
          </div>
          <div className="north-chart-card">
            <div className="mock-card-title"><span>Spending overview</span><span className="mock-period">MONTHLY</span></div>
            <svg className="north-chart" viewBox="0 0 420 100" preserveAspectRatio="none">
              <defs><linearGradient id="north-chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".25" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs>
              <path d="M0 76 C28 71 35 45 66 53 S104 77 134 60 S174 25 205 40 S246 63 276 44 S314 65 345 34 S390 42 420 15 V100 H0Z" fill="url(#north-chart-fill)" />
              <path d="M0 76 C28 71 35 45 66 53 S104 77 134 60 S174 25 205 40 S246 63 276 44 S314 65 345 34 S390 42 420 15" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="chart-guides"><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GigPreview() {
  return (
    <div className="mock-window mock-gig" aria-hidden="true">
      <WindowBar name="gig companion" label="COURIER WORKSPACE" />
      <div className="gig-layout">
        <div className="gig-side"><span className="gig-avatar">G</span><span className="gig-side-line active" /><span className="gig-side-line" /><span className="gig-side-line" /><span className="gig-side-line" /></div>
        <div className="gig-content">
          <div className="mock-overline">SHIFT JOURNAL</div>
          <div className="gig-heading-row"><div className="mock-heading">A clearer view of the week.</div><span className="gig-filter">This week <ArrowDown size={10} /></span></div>
          <div className="gig-grid">
            <div className="gig-week-card">
              <div className="mock-card-title"><span>Recent shifts</span><span className="tiny-dot" /></div>
              <div className="gig-shift-row"><span className="gig-day">M</span><span className="gig-shift-lines"><i /><b /></span><span className="gig-shift-status" /></div>
              <div className="gig-shift-row"><span className="gig-day">T</span><span className="gig-shift-lines"><i /><b /></span><span className="gig-shift-status" /></div>
              <div className="gig-shift-row"><span className="gig-day">W</span><span className="gig-shift-lines"><i /><b /></span><span className="gig-shift-status" /></div>
              <div className="gig-shift-row"><span className="gig-day">T</span><span className="gig-shift-lines"><i /><b /></span><span className="gig-shift-status" /></div>
            </div>
            <div className="gig-insight-card"><div className="mock-card-title"><span>Work pattern</span><ArrowUpRight size={11} /></div><div className="gig-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="gig-bars-label"><span>SHIFTS</span><span>HOURS</span></div><div className="gig-insight-note"><span className="tiny-dot" /> Log a shift to begin</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HermesPreview() {
  return (
    <div className="mock-window mock-hermes" aria-hidden="true">
      <WindowBar name="hermes" label="PERSONAL AGENT · SYSTEM MAP" />
      <div className="hermes-content">
        <div className="hermes-head"><div><div className="mock-overline">CONNECTED WORKFLOW</div><div className="mock-heading">A useful agent, close at hand.</div></div><span className="hermes-state"><i /> ONLINE SYSTEM</span></div>
        <div className="hermes-map">
          <div className="hermes-node hermes-telegram"><MessageCircle size={16} /><span>Telegram</span></div>
          <span className="hermes-link"><i /></span>
          <div className="hermes-node hermes-core"><Bot size={18} /><span>Hermes agent</span></div>
          <span className="hermes-link hermes-link-split"><i /><i /></span>
          <div className="hermes-branches"><div className="hermes-node hermes-model"><Sparkles size={14} /><span>Model routing</span></div><div className="hermes-node hermes-github"><GitBranch size={14} /><span>GitHub &amp; automation</span></div></div>
        </div>
        <div className="hermes-foot"><span>HOSTED ON AWS EC2 · UBUNTU</span><span>PRIMARY <ArrowRight size={11} /> FALLBACK</span></div>
      </div>
    </div>
  );
}

function ArenaPreview() {
  return (
    <div className="mock-window mock-arena" aria-hidden="true">
      <WindowBar name="trading arena" label="EARLY BUILD" />
      <div className="arena-content">
        <div className="arena-head"><div><div className="mock-overline">MULTI-AGENT PLATFORM</div><div className="mock-heading">A system still taking shape.</div></div><span className="arena-build-badge"><i /> IN PROGRESS</span></div>
        <div className="arena-workspace">
          <div className="arena-column"><span className="arena-col-label">AGENT LAYER</span><div className="arena-agent"><span className="arena-agent-icon"><Bot size={15} /></span><span className="arena-line" /><ArrowUpRight size={12} /></div><div className="arena-agent"><span className="arena-agent-icon agent-muted"><Sparkles size={15} /></span><span className="arena-line short" /><ArrowUpRight size={12} /></div><div className="arena-agent-placeholder"><i /><i /><i /></div></div>
          <div className="arena-connector"><span /><span /></div>
          <div className="arena-platform"><span className="arena-platform-orbit orbit-a" /><span className="arena-platform-orbit orbit-b" /><span className="arena-platform-icon"><Network size={19} /></span><b>Trading arena</b><small>In development</small></div>
          <div className="arena-side-note"><span className="tiny-dot violet-dot" /> Platform preview<br /><small>No performance data</small></div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPreview({ kind }: { kind: PreviewKind }) {
  return (
    <div className={`project-visual project-visual-${kind}`} aria-hidden="true">
      {kind === "north" && <NorthPreview />}
      {kind === "gig" && <GigPreview />}
      {kind === "hermes" && <HermesPreview />}
      {kind === "arena" && <ArenaPreview />}
    </div>
  );
}

import {
  ArrowRight,
  BarChart3,
  Bike,
  Bot,
  Cloud,
  GitBranch,
  MessageCircle,
  Receipt,
  Sparkles,
  Wallet,
} from "lucide-react";

export type PreviewKind = "hermes" | "north" | "gig";

function NorthPreview() {
  return (
    <figure className="project-visual project-visual-north">
      <div className="north-screen-stage">
        <div className="north-screen-frame">
          <img
            src="/images/north-onboarding.png"
            alt="North onboarding screen, step 1 of 5, asking for country of residence with Latvia selected."
            width={1170}
            height={2532}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="north-screen-note">
          <span className="visual-kicker">REAL PRODUCT SCREEN</span>
          <strong>Start with the person’s context.</strong>
          <p>North tailors its money setup to where someone lives.</p>
        </div>
      </div>
      <figcaption>Authentic North onboarding screen · step 1 of 5</figcaption>
    </figure>
  );
}

function HermesPreview() {
  return (
    <figure className="project-visual project-visual-hermes">
      <span className="visual-kicker">SYSTEM MAP · CAPABILITY OVERVIEW</span>
      <div className="hermes-flow">
        <div className="hermes-flow-node hermes-flow-source">
          <MessageCircle size={19} aria-hidden="true" />
          <span>Telegram</span>
        </div>
        <ArrowRight className="hermes-flow-arrow" size={19} aria-hidden="true" />
        <div className="hermes-flow-node hermes-flow-core">
          <Bot size={20} aria-hidden="true" />
          <span>Hermes agent</span>
        </div>
      </div>
      <div className="hermes-capabilities" aria-label="Connected capabilities">
        <span><Sparkles size={15} aria-hidden="true" /> Model fallback</span>
        <span><GitBranch size={15} aria-hidden="true" /> GitHub-assisted reviews</span>
        <span><Cloud size={15} aria-hidden="true" /> AWS EC2 · Ubuntu</span>
      </div>
      <figcaption>Telegram interface · model fallback · code review · automation</figcaption>
    </figure>
  );
}

function GigPreview() {
  const steps = [
    { icon: Bike, title: "Record a shift", detail: "Bolt, Wolt, other income · hours" },
    { icon: Receipt, title: "Log work costs", detail: "Categories, notes · optional receipt photo" },
    { icon: Wallet, title: "See the day clearly", detail: "Income, expenses · daily profit" },
    { icon: BarChart3, title: "Review the history", detail: "Past shifts · monthly goal view" },
  ];

  return (
    <figure className="project-visual project-visual-gig">
      <span className="visual-kicker">COURIER WORKFLOW · EARLY BUILD</span>
      <ol className="gig-workflow">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.title}>
              <span className="gig-step-number">0{index + 1}</span>
              <span className="gig-step-icon"><Icon size={17} aria-hidden="true" /></span>
              <span className="gig-step-copy"><strong>{step.title}</strong><small>{step.detail}</small></span>
            </li>
          );
        })}
      </ol>
      <figcaption>Workflow drawn from the current source · product still in development</figcaption>
    </figure>
  );
}

export default function ProjectPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "north") return <NorthPreview />;
  if (kind === "gig") return <GigPreview />;
  return <HermesPreview />;
}

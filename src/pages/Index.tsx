import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  Bot,
  Cloud,
  Code2,
  Compass,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Network,
  Sparkles,
  Sun,
  Utensils,
  Wallet,
  Workflow,
  X,
} from "lucide-react";
import ProjectPreview, { type PreviewKind } from "@/components/ProjectPreview";

type Theme = "dark" | "light";

const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

type PortfolioProject = {
  id: PreviewKind;
  name: string;
  tabLabel: string;
  category: string;
  description: string;
  status: string;
  statusTone: "live" | "building" | "personal";
  stack: string[];
  preview: PreviewKind;
  contribution: string;
  highlights: string[];
  liveUrl?: string;
  sourceUrl?: string;
  liveLabel?: string;
  availabilityNote: string;
};

const PROJECTS: PortfolioProject[] = [
  {
    id: "hermes",
    name: "Hermes",
    tabLabel: "AI agent",
    category: "Telegram agent · Cloud automation",
    description:
      "A personal assistant that brings practical AI workflows into Telegram and connects them to the tools I use to build.",
    status: "Personal system",
    statusTone: "personal",
    stack: ["Python", "AWS EC2 · Ubuntu", "Telegram", "LLM fallback", "GitHub"],
    preview: "hermes",
    contribution:
      "Connected a Telegram interface to a cloud-hosted agent, added model-provider fallback, and wired in GitHub-assisted code review and automation.",
    highlights: [
      "Telegram as the everyday interface",
      "Fallback across model providers",
      "Cloud deployment on AWS EC2 / Ubuntu",
      "GitHub-assisted code review and workflows",
    ],
    availabilityNote: "Personal system; a public demo and source repository have not been shared.",
  },
  {
    id: "north",
    name: "North",
    tabLabel: "Finance",
    category: "Personal finance · Newcomer-focused",
    description:
      "A newcomer-focused finance workspace for bringing balances, income, budgets, and upcoming money events into one useful view.",
    status: "Published · sign-in required",
    statusTone: "live",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    preview: "north",
    liveUrl: "https://financial-app-north-alpha.vercel.app/",
    sourceUrl: "https://github.com/nikhilsharmaawork/financial-app-north",
    liveLabel: "Open app · sign-in",
    contribution:
      "Built the finance overview around balance, monthly income, reserved funds, a daily safe-to-spend estimate, upcoming events, and practical money-management views.",
    highlights: [
      "Balance, income, and reserved funds",
      "Daily safe-to-spend estimate and financial health",
      "Accounts, budgets, income sources, and upcoming events",
      "Six-month expense overview",
    ],
    availabilityNote:
      "The public app opens to sign-in. The image shown is North’s authentic onboarding screen; the dashboard itself is not publicly visible.",
  },
  {
    id: "gig",
    name: "Gig Companion",
    tabLabel: "Courier tools",
    category: "Courier income · Work expenses",
    description:
      "A mobile-first finance companion for couriers to record shifts, track work costs, and make take-home earnings easier to understand.",
    status: "Early build",
    statusTone: "building",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    preview: "gig",
    liveUrl: "https://gig-companion.vercel.app/",
    sourceUrl: "https://github.com/nikhilsharmaawork/GIG-COMPANION-",
    liveLabel: "Open app · sign-in",
    contribution:
      "Shaped the daily loop: record Bolt, Wolt, or other shift earnings and hours; log work expenses with optional receipt photos; then review daily totals and history.",
    highlights: [
      "Shift income across Bolt, Wolt, and other work",
      "Work expenses with optional receipt photos",
      "Daily income, expenses, profit, and a monthly-goal view",
      "A workflow designed for quick mobile use",
    ],
    availabilityNote:
      "In development. The live site currently returns to sign-in; its guest-demo path does not open the dashboard yet.",
  },
];

const EXPERIENCE = [
  {
    role: "Culinary trainee · J-1 program",
    organization: "The Broadmoor",
    location: "Colorado Springs, USA",
    period: "Starting November 2026",
    status: "Upcoming",
    detail: "A planned culinary training program. This experience has not started yet.",
  },
  {
    role: "Commis I / Kitchen Assistant",
    organization: "Pavāru Māja",
    location: "Līgatne, Latvia",
    period: "July 2024 — Present",
    status: "Current",
    detail: "Fine-dining kitchen work, from preparation and station support to service.",
  },
  {
    role: "Food & Beverage intern",
    organization: "TUI Blue Hotel",
    location: "Greece",
    period: "Seasonal · Previous",
    status: "Past",
    detail: "International hotel and resort experience across food and beverage service.",
  },
  {
    role: "Bartender",
    organization: "Gastro Pub Duvel’s",
    location: "Rīga, Latvia",
    period: "Previous",
    status: "Past",
    detail: "Guest-facing bar work in a Riga gastro pub.",
  },
];

const TOOLKIT = [
  {
    title: "Software development",
    icon: Code2,
    items: ["Next.js", "React", "TypeScript", "Python"],
  },
  {
    title: "Backend & data",
    icon: Database,
    items: ["Supabase"],
  },
  {
    title: "AI & automation",
    icon: Workflow,
    items: ["Hermes Agent", "LLM integrations", "Telegram bots", "AI agents", "Automation"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    items: ["AWS EC2", "Linux", "GitHub", "Vercel"],
  },
  {
    title: "Hospitality",
    icon: Utensils,
    items: ["Kitchen operations", "Food & beverage", "International hospitality"],
  },
];

function readSavedTheme(): Theme {
  try {
    return window.localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function SectionHeading({
  number,
  eyebrow,
  title,
  text,
}: {
  number: string;
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div className="section-kicker">
        <span>{number}</span>
        <span className="section-rule" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark${small ? " brand-mark-small" : ""}`} aria-hidden="true">
      <span>N</span>
      <i />
    </span>
  );
}

function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="page-container header-inner">
        <a className="brand" href="#top" aria-label="Nikhil Sharma, back to top">
          <Mark />
          <span>Nikhil Sharma</span>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {NAV.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-contact" href="#contact">
            Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            className="icon-button theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="icon-button menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          {NAV.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
              {item.label} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-label="A visual map from real workflows to practical software" role="img">
      <div className="art-orbit art-orbit-one" />
      <div className="art-orbit art-orbit-two" />
      <div className="art-glass-panel art-panel-main">
        <div className="art-panel-top">
          <span className="art-overline">FIELD NOTES / 01</span>
          <span className="art-live-dot"><i /> SYSTEMS THINKING</span>
        </div>
        <div className="art-title">From real work<br />to useful software.</div>
        <div className="art-flow">
          <div className="art-node">
            <span className="art-node-icon"><Utensils size={16} /></span>
            <span>Real-world<br /><b>operations</b></span>
          </div>
          <span className="art-connector"><i /><i /><i /></span>
          <div className="art-node art-node-accent">
            <span className="art-node-icon"><Network size={16} /></span>
            <span>Practical<br /><b>software</b></span>
          </div>
        </div>
        <div className="art-divider" />
        <div className="art-bottom-row">
          <span><span className="art-mini-dot blue" /> Software</span>
          <span><span className="art-mini-dot violet" /> AI agents</span>
          <span className="art-index">RIGA · LV</span>
        </div>
      </div>
      <div className="art-glass-chip chip-north">
        <span className="chip-icon"><Compass size={14} /></span>
        <span><b>North</b><small>Personal finance</small></span>
        <span className="chip-arrow"><ArrowUpRight size={13} /></span>
      </div>
      <div className="art-glass-chip chip-hermes">
        <span className="chip-icon chip-icon-violet"><Sparkles size={14} /></span>
        <span><b>Hermes</b><small>Agent · automation</small></span>
        <span className="chip-arrow"><ArrowUpRight size={13} /></span>
      </div>
      <div className="art-caption"><span>01 — 03</span><span>Three products · real workflows</span></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-light hero-light-one" aria-hidden="true" />
      <div className="hero-light hero-light-two" aria-hidden="true" />
      <div className="page-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> Nikhil Sharma <span className="eyebrow-divider">/</span> Rīga, Latvia</p>
          <h1 id="hero-title">
            I build practical<br />
            <em>AI agents</em> &amp;<br />
            software products.
          </h1>
          <p className="hero-lede">
            From cloud-hosted assistants to finance and courier tools, I turn real workflows into useful software—grounded in hands-on hospitality experience.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore projects <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href="#contact">
              Contact me <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-socials" aria-label="Social links">
            <a href="https://github.com/nikhilsharmaawork" target="_blank" rel="noopener noreferrer">
              <Github size={15} aria-hidden="true" /> GitHub <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <span className="social-divider" aria-hidden="true" />
            <a href="https://www.linkedin.com/in/nikhilsharmaawork" target="_blank" rel="noopener noreferrer">
              <Linkedin size={15} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
        <HeroArtwork />
      </div>
      <div className="hero-foot page-container">
        <span><MapPin size={14} aria-hidden="true" /> Riga, Latvia</span>
          <a href="#projects">Explore selected work <ArrowRight size={13} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section-about" id="about">
      <div className="page-container">
        <SectionHeading
          number="02"
          eyebrow="About"
          title="Grounded in service. Curious about systems."
          text="A perspective shaped by both the pace of hospitality and the possibility of software."
        />
        <div className="about-grid">
          <div className="about-story" data-reveal>
            <p>
              I’m from India and now study <strong>International Tourism and Hospitality Management</strong> at Turība University in Latvia. Along the way, I’ve worked in kitchens, a hotel environment, and a Riga bar—learning how service works where the details are real and the pace is immediate.
            </p>
            <p>
              Alongside that work, I build software and explore AI agents and automation. I’m interested in technology that understands the operation it serves: tools that make a process clearer, reduce friction, or give people more room to focus on the guest.
            </p>
            <p className="about-emphasis">The thread is practical: understand the work first, then build something useful around it.</p>
          </div>
          <aside className="about-card" data-reveal aria-label="At a glance">
            <div className="about-card-top"><span className="about-card-mark"><Mark small /></span><span className="about-card-label">AT A GLANCE</span></div>
            <div className="about-fact"><span>Based in</span><b>Rīga, Latvia</b></div>
            <div className="about-fact"><span>Studying</span><b>Tourism &amp; Hospitality</b></div>
            <div className="about-fact"><span>Building</span><b>Software · AI · Automation</b></div>
            <a href="https://www.turiba.lv/en" target="_blank" rel="noopener noreferrer" className="about-school-link">
              Turība University <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section section-experience" id="experience">
      <div className="page-container">
        <SectionHeading
          number="03"
          eyebrow="Experience"
          title="Learned on the floor."
          text="Hospitality experience across Latvia, Greece, and the next chapter in Colorado."
        />
        <div className="experience-list">
          {EXPERIENCE.map((item, index) => (
            <article className={`experience-item experience-${item.status.toLowerCase()}`} key={`${item.organization}-${item.role}`} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="experience-marker" aria-hidden="true"><span /></div>
              <div className="experience-copy">
                <div className="experience-topline">
                  <span className={`status-pill status-${item.status.toLowerCase()}`}>{item.status}</span>
                  <span className="experience-period">{item.period}</span>
                </div>
                <h3>{item.role}</h3>
                <p className="experience-org"><b>{item.organization}</b><span>·</span>{item.location}</p>
                <p className="experience-detail">{item.detail}</p>
              </div>
              <div className="experience-index" aria-hidden="true">0{index + 1}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selectedId, setSelectedId] = useState<PreviewKind>("hermes");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(0, PROJECTS.findIndex((project) => project.id === selectedId));
  const project = PROJECTS[selectedIndex];

  function selectProject(index: number, moveFocus = false) {
    const nextProject = PROJECTS[index];
    if (!nextProject) return;
    setSelectedId(nextProject.id);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectProject((index + 1) % PROJECTS.length, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectProject((index - 1 + PROJECTS.length) % PROJECTS.length, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectProject(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectProject(PROJECTS.length - 1, true);
    }
  }

  return (
    <section className="section section-projects" id="projects">
      <div className="page-container">
        <SectionHeading
          number="01"
          eyebrow="Selected projects"
          title="Three practical products."
          text="From cloud-connected agents to newcomer finance and courier workflows, each project starts with a real problem."
        />
        <div className="project-tabs" role="tablist" aria-label="Featured projects">
          <span
            className="project-tab-indicator"
            aria-hidden="true"
            style={{ transform: selectedIndex === 0 ? "translateX(0)" : selectedIndex === 1 ? "translateX(calc(100% + var(--project-tab-gap)))" : "translateX(calc(200% + var(--project-tab-gap) + var(--project-tab-gap)))" }}
          />
          {PROJECTS.map((item, index) => {
            const Icon = item.id === "hermes" ? Bot : item.id === "north" ? Wallet : Bike;
            const selected = item.id === project.id;
            return (
              <button
                className="project-tab"
                id={`project-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`${item.name} ${item.tabLabel}`}
                aria-controls={`project-panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                key={item.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                onClick={() => selectProject(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span className="project-tab-icon"><Icon size={17} aria-hidden="true" /></span>
                <span className="project-tab-text">
                  <b><span className="project-tab-name-full">{item.name}</span><span className="project-tab-name-short">{item.id === "gig" ? "Gig" : item.name}</span></b>
                  <small>{item.tabLabel}</small>
                </span>
              </button>
            );
          })}
        </div>
        <article
          className={`project-panel project-panel-${project.id}`}
          id={`project-panel-${project.id}`}
          role="tabpanel"
          aria-labelledby={`project-tab-${project.id}`}
          tabIndex={0}
          key={project.id}
        >
          <div className="project-panel-visual">
            <ProjectPreview kind={project.preview} />
          </div>
          <div className="project-panel-content">
            <div className="project-meta-row">
              <span className={`status-pill status-${project.statusTone}`}>{project.status}</span>
              <span className="project-category">{project.category}</span>
            </div>
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-contribution">
              <span className="project-overline">MY CONTRIBUTION</span>
              <p>{project.contribution}</p>
            </div>
            <ul className="project-highlights" aria-label={`${project.name} capabilities`}>
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            <div className="project-tags" aria-label={`${project.name} technologies`}>
              {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="project-links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.liveLabel} (opens in a new tab)`}>
                  {project.liveLabel} <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
              {project.sourceUrl && (
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} source on GitHub (opens in a new tab)`}>
                  Source <Github size={14} aria-hidden="true" />
                </a>
              )}
            </div>
            <p className="project-availability-note">{project.availabilityNote}</p>
          </div>
        </article>
        <p className="project-tab-hint"><span aria-hidden="true">↔</span> Use the tabs to explore each project</p>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="section section-toolkit" id="stack">
      <div className="page-container">
        <SectionHeading
          number="04"
          eyebrow="Toolkit"
          title="Tools shaped by the work."
          text="A growing set of skills across software, infrastructure, AI, and hospitality."
        />
        <div className="toolkit-grid">
          {TOOLKIT.map((group, index) => {
            const Icon = group.icon;
            return (
              <article className="toolkit-card" key={group.title} data-reveal style={{ transitionDelay: `${index * 55}ms` }}>
                <div className="toolkit-icon"><Icon size={18} aria-hidden="true" /></div>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            );
          })}
        </div>
        <div className="education-note" data-reveal>
          <span className="education-icon"><GraduationCap size={19} aria-hidden="true" /></span>
          <div><span className="education-kicker">Current education</span><b>International Tourism and Hospitality Management</b><span>Turība University · Latvia</span></div>
          <span className="education-state">In progress</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="page-container">
        <div className="contact-panel" data-reveal>
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-copy">
            <div className="section-kicker"><span>05</span><span className="section-rule" aria-hidden="true" /><span>Contact</span></div>
            <h2>Let’s make<br /><em>useful things.</em></h2>
            <p>For conversations about hospitality, tourism, software, or practical AI, I’d be glad to hear from you.</p>
          </div>
          <div className="contact-actions">
            <a className="contact-email" href="mailto:nikhilsharmaawork@gmail.com">
              <span><Mail size={17} aria-hidden="true" /></span>
              <span><small>Email</small><b>nikhilsharmaawork@gmail.com</b></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <div className="contact-socials">
              <a href="https://github.com/nikhilsharmaawork" target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/in/nikhilsharmaawork" target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
            </div>
            <span className="contact-location"><MapPin size={14} aria-hidden="true" /> Rīga, Latvia</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <a className="footer-brand" href="#top" aria-label="Nikhil Sharma, back to top"><Mark small /><span>Nikhil Sharma</span></a>
        <span className="footer-note">AI agents × practical software <span>·</span> Rīga, Latvia</span>
        <a className="back-top" href="#top">Back to top <ArrowUpRight size={14} aria-hidden="true" /></a>
        <span className="footer-copyright">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default function Index() {
  const [theme, setTheme] = useState<Theme>(readSavedTheme);
  useReveal();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme still works for the current session when storage is unavailable.
    }
  }, [theme]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

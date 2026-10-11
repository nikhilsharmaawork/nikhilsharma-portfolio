import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
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
  Workflow,
  X,
} from "lucide-react";
import ProjectPreview, { type PreviewKind } from "@/components/ProjectPreview";

type Theme = "dark" | "light";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

const PROJECTS: Array<{
  name: string;
  category: string;
  description: string;
  status: string;
  statusTone: "live" | "building" | "personal";
  stack: string[];
  preview: PreviewKind;
  liveUrl?: string;
  sourceUrl?: string;
  liveLabel?: string;
}> = [
  {
    name: "North",
    category: "Personal finance · Dashboard",
    description:
      "A personal finance dashboard for keeping budgets, spending patterns, and day-to-day money in one clear view.",
    status: "Live",
    statusTone: "live",
    stack: ["Next.js", "TypeScript", "Supabase"],
    preview: "north",
    liveUrl: "https://financial-app-north-alpha.vercel.app/",
    sourceUrl: "https://github.com/nikhilsharmaawork/financial-app-north",
    liveLabel: "Open North",
  },
  {
    name: "Gig Companion",
    category: "Courier tools · Income tracking",
    description:
      "A mobile-first companion for Bolt and Wolt couriers, shaped around shift income, expenses, and a clearer view of work over time.",
    status: "In development",
    statusTone: "building",
    stack: ["Next.js", "TypeScript", "Supabase"],
    preview: "gig",
    liveUrl: "https://gig-companion.vercel.app/",
    sourceUrl: "https://github.com/nikhilsharmaawork/GIG-COMPANION-",
    liveLabel: "Open project site",
  },
  {
    name: "Hermes Agent",
    category: "Personal AI · Automation",
    description:
      "A personal agent running on AWS EC2 Ubuntu, with a Telegram interface, model-provider fallback, GitHub integration, and automation capabilities.",
    status: "Personal system",
    statusTone: "personal",
    stack: ["Python", "AWS EC2", "Telegram", "LLM integrations"],
    preview: "hermes",
  },
  {
    name: "AI Crypto Trading Arena",
    category: "Multi-agent systems · Research",
    description:
      "An in-progress multi-agent trading platform. The project is still being built; no performance or profitability claims are implied.",
    status: "In progress",
    statusTone: "building",
    stack: ["AI agents", "Automation"],
    preview: "arena",
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
    <div className="hero-art" aria-label="A visual map of hospitality, software, and automation" role="img">
      <div className="art-orbit art-orbit-one" />
      <div className="art-orbit art-orbit-two" />
      <div className="art-glass-panel art-panel-main">
        <div className="art-panel-top">
          <span className="art-overline">FIELD NOTES / 01</span>
          <span className="art-live-dot"><i /> SYSTEMS THINKING</span>
        </div>
        <div className="art-title">From the floor<br />to the interface.</div>
        <div className="art-flow">
          <div className="art-node">
            <span className="art-node-icon"><Utensils size={16} /></span>
            <span>Real-world<br /><b>operations</b></span>
          </div>
          <span className="art-connector"><i /><i /><i /></span>
          <div className="art-node art-node-accent">
            <span className="art-node-icon"><Network size={16} /></span>
            <span>Useful<br /><b>technology</b></span>
          </div>
        </div>
        <div className="art-divider" />
        <div className="art-bottom-row">
          <span><span className="art-mini-dot blue" /> Software</span>
          <span><span className="art-mini-dot violet" /> AI & automation</span>
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
      <div className="art-caption"><span>01 — 04</span><span>A practical builder’s toolkit</span></div>
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
            Building at the<br />
            intersection of<br />
            <em>hospitality</em> &amp; intelligent technology.
          </h1>
          <p className="hero-lede">
            I work across hospitality operations, software development, AI agents, and automation—turning practical experience into useful technology.
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
        <a href="#about">Scroll to explore <ArrowRight size={13} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section-about" id="about">
      <div className="page-container">
        <SectionHeading
          number="01"
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
          number="02"
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
  return (
    <section className="section section-projects" id="projects">
      <div className="page-container">
        <SectionHeading
          number="03"
          eyebrow="Selected projects"
          title="Ideas made tangible."
          text="A mix of shipped products, personal infrastructure, and work still taking shape. Previews are illustrative interface studies, not product screenshots."
        />
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <article className={`project-card project-card-${project.preview}`} key={project.name} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="project-preview-wrap">
                <ProjectPreview kind={project.preview} />
                <span className="preview-caption">Illustrative interface study</span>
              </div>
              <div className="project-content">
                <div className="project-meta-row">
                  <span className={`status-pill status-${project.statusTone}`}>{project.status}</span>
                  <span className="project-category">{project.category}</span>
                </div>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags" aria-label={`${project.name} technologies`}>
                  {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {(project.liveUrl || project.sourceUrl) ? (
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
                ) : (
                  <p className="project-link-note">No public demo or source link available.</p>
                )}
              </div>
            </article>
          ))}
        </div>
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
        <span className="footer-note">Hospitality × technology <span>·</span> Rīga, Latvia</span>
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
        <About />
        <Experience />
        <Projects />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

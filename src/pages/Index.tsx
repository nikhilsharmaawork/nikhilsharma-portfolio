import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Github,
  Linkedin,
  ChefHat,
  Wine,
  Hotel,
  GraduationCap,
  Code2,
  Brain,
  BarChart3,
  Banknote,
  Users,
} from "lucide-react";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    role: "Commis I / Kitchen Assistant",
    org: "Pavāru Māja",
    meta: "Michelin Green Star · Līgatne, Latvia",
    period: "Current",
    icon: ChefHat,
    bullets: [
      "Cooking and plating in a fine-dining kitchen recognised for sustainability.",
      "Mise en place, station management, and supporting service for tasting menus.",
      "Working with local, seasonal Latvian produce and zero-waste techniques.",
    ],
  },
  {
    role: "Food & Beverage Intern",
    org: "TUI Blue Hotel",
    meta: "Greece",
    period: "Seasonal",
    icon: Hotel,
    bullets: [
      "International resort service across restaurants, bars and events.",
      "Guest-facing hospitality in a high-volume, multicultural environment.",
      "Cross-trained across F&B outlets, banquets and pool service.",
    ],
  },
  {
    role: "Bartender",
    org: "Gastro Pub Duvel's",
    meta: "Rīga, Latvia",
    period: "Previous",
    icon: Wine,
    bullets: [
      "Crafting classic cocktails and curating a Belgian-led beer programme.",
      "Owned bar inventory, stock control and supplier coordination.",
      "Built regulars through attentive, knowledgeable guest experience.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Financial App North",
    tag: "Finance · Web App",
    icon: Banknote,
    desc: "A comprehensive financial management application built to track expenses, visualize spending patterns, and manage budgets with intuitive dashboards.",
    href: "https://github.com/nikhilsharmaawork/financial-app-north",
    tags: ["React", "Node.js", "Data Viz"],
  },
  {
    title: "GIG-COMPANION",
    tag: "Companion · Help",
    icon: Users,
    desc: "A companion tool for gig workers and musicians to manage schedules, track earnings, and organize performance logistics in one place.",
    href: "https://github.com/nikhilsharmaawork/GIG-COMPANION-",
    tags: ["Full Stack", "Scheduling", "Mobile-first"],
  },
  {
    title: "Hospitality Operations Analytics",
    tag: "Data · F&B",
    icon: BarChart3,
    desc: "Lightweight dashboards for restaurants and small hotels: covers, sales mix, stock and labour at a glance.",
    tags: ["Dashboards", "Analytics"],
  },
  {
    title: "AI Agent Experiments",
    tag: "AI · R&D",
    icon: Brain,
    desc: "Prototypes exploring autonomous agents for booking, concierge tasks and back-of-house automation.",
    tags: ["LLMs", "Automation"],
  },
];

const SKILLS = [
  { group: "Hospitality", items: ["Hospitality Operations", "Fine Dining", "Food & Beverage Service", "Bartending", "Guest Experience", "Inventory Management"] },
  { group: "Technology", items: ["React", "Node.js", "Data Visualization", "AI Tools", "Microsoft Office", "Basic Web Development"] },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const SectionLabel = ({ num, children }: { num: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="font-mono text-xs text-gold tracking-widest">{num}</span>
    <span className="h-px w-12 bg-gold/50" />
    <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-muted-foreground">{children}</h2>
  </div>
);

const Monogram = ({ size = "default" }: { size?: "default" | "lg" }) => (
  <div
    className={`inline-flex items-center justify-center border border-gold/60 font-display font-medium text-gold ${
      size === "lg" ? "h-16 w-16 text-3xl" : "h-10 w-10 text-base"
    }`}
    aria-label="NS monogram"
  >
    NS
  </div>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <Monogram />
          <span className="hidden sm:block font-display text-lg">Nikhil Sharma</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="group text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="font-mono text-xs text-gold/70 mr-1.5">0{i + 1}.</span>
              {n.label}
            </a>
          ))}
        </nav>
          <div className="hidden md:flex items-center gap-1 mr-1">
            <a href="https://github.com/nikhilsharmaawork" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors p-2" aria-label="GitHub">
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/nikhilsharmahere" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors p-2" aria-label="LinkedIn">
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground">
            <a href="/nikhil-sharma-cv.pdf" download>
              <Download className="h-4 w-4" /> CV
            </a>
          </Button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-lg">
          <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground"
              >
                <span className="font-mono text-xs text-gold/70 mr-2">0{i + 1}.</span>
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

const Typewriter = ({ texts, speed = 80, deleteSpeed = 40, pause = 2000 }: { texts: string[]; speed?: number; deleteSpeed?: number; pause?: number }) => {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (display.length < current.length) {
        timer = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
      } else {
        timer = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(display.slice(0, -1)), deleteSpeed);
      } else {
        setDeleting(false);
        setIdx((i) => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timer);
  }, [display, deleting, idx, texts, speed, deleteSpeed, pause]);
  return <span>{display}<span className="animate-pulse text-gold">|</span></span>;
};

const Hero = () => (
  <section id="top" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-3xl" />
    </div>
    <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full">
      <div className="flex items-center gap-3 mb-8 animate-fade-up">
        <span className="h-px w-10 bg-gold" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">Hello — I'm</span>
      </div>
      <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-medium leading-[0.95] animate-fade-up" style={{ animationDelay: "0.1s" }}>
        Nikhil <span className="italic gradient-gold-text">Sharma</span>
      </h1>
      <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
          Tourism &amp; Hospitality Student
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mt-1">
          <Typewriter texts={["Hospitality Professional", "AI Builder", "Full Stack Developer"]} />
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <MapPin className="h-4 w-4 text-gold" />
        Based in Rīga, Latvia · Available for internships, graduate roles & startup work
      </div>
      <div className="mt-12 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <Button asChild size="lg" className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none px-8 h-12 group">
          <a href="#contact">
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-border text-muted-foreground hover:text-foreground hover:border-gold/40 rounded-none px-8 h-12">
          <a href="#projects">
            View Projects
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-gold/40 text-foreground hover:bg-gold/10 hover:text-gold rounded-none px-8 h-12">
          <a href="/nikhil-sharma-cv.pdf" download>
            <Download className="h-4 w-4" /> Download CV
          </a>
        </Button>
      </div>
    </div>
    <a
      href="#about"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors flex flex-col items-center gap-3"
    >
      Scroll
      <span className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
    </a>
  </section>
);

const About = () => (
  <section id="about" className="py-28 lg:py-36">
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <div className="reveal">
        <SectionLabel num="01">About</SectionLabel>
      </div>
      <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-3 reveal">
          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-8">
            An Indian student in Latvia, learning hospitality from the kitchen out
            <span className="text-gold">.</span>
          </h3>
          <div className="space-y-5 text-muted-foreground text-base lg:text-lg leading-relaxed">
            <p>
              I'm studying <span className="text-foreground">International Tourism and Hospitality Management</span> at{" "}
              <span className="text-gold">Turiba University</span> in Rīga, and spending my time outside class in
              real kitchens, bars and resort floors.
            </p>
            <p>
              My path so far has moved between Michelin Green Star fine dining, an international resort in Greece,
              and a Belgian gastro pub in Rīga — each one a different angle on what hospitality actually means.
            </p>
            <p>
              In parallel, I build with AI. I'm interested in where thoughtful service meets useful technology:
              tools for travellers, dashboards for operators, and small agents that take real work off people's plates.
            </p>
          </div>
        </div>
        <div className="lg:col-span-2 reveal" style={{ transitionDelay: "0.15s" }}>
          <div className="border border-border bg-card/40 p-8 lg:p-10 space-y-6">
            <Monogram size="lg" />
            <div className="space-y-4 text-sm">
              {[
                ["Location", "Rīga, Latvia"],
                ["Study", "Turiba University"],
                ["Focus", "Hospitality · Tourism · AI"],
                ["Open to", "Internships · Grad roles · Startups"],
                ["Languages", "English · Hindi · Latvian (basics)"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 pb-3 border-b border-border/60 last:border-0 last:pb-0">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{k}</span>
                  <span className="text-right text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-28 lg:py-36 bg-card/30 border-y border-border/60">
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <div className="reveal">
        <SectionLabel num="02">Experience</SectionLabel>
      </div>
      <div className="space-y-6">
        {EXPERIENCE.map((e, i) => {
          const Icon = e.icon;
          return (
            <article
              key={e.role}
              className="reveal group relative border border-border bg-background/40 p-6 lg:p-10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="grid lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-start">
                <div className="h-14 w-14 border border-gold/40 flex items-center justify-center text-gold shrink-0">
                  <Icon className="h-6 w-6" strokeWidth={1.4} />
                </div>
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl">
                    {e.role} <span className="text-gold">@ {e.org}</span>
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-2">{e.meta}</p>
                  <ul className="mt-5 space-y-2.5 text-muted-foreground">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm lg:text-base leading-relaxed">
                        <span className="text-gold mt-1.5">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-gold/80 lg:text-right">{e.period}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="py-28 lg:py-36">
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <div className="reveal">
        <SectionLabel num="03">Selected Projects</SectionLabel>
      </div>
      <div className="reveal mb-12">
        <a
          href="https://github.com/nikhilsharmaawork"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 border border-border bg-card/40 px-6 py-3 rounded-full hover:border-gold/50 hover:text-gold transition-all group"
        >
          <Github className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-widest">View all projects on GitHub</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => {
          const Icon = p.icon;
          const Wrapper = p.href ? "a" : "article";
          return (
            <Wrapper
              key={p.title}
              {...(p.href ? { href: p.href, target: "_blank", rel: "noreferrer" } : {})}
              className={`reveal group relative border border-border bg-card/40 p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                p.href
                  ? "hover:border-gold/50 cursor-pointer"
                  : "border-border"
              }`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold/[0.04] blur-2xl group-hover:bg-gold/10 transition-colors duration-700" />
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <Icon className="h-8 w-8 text-gold" strokeWidth={1.3} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.tag}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl lg:text-3xl mb-3 group-hover:text-gold transition-colors">{p.title}</h3>
                  {p.href && (
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-gold shrink-0 mt-1 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </div>
                <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">{p.desc}</p>
                {"tags" in p && p.tags && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-3 py-1 border border-border/80 text-xs font-mono text-muted-foreground rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-28 lg:py-36 bg-card/30 border-y border-border/60">
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <div className="reveal">
        <SectionLabel num="04">Skills</SectionLabel>
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        {SKILLS.map((s, i) => (
          <div key={s.group} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="flex items-center gap-3 mb-6">
              {s.group === "Hospitality" ? <ChefHat className="h-5 w-5 text-gold" /> : <Code2 className="h-5 w-5 text-gold" />}
              <h3 className="font-display text-2xl">{s.group}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="px-4 py-2 text-sm border border-border bg-background/60 hover:border-gold/50 hover:text-gold transition-colors"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Education = () => (
  <section id="education" className="py-28 lg:py-36">
    <div className="max-w-6xl mx-auto px-6 lg:px-10">
      <div className="reveal">
        <SectionLabel num="05">Education</SectionLabel>
      </div>
      <div className="reveal border border-border bg-card/40 p-8 lg:p-12">
        <div className="grid lg:grid-cols-[auto_1fr_auto] gap-8 items-start">
          <div className="h-16 w-16 border border-gold/40 flex items-center justify-center text-gold shrink-0">
            <GraduationCap className="h-7 w-7" strokeWidth={1.3} />
          </div>
          <div>
            <h3 className="font-display text-3xl lg:text-4xl">Turiba University</h3>
            <p className="text-gold mt-2 font-mono text-xs uppercase tracking-widest">Rīga, Latvia</p>
            <p className="text-lg mt-4 text-foreground">BBA — International Tourism &amp; Hospitality Management</p>
            <p className="text-muted-foreground mt-3 text-sm lg:text-base leading-relaxed max-w-2xl">
              Coursework across hotel and restaurant operations, tourism economics, destination management,
              service design and intercultural communication — paired with hands-on industry placements across Europe.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-gold/80 lg:text-right">In progress</span>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-28 lg:py-40 bg-card/30 border-t border-border/60">
    <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
      <div className="reveal">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">06 — Contact</span>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-6 leading-tight">
          Let's <span className="italic gradient-gold-text">work together</span>
        </h2>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Whether you're hiring for hospitality, scouting a graduate for tourism, or building something at the
          intersection of travel and AI — I'd love to hear from you.
        </p>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none px-8 h-12">
            <a href="mailto:nikhilsharmawork1@gmail.com">
              <Mail className="h-4 w-4" /> nikhilsharmawork1@gmail.com
            </a>
          </Button>
        </div>
        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/nikhil-sharma1424"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm">LinkedIn</span>
            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <span className="h-4 w-px bg-border" />
          <a
            href="https://github.com/nikhilsharmaawork"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm">GitHub</span>
            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Monogram />
        <div className="font-mono text-xs text-muted-foreground">
          Nikhil Sharma · Rīga, Latvia · © {new Date().getFullYear()}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a href="mailto:nikhilsharmawork1@gmail.com" className="text-muted-foreground hover:text-gold transition-colors" aria-label="Email">
          <Mail className="h-4 w-4" />
        </a>
        <a href="https://github.com/nikhilsharmaawork" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors" aria-label="GitHub">
          <Github className="h-4 w-4" />
        </a>
        <a href="https://www.linkedin.com/in/nikhil-sharma1424" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-gold transition-colors" aria-label="LinkedIn">
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

const Index = () => {
  useReveal();
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;

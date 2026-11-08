import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Code2,
  Globe,
  Terminal,
  Lock,
  Wifi,
  GitBranch,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Award,
  BookOpen,
  Target,
  Layers,
  Database,
  Server,
  ArrowRight,
  CheckCircle2,
  Circle,
  Cpu,
  Network,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────
interface NavItem { label: string; href: string }
interface SkillCard { icon: React.ElementType; title: string; desc: string; category: string }
interface Project { title: string; desc: string; tags: string[]; image: string; url: string; repoUrl: string; badge: string }
interface Collaboration { title: string; desc: string; repoUrl: string; liveUrl?: string; status: string; image?: string; imageAlt?: string; liveAvailable?: boolean }
interface TimelineItem { year: string; title: string; desc: string; done: boolean }
interface CertCard { org: string; title: string; desc: string; status: "earned" | "in-progress" | "planned"; icon: React.ElementType }

// ─── DATA ─────────────────────────────────────────────────
const NAV: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Recognition", href: "#achievements" },
  { label: "Contributions", href: "#contributions" },
  { label: "Training", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const CONTACT_EMAIL = "emmanuelmadall441@gmail.com";
const GITHUB_URL = "https://github.com/dev-Simon-EM";
const LINKEDIN_URL = "https://www.linkedin.com/in/emmanuel-simon-dev";

const SKILLS: SkillCard[] = [
  // Cybersecurity
  { icon: Shield, title: "Ethical Hacking", desc: "Hands-on penetration testing fundamentals and responsible disclosure methodology.", category: "Cybersecurity" },
  { icon: Target, title: "Vulnerability Assessment", desc: "Identifying and evaluating security weaknesses in systems and applications.", category: "Cybersecurity" },
  { icon: Lock, title: "OWASP Concepts", desc: "Understanding and mitigating the top web application security risks.", category: "Cybersecurity" },
  { icon: BookOpen, title: "Security Fundamentals", desc: "CIA triad, threat modeling, incident response, and defense-in-depth principles.", category: "Cybersecurity" },
  // Development
  { icon: Globe, title: "HTML & CSS", desc: "Semantic markup, responsive layouts, and modern CSS design systems.", category: "Development" },
  { icon: Code2, title: "JavaScript", desc: "DOM manipulation, async patterns, and modern ES6+ development.", category: "Development" },
  { icon: Terminal, title: "Python", desc: "Scripting, automation, data handling, and security tooling with Python.", category: "Development" },
  { icon: Layers, title: "React", desc: "Component-driven UI architecture with hooks and state management.", category: "Development" },
  // Technology
  { icon: Server, title: "Linux", desc: "Command-line proficiency, system administration, and shell scripting.", category: "Technology" },
  { icon: Network, title: "Networking", desc: "TCP/IP, DNS, HTTP/S, VPN, firewalls, and network traffic analysis.", category: "Technology" },
  { icon: GitBranch, title: "Git / GitHub", desc: "Version control, branching strategies, and collaborative development workflows.", category: "Technology" },
  { icon: Database, title: "Databases", desc: "Relational and document-based data modeling and querying fundamentals.", category: "Technology" },
];

const PROJECTS: Project[] = [
  {
    title: "GoodAngel D Travel and Tour",
    desc: "A responsive travel and study-abroad website with tours, visa information, destination pages, and enquiry pathways.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=640&h=380&fit=crop&auto=format",
    url: "https://dev-simon-em.github.io/GoodAngel-D-Travel-and-Tour/",
    repoUrl: "https://github.com/dev-Simon-EM/GoodAngel-D-Travel-and-Tour",
    badge: "Live Site",
  },
  {
    title: "Personal Portfolio",
    desc: "My portfolio for selected projects, team contributions, and learning milestones.",
    tags: ["React", "TypeScript", "Vite"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=640&h=380&fit=crop&auto=format",
    url: "https://dev-simon-em.github.io/Personal-Portfolio/",
    repoUrl: "https://github.com/dev-Simon-EM/Personal-Portfolio",
    badge: "This Site",
  },
  {
    title: "Dall Tech",
    desc: "A technology and cybersecurity services website for web development, consulting, and digital solutions.",
    tags: ["React", "TypeScript", "Vite"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=380&fit=crop&auto=format",
    url: "https://dev-simon-em.github.io/Dall-Tech/",
    repoUrl: "https://github.com/dev-Simon-EM/Dall-Tech",
    badge: "Live Site",
  },
  {
    title: "Dalglobal Ventures",
    desc: "An agricultural trading and supply website for grain products, sourcing, distribution, and customer enquiries.",
    tags: ["React", "TypeScript", "Vite"],
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=640&h=380&fit=crop&auto=format",
    url: "https://dev-simon-em.github.io/Dall-Global-Ventures/",
    repoUrl: "https://github.com/dev-Simon-EM/Dall-Global-Ventures",
    badge: "Live Site",
  },
  {
    title: "Heavens Gate Atelier",
    desc: "A fashion atelier site presenting clothing repairs, alterations, and direct customer enquiries.",
    tags: ["React", "TypeScript", "Vite"],
    image: "https://images.pexels.com/photos/4622423/pexels-photo-4622423.jpeg?auto=compress&cs=tinysrgb&w=1200",
    url: "https://dev-simon-em.github.io/heavens-gate-atelier/",
    repoUrl: "https://github.com/dev-Simon-EM/heavens-gate-atelier",
    badge: "Live Site",
  },
];

const COLLABORATIONS: Collaboration[] = [
  {
    title: "Squadlink",
    desc: "A digital local-commerce platform developed with a team for Nascomsoft Hackathon 2.0.",
    repoUrl: "https://github.com/zumunchiYohanna/Hackathon-project",
    liveUrl: "https://quadlink-frontend.vercel.app/",
    status: "Deployment unavailable",
    image: "previews/squadlink-scenery.jpg",
    imageAlt: "Campus and delivery rider artwork from the Squadlink project repository",
    liveAvailable: false,
  },
  {
    title: "Sazu Study Hub",
    desc: "A collaborative learning platform.",
    repoUrl: "https://github.com/wisdomdanladi01-hash/sazu-study-hub",
    liveUrl: "https://sazu-study-hub.vercel.app/",
    status: "Live platform",
    image: "previews/sazu-study-hub.png",
    imageAlt: "Screenshot of the live Sazu Study Hub learning platform",
    liveAvailable: true,
  },
  {
    title: "Zes AI Companion",
    desc: "A collaborative AI companion project; it is not hosted live yet.",
    repoUrl: "https://github.com/zumunchiYohanna/Zes-Ai-Companion",
    status: "In development",
  },
];

const JOURNEY: TimelineItem[] = [
  { year: "2022", title: "Web Development Foundation", desc: "Started building responsive websites with HTML, CSS, and JavaScript. Early projects included GoodAngel D and Dalglobal Ventures.", done: true },
  { year: "2023", title: "Programming Expansion", desc: "Expanded into Python, Git and GitHub workflows, and database fundamentals.", done: true },
  { year: "2024", title: "Cisco Cybersecurity Fundamentals", desc: "Completed Cisco Networking Academy's Introduction to Cybersecurity course.", done: true },
  { year: "2024", title: "Ethical Hacking Practice", desc: "Began hands-on practice with security labs and cybersecurity learning platforms.", done: true },
  { year: "2025", title: "Security Learning", desc: "Continued developing a structured foundation in cybersecurity and penetration-testing concepts.", done: true },
  { year: "2026", title: "Nascomsoft Hackathon 2.0", desc: "Concluded the hackathon with Squadlink on 10 October 2026, earning 2nd Runner-Up (3rd place) with the team.", done: true },
];

const CERTS: CertCard[] = [
  { org: "Cisco Networking Academy", title: "Introduction to Cybersecurity", desc: "Completed foundational training in cybersecurity concepts, threats, and protection practices.", status: "earned", icon: Network },
];

// ─── UTILITIES ─────────────────────────────────────────────
function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── COMPONENTS ────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-5 h-px bg-primary" />
      <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">{children}</span>
    </div>
  );
}

function AnimatedSkillCard({ skill, index }: { skill: SkillCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Icon = skill.icon;
  return (
    <div
      ref={ref}
      className="bg-card border border-border rounded-xl p-5 group hover:border-primary/40 hover:bg-secondary transition-all duration-300 cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms, background-color 0.3s, border-color 0.3s`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          <Icon size={18} className="text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1.5 tracking-tight">{skill.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{skill.desc}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/40 transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-video bg-secondary">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
        <span className="absolute top-3 left-3 font-mono text-xs px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary backdrop-blur-sm">
          {project.badge}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-xs px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-accent transition-colors group/link"
          >
            Live Website
            <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source on GitHub`}
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={14} />
            Source
          </a>
        </div>
      </div>
    </div>
  );
}

function CertCard({ cert }: { cert: CertCard }) {
  const Icon = cert.icon;
  const statusMap = {
    earned: { label: "Earned", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", dot: "bg-emerald-400" },
    "in-progress": { label: "In Progress", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", dot: "bg-amber-400" },
    planned: { label: "Planned", color: "text-muted-foreground", bg: "bg-secondary border-border", dot: "bg-muted-foreground" },
  };
  const s = statusMap[cert.status];

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon size={20} className="text-primary" />
        </div>
        <span className={`flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-full border ${s.bg} ${s.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
      </div>
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-1.5">{cert.org}</p>
      <h3 className="text-sm font-semibold text-foreground mb-2 tracking-tight">{cert.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{cert.desc}</p>
    </div>
  );
}

// ─── HERO BACKGROUND SVG ───────────────────────────────────
function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <svg className="absolute right-0 top-0 w-full h-full opacity-[0.055]" viewBox="0 0 900 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hexagonal grid nodes */}
        {[
          [150,120],[280,80],[410,140],[560,90],[700,130],[820,70],
          [100,260],[230,300],[370,240],[500,280],[640,230],[780,270],
          [180,420],[310,380],[450,440],[590,400],[730,370],[850,430],
          [120,560],[260,520],[400,580],[540,540],[680,500],[820,570],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#2d7cf6" />
        ))}
        {/* Connection lines */}
        {[
          "150,120 280,80", "280,80 410,140", "410,140 560,90", "560,90 700,130",
          "150,120 100,260", "280,80 230,300", "410,140 370,240", "560,90 500,280",
          "700,130 640,230", "100,260 230,300", "230,300 370,240", "370,240 500,280",
          "500,280 640,230", "640,230 780,270", "100,260 180,420", "230,300 310,380",
          "370,240 450,440", "500,280 590,400", "640,230 730,370", "780,270 850,430",
          "180,420 310,380", "310,380 450,440", "450,440 590,400", "590,400 730,370",
          "180,420 120,560", "310,380 260,520", "450,440 400,580", "590,400 540,540",
          "120,560 260,520", "260,520 400,580",
        ].map((pts, i) => (
          <line key={i} x1={pts.split(" ")[0].split(",")[0]} y1={pts.split(" ")[0].split(",")[1]}
            x2={pts.split(" ")[1].split(",")[0]} y2={pts.split(" ")[1].split(",")[1]}
            stroke="#2d7cf6" strokeWidth="0.8" />
        ))}
        {/* Shield outline */}
        <path d="M720 200 L760 210 L760 260 Q760 290 720 310 Q680 290 680 260 L680 210 Z"
          stroke="#06b6d4" strokeWidth="1.2" fill="none" opacity="0.6" />
        {/* Lock icon suggestion */}
        <rect x="640" y="440" width="50" height="40" rx="4" stroke="#2d7cf6" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M655 440 L655 430 Q665 420 675 430 L675 440" stroke="#2d7cf6" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Circular ring */}
        <circle cx="820" cy="380" r="45" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="6 4" fill="none" opacity="0.4" />
        <circle cx="820" cy="380" r="30" stroke="#2d7cf6" strokeWidth="0.5" fill="none" opacity="0.3" />
      </svg>
      {/* Radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" />
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [skillTab, setSkillTab] = useState<"Cybersecurity" | "Development" | "Technology">("Cybersecurity");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "achievements", "contributions", "journey", "certifications", "contact"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollTo(href);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${formState.name || "N/A"}\nEmail: ${formState.email || "N/A"}\n\nMessage:\n${formState.message || ""}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const filteredSkills = SKILLS.filter(s => s.category === skillTab);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── NAVIGATION ─────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); handleNav("#home"); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <span className="font-serif text-lg font-semibold text-primary">S</span>
            </div>
            <div>
              <span
                className="text-sm font-semibold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Simon E.M
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNav(href)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeSection === href.slice(1)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("#contact")}
              className="hidden xl:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Hire Me
            </button>
            <button
              className="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="xl:hidden bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
              {NAV.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNav(href)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 border-b border-primary/40 pb-2 mb-7">
                <span className="font-mono text-xs text-primary tracking-widest">DEVELOPMENT · COLLABORATION · SECURITY</span>
              </div>

              <h1
                className="text-5xl md:text-6xl font-bold tracking-tight mb-3 leading-[1.08]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Simon
                <br />
                <span className="text-primary">Emmanuel</span>
                <br />
                Madalla
              </h1>

              <div className="flex flex-wrap gap-2 mb-6 mt-5">
                {["Web Developer", "Digital Product Builder", "Cybersecurity Learner"].map(role => (
                  <span key={role} className="font-mono text-xs px-3 py-1.5 border-l-2 border-accent bg-secondary text-muted-foreground">
                    {role}
                  </span>
                ))}
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-md">
                I build useful digital experiences, collaborate on products for real communities, and keep growing my knowledge of networking and cybersecurity.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleNav("#projects")}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  View Projects
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => handleNav("#contact")}
                  className="flex items-center gap-2 px-6 py-3 rounded-sm border border-border text-muted-foreground text-sm font-medium hover:border-primary/40 hover:text-foreground transition-colors"
                >
                  <Mail size={15} />
                  Contact Me
                </button>
              </div>

              <div className="flex items-center gap-6 mt-10">
                {[
                  { icon: Github, href: GITHUB_URL, label: "GitHub" },
                  { icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline text-xs font-mono tracking-wide">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — profile + stats */}
            <div className="flex flex-col items-center md:items-end gap-6">
              {/* Profile placeholder */}
              <div className="relative w-full max-w-[440px]">
                <div className="aspect-[4/5] max-h-[520px] bg-secondary overflow-hidden flex items-center justify-center">
                  <img
                    src="simon.png"
                    alt="Simon Emmanuel Madalla — professional headshot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 max-w-[230px] bg-accent px-4 py-3 text-white">
                  <p className="font-mono text-xs mb-1">RECOGNITION · 2026</p>
                  <p className="text-sm font-semibold">Nascomsoft Hackathon 2.0</p>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 bg-background border border-border px-3 py-2">
                  <p className="font-mono text-xs text-primary">2ND RUNNER-UP</p>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                {[
                  { value: "05", label: "Live websites" },
                  { value: "03", label: "Team projects" },
                  { value: "03rd", label: "Hackathon place" },
                ].map(({ value, label }) => (
                  <div key={label} className="border-t-2 border-primary py-3 text-center">
                    <p className="text-lg font-bold text-primary font-mono">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
          <span className="font-mono text-xs text-muted-foreground/40 tracking-widest">scroll</span>
          <ChevronDown size={14} className="text-muted-foreground/40" />
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────── */}
      <section id="about" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>About</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Developer &amp; <span className="text-primary">Product</span>
                <br />Builder
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I started in web development, building responsive websites for businesses and practical digital products with other developers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I continue to grow through team projects, hands-on product work, and structured learning in networking and cybersecurity.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Base", value: "Nigeria" },
                  { label: "Focus", value: "Digital Products" },
                  { label: "Experience", value: "Web Development" },
                  { label: "Learning", value: "Cybersecurity" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-secondary rounded-xl px-4 py-3 border border-border">
                    <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3
                className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8 font-mono"
              >
                Learning Journey
              </h3>
              <div className="relative pl-6 border-l border-border space-y-8">
                {JOURNEY.map((item, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full border-2 ${
                      item.done ? "border-primary bg-primary/30" : "border-border bg-background"
                    }`} />
                    <span className="font-mono text-xs text-primary mb-1 block">{item.year}</span>
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────── */}
      <section id="skills" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Technical <span className="text-primary">Capabilities</span>
            </h2>
            <div className="flex gap-2 flex-wrap">
              {(["Cybersecurity", "Development", "Technology"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSkillTab(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    skillTab === cat
                      ? "bg-primary text-white"
                      : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredSkills.map((skill, i) => (
              <AnimatedSkillCard key={skill.title} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────────────── */}
      <section id="projects" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Projects</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Built <span className="text-primary">Work</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs md:text-right">
              Real websites and applications delivered for clients and personal development.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map(project => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RECOGNITION ────────────────────────────────── */}
      <section id="achievements" className="py-24 border-t border-border bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
          <div className="max-w-2xl">
            <SectionLabel>Recognition · 2026</SectionLabel>
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A local-commerce idea, built as a team.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Squadlink is a digital local-commerce platform developed with my team for Nascomsoft Hackathon 2.0. We earned 2nd Runner-Up, placing third overall.
            </p>
            <div className="flex flex-wrap gap-5">
              <a className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent" href="https://quadlink-frontend.vercel.app/" target="_blank" rel="noopener noreferrer">
                Visit Squadlink <ExternalLink size={14} />
              </a>
              <a className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent" href="https://github.com/zumunchiYohanna/Hackathon-project" target="_blank" rel="noopener noreferrer">
                Explore the team repository <Github size={14} />
              </a>
            </div>
          </div>
          <figure className="relative m-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={`${import.meta.env.BASE_URL}previews/squadlink-scenery.jpg`}
                alt="Campus and delivery rider artwork from the Squadlink project repository"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-6 pt-16 text-white">
                <p className="font-mono text-xs tracking-widest">NASCOMSOFT HACKATHON 2.0 · 10 OCT 2026</p>
                <p className="mt-2 text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>2nd Runner-Up</p>
                <p className="text-sm text-white/80">Third place · Squadlink team</p>
              </div>
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">Squadlink project artwork. The team award photo is not yet available in the project files.</figcaption>
          </figure>
        </div>
      </section>

      {/* ── COLLABORATIONS ────────────────────────────── */}
      <section id="contributions" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Team Contributions</SectionLabel>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Built <span className="text-primary">together</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Alongside independent projects, I have contributed to collaborative platform work with other developers.
              </p>
            </div>
            <div>
              <div className="grid md:grid-cols-2 gap-5">
                {COLLABORATIONS.filter(project => project.image).map(project => (
                  <article key={project.title} className="min-w-0 border border-border bg-card">
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                      <img
                        src={`${import.meta.env.BASE_URL}${project.image}`}
                        alt={project.imageAlt || `${project.title} project preview`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className={`absolute left-3 top-3 bg-background/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${project.liveAvailable ? "text-primary" : "text-accent"}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                        {project.liveAvailable && project.liveUrl ? (
                          <a className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            View live platform <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-xs font-medium text-accent">Provided deployment URL currently returns 404</span>
                        )}
                        <a className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          Source repository <Github size={13} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {COLLABORATIONS.filter(project => !project.image).map(project => (
                <article key={project.title} className="mt-5 flex flex-col gap-3 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>{project.title}</h3>
                      <span className="font-mono text-xs text-muted-foreground">{project.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{project.desc}</p>
                  </div>
                  <a className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    Source repository <Github size={13} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CYBERSECURITY JOURNEY ──────────────────────── */}
      <section id="journey" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Cybersecurity Journey</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Path into <span className="text-primary">Security</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Cybersecurity is not a destination — it is a discipline. Below is my structured
                progression from security awareness into hands-on practice and professional certification.
              </p>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Current Platforms</p>
                <div className="space-y-3">
                  {[
                    { name: "Cisco Networking Academy", desc: "Structured security curriculum", done: true },
                    { name: "Hack The Box", desc: "Practical CTF & lab challenges", done: true },
                    { name: "TryHackMe", desc: "Guided learning paths", done: true },
                    { name: "CompTIA Study", desc: "Security+ exam preparation", done: false },
                  ].map(({ name, desc, done }) => (
                    <div key={name} className="flex items-start gap-3">
                      {done
                        ? <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                        : <Circle size={16} className="text-border shrink-0 mt-0.5" />
                      }
                      <div>
                        <p className="text-sm font-medium text-foreground">{name}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative pl-6 border-l border-border space-y-8">
              {JOURNEY.map((item, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[1.6rem] top-1 w-3 h-3 rounded-full border-2 ${
                    item.done
                      ? "border-primary bg-primary/30"
                      : "border-dashed border-border bg-background"
                  }`} />
                  <div className={`${!item.done ? "opacity-50" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-primary">{item.year}</span>
                      {!item.done && (
                        <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                          Goal
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────── */}
      <section id="certifications" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Training</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Courses &amp; <span className="text-primary">Credentials</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTS.map(cert => (
              <CertCard key={cert.title} cert={cert} />
            ))}
          </div>
          <div className="mt-8 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Cpu size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Continuous Learning</h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                  Certifications are milestones, not the goal. Alongside formal credentials, I maintain consistent
                  hands-on practice through lab environments, CTF challenges, and security research to ensure
                  skills remain sharp and current with the evolving threat landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────── */}
      <section id="contact" className="py-28 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Contact</SectionLabel>
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Let&apos;s Build <span className="text-primary">Secure</span>
                <br />Solutions
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Open to security internships, junior developer roles, freelance web projects, and
                collaborative learning opportunities. If you have a challenge worth solving, let&apos;s talk.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                  { icon: Github, label: "GitHub", value: GITHUB_URL.replace("https://", ""), href: GITHUB_URL },
                  { icon: Linkedin, label: "LinkedIn", value: LINKEDIN_URL.replace("https://", ""), href: LINKEDIN_URL },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-secondary transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{value}</p>
                    </div>
                    <ArrowRight size={14} className="text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3
                className="text-lg font-semibold text-foreground mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Send a Message
              </h3>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your project, opportunity, or question..."
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  <Mail size={15} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-primary/30 flex items-center justify-center">
              <span className="font-serif text-primary">S</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Simon Emmanuel Madalla
              </p>
              <p className="font-mono text-xs text-muted-foreground">Digital Products · Development · Lifelong Learning</p>
            </div>
          </div>
          <p className="font-mono text-xs text-muted-foreground/50">
            © 2026 — Built with purpose and precision
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: GITHUB_URL },
              { icon: Linkedin, href: LINKEDIN_URL },
              { icon: Mail, href: `mailto:${CONTACT_EMAIL}` },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// SkillsFirstResume.jsx
// Skills-first / Functional resume layout built with Tailwind CSS.
// Leads with summary, competencies, and achievements before work history.
// Great for career changers or senior professionals.

// ─── Default sample data ──────────────────────────────────────────────────────
const DEFAULT_RESUME = {
  name: "John Smith",
  title: "Senior Software Engineer",
  contact: {
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
  },
  summary:
    "Results-driven engineer with 8+ years of experience building scalable applications and leading high-performing teams. Passionate about clean architecture, mentorship, and delivering measurable business impact.",
  competencies: [
    { id: "c1", label: "Frontend Development" },
    { id: "c2", label: "Backend Development" },
    { id: "c3", label: "Cloud Architecture" },
    { id: "c4", label: "Team Lead & Mentorship" },
    { id: "c5", label: "Agile Methodology" },
    { id: "c6", label: "Database Design" },
  ],
  achievements: [
    "Led team of 5 engineers delivering $2M in new annual revenue",
    "Improved performance by 40% across 3 production applications",
    "Mentored 6 junior developers, all receiving promotions within 18 months",
    "Architected microservices migration reducing infra costs by 30%",
  ],
  workHistory: [
    { id: "wh-1", role: "Senior Developer",   company: "Tech Corp",    startDate: "2022", endDate: "Present" },
    { id: "wh-2", role: "Software Engineer",  company: "Innovate Inc", startDate: "2019", endDate: "2022"    },
    { id: "wh-3", role: "Junior Developer",   company: "Startup Lab",  startDate: "2017", endDate: "2019"    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Stanford University",
      degree: "B.S. Computer Science",
      year: "2019",
    },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <div className="mb-3">
      <h2 className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-800 mb-1.5">
        {children}
      </h2>
      <div className="h-px bg-slate-300" />
    </div>
  );
}

function Summary({ text }) {
  return (
    <section className="mb-5">
      <SectionHeading>Professional Summary</SectionHeading>
      <p className="text-[12px] text-slate-600 leading-relaxed">{text}</p>
    </section>
  );
}

function Competencies({ items }) {
  // chunk into rows of 3
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push(items.slice(i, i + 3));
  }
  return (
    <section className="mb-5">
      <SectionHeading>Core Competencies</SectionHeading>
      <div className="border border-slate-200 rounded-sm overflow-hidden">
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={`grid grid-cols-3 divide-x divide-slate-200 ${
              ri > 0 ? "border-t border-slate-200" : ""
            }`}
          >
            {row.map((item) => (
              <div key={item.id} className="px-4 py-3">
                <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
            {/* fill empty cells if row is incomplete */}
            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="px-4 py-3" />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Achievements({ items }) {
  return (
    <section className="mb-5">
      <SectionHeading>Key Achievements</SectionHeading>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[12px] text-slate-600 leading-snug">
            <span className="text-slate-800 shrink-0 mt-px font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WorkHistory({ items }) {
  return (
    <section className="mb-5">
      <SectionHeading>Work History</SectionHeading>
      <div className="space-y-1">
        {items.map((entry) => (
          <div
            key={entry.id}
            className="grid text-[11.5px] items-baseline"
            style={{ gridTemplateColumns: "1fr auto auto" }}
          >
            <span className="text-slate-600 italic">{entry.role}</span>
            <span className="font-bold tracking-widest uppercase text-slate-800 text-[10.5px] px-4 border-l border-r border-slate-200 mx-3 py-0.5">
              {entry.company}
            </span>
            <span className="text-slate-400 text-[10.5px] tabular-nums">
              {entry.startDate}–{entry.endDate}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education({ items }) {
  return (
    <section>
      <SectionHeading>Education</SectionHeading>
      <ul className="space-y-1">
        {items.map((edu) => (
          <li key={edu.id} className="text-[12px] text-slate-600">
            <span className="font-semibold text-slate-800">{edu.school}</span>
            {" — "}
            {edu.degree}
            {edu.year && (
              <span className="text-slate-400 ml-1">({edu.year})</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * SkillsFirstResume
 *
 * Props:
 *   data – resume data object (defaults to sample data)
 *
 * Data shape:
 * {
 *   name: string,
 *   title: string,
 *   contact: { email, phone, location },
 *   summary: string,
 *   competencies: [{ id, label }],           // rendered in 3-col grid
 *   achievements: string[],
 *   workHistory:  [{ id, role, company, startDate, endDate }],
 *   education:    [{ id, school, degree, year }],
 * }
 */
export default function SkillsFirstResume({ data = DEFAULT_RESUME }) {
  return (
    <div className="bg-white max-w-3xl mx-auto shadow-lg border-t-4 border-slate-800 font-serif">

      {/* ── Header ── */}
      <header className="text-center px-10 pt-9 pb-6 border-b border-slate-300">
        <h1 className="text-2xl font-bold tracking-[0.14em] uppercase text-slate-800 mb-1">
          {data.name}
        </h1>
        <p className="text-sm italic text-slate-500 mb-1.5">{data.title}</p>
        <p className="text-xs text-slate-400 tracking-wide">
          {[data.contact.email, data.contact.phone, data.contact.location]
            .filter(Boolean)
            .join("  |  ")}
        </p>
      </header>

      {/* ── Body ── */}
      <div className="px-10 pt-6 pb-8">
        <Summary text={data.summary} />
        <Competencies items={data.competencies} />
        <Achievements items={data.achievements} />
        <WorkHistory items={data.workHistory} />
        <Education items={data.education} />
      </div>

    </div>
  );
}
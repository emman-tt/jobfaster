// MinimalistResume.jsx
// Minimalist / Clean resume layout built with Tailwind CSS.
// Left-anchored date column, sparse contact block, typography-led design.
// Great for creative fields, designers, or anyone who wants quiet refinement.

// ─── Default sample data ──────────────────────────────────────────────────────
const DEFAULT_RESUME = {
  name: "John Smith",
  title: "Senior Software Engineer",
  contact: {
    location: "San Francisco, CA",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    linkedin: "linkedin.com/in/johnsmith",
  },
  summary:
    "Engineer with 8 years experience in full-stack development and team leadership. Focused on clean architecture, performance, and growing the people around me.",
  experience: [
    {
      id: "exp-1",
      startDate: "2022",
      endDate: "Present",
      role: "Senior Developer",
      company: "Tech Corp",
      location: "San Francisco",
      bullets: [
        "Led team of 5 engineers delivering 3 major projects",
        "40% performance improvement across core applications",
        "Mentored 3 junior developers to senior promotions",
      ],
    },
    {
      id: "exp-2",
      startDate: "2019",
      endDate: "2022",
      role: "Software Engineer",
      company: "Innovate Inc",
      location: "Seattle",
      bullets: [
        "Built 3 major customer-facing features",
        "Reduced bug reports by 25% through testing culture",
        "Led adoption of CI/CD pipelines across 4 teams",
      ],
    },
    {
      id: "exp-3",
      startDate: "2017",
      endDate: "2019",
      role: "Junior Developer",
      company: "Startup Lab",
      location: "Portland",
      bullets: [
        "Shipped mobile app MVP in 6 weeks",
        "Contributed to open-source component library",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      startDate: "2015",
      endDate: "2019",
      degree: "B.S. Computer Science",
      school: "Stanford University",
      detail: "GPA: 3.8",
    },
  ],
};

// ─── Contact icon map ─────────────────────────────────────────────────────────
// SVG paths instead of emoji for print fidelity
const icons = {
  location: (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 shrink-0 mt-px" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 shrink-0 mt-px" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1" />
      <path d="M1.5 4.5l6.5 5 6.5-5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 shrink-0 mt-px" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 2h3l1.5 3.5-1.75 1.25C6.5 8.5 7.5 9.5 9.25 10.25L10.5 8.5 14 10v3c0 .55-.45 1-1 1C5.16 14 2 10.84 2 3c0-.55.45-1 1-1z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 shrink-0 mt-px">
      <path d="M2.5 1A1.5 1.5 0 1 0 2.5 4 1.5 1.5 0 0 0 2.5 1zM1 5.5h3V14H1zM5.5 5.5H8v1.17C8.46 5.9 9.3 5.3 10.5 5.3c2.2 0 3.5 1.45 3.5 4.1V14h-3v-4.25c0-1.01-.36-1.7-1.26-1.7-.69 0-1.1.46-1.28.91-.07.16-.08.39-.08.62V14H5.5z" />
    </svg>
  ),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionRule({ label }) {
  return (
    <div className="mb-4">
      <h2 className="text-[9.5px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
        {label}
      </h2>
      <div className="h-px bg-slate-200" />
    </div>
  );
}

function ContactRow({ icon, value, href }) {
  const content = (
    <span className="text-[11.5px] text-slate-500">{value}</span>
  );
  return (
    <div className="flex items-start gap-2 text-slate-400">
      {icon}
      {href ? (
        <a href={href} className="text-[11.5px] text-slate-500 hover:text-slate-800 transition-colors">
          {value}
        </a>
      ) : content}
    </div>
  );
}

function TimelineEntry({ entry, isEducation = false }) {
  return (
    <div className="grid gap-x-5 mb-5 last:mb-0" style={{ gridTemplateColumns: "80px 1fr" }}>
      {/* Date column */}
      <div className="text-right pt-px">
        <span className="text-[10px] text-slate-400 tabular-nums leading-tight">
          {entry.startDate}–<br />{entry.endDate ?? entry.year}
        </span>
      </div>

      {/* Content column */}
      <div>
        <p className="text-[11.5px] font-bold tracking-[0.1em] uppercase text-slate-800 mb-0.5">
          {isEducation ? entry.degree : entry.role}
        </p>
        <p className="text-[11px] text-slate-500 italic mb-2">
          {isEducation
            ? `${entry.school}${entry.detail ? `, ${entry.detail}` : ""}`
            : `${entry.company}, ${entry.location}`}
        </p>
        {entry.bullets && (
          <ul className="space-y-1">
            {entry.bullets.map((b, i) => (
              <li key={i} className="flex gap-1.5 text-[11px] text-slate-500 leading-snug">
                <span className="text-slate-700 shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * MinimalistResume
 *
 * Props:
 *   data – resume data object (defaults to sample data)
 *
 * Data shape:
 * {
 *   name: string,
 *   title: string,
 *   contact: { location, email, phone, linkedin? },
 *   summary: string,
 *   experience: [{ id, startDate, endDate, role, company, location, bullets[] }],
 *   education:  [{ id, startDate, endDate, degree, school, detail? }],
 * }
 */
export default function LeftAlligned({ data = DEFAULT_RESUME }) {
  return (
    <div className="bg-white max-w-2xl mx-auto shadow-md font-sans">

      {/* ── Header — left-aligned, no border accent ── */}
      <header className="px-10 pt-9 pb-6 border-b-2 border-slate-800">
        <h1 className="text-[22px] font-bold tracking-[0.08em] uppercase text-slate-900 mb-0.5">
          {data.name}
        </h1>
        <p className="text-[13px] text-slate-500">{data.title}</p>
      </header>

      {/* ── Body ── */}
      <div className="px-10 pt-6 pb-10 space-y-6">

        {/* Contact block */}
        <div className="space-y-1.5">
          {data.contact.location && (
            <ContactRow icon={icons.location} value={data.contact.location} />
          )}
          {data.contact.email && (
            <ContactRow icon={icons.email} value={data.contact.email} href={`mailto:${data.contact.email}`} />
          )}
          {data.contact.phone && (
            <ContactRow icon={icons.phone} value={data.contact.phone} />
          )}
          {data.contact.linkedin && (
            <ContactRow icon={icons.linkedin} value={data.contact.linkedin} href={`https://${data.contact.linkedin}`} />
          )}
        </div>

        {/* Summary */}
        <div>
          <SectionRule label="Summary" />
          <p className="text-[12px] text-slate-600 leading-relaxed">{data.summary}</p>
        </div>

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div>
            <SectionRule label="Experience" />
            {data.experience.map((exp) => (
              <TimelineEntry key={exp.id} entry={exp} />
            ))}
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div>
            <SectionRule label="Education" />
            {data.education.map((edu) => (
              <TimelineEntry key={edu.id} entry={edu} isEducation />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
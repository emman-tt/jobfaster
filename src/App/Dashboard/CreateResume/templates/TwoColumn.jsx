// TwoColumnResume.jsx
// Two-column classic resume layout built with Tailwind CSS utility classes.
// Requires Tailwind CSS to be configured in your project.

// ─── Default sample data ──────────────────────────────────────────────────────
const DEFAULT_RESUME = {
  name: "John Smith",
  title: "Senior Software Engineer",
  contact: {
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
  },
  experience: [
    {
      id: "exp-1",
      company: "Tech Corp",
      role: "Senior Developer",
      startDate: "2022",
      endDate: "Present",
      location: "San Francisco, CA",
      bullets: [
        "Led team of 5 engineers delivering 3 major projects",
        "Improved application performance by 40%",
        "Mentored 3 junior developers",
      ],
    },
    {
      id: "exp-2",
      company: "Innovate Inc",
      role: "Software Engineer",
      startDate: "2019",
      endDate: "2022",
      location: "Seattle, WA",
      bullets: [
        "Built 3 customer-facing features for 50k+ users",
        "Reduced bug reports by 25% via comprehensive testing",
        "Collaborated across 4 cross-functional teams",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Stanford University",
      degree: "B.S. Computer Science",
      startDate: "2015",
      endDate: "2019",
      detail: "GPA: 3.8",
    },
  ],
  courses: ["Machine Learning", "Cloud Architecture", "Algorithms & Data Structures"],
  skills: ["React", "Node.js", "Python", "AWS", "SQL", "TypeScript", "GraphQL"],
  certifications: [
    { id: "cert-1", name: "AWS Certified Solutions Architect", year: "2023" },
    { id: "cert-2", name: "Certified Scrum Master", year: "2022" },
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

function ExperienceEntry({ entry }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-baseline">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-800">
          {entry.company}
        </span>
        <span className="text-[10px] text-slate-400 italic shrink-0 ml-1">
          {entry.startDate}–{entry.endDate}
        </span>
      </div>
      <p className="text-[11px] italic text-slate-500 mb-1.5">{entry.role}</p>
      <ul className="space-y-1">
        {entry.bullets.map((b, i) => (
          <li key={i} className="flex gap-1.5 text-[11px] text-slate-600 leading-snug">
            <span className="text-slate-800 shrink-0 mt-px">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationEntry({ entry }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-baseline">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-800 leading-tight">
          {entry.school}
        </span>
        <span className="text-[10px] text-slate-400 italic shrink-0 ml-1">
          {entry.startDate}–{entry.endDate}
        </span>
      </div>
      <p className="text-[11px] italic text-slate-500">{entry.degree}</p>
      {entry.detail && (
        <p className="text-[11px] text-slate-500">{entry.detail}</p>
      )}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-1.5 text-[11px] text-slate-600 leading-snug">
          <span className="text-slate-800 shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SkillChips({ skills }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((skill, i) => (
        <span
          key={i}
          className="text-[10.5px] text-slate-600 border border-slate-200 rounded-sm px-2 py-0.5 bg-slate-50"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function CertificationList({ certifications }) {
  return (
    <ul className="space-y-2">
      {certifications.map((cert) => (
        <li key={cert.id}>
          <p className="text-[11px] font-medium text-slate-700 leading-snug">{cert.name}</p>
          <p className="text-[10px] text-slate-400">{cert.year}</p>
        </li>
      ))}
    </ul>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * TwoColumnResume
 *
 * Props:
 *   data  – resume data object (defaults to sample data)
 *
 * Data shape:
 * {
 *   name: string,
 *   title: string,
 *   contact: { email, phone, location },
 *   experience:     [{ id, company, role, startDate, endDate, location, bullets[] }],
 *   education:      [{ id, school, degree, startDate, endDate, detail? }],
 *   courses:        string[],
 *   skills:         string[],
 *   certifications: [{ id, name, year }],
 * }
 */
export default function TwoColumnResume({ data = DEFAULT_RESUME ,}) {
  return (
    // Outer page shell — A4-ish proportions, printable
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

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-2 divide-x divide-slate-200">

        {/* ── LEFT column ── */}
        <div className="divide-y divide-slate-200">

          {/* Work Experience */}
          <div className="px-6 py-5">
            <SectionHeading>Work Experience</SectionHeading>
            {data.experience.map((exp) => (
              <ExperienceEntry key={exp.id} entry={exp} />
            ))}
          </div>

          {/* Skills */}
          <div className="px-6 py-5">
            <SectionHeading>Skills</SectionHeading>
            <SkillChips skills={data.skills} />
          </div>

        </div>

        {/* ── RIGHT column ── */}
        <div className="divide-y divide-slate-200">

          {/* Education */}
          <div className="px-6 py-5">
            <SectionHeading>Education</SectionHeading>
            {data.education.map((edu) => (
              <EducationEntry key={edu.id} entry={edu} />
            ))}

            {/* Courses */}
            {data.courses?.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-slate-500 mb-1.5">
                  Relevant Courses
                </p>
                <BulletList items={data.courses} />
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="px-6 py-5">
            <SectionHeading>Certifications</SectionHeading>
            <CertificationList certifications={data.certifications} />
          </div>

        </div>
      </div>
    </div>
  );
}
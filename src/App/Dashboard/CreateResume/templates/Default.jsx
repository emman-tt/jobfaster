// ClassicResumetw.jsx
// Classic / Chronological resume layout built with Tailwind CSS.
// Single-column, serif typography, left-aligned section rules.
// ATS-friendly structure — the most universally accepted resume format.

// ─── Default sample data ──────────────────────────────────────────────────────
const DEFAULT_RESUME = {
  name: 'John Smith',
  title: 'Senior Software Engineer',
  contact: {
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      role: 'Senior Developer',
      startDate: '2022',
      endDate: 'Present',
      location: 'San Francisco, CA',
      bullets: [
        'Led team of 5 engineers delivering 3 major projects on schedule',
        'Improved application performance by 40% through architectural refactoring',
        'Mentored 3 junior developers, all promoted within 12 months'
      ]
    },
    {
      id: 'exp-2',
      company: 'Innovate Inc',
      role: 'Software Engineer',
      startDate: '2019',
      endDate: '2022',
      location: 'Seattle, WA',
      bullets: [
        'Built 3 customer-facing features used by 50k+ active users',
        'Reduced bug reports by 25% through comprehensive testing coverage',
        'Collaborated with cross-functional teams across 4 departments'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'B.S. Computer Science',
      startDate: '2015',
      endDate: '2019',
      detail: 'GPA: 3.8'
    }
  ],
  skills: ['React', 'Node.js', 'Python', 'AWS', 'SQL', 'TypeScript', 'GraphQL']
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading ({ children }) {
  return (
    <div className='mb-3'>
      <h2 className='text-[10px] font-bold tracking-[0.18em] uppercase text-slate-800 mb-1.5'>
        {children}
      </h2>
      <div className='h-px bg-slate-300' />
    </div>
  )
}

function ExperienceEntry ({ entry }) {
  return (
    <div className='mb-5 last:mb-0'>
      {/* Company + date */}
      <div className='flex justify-between items-baseline mb-0.5'>
        <span className='text-[12px] font-bold tracking-[0.08em] uppercase text-slate-800'>
          {entry.company}
        </span>
        <span className='text-[11px] text-slate-400 italic tabular-nums'>
          {entry.startDate} – {entry.endDate}
        </span>
      </div>

      {/* Role + location */}
      <div className='flex justify-between items-baseline mb-2'>
        <span className='text-[12px] italic text-slate-500'>{entry.role}</span>
        <span className='text-[11px] text-slate-400'>{entry.location}</span>
      </div>

      {/* Bullets */}
      <ul className='space-y-1'>
        {entry.bullets.map((b, i) => (
          <li
            key={i}
            className='flex gap-2 text-[12px] text-slate-600 leading-snug'
          >
            <span className='text-slate-700 shrink-0 mt-px'>•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function EducationEntry ({ entry }) {
  return (
    <div className='mb-4 last:mb-0'>
      {/* School + dates */}
      <div className='flex justify-between items-baseline mb-0.5'>
        <span className='text-[12px] font-bold tracking-[0.08em] uppercase text-slate-800'>
          {entry.school}
        </span>
        <span className='text-[11px] text-slate-400 italic tabular-nums'>
          {entry.startDate} – {entry.endDate}
        </span>
      </div>

      {/* Degree + detail */}
      <div className='flex justify-between items-baseline'>
        <span className='text-[12px] italic text-slate-500'>
          {entry.degree}
        </span>
        {entry.detail && (
          <span className='text-[11px] text-slate-400'>{entry.detail}</span>
        )}
      </div>
    </div>
  )
}

function SkillsRow ({ skills }) {
  return (
    <p className='text-[12px] flex flex-wrap text-slate-600'>
      {skills.map((skill, i) => (
        <span key={i}>
          {skill}
          {i < skills.length - 1 && (
            <span className='text-slate-300 mx-2'>•</span>
          )}
        </span>
      ))}
    </p>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * ClassicResumeTw
 *
 * Props:
 *   data – resume data object (defaults to sample data)
 *
 * Data shape:
 * {
 *   name: string,
 *   title: string,
 *   contact: { email, phone, location },
 *   experience: [{ id, company, role, startDate, endDate, location, bullets[] }],
 *   education:  [{ id, school, degree, startDate, endDate, detail? }],
 *   skills:     string[],
 * }
 */
export default function Default ({ data = DEFAULT_RESUME }) {
  return (
    <div className='bg-white max-w-3xl mx-auto shadow-lg border-t-4 border-slate-800 font-serif'>
      {/* ── Header ── */}
      <header className='text-center px-10 pt-9 pb-6 border-b border-slate-300'>
        <h1 className='text-2xl font-bold tracking-[0.14em] uppercase text-slate-800 mb-1'>
          {data.name}
        </h1>
        <p className='text-sm italic text-slate-500 mb-1.5'>{data.title}</p>
        <p className='text-xs text-slate-400 tracking-wide'>
          {[data.contact.email, data.contact.phone, data.contact.location]
            .filter(Boolean)
            .join('  |  ')}
        </p>
      </header>

      {/* ── Body ── */}
      <div className='px-10 pt-6 pb-10 space-y-6'>
        {/* Work Experience */}
        {data.experience?.length > 0 && (
          <section>
            <SectionHeading>Work Experience</SectionHeading>
            {data.experience.map(exp => (
              <ExperienceEntry key={exp.id} entry={exp} />
            ))}
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <SectionHeading>Education</SectionHeading>
            {data.education.map(edu => (
              <EducationEntry key={edu.id} entry={edu} />
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <SectionHeading>Skills</SectionHeading>
            <SkillsRow skills={data.skills} />
          </section>
        )}
      </div>
    </div>
  )
}

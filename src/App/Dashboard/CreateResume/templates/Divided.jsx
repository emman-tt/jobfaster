// CenteredDividerResume.jsx
// Clean single-column resume with centered section dividers built with Tailwind CSS.
// Classic proportions, centered typography for section labels, editorial feel.

// ─── Default sample data ──────────────────────────────────────────────────────
const DEFAULT_RESUME = {
  name: 'John Smith',
  title: 'Senior Software Engineer',
  contact: {
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA'
  },
  summary:
    'Results-driven engineer with 8 years of experience in full-stack development and technical leadership. Proven track record of delivering scalable systems and growing high-performing teams.',
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      role: 'Senior Developer',
      startDate: '2022',
      endDate: 'Present',
      bullets: [
        'Led team of 5 engineers across 3 major product launches',
        'Improved application performance by 40% through architectural refactoring',
        'Mentored 3 junior developers, all promoted within 12 months'
      ]
    },
    {
      id: 'exp-2',
      company: 'Innovate Inc',
      location: 'Seattle, WA',
      role: 'Software Engineer',
      startDate: '2019',
      endDate: '2022',
      bullets: [
        'Built 3 major customer-facing features used by 50k+ users',
        'Reduced bug reports by 25% through comprehensive testing culture',
        'Drove adoption of CI/CD pipelines, cutting deploy time by 60%'
      ]
    },
    {
      id: 'exp-3',
      company: 'Startup Lab',
      location: 'Portland, OR',
      role: 'Junior Developer',
      startDate: '2017',
      endDate: '2019',
      bullets: [
        'Shipped mobile app MVP in 6 weeks for seed funding demo',
        'Contributed to open-source component library with 2k+ GitHub stars'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      location: 'Stanford, CA',
      degree: 'B.S. Computer Science',
      year: '2019',
      detail: 'GPA: 3.8'
    }
  ],
  skills: [
    ['React', 'Node.js', 'Python', 'AWS', 'SQL', 'TypeScript'],
    ['Team Leadership', 'Agile', 'System Design', 'Code Review']
  ]
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Centered divider: ─────── LABEL ───────
 * Rules extend from both sides of the centered label.
 */
function CenteredDivider ({ label }) {
  return (
    <div className='flex items-center gap-3 my-5'>
      <div className='flex-1 h-px bg-slate-300' />
      <span className='text-[9.5px] font-bold tracking-[0.22em] uppercase text-slate-500 whitespace-nowrap'>
        {label}
      </span>
      <div className='flex-1 h-px bg-slate-300' />
    </div>
  )
}

function ExperienceEntry ({ entry }) {
  return (
    <div className='mb-5 last:mb-0'>
      {/* Company + location */}
      <p className='text-[12px] font-bold tracking-[0.06em] uppercase text-slate-800'>
        {entry.company}
        <span className='font-normal text-slate-400 tracking-normal normal-case'>
          {' '}
          — {entry.location}
        </span>
      </p>

      {/* Role + dates */}
      <p className='text-[11.5px] italic text-slate-500 mb-2'>
        {entry.role}{' '}
        <span className='not-italic text-slate-400 text-[10.5px]'>
          ({entry.startDate}–{entry.endDate})
        </span>
      </p>

      {/* Bullets */}
      <ul className='space-y-1'>
        {entry.bullets.map((b, i) => (
          <li
            key={i}
            className='flex gap-2 text-[11.5px] text-slate-600 leading-snug'
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
    <div className='mb-3 last:mb-0'>
      <p className='text-[12px] font-bold tracking-[0.06em] uppercase text-slate-800'>
        {entry.school}
        <span className='font-normal text-slate-400 tracking-normal normal-case'>
          {' '}
          — {entry.location}
        </span>
      </p>
      <p className='text-[11.5px] italic text-slate-500'>
        {entry.degree}{' '}
        <span className='not-italic text-slate-400 text-[10.5px]'>
          ({entry.year})
        </span>
        {entry.detail && (
          <span className='not-italic text-slate-500'>
            {' '}
            <span className='text-slate-300 mx-1'>•</span>
            {entry.detail}
          </span>
        )}
      </p>
    </div>
  )
}

function SkillRows ({ rows }) {
  return (
    <div className='space-y-1.5 text-center'>
      {rows.map((row, ri) => (
        <p key={ri} className='text-[11.5px] text-slate-600'>
          {row.map((skill, si) => (
            <span key={si}>
              {skill}
              {si < row.length - 1 && (
                <span className='text-slate-300 mx-2'>•</span>
              )}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * CenteredDividerResume
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
 *   experience: [{ id, company, location, role, startDate, endDate, bullets[] }],
 *   education:  [{ id, school, location, degree, year, detail? }],
 *   skills:     string[][],   // array of rows, each row is array of skill strings
 * }
 */
export default function DividedResume ({ data = DEFAULT_RESUME }) {
  return (
    <div className='bg-white max-w-2xl mx-auto shadow-lg border-t-4 border-slate-800 font-serif'>
      {/* ── Header ── */}
      <header className='text-center px-10 pt-9 pb-5 border-b border-slate-200'>
        <h1 className='text-[24px] font-bold tracking-[0.14em] uppercase text-slate-900 mb-1'>
          {data.name}
        </h1>
        <p className='text-[13px] italic text-slate-500 mb-1.5'>{data.title}</p>
        <p className='text-[11px] text-slate-400 tracking-wide'>
          {[data.contact.email, data.contact.phone, data.contact.location]
            .filter(Boolean)
            .join('  |  ')}
        </p>
      </header>

      {/* ── Body ── */}
      <div className='px-10 pb-10'>
        {/* Summary */}
        <CenteredDivider label='Professional Summary' />
        <p className='text-[12px] text-slate-600 leading-relaxed text-center'>
          {data.summary}
        </p>

        {/* Experience */}
        {data.experience?.length > 0 && (
          <>
            <CenteredDivider label='Work Experience' />
            {data.experience.map(exp => (
              <ExperienceEntry key={exp.id} entry={exp} />
            ))}
          </>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <>
            <CenteredDivider label='Education' />
            {data.education.map(edu => (
              <EducationEntry key={edu.id} entry={edu} />
            ))}
          </>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <>
            <CenteredDivider label='Skills' />
            <SkillRows rows={data.skills} />
          </>
        )}
      </div>
    </div>
  )
}

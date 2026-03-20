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
      <div className='flex items-center min-h-[18px] mb-0.5'>
        <p className='text-[12px] font-bold tracking-[0.06em] uppercase text-slate-800 flex items-center gap-1'>
          {entry.company || <span className="inline-block h-2 w-32 bg-slate-200 rounded animate-pulse"></span>}
          <span className='font-normal text-slate-400 tracking-normal normal-case flex items-center gap-1'>
            {' '}
            — {entry.location || <span className="inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse"></span>}
          </span>
        </p>
      </div>

      {/* Role + dates */}
      <div className='flex items-center min-h-[17px] mb-2'>
        <p className='text-[11.5px] italic text-slate-500 flex items-center gap-1'>
          {entry.jobTitle || entry.role || <span className="inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse"></span>}{' '}
          <span className='not-italic text-slate-400 text-[10.5px] flex items-center gap-1'>
            ({entry.startYear || entry.startDate || <span className="inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse"></span>}–{entry.endYear || entry.endDate || <span className="inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse"></span>})
          </span>
        </p>
      </div>

      {/* Bullets */}
      {entry.points?.length > 0 || entry.bullets?.length > 0 ? (
        <ul className='space-y-1'>
          {(entry.points || entry.bullets).map((b, i) => (
            <li
              key={i}
              className='flex gap-2 text-[11.5px] text-slate-600 leading-snug items-start mt-1'
            >
              <span className='text-slate-700 shrink-0 mt-px'>•</span>
              <span className="flex-1 mt-0.5">{b || <span className="inline-block h-1.5 w-full bg-slate-200 rounded animate-pulse mt-1"></span>}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-1.5 mt-1">
          <div className="h-1.5 w-full bg-slate-200 rounded animate-pulse"></div>
          <div className="h-1.5 w-5/6 bg-slate-200 rounded animate-pulse"></div>
        </div>
      )}
    </div>
  )
}

function EducationEntry ({ entry }) {
  return (
    <div className='mb-3 last:mb-0'>
      <div className='min-h-[18px] mb-0.5 flex items-center'>
        <p className='text-[12px] font-bold tracking-[0.06em] uppercase text-slate-800 flex items-center gap-1'>
          {entry.instituition || entry.school || <span className="inline-block h-2 w-32 bg-slate-200 rounded animate-pulse"></span>}
          <span className='font-normal text-slate-400 tracking-normal normal-case flex items-center gap-1'>
            {' '}
            — {entry.location || <span className="inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse"></span>}
          </span>
        </p>
      </div>
      <div className='min-h-[17px] flex items-center'>
        <p className='text-[11.5px] italic text-slate-500 flex items-center gap-1'>
          {entry.degree || <span className="inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse"></span>}{' '}
          <span className='not-italic text-slate-400 text-[10.5px] flex items-center gap-1'>
            ({entry.endYear || entry.year || <span className="inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse"></span>})
          </span>
          {(entry.detail || entry.gpa || entry.level) ? (
            <span className='not-italic text-slate-500 flex items-center gap-1'>
              {' '}
              <span className='text-slate-300 mx-1'>•</span>
              {entry.detail || [entry.level ? `level ${entry.level}` : '', entry.gpa ? `Grade: ${entry.gpa}` : ''].filter(Boolean).join(', ')}
            </span>
          ) : (
            <span className='not-italic text-slate-500 flex items-center gap-1'>
              <span className='text-slate-300 mx-1'>•</span>
              <span className="inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse"></span>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

function SkillRows ({ rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div className='flex gap-2 flex-wrap mt-1 justify-center'>
        <div className='h-1.5 w-16 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-20 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-12 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-24 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-16 bg-slate-200 rounded animate-pulse'></div>
      </div>
    )
  }

  // Handle flat array case from user input
  let parsedRows = rows;
  if (rows.length > 0 && typeof rows[0] === 'string') {
    parsedRows = [rows];
  }

  return (
    <div className='space-y-1.5 text-center'>
      {parsedRows.map((row, ri) => (
        <p key={ri} className='text-[11.5px] text-slate-600 flex flex-wrap justify-center items-center min-h-[18px]'>
          {row.map((skill, si) => (
            <span key={si} className="flex items-center">
              {skill || <span className="inline-block h-1.5 w-12 bg-slate-200 rounded animate-pulse"></span>}
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
export default function DividedResume ({ data = DEFAULT_RESUME, userData }) {
  return (
    <div className='bg-white max-w-2xl mx-auto shadow-lg border-t-4 border-slate-800 font-serif'>
      {/* ── Header ── */}
      <header className='text-center min-h-[120px] flex flex-col items-center justify-center px-10 pt-9 pb-5 border-b border-slate-200'>
        <h1 className='text-[24px] font-bold tracking-[0.14em] uppercase text-slate-900 mb-1 flex items-center justify-center min-h-[36px]'>
          {userData?.name || <span className="inline-block h-4 w-48 bg-slate-200 rounded animate-pulse"></span>}
        </h1>
        <p className='text-[13px] italic text-slate-500 mb-1.5 flex items-center justify-center min-h-[20px]'>
          {userData?.jobTitle || <span className="inline-block h-2 w-32 bg-slate-200 rounded animate-pulse"></span>}
        </p>
        <p className='text-[11px] text-slate-400 tracking-wide flex items-center justify-center min-h-[16px]'>
          {[userData?.email, userData?.phone, userData?.location]
            .filter(Boolean)
            .join('  |  ') || (
              <span className="flex items-center gap-4">
                <span className="inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse"></span>
                <span className="inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse"></span>
                <span className="inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse"></span>
              </span>
            )}
        </p>
      </header>

      {/* ── Body ── */}
      <div className='px-10 pb-10'>
        {/* Summary */}
        {(userData?.showSummary !== false) ? (
          <>
            <CenteredDivider label='Professional Summary' />
            <div className='text-[12px] text-slate-600 leading-relaxed text-center min-h-[20px] flex items-center justify-center'>
              {userData?.summary || (
                <div className="w-full flex flex-col items-center gap-1.5 mt-1">
                  <span className="h-1.5 w-full bg-slate-200 rounded animate-pulse"></span>
                  <span className="h-1.5 w-5/6 bg-slate-200 rounded animate-pulse"></span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <CenteredDivider label='Professional Summary' />
            <div className='flex flex-col items-center gap-1.5 mt-2'>
              <span className="h-1.5 w-full bg-slate-200 rounded animate-pulse"></span>
              <span className="h-1.5 w-5/6 bg-slate-200 rounded animate-pulse"></span>
            </div>
          </>
        )}

        {/* Experience */}
        <>
          <CenteredDivider label='Work Experience' />
          {userData?.experience?.length > 0 ? (
            userData.experience.map(exp => (
              <ExperienceEntry key={exp.id} entry={exp} />
            ))
          ) : (userData ? (
            <div className='mb-5'>
              <div className='flex items-center mb-0.5 min-h-[18px]'>
                <span className="inline-block h-2 w-32 bg-slate-200 rounded animate-pulse"></span>
                <span className="inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse ml-2"></span>
              </div>
              <div className='flex items-center mb-2 min-h-[17px]'>
                <span className="inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse"></span>
                <span className="inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse ml-2"></span>
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="h-1.5 w-full bg-slate-200 rounded animate-pulse"></div>
                <div className="h-1.5 w-5/6 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          ) : (
            data.experience.map(exp => (
              <ExperienceEntry key={exp.id} entry={exp} />
            ))
          ))}
        </>

        {/* Education */}
        <>
          <CenteredDivider label='Education' />
          {userData?.education?.length > 0 ? (
            userData.education.map(edu => (
              <EducationEntry key={edu.id} entry={edu} />
            ))
          ) : (userData ? (
            <div className='mb-3'>
              <div className='flex items-center mb-0.5 min-h-[18px]'>
                <span className="inline-block h-2 w-32 bg-slate-200 rounded animate-pulse"></span>
                <span className="inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse ml-2"></span>
              </div>
              <div className='flex items-center min-h-[17px]'>
                <span className="inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse"></span>
                <span className="inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse ml-2"></span>
              </div>
            </div>
          ) : (
            data.education.map(edu => (
              <EducationEntry key={edu.id} entry={edu} />
            ))
          ))}
        </>

        {/* Skills */}
        <>
          <CenteredDivider label='Skills' />
          <SkillRows rows={userData?.skills?.length > 0 ? userData.skills : (userData ? [] : data.skills)} />
        </>
      </div>
    </div>
  )
}

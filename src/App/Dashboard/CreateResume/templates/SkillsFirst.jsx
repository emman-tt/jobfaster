const DEFAULT_RESUME = {
  name: 'John Smith',
  title: 'Senior Software Engineer',
  contact: {
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA'
  },
  summary:
    'Results-driven engineer with 8+ years of experience building scalable applications and leading high-performing teams. Passionate about clean architecture, mentorship, and delivering measurable business impact.',
  Skills: [
    { id: 'c1', label: 'Frontend Development' },
    { id: 'c2', label: 'Backend Development' },
    { id: 'c3', label: 'Cloud Architecture' },
    { id: 'c4', label: 'Team Lead & Mentorship' },
    { id: 'c5', label: 'Agile Methodology' },
    { id: 'c6', label: 'Database Design' }
  ],
  achievements: [
    'Led team of 5 engineers delivering $2M in new annual revenue',
    'Improved performance by 40% across 3 production applications',
    'Mentored 6 junior developers, all receiving promotions within 18 months',
    'Architected microservices migration reducing infra costs by 30%'
  ],
  Experience: [
    {
      id: 'wh-1',
      role: 'Senior Developer',
      company: 'Tech Corp',
      startDate: '2022',
      endDate: 'Present'
    },
    {
      id: 'wh-2',
      role: 'Software Engineer',
      company: 'Innovate Inc',
      startDate: '2019',
      endDate: '2022'
    },
    {
      id: 'wh-3',
      role: 'Junior Developer',
      company: 'Startup Lab',
      startDate: '2017',
      endDate: '2019'
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'B.S. Computer Science',
      year: '2019'
    }
  ]
}

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

function Summary ({ text, showSummary }) {
  if (showSummary === false) {
    return (
      <section className='mb-5'>
        <SectionHeading>Professional Summary</SectionHeading>
        <div className='flex flex-col gap-1.5 mt-2'>
          <span className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
          <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
        </div>
      </section>
    )
  }

  return (
    <section className='mb-5'>
      <SectionHeading>Professional Summary</SectionHeading>
      <p className='text-[12px] text-slate-600 leading-relaxed min-h-5 flex items-center'>
        {text || (
          <span className='w-full flex flex-col gap-1.5 mt-1'>
            <span className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
            <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
          </span>
        )}
      </p>
    </section>
  )
}

function Skills ({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className='mb-5'>
        <SectionHeading>Core Skills</SectionHeading>
        <div className='border border-slate-200 rounded-sm overflow-hidden'>
          <div className='grid grid-cols-3 divide-x divide-slate-200'>
            <div className='px-4 py-3 min-h-9.5 flex items-center'>
              <div className='h-1.5 w-20 bg-slate-200 rounded animate-pulse'></div>
            </div>
            <div className='px-4 py-3 min-h-9.5 flex items-center'>
              <div className='h-1.5 w-16 bg-slate-200 rounded animate-pulse'></div>
            </div>
            <div className='px-4 py-3 min-h-9.5 flex items-center'>
              <div className='h-1.5 w-24 bg-slate-200 rounded animate-pulse'></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // chunk into rows of 3
  const rows = []
  for (let i = 0; i < items.length; i += 3) {
    rows.push(items.slice(i, i + 3))
  }
  return (
    <section className='mb-5'>
      <SectionHeading>Core Skills</SectionHeading>
      <div className='border border-slate-200 rounded-sm overflow-hidden'>
        {rows.map((row, ri) => (
          <div
            key={ri}
            className={`grid grid-cols-3 divide-x divide-slate-200 ${
              ri > 0 ? 'border-t border-slate-200' : ''
            }`}
          >
            {row.map((item, i) => (
              <div
                key={item.id || i}
                className='px-4 py-3 min-h-9.5 flex items-center'
              >
                <p className='text-[11px] font-semibold text-slate-700 leading-snug w-full'>
                  {item.label || item || (
                    <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
                  )}
                </p>
              </div>
            ))}

            {row.length < 3 &&
              Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className='px-4 py-3 min-h-9.5' />
              ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function Achievements ({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className='mb-5'>
        <SectionHeading>Key Achievements</SectionHeading>
        <div className='space-y-1.5 mt-1'>
          <div className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></div>
          <div className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></div>
        </div>
      </section>
    )
  }

  return (
    <section className='mb-5'>
      <SectionHeading>Key Achievements</SectionHeading>
      <ul className='space-y-1.5'>
        {items.map((item, i) => (
          <li
            key={i}
            className='flex gap-2 text-[12px] text-slate-600 leading-snug items-start mt-1'
          >
            <span className='text-slate-800 shrink-0 mt-px font-bold'>•</span>
            <span className='flex-1 mt-0.5'>
              {item || (
                <span className='inline-block h-1.5 w-full bg-slate-200 rounded animate-pulse mt-0.5'></span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Experience ({ items }) {
  if (!items || items.length === 0) {
    return (
      <section className='mb-5'>
        <SectionHeading>Work History</SectionHeading>
        <div className='space-y-2'>
          <div
            className='grid text-[11.5px] items-center min-h-5.5'
            style={{ gridTemplateColumns: '1fr auto auto' }}
          >
            <span className='text-slate-600 italic'>
              <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
            </span>
            <span className='font-bold tracking-widest uppercase text-slate-800 text-[10.5px] px-4 border-l border-r border-slate-200 mx-3 py-0.5'>
              <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse mt-0.5'></span>
            </span>
            <span className='text-slate-400 text-[10.5px] tabular-nums flex items-center gap-1'>
              <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
              -
              <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
            </span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='mb-5'>
      <SectionHeading>Work History</SectionHeading>
      <div className='space-y-1'>
        {items.map(entry => (
          <div
            key={entry.id}
            className='grid text-[11.5px] items-center min-h-5.5'
            style={{ gridTemplateColumns: '1fr auto auto' }}
          >
            <span className='text-slate-600 italic'>
              {entry.jobTitle || entry.role || (
                <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
              )}
            </span>
            <span className='font-bold tracking-widest uppercase text-slate-800 text-[10.5px] px-4 border-l border-r border-slate-200 mx-3 py-0.5'>
              {entry.company || (
                <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse mt-0.5'></span>
              )}
            </span>
            <span className='text-slate-400 text-[10.5px] tabular-nums flex items-center gap-1'>
              {entry.startYear || entry.startDate || (
                <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
              )}
              -
              {entry.endYear || entry.endDate || (
                <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
              )}
            </span>
            {entry.points?.length > 0 ? (
              <ul className='space-y-1'>
                {entry.points.map((b, i) => (
                  <li
                    key={i}
                    className='flex gap-2 text-[12px] text-slate-600 leading-snug items-start'
                  >
                    <span className='text-slate-700 shrink-0 mt-px'>•</span>
                    <span className='flex-1 mt-0.5'>
                      {b || (
                        <span className='inline-block h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='space-y-1.5 mt-1'>
                <div className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></div>
                <div className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function Education ({ items }) {
  if (!items || items.length === 0) {
    return (
      <section>
        <SectionHeading>Education</SectionHeading>
        <div className='min-h-4.5 flex items-center'>
          <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
          <span className='mx-2 text-slate-400'>—</span>
          <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
        </div>
      </section>
    )
  }

  return (
    <section>
      <SectionHeading>Education</SectionHeading>
      <ul className='space-y-1'>
        {items.map(edu => (
          <li
            key={edu.id}
            className='text-[12px] text-slate-600 flex items-center min-h-4.5 flex-wrap gap-x-1'
          >
            <span className='font-semibold text-slate-800'>
              {edu.instituition || edu.school || (
                <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
              )}
            </span>
            <span>—</span>
            <span>
              {edu.degree || (
                <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
              )}
            </span>
            {(edu.endYear || edu.year) && (
              <span className='text-slate-400 ml-1'>
                ({edu.endYear || edu.year})
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function SkillsFirstResume ({ userData }) {
  return (
    <div className='bg-white max-w-3xl mx-auto shadow-lg border-t-4 border-slate-800 font-serif'>
      {/* ── Header ── */}
      <header className='text-center min-h-30 flex flex-col items-center justify-center px-10 pt-9 pb-6 border-b border-slate-300'>
        <h1 className='text-2xl font-bold tracking-[0.14em] uppercase text-slate-800 mb-1 flex items-center min-h-8'>
          {userData?.name || (
            <span className='inline-block h-4 w-48 bg-slate-200 rounded animate-pulse'></span>
          )}
        </h1>
        <p className='text-sm italic text-slate-500 mb-1.5 flex items-center min-h-5'>
          {userData?.jobTitle || (
            <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </p>
        <p className='text-xs text-slate-400 tracking-wide flex items-center justify-center min-h-4'>
          {[userData?.email, userData?.phone, userData?.location]
            .filter(Boolean)
            .join('  |  ') || (
            <span className='flex items-center gap-4'>
              <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
              <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
              <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
            </span>
          )}
        </p>
      </header>

      {/* ── Body ── */}
      <div className='px-10 pt-6 pb-8'>
        {userData?.showSummary && (
          <Summary
            text={userData?.summary}
            showSummary={userData?.summary.length > 0}
          />
        )}

        <Skills items={userData?.skills} />

        <Experience items={userData?.experience} />
        <Education items={userData?.education} />
      </div>
    </div>
  )
}

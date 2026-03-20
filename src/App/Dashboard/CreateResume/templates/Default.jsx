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
      startYear: '2015',
      endYear: '2019',
      gpa: 'GPA: 3.8',
      level: 200
    }
  ],
  skills: ['React', 'Node.js', 'Python', 'AWS', 'SQL', 'TypeScript', 'GraphQL']
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

function ExperienceEntry ({ entry }) {
  return (
    <div className='mb-5 last:mb-0'>
      {/* Company + date */}
      <div className='flex justify-between items-center mb-0.5 min-h-4.5'>
        <span className='text-[12px] font-bold tracking-[0.08em] uppercase text-slate-800'>
          {entry.company || (
            <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span className='text-[11px] text-slate-400 italic tabular-nums flex items-center gap-1'>
          {entry.startYear || (
            <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
          )}{' '}
          -{' '}
          {entry.endYear || (
            <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Role + location */}
      <div className='flex justify-between items-center mb-2 min-h-4.5'>
        <span className='text-[12px] italic text-slate-500'>
          {entry.jobTitle || (
            <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span className='text-[11px] text-slate-400 flex items-center'>
          {entry.location || (
            <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Bullets */}
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
  )
}

function EducationEntry ({ entry }) {
  return (
    <div className='mb-4 last:mb-0 '>
      {/* School + dates */}
      <div className='flex justify-between items-center mb-0.5 min-h-4.5'>
        <span className='text-[12px] font-bold tracking-[0.08em] uppercase text-slate-800'>
          {entry.instituition || (
            <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span className='text-[11px] text-slate-400 italic tabular-nums flex items-center gap-1'>
          {entry.startYear || (
            <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
          )}{' '}
          -{' '}
          {entry.endYear || (
            <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Degree + detail */}
      <div className='flex justify-between items-center min-h-4.5'>
        <span className='text-[12px] italic text-slate-500'>
          {entry.degree || (
            <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <div className='flex gap-3'>
          {entry.level || entry.gpa ? (
            <>
              {entry.level && (
                <span className='text-[11px] text-slate-400'>
                  level {entry.level}
                </span>
              )}
              {entry.gpa && (
                <span className='text-[11px] text-slate-400'>
                  Grade: {entry.gpa}
                </span>
              )}
            </>
          ) : (
            <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse mt-0.5'></span>
          )}
        </div>
      </div>
    </div>
  )
}

function SkillsRow ({ skills }) {
  if (!skills || skills.length === 0) {
    return (
      <div className='flex gap-2 flex-wrap mt-1'>
        <div className='h-1.5 w-16 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-20 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-12 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-24 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-16 bg-slate-200 rounded animate-pulse'></div>
      </div>
    )
  }

  return (
    <p className='text-[12px] flex flex-wrap text-slate-600 items-center min-h-4.5'>
      {skills.map((skill, i) => (
        <span key={i} className='flex items-center'>
          {skill || (
            <span className='inline-block h-1.5 w-12 bg-slate-200 rounded animate-pulse'></span>
          )}
          {i < skills.length - 1 && (
            <span className='text-slate-300 mx-2'>•</span>
          )}
        </span>
      ))}
    </p>
  )
}

export default function Default ({ userData }) {
  return (
    <div className='bg-white max-w-3xl  mx-auto shadow-lg border-t-4 border-slate-800 font-serif'>
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

      {/* Summary */}
      <div className='px-10 pt-6 pb-10   space-y-6'>
        {userData?.showSummary &&
          (userData?.summary.length > 0 ? (
            <div className=' min-h-10'>
              <SectionHeading>Summary</SectionHeading>
              <p className='text-[12px] text-slate-600 leading-relaxed min-h-5 flex items-center'>
                {userData?.summary || (
                  <span className='w-full flex flex-col gap-1.5 mt-1'>
                    <span className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
                    <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className='min-h-10'>
              <SectionHeading>Summary</SectionHeading>
              <div className='flex flex-col gap-1.5 mt-2'>
                <span className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
                <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
              </div>
            </div>
          ))}

        {/* Work Experience */}
        <section className={`min-h-20`}>
          <SectionHeading>Work Experience</SectionHeading>
          {userData?.experience?.length > 0 ? (
            userData.experience.map(exp => (
              <ExperienceEntry key={exp.id} entry={exp} />
            ))
          ) : (
            <div className='mb-5'>
              <div className='flex justify-between items-center mb-0.5 min-h-4.5'>
                <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse'></span>
              </div>
              <div className='flex justify-between items-center mb-2 min-h-4.5'>
                <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
              </div>
              <div className='space-y-1.5 mt-2'>
                <div className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></div>
                <div className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></div>
              </div>
            </div>
          )}
        </section>

        {/* Education */}
        <section className=' min-h-20'>
          <SectionHeading>Education</SectionHeading>
          {userData?.education?.length > 0 ? (
            userData.education.map(edu => (
              <EducationEntry key={edu.id} entry={edu} />
            ))
          ) : (
            <div className='mb-4'>
              <div className='flex justify-between items-center mb-0.5 min-h-4.5'>
                <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse'></span>
              </div>
              <div className='flex justify-between items-center min-h-4.5'>
                <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
              </div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section className=' min-h-20'>
          <SectionHeading>Skills</SectionHeading>
          <SkillsRow skills={userData?.skills} />
        </section>
      </div>
    </div>
  )
}

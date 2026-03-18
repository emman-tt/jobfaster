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
      <div className='flex justify-between items-baseline mb-0.5'>
        <span className='text-[12px] font-bold tracking-[0.08em] uppercase text-slate-800'>
          {entry.company}
        </span>
        <span className='text-[11px] text-slate-400 italic tabular-nums'>
          {entry.startDate} - {entry.endDate}
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
          {entry.instituition}
        </span>
        <span className='text-[11px] text-slate-400 italic tabular-nums'>
          {entry.startYear} - {entry.endYear}
        </span>
      </div>

      {/* Degree + detail */}
      <div className='flex justify-between items-baseline'>
        <span className='text-[12px] italic text-slate-500'>
          {entry.degree}
        </span>
        {entry.level && (
          <span className='text-[11px] text-slate-400'>
            level {entry.level}
          </span>
        )}
        {entry.gpa && (
          <span className='text-[11px] text-slate-400'>Grade: {entry.gpa}</span>
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

export default function Default ({ data = DEFAULT_RESUME, userData }) {
  return (
    <div className='bg-white max-w-3xl mx-auto shadow-lg border-t-4 border-slate-800 font-serif'>
      {/* ── Header ── */}
      <header className='text-center px-10 pt-9 pb-6 border-b border-slate-300'>
        <h1 className='text-2xl font-bold tracking-[0.14em] uppercase text-slate-800 mb-1'>
          {userData?.name?.length > 0 ? userData.name : data.name}
        </h1>
        <p className='text-sm italic text-slate-500 mb-1.5'>
          {userData?.jobTitle?.length > 0 ? userData.jobTitle : data.title}
        </p>
        <p className='text-xs text-slate-400 tracking-wide'>
          {[
            userData?.email?.length > 0 ? userData.email : data.contact.email,
            userData?.phone?.length > 0 ? userData.phone : data.contact.phone,
            userData?.location?.length > 0
              ? userData.location
              : data.contact.location
          ]
            .filter(Boolean)
            .join('  |  ')}
        </p>
      </header>

          {/* Summary */}
      <div className='px-10 pt-6 pb-10 space-y-6'>
        {userData?.summary?.length > 0 && (
          <div>
            <SectionHeading label='Summary' >Summary</SectionHeading>
            <p className='text-[12px] text-slate-600 leading-relaxed'>
              {userData.summary}
            </p>
          </div>
        )}

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

        {userData?.education[0].institution ||
        userData?.education[0].level ||
        userData?.education[0].degree ? (
          <section>
            <SectionHeading>Education</SectionHeading>
            {userData.education.map(edu => (
              <EducationEntry key={edu.id} entry={edu} />
            ))}
          </section>
        ) : (
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
            <SkillsRow
              skills={
                userData?.skills?.length > 0 ? userData.skills : data.skills
              }
            />
          </section>
        )}
      </div>
    </div>
  )
}

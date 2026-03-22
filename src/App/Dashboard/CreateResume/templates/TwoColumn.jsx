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
        'Led team of 5 engineers delivering 3 major projects',
        'Improved application performance by 40%',
        'Mentored 3 junior developers'
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
        'Built 3 customer-facing features for 50k+ users',
        'Reduced bug reports by 25% via comprehensive testing',
        'Collaborated across 4 cross-functional teams'
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

  skills: ['React', 'Node.js', 'Python', 'AWS', 'SQL', 'TypeScript', 'GraphQL'],
  certifications: [
    { id: 'cert-1', name: 'AWS Certified Solutions Architect', year: '2023' },
    { id: 'cert-2', name: 'Certified Scrum Master', year: '2022' }
  ]
}

function SectionHeading ({ children, section }) {
  return (
    <div className='mb-3'>
      <h2
        style={{ letterSpacing: section?.spacing, textTransform: section?.case }}
        className={`text-[${section?.size}px] ${section?.weight} ${section?.style} text-slate-800 mb-1.5`}
      >
        {children}
      </h2>
      <div className='h-px bg-slate-300' />
    </div>
  )
}

function ExperienceEntry ({
  entry,
  companyStyles,
  jobStyles,
  metaStyles,
  bulletStyles
}) {
  return (
    <div className='mb-4 last:mb-0'>
      <div className='flex justify-between items-center min-h-4.25 mb-0.5'>
        <span
          style={{
            fontSize: companyStyles?.size,
            letterSpacing: companyStyles?.spacing,
            textTransform: companyStyles?.case
          }}
          className={`${companyStyles?.weight} tracking-widest uppercase text-slate-800`}
        >
          {entry.company || (
            <span className='inline-block h-2 w-28 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span
          style={{ fontSize: metaStyles?.size }}
          className='text-slate-400 italic shrink-0 ml-1 flex items-center gap-1'
        >
          {entry.startYear ||
            entry.startDate || (
              <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
            )}
          -
          {entry.endYear ||
            entry.endDate || (
              <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
            )}
        </span>
      </div>
      <div className='flex items-center min-h-4 mb-1.5'>
        <p
          style={{
            fontSize: jobStyles?.size,
            textTransform: jobStyles?.case
          }}
          className={`${jobStyles?.style} text-slate-500`}
        >
          {entry.jobTitle ||
            entry.role || (
              <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
            )}
        </p>
      </div>
      {entry.points?.length > 0 || entry.bullets?.length > 0 ? (
        <ul className='space-y-1'>
          {(entry.points || entry.bullets).map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: bulletStyles?.size,
                textTransform: bulletStyles?.case
              }}
              className={`${bulletStyles?.style} flex gap-1.5 text-slate-600 leading-snug items-start mt-1`}
            >
              <span className='text-slate-800 shrink-0 mt-px'>•</span>
              <span className='flex-1 mt-0.5'>
                {b || (
                  <span className='inline-block h-1.5 w-full bg-slate-200 rounded animate-pulse mt-0.5'></span>
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

function EducationEntry ({ entry, eduStyles, bodyStyles, metaStyles }) {
  return (
    <div className='mb-4 last:mb-0'>
      <div className='flex justify-between items-center min-h-4.25 mb-0.5'>
        <span
          style={{
            fontSize: eduStyles?.size,
            letterSpacing: eduStyles?.spacing,
            textTransform: eduStyles?.case
          }}
          className={`${eduStyles?.weight} tracking-widest uppercase text-slate-800 leading-tight`}
        >
          {entry.instituition ||
            entry.school || (
              <span className='inline-block h-2 w-28 bg-slate-200 rounded animate-pulse'></span>
            )}
        </span>
        <span
          style={{ fontSize: metaStyles?.size }}
          className='text-slate-400 italic shrink-0 ml-1 flex items-center gap-1'
        >
          {entry.startYear ||
            entry.startDate || (
              <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
            )}
          -
          {entry.endYear ||
            entry.endDate || (
              <span className='inline-block h-1.5 w-8 bg-slate-200 rounded animate-pulse'></span>
            )}
        </span>
      </div>
      <div className='flex items-center min-h-4 mb-0.5'>
        <p
          style={{
            fontSize: bodyStyles?.size,
            textTransform: bodyStyles?.case
          }}
          className={`${bodyStyles?.style} text-slate-500`}
        >
          {entry.degree || (
            <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
          )}
        </p>
      </div>
      {entry.detail || entry.gpa || entry.level ? (
        <p
          style={{ fontSize: metaStyles?.size }}
          className='text-slate-500 flex items-center min-h-4'
        >
          {entry.detail ||
            [
              entry.level ? `level ${entry.level}` : '',
              entry.gpa ? `Grade: ${entry.gpa}` : ''
            ]
              .filter(Boolean)
              .join(', ')}
        </p>
      ) : (
        <div className='min-h-4 flex items-center'>
          <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
        </div>
      )}
    </div>
  )
}

function BulletList ({ items, bodyStyles }) {
  if (!items || items.length === 0) {
    return (
      <div className='space-y-1.5 mt-1'>
        <div className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></div>
        <div className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></div>
      </div>
    )
  }

  return (
    <ul className='space-y-1'>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: bodyStyles?.size,
            textTransform: bodyStyles?.case
          }}
          className={`${bodyStyles?.style} flex gap-1.5 text-slate-600 leading-snug items-start mt-1`}
        >
          <span className='text-slate-800 shrink-0 mt-px'>•</span>
          <span className='flex-1 mt-0.5'>
            {item || (
              <span className='inline-block h-1.5 w-full bg-slate-200 rounded animate-pulse mt-0.5'></span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}

function SkillChips ({ skills, skillsStyles }) {
  if (!skills || skills.length === 0) {
    return (
      <div className='flex flex-wrap gap-1.5'>
        <div className='h-5 w-16 bg-slate-200 rounded-sm animate-pulse'></div>
        <div className='h-5 w-20 bg-slate-200 rounded-sm animate-pulse'></div>
        <div className='h-5 w-14 bg-slate-200 rounded-sm animate-pulse'></div>
        <div className='h-5 w-24 bg-slate-200 rounded-sm animate-pulse'></div>
      </div>
    )
  }

  let flatSkills = skills
  if (skills.length > 0 && Array.isArray(skills[0])) {
    flatSkills = skills.flat()
  }

  return (
    <div className='flex flex-wrap gap-1.5'>
      {flatSkills.map((skill, i) => (
        <span
          key={i}
          style={{
            fontSize: skillsStyles?.size,
            textTransform: skillsStyles?.case
          }}
          className={`${skillsStyles?.style} text-slate-600 border border-slate-200 rounded-sm px-2 py-0.5 bg-slate-50 flex items-center min-h-5.5`}
        >
          {skill || (
            <span className='inline-block h-1.5 w-10 bg-slate-300 rounded animate-pulse'></span>
          )}
        </span>
      ))}
    </div>
  )
}

function CertificationList ({ certifications }) {
  if (!certifications || certifications.length === 0) {
    return (
      <div className='space-y-3'>
        <div>
          <div className='h-2 w-32 bg-slate-200 rounded animate-pulse mb-1'></div>
          <div className='h-1.5 w-12 bg-slate-200 rounded animate-pulse'></div>
        </div>
        <div>
          <div className='h-2 w-28 bg-slate-200 rounded animate-pulse mb-1'></div>
          <div className='h-1.5 w-12 bg-slate-200 rounded animate-pulse'></div>
        </div>
      </div>
    )
  }

  return (
    <ul className='space-y-2'>
      {certifications.map(cert => (
        <li key={cert.id}>
          <div className='flex items-center min-h-4 mb-0.5'>
            <p className='text-[11px] font-medium text-slate-700 leading-snug'>
              {cert.name || (
                <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
              )}
            </p>
          </div>
          <div className='flex items-center min-h-3.5'>
            <p className='text-[10px] text-slate-400'>
              {cert.year || (
                <span className='inline-block h-1.5 w-12 bg-slate-200 rounded animate-pulse'></span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function TwoColumnResume ({ userData, className }) {
  const styles = userData?.styles
  const sectionHeaderStyles = styles?.sectionHeader
  const nameStyles = styles?.name
  const metaDataStyles = styles?.metadata
  const jobTitleStyles = styles?.jobTitle
  const companyStyles = styles?.company
  const bodyTextStyles = styles?.bodyText

  return (
    <div
      className={`bg-white max-w-3xl mx-auto shadow-lg  border-slate-800 font-serif ${className}`}
    >
      {/* ── Header ── */}
      <header className='text-center min-h-30 flex flex-col items-center justify-center px-10 pt-9 pb-6 border-b border-slate-300'>
        <h1
          style={{
            fontSize: nameStyles?.size
          }}
          className={`${nameStyles?.weight} tracking-[${nameStyles?.spacing}px] uppercase text-slate-800 mb-1 flex items-center min-h-8`}
        >
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

      {/* ── Two-column grid ── */}
      <div className='grid grid-cols-2 divide-x divide-slate-200 min-h-75'>
        <div className='divide-y divide-slate-200'>
          {/* Work Experience */}
          <div className='px-6 py-5'>
            <SectionHeading section={sectionHeaderStyles}>
              Work Experience
            </SectionHeading>
            {userData?.experience?.length > 0 ? (
              userData.experience.map(exp => (
                <ExperienceEntry
                  key={exp.id}
                  entry={exp}
                  companyStyles={companyStyles}
                  jobStyles={jobTitleStyles}
                  metaStyles={metaDataStyles}
                  bulletStyles={bodyTextStyles}
                />
              ))
            ) : (
              <div className='mb-4'>
                <div className='flex justify-between items-center min-h-4.25 mb-0.5'>
                  <span className='inline-block h-2 w-28 bg-slate-200 rounded animate-pulse'></span>
                  <span className='inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='flex items-center min-h-4 mb-1.5'>
                  <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='space-y-1.5 mt-1'>
                  <div className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></div>
                  <div className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></div>
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className='px-6 py-5'>
            <SectionHeading section={sectionHeaderStyles}>
              Skills
            </SectionHeading>
            <SkillChips
              skills={userData?.skills}
              skillsStyles={bodyTextStyles}
            />
          </div>
        </div>

        {/* ── RIGHT column ── */}
        <div className='divide-y divide-slate-200'>
          {/* Summary / Education */}
          <div className='px-6 py-5'>
            {userData?.showSummary && (
              <div className='mb-6'>
                <SectionHeading section={sectionHeaderStyles}>
                  Summary
                </SectionHeading>
                <p
                  style={{
                    fontSize: bodyTextStyles?.size,
                    textTransform: bodyTextStyles?.case
                  }}
                  className={`${bodyTextStyles?.style} text-slate-600 leading-relaxed min-h-5 flex items-center`}
                >
                  {userData?.summary || (
                    <span className='w-full flex flex-col gap-1.5 mt-1'>
                      <span className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
                      <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
                      <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
                      <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
                    </span>
                  )}
                </p>
              </div>
            )}

            <SectionHeading section={sectionHeaderStyles}>
              Education
            </SectionHeading>
            {userData?.education?.length > 0 ? (
              userData.education.map(edu => (
                <EducationEntry
                  key={edu.id}
                  entry={edu}
                  eduStyles={companyStyles}
                  bodyStyles={bodyTextStyles}
                  metaStyles={metaDataStyles}
                />
              ))
            ) : (
              <div className='mb-4'>
                <div className='flex justify-between items-center min-h-4.25 mb-0.5'>
                  <span className='inline-block h-2 w-28 bg-slate-200 rounded animate-pulse'></span>
                  <span className='inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='flex items-center min-h-4 mb-0.5'>
                  <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='min-h-4 flex items-center'>
                  <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='min-h-4 flex items-center'>
                  <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='min-h-4 flex items-center'>
                  <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
                </div>
              </div>
            )}
          </div>

          {/* Certifications */}
          {/* {((userData?.certifications && userData.certifications.length > 0) ||
            (!userData && data.certifications?.length > 0)) && (
            <div className='px-6 py-5'>
              <SectionHeading>Certifications</SectionHeading>
              <CertificationList
                certifications={
                  userData?.certifications?.length > 0
                    ? userData.certifications
                    : data.certifications
                }
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

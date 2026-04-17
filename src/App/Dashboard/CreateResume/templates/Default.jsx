function SectionHeading ({ children, section }) {
  const weightMap = {
    'font-normal': 400,
    'font-medium': 500,
    'font-semibold': 600,
    'font-bold': 700
  }
  const fontWeight = weightMap[section?.weight] || 700

  return (
    <div className='mb-3'>
      <h2
        style={{
          letterSpacing: section?.spacing,
          textTransform: section?.case,
          fontSize: `${section?.size}pt`,
          fontWeight,
          fontStyle: section?.style === 'italic' ? 'italic' : 'normal',
          color: '#1e293b'
        }}
        className='mb-1.5'
      >
        {children}
      </h2>
      <div className='h-px bg-slate-300' />
    </div>
  )
}

function ExperienceEntry ({
  companyStyles,
  entry,
  jobStyles,
  bulletStyles,
  metaStyles
}) {
  const weightMap = {
    'font-normal': 400,
    'font-medium': 500,
    'font-semibold': 600,
    'font-bold': 700
  }

  return (
    <div className='mb-5 last:mb-0'>
      {/* Company + date */}
      <div className='flex justify-between items-center mb-0.5 min-h-4.5'>
        <span
          style={{
            fontSize: `${companyStyles?.size}pt`,
            letterSpacing: companyStyles?.spacing,
            textTransform: companyStyles?.case,
            fontWeight: weightMap[companyStyles?.weight] || 500,
            color: '#1e293b'
          }}
        >
          {entry.company || (
            <span className='inline-block h-8 w-40 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span
          style={{
            fontSize: `${metaStyles?.size}pt`,
            fontStyle: 'italic',
            color: '#94a3b8'
          }}
          className='tabular-nums flex items-center gap-1'
        >
          {entry?.startYear || (
            <span className='inline-block h-5 w-10 bg-slate-200 rounded animate-pulse'></span>
          )}{' '}
          -{' '}
          {entry?.endYear || (
            <span className='inline-block h-5 w-10 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Role + location */}
      <div className='flex justify-between items-center mb-2 min-h-4.5'>
        <span
          style={{
            fontSize: `${jobStyles?.size}pt`,
            textTransform: jobStyles?.case,
            fontStyle: jobStyles?.style === 'italic' ? 'italic' : 'normal',
            color: '#64748b'
          }}
        >
          {entry?.jobTitle || (
            <span className='inline-block h-5 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span
          style={{ fontSize: '10pt', color: '#94a3b8' }}
          className='flex items-center'
        >
          {entry?.location || (
            <span className='inline-block h-5 w-24 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Bullets */}
      {entry?.points?.length > 0 ? (
        <ul className='space-y-1'>
          {entry.points.map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: `${bulletStyles?.size}pt`,
                textTransform: bulletStyles?.case,
                fontStyle: jobStyles?.style === 'italic' ? 'italic' : 'normal',
                color: '#0f172a',
                lineHeight: 1.4
              }}
              className='flex gap-2 items-start'
            >
              <span className='text-slate-700 shrink-0 mt-px'>•</span>
              <span className='flex-1 mt-0.5'>
                {b || (
                  <span className='inline-block h-6 w-full bg-slate-200 rounded animate-pulse'></span>
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className='space-y-4 mt-2.5'>
            <div className='h-6 w-full bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-5/6 bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-11/12 bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-4/6 bg-slate-200 rounded animate-pulse'></div>
          </div>
          <div className='space-y-4 mt-2.5'>
            <div className='h-6 w-full bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-5/6 bg-slate-200 rounded animate-pulse'></div>
          </div>
          <div className='space-y-4 mt-2.5'>
            <div className='h-6 w-full bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-5/6 bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-11/12 bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-4/6 bg-slate-200 rounded animate-pulse'></div>
          </div>
          <div className='space-y-4 mt-2.5'>
            <div className='h-6 w-full bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-5/6 bg-slate-200 rounded animate-pulse'></div>
          </div>
        </>
      )}
    </div>
  )
}

function EducationEntry ({ eduStyles, entry, metaStyles, bodyStyles }) {
  const weightMap = {
    'font-normal': 400,
    'font-medium': 500,
    'font-semibold': 600,
    'font-bold': 700
  }

  return (
    <div className='mb-4 last:mb-0'>
      {/* School + dates */}
      <div className='flex justify-between items-center mb-0.5 min-h-4.5'>
        <span
          style={{
            fontSize: `${eduStyles?.size}pt`,
            letterSpacing: eduStyles?.spacing || '0.08em',
            textTransform: eduStyles?.case || 'uppercase',
            fontWeight: weightMap[eduStyles?.weight] || 700,
            color: '#1e293b'
          }}
        >
          {entry?.instituition || entry?.school || (
            <span className='inline-block h-8 w-100 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span
          style={{
            fontSize: `${metaStyles?.size}pt`,
            fontStyle: 'italic',
            color: '#94a3b8'
          }}
          className='tabular-nums flex items-center gap-1'
        >
          {entry?.startYear || (
            <span className='inline-block h-5 w-25 bg-slate-200 rounded animate-pulse'></span>
          )}{' '}
          -{' '}
          {entry?.endYear || entry?.year || (
            <span className='inline-block h-5 w-25 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Degree + detail */}
      <div className='flex justify-between items-center min-h-4.5'>
        <span
          style={{
            fontSize: `${bodyStyles?.size}pt`,
            fontStyle: 'italic',
            color: '#475569'
          }}
        >
          {entry?.degree || (
            <span className='inline-block h-5 w-80 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <div
          style={{ fontSize: `${metaStyles?.size}pt`, color: '#94a3b8' }}
          className='flex gap-3'
        >
          {entry?.level || entry?.gpa ? (
            <>
              {entry.level && <span>level {entry.level}</span>}
              {entry.gpa && <span>Grade: {entry.gpa}</span>}
            </>
          ) : (
            <span className='inline-block h-5 w-60 bg-slate-200 rounded animate-pulse mt-0.5'></span>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectEntry ({
  companyStyles,
  entry,
  jobStyles,
  bulletStyles,
  metaStyles
}) {
  const weightMap = {
    'font-normal': 400,
    'font-medium': 500,
    'font-semibold': 600,
    'font-bold': 700
  }

  return (
    <div className='mb-5 last:mb-0'>
      {/* Project name + url */}
      <div className='flex justify-between items-center mb-0.5 min-h-4.5'>
        <span
          style={{
            fontSize: `${companyStyles?.size}pt`,
            letterSpacing: companyStyles?.spacing,
            textTransform: companyStyles?.case,
            fontWeight: weightMap[companyStyles?.weight] || 500,
            color: '#1e293b'
          }}
        >
          {entry.name || (
            <span className='inline-block h-8 w-40 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span
          style={{
            fontSize: `${metaStyles?.size}pt`,
            fontStyle: 'italic',
            color: '#94a3b8'
          }}
          className='tabular-nums flex items-center gap-1'
        >
          {entry?.url || (
            <span className='inline-block h-5 w-24 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Description + tech stack */}
      <div className='flex justify-between items-center mb-2 min-h-4.5'>
        <span
          style={{
            fontSize: `${jobStyles?.size}pt`,
            textTransform: jobStyles?.case,
            fontStyle: jobStyles?.style === 'italic' ? 'italic' : 'normal',
            color: '#64748b'
          }}
        >
          {entry?.description || (
            <span className='inline-block h-5 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
        <span
          style={{ fontSize: '10pt', color: '#94a3b8' }}
          className='flex items-center'
        >
          {entry?.techStack || (
            <span className='inline-block h-5 w-24 bg-slate-200 rounded animate-pulse'></span>
          )}
        </span>
      </div>

      {/* Bullets */}
      {entry?.points?.length > 0 ? (
        <ul className='space-y-1'>
          {entry.points.map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: `${bulletStyles?.size}pt`,
                textTransform: bulletStyles?.case,
                fontStyle: jobStyles?.style === 'italic' ? 'italic' : 'normal',
                color: '#0f172a',
                lineHeight: 1.4
              }}
              className='flex gap-2 items-start'
            >
              <span className='text-slate-700 shrink-0 mt-px'>•</span>
              <span className='flex-1 mt-0.5'>
                {b || (
                  <span className='inline-block h-6 w-full bg-slate-200 rounded animate-pulse'></span>
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className='space-y-4 mt-2.5'>
            <div className='h-6 w-full bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-5/6 bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-11/12 bg-slate-200 rounded animate-pulse'></div>
            <div className='h-6 w-4/6 bg-slate-200 rounded animate-pulse'></div>
          </div>
        </>
      )}
    </div>
  )
}

function SkillsRow ({ skills, skillsStyles }) {
  if (!skills || skills.length === 0) {
    return (
      <div className='flex gap-2 flex-wrap mt-2'>
        <div className='h-5 w-20 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-24 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-16 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-28 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-20 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-14 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-22 bg-slate-200 rounded animate-pulse'></div>
      </div>
    )
  }

  return (
    <p
      style={{
        fontSize: `${skillsStyles?.size}pt`,
        textTransform: skillsStyles?.case,
        fontStyle: skillsStyles?.style === 'italic' ? 'italic' : 'normal',
        color: '#475569'
      }}
      className='flex flex-wrap items-center min-h-4.5'
    >
      {skills?.map((skill, i) => (
        <span key={i} className='flex items-center'>
          {skill || (
            <span className='inline-block h-5 w-14 bg-slate-200 rounded animate-pulse'></span>
          )}
          {i < skills.length - 1 && (
            <span className='text-slate-300 mx-2'>•</span>
          )}
        </span>
      ))}
    </p>
  )
}

export default function Default ({ userData, className }) {
  const styles = userData?.styles
  const sectionHeaderStyles = styles?.sectionHeader
  const nameStyles = styles?.name
  const dateStyles = styles?.date
  const contactStyles = styles?.contact
  const jobTitleStyles = styles?.jobTitle
  const companyStyles = styles?.company
  const bodyTextStyles = styles?.bodyText
  const fontFamily = styles?.fontFamily || 'Calibri, sans-serif'

  const weightMap = {
    'font-normal': 400,
    'font-medium': 500,
    'font-semibold': 600,
    'font-bold': 700
  }

  return (
    <div
      className={`bg-white mx-auto shadow-lg print:shadow-none print:m-0 ${className}`}
      style={{ fontFamily }}
    >
      {/* ── Header ── */}
      <header
        className='text-center min-h-30 flex flex-col items-center justify-center px-10 pt-9 pb-6 border-b border-slate-300'
      >
        <h1
          style={{
            fontSize: `${nameStyles?.size}pt`,
            letterSpacing: nameStyles?.spacing,
            fontWeight: weightMap[nameStyles?.weight] || 700,
            textTransform: 'uppercase',
            color: '#1e293b',
            marginBottom: '0.25rem'
          }}
          className='flex items-center min-h-8'
        >
          {userData?.name || (
            <span className='inline-block h-10 w-48 bg-slate-200 rounded animate-pulse'></span>
          )}
        </h1>
        <p
          style={{
            fontSize: '0.875rem',
            fontStyle: 'italic',
            color: '#64748b',
            marginBottom: '0.375rem'
          }}
          className='flex items-center min-h-5'
        >
          {userData?.jobTitle || (
            <span className='inline-block h-5 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </p>
        <p
          style={{
            fontSize: contactStyles?.size,
            fontWeight: weightMap[contactStyles?.weight] || 400,
            color: '#0f172a'
          }}
          className='flex items-center justify-center min-h-4'
        >
          {[userData?.email, userData?.phone, userData?.location]
            .filter(Boolean)
            .join('  |  ') || (
            <span className='flex items-center gap-4'>
              <span className='inline-block h-5.5 w-24 bg-slate-200 rounded animate-pulse'></span>
              <span className='inline-block h-5.5 w-20 bg-slate-200 rounded animate-pulse'></span>
              <span className='inline-block h-5.5 w-24 bg-slate-200 rounded animate-pulse'></span>
            </span>
          )}
        </p>
      </header>

      {/* Summary */}
      <div className='px-10 pt-6 pb-10 space-y-6'>
        {userData?.showSummary &&
          (userData?.summary.length > 0 ? (
            <div className='min-h-10'>
              <SectionHeading section={sectionHeaderStyles}>
                Summary
              </SectionHeading>
              <p
                style={{
                  fontSize: '10pt',
                  color: '#475569',
                  lineHeight: 1.6
                }}
                className='min-h-5 flex items-center'
              >
                {userData?.summary || (
                  <span className='w-full flex flex-col gap-4 mt-2.5'>
                    <span className='h-6 w-full bg-slate-200 rounded animate-pulse'></span>
                    <span className='h-6 w-11/12 bg-slate-200 rounded animate-pulse'></span>
                    <span className='h-6 w-full bg-slate-200 rounded animate-pulse'></span>
                    <span className='h-6 w-4/5 bg-slate-200 rounded animate-pulse'></span>
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className='min-h-10'>
              <SectionHeading section={sectionHeaderStyles}>
                Summary
              </SectionHeading>
              <div className='flex flex-col gap-1.5 mt-2'>
                <span className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
                <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
              </div>
            </div>
          ))}

        {/* Work Experience */}
        <section className={`min-h-20`}>
          <SectionHeading section={sectionHeaderStyles}>
            Work Experience
          </SectionHeading>
          {userData?.experience?.length > 0 ? (
            userData.experience.map(exp => (
              <ExperienceEntry
                metaStyles={dateStyles}
                bulletStyles={bodyTextStyles}
                jobStyles={jobTitleStyles}
                companyStyles={companyStyles}
                key={exp.id}
                entry={exp}
              />
            ))
          ) : (
            <>
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
              {/* <div className='mb-5'>
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
              </div> */}
            </>
          )}
        </section>

        {/* Education */}
        <section className=' min-h-20'>
          <SectionHeading section={sectionHeaderStyles}>
            Education
          </SectionHeading>
          {userData?.education?.length > 0 ? (
            userData.education.map(edu => (
              <EducationEntry
                bodyStyles={bodyTextStyles}
                metaStyles={dateStyles}
                eduStyles={companyStyles}
                key={edu.id}
                entry={edu}
              />
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
          <SectionHeading section={sectionHeaderStyles}>Skills</SectionHeading>
          <SkillsRow skillsStyles={bodyTextStyles} skills={userData?.skills} />
        </section>

        {/* Languages */}
        {userData?.showLanguages && (
          <section className=' min-h-20'>
            <SectionHeading section={sectionHeaderStyles}>
              Languages
            </SectionHeading>
            <SkillsRow
              skillsStyles={bodyTextStyles}
              skills={userData.languages}
            />
          </section>
        )}

        {/* Projects */}
        {userData?.showProjects && (
          <section className='min-h-20'>
            <SectionHeading section={sectionHeaderStyles}>
              Projects
            </SectionHeading>
            {userData?.projects?.length > 0 ? (
              userData.projects.map(project => (
                <ProjectEntry
                  metaStyles={dateStyles}
                  bulletStyles={bodyTextStyles}
                  jobStyles={jobTitleStyles}
                  companyStyles={companyStyles}
                  key={project.id}
                  entry={project}
                />
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
        )}
      </div>
    </div>
  )
}

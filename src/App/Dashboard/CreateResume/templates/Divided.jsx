function CenteredDivider ({ label, section }) {
  return (
    <div className='flex items-center gap-3 my-5'>
      <div className='flex-1 h-px bg-slate-300' />
      <span
        style={{
          letterSpacing: section?.spacing,
          textTransform: section?.case,
          fontSize: `${section?.size}pt`
        }}
        className={`${section?.weight} ${section?.style} text-slate-500 whitespace-nowrap`}
      >
        {label}
      </span>
      <div className='flex-1 h-px bg-slate-300' />
    </div>
  )
}

function ExperienceEntry ({
  entry,
  companyStyles,
  jobStyles,
  bulletStyles,
  metaStyles
}) {
  return (
    <div className='mb-5 last:mb-0'>
      {/* Company + location */}
      <div className='flex items-center min-h-4.5 mb-0.5'>
        <p
          style={{
            fontSize: `${companyStyles?.size}pt`,
            letterSpacing: companyStyles?.spacing,
            textTransform: companyStyles?.case
          }}
          className={`${companyStyles?.weight} text-slate-800 flex items-center gap-1`}
        >
          {entry.company || (
            <span className='inline-block h-8 w-40 bg-slate-200 rounded animate-pulse'></span>
          )}
          <span className='font-normal text-slate-400 tracking-normal normal-case flex items-center gap-1'>
            {' '}
            —{' '}
            {entry.location || (
              <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse'></span>
            )}
          </span>
        </p>
      </div>

      {/* Role + dates */}
      <div className='flex items-center min-h-4.25 mb-2'>
        <p
          style={{
            fontSize: `${jobStyles?.size}pt`,
            textTransform: jobStyles?.case
          }}
          className={`${jobStyles?.style} text-slate-500 flex items-center gap-1`}
        >
          {entry.jobTitle || entry.role || (
            <span className='inline-block h-5 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}{' '}
          <span
            style={{ fontSize: `${metaStyles?.size}pt` }}
            className='not-italic text-slate-400 flex items-center gap-1'
          >
            (
            {entry.startYear || entry.startDate || (
              <span className='inline-block h-5 w-10 bg-slate-200 rounded animate-pulse'></span>
            )}
            -
            {entry.endYear || entry.endDate || (
              <span className='inline-block h-5 w-10 bg-slate-200 rounded animate-pulse'></span>
            )}
            )
          </span>
        </p>
      </div>

      {/* Bullets */}
      {entry.points?.length > 0 || entry.bullets?.length > 0 ? (
        <ul className='space-y-1'>
          {(entry.points || entry.bullets).map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: `${bulletStyles?.size}pt`,
                textTransform: bulletStyles?.case
              }}
              className={`${bulletStyles?.style} flex gap-2 text-slate-900 leading-snug items-start mt-1`}
            >
              <span className='text-slate-700 shrink-0 mt-px'>•</span>
              <span className='flex-1 mt-0.5'>
                {b || (
                  <span className='inline-block h-6 w-full bg-slate-200 rounded animate-pulse mt-1'></span>
                )}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className='space-y-4 mt-2.5'>
          <div className='h-6 w-full bg-slate-200 rounded animate-pulse'></div>
          <div className='h-6 w-5/6 bg-slate-200 rounded animate-pulse'></div>
          <div className='h-6 w-11/12 bg-slate-200 rounded animate-pulse'></div>
          <div className='h-6 w-4/6 bg-slate-200 rounded animate-pulse'></div>
        </div>
      )}
    </div>
  )
}

function EducationEntry ({ entry, eduStyles, metaStyles, bodyStyles }) {
  return (
    <div className='mb-3 last:mb-0'>
      <div className='min-h-4.5 mb-0.5 flex items-center'>
        <p
          style={{
            fontSize: `${eduStyles?.size}pt`,
            letterSpacing: eduStyles?.spacing,
            textTransform: eduStyles?.case
          }}
          className={`${eduStyles?.weight} text-slate-800 flex items-center gap-1`}
        >
          {entry.instituition || entry.school || (
            <span className='inline-block h-8 w-80 bg-slate-200 rounded animate-pulse'></span>
          )}  
          <span className='font-normal text-slate-400 tracking-normal normal-case flex items-center gap-1'>
            {' '}
            —{' '}
            {entry.startYear || (
              <span className='inline-block h-5 w-60 bg-slate-200 rounded animate-pulse'></span>
            )}
          </span>
        </p>
      </div>
      <div className='min-h-4.25 flex items-center'>
        <p
          style={{
            fontSize: `${bodyStyles?.size}pt`,
            textTransform: bodyStyles?.case
          }}
          className={`${bodyStyles?.style} text-slate-700 flex items-center gap-1`}
        >
          {entry.degree || (
            <span className='inline-block h-5 w-80 bg-slate-200 rounded animate-pulse'></span>
          )}{' '}
          <span
            style={{ fontSize: `${metaStyles?.size}pt` }}
            className='not-italic text-slate-400 text-[10.5px] tabular-nums flex items-center gap-1'
          >
            (
            {entry.endYear || entry.year || (
              <span className='inline-block h-5 w-25 bg-slate-200 rounded animate-pulse'></span>
            )}
            )
          </span>
          {entry.detail || entry.gpa || entry.level ? (
            <span
              style={{ fontSize: `${metaStyles?.size}pt` }}
              className='not-italic text-slate-500 flex items-center gap-1'
            >
              {' '}
              <span className='text-slate-300 mx-1'>•</span>
              {entry.detail ||
                [
                  entry.level ? `level ${entry.level}` : '',
                  entry.gpa ? `Grade: ${entry.gpa}` : ''
                ]
                  .filter(Boolean)
                  .join(', ')}
            </span>
          ) : (
            <span className='not-italic text-slate-500 flex items-center gap-1'>
              <span className='text-slate-300 mx-1'>•</span>
              <span className='inline-block h-5 w-30 bg-slate-200 rounded animate-pulse'></span>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

function SkillRows ({ rows, skillsStyles }) {
  if (!rows || rows.length === 0) {
    return (
      <div className='flex gap-2 flex-wrap mt-2 justify-center'>
        <div className='h-5 w-20 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-24 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-16 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-28 bg-slate-200 rounded animate-pulse'></div>
        <div className='h-5 w-20 bg-slate-200 rounded animate-pulse'></div>
      </div>
    )
  }

  let parsedRows = rows
  if (rows.length > 0 && typeof rows[0] === 'string') {
    parsedRows = [rows]
  }

  return (
    <div className='space-y-1.5 text-center'>
      {parsedRows.map((row, ri) => (
        <p
          key={ri}
          style={{
            fontSize: `${skillsStyles?.size}pt`,
            textTransform: skillsStyles?.case
          }}
          className={`${skillsStyles?.style} text-slate-600 flex flex-wrap justify-center items-center min-h-4.5`}
        >
          {row.map((skill, si) => (
            <span key={si} className='flex items-center'>
              {skill || (
                <span className='inline-block h-5 w-14 bg-slate-200 rounded animate-pulse'></span>
              )}
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

export default function DividedResume ({ userData, className }) {
  const styles = userData?.styles
  const sectionHeaderStyles = styles?.sectionHeader
  const nameStyles = styles?.name
  const dateStyles = styles?.date
  const contactStyles = styles?.contact
  const jobTitleStyles = styles?.jobTitle
  const companyStyles = styles?.company
  const bodyTextStyles = styles?.bodyText

  return (
    <div
      className={`bg-white max-w-2xl mx-auto shadow-lg  border-slate-800 font-serif ${className}`}
    >
      {/* ── Header ── */}
      <header className='text-center min-h-30 flex flex-col items-center justify-center px-10 pt-9 pb-5 border-b border-slate-200'>
        <h1
          style={{
            fontSize: `${nameStyles?.size}pt`,
            letterSpacing: nameStyles?.spacing
          }}
          className={`${nameStyles?.weight} uppercase text-slate-900 mb-1 flex items-center justify-center min-h-9`}
        >
          {userData?.name || (
            <span className='inline-block h-10 w-48 bg-slate-200 rounded animate-pulse'></span>
          )}
        </h1>
        <p className='text-[10pt] italic text-slate-700 mb-1.5 flex items-center justify-center min-h-5'>
          {userData?.jobTitle || (
            <span className='inline-block h-6 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </p>
        <p
          style={{
            fontSize: `${contactStyles?.size}pt`,
            fontWeight: contactStyles?.weight === 'font-bold' ? 'bold' : 'normal'
          }}
          className='text-slate-900 tracking-wide flex items-center justify-center min-h-4'
        >
          {[userData?.email, userData?.phone, userData?.location]
            .filter(Boolean)
            .join('  |  ') || (
            <span className='flex items-center gap-4'>
              <span className='inline-block h-5 w-24 bg-slate-200 rounded animate-pulse'></span>
              <span className='inline-block h-5 w-20 bg-slate-200 rounded animate-pulse'></span>
              <span className='inline-block h-5 w-24 bg-slate-200 rounded animate-pulse'></span>
            </span>
          )}
        </p>
      </header>

      {/* ── Body ── */}
      <div className='px-10 pb-10'>
        {/* Summary */}
        {userData?.showSummary &&
          (userData?.summary.length > 0 ? (
            <>
              <CenteredDivider
                section={sectionHeaderStyles}
                label='Professional Summary'
              />
              <div
                style={{
                  fontSize: `${bodyTextStyles?.size}pt`,
                  textTransform: bodyTextStyles?.case
                }}
                className={`${bodyTextStyles?.style} text-slate-600 leading-relaxed flex-wrap text-center min-h-5 flex items-center justify-center`}
              >
                <p className='leading-relaxed min-h-5 flex items-center'>
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
            </>
          ) : (
            <>
              <CenteredDivider
                section={sectionHeaderStyles}
                label='Professional Summary'
              />
              <div className='flex flex-col items-center gap-1.5 mt-2'>
                <span className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></span>
                <span className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></span>
              </div>
            </>
          ))}

        {/* Experience */}
        <>
          <CenteredDivider
            section={sectionHeaderStyles}
            label='Work Experience'
          />
          {userData?.experience?.length > 0 ? (
            userData.experience.map(exp => (
              <ExperienceEntry
                key={exp.id}
                entry={exp}
                companyStyles={companyStyles}
                jobStyles={jobTitleStyles}
                bulletStyles={bodyTextStyles}
                metaStyles={dateStyles}
              />
            ))
          ) : (
            <div className='mb-5'>
              <div className='flex items-center mb-0.5 min-h-4.5'>
                <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse ml-2'></span>
              </div>
              <div className='flex items-center mb-2 min-h-4.25'>
                <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse ml-2'></span>
              </div>
              <div className='space-y-1.5 mt-2'>
                <div className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></div>
                <div className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></div>
              </div>
            </div>
          )}
        </>

        {/* Education */}
        <>
          <CenteredDivider section={sectionHeaderStyles} label='Education' />
          {userData?.education?.length > 0 ? (
            userData.education.map(edu => (
              <EducationEntry
                key={edu.id}
                entry={edu}
                eduStyles={companyStyles}
                metaStyles={dateStyles}
                bodyStyles={bodyTextStyles}
              />
            ))
          ) : (
            <div className='mb-3'>
              <div className='flex items-center mb-0.5 min-h-4.5'>
                <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-16 bg-slate-200 rounded animate-pulse ml-2'></span>
              </div>
              <div className='flex items-center min-h-4.25'>
                <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
                <span className='inline-block h-1.5 w-20 bg-slate-200 rounded animate-pulse ml-2'></span>
              </div>
            </div>
          )}
        </>

        {/* Skills */}
        <>
          <CenteredDivider section={sectionHeaderStyles} label='Skills' />
          <SkillRows rows={userData?.skills} skillsStyles={bodyTextStyles} />
        </>

        {/* Languages */}
        {userData?.showLanguages && (
          <>
            <CenteredDivider section={sectionHeaderStyles} label='Languages' />
            <SkillRows rows={userData.languages} skillsStyles={bodyTextStyles} />
          </>
        )}
      </div>
    </div>
  )
}

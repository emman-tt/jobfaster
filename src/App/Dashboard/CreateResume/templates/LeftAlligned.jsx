function SectionRule ({ label, section }) {
  return (
    <div className='mb-4'>
      <h2
        style={{
          letterSpacing: section?.spacing,
          textTransform: section?.case,
          fontSize: `${section?.size}pt`
        }}
        className={`${section?.weight} ${section?.style} text-slate-900 mb-2`}
      >
        {label}
      </h2>
      <div className='h-px bg-slate-200' />
    </div>
  )
}

function ContactRow ({ value, href, styles }) {
  const content = (
    <span
      style={{
        fontSize: `${styles?.size}pt`,
        fontWeight: styles?.weight === 'font-bold' ? 'bold' : 'normal'
      }}
      className='text-slate-900 w-full min-h-4.25 flex items-center'
    >
      {value}
    </span>
  )
  return (
    <div className='flex items-start gap-2 text-slate-400'>
      {href && typeof value === 'string' ? (
        <a
          style={{
            fontSize: `${styles?.size}pt`,
            fontWeight: styles?.weight === 'font-bold' ? 'bold' : 'normal'
          }}
          href={href}
          className='w-full text-slate-900 hover:text-slate-600 transition-colors min-h-4.25 flex items-center'
        >
          {value}
        </a>
      ) : (
        content
      )}
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
    <div
      className='grid gap-x-5 mb-5 last:mb-0'
      style={{ gridTemplateColumns: '80px 1fr' }}
    >
      {/* Date column */}
      <div className='text-right pt-px'>
        <span
          style={{ fontSize: `${metaStyles?.size}pt` }}
          className='text-slate-400 tabular-nums leading-tight block min-h-7.5'
        >
          {entry?.startYear || (
            <span className='inline-block h-1.5 w-6 bg-slate-200 rounded animate-pulse'></span>
          )}
          -<br />
          {entry?.endYear || (
            <span className='inline-block h-1.5 w-6 bg-slate-200 rounded animate-pulse mt-1'></span>
          )}
        </span>
      </div>

      {/* Content column */}
      <div>
        <div className='min-h-4.5 mb-0.5 flex items-center'>
          <p
            style={{
              fontSize: `${jobStyles?.size}pt`,
              textTransform: jobStyles?.case
            }}
            className={`${jobStyles?.style} font-bold tracking-widest uppercase text-slate-900`}
          >
            {entry?.jobTitle || (
              <span className='inline-block h-6 w-32 bg-slate-200 rounded animate-pulse'></span>
            )}
          </p>
        </div>
        <div className='min-h-4.25 mb-2 flex items-center'>
          <p
            style={{
              fontSize: `${companyStyles?.size}pt`,
              letterSpacing: companyStyles?.spacing,
              textTransform: companyStyles?.case
            }}
            className={`${companyStyles?.style} ${companyStyles?.weight} text-slate-500 italic`}
          >
            {entry?.company ? (
              `${entry?.company}${
                entry?.location ? `, ${entry?.location}` : ''
              }`
            ) : (
              <span className='inline-block h-5 w-40 bg-slate-200 rounded animate-pulse'></span>
            )}
          </p>
        </div>

        {/* Bullets */}
        {entry?.points?.length > 0 ? (
          <ul className='space-y-1'>
            {entry?.points.map((b, i) => (
              <li
                key={i}
                style={{
                  fontSize: `${bulletStyles?.size}pt`,
                  textTransform: bulletStyles?.case
                }}
                className={`${bulletStyles?.style} flex gap-2 text-slate-900 leading-snug items-start`}
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
    </div>
  )
}

function EducationEntry ({ entry, metaStyles, bodyStyles, companyStyles }) {
  return (
    <div
      className='grid gap-x-5 mb-5 last:mb-0'
      style={{ gridTemplateColumns: '80px 1fr' }}
    >
      {/* Date column */}
      <div className='text-right pt-px'>
        <span
          style={{ fontSize: `${metaStyles?.size}pt` }}
          className='text-slate-400 tabular-nums leading-tight block min-h-7.5'
        >
          {entry?.startYear || (
            <span className='inline-block h-5 w-15 bg-slate-200 rounded animate-pulse'></span>
          )}
          -<br />
          {entry?.endYear || (
            <span className='inline-block h-5 w-15 bg-slate-200 rounded animate-pulse mt-1'></span>
          )}
        </span>
      </div>

      {/* Content column */}
      <div>
        <div className='min-h-4.5 mb-0.5 flex items-center'>
          <p
            style={{
              fontSize: `${bodyStyles?.size}pt`,
              textTransform: bodyStyles?.case
            }}
            className={`${bodyStyles?.style} ${bodyStyles?.weight}  tracking-widest  text-slate-900`}
          >
            {entry?.degree || (
              <span className='inline-block h-7 w-80 bg-slate-200 rounded animate-pulse'></span>
            )}
          </p>
        </div>
        <div className='min-h-4.25 mb-2 flex items-center'>
          <p
            style={{
              fontSize: `${companyStyles?.size}pt`,
              letterSpacing: companyStyles?.spacing,
              textTransform: companyStyles?.case
            }}
            className={`${companyStyles?.style} ${companyStyles?.weight} gap-2 items-center flex text-slate-500 italic`}
          >
            {entry.instituition ? (
              `${entry.instituition}`
            ) : (
              <span className='inline-block h-8 w-50 bg-slate-200 rounded animate-pulse'></span>
            )}
            {entry.level || entry.gpa ? (
              <>
                {entry.level && (
                  <span style={{ fontSize: metaStyles?.size }} className=' '>
                    level {entry?.level}
                  </span>
                )}
                {entry.gpa && (
                  <span style={{ fontSize: metaStyles?.size }} className=' '>
                    Grade: {entry?.gpa}
                  </span>
                )}
              </>
            ) : (
              <span className='inline-block h-5 w-60 bg-slate-200 rounded animate-pulse mt-0.5'></span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LeftAlligned ({ userData, className }) {
  const styles = userData?.styles
  const sectionHeaderStyles = styles?.sectionHeader
  const nameStyles = styles?.name
  // const metaDataStyles = styles?.metadata
  const jobTitleStyles = styles?.jobTitle
  const companyStyles = styles?.company
  const bodyTextStyles = styles?.bodyText
  const dateStyles = styles?.date
  const contactStyles = styles?.contact

  return (
    <div
      className={`bg-white max-w-2xl mx-auto shadow-md font-sans ${className}`}
    >
      {/* ── Header — left-aligned, no border accent ── */}
      <header className='px-10 pt-9 pb-6 border-b-2 border-slate-200'>
        <h1
          style={{
            fontSize: `${nameStyles?.size}pt`,
            letterSpacing: nameStyles?.spacing
          }}
          className={`${nameStyles?.weight} uppercase text-slate-900 mb-1 flex items-center min-h-8`}
        >
          {userData?.name || (
            <span className='inline-block h-10 w-48 bg-slate-200 rounded animate-pulse'></span>
          )}
        </h1>
        <p className='text-[10pt] italic text-slate-500 mb-1.5 flex items-center min-h-5'>
          {userData?.jobTitle || (
            <span className='inline-block h-6 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </p>
      </header>

      {/* ── Body ── */}
      <div className='px-10 pt-6 pb-10 space-y-6'>
        {/* Contact block */}
        <div className='space-y-1.5 flex flex-col justify-center min-h-21.25'>
          <ContactRow
            styles={contactStyles}
            value={
              userData?.location || (
                <span className='inline-block h-5 w-24 bg-slate-200 rounded animate-pulse'></span>
              )
            }
          />
          <ContactRow
            styles={contactStyles}
            value={
              userData?.email || (
                <span className='inline-block h-5 w-32 bg-slate-200 rounded animate-pulse'></span>
              )
            }
            href={userData?.email ? `mailto:${userData?.email}` : undefined}
          />
          <ContactRow
            styles={contactStyles}
            value={
              userData?.phone || (
                <span className='inline-block h-5 w-24 bg-slate-200 rounded animate-pulse'></span>
              )
            }
          />
          <ContactRow
            styles={contactStyles}
            value={
              userData?.linkedin || (
                <span className='inline-block h-5 w-32 bg-slate-200 rounded animate-pulse'></span>
              )
            }
            href={
              userData?.linkedin ? `https://${userData?.linkedin}` : undefined
            }
          />
        </div>

        {/* Summary */}
        {userData?.showSummary &&
          (userData?.summary.length > 0 ? (
            <div>
              <SectionRule section={sectionHeaderStyles} label='Summary' />
              <p
                style={{
                  fontSize: `${bodyTextStyles?.size}pt`,
                  textTransform: bodyTextStyles?.case
                }}
                className={`${bodyTextStyles?.style} text-slate-900 leading-relaxed min-h-5 flex items-center`}
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
            <div>
              <SectionRule section={sectionHeaderStyles} label='Summary' />
              <div className='flex flex-col gap-4 mt-5'>
                <span className='h-6 w-full bg-slate-200 rounded animate-pulse'></span>
                <span className='h-6 w-11/12 bg-slate-200 rounded animate-pulse'></span>
              </div>
            </div>
          ))}

        {/* Experience */}
        <div>
          <SectionRule section={sectionHeaderStyles} label='Experience' />
          {userData?.experience?.length > 0 ? (
            userData?.experience.map(exp => (
              <ExperienceEntry
                key={exp.id}
                entry={exp}
                contactStyles={contactStyles}
                companyStyles={companyStyles}
                jobStyles={jobTitleStyles}
                bulletStyles={bodyTextStyles}
                metaStyles={dateStyles}
              />
            ))
          ) : (
            <div
              className='grid gap-x-5 mb-5'
              style={{ gridTemplateColumns: '80px 1fr' }}
            >
              <div className='text-right pt-px'>
                <span className='inline-block h-4 w-8 bg-slate-200 rounded animate-pulse mb-1'></span>
              </div>
              <div>
                <div className='h-5 w-24 bg-slate-200 rounded animate-pulse mb-1.5'></div>
                <div className='h-4 w-32 bg-slate-200 rounded animate-pulse mb-2.5'></div>
                <div className='space-y-4'>
                  <div className='h-4 w-full bg-slate-200 rounded animate-pulse'></div>
                  <div className='h-4 w-5/6 bg-slate-200 rounded animate-pulse'></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Education */}
        <div>
          <SectionRule section={sectionHeaderStyles} label='Education' />
          {userData?.education?.length > 0 ? (
            userData?.education.map(edu => (
              <EducationEntry
                key={edu.id}
                entry={edu}
                companyStyles={companyStyles}
                metaStyles={dateStyles}
                bodyStyles={bodyTextStyles}
              />
            ))
          ) : (
            <div
              className='grid gap-x-5 mb-5'
              style={{ gridTemplateColumns: '80px 1fr' }}
            >
              <div className='text-right pt-px'>
                <span className='inline-block h-5 w-15 bg-slate-200 rounded animate-pulse mb-1'></span>
              </div>
              <div>
                <div className='h-7 w-80 bg-slate-200 rounded animate-pulse mb-1.5'></div>
                <div className='h-6 w-100 bg-slate-200 rounded animate-pulse mb-2'></div>
              </div>
            </div>
          )}
        </div>

        {/* Skills */}
        <SectionRule
          section={sectionHeaderStyles}
          label={'Skills'}
        ></SectionRule>
        <section className=' min-h-20'>
          <SkillsRow skills={userData?.skills} skillsStyles={bodyTextStyles} />
        </section>

        {/* Languages */}
        {userData?.showLanguages && (
          <>
            <SectionRule
              section={sectionHeaderStyles}
              label={'Languages'}
            ></SectionRule>
            <section className=' min-h-20'>
              <SkillsRow
                skills={userData.languages}
                skillsStyles={bodyTextStyles}
              />
            </section>
          </>
        )}

        {/* Projects */}
        {userData?.showProjects && (
          <>
            <SectionRule section={sectionHeaderStyles} label='Projects' />
            {userData?.projects?.length > 0 ? (
              userData.projects.map(project => (
                <ProjectEntry
                  key={project.id}
                  entry={project}
                  companyStyles={companyStyles}
                  jobStyles={jobTitleStyles}
                  bulletStyles={bodyTextStyles}
                />
              ))
            ) : (
              <div className='mb-5'>
                <div className='min-h-4.5 mb-0.5'>
                  <span className='inline-block h-2 w-32 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='min-h-4.25 mb-2'>
                  <span className='inline-block h-1.5 w-24 bg-slate-200 rounded animate-pulse'></span>
                </div>
                <div className='space-y-1.5 mt-2'>
                  <div className='h-1.5 w-full bg-slate-200 rounded animate-pulse'></div>
                  <div className='h-1.5 w-5/6 bg-slate-200 rounded animate-pulse'></div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Certificates */}
        {userData?.showCertificates && (
          <>
            <SectionRule section={sectionHeaderStyles} label='Certifications' />
            {userData?.certificates?.length > 0 ? (
              userData.certificates.map(cert => (
                <CertificateEntry key={cert.id} entry={cert} />
              ))
            ) : (
              <div className='mb-3'>
                <span className='inline-block h-5 w-40 bg-slate-200 rounded animate-pulse'></span>
              </div>
            )}
          </>
        )}
      </div>
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
        fontSize: skillsStyles?.size,
        textTransform: skillsStyles?.case
      }}
      className={`${skillsStyles?.style} flex flex-wrap text-slate-600 items-center min-h-4.5`}
    >
      {skills.map((skill, i) => (
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

function ProjectEntry ({ entry, companyStyles, jobStyles, bulletStyles }) {
  return (
    <div className='mb-5 last:mb-0'>
      <div className='min-h-4.5 mb-0.5'>
        <p
          style={{
            fontSize: `${companyStyles?.size}pt`,
            letterSpacing: companyStyles?.spacing,
            textTransform: companyStyles?.case
          }}
          className={`${companyStyles?.weight} text-slate-900`}
        >
          {entry.name || (
            <span className='inline-block h-6 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </p>
        {entry.url && (
          <p className='text-[10pt] text-slate-400 italic mt-0.5'>
            {entry.url}
          </p>
        )}
      </div>

      <div className='min-h-4.25 mb-2'>
        <p
          style={{
            fontSize: `${jobStyles?.size}pt`,
            textTransform: jobStyles?.case
          }}
          className={`${jobStyles?.style} text-slate-500`}
        >
          {entry.description || entry.techStack || (
            <span className='inline-block h-5 w-32 bg-slate-200 rounded animate-pulse'></span>
          )}
        </p>
      </div>

      {entry.points?.length > 0 ? (
        <ul className='space-y-1'>
          {entry.points.map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: `${bulletStyles?.size}pt`,
                textTransform: bulletStyles?.case
              }}
              className={`${bulletStyles?.style} flex gap-2 text-slate-900 leading-snug items-start`}
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
        </div>
      )}
    </div>
  )
}

function CertificateEntry ({ entry }) {
  return (
    <div className='mb-3 last:mb-0'>
      <p className='text-[11pt] font-medium text-slate-700'>
        {entry.name || (
          <span className='inline-block h-5 w-40 bg-slate-200 rounded animate-pulse'></span>
        )}
      </p>
      <p className='text-[10pt] text-slate-400 mt-0.5'>
        {entry.issuer}
        {entry.year && <span className='ml-2 italic'>({entry.year})</span>}
        {entry.url && <span className='ml-2'>{entry.url}</span>}
      </p>
    </div>
  )
}

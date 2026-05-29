import React from 'react'

const ElegantMinimal = ({ data }) => {
  const styles = data?.styles || {}
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.6
  const primaryGray = '#18181B'
  const mediumGray = '#52525B'
  const lightGray = '#A1A1AA'

  return (
    <div
      style={{
        color: bodyStyles.color || primaryGray,
        maxWidth: '850px',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        padding: '48px'
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #E4E4E7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5pt', color: lightGray }}>
            <span style={{ fontWeight: 500, color: mediumGray }}>{data?.name}</span>
            <span>Page {data?.pageNumber} of {data?.totalPages}</span>
          </div>
        </div>
      )}

      <div
        style={{
          textAlign: 'center',
          marginBottom: '28px',
          paddingBottom: '16px',
          borderBottom: '1px solid #E4E4E7',
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 24}pt`,
            fontWeight: 400,
            margin: '0 0 6px 0',
            letterSpacing: nameStyles.spacing || 6,
            textTransform: 'uppercase',
            color: nameStyles.color || primaryGray,
          }}
        >
          {data?.name}
        </h1>
        <p
          style={{
            fontSize: `${companyStyles.size || 11}pt`,
            margin: '0 0 10px 0',
            fontStyle: 'italic',
            color: mediumGray,
          }}
        >
          {data?.jobTitle}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: `${contactStyles.size || 9.5}pt`,
            color: contactStyles.color || mediumGray,
          }}
        >
          {data?.phone && <span>{data.phone}</span>}
          {data?.email && <span>{data.email}</span>}
          {data?.location && <span>{data.location}</span>}
        </div>
        {links?.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: `${contactStyles.size || 9}pt`,
              color: mediumGray,
              marginTop: '4px',
            }}
          >
            {links.map((item, index) => (
              <span key={item.name}>{item.link}</span>
            ))}
          </div>
        )}
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 9.5}pt`,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: '0 0 10px 0',
              color: sectionStyles.color || primaryGray,
            }}
          >
            Profile
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 10.5}pt`,
              margin: '0',
              lineHeight: bodyLeading,
              textAlign: 'justify',
              fontStyle: 'italic',
              color: bodyStyles.color || mediumGray,
            }}
          >
            {data.summary}
          </p>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 9.5}pt`,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: '0 0 14px 0',
              color: sectionStyles.color || primaryGray,
              paddingBottom: '4px',
              borderBottom: '1px solid #D4D4D8',
            }}
          >
            Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} data-section="experience" style={{ marginBottom: '18px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '2px',
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 11}pt`,
                    fontWeight: 600,
                    margin: '0',
                    color: companyStyles.color || primaryGray,
                  }}
                >
                  {exp.position}
                </h3>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9.5}pt`,
                    color: dateStyles.color || mediumGray,
                    fontVariant: 'tabular-nums',
                  }}
                >
                  {exp.startYear} — {exp.endYear}
                </span>
              </div>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 10}pt`,
                  margin: '0 0 6px 0',
                  fontStyle: 'italic',
                  color: mediumGray,
                }}
              >
                {exp.company}{exp.location && `, ${exp.location}`}
              </p>
              {exp.accomplishments?.map((acc, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 10}pt`,
                    marginBottom: '3px',
                    marginLeft: '14px',
                    lineHeight: bodyLeading,
                    color: bodyStyles.color || mediumGray,
                  }}
                >
                  — {acc}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 9.5}pt`,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: '0 0 14px 0',
              color: sectionStyles.color || primaryGray,
              paddingBottom: '4px',
              borderBottom: '1px solid #D4D4D8',
            }}
          >
            Projects
          </h2>
          {data.projects.map(proj => (
            <div key={proj.id} data-section="projects" style={{ marginBottom: '14px' }}>
              <h3
                style={{
                  fontSize: `${companyStyles.size || 10.5}pt`,
                  fontWeight: 600,
                  margin: '0 0 3px 0',
                  color: primaryGray,
                }}
              >
                {proj.name}
              </h3>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 9.5}pt`,
                  margin: '0 0 3px 0',
                  lineHeight: bodyLeading,
                  color: mediumGray,
                }}
              >
                {proj.description}
              </p>
              {proj.techStack?.length > 0 && (
                <p
                  style={{
                    fontSize: `${dateStyles.size || 9}pt`,
                    margin: '0',
                    color: lightGray,
                    fontStyle: 'italic',
                  }}
                >
                  {proj.techStack.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div>
          {data?.education?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 9.5}pt`,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  color: sectionStyles.color || primaryGray,
                  paddingBottom: '4px',
                  borderBottom: '1px solid #D4D4D8',
                }}
              >
                Education
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} data-section="education" style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${companyStyles.size || 10.5}pt`, margin: '0' }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, color: mediumGray, margin: '2px 0' }}>
                    {edu.school}
                  </div>
                  <div style={{ fontSize: `${dateStyles.size || 9}pt`, color: lightGray, margin: '0' }}>
                    {edu.startYear} — {edu.endYear}
                  </div>
                  {edu.highlights?.length > 0 && (
                    <div style={{ fontSize: `${bodyStyles.size || 9}pt`, color: mediumGray, marginTop: '2px', marginLeft: '10px' }}>
                      {edu.highlights.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data?.skills?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 9.5}pt`,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  color: sectionStyles.color || primaryGray,
                  paddingBottom: '4px',
                  borderBottom: '1px solid #D4D4D8',
                }}
              >
                Skills
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, lineHeight: 1.7, color: mediumGray }}>
                {data.skills.map((skill, i) => (
                  <span key={i}>
                    {i > 0 && ' • '}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data?.certificates?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 9.5}pt`,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 8px 0',
                  color: sectionStyles.color || primaryGray,
                  paddingBottom: '4px',
                  borderBottom: '1px solid #D4D4D8',
                }}
              >
                Certifications
              </h2>
              {data.certificates.map((cert, i) => (
                <div key={i} style={{ fontSize: `${bodyStyles.size || 9.5}pt`, marginBottom: '3px', color: mediumGray }}>
                  {cert.name}
                </div>
              ))}
            </div>
          )}

          {data?.languages?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 9.5}pt`,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 8px 0',
                  color: sectionStyles.color || primaryGray,
                  paddingBottom: '4px',
                  borderBottom: '1px solid #D4D4D8',
                }}
              >
                Languages
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, lineHeight: 1.6, color: mediumGray }}>
                {data.languages.map((lang, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{lang.name}</span>
                    <span style={{ color: lightGray, fontStyle: 'italic' }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 9.5}pt`,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 8px 0',
                  color: sectionStyles.color || primaryGray,
                  paddingBottom: '4px',
                  borderBottom: '1px solid #D4D4D8',
                }}
              >
                Achievements
              </h2>
              {data.achievements.map((ach, i) => (
                <div key={i} style={{ fontSize: `${bodyStyles.size || 9.5}pt`, marginBottom: '3px', color: mediumGray }}>
                  — {ach}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ElegantMinimal

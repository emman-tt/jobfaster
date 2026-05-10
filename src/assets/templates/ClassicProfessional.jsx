import React from 'react'

const ClassicProfessional = ({ data }) => {
  const styles = data?.styles || {}
  const fontFamily = styles.fontFamily
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const jobTitleStyles = styles.jobTitle || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks
  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.6

  return (
    <div
      style={{
        lineHeight: bodyLeading,
        color: bodyStyles.color || '#333',
        maxWidth: '850px'
      }}
      className={`${fontFamily}`}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ borderTop: '1px solid #999', marginBottom: '6px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt', color: '#666' }}>
            <span style={{ fontWeight: 'bold' }}>{data?.name}</span>
            <span>Page {data?.pageNumber} of {data?.totalPages}</span>
          </div>
          <div style={{ borderTop: '1px solid #999', marginTop: '6px' }} />
        </div>
      )}
      <div
        style={{
          borderBottom: data?.name || (data?.jobTitle && '3px solid #333'),
          paddingBottom: '16px',
          marginBottom: '24px'
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 32}pt`,
            margin: '0 0 4px 0',
            fontWeight: nameStyles.weight === 'font-bold' ? 'bold' : 'normal',
            letterSpacing: nameStyles.spacing || 0,
            color: nameStyles.color || '#333'
          }}
        >
          {data?.name}
        </h1>
        <p
          style={{
            fontSize: `${jobTitleStyles.size || 14}pt`,
            margin: '0',
            color: jobTitleStyles.color || '#666',
            fontStyle: jobTitleStyles.style || 'italic'
          }}
        >
          {data?.jobTitle}
        </p>
        <p
          style={{
            fontSize: `${contactStyles.size || 12}pt`,
            margin: '8px 0 0 0',
            color: contactStyles.color || '#666'
          }}
        >
          {[data?.location, data?.phone, data?.email].filter(Boolean).join(' | ')}
        </p>
        {links?.length > 0 && (
          <div
            style={{
              fontSize: `${contactStyles.size || 11}pt`,
              margin: '4px 0 0 0',
              color: contactStyles.color || '#666'
            }}
          >
            {links.map((item, index) => (
              <span key={item.name}>
                {index > 0 && ' | '}
                {item.link}
              </span>
            ))}
          </div>
        )}
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 14}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #999',
              paddingBottom: '6px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            Professional Summary
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 11}pt`,
              margin: '0',
              lineHeight: bodyLeading
            }}
          >
            {data.summary}
          </p>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 14}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #999',
              paddingBottom: '6px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} data-section="experience" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 12}pt`,
                    fontWeight:
                      companyStyles.weight === 'font-medium' ? 500 : 'bold',
                    margin: '0',
                    color: companyStyles.color || '#333'
                  }}
                >
                  {exp.position}
                </h3>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 11}pt`,
                    color: dateStyles.color || '#666',
                    fontStyle: dateStyles.style || 'italic'
                  }}
                >
                  {exp.startYear} - {exp.endYear}
                </span>
              </div>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 11}pt`,
                  margin: '2px 0 6px 0',
                  color: bodyStyles.color || '#666'
                }}
              >
                {exp.company}, {exp.location}
              </p>
              <ul
                style={{
                  fontSize: `${bodyStyles.size || 11}pt`,
                  margin: '0',
                  paddingLeft: '20px'
                }}
              >
                {exp.accomplishments?.map((acc, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    {acc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 14}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #999',
              paddingBottom: '6px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            Projects
          </h2>
          {data.projects.map(proj => (
            <div key={proj.id} data-section="projects" style={{ marginBottom: '10px' }}>
              <h3
                style={{
                  fontSize: `${companyStyles.size || 12}pt`,
                  fontWeight: 'bold',
                  margin: '0'
                }}
              >
                {proj.name}
              </h3>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 11}pt`,
                  margin: '2px 0',
                  color: bodyStyles.color || '#666'
                }}
              >
                {proj.description}
              </p>
              <p
                style={{
                  fontSize: `${dateStyles.size || 10}pt`,
                  margin: '2px 0',
                  color: dateStyles.color || '#666'
                }}
              >
                Tech: {proj.techStack?.join(', ')}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1, marginBottom: '20px' }}>
          {data?.education?.length > 0 && (
            <>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 14}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #999',
              paddingBottom: '6px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            Education
          </h2>
              {data.education.map(edu => (
                <div key={edu.id} data-section="education" style={{ marginBottom: '10px' }}>
                  <h3
                    style={{
                      fontSize: `${companyStyles.size || 12}pt`,
                      fontWeight:
                        companyStyles.weight === 'font-medium' ? 500 : 'bold',
                      margin: '0'
                    }}
                  >
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 11}pt`,
                      margin: '2px 0 0 0',
                      color: bodyStyles.color || '#666'
                    }}
                  >
                    {[edu.school, `${edu.startYear} - ${edu.endYear}`].filter(Boolean).join(' • ')}
                  </p>
                  {edu.highlights?.length > 0 && (
                    <p
                      style={{
                        fontSize: `${dateStyles.size || 10}pt`,
                        margin: '2px 0 0 0',
                        color: dateStyles.color || '#666'
                      }}
                    >
                      {edu.highlights.join(' | ')}
                    </p>
                  )}
                </div>
              ))}
            </>
          )}
          {data?.languages?.length > 0 && (
            <div style={{ marginTop: data.education.length > 0 ? '16px' : 0 }}>
          <h3
            style={{
              fontSize: `${companyStyles.size || 12}pt`,
              fontWeight: 'bold',
              margin: '0 0 4px 0',
              color: companyStyles.color || '#333'
            }}
          >
            Languages
          </h3>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 11}pt`,
                  margin: '0',
                  color: bodyStyles.color || '#666'
                }}
              >
                {data.languages
                  .map(lang => `${lang.name} (${lang.proficiency})`)
                  .join(', ')}
              </p>
            </div>
          )}
        </div>
        <div style={{ flex: 1, marginBottom: '20px' }}>
          {data?.skills?.length > 0 && (
            <>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 14}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #999',
              paddingBottom: '6px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            Skills
          </h2>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 11}pt`,
                  margin: '0',
                  lineHeight: bodyLeading
                }}
              >
                {data.skills.join(', ')}
              </p>
            </>
          )}
        </div>
      </div>

      {data?.certificates?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 14}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #999',
              paddingBottom: '6px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            Certifications
          </h2>
          <ul
            style={{
              fontSize: `${bodyStyles.size || 11}pt`,
              margin: '0',
              paddingLeft: '20px'
            }}
          >
            {data.certificates.map((cert, i) => (
              <li key={i}>
                {cert.name} {cert.issuer && `(${cert.issuer})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data?.achievements?.length > 0 && (
        <div>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 14}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #999',
              paddingBottom: '6px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            Achievements
          </h2>
          <ul
            style={{
              fontSize: `${bodyStyles.size || 11}pt`,
              margin: '0',
              paddingLeft: '20px'
            }}
          >
            {data.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ClassicProfessional

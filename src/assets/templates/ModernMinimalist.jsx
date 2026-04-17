import React from 'react'



const ModernMinimalist = ({ data }) => {
  const styles = data?.styles || {}
  const fontFamily = styles.fontFamily || 'Arial, sans-serif'
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const jobTitleStyles = styles.jobTitle || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.6

  return (
    <div
      style={{
  
        color: '#2c3e50',
        maxWidth: '850px'
      }}
      className={`${fontFamily}`}

    >
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: `${nameStyles.size || 36}pt`,
            margin: '0',
            fontWeight: 300,
            letterSpacing: nameStyles.spacing || 2
          }}
        >
          {data?.name || 'Name'}
        </h1>
        <div
          style={{ height: '1px', background: '#e0e0e0', margin: '16px 0' }}
        ></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: `${jobTitleStyles.size || 13}pt`,
            color: jobTitleStyles.color || '#666',
            marginBottom: '16px'
          }}
        >
          <span>{data?.jobTitle || 'Job Title'}</span>
          <span>{data?.phone}</span>
        </div>
        <div
          style={{
            fontSize: `${contactStyles.size || 12}pt`,
            color: contactStyles.color || '#666',
            marginBottom: '8px'
          }}
        >
          {data?.email} | {data?.location}
        </div>
        {data?.linkedin?.length > 0 && (
          <div
            style={{
              fontSize: `${contactStyles.size || 11}pt`,
              color: contactStyles.color || '#666',
              marginBottom: '8px'
            }}
          >
            LinkedIn: {data?.linkedin}
          </div>
        )}
        {data?.summary && data.summary.length > 0 && (
          <p
            style={{
              fontSize: `${bodyStyles.size || 13}pt`,
              margin: '0',
              lineHeight: bodyLeading,
              color: bodyStyles.color || '#555'
            }}
          >
            {data.summary}
          </p>
        )}
      </div>

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 13}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 1,
              marginBottom: '16px',
              color: '#2c3e50'
            }}
          >
            Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '4px'
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 13}pt`,
                    fontWeight: 'bold',
                    margin: '0'
                  }}
                >
                  {exp.position}
                </h3>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 12}pt`,
                    color: dateStyles.color || '#999',
                    fontStyle: dateStyles.style || 'normal'
                  }}
                >
                  {exp.startYear} – {exp.endYear}
                </span>
              </div>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 12}pt`,
                  margin: '0 0 8px 0',
                  color: bodyStyles.color || '#999'
                }}
              >
                {exp.company} | {exp.location}
              </p>
              <div
                style={{
                  fontSize: `${bodyStyles.size || 12}pt`,
                  lineHeight: bodyLeading,
                  color: bodyStyles.color || '#555'
                }}
              >
                {exp.accomplishments?.map((acc, i) => (
                  <div key={i} style={{ marginBottom: '4px' }}>
                    • {acc}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 13}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 1,
              marginBottom: '16px',
              color: '#2c3e50'
            }}
          >
            Projects
          </h2>
          {data.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '16px' }}>
              <h3
                style={{
                  fontSize: `${companyStyles.size || 13}pt`,
                  fontWeight: 'bold',
                  margin: '0 0 4px 0'
                }}
              >
                {proj.name}
              </h3>
              <p
                style={{
                  fontSize: `${bodyStyles.size || 12}pt`,
                  margin: '0 0 4px 0',
                  color: bodyStyles.color || '#555'
                }}
              >
                {proj.description}
              </p>
              <p
                style={{
                  fontSize: `${dateStyles.size || 11}pt`,
                  color: dateStyles.color || '#999'
                }}
              >
                Tech: {proj.techStack?.join(' • ')}
              </p>
            </div>
          ))}
        </div>
      )}

      {(data?.education?.length > 0 || data?.languages?.length > 0 || data?.skills?.length > 0) && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
        >
          <div>
            {data?.education?.length > 0 && (
              <>
                <h2
                  style={{
                    fontSize: `${sectionStyles.size || 13}pt`,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: sectionStyles.spacing || 1,
                    marginBottom: '12px',
                    color: '#2c3e50'
                  }}
                >
                  Education
                </h2>
                {data.education.map(edu => (
                  <div key={edu.id} style={{ marginBottom: '12px' }}>
                    <h3
                      style={{
                        fontSize: `${companyStyles.size || 12}pt`,
                        fontWeight: '600',
                        margin: '0 0 2px 0'
                      }}
                    >
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p
                      style={{
                        fontSize: `${bodyStyles.size || 11}pt`,
                        color: bodyStyles.color || '#999',
                        margin: '0'
                      }}
                    >
                      {edu.school} | {edu.startYear} - {edu.endYear}
                    </p>
                    {edu.highlights?.length > 0 && (
                      <p
                        style={{
                          fontSize: `${dateStyles.size || 10}pt`,
                          color: dateStyles.color || '#999',
                          margin: '2px 0 0 0'
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
              <div style={{ marginTop: data?.education?.length > 0 ? '16px' : 0 }}>
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 12}pt`,
                    fontWeight: '600',
                    margin: '0 0 4px 0'
                  }}
                >
                  Languages
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 11}pt`,
                    color: bodyStyles.color || '#999',
                    margin: '0'
                  }}
                >
                  {data.languages
                    .map(lang => `${lang.name} (${lang.proficiency})`)
                    .join(', ')}
                </p>
              </div>
            )}
          </div>
          <div>
            {data?.skills?.length > 0 && (
              <>
                <h2
                  style={{
                    fontSize: `${sectionStyles.size || 13}pt`,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: sectionStyles.spacing || 1,
                    marginBottom: '12px',
                    color: '#2c3e50'
                  }}
                >
                  Skills
                </h2>
                <div
                  style={{ fontSize: `${bodyStyles.size || 12}pt`, lineHeight: '1.8' }}
                >
                  {data.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-block',
                        marginRight: '8px',
                        marginBottom: '4px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {(data?.certificates?.length > 0 || data?.achievements?.length > 0) && (
        <div style={{ marginTop: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              {data?.certificates?.length > 0 && (
                <>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 13}pt`,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: sectionStyles.spacing || 1,
                      marginBottom: '12px',
                      color: '#2c3e50'
                    }}
                  >
                    Certifications
                  </h2>
                  <ul
                    style={{
                      fontSize: `${bodyStyles.size || 12}pt`,
                      margin: '0',
                      paddingLeft: '20px',
                      color: bodyStyles.color || '#555'
                    }}
                  >
                    {data.certificates.map((cert, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{cert.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div>
              {data?.achievements?.length > 0 && (
                <>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 13}pt`,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: sectionStyles.spacing || 1,
                      marginBottom: '12px',
                      color: '#2c3e50'
                    }}
                  >
                    Achievements
                  </h2>
                  <ul
                    style={{
                      fontSize: `${bodyStyles.size || 12}pt`,
                      margin: '0',
                      paddingLeft: '20px',
                      color: bodyStyles.color || '#555'
                    }}
                  >
                    {data.achievements.map((ach, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{ach}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModernMinimalist

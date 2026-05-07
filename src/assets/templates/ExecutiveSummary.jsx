import React from 'react'



const ExecutiveSummary = ({ data }) => {
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

        color: bodyStyles.color || '#1a1a1a',
        maxWidth: '850px'
      }}
      className={`${fontFamily}`}

    >
      <div
        style={{
          background: '#f5f5f5',
          padding: '20px',
          marginBottom: '24px',
          borderLeft: '4px solid #003366'
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 28}pt`,
            margin: '0 0 4px 0',
            fontWeight: nameStyles.weight === 'font-bold' ? 'bold' : 'normal',
            letterSpacing: nameStyles.spacing || 0,
            color: nameStyles.color || '#1a1a1a'
          }}
        >
          {data?.name}
        </h1>
        <h2
          style={{
            fontSize: `${jobTitleStyles.size || 16}pt`,
            margin: '0 0 12px 0',
            color: jobTitleStyles.color || '#003366',
            fontWeight: 600
          }}
        >
          {data?.jobTitle}
        </h2>
        <p
          style={{
            fontSize: `${contactStyles.size || 12}pt`,
            margin: '0',
            lineHeight: bodyLeading
          }}
        >
          {[data?.phone, data?.email, data?.location].filter(Boolean).join(' • ')}
        </p>
        {links?.length > 0 && (
          <div
            style={{
              fontSize: `${contactStyles.size || 11}pt`,
              margin: '8px 0 0 0',
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
          <h3
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: sectionStyles.color || '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Executive Profile
          </h3>
          <p
            style={{
              fontSize: `${bodyStyles.size || 12}pt`,
              margin: '0',
              lineHeight: bodyLeading
            }}
          >
            {data.summary}
          </p>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <>
          <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: sectionStyles.color || '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Key Achievements
          </h3>
            <ul
              style={{
                fontSize: `${bodyStyles.size || 12}pt`,
                margin: '0',
                paddingLeft: '20px'
              }}
            >
              {data.experience[0]?.accomplishments?.map((acc, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {acc}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: sectionStyles.color || '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Professional Experience
          </h3>
            {data.experience.map(exp => (
              <div key={exp.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4
                  style={{
                    fontSize: `${companyStyles.size || 12}pt`,
                    fontWeight: 'bold',
                    margin: '0',
                    color: companyStyles.color || '#1a1a1a'
                  }}
                >
                  {exp.position}
                </h4>
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
                    margin: '0',
                    color: bodyStyles.color || '#666'
                  }}
                >
                  {exp.company}, {exp.location}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: sectionStyles.color || '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Notable Projects
          </h3>
          {data.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <p
                style={{
                  fontSize: `${companyStyles.size || 12}pt`,
                  fontWeight: 'bold',
                  margin: '0'
                }}
              >
                {proj.name}
              </p>
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
                Tech Stack: {proj.techStack?.join(', ')}
              </p>
            </div>
          ))}
        </div>
      )}

      {data?.skills?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: sectionStyles.color || '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Core Competencies
          </h3>
          <div
            style={{
              fontSize: `${bodyStyles.size || 11}pt`,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}
          >
            {data.skills.slice(0, 6).map((skill, i) => (
              <span key={i}>✓ {skill}</span>
            ))}
          </div>
        </div>
      )}

      {(data?.education?.length > 0 || data?.languages?.length > 0) && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: sectionStyles.color || '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px',
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Education
          </h3>
          {data.education?.map(edu => (
            <div
              key={edu.id}
              style={{
                marginBottom: '6px',
                fontSize: `${bodyStyles.size || 11}pt`
              }}
            >
              <strong>{edu.degree}</strong> {edu.field && `in ${edu.field}`} •{' '}
              {edu.school} ({edu.startYear} - {edu.endYear})
            </div>
          ))}
          {data?.languages?.length > 0 && (
            <div
              style={{
                marginTop: '8px',
                fontSize: `${bodyStyles.size || 11}pt`
              }}
            >
              <strong>Languages:</strong>{' '}
              {data.languages
                .map(lang => `${lang.name} (${lang.proficiency})`)
                .join(', ')}
            </div>
          )}
        </div>
      )}

      {(data?.certificates?.length > 0 || data?.achievements?.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            {data?.certificates?.length > 0 && (
              <>
                  <h3
                    style={{
                      fontSize: `${sectionStyles.size || 12}pt`,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: sectionStyles.color || '#003366',
                      borderBottom: '2px solid #003366',
                      paddingBottom: '4px',
                      marginBottom: '8px',
                      letterSpacing: sectionStyles.spacing || 0
                    }}
                  >
                    Certifications
                  </h3>
                <ul
                  style={{
                    fontSize: `${bodyStyles.size || 11}pt`,
                    margin: '0',
                    paddingLeft: '20px'
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
                  <h3
                    style={{
                      fontSize: `${sectionStyles.size || 12}pt`,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: sectionStyles.color || '#003366',
                      borderBottom: '2px solid #003366',
                      paddingBottom: '4px',
                      marginBottom: '8px',
                      letterSpacing: sectionStyles.spacing || 0
                    }}
                  >
                    Awards & Recognition
                  </h3>
                <ul
                  style={{
                    fontSize: `${bodyStyles.size || 11}pt`,
                    margin: '0',
                    paddingLeft: '20px'
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
      )}
    </div>
  )
}

export default ExecutiveSummary

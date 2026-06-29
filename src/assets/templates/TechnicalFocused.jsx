import React from 'react'



const TechnicalFocused = ({ data }) => {
  const styles = data?.styles || {}
  const fontFamily = styles.fontFamily || 'Consolas, monospace'
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const jobTitleStyles = styles.jobTitle || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5

  return (
    <div
      style={{
        color: bodyStyles.color || '#333',
        maxWidth: '850px',
        fontSize: `${bodyStyles.size || 13}pt`,
        padding: '48px'
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
          marginBottom: '24px',
          borderBottom: '2px dashed #999',
          paddingBottom: '16px'
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 24}pt`,
            margin: '0',
            fontFamily: 'Arial, sans-serif',
            fontWeight: nameStyles.weight === 'font-bold' ? 'bold' : 'normal',
            letterSpacing: nameStyles.spacing || 0,
            color: nameStyles.color || '#333'
          }}
        >
          {data?.name}
        </h1>
        <p
          style={{
            margin: '4px 0 0 0',
            fontSize: `${jobTitleStyles.size || 14}pt`,
            color: jobTitleStyles.color || '#666',
            fontFamily: 'Arial, sans-serif',
            fontStyle: jobTitleStyles.style || 'normal'
          }}
        >
          {data?.jobTitle}
        </p>
        <div
          style={{
            marginTop: '8px',
            fontSize: `${contactStyles.size || 12}pt`,
            fontFamily: 'Arial, sans-serif',
            color: contactStyles.color || '#666'
          }}
        >
          {[data?.location, data?.email, data?.phone].filter(Boolean).join(' | ')}
        </div>
        {links?.length > 0 && (
          <div
            style={{
              marginTop: '4px',
              fontSize: `${contactStyles.size || 11}pt`,
              fontFamily: 'Arial, sans-serif',
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
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#f0f0f0',
              padding: '6px 8px',
              margin: '0 0 8px 0',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            &gt; Professional Summary
          </h2>
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

      {data?.skills?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#f0f0f0',
              padding: '6px 8px',
              margin: '0 0 8px 0',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            &gt; Technical Skills
          </h2>
          <div style={{ columns: 2, columnGap: '20px' }}>
            {data.skills.map((skill, i) => (
              <div
                key={i}
                style={{ marginBottom: '4px', breakInside: 'avoid' }}
              >
                → {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#f0f0f0',
              padding: '6px 8px',
              margin: '0 0 8px 0',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            &gt; Professional Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} data-section="experience" style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                {exp.position} @ {exp.company}
              </div>
              <div
                style={{
                  color: dateStyles.color || '#666',
                  fontSize: `${dateStyles.size || 12}pt`,
                  fontStyle: dateStyles.style || 'normal',
                  marginBottom: '4px'
                }}
              >
                {exp.startYear} - {exp.endYear} | {exp.location}
              </div>
              {exp.accomplishments?.map((acc, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 12}pt`,
                    marginBottom: '2px'
                  }}
                >
                  • {acc}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#f0f0f0',
              padding: '6px 8px',
              margin: '0 0 8px 0',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            &gt; Projects
          </h2>
          {data.projects.map(proj => (
            <div key={proj.id} data-section="projects" style={{ marginBottom: '8px' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: `${companyStyles.size || 12}pt`
                }}
              >
                {proj.name}
              </div>
              <div
                style={{
                  fontSize: `${bodyStyles.size || 12}pt`,
                  color: bodyStyles.color || '#666',
                  marginBottom: '2px'
                }}
              >
                {proj.description}
              </div>
              <div
                style={{
                  fontSize: `${dateStyles.size || 11}pt`,
                  color: dateStyles.color || '#555'
                }}
              >
                Tech Stack: {proj.techStack?.join(' • ')}
              </div>
              {proj.link && (
                <div
                  style={{
                    fontSize: `${dateStyles.size || 11}pt`,
                    color: dateStyles.color || '#555'
                  }}
                >
                  Link: {proj.link}
                </div>
              )}
              {proj.github && (
                <div
                  style={{
                    fontSize: `${dateStyles.size || 11}pt`,
                    color: dateStyles.color || '#555'
                  }}
                >
                  GitHub: {proj.github}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data?.education?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#f0f0f0',
              padding: '6px 8px',
              margin: '0 0 8px 0',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            &gt; Education
          </h2>
          {data.education.map(edu => (
            <div
              key={edu.id}
              data-section="education"
              style={{
                marginBottom: '6px',
                fontSize: `${bodyStyles.size || 12}pt`
              }}
            >
              <strong>{edu.degree}</strong> {edu.field && `in ${edu.field}`}
              <br />
              {edu.school} ({edu.startYear} - {edu.endYear})
              {edu.highlights?.length > 0 && (
                <span style={{ color: dateStyles.color || '#666' }}>
                  {' | '}
                  {edu.highlights.join(' | ')}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {data?.languages?.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              background: '#f0f0f0',
              padding: '6px 8px',
              margin: '0 0 8px 0',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#333'
            }}
          >
            &gt; Languages
          </h2>
          <div style={{ fontSize: `${bodyStyles.size || 12}pt` }}>
            {data.languages
              .map(lang => `${lang.name} (${lang.proficiency})`)
              .join(', ')}
          </div>
        </div>
      )}

      {(data?.certificates?.length > 0 || data?.achievements?.length > 0) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}
        >
          <div>
            {data?.certificates?.length > 0 && (
              <>
                    <h2
                      style={{
                        fontSize: `${sectionStyles.size || 12}pt`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        background: '#f0f0f0',
                        padding: '6px 8px',
                        margin: '0 0 8px 0',
                        letterSpacing: sectionStyles.spacing || 0,
                        color: sectionStyles.color || '#333'
                      }}
                    >
                      &gt; Certifications
                    </h2>
                <ul
                  style={{
                    fontSize: `${bodyStyles.size || 11}pt`,
                    margin: '0',
                    paddingLeft: '20px'
                  }}
                >
                  {data.certificates.map((cert, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {cert.name}
                    </li>
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
                        fontSize: `${sectionStyles.size || 12}pt`,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        background: '#f0f0f0',
                        padding: '6px 8px',
                        margin: '0 0 8px 0',
                        letterSpacing: sectionStyles.spacing || 0,
                        color: sectionStyles.color || '#333'
                      }}
                    >
                      &gt; Achievements
                    </h2>
                <ul
                  style={{
                    fontSize: `${bodyStyles.size || 11}pt`,
                    margin: '0',
                    paddingLeft: '20px'
                  }}
                >
                  {data.achievements.map((ach, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {ach}
                    </li>
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

export default TechnicalFocused

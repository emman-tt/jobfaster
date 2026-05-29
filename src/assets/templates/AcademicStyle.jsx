import React from 'react'

const AcademicStyle = ({ data }) => {
  const styles = data?.styles || {}
  const fontFamily = styles.fontFamily || 'Times New Roman, serif'
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5

  return (
    <div
      style={{
        color: bodyStyles.color || '#1a1a1a',
        maxWidth: '900px',
        lineHeight: bodyLeading,
        fontSize: `${bodyStyles.size || 12}pt`,
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
          textAlign: 'center',
          marginBottom: '20px',
          paddingBottom: '12px',
          borderBottom: '1px solid #000'
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 16}pt`,
            margin: '0 0 4px 0',
            fontWeight: nameStyles.weight === 'font-bold' ? 'bold' : 'normal',
            color: nameStyles.color || '#1a1a1a'
          }}
        >
          {data?.name}
        </h1>
        <p
          style={{
            fontSize: `${contactStyles.size || 11}pt`,
            margin: '0',
            color: contactStyles.color || '#666'
          }}
        >
          {[data?.email, data?.phone, data?.location].filter(Boolean).join(' • ')}
        </p>
        {links?.length > 0 && (
          <div
            style={{
              fontSize: `${contactStyles.size || 10}pt`,
              margin: '4px 0 0 0'
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

      <div style={{ marginBottom: '16px' }}>
        <h2
          style={{
            fontSize: `${sectionStyles.size || 12}pt`,
            fontWeight: 'bold',
            margin: '12px 0 6px 0',
            color: sectionStyles.color || '#1a1a1a'
          }}
        >
          PROFESSIONAL SUMMARY
        </h2>
        <p
          style={{ margin: '0', lineHeight: bodyLeading, textAlign: 'justify' }}
        >
          {data?.summary}
        </p>
      </div>

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              margin: '12px 0 6px 0',
              color: sectionStyles.color || '#1a1a1a'
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.map((exp, idx) => (
            <div
              key={exp.id}
              data-section="experience"
              style={{
                marginBottom: idx !== data.experience.length - 1 ? '12px' : '0'
              }}
            >
              <p
                style={{
                  margin: '0 0 2px 0',
                  color: companyStyles.color || '#1a1a1a'
                }}
              >
                <strong>{exp.position}</strong>, <em>{exp.company}</em>,{' '}
                {exp.location}
              </p>
              <p
                style={{
                  margin: '0 0 6px 0',
                  fontSize: `${dateStyles.size || 11}pt`,
                  color: dateStyles.color || '#666',
                  fontStyle: dateStyles.style || 'italic'
                }}
              >
                {exp.startYear} - {exp.endYear}
              </p>
              <ul style={{ margin: '0 0 6px 0', paddingLeft: '24px' }}>
                {exp.accomplishments?.map((acc, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: '2px',
                      fontSize: `${bodyStyles.size || 11}pt`
                    }}
                  >
                    {acc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              margin: '12px 0 6px 0',
              color: sectionStyles.color || '#1a1a1a'
            }}
          >
            PROJECTS
          </h2>
          {data.projects.map(proj => (
            <div key={proj.id} data-section="projects" style={{ marginBottom: '8px' }}>
              <p style={{ margin: '0' }}>
                <strong>{proj.name}</strong>
              </p>
              <p
                style={{
                  margin: '2px 0',
                  fontSize: `${bodyStyles.size || 11}pt`
                }}
              >
                {proj.description}
              </p>
              <p
                style={{
                  margin: '2px 0',
                  fontSize: `${dateStyles.size || 10}pt`,
                  color: dateStyles.color || '#666'
                }}
              >
                Tech Stack: {proj.techStack?.join(', ')}
              </p>
              {proj.link && (
                <p
                  style={{
                    margin: '2px 0',
                    fontSize: `${dateStyles.size || 10}pt`,
                    color: dateStyles.color || '#666'
                  }}
                >
                  Link: {proj.link}
                </p>
              )}
              {proj.github && (
                <p
                  style={{
                    margin: '2px 0',
                    fontSize: `${dateStyles.size || 10}pt`,
                    color: dateStyles.color || '#666'
                  }}
                >
                  GitHub: {proj.github}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {data?.education?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              margin: '12px 0 6px 0',
              color: sectionStyles.color || '#1a1a1a'
            }}
          >
            EDUCATION
          </h2>
          {data.education.map((edu, idx) => (
            <div
              key={edu.id}
              data-section="education"
              style={{
                marginBottom: idx !== data.education.length - 1 ? '8px' : '0',
                fontSize: `${bodyStyles.size || 11}pt`
              }}
            >
              <p style={{ margin: '0 0 2px 0' }}>
                <strong>{edu.degree}</strong> {edu.field && `in ${edu.field}`}
              </p>
              <p style={{ margin: '0' }}>
                {edu.school}, {edu.startYear} - {edu.endYear}
              </p>
              {edu.highlights?.length > 0 && (
                <p
                  style={{
                    margin: '2px 0 0 0',
                    color: dateStyles.color || '#666'
                  }}
                >
                  {edu.highlights.join('; ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {data?.skills?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              margin: '12px 0 6px 0',
              color: sectionStyles.color || '#1a1a1a'
            }}
          >
            TECHNICAL PROFICIENCIES
          </h2>
          <p
            style={{
              margin: '0',
              fontSize: `${bodyStyles.size || 11}pt`,
              lineHeight: bodyLeading
            }}
          >
            {data.skills.join(', ')}
          </p>
        </div>
      )}

      {data?.languages?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              margin: '12px 0 6px 0',
              color: sectionStyles.color || '#1a1a1a'
            }}
          >
            LANGUAGES
          </h2>
          <p style={{ margin: '0', fontSize: `${bodyStyles.size || 11}pt` }}>
            {data.languages
              .map(lang => `${lang.name} (${lang.proficiency})`)
              .join(', ')}
          </p>
        </div>
      )}

      {(data?.certificates?.length > 0 || data?.achievements?.length > 0) && (
        <div>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 'bold',
              margin: '12px 0 6px 0',
              color: sectionStyles.color || '#1a1a1a'
            }}
          >
            CERTIFICATIONS & AWARDS
          </h2>
          <ul
            style={{
              margin: '0',
              paddingLeft: '24px',
              fontSize: `${bodyStyles.size || 11}pt`
            }}
          >
            {data?.certificates?.map((cert, i) => (
              <li key={`cert-${i}`}>{cert.name || cert}</li>
            ))}
            {data?.achievements?.map((ach, i) => (
              <li key={`ach-${i}`}>{ach}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AcademicStyle

import React from 'react'

const CompactLayout = ({ data }) => {
  const styles = data?.styles || {}
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.3

  return (
    <div
      style={{
        color: bodyStyles.color || '#1a1a1a',
        maxWidth: '850px',
        fontSize: `${bodyStyles.size || 9}pt`,
        lineHeight: bodyLeading,
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #ccc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9pt', color: '#666' }}>
            <span style={{ fontWeight: 'bold' }}>{data?.name}</span>
            <span>Page {data?.pageNumber} of {data?.totalPages}</span>
          </div>
        </div>
      )}

      <div
        style={{
          textAlign: 'center',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '2px solid #333',
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 20}pt`,
            fontWeight: 'bold',
            margin: '0 0 2px 0',
            letterSpacing: nameStyles.spacing || 0,
            color: nameStyles.color || '#1a1a1a',
          }}
        >
          {data?.name}
        </h1>
        <p
          style={{
            fontSize: `${companyStyles.size || 10}pt`,
            margin: '0 0 4px 0',
            color: '#555',
            fontWeight: 500,
          }}
        >
          {data?.jobTitle}
        </p>
        <div
          style={{
            fontSize: `${contactStyles.size || 8}pt`,
            color: contactStyles.color || '#666',
          }}
        >
          {[data?.phone && <span>{data.phone}</span>}
          {data?.phone && data?.email && <span> | </span>}
          {data?.email && <span>{data.email}</span>}
          {data?.email && data?.location && <span> | </span>}
          {data?.location && <span>{data.location}</span>}
        </div>
        {links?.length > 0 && (
          <div style={{ fontSize: `${contactStyles.size || 8}pt`, color: '#555', marginTop: '2px' }}>
          {links.map((item, index) => (
            <span key={item.name}>
              {index > 0 && ' • '}
              {item.link}
            </span>
          ))}
        </div>
        )}
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 10}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: '0 0 4px 0',
              color: sectionStyles.color || '#1a1a1a',
            }}
          >
            Summary
          </h2>
          <p style={{ margin: '0', fontSize: `${bodyStyles.size || 9}pt` }}>
            {data.summary}
          </p>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 10}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: '0 0 6px 0',
              color: sectionStyles.color || '#1a1a1a',
              paddingBottom: '2px',
              borderBottom: '1px solid #ddd',
            }}
          >
            Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} data-section="experience" style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: `${companyStyles.size || 9.5}pt` }}>
                    {exp.position}
                  </span>
                  <span style={{ color: '#555', fontSize: `${bodyStyles.size || 9}pt`, marginLeft: '4px' }}>
                    — {exp.company}
                  </span>
                </div>
                <span style={{ fontSize: `${dateStyles.size || 8.5}pt`, color: '#777', fontStyle: 'italic' }}>
                  {exp.startYear} - {exp.endYear}
                </span>
              </div>
              {exp.accomplishments?.map((acc, i) => (
                <div key={i} style={{ marginLeft: '12px', marginTop: '2px', fontSize: `${bodyStyles.size || 8.5}pt` }}>
                  • {acc}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          {data?.projects?.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 4px 0',
                  color: sectionStyles.color || '#1a1a1a',
                  paddingBottom: '2px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Projects
              </h2>
              {data.projects.map(proj => (
                <div key={proj.id} data-section="projects" style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: `${companyStyles.size || 9}pt` }}>
                    {proj.name}
                  </div>
                  <div style={{ fontSize: `${bodyStyles.size || 8.5}pt`, color: '#555', marginTop: '1px' }}>
                    {proj.description}
                  </div>
                  {proj.techStack?.length > 0 && (
                    <div style={{ fontSize: `${dateStyles.size || 8}pt`, color: '#777' }}>
                      {proj.techStack.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {data?.education?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 4px 0',
                  color: sectionStyles.color || '#1a1a1a',
                  paddingBottom: '2px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Education
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} data-section="education" style={{ marginBottom: '4px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: `${companyStyles.size || 9}pt` }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div style={{ fontSize: `${bodyStyles.size || 8.5}pt`, color: '#555' }}>
                    {edu.school} • {edu.startYear} - {edu.endYear}
                  </div>
                  {edu.highlights?.length > 0 && (
                    <div style={{ fontSize: `${dateStyles.size || 8}pt`, color: '#777' }}>
                      {edu.highlights.join(' | ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data?.skills?.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 4px 0',
                  color: sectionStyles.color || '#1a1a1a',
                  paddingBottom: '2px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Skills
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 8.5}pt`, lineHeight: 1.5 }}>
                {data.skills.join(', ')}
              </div>
            </div>
          )}

          {data?.certificates?.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 4px 0',
                  color: sectionStyles.color || '#1a1a1a',
                  paddingBottom: '2px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Certifications
              </h2>
              {data.certificates.map((cert, i) => (
                <div key={i} style={{ fontSize: `${bodyStyles.size || 8.5}pt`, marginBottom: '2px' }}>
                  • {cert.name}
                </div>
              ))}
            </div>
          )}

          {data?.languages?.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 4px 0',
                  color: sectionStyles.color || '#1a1a1a',
                  paddingBottom: '2px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Languages
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 8.5}pt` }}>
                {data.languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', ')}
              </div>
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: '0 0 4px 0',
                  color: sectionStyles.color || '#1a1a1a',
                  paddingBottom: '2px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                Achievements
              </h2>
              {data.achievements.map((ach, i) => (
                <div key={i} style={{ fontSize: `${bodyStyles.size || 8.5}pt`, marginBottom: '2px' }}>
                  • {ach}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompactLayout

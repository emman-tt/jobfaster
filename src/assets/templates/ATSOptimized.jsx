import React from 'react'



const ATSOptimized = ({ data }) => {
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

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5

  return (
    <div
      style={{
        color: bodyStyles.color || '#000',
        maxWidth: '900px',
        fontSize: `${bodyStyles.size || 11}pt`,
        lineHeight: bodyLeading,
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
          marginBottom: '12px',
          paddingBottom: '12px',
          borderBottom: '1px solid #000'
        }}
      >
        <div
          style={{
            fontSize: `${nameStyles.size || 14}pt`,
            fontWeight: 'bold',
            marginBottom: '2px',
            letterSpacing: nameStyles.spacing || 0,
            color: nameStyles.color || '#000'
          }}
        >
          {data?.name}
        </div>
        <div
          style={{
            fontSize: `${jobTitleStyles.size || 10}pt`,
            fontStyle: jobTitleStyles.style || 'italic',
            color: jobTitleStyles.color || '#666'
          }}
        >
          {data?.jobTitle}
        </div>
        <div
          style={{
            fontSize: `${contactStyles.size || 10}pt`,
            marginBottom: '2px'
          }}
        >
          {[data?.phone, data?.email].filter(Boolean).join(' | ')}
        </div>
        <div style={{ fontSize: `${contactStyles.size || 10}pt` }}>
          {data?.location}
        </div>
        {links?.length > 0 && (
          <div
            style={{
              fontSize: `${contactStyles.size || 9}pt`,
              marginTop: '2px'
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
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Summary
          </div>
          <div
            style={{
              fontSize: `${bodyStyles.size || 10}pt`,
              lineHeight: bodyLeading
            }}
          >
            {data.summary}
          </div>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Experience
          </div>
          {data.experience.map(exp => (
            <div key={exp.id} data-section="experience" style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    fontWeight: 'bold',
                    fontSize: `${companyStyles.size || 10}pt`,
                    color: companyStyles.color || '#000'
                  }}
                >
                  {exp.position}
                </div>
              <div style={{ fontSize: `${companyStyles.size || 10}pt` }}>
                {[exp.company, exp.location].filter(Boolean).join(' | ')}
              </div>
              <div
                style={{
                  fontSize: `${dateStyles.size || 9}pt`,
                  marginBottom: '4px',
                  fontStyle: dateStyles.style || 'italic',
                  color: dateStyles.color || '#333'
                }}
              >
                {exp.startYear} to {exp.endYear}
              </div>
              {exp.accomplishments?.map((acc, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9}pt`,
                    marginBottom: '2px',
                    marginLeft: '12px'
                  }}
                >
                  • {acc.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Projects
          </div>
          {data.projects.map(proj => (
            <div key={proj.id} data-section="projects" style={{ marginBottom: '6px' }}>
              <div
                style={{
                  fontSize: `${companyStyles.size || 10}pt`,
                  fontWeight: 'bold'
                }}
              >
                {proj.name}
              </div>
              <div style={{ fontSize: `${bodyStyles.size || 9}pt` }}>
                {proj.description}
              </div>
              <div
                style={{
                  fontSize: `${dateStyles.size || 9}pt`,
                  color: dateStyles.color || '#333'
                }}
              >
                Technologies: {proj.techStack?.map(t => t.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.education?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Education
          </div>
          {data.education.map(edu => (
            <div key={edu.id} data-section="education" style={{ marginBottom: '4px' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: `${companyStyles.size || 10}pt`
                }}
              >
                {edu.degree} {edu.field && `in ${edu.field}`}
              </div>
              <div style={{ fontSize: `${bodyStyles.size || 10}pt` }}>
                {[edu.school, `${edu.startYear} - ${edu.endYear}`].filter(Boolean).join(' | ')}
              </div>
              {edu.highlights?.length > 0 && (
                <div
                  style={{
                    fontSize: `${bodyStyles.size || 9}pt`,
                    color: dateStyles.color || '#333'
                  }}
                >
                  {edu.highlights.join(' | ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data?.skills?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Skills
          </div>
          <div style={{ fontSize: `${bodyStyles.size || 10}pt` }}>
            {data.skills.map(s => s.name).join(', ')}
          </div>
        </div>
      )}

      {data?.certificates?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Certifications
          </div>
          <div style={{ fontSize: `${bodyStyles.size || 10}pt` }}>
            {data.certificates.map(c => c.name).join(', ')}
          </div>
        </div>
      )}

      {data?.languages?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Languages
          </div>
          <div style={{ fontSize: `${bodyStyles.size || 10}pt` }}>
            {data.languages
              .map(lang => `${lang.name} (${lang.proficiency})`)
              .join(', ')}
          </div>
        </div>
      )}

      {data?.achievements?.length > 0 && (
        <div>
          <div
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 'bold',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: sectionStyles.spacing || 0,
              color: sectionStyles.color || '#000'
            }}
          >
            Achievements
          </div>
          <div style={{ fontSize: `${bodyStyles.size || 10}pt` }}>
            {data.achievements.join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}

export default ATSOptimized

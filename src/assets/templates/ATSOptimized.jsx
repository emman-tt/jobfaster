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

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5

  return (
    <div
      style={{
        color: '#000',
        maxWidth: '900px',
        fontSize: `${bodyStyles.size || 11}pt`,
        lineHeight: bodyLeading
      }}
      className={`${fontFamily}`}

    >
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
            letterSpacing: nameStyles.spacing || 0
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
          {data?.phone} | {data?.email}
        </div>
        <div style={{ fontSize: `${contactStyles.size || 10}pt` }}>
          {data?.location}
        </div>
        {data?.linkedin?.length > 0 && (
          <div
            style={{
              fontSize: `${contactStyles.size || 9}pt`,
              marginTop: '2px'
            }}
          >
            LinkedIn: {data?.linkedin}
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
              letterSpacing: sectionStyles.spacing || 0
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
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Experience
          </div>
          {data.experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '8px' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: `${companyStyles.size || 10}pt`
                }}
              >
                {exp.position}
              </div>
              <div style={{ fontSize: `${companyStyles.size || 10}pt` }}>
                {exp.company} | {exp.location}
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
                  • {acc}
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
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Projects
          </div>
          {data.projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '6px' }}>
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
                Technologies: {proj.techStack?.join(', ')}
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
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Education
          </div>
          {data.education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '4px' }}>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: `${companyStyles.size || 10}pt`
                }}
              >
                {edu.degree} {edu.field && `in ${edu.field}`}
              </div>
              <div style={{ fontSize: `${bodyStyles.size || 10}pt` }}>
                {edu.school} | {edu.startYear} - {edu.endYear}
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
              letterSpacing: sectionStyles.spacing || 0
            }}
          >
            Skills
          </div>
          <div style={{ fontSize: `${bodyStyles.size || 10}pt` }}>
            {data.skills.join(', ')}
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
              letterSpacing: sectionStyles.spacing || 0
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
              letterSpacing: sectionStyles.spacing || 0
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
              letterSpacing: sectionStyles.spacing || 0
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

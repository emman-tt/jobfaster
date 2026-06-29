import React from 'react'

const SalesMarketing = ({ data }) => {
  const styles = data?.styles || {}
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5
  const primaryGreen = '#059669'
  const lightGreen = '#D1FAE5'
  const darkGray = '#111827'

  return (
    <div className='p-5'
      style={{
        color: bodyStyles.color || darkGray,
        maxWidth: '850px',
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${primaryGreen}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt', color: '#6B7280' }}>
            <span style={{ fontWeight: 'bold', color: primaryGreen }}>{data?.name}</span>
            <span>Page {data?.pageNumber} of {data?.totalPages}</span>
          </div>
        </div>
      )}

      <div
        style={{
          background: `linear-gradient(135deg, ${primaryGreen} 0%, #047857 100%)`,
          padding: '24px 28px',
          marginBottom: '24px',
          borderRadius: '0 0 12px 12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h1
              style={{
                fontSize: `${nameStyles.size || 30}pt`,
                fontWeight: 700,
                margin: '0 0 4px 0',
                letterSpacing: nameStyles.spacing || -0.5,
                color: '#ffffff',
              }}
            >
              {data?.name}
            </h1>
            <p
              style={{
                fontSize: `${companyStyles.size || 13}pt`,
                margin: '0',
                color: lightGreen,
                fontWeight: 500,
              }}
            >
              {data?.jobTitle}
            </p>
          </div>
          <div
            style={{
              background: '#ffffff',
              color: primaryGreen,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '9pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Results Driven
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 20px',
            marginTop: '16px',
            fontSize: `${contactStyles.size || 9.5}pt`,
            color: '#D1FAE5',
          }}
        >
          {data?.phone && <span>📞 {data.phone}</span>}
          {data?.email && <span>✉️ {data.email}</span>}
          {data?.location && <span>📍 {data.location}</span>}
          {links?.map((item, index) => (
            <span key={item.name} style={{ color: '#ffffff', fontWeight: 500 }}>🔗 {item.link}</span>
          ))}
        </div>
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div
          style={{
            marginBottom: '24px',
            padding: '16px 20px',
            background: lightGreen,
            borderLeft: `4px solid ${primaryGreen}`,
            borderRadius: '0 6px 6px 0',
          }}
        >
          <h2
            style={{
              fontSize: `${sectionStyles.size || 10.5}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0 0 6px 0',
              color: primaryGreen,
            }}
          >
            Executive Summary
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 10.5}pt`,
              margin: '0',
              lineHeight: bodyLeading,
              color: '#065F46',
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
              fontSize: `${sectionStyles.size || 11.5}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0 0 12px 0',
              color: primaryGreen,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                width: '28px',
                height: '28px',
                background: primaryGreen,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginRight: '10px',
                fontSize: '12pt',
              }}
            >
              
            </span>
            Revenue & Growth Experience
          </h2>
          {data.experience.map(exp => (
            <div
              key={exp.id}
              data-section="experience"
              style={{
                marginBottom: '20px',
                padding: '16px',
                background: '#FAFAFA',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: `${companyStyles.size || 12}pt`,
                      fontWeight: 700,
                      margin: '0',
                      color: darkGray,
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 10.5}pt`,
                      margin: '2px 0 0 0',
                      color: primaryGreen,
                      fontWeight: 600,
                    }}
                  >
                    {exp.company}{exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9.5}pt`,
                    color: dateStyles.color || '#6B7280',
                    fontWeight: 600,
                    background: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    border: '1px solid #D1D5DB',
                  }}
                >
                  {exp.startYear} — {exp.endYear}
                </span>
              </div>
              {exp.accomplishments?.map((acc, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 10}pt`,
                    marginBottom: '4px',
                    marginLeft: '8px',
                    lineHeight: bodyLeading,
                    color: '#374151',
                  }}
                >
                  <span style={{ color: primaryGreen, fontWeight: 'bold' }}>▸</span> {acc}
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
              fontSize: `${sectionStyles.size || 11.5}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              margin: '0 0 12px 0',
              color: primaryGreen,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                width: '28px',
                height: '28px',
                background: primaryGreen,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                marginRight: '10px',
                fontSize: '12pt',
              }}
                >
                  </span>
                Key Campaigns & Projects
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {data.projects.map(proj => (
              <div
                key={proj.id}
                data-section="projects"
                style={{
                  padding: '16px',
                  border: `2px solid ${lightGreen}`,
                  borderRadius: '8px',
                  background: '#FFFFFF',
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 11}pt`,
                    fontWeight: 700,
                    margin: '0 0 6px 0',
                    color: darkGray,
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    margin: '0 0 8px 0',
                    lineHeight: bodyLeading,
                    color: '#4B5563',
                  }}
                >
                  {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '8pt',
                          background: lightGreen,
                          color: primaryGreen,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          {data?.skills?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 10px 0',
                  color: primaryGreen,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ width: '4px', height: '18px', background: primaryGreen, marginRight: '8px' }} />
                Sales & Marketing Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: lightGreen,
                      color: primaryGreen,
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: `${bodyStyles.size || 9}pt`,
                      fontWeight: 600,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data?.education?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 10px 0',
                  color: primaryGreen,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ width: '4px', height: '18px', background: primaryGreen, marginRight: '8px' }} />
                Education
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} data-section="education" style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${companyStyles.size || 10.5}pt`, margin: '0' }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, color: '#4B5563', margin: '2px 0' }}>
                    {edu.school}
                  </div>
                  <div style={{ fontSize: `${dateStyles.size || 9}pt`, color: '#6B7280', margin: '0' }}>
                    {edu.startYear} — {edu.endYear}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data?.achievements?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 8px 0',
                  color: primaryGreen,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ width: '4px', height: '18px', background: primaryGreen, marginRight: '8px' }} />
                Top Achievements
              </h2>
              {data.achievements.map((ach, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: '6px',
                    padding: '8px 12px',
                    background: lightGreen,
                    borderRadius: '6px',
                    color: '#065F46',
                  }}
                >
                  <span style={{ fontWeight: 700 }}></span> {ach}
                </div>
              ))}
            </div>
          )}

          {data?.certificates?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 8px 0',
                  color: primaryGreen,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ width: '4px', height: '18px', background: primaryGreen, marginRight: '8px' }} />
                Certifications
              </h2>
              {data.certificates.map((cert, i) => (
                <div key={i} style={{ fontSize: `${bodyStyles.size || 9.5}pt`, marginBottom: '3px' }}>
                  <span style={{ color: primaryGreen, fontWeight: 'bold' }}>✓</span> {cert.name}
                </div>
              ))}
            </div>
          )}

          {data?.languages?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 8px 0',
                  color: primaryGreen,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ width: '4px', height: '18px', background: primaryGreen, marginRight: '8px' }} />
                Languages
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt` }}>
                {data.languages.map((lang, i) => (
                  <span key={i}>
                    {i > 0 && ' • '}
                    <span style={{ fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ color: '#6B7280' }}> ({lang.proficiency})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesMarketing

import React from 'react'

const MilitaryTransition = ({ data }) => {
  const styles = data?.styles || {}
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5
  const primaryBlue = '#1E3A5F'
  const accentRed = '#8B0000'
  const gold = '#B8860B'

  return (
    <div
      style={{
        color: bodyStyles.color || '#1F2937',
        maxWidth: '850px',
        padding: '48px'
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${primaryBlue}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt', color: '#666' }}>
            <span style={{ fontWeight: 'bold', color: primaryBlue }}>{data?.name}</span>
            <span>Page {data?.pageNumber} of {data?.totalPages}</span>
          </div>
        </div>
      )}

      <div style={{ borderTop: `4px solid ${primaryBlue}`, marginBottom: '20px' }} />

      <div
        style={{
          textAlign: 'center',
          marginBottom: '24px',
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 28}pt`,
            fontWeight: 700,
            margin: '0 0 4px 0',
            letterSpacing: nameStyles.spacing || 2,
            textTransform: 'uppercase',
            color: nameStyles.color || primaryBlue,
          }}
        >
          {data?.name}
        </h1>
        <p
          style={{
            fontSize: `${companyStyles.size || 12}pt`,
            margin: '0 0 8px 0',
            fontWeight: 600,
            color: accentRed,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {data?.jobTitle}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: `${contactStyles.size || 9.5}pt`,
            color: contactStyles.color || '#4B5563',
          }}
        >
          {data?.phone && <span>{data.phone}</span>}
          {data?.email && <span>{data.email}</span>}
          {data?.location && <span>{data.location}</span>}
          {links?.map((item, index) => (
            <span key={item.name}>{item.link}</span>
          ))}
        </div>
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: '0 0 8px 0',
              color: sectionStyles.color || primaryBlue,
              borderBottom: `2px solid ${gold}`,
              paddingBottom: '4px',
            }}
          >
            Leadership Summary
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 10.5}pt`,
              margin: '0',
              lineHeight: bodyLeading,
              textAlign: 'justify',
              color: bodyStyles.color || '#374151',
            }}
          >
            {data.summary}
          </p>
        </div>
      )}

      {data?.achievements?.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: '0 0 12px 0',
              color: sectionStyles.color || primaryBlue,
              borderBottom: `2px solid ${gold}`,
              paddingBottom: '4px',
            }}
          >
            Key Achievements
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
            {data.achievements.map((ach, i) => (
              <div
                key={i}
                style={{
                  fontSize: `${bodyStyles.size || 10}pt`,
                  padding: '4px 0',
                  paddingLeft: '12px',
                  borderLeft: `3px solid ${accentRed}`,
                }}
              >
                <span style={{ fontWeight: 600, color: primaryBlue }}>▸</span> {ach}
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: '0 0 12px 0',
              color: sectionStyles.color || primaryBlue,
              borderBottom: `2px solid ${gold}`,
              paddingBottom: '4px',
            }}
          >
            Professional Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} data-section="experience" style={{ marginBottom: '18px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '6px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: `${companyStyles.size || 11.5}pt`,
                      fontWeight: 700,
                      margin: '0',
                      color: companyStyles.color || primaryBlue,
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 10}pt`,
                      margin: '2px 0 0 0',
                      fontWeight: 600,
                      color: accentRed,
                    }}
                  >
                    {exp.company}{exp.location && ` | ${exp.location}`}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9.5}pt`,
                    color: dateStyles.color || '#6B7280',
                    fontWeight: 600,
                    background: '#F3F4F6',
                    padding: '4px 12px',
                    borderRadius: '3px',
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
                    marginBottom: '3px',
                    marginLeft: '16px',
                    lineHeight: bodyLeading,
                    color: bodyStyles.color || '#374151',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: gold }}>◆</span> {acc.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          {data?.education?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  color: sectionStyles.color || primaryBlue,
                  borderBottom: `2px solid ${gold}`,
                  paddingBottom: '4px',
                }}
              >
                Education & Training
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} data-section="education" style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${companyStyles.size || 10.5}pt`, margin: '0', color: primaryBlue }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, color: '#4B5563', margin: '2px 0' }}>
                    {edu.school}
                  </div>
                  <div style={{ fontSize: `${dateStyles.size || 9}pt`, color: '#6B7280', margin: '0' }}>
                    {edu.startYear} — {edu.endYear}
                  </div>
                  {edu.highlights?.length > 0 && (
                    <div style={{ fontSize: `${bodyStyles.size || 9}pt`, color: accentRed, marginTop: '2px', fontWeight: 500 }}>
                      {edu.highlights.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {data?.certificates?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 8px 0',
                  color: sectionStyles.color || primaryBlue,
                  borderBottom: `2px solid ${gold}`,
                  paddingBottom: '4px',
                }}
              >
                Certifications
              </h2>
              {data.certificates.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: '4px',
                    paddingLeft: '10px',
                    borderLeft: `2px solid ${accentRed}`,
                  }}
                >
                  <span style={{ fontWeight: 600, color: primaryBlue }}>✓</span> {cert.name}
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
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 8px 0',
                  color: sectionStyles.color || primaryBlue,
                  borderBottom: `2px solid ${gold}`,
                  paddingBottom: '4px',
                }}
              >
                Core Competencies
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, lineHeight: 1.8 }}>
                {data.skills.map((skill, i) => (
                  <span key={i}>
                    {i > 0 && ' • '}
                    <span style={{ fontWeight: 500, color: primaryBlue }}>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {data?.languages?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 8px 0',
                  color: sectionStyles.color || primaryBlue,
                  borderBottom: `2px solid ${gold}`,
                  paddingBottom: '4px',
                }}
              >
                Languages
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, lineHeight: 1.7 }}>
                {data.languages.map((lang, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500, color: primaryBlue }}>{lang.name}</span>
                    <span style={{ color: accentRed }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop: `4px solid ${primaryBlue}`, marginTop: '24px' }} />
    </div>
  )
}

export default MilitaryTransition

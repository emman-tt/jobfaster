import React from 'react'

const HealthcareProfessional = ({ data }) => {
  const styles = data?.styles || {}
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5
  const primaryBlue = '#1E40AF'
  const lightBlue = '#DBEAFE'
  const darkBlue = '#1E3A8A'
  const professionalGray = '#374151'

  return (
    <div
    className='p-5'
      style={{
        color: bodyStyles.color || professionalGray,
        maxWidth: '850px',
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: `2px solid ${primaryBlue}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt', color: '#6B7280' }}>
            <span style={{ fontWeight: 'bold', color: primaryBlue }}>{data?.name}</span>
            <span>Page {data?.pageNumber} of {data?.totalPages}</span>
          </div>
        </div>
      )}

      <div
        style={{
          background: `linear-gradient(90deg, ${darkBlue} 0%, ${primaryBlue} 100%)`,
          padding: '28px 32px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: lightBlue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28pt',
              flexShrink: 0,
            }}
          >
            
          </div>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: `${nameStyles.size || 28}pt`,
                fontWeight: 700,
                margin: '0 0 4px 0',
                letterSpacing: nameStyles.spacing || 0,
                color: '#ffffff',
              }}
            >
              {data?.name}
            </h1>
            <p
              style={{
                fontSize: `${companyStyles.size || 13}pt`,
                margin: '0',
                color: lightBlue,
                fontWeight: 500,
              }}
            >
              {data?.jobTitle}
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 24px',
            marginTop: '18px',
            fontSize: `${contactStyles.size || 9.5}pt`,
            color: lightBlue,
          }}
        >
          {data?.phone && <span>{data.phone}</span>}
          {data?.email && <span>{data.email}</span>}
          {data?.location && <span>{data.location}</span>}
          {links?.map((item, index) => (
            <span key={item.name} style={{ color: '#ffffff', fontWeight: 500 }}>{item.link}</span>
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
              letterSpacing: '1.5px',
              margin: '0 0 8px 0',
              color: primaryBlue,
              paddingBottom: '4px',
              borderBottom: `2px solid ${lightBlue}`,
            }}
          >
            Professional Profile
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 10.5}pt`,
              margin: '0',
              lineHeight: bodyLeading,
              textAlign: 'justify',
              color: professionalGray,
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
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: '0 0 12px 0',
              color: primaryBlue,
              paddingBottom: '4px',
              borderBottom: `2px solid ${lightBlue}`,
            }}
          >
            Clinical Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} data-section="experience" style={{ marginBottom: '20px' }}>
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
                      fontSize: `${companyStyles.size || 12}pt`,
                      fontWeight: 700,
                      margin: '0',
                      color: darkBlue,
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 10.5}pt`,
                      margin: '2px 0 0 0',
                      color: primaryBlue,
                      fontWeight: 600,
                    }}
                  >
                    {exp.company}{exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9.5}pt`,
                    color: professionalGray,
                    fontWeight: 600,
                    background: lightBlue,
                    padding: '4px 14px',
                    borderRadius: '4px',
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
                    marginLeft: '18px',
                    lineHeight: bodyLeading,
                    color: professionalGray,
                  }}
                >
                  <span style={{ color: primaryBlue, fontWeight: 'bold' }}>•</span> {acc}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        <div>
          {data?.certificates?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: '0 0 10px 0',
                  color: primaryBlue,
                  paddingBottom: '4px',
                  borderBottom: `2px solid ${lightBlue}`,
                }}
              >
                Licenses & Certifications
              </h2>
              {data.certificates.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: '6px',
                    padding: '10px 14px',
                    background: lightBlue,
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontWeight: 700, color: darkBlue }}>✓ {cert.name}</span>
                  {cert.issuer && (
                    <span style={{ color: professionalGray, marginLeft: '6px' }}>— {cert.issuer}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {data?.education?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: '0 0 10px 0',
                  color: primaryBlue,
                  paddingBottom: '4px',
                  borderBottom: `2px solid ${lightBlue}`,
                }}
              >
                Medical Education
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} data-section="education" style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${companyStyles.size || 10.5}pt`, margin: '0', color: darkBlue }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, color: professionalGray, margin: '2px 0' }}>
                    {edu.school}
                  </div>
                  <div style={{ fontSize: `${dateStyles.size || 9}pt`, color: '#6B7280', margin: '0' }}>
                    {edu.startYear} — {edu.endYear}
                  </div>
                  {edu.highlights?.length > 0 && (
                    <div style={{ fontSize: `${bodyStyles.size || 9}pt`, color: primaryBlue, marginTop: '4px', fontWeight: 500 }}>
                      {edu.highlights.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data?.skills?.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: '0 0 10px 0',
                  color: primaryBlue,
                  paddingBottom: '4px',
                  borderBottom: `2px solid ${lightBlue}`,
                }}
              >
                Clinical Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: lightBlue,
                      color: darkBlue,
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: `${bodyStyles.size || 9}pt`,
                      fontWeight: 600,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div style={{ marginBottom: data?.languages?.length > 0 ? '24px' : 0 }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: '0 0 8px 0',
                  color: primaryBlue,
                  paddingBottom: '4px',
                  borderBottom: `2px solid ${lightBlue}`,
                }}
              >
                Honors & Awards
              </h2>
              {data.achievements.map((ach, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: '4px',
                    paddingLeft: '12px',
                    borderLeft: `3px solid ${primaryBlue}`,
                  }}
                >
                  <span style={{ fontWeight: 600 }}></span> {ach}
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
                  letterSpacing: '1.5px',
                  margin: '0 0 8px 0',
                  color: primaryBlue,
                  paddingBottom: '4px',
                  borderBottom: `2px solid ${lightBlue}`,
                }}
              >
                Languages
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, lineHeight: 1.8 }}>
                {data.languages.map((lang, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ color: primaryBlue }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HealthcareProfessional

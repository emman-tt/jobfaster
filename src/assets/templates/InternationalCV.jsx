import React from 'react'

const InternationalCV = ({ data }) => {
  const styles = data?.styles || {}
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5
  const primaryTeal = '#0D9488'
  const lightTeal = '#CCFBF1'
  const darkGray = '#1E293B'
  const mediumGray = '#64748B'

  return (
    <div
      style={{
        color: bodyStyles.color || darkGray,
        maxWidth: '850px',
        display: 'flex',
        gap: '0',
      }}
    >
      <div
        style={{
          width: '180px',
          flexShrink: 0,
          background: `linear-gradient(180deg, ${primaryTeal} 0%, #0F766E 100%)`,
          padding: '24px 20px',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: lightTeal,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40pt',
            margin: '0 auto 16px auto',
            border: '3px solid rgba(255,255,255,0.3)',
          }}
        >
          👤
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1
            style={{
              fontSize: `${nameStyles.size || 14}pt`,
              fontWeight: 700,
              margin: '0 0 4px 0',
              letterSpacing: nameStyles.spacing || 0,
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            {data?.name}
          </h1>
          <p
            style={{
              fontSize: `${companyStyles.size || 9.5}pt`,
              margin: '0',
              color: lightTeal,
              fontWeight: 400,
            }}
          >
            {data?.jobTitle}
          </p>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '16px',
            marginBottom: '20px',
          }}
        >
          <h2
            style={{
              fontSize: `${sectionStyles.size || 9}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              margin: '0 0 10px 0',
              color: lightTeal,
            }}
          >
            Contact
          </h2>
          <div style={{ fontSize: `${contactStyles.size || 8.5}pt`, lineHeight: 1.8 }}>
            {data?.phone && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: lightTeal }}>📞</span> {data.phone}
              </div>
            )}
            {data?.email && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: lightTeal }}>✉️</span> {data.email}
              </div>
            )}
            {data?.location && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ color: lightTeal }}>📍</span> {data.location}
              </div>
            )}
          </div>
          {links?.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              {links.map((item, index) => (
                <div key={item.name} style={{ marginBottom: '3px', fontSize: `${contactStyles.size || 8.5}pt` }}>
                  <span style={{ color: lightTeal }}>🔗</span> {item.link}
                </div>
              ))}
            </div>
          )}
        </div>

        {data?.skills?.length > 0 && (
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '16px',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{
                fontSize: `${sectionStyles.size || 9}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                margin: '0 0 10px 0',
                color: lightTeal,
              }}
            >
              Skills
            </h2>
            <div style={{ fontSize: `${bodyStyles.size || 8.5}pt`, lineHeight: 1.7 }}>
              {data.skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: '2px' }}>
                  • {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.languages?.length > 0 && (
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '16px',
              marginBottom: '20px',
            }}
          >
            <h2
              style={{
                fontSize: `${sectionStyles.size || 9}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                margin: '0 0 10px 0',
                color: lightTeal,
              }}
            >
              Languages
            </h2>
            <div style={{ fontSize: `${bodyStyles.size || 8.5}pt`, lineHeight: 1.7 }}>
              {data.languages.map((lang, i) => (
                <div key={i} style={{ marginBottom: '2px' }}>
                  <span style={{ fontWeight: 600 }}>{lang.name}</span>
                  <span style={{ color: lightTeal, marginLeft: '6px' }}>— {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.certificates?.length > 0 && (
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '16px',
            }}
          >
            <h2
              style={{
                fontSize: `${sectionStyles.size || 9}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                margin: '0 0 10px 0',
                color: lightTeal,
              }}
            >
              Certs
            </h2>
            <div style={{ fontSize: `${bodyStyles.size || 8.5}pt`, lineHeight: 1.6 }}>
              {data.certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: '3px' }}>
                  ✓ {cert.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: '28px 32px' }}>
        {data?.pageNumber > 1 && (
          <div style={{ marginBottom: '16px', paddingBottom: '8px', borderBottom: `2px solid ${primaryTeal}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt', color: mediumGray }}>
              <span style={{ fontWeight: 'bold', color: primaryTeal }}>{data?.name}</span>
              <span>Page {data?.pageNumber} of {data?.totalPages}</span>
            </div>
          </div>
        )}

        {data?.summary && data.summary.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '0 0 10px 0',
                color: primaryTeal,
                paddingBottom: '6px',
                borderBottom: `2px solid ${primaryTeal}`,
              }}
            >
              Profile
            </h2>
            <p
              style={{
                fontSize: `${bodyStyles.size || 10}pt`,
                margin: '0',
                lineHeight: bodyLeading,
                textAlign: 'justify',
                color: darkGray,
              }}
            >
              {data.summary}
            </p>
          </div>
        )}

        {data?.experience?.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '0 0 14px 0',
                color: primaryTeal,
                paddingBottom: '6px',
                borderBottom: `2px solid ${primaryTeal}`,
              }}
            >
              Professional Experience
            </h2>
            {data.experience.map((exp, expIndex) => (
              <div
                key={exp.id}
                data-section="experience"
                style={{
                  marginBottom: '20px',
                  paddingLeft: '0',
                }}
              >
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
                        color: darkGray,
                      }}
                    >
                      {exp.position}
                    </h3>
                    <p
                      style={{
                        fontSize: `${bodyStyles.size || 10}pt`,
                        margin: '2px 0 0 0',
                        color: primaryTeal,
                        fontWeight: 600,
                      }}
                    >
                      {exp.company}{exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: `${dateStyles.size || 9.5}pt`,
                      color: mediumGray,
                      fontWeight: 600,
                      background: lightTeal,
                      padding: '4px 12px',
                      borderRadius: '4px',
                      flexShrink: 0,
                      marginLeft: '12px',
                    }}
                  >
                    {exp.startYear} — {exp.endYear}
                  </span>
                </div>
                {exp.accomplishments?.map((acc, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      marginBottom: '3px',
                      marginLeft: '14px',
                      lineHeight: bodyLeading,
                      color: '#475569',
                    }}
                  >
                    <span style={{ color: primaryTeal, fontWeight: 'bold' }}>•</span> {acc}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {data?.projects?.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '0 0 12px 0',
                color: primaryTeal,
                paddingBottom: '6px',
                borderBottom: `2px solid ${primaryTeal}`,
              }}
            >
              Key Projects
            </h2>
            {data.projects.map(proj => (
              <div
                key={proj.id}
                data-section="projects"
                style={{
                  marginBottom: '14px',
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 10.5}pt`,
                    fontWeight: 700,
                    margin: '0 0 4px 0',
                    color: darkGray,
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    margin: '0 0 4px 0',
                    lineHeight: bodyLeading,
                    color: '#475569',
                  }}
                >
                  {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <p
                    style={{
                      fontSize: `${dateStyles.size || 8.5}pt`,
                      margin: '0',
                      color: primaryTeal,
                      fontWeight: 500,
                    }}
                  >
                    Technologies: {proj.techStack.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {data?.education?.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                margin: '0 0 12px 0',
                color: primaryTeal,
                paddingBottom: '6px',
                borderBottom: `2px solid ${primaryTeal}`,
              }}
            >
              Education
            </h2>
            {data.education.map(edu => (
              <div
                key={edu.id}
                data-section="education"
                style={{
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '2px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: `${companyStyles.size || 11}pt`,
                        fontWeight: 700,
                        margin: '0',
                        color: darkGray,
                      }}
                    >
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p
                      style={{
                        fontSize: `${bodyStyles.size || 9.5}pt`,
                        margin: '2px 0 0 0',
                        color: primaryTeal,
                        fontWeight: 600,
                      }}
                    >
                      {edu.school}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: `${dateStyles.size || 9}pt`,
                      color: mediumGray,
                      fontWeight: 600,
                      flexShrink: 0,
                      marginLeft: '12px',
                    }}
                  >
                    {edu.startYear} — {edu.endYear}
                  </span>
                </div>
                {edu.highlights?.length > 0 && (
                  <div style={{ fontSize: `${bodyStyles.size || 9}pt`, color: '#475569', marginTop: '4px', marginLeft: '14px' }}>
                    {edu.highlights.join(' • ')}
                  </div>
                )}
              </div>
            ))}

            {data?.achievements?.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <h2
                  style={{
                    fontSize: `${sectionStyles.size || 10.5}pt`,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    margin: '0 0 10px 0',
                    color: primaryTeal,
                    paddingBottom: '6px',
                    borderBottom: `2px solid ${primaryTeal}`,
                  }}
                >
                  Achievements
                </h2>
                {data.achievements.map((ach, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      marginBottom: '3px',
                    }}
                  >
                    🏆 {ach}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default InternationalCV

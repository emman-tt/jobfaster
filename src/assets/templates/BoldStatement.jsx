import React from 'react'

const BoldStatement = ({ data }) => {
  const styles = data?.styles || {}
  const nameStyles = styles.name || {}
  const sectionStyles = styles.sectionHeader || {}
  const companyStyles = styles.company || {}
  const bodyStyles = styles.bodyText || {}
  const dateStyles = styles.date || {}
  const contactStyles = styles.contact || {}
  const links = data?.onlineLinks

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5
  const accentRed = '#DC2626'
  const darkBg = '#0F0F0F'
  const lightBg = '#FAFAFA'
  const whiteText = '#FFFFFF'
  const lightGray = '#A1A1AA'
  const darkGray = '#27272A'

  return (
    <div
      style={{
        color: bodyStyles.color || darkGray,
        maxWidth: '850px',
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: '16px', background: darkBg, padding: '12px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10pt', color: lightGray }}>
            <span style={{ fontWeight: 'bold', color: whiteText }}>{data?.name}</span>
            <span>Page {data?.pageNumber} of {data?.totalPages}</span>
          </div>
        </div>
      )}

      <div
        style={{
          background: darkBg,
          padding: '40px 32px',
          marginBottom: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: accentRed,
            opacity: 0.1,
            borderRadius: '50%',
            transform: 'translate(60px, -60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '150px',
            height: '150px',
            background: accentRed,
            opacity: 0.05,
            borderRadius: '50%',
            transform: 'translate(-40px, 40px)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-block',
              background: accentRed,
              color: whiteText,
              padding: '6px 16px',
              fontSize: '8.5pt',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '16px',
            }}
          >
            Curriculum Vitae
          </div>

          <h1
            style={{
              fontSize: `${nameStyles.size || 42}pt`,
              fontWeight: 800,
              margin: '0 0 8px 0',
              letterSpacing: nameStyles.spacing || -1,
              color: whiteText,
              lineHeight: 1,
            }}
          >
            {data?.name}
          </h1>
          <p
            style={{
              fontSize: `${companyStyles.size || 14}pt`,
              margin: '0 0 20px 0',
              color: accentRed,
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            {data?.jobTitle}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px',
              fontSize: `${contactStyles.size || 9.5}pt`,
              color: lightGray,
            }}
          >
            {data?.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: accentRed }}>●</span> {data.phone}
              </span>
            )}
            {data?.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: accentRed }}>●</span> {data.email}
              </span>
            )}
            {data?.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: accentRed }}>●</span> {data.location}
              </span>
            )}
            {links?.map((item, index) => (
              <span key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: accentRed, fontWeight: 500 }}>
                <span>●</span> {item.link}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 32px', background: lightBg }}>
        {data?.summary && data.summary.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: accentRed,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  color: whiteText,
                  fontWeight: 800,
                  fontSize: '12pt',
                }}
              >
                01
              </div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 13}pt`,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0',
                  color: darkGray,
                }}
              >
                About Me
              </h2>
            </div>
            <p
              style={{
                fontSize: `${bodyStyles.size || 10.5}pt`,
                margin: '0 0 0 44px',
                lineHeight: bodyLeading,
                color: '#52525B',
                fontStyle: 'italic',
              }}
            >
              {data.summary}
            </p>
          </div>
        )}

        {data?.experience?.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: accentRed,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  color: whiteText,
                  fontWeight: 800,
                  fontSize: '12pt',
                }}
              >
                02
              </div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 13}pt`,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0',
                  color: darkGray,
                }}
              >
                Experience
              </h2>
            </div>
            {data.experience.map((exp, expIndex) => (
              <div
                key={exp.id}
                data-section="experience"
                style={{
                  marginBottom: '24px',
                  marginLeft: '44px',
                  padding: '18px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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
                        fontSize: `${companyStyles.size || 12.5}pt`,
                        fontWeight: 800,
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
                        color: accentRed,
                        fontWeight: 700,
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: `${dateStyles.size || 9.5}pt`,
                      color: whiteText,
                      fontWeight: 700,
                      background: darkBg,
                      padding: '6px 14px',
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
                      lineHeight: bodyLeading,
                      color: '#52525B',
                    }}
                  >
                    <span style={{ color: accentRed, fontWeight: 'bold', marginRight: '6px' }}>▸</span> {acc}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {data?.projects?.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: accentRed,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  color: whiteText,
                  fontWeight: 800,
                  fontSize: '12pt',
                }}
              >
                03
              </div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 13}pt`,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0',
                  color: darkGray,
                }}
              >
                Projects
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginLeft: '44px' }}>
              {data.projects.map(proj => (
                <div
                  key={proj.id}
                  data-section="projects"
                  style={{
                    padding: '18px',
                    background: darkBg,
                    color: whiteText,
                    borderRadius: '8px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: `${companyStyles.size || 11}pt`,
                      fontWeight: 800,
                      margin: '0 0 6px 0',
                      color: accentRed,
                    }}
                  >
                    {proj.name}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      margin: '0 0 10px 0',
                      lineHeight: bodyLeading,
                      color: lightGray,
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
                            background: accentRed,
                            color: whiteText,
                            padding: '3px 10px',
                            borderRadius: '12px',
                            fontWeight: 700,
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          <div>
            {data?.education?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: accentRed,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      color: whiteText,
                      fontWeight: 800,
                      fontSize: '12pt',
                    }}
                  >
                    04
                  </div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11.5}pt`,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      margin: '0',
                      color: darkGray,
                    }}
                  >
                    Education
                  </h2>
                </div>
                {data.education.map(edu => (
                  <div key={edu.id} data-section="education" style={{ marginLeft: '44px', marginBottom: '12px' }}>
                    <div style={{ fontWeight: 800, fontSize: `${companyStyles.size || 10.5}pt`, margin: '0', color: darkGray }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                    <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, color: accentRed, margin: '2px 0', fontWeight: 600 }}>
                      {edu.school}
                    </div>
                    <div style={{ fontSize: `${dateStyles.size || 9}pt`, color: lightGray, margin: '0' }}>
                      {edu.startYear} — {edu.endYear}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data?.skills?.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: accentRed,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      color: whiteText,
                      fontWeight: 800,
                      fontSize: '12pt',
                    }}
                  >
                    05
                  </div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11.5}pt`,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      margin: '0',
                      color: darkGray,
                    }}
                  >
                    Skills
                  </h2>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '44px' }}>
                  {data.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        background: darkBg,
                        color: whiteText,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: `${bodyStyles.size || 9}pt`,
                        fontWeight: 700,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {data?.certificates?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: accentRed,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      color: whiteText,
                      fontWeight: 800,
                      fontSize: '12pt',
                    }}
                  >
                    06
                  </div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11.5}pt`,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      margin: '0',
                      color: darkGray,
                    }}
                  >
                    Certs
                  </h2>
                </div>
                {data.certificates.map((cert, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      marginBottom: '4px',
                      marginLeft: '44px',
                      padding: '8px 12px',
                      background: '#FFFFFF',
                      borderRadius: '6px',
                      borderLeft: `4px solid ${accentRed}`,
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>✓</span> {cert.name}
                  </div>
                ))}
              </div>
            )}

            {data?.achievements?.length > 0 && (
              <div style={{ marginBottom: data?.languages?.length > 0 ? '24px' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: accentRed,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      color: whiteText,
                      fontWeight: 800,
                      fontSize: '12pt',
                    }}
                  >
                    07
                  </div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11.5}pt`,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      margin: '0',
                      color: darkGray,
                    }}
                  >
                    Achievements
                  </h2>
                </div>
                {data.achievements.map((ach, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      marginBottom: '4px',
                      marginLeft: '44px',
                    }}
                  >
                    {ach}
                  </div>
                ))}
              </div>
            )}

            {data?.languages?.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: accentRed,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      color: whiteText,
                      fontWeight: 800,
                      fontSize: '12pt',
                    }}
                  >
                    08
                  </div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11.5}pt`,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      margin: '0',
                      color: darkGray,
                    }}
                  >
                    Languages
                  </h2>
                </div>
                <div style={{ fontSize: `${bodyStyles.size || 9.5}pt`, marginLeft: '44px', lineHeight: 1.8 }}>
                  {data.languages.map((lang, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700 }}>{lang.name}</span>
                      <span style={{ color: accentRed, fontWeight: 600 }}>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoldStatement

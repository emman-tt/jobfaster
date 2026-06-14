import React from "react";

const SidebarTwoColumn = ({ data }) => {
  const styles = data?.styles || {};
  const nameStyles = styles.name || {};
  const sectionStyles = styles.sectionHeader || {};
  const companyStyles = styles.company || {};
  const bodyStyles = styles.bodyText || {};
  const dateStyles = styles.date || {};
  const contactStyles = styles.contact || {};
  const links = data?.onlineLinks;

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5;
  const primaryBlue = "#1E40AF";
  const lightBlue = "#EFF6FF";
  const darkGray = "#1E293B";
  const mediumGray = "#64748B";
  const accentText = "#1E40AF";

  return (
    <div
      style={{
        color: bodyStyles.color || darkGray,
        maxWidth: "850px",
        display: "flex",
        gap: "0",
      }}
    >
      <div
        style={{
          width: "260px",
          flexShrink: 0,
          minHeight:'100%',
          background: lightBlue,
          padding: "28px 20px 28px 10px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: `${nameStyles.size || 16}pt`,
              fontWeight: 700,
              margin: "0 0 4px 0",
              letterSpacing: nameStyles.spacing || 0,
              color: primaryBlue,
            }}
          >
            {data?.name}
          </h1>
          <p
            style={{
              fontSize: `${companyStyles.size || 9.5}pt`,
              margin: "0",
              color: darkGray,
              fontWeight: 500,
            }}
          >
            {data?.jobTitle}
          </p>
        </div>

        <div
          style={{
            borderTop: `2px solid ${primaryBlue}`,
            paddingTop: "16px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: `${sectionStyles.size || 9}pt`,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              margin: "0 0 10px 0",
              color: primaryBlue,
            }}
          >
            Contact
          </h2>
          <div
            style={{
              fontSize: `${contactStyles.size || 8.5}pt`,
              lineHeight: 1.8,
              wordBreak: "break-word",
            }}
          >
            {data?.phone && (
              <div style={{ marginBottom: "4px" }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: primaryBlue,
                    marginBottom: "1px",
                  }}
                >
                  Phone
                </div>
                <div>{data.phone}</div>
              </div>
            )}
            {data?.email && (
              <div style={{ marginBottom: "4px" }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: primaryBlue,
                    marginBottom: "1px",
                  
                  }}
                >
                  Email
                </div>
                <div >{data.email}</div>
              </div>
            )}
            {data?.location && (
              <div style={{ marginBottom: "4px" }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: primaryBlue,
                    marginBottom: "1px",
                  }}
                >
                  Location
                </div>
                <div>{data.location}</div>
              </div>
            )}
          </div>
          {links?.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  fontWeight: 600,
                  color: primaryBlue,
                  marginBottom: "4px",
                  fontSize: "8.5pt",
                }}
              >
                Links
              </div>
              {links.map((item, index) => (
                <div
                  key={item.name}
                  style={{ marginBottom: "3px", fontSize: "8.5pt" }}
                >
                  {item.link}
                </div>
              ))}
            </div>
          )}
        </div>

        {data?.education?.length > 0 && (
          <div
            style={{
              borderTop: `2px solid ${primaryBlue}`,
              paddingTop: "16px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: `${sectionStyles.size || 9}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                margin: "0 0 10px 0",
                color: primaryBlue,
              }}
            >
              Education
            </h2>
            {data.education.map((edu) => (
              <div
                key={edu.id}
                style={{ marginBottom: "12px", fontSize: "8.5pt" }}
              >
                <div style={{ fontWeight: 700, marginBottom: "2px" }}>
                  {edu.degree}
                </div>
                {edu.field && (
                  <div style={{ marginBottom: "2px", color: primaryBlue }}>
                    {edu.field}
                  </div>
                )}
                <div style={{ marginBottom: "1px" }}>{edu.school}</div>
                <div style={{ color: mediumGray }}>
                  {edu.startYear} — {edu.endYear}
                </div>
              </div>
            ))}
          </div>
        )}
        {data?.skills?.length > 0 && (
          <div
            style={{
              borderTop: `2px solid ${primaryBlue}`,
              paddingTop: "16px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: `${sectionStyles.size || 9}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                margin: "0 0 12px 0",
                color: primaryBlue,
              }}
            >
              Skills
            </h2>
            <div
              style={{
                fontSize: `${bodyStyles.size || 8.5}pt`,
                lineHeight: 1.8,
              }}
            >
              {data.skills.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "2px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      background: primaryBlue,
                      borderRadius: "50%",
                      marginRight: "8px",
                      flexShrink: 0,
                    }}
                  />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.certificates?.length > 0 && (
          <div
            style={{
              borderTop: `2px solid ${primaryBlue}`,
              paddingTop: "16px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: `${sectionStyles.size || 9}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                margin: "0 0 10px 0",
                color: primaryBlue,
              }}
            >
              Certs
            </h2>
            <div
              style={{
                fontSize: `${bodyStyles.size || 8.5}pt`,
                lineHeight: 1.6,
              }}
            >
              {data.certificates.map((cert, i) => (
                <div key={i} style={{ marginBottom: "4px" }}>
                  <span style={{ color: primaryBlue, fontWeight: "bold" }}>
                    ✓
                  </span>{" "}
                  {cert.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.languages?.length > 0 && (
          <div
            style={{
              borderTop: `2px solid ${primaryBlue}`,
              paddingTop: "16px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: `${sectionStyles.size || 9}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                margin: "0 0 10px 0",
                color: primaryBlue,
              }}
            >
              Languages
            </h2>
            <div
              style={{
                fontSize: `${bodyStyles.size || 8.5}pt`,
                lineHeight: 1.7,
              }}
            >
              {data.languages.map((lang, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "3px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{lang.name}</span>
                  <span style={{ color: primaryBlue }}>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <div style={{ flex: 1, padding: "28px 28px" }}>
        {data?.pageNumber > 1 && (
          <div
            style={{
              marginBottom: "16px",
              paddingBottom: "8px",
              borderBottom: `2px solid ${primaryBlue}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "10pt",
                color: mediumGray,
              }}
            >
              <span style={{ fontWeight: "bold", color: primaryBlue }}>
                {data?.name}
              </span>
              <span>
                Page {data?.pageNumber} of {data?.totalPages}
              </span>
            </div>
          </div>
        )}

        {data?.summary && data.summary.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px 0",
                color: primaryBlue,
                paddingBottom: "6px",
                borderBottom: `2px solid ${primaryBlue}`,
              }}
            >
              Professional Summary
            </h2>
            <p
              style={{
                fontSize: `${bodyStyles.size || 10.5}pt`,
                margin: "0",
                lineHeight: bodyLeading,
                textAlign: "justify",
                color: darkGray,
              }}
            >
              {data.summary}
            </p>
          </div>
        )}

        {data?.experience?.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 14px 0",
                color: primaryBlue,
                paddingBottom: "6px",
                borderBottom: `2px solid ${primaryBlue}`,
              }}
            >
              Professional Experience
            </h2>
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                data-section="experience"
                style={{
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "6px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: `${companyStyles.size || 12}pt`,
                        fontWeight: 700,
                        margin: "0",
                        color: darkGray,
                      }}
                    >
                      {exp.position}
                    </h3>
                    <p
                      style={{
                        fontSize: `${bodyStyles.size || 10.5}pt`,
                        margin: "2px 0 0 0",
                        color: accentText,
                        fontWeight: 600,
                      }}
                    >
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: `${dateStyles.size || 9.5}pt`,
                      color: mediumGray,
                      fontWeight: 600,
                      flexShrink: 0,
                      marginLeft: "12px",
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
                      marginBottom: "4px",
                      marginLeft: "16px",
                      lineHeight: bodyLeading,
                      color: "#475569",
                    }}
                  >
                    <span
                      style={{
                        color: primaryBlue,
                        fontWeight: "bold",
                        marginRight: "6px",
                      }}
                    >
                      •
                    </span>{" "}
                    {acc}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {data?.projects?.length > 0 && (
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 12px 0",
                color: primaryBlue,
                paddingBottom: "6px",
                borderBottom: `2px solid ${primaryBlue}`,
              }}
            >
              Key Projects
            </h2>
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                data-section="projects"
                style={{
                  marginBottom: "16px",
                  padding: "14px 16px",
                  background: lightBlue,
                  borderRadius: "6px",
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 11}pt`,
                    fontWeight: 700,
                    margin: "0 0 4px 0",
                    color: primaryBlue,
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    margin: "0 0 6px 0",
                    lineHeight: bodyLeading,
                    color: "#475569",
                  }}
                >
                  {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <p
                    style={{
                      fontSize: `${dateStyles.size || 8.5}pt`,
                      margin: "0",
                      color: primaryBlue,
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Technologies:</span>{" "}
                    {proj.techStack.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {data?.achievements?.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 11}pt`,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 10px 0",
                color: primaryBlue,
                paddingBottom: "6px",
                borderBottom: `2px solid ${primaryBlue}`,
              }}
            >
              Achievements
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {data.achievements.map((ach, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    padding: "8px 12px",
                    background: lightBlue,
                    borderRadius: "4px",
                  }}
                >
                  <span
                    style={{ color: primaryBlue, fontWeight: "bold" }}
                  ></span>{" "}
                  {ach}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarTwoColumn;

import React from "react";

const StartupBold = ({ data }) => {
  const styles = data?.styles || {};
  const nameStyles = styles.name || {};
  const sectionStyles = styles.sectionHeader || {};
  const companyStyles = styles.company || {};
  const bodyStyles = styles.bodyText || {};
  const dateStyles = styles.date || {};
  const contactStyles = styles.contact || {};
  const links = data?.onlineLinks;

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5;
  const primaryColor = "#10B981";
  const darkBg = "#0F172A";

  return (
    <div
      className="p-5"
      style={{
        color: bodyStyles.color || "#1e293b",
        maxWidth: "850px",
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              borderTop: `1px solid ${primaryColor}`,
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10pt",
              color: "#666",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{data?.name}</span>
            <span>
              Page {data?.pageNumber} of {data?.totalPages}
            </span>
          </div>
          <div
            style={{ borderTop: `1px solid ${primaryColor}`, marginTop: "6px" }}
          />
        </div>
      )}

      <div
        style={{
          background: darkBg,
          padding: "28px 24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: `${nameStyles.size || 32}pt`,
                fontWeight: "bold",
                margin: "0 0 4px 0",
                letterSpacing: nameStyles.spacing || -0.5,
                color: "#ffffff",
              }}
            >
              {data?.name}
            </h1>
            <p
              style={{
                fontSize: `${companyStyles.size || 13}pt`,
                margin: "0",
                color: primaryColor,
                fontWeight: 600,
              }}
            >
              {data?.jobTitle}
            </p>
          </div>
          <div
            style={{
              background: primaryColor,
              padding: "4px 16px",
              borderRadius: "4px",
              fontSize: "9pt",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            AVAILABLE
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px 24px",
            marginTop: "16px",
            fontSize: `${contactStyles.size || 10}pt`,
            color: "#cbd5e1",
          }}
        >
          {data?.phone && <span>📞 {data.phone}</span>}
          {data?.email && <span>✉️ {data.email}</span>}
          {data?.location && <span>📍 {data.location}</span>}
          {links?.map((item, index) => (
            <span key={item.name}>🔗 {item.link}</span>
          ))}
        </div>
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px 20px",
            borderLeft: `4px solid ${primaryColor}`,
            background: "rgba(16, 185, 129, 0.05)",
          }}
        >
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 8px 0",
              color: primaryColor,
            }}
          >
            About Me
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 11}pt`,
              margin: "0",
              lineHeight: bodyLeading,
              color: bodyStyles.color || "#334155",
            }}
          >
            {data.summary}
          </p>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                background: primaryColor,
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "10pt",
              }}
            ></div>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 12}pt`,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                margin: "0",
                color: darkBg,
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
                marginBottom: "16px",
                paddingLeft: "16px",
                borderLeft:
                  expIndex < data.experience.length - 1
                    ? "2px solid #e2e8f0"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "4px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: `${companyStyles.size || 12}pt`,
                      fontWeight: "bold",
                      margin: "0",
                      color: companyStyles.color || darkBg,
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 10}pt`,
                      margin: "2px 0 0 0",
                      color: primaryColor,
                      fontWeight: 500,
                    }}
                  >
                    {exp.company}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9.5}pt`,
                    color: dateStyles.color || "#64748b",
                    background: "#f1f5f9",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    fontWeight: 500,
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
                    marginBottom: "3px",
                    marginLeft: "12px",
                    lineHeight: bodyLeading,
                    color: bodyStyles.color || "#475569",
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
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                background: primaryColor,
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "10pt",
              }}
            ></div>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 12}pt`,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                margin: "0",
                color: darkBg,
              }}
            >
              Projects
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                data-section="projects"
                style={{
                  padding: "14px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 11}pt`,
                    fontWeight: "bold",
                    margin: "0 0 4px 0",
                    color: darkBg,
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    margin: "0 0 8px 0",
                    lineHeight: bodyLeading,
                    color: "#64748b",
                  }}
                >
                  {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                  >
                    {proj.techStack.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "8pt",
                          background: "rgba(16, 185, 129, 0.1)",
                          color: primaryColor,
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontWeight: 500,
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

      {(data?.education?.length > 0 ||
        data?.skills?.length > 0 ||
        data?.certificates?.length > 0) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <div>
            {data?.education?.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      background: primaryColor,
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "10pt",
                    }}
                  ></div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11}pt`,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      margin: "0",
                      color: darkBg,
                    }}
                  >
                    Education
                  </h2>
                </div>
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    data-section="education"
                    style={{ marginBottom: "10px" }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: `${companyStyles.size || 10.5}pt`,
                        margin: "0",
                      }}
                    >
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </div>
                    <div
                      style={{
                        fontSize: `${bodyStyles.size || 9.5}pt`,
                        color: "#64748b",
                        margin: "2px 0",
                      }}
                    >
                      {edu.school} • {edu.startYear} - {edu.endYear}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div>
            {data?.skills?.length > 0 && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      background: primaryColor,
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "10pt",
                    }}
                  ></div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11}pt`,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      margin: "0",
                      color: darkBg,
                    }}
                  >
                    Skills
                  </h2>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {data.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: `${bodyStyles.size || 9}pt`,
                        background: darkBg,
                        color: "#fff",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            {data?.certificates?.length > 0 && (
              <div style={{ marginTop: data?.skills?.length > 0 ? "20px" : 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      background: primaryColor,
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "10pt",
                    }}
                  ></div>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11}pt`,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      margin: "0",
                      color: darkBg,
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
                      marginBottom: "4px",
                    }}
                  >
                    • {cert.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {(data?.languages?.length > 0 || data?.achievements?.length > 0) && (
        <div
          style={{
            marginTop: "24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {data?.languages?.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    background: primaryColor,
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "10pt",
                  }}
                ></div>
                <h2
                  style={{
                    fontSize: `${sectionStyles.size || 10}pt`,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    margin: "0",
                    color: darkBg,
                  }}
                >
                  Languages
                </h2>
              </div>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt` }}>
                {data.languages
                  .map((lang) => `${lang.name} (${lang.proficiency})`)
                  .join(" • ")}
              </div>
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "4px",
                    background: primaryColor,
                    marginRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "10pt",
                  }}
                ></div>
                <h2
                  style={{
                    fontSize: `${sectionStyles.size || 10}pt`,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    margin: "0",
                    color: darkBg,
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
                    marginBottom: "3px",
                  }}
                >
                  • {ach}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartupBold;

import React from "react";

const CreativePortfolio = ({ data }) => {
  const styles = data?.styles || {};
  const nameStyles = styles.name || {};
  const sectionStyles = styles.sectionHeader || {};
  const companyStyles = styles.company || {};
  const bodyStyles = styles.bodyText || {};
  const dateStyles = styles.date || {};
  const contactStyles = styles.contact || {};
  const links = data?.onlineLinks;

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5;
  const accentColor = "#E11D48";
  const sidebarBg = "#1a1a2e";

  return (
    <div
      style={{
        color: bodyStyles.color || "#333",
        maxWidth: "850px",
        display: "flex",
      }}
    >
      {data?.pageNumber > 1 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            marginBottom: "12px",
          }}
        >
          <div style={{ borderTop: "1px solid #999", marginBottom: "6px" }} />
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
          <div style={{ borderTop: "1px solid #999", marginTop: "6px" }} />
        </div>
      )}

      <div
        style={{
          width: "260px",
          backgroundColor: sidebarBg,
          color: "#fff",
          padding: "24px 16px 24px 10px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: accentColor,
            margin: "0 auto 16px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28pt",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {data?.name?.charAt(0)}
        </div>

        <h1
          style={{
            fontSize: `${nameStyles.size || 14}pt`,
            fontWeight: "bold",
            margin: "0 0 4px 0",
            textAlign: "center",
            color: "#fff",
          }}
        >
          {data?.name}
        </h1>

        <p
          style={{
            fontSize: `${contactStyles.size || 10}pt`,
            margin: "0 0 16px 0",
            textAlign: "center",
            color: "#aaa",
          }}
        >
          {data?.jobTitle}
        </p>

        <div
          style={{ borderTop: `2px solid ${accentColor}`, margin: "16px 0" }}
        />

        {data?.phone && (
          <div
            style={{
              marginBottom: "8px",
              fontSize: `${contactStyles.size || 9}pt`,
            }}
          >
            <span style={{ color: "#888" }}>Phone</span>
            <div style={{ color: "#fff" }}>{data.phone}</div>
          </div>
        )}

        {data?.email && (
          <div
            style={{
              marginBottom: "8px",
              fontSize: `${contactStyles.size || 9}pt`,
            }}
          >
            <span style={{ color: "#888" }}>Email</span>
            <div style={{ color: "#fff", wordBreak: "break-word" }}>
              {data.email}
            </div>
          </div>
        )}

        {data?.location && (
          <div
            style={{
              marginBottom: "8px",
              fontSize: `${contactStyles.size || 9}pt`,
            }}
          >
            <span style={{ color: "#888" }}>Location</span>
            <div style={{ color: "#fff" }}>{data.location}</div>
          </div>
        )}

        {links?.length > 0 && (
          <div
            style={{
              marginTop: "16px",
              fontSize: `${contactStyles.size || 9}pt`,
            }}
          >
            <span style={{ color: "#888" }}>Links</span>
            {links.map((item, index) => (
              <div
                key={item.name}
                style={{ color: accentColor, marginTop: "4px" }}
              >
                {item.link}
              </div>
            ))}
          </div>
        )}

        {data?.skills?.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <h3
              style={{
                fontSize: `${sectionStyles.size || 10}pt`,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#fff",
                marginBottom: "8px",
              }}
            >
              Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {data.skills.slice(0, 12).map((skill, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: "rgba(225, 29, 72, 0.2)",
                    color: "#fff",
                    padding: "3px 8px",
                    borderRadius: "3px",
                    fontSize: "8pt",
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {data?.languages?.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <h3
              style={{
                fontSize: `${sectionStyles.size || 10}pt`,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#fff",
                marginBottom: "8px",
              }}
            >
              Languages
            </h3>
            {data.languages.map((lang, i) => (
              <div
                key={i}
                style={{ fontSize: "9pt", marginBottom: "4px", color: "#ccc" }}
              >
                {lang.name}{" "}
                <span style={{ color: "#888" }}>({lang.proficiency})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: "24px 20px" }}>
        {data?.summary && data.summary.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 12}pt`,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: accentColor,
                marginBottom: "8px",
                paddingBottom: "4px",
                borderBottom: `2px solid ${accentColor}`,
              }}
            >
              Professional Summary
            </h2>
            <p
              style={{
                fontSize: `${bodyStyles.size || 11}pt`,
                margin: "0",
                lineHeight: bodyLeading,
                color: bodyStyles.color || "#333",
              }}
            >
              {data.summary}
            </p>
          </div>
        )}

        {data?.experience?.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 12}pt`,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: accentColor,
                marginBottom: "12px",
                paddingBottom: "4px",
                borderBottom: `2px solid ${accentColor}`,
              }}
            >
              Experience
            </h2>
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                data-section="experience"
                style={{ marginBottom: "16px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "2px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: `${companyStyles.size || 12}pt`,
                      fontWeight: "bold",
                      margin: "0",
                      color: companyStyles.color || "#1a1a2e",
                    }}
                  >
                    {exp.position}
                  </h3>
                  <span
                    style={{
                      fontSize: `${dateStyles.size || 10}pt`,
                      color: dateStyles.color || "#888",
                      fontStyle: "italic",
                    }}
                  >
                    {exp.startYear} - {exp.endYear}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 10}pt`,
                    margin: "0 0 6px 0",
                    color: "#666",
                  }}
                >
                  {exp.company} • {exp.location}
                </p>
                {exp.accomplishments?.map((acc, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: `${bodyStyles.size || 10}pt`,
                      marginBottom: "3px",
                      marginLeft: "16px",
                      lineHeight: bodyLeading,
                      color: bodyStyles.color || "#444",
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
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: `${sectionStyles.size || 12}pt`,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: accentColor,
                marginBottom: "12px",
                paddingBottom: "4px",
                borderBottom: `2px solid ${accentColor}`,
              }}
            >
              Projects
            </h2>
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                data-section="projects"
                style={{ marginBottom: "12px" }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 11}pt`,
                    fontWeight: "bold",
                    margin: "0 0 3px 0",
                    color: "#1a1a2e",
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 10}pt`,
                    margin: "0 0 3px 0",
                    lineHeight: bodyLeading,
                    color: "#555",
                  }}
                >
                  {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <p
                    style={{
                      fontSize: `${dateStyles.size || 9}pt`,
                      margin: "0",
                      color: "#888",
                    }}
                  >
                    Tech: {proj.techStack.map(t => t.name).join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {(data?.education?.length > 0 ||
          data?.certificates?.length > 0 ||
          data?.achievements?.length > 0) && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              {data?.education?.length > 0 && (
                <>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11}pt`,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: accentColor,
                      marginBottom: "8px",
                      paddingBottom: "4px",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    Education
                  </h2>
                  {data.education.map((edu) => (
                    <div
                      key={edu.id}
                      data-section="education"
                      style={{ marginBottom: "8px" }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: `${companyStyles.size || 10}pt`,
                          margin: "0",
                        }}
                      >
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </div>
                      <div
                        style={{
                          fontSize: `${bodyStyles.size || 9}pt`,
                          color: "#666",
                          margin: "2px 0",
                        }}
                      >
                        {edu.school} • {edu.startYear} - {edu.endYear}
                      </div>
                      {edu.highlights?.length > 0 && (
                        <div
                          style={{
                            fontSize: `${dateStyles.size || 8}pt`,
                            color: "#888",
                          }}
                        >
                          {edu.highlights.join(" | ")}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            <div>
              {data?.certificates?.length > 0 && (
                <>
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11}pt`,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: accentColor,
                      marginBottom: "8px",
                      paddingBottom: "4px",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    Certifications
                  </h2>
                  {data.certificates.map((cert, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: `${bodyStyles.size || 9}pt`,
                        marginBottom: "4px",
                      }}
                    >
                      • {cert.name}
                    </div>
                  ))}
                </>
              )}

              {data?.achievements?.length > 0 && (
                <div
                  style={{
                    marginTop: data?.certificates?.length > 0 ? "16px" : 0,
                  }}
                >
                  <h2
                    style={{
                      fontSize: `${sectionStyles.size || 11}pt`,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: accentColor,
                      marginBottom: "8px",
                      paddingBottom: "4px",
                      borderBottom: `2px solid ${accentColor}`,
                    }}
                  >
                    Achievements
                  </h2>
                  {data.achievements.map((ach, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: `${bodyStyles.size || 9}pt`,
                        marginBottom: "4px",
                      }}
                    >
                      • {ach}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativePortfolio;

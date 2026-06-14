import React from "react";

const FreelancePortfolio = ({ data }) => {
  const styles = data?.styles || {};
  const nameStyles = styles.name || {};
  const sectionStyles = styles.sectionHeader || {};
  const companyStyles = styles.company || {};
  const bodyStyles = styles.bodyText || {};
  const dateStyles = styles.date || {};
  const contactStyles = styles.contact || {};
  const links = data?.onlineLinks;

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5;
  const accentColor = "#8B5CF6";
  const lightBg = "#FAF5FF";

  return (
    <div
      className="p-8"
      style={{
        color: bodyStyles.color || "#1F2937",
        maxWidth: "850px",
      }}
    >
      {data?.pageNumber > 1 && (
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              borderTop: `1px solid ${accentColor}`,
              marginBottom: "6px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10pt",
              color: "#6B7280",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{data?.name}</span>
            <span>
              Page {data?.pageNumber} of {data?.totalPages}
            </span>
          </div>
          <div
            style={{ borderTop: `1px solid ${accentColor}`, marginTop: "6px" }}
          />
        </div>
      )}

      <div
        style={{
          background: lightBg,
          padding: "20px 24px",
          marginBottom: "24px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: `${nameStyles.size || 28}pt`,
                fontWeight: 700,
                margin: "0 0 4px 0",
                letterSpacing: nameStyles.spacing || 0,
                color: nameStyles.color || "#1F2937",
              }}
            >
              {data?.name}
            </h1>
            <p
              style={{
                fontSize: `${companyStyles.size || 13}pt`,
                margin: "0",
                color: accentColor,
                fontWeight: 600,
              }}
            >
              {data?.jobTitle}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              maxWidth: "300px",
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                background: accentColor,
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "16px",
                fontSize: "8.5pt",
                fontWeight: 600,
              }}
            >
              FREELANCE
            </span>
            <span
              style={{
                background: "#E9D5FF",
                color: accentColor,
                padding: "6px 14px",
                borderRadius: "16px",
                fontSize: "8.5pt",
                fontWeight: 600,
              }}
            >
              AVAILABLE
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 20px",
            marginTop: "14px",
            fontSize: `${contactStyles.size || 9.5}pt`,
            color: "#6B7280",
          }}
        >
          {data?.phone && <span>📞 {data.phone}</span>}
          {data?.email && <span>✉️ {data.email}</span>}
          {data?.location && <span>📍 {data.location}</span>}
          {links?.map((item, index) => (
            <span
              key={item.name}
              style={{ color: accentColor, fontWeight: 500 }}
            >
              🔗 {item.link}
            </span>
          ))}
        </div>
      </div>

      {data?.skills?.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 10px 0",
              color: sectionStyles.color || "#374151",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                background: accentColor,
                width: "20px",
                height: "3px",
                marginRight: "10px",
              }}
            />
            Skills & Technologies
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {data.skills.map((skill, i) => (
              <span
                key={i}
                style={{
                  background: "#F3F4F6",
                  padding: "6px 14px",
                  borderRadius: "4px",
                  fontSize: `${bodyStyles.size || 9.5}pt`,
                  fontWeight: 500,
                  border: "1px solid #E5E7EB",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 12px 0",
              color: sectionStyles.color || "#374151",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                background: accentColor,
                width: "20px",
                height: "3px",
                marginRight: "10px",
              }}
            />
            Portfolio Projects
          </h2>
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
                  padding: "14px 16px",
                  background: lightBg,
                  borderRadius: "6px",
                  borderLeft: `3px solid ${accentColor}`,
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 11}pt`,
                    fontWeight: "bold",
                    margin: "0 0 4px 0",
                    color: "#1F2937",
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    margin: "0 0 6px 0",
                    lineHeight: bodyLeading,
                    color: "#4B5563",
                  }}
                >
                  {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
                  >
                    {proj.techStack.slice(0, 6).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "8pt",
                          background: "#fff",
                          padding: "2px 8px",
                          borderRadius: "3px",
                          border: "1px solid #D1D5DB",
                          color: "#6B7280",
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

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 12px 0",
              color: sectionStyles.color || "#374151",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                background: accentColor,
                width: "20px",
                height: "3px",
                marginRight: "10px",
              }}
            />
            Client & Project Work
          </h2>
          {data.experience.map((exp) => (
            <div
              key={exp.id}
              data-section="experience"
              style={{
                marginBottom: "16px",
                paddingLeft: "12px",
                borderLeft: `2px solid ${accentColor}`,
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
                      fontSize: `${companyStyles.size || 11.5}pt`,
                      fontWeight: "bold",
                      margin: "0",
                      color: "#1F2937",
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      margin: "2px 0 0 0",
                      color: accentColor,
                      fontWeight: 500,
                    }}
                  >
                    {exp.company} • {exp.location}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9}pt`,
                    color: "#6B7280",
                    background: "#F3F4F6",
                    padding: "3px 10px",
                    borderRadius: "4px",
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
                    marginBottom: "3px",
                    marginLeft: "10px",
                    lineHeight: bodyLeading,
                    color: "#4B5563",
                  }}
                >
                  ◦ {acc}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
      >
        <div>
          {data?.education?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 10px 0",
                  color: sectionStyles.color || "#374151",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    background: accentColor,
                    width: "16px",
                    height: "3px",
                    marginRight: "8px",
                  }}
                />
                Education
              </h2>
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
                      color: "#6B7280",
                      margin: "2px 0",
                    }}
                  >
                    {edu.school} • {edu.startYear} — {edu.endYear}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {data?.certificates?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || "#374151",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    background: accentColor,
                    width: "16px",
                    height: "3px",
                    marginRight: "8px",
                  }}
                />
                Certifications
              </h2>
              {data.certificates.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: "4px",
                  }}
                >
                  ✓ {cert.name}
                </div>
              ))}
            </div>
          )}

          {data?.languages?.length > 0 && (
            <div
              style={{
                marginBottom: data?.certificates?.length > 0 ? "20px" : 0,
              }}
            >
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || "#374151",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    background: accentColor,
                    width: "16px",
                    height: "3px",
                    marginRight: "8px",
                  }}
                />
                Languages
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt` }}>
                {data.languages
                  .map((lang) => `${lang.name} (${lang.proficiency})`)
                  .join(" • ")}
              </div>
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || "#374151",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    background: accentColor,
                    width: "16px",
                    height: "3px",
                    marginRight: "8px",
                  }}
                />
                Achievements
              </h2>
              {data.achievements.map((ach, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: "3px",
                  }}
                >
                  {ach}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: lightBg,
            borderRadius: "6px",
            borderLeft: `3px solid ${accentColor}`,
          }}
        >
          <h2
            style={{
              fontSize: `${sectionStyles.size || 10.5}pt`,
              fontWeight: "bold",
              margin: "0 0 6px 0",
              color: accentColor,
            }}
          >
            About Me
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 10}pt`,
              margin: "0",
              lineHeight: bodyLeading,
              color: "#4B5563",
            }}
          >
            {data.summary}
          </p>
        </div>
      )}
    </div>
  );
};

export default FreelancePortfolio;

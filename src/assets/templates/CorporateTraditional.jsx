import React from "react";

const CorporateStandard = ({ data }) => {
  const styles = data?.styles || {};
  const nameStyles = styles.name || {};
  const sectionStyles = styles.sectionHeader || {};
  const companyStyles = styles.company || {};
  const bodyStyles = styles.bodyText || {};
  const dateStyles = styles.date || {};
  const contactStyles = styles.contact || {};
  const links = data?.onlineLinks;

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5;
  const accentBlue = "#1E40AF";
  const mediumBlue = "#3B82F6";

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
              borderTop: `2px solid ${accentBlue}`,
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
            style={{ borderTop: `2px solid ${accentBlue}`, marginTop: "6px" }}
          />
        </div>
      )}

      <div
        style={{
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: `${nameStyles.size || 26}pt`,
            fontWeight: 700,
            margin: "0 0 4px 0",
            letterSpacing: nameStyles.spacing || 1,
            textTransform: "uppercase",
            color: nameStyles.color || accentBlue,
          }}
        >
          {data?.name}
        </h1>
        <p
          style={{
            fontSize: `${companyStyles.size || 12}pt`,
            margin: "0 0 10px 0",
            fontWeight: 600,
            color: "#374151",
          }}
        >
          {data?.jobTitle}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: `${contactStyles.size || 10}pt`,
            color: contactStyles.color || "#6B7280",
          }}
        >
          {data?.phone && <span>{data.phone}</span>}
          {data?.email && <span>{data.email}</span>}
          {data?.location && <span>{data.location}</span>}
        </div>
        {links?.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "16px",
              fontSize: `${contactStyles.size || 9.5}pt`,
              color: mediumBlue,
              marginTop: "4px",
            }}
          >
            {links.map((item, index) => (
              <span key={item.name}>{item.link}</span>
            ))}
          </div>
        )}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(to right, transparent, ${accentBlue}, ${mediumBlue}, transparent)`,
            marginTop: "16px",
          }}
        />
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              margin: "0 0 8px 0",
              color: sectionStyles.color || accentBlue,
              borderBottom: `1px solid ${mediumBlue}`,
              paddingBottom: "4px",
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
              color: bodyStyles.color || "#374151",
            }}
          >
            {data.summary}
          </p>
        </div>
      )}

      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              margin: "0 0 12px 0",
              color: sectionStyles.color || accentBlue,
              borderBottom: `1px solid ${mediumBlue}`,
              paddingBottom: "4px",
            }}
          >
            Professional Experience
          </h2>
          {data.experience.map((exp) => (
            <div
              key={exp.id}
              data-section="experience"
              style={{ marginBottom: "18px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "4px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: `${companyStyles.size || 11.5}pt`,
                      fontWeight: "bold",
                      margin: "0",
                      color: companyStyles.color || "#1F2937",
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 10}pt`,
                      margin: "2px 0 0 0",
                      fontWeight: 500,
                      color: mediumBlue,
                    }}
                  >
                    {exp.company}, {exp.location}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9.5}pt`,
                    color: dateStyles.color || "#6B7280",
                    fontWeight: 500,
                    fontVariant: "small-caps",
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
                    marginLeft: "18px",
                    lineHeight: bodyLeading,
                    color: bodyStyles.color || "#374151",
                    textAlign: "justify",
                  }}
                >
                  ▸ {acc}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              margin: "0 0 12px 0",
              color: sectionStyles.color || accentBlue,
              borderBottom: `1px solid ${mediumBlue}`,
              paddingBottom: "4px",
            }}
          >
            Significant Projects
          </h2>
          {data.projects.map((proj) => (
            <div
              key={proj.id}
              data-section="projects"
              style={{ marginBottom: "14px" }}
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
                  fontSize: `${bodyStyles.size || 10}pt`,
                  margin: "0 0 4px 0",
                  lineHeight: bodyLeading,
                  textAlign: "justify",
                  color: "#374151",
                }}
              >
                {proj.description}
              </p>
              {proj.techStack?.length > 0 && (
                <p
                  style={{
                    fontSize: `${dateStyles.size || 9}pt`,
                    margin: "0",
                    color: "#6B7280",
                    fontStyle: "italic",
                  }}
                >
                  <span style={{ fontWeight: 600, fontStyle: "normal" }}>
                    Technologies:
                  </span>{" "}
                  {proj.techStack.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}
      >
        <div>
          {data?.education?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  margin: "0 0 10px 0",
                  color: sectionStyles.color || accentBlue,
                  borderBottom: `1px solid ${mediumBlue}`,
                  paddingBottom: "4px",
                }}
              >
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
                      color: "#374151",
                      margin: "2px 0",
                    }}
                  >
                    {edu.school}
                  </div>
                  <div
                    style={{
                      fontSize: `${dateStyles.size || 9}pt`,
                      color: "#6B7280",
                      margin: "0",
                    }}
                  >
                    {edu.startYear} — {edu.endYear}
                  </div>
                  {edu.highlights?.length > 0 && (
                    <div
                      style={{
                        fontSize: `${bodyStyles.size || 9}pt`,
                        color: "#6B7280",
                        marginTop: "2px",
                      }}
                    >
                      {edu.highlights.join(" • ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {data?.languages?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || accentBlue,
                  borderBottom: `1px solid ${mediumBlue}`,
                  paddingBottom: "4px",
                }}
              >
                Languages
              </h2>
              <div
                style={{
                  fontSize: `${bodyStyles.size || 9.5}pt`,
                  lineHeight: 1.6,
                }}
              >
                {data.languages.map((lang, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: 500 }}>{lang.name}</span>
                    <span style={{ color: "#6B7280" }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {data?.skills?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || accentBlue,
                  borderBottom: `1px solid ${mediumBlue}`,
                  paddingBottom: "4px",
                }}
              >
                Core Competencies
              </h2>
              <div
                style={{
                  fontSize: `${bodyStyles.size || 9.5}pt`,
                  lineHeight: 1.7,
                }}
              >
                {data.skills.map((skill, i) => (
                  <span key={i}>
                    {i > 0 && " • "}
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data?.certificates?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || accentBlue,
                  borderBottom: `1px solid ${mediumBlue}`,
                  paddingBottom: "4px",
                }}
              >
                Certifications
              </h2>
              {data.certificates.map((cert, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: "3px",
                  }}
                >
                  ✓ {cert.name}
                </div>
              ))}
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || accentBlue,
                  borderBottom: `1px solid ${mediumBlue}`,
                  paddingBottom: "4px",
                }}
              >
                Honors & Achievements
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
    </div>
  );
};

export default CorporateStandard;

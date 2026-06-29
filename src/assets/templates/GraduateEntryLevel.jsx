import React from "react";

const GraduateEntryLevel = ({ data }) => {
  const styles = data?.styles || {};
  const nameStyles = styles.name || {};
  const sectionStyles = styles.sectionHeader || {};
  const companyStyles = styles.company || {};
  const bodyStyles = styles.bodyText || {};
  const dateStyles = styles.date || {};
  const contactStyles = styles.contact || {};
  const links = data?.onlineLinks;

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5;
  const primaryOrange = "#EA580C";
  const lightOrange = "#FFF7ED";
  const darkGray = "#1F2937";
  const mediumGray = "#6B7280";

  return (
    <div
    className="p-10"
      style={{
        color: bodyStyles.color || darkGray,
        maxWidth: "850px",

      }}
    >
      {data?.pageNumber > 1 && (
        <div
          style={{
            marginBottom: "12px",
            paddingBottom: "8px",
         
            borderBottom: `2px solid ${primaryOrange}`,
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
            <span style={{ fontWeight: "bold", color: primaryOrange }}>
              {data?.name}
            </span>
            <span>
              Page {data?.pageNumber} of {data?.totalPages}
            </span>
          </div>
        </div>
      )}

      <div
        style={{
          background: lightOrange,
          padding: "28px 32px",
          marginBottom: "24px",
          borderRadius: "12px",
          border: `2px solid ${primaryOrange}`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: `${nameStyles.size || 28}pt`,
              fontWeight: 700,
              margin: "0 0 6px 0",
              letterSpacing: nameStyles.spacing || 0,
              color: darkGray,
            }}
          >
            {data?.name}
          </h1>
          <p
            style={{
              fontSize: `${companyStyles.size || 13}pt`,
              margin: "0 0 12px 0",
              color: primaryOrange,
              fontWeight: 600,
            }}
          >
            {data?.jobTitle}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px 20px",
              fontSize: `${contactStyles.size || 9.5}pt`,
              color: mediumGray,
            }}
          >
            {data?.phone && <span>{data.phone}</span>}
            {data?.email && <span>{data.email}</span>}
            {data?.location && <span>{data.location}</span>}
            {links?.map((item, index) => (
              <span
                key={item.name}
                style={{ color: primaryOrange, fontWeight: 500 }}
              >
                {item.link}
              </span>
            ))}
          </div>
        </div>
      </div>

      {data?.summary && data.summary.length > 0 && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px 20px",
            background: "#F9FAFB",
            borderLeft: `4px solid ${primaryOrange}`,
            borderRadius: "0 6px 6px 0",
          }}
        >
          <h2
            style={{
              fontSize: `${sectionStyles.size || 10.5}pt`,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 6px 0",
              color: primaryOrange,
            }}
          >
            Objective
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 10.5}pt`,
              margin: "0",
              lineHeight: bodyLeading,
              color: "#374151",
            }}
          >
            {data.summary}
          </p>
        </div>
      )}

      {data?.education?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11.5}pt`,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 12px 0",
              color: primaryOrange,
              paddingBottom: "6px",
              borderBottom: `2px solid ${primaryOrange}`,
            }}
          >
            Education
          </h2>
          {data.education.map((edu) => (
            <div
              key={edu.id}
              data-section="education"
              style={{
                marginBottom: "16px",
                padding: "16px",
                background: "#FFFFFF",
                borderRadius: "8px",
                border: `1px solid #E5E7EB`,
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
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 10.5}pt`,
                      margin: "2px 0 0 0",
                      color: primaryOrange,
                      fontWeight: 600,
                    }}
                  >
                    {edu.school}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9.5}pt`,
                    color: mediumGray,
                    fontWeight: 600,
                    background: lightOrange,
                    padding: "4px 12px",
                    borderRadius: "4px",
                  }}
                >
                  {edu.startYear} — {edu.endYear}
                </span>
              </div>
              {edu.highlights?.length > 0 && (
                <div
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    color: "#4B5563",
                    marginTop: "8px",
                  }}
                >
                  {edu.highlights.map((h, i) => (
                    <div key={i} style={{ marginBottom: "2px" }}>
                      <span
                        style={{ color: primaryOrange, fontWeight: "bold" }}
                      >
                        •
                      </span>{" "}
                      {h}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11.5}pt`,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 12px 0",
              color: primaryOrange,
              paddingBottom: "6px",
              borderBottom: `2px solid ${primaryOrange}`,
            }}
          >
            Academic & Personal Projects
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
                  padding: "16px",
                  background: lightOrange,
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 11}pt`,
                    fontWeight: 700,
                    margin: "0 0 6px 0",
                    color: darkGray,
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    margin: "0 0 8px 0",
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
                    {proj.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "8pt",
                          background: "#FFFFFF",
                          color: primaryOrange,
                          padding: "2px 8px",
                          borderRadius: "10px",
                          fontWeight: 600,
                          border: `1px solid ${primaryOrange}`,
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
              fontSize: `${sectionStyles.size || 11.5}pt`,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: "0 0 12px 0",
              color: primaryOrange,
              paddingBottom: "6px",
              borderBottom: `2px solid ${primaryOrange}`,
            }}
          >
            Experience & Internships
          </h2>
          {data.experience.map((exp) => (
            <div
              key={exp.id}
              data-section="experience"
              style={{
                marginBottom: "16px",
                padding: "14px 16px",
                background: "#FAFAFA",
                borderRadius: "8px",
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
                      fontSize: `${companyStyles.size || 11}pt`,
                      fontWeight: 700,
                      margin: "0",
                      color: darkGray,
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      margin: "2px 0 0 0",
                      color: primaryOrange,
                      fontWeight: 500,
                    }}
                  >
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: `${dateStyles.size || 9}pt`,
                    color: mediumGray,
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
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: "2px",
                    marginLeft: "10px",
                    lineHeight: bodyLeading,
                    color: "#4B5563",
                  }}
                >
                  <span style={{ color: primaryOrange, fontWeight: "bold" }}>
                    •
                  </span>{" "}
                  {acc.text}
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
          {data?.skills?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 10px 0",
                  color: primaryOrange,
                  paddingBottom: "4px",
                  borderBottom: `2px solid ${primaryOrange}`,
                }}
              >
                Technical & Soft Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: lightOrange,
                      color: primaryOrange,
                      padding: "6px 12px",
                      borderRadius: "16px",
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
        </div>

        <div>
          {data?.certificates?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 8px 0",
                  color: primaryOrange,
                  paddingBottom: "4px",
                  borderBottom: `2px solid ${primaryOrange}`,
                }}
              >
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
                  <span style={{ color: primaryOrange, fontWeight: "bold" }}>
                    •
                  </span>{" "}
                  {cert.name}
                </div>
              ))}
            </div>
          )}

          {data?.languages?.length > 0 && (
            <div
              style={{
                marginBottom: data?.achievements?.length > 0 ? "20px" : 0,
              }}
            >
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 8px 0",
                  color: primaryOrange,
                  paddingBottom: "4px",
                  borderBottom: `2px solid ${primaryOrange}`,
                }}
              >
                Languages
              </h2>
              <div style={{ fontSize: `${bodyStyles.size || 9.5}pt` }}>
                {data.languages.map((lang, i) => (
                  <span key={i}>
                    {i > 0 && " • "}
                    <span style={{ fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ color: mediumGray }}>
                      {" "}
                      ({lang.proficiency})
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 8px 0",
                  color: primaryOrange,
                  paddingBottom: "4px",
                  borderBottom: `2px solid ${primaryOrange}`,
                }}
              >
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
                  <span style={{ color: primaryOrange, fontWeight: "bold" }}>
                    •
                  </span>{" "}
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

export default GraduateEntryLevel;

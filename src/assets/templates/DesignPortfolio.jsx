import React from "react";

const DesignPortfolio = ({ data }) => {
  const styles = data?.styles || {};
  const nameStyles = styles.name || {};
  const sectionStyles = styles.sectionHeader || {};
  const companyStyles = styles.company || {};
  const bodyStyles = styles.bodyText || {};
  const dateStyles = styles.date || {};
  const contactStyles = styles.contact || {};
  const links = data?.onlineLinks;

  const bodyLeading = bodyStyles.leading ? Number(bodyStyles.leading) : 1.5;
  const accentPink = "#EC4899";
  const darkBg = "#18181B";
  const lightText = "#F4F4F5";
  const mediumGray = "#A1A1AA";

  return (
    <div
      className="p-5"
      style={{
        color: bodyStyles.color || "#27272A",
        maxWidth: "850px",
      }}
    >
      {data?.pageNumber > 1 && (
        <div
          style={{
            marginBottom: "12px",
            paddingBottom: "8px",
            borderBottom: `2px solid ${accentPink}`,
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
            <span style={{ fontWeight: "bold", color: accentPink }}>
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
          background: darkBg,
          padding: "32px",
          marginBottom: "28px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "120px",
            height: "4px",
            background: accentPink,
          }}
        />
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
                fontSize: `${nameStyles.size || 36}pt`,
                fontWeight: 300,
                margin: "0 0 8px 0",
                letterSpacing: nameStyles.spacing || -1,
                color: "#ffffff",
              }}
            >
              {data?.name}
            </h1>
            <div
              style={{
                width: "60px",
                height: "3px",
                background: accentPink,
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontSize: `${companyStyles.size || 13}pt`,
                margin: "0",
                color: lightText,
                fontWeight: 400,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {data?.jobTitle}
            </p>
          </div>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: `3px solid ${accentPink}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28pt",
            }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px 24px",
            marginTop: "24px",
            fontSize: `${contactStyles.size || 9.5}pt`,
            color: mediumGray,
          }}
        >
          {data?.phone && <span>📞 {data.phone}</span>}
          {data?.email && <span>✉️ {data.email}</span>}
          {data?.location && <span>📍 {data.location}</span>}
          {links?.map((item) => (
            <span
              key={item.name}
              style={{ color: accentPink, fontWeight: 500 }}
            >
              🔗 {item.link}
            </span>
          ))}
        </div>
      </div>

      {data?.projects?.length > 0 && (
        <div style={{ marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 12}pt`,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "3px",
              margin: "0 0 16px 0",
              color: sectionStyles.color || darkBg,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: accentPink,
                marginRight: "12px",
                transform: "rotate(45deg)",
              }}
            />
            Portfolio Projects
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {data.projects.map((proj) => (
              <div
                key={proj.id}
                data-section="projects"
                style={{
                  padding: "18px",
                  background: "#FAFAFA",
                  borderRadius: "12px",
                  border: `1px solid #E4E4E7`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: `linear-gradient(90deg, ${accentPink}, #F472B6)`,
                  }}
                />
                <h3
                  style={{
                    fontSize: `${companyStyles.size || 12}pt`,
                    fontWeight: 700,
                    margin: "0 0 8px 0",
                    color: darkBg,
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: `${bodyStyles.size || 10}pt`,
                    margin: "0 0 12px 0",
                    lineHeight: bodyLeading,
                    color: "#52525B",
                  }}
                >
                  {proj.description}
                </p>
                {proj.techStack?.length > 0 && (
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {proj.techStack.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "8.5pt",
                          background: "#FECDD3",
                          color: "#9F1239",
                          padding: "4px 12px",
                          borderRadius: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data?.summary && data.summary.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: `${sectionStyles.size || 11}pt`,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "3px",
              margin: "0 0 10px 0",
              color: sectionStyles.color || darkBg,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: accentPink,
                marginRight: "12px",
                transform: "rotate(45deg)",
              }}
            />
            About Me
          </h2>
          <p
            style={{
              fontSize: `${bodyStyles.size || 10.5}pt`,
              margin: "0 0 0 20px",
              lineHeight: bodyLeading,
              color: "#52525B",
              fontStyle: "italic",
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
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "3px",
              margin: "0 0 14px 0",
              color: sectionStyles.color || darkBg,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: accentPink,
                marginRight: "12px",
                transform: "rotate(45deg)",
              }}
            />
            Experience
          </h2>
          {data.experience.map((exp, expIndex) => (
            <div
              key={exp.id}
              data-section="experience"
              style={{
                marginBottom: "20px",
                paddingLeft: "20px",
                borderLeft:
                  expIndex < data.experience.length - 1
                    ? `2px solid #E4E4E7`
                    : "none",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "4px",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: accentPink,
                }}
              />
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
                      fontSize: `${companyStyles.size || 11.5}pt`,
                      fontWeight: 700,
                      margin: "0",
                      color: darkBg,
                    }}
                  >
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: `${bodyStyles.size || 10}pt`,
                      margin: "2px 0 0 0",
                      color: accentPink,
                      fontWeight: 500,
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
                    fontWeight: 500,
                    background: "#F4F4F5",
                    padding: "4px 12px",
                    borderRadius: "12px",
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
                    marginLeft: "8px",
                    lineHeight: bodyLeading,
                    color: "#52525B",
                  }}
                >
                  <span style={{ color: accentPink, fontWeight: "bold" }}>
                    ◦
                  </span>{" "}
                  {acc.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}
      >
        <div>
          {data?.skills?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  margin: "0 0 12px 0",
                  color: sectionStyles.color || darkBg,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: accentPink,
                    marginRight: "12px",
                    transform: "rotate(45deg)",
                  }}
                />
                Tools & Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#FAFAFA",
                      color: darkBg,
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: `${bodyStyles.size || 9}pt`,
                      fontWeight: 600,
                      border: `1px solid #E4E4E7`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data?.education?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  margin: "0 0 10px 0",
                  color: sectionStyles.color || darkBg,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: accentPink,
                    marginRight: "12px",
                    transform: "rotate(45deg)",
                  }}
                />
                Education
              </h2>
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  data-section="education"
                  style={{ marginBottom: "12px" }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: `${companyStyles.size || 10.5}pt`,
                      margin: "0",
                    }}
                  >
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </div>
                  <div
                    style={{
                      fontSize: `${bodyStyles.size || 9.5}pt`,
                      color: "#52525B",
                      margin: "2px 0",
                    }}
                  >
                    {edu.school}
                  </div>
                  <div
                    style={{
                      fontSize: `${dateStyles.size || 9}pt`,
                      color: mediumGray,
                      margin: "0",
                    }}
                  >
                    {edu.startYear} — {edu.endYear}
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
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || darkBg,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: accentPink,
                    marginRight: "12px",
                    transform: "rotate(45deg)",
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
                    padding: "8px 12px",
                    background: "#FFF1F2",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ fontWeight: 700, color: accentPink }}>✓</span>{" "}
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
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || darkBg,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: accentPink,
                    marginRight: "12px",
                    transform: "rotate(45deg)",
                  }}
                />
                Languages
              </h2>
              <div
                style={{
                  fontSize: `${bodyStyles.size || 9.5}pt`,
                  lineHeight: 1.8,
                }}
              >
                {data.languages.map((lang, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontWeight: 600 }}>{lang.name}</span>
                    <span style={{ color: accentPink }}>
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data?.achievements?.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: `${sectionStyles.size || 10.5}pt`,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  margin: "0 0 8px 0",
                  color: sectionStyles.color || darkBg,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: accentPink,
                    marginRight: "12px",
                    transform: "rotate(45deg)",
                  }}
                />
                Recognition
              </h2>
              {data.achievements.map((ach, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: `${bodyStyles.size || 9.5}pt`,
                    marginBottom: "4px",
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

export default DesignPortfolio;

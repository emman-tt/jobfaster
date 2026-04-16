import React from 'react'

export const ModernMinimalistMeta = {
  name: 'Modern Minimalist',
  description: 'A contemporary design with ample whitespace and clean lines. Ideal for creative professionals and modern tech companies.',
  features: [
    'Sans-serif typography (Arial)',
    'Light letter spacing for elegance',
    'Grid-based layout for organization',
    'Pill-style skill tags',
    'Minimal visual elements'
  ]
}

const ModernMinimalist = ({ data }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      color: '#2c3e50',
      maxWidth: '850px'
    }}
  >
    <div style={{ marginBottom: '32px' }}>
      <h1
        style={{
          fontSize: '36px',
          margin: '0',
          fontWeight: '300',
          letterSpacing: '2px'
        }}
      >
        {data.name}
      </h1>
      <div
        style={{ height: '1px', background: '#e0e0e0', margin: '16px 0' }}
      ></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '13px',
          color: '#666',
          marginBottom: '16px'
        }}
      >
        <span>{data.jobTitle}</span>
        <span>{data.phone}</span>
      </div>
      <div
        style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '8px'
        }}
      >
        {data.email} | {data.location}
      </div>
      {data.onlineLinks?.length > 0 && (
        <div
          style={{
            fontSize: '11px',
            color: '#666',
            marginBottom: '8px'
          }}
        >
          {data.onlineLinks.map((link, idx) => (
            <span key={idx}>
              {link.name}: {link.link}
              {idx < data.onlineLinks.length - 1 ? ' | ' : ''}
            </span>
          ))}
        </div>
      )}
      {data.summary && (
        <p
          style={{
            fontSize: '13px',
            margin: '0',
            lineHeight: '1.6',
            color: '#555'
          }}
        >
          {data.summary}
        </p>
      )}
    </div>

    {data.experience.length > 0 && (
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
            color: '#2c3e50'
          }}
        >
          Experience
        </h2>
        {data.experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '4px'
              }}
            >
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0' }}>
                {exp.position}
              </h3>
              <span style={{ fontSize: '12px', color: '#999' }}>
                {exp.startYear} – {exp.endYear}
              </span>
            </div>
            <p style={{ fontSize: '12px', margin: '0 0 8px 0', color: '#999' }}>
              {exp.company} | {exp.location}
            </p>
            <div style={{ fontSize: '12px', lineHeight: '1.6', color: '#555' }}>
              {exp.accomplishments.map((acc, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>
                  • {acc}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}

    {data.projects?.length > 0 && (
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '13px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
            color: '#2c3e50'
          }}
        >
          Projects
        </h2>
        {data.projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
              {proj.name}
            </h3>
            <p style={{ fontSize: '12px', margin: '0 0 4px 0', color: '#555' }}>
              {proj.description}
            </p>
            <p style={{ fontSize: '11px', color: '#999' }}>
              Tech: {proj.techStack.join(' • ')}
            </p>
          </div>
        ))}
      </div>
    )}

    {(data.education.length > 0 || data.languages?.length > 0 || data.skills.length > 0) && (
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
      >
        <div>
          {data.education.length > 0 && (
            <>
              <h2
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px',
                  color: '#2c3e50'
                }}
              >
                Education
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <h3
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      margin: '0 0 2px 0'
                    }}
                  >
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p style={{ fontSize: '11px', color: '#999', margin: '0' }}>
                    {edu.school} | {edu.startYear} - {edu.endYear}
                  </p>
                  {edu.highlights?.length > 0 && (
                    <p style={{ fontSize: '10px', color: '#999', margin: '2px 0 0 0' }}>
                      {edu.highlights.join(' | ')}
                    </p>
                  )}
                </div>
              ))}
            </>
          )}
          {data.languages?.length > 0 && (
            <div style={{ marginTop: data.education.length > 0 ? '16px' : 0 }}>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  margin: '0 0 4px 0'
                }}
              >
                Languages
              </h3>
              <p style={{ fontSize: '11px', color: '#999', margin: '0' }}>
                {data.languages
                  .map(lang => `${lang.name} (${lang.proficiency})`)
                  .join(', ')}
              </p>
            </div>
          )}
        </div>
        <div>
          {data.skills.length > 0 && (
            <>
              <h2
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '12px',
                  color: '#2c3e50'
                }}
              >
                Skills
              </h2>
              <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      display: 'inline-block',
                      marginRight: '8px',
                      marginBottom: '4px'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )}

    {(data.certificates?.length > 0 || data.achievements?.length > 0) && (
      <div style={{ marginTop: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            {data.certificates?.length > 0 && (
              <>
                <h2
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                    color: '#2c3e50'
                  }}
                >
                  Certifications
                </h2>
                <ul style={{ fontSize: '12px', margin: '0', paddingLeft: '20px', color: '#555' }}>
                  {data.certificates.map((cert, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{cert.name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            {data.achievements?.length > 0 && (
              <>
                <h2
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '12px',
                    color: '#2c3e50'
                  }}
                >
                  Achievements
                </h2>
                <ul style={{ fontSize: '12px', margin: '0', paddingLeft: '20px', color: '#555' }}>
                  {data.achievements.map((ach, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{ach}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
)

export default ModernMinimalist

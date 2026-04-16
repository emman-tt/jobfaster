import React from 'react'

export const ClassicProfessionalMeta = {
  name: 'Classic Professional',
  description: 'A timeless, traditional resume format with serif fonts and clean organization. Perfect for conservative industries and formal applications.',
  features: [
    'Serif typography (Georgia)',
    'Bold header with name and title',
    'Side-by-side education and skills layout',
    'Underlined section headers',
    'Professional and formal tone'
  ]
}

const ClassicProfessional = ({ data }) => (
  <div
    style={{
      fontFamily: 'Georgia, serif',
      lineHeight: '1.6',
      color: '#333',
      maxWidth: '850px'
    }}
  >
    <div
      style={{
        borderBottom: '3px solid #333',
        paddingBottom: '16px',
        marginBottom: '24px'
      }}
    >
      <h1
        style={{ fontSize: '32px', margin: '0 0 4px 0', fontWeight: 'bold' }}
      >
        {data.name}
      </h1>
      <p
        style={{
          fontSize: '14px',
          margin: '0',
          color: '#666',
          fontStyle: 'italic'
        }}
      >
        {data.jobTitle}
      </p>
      <p style={{ fontSize: '12px', margin: '8px 0 0 0', color: '#666' }}>
        {data.location} | {data.phone} | {data.email}
      </p>
      {data.onlineLinks?.length > 0 && (
        <p style={{ fontSize: '11px', margin: '4px 0 0 0', color: '#666' }}>
          {data.onlineLinks.map((link, idx) => (
            <span key={idx}>
              {link.name}: {link.link}
              {idx < data.onlineLinks.length - 1 ? ' | ' : ''}
            </span>
          ))}
        </p>
      )}
    </div>

    {data.summary && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #999',
            paddingBottom: '6px',
            marginBottom: '8px'
          }}
        >
          Professional Summary
        </h2>
        <p style={{ fontSize: '11px', margin: '0', lineHeight: '1.5' }}>
          {data.summary}
        </p>
      </div>
    )}

    {data.experience.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #999',
            paddingBottom: '6px',
            marginBottom: '8px'
          }}
        >
          Experience
        </h2>
        {data.experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0' }}>
                {exp.position}
              </h3>
              <span style={{ fontSize: '11px', color: '#666' }}>
                {exp.startYear} - {exp.endYear}
              </span>
            </div>
            <p
              style={{ fontSize: '11px', margin: '2px 0 6px 0', color: '#666' }}
            >
              {exp.company}, {exp.location}
            </p>
            <ul style={{ fontSize: '11px', margin: '0', paddingLeft: '20px' }}>
              {exp.accomplishments.map((acc, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {acc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}

    {data.projects?.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #999',
            paddingBottom: '6px',
            marginBottom: '8px'
          }}
        >
          Projects
        </h2>
        {data.projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0' }}>
              {proj.name}
            </h3>
            <p style={{ fontSize: '11px', margin: '2px 0', color: '#666' }}>
              {proj.description}
            </p>
            <p style={{ fontSize: '10px', margin: '2px 0', color: '#666' }}>
              Tech: {proj.techStack.join(', ')}
            </p>
          </div>
        ))}
      </div>
    )}

    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ flex: 1, marginBottom: '20px' }}>
        {data.education.length > 0 && (
          <>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                borderBottom: '1px solid #999',
                paddingBottom: '6px',
                marginBottom: '8px'
              }}
            >
              Education
            </h2>
            {data.education.map(edu => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0' }}>
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p
                  style={{ fontSize: '11px', margin: '2px 0 0 0', color: '#666' }}
                >
                  {edu.school} • {edu.startYear} - {edu.endYear}
                </p>
                {edu.highlights?.length > 0 && (
                  <p style={{ fontSize: '10px', margin: '2px 0 0 0', color: '#666' }}>
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
                fontWeight: 'bold',
                margin: '0 0 4px 0'
              }}
            >
              Languages
            </h3>
            <p style={{ fontSize: '11px', margin: '0', color: '#666' }}>
              {data.languages
                .map(lang => `${lang.name} (${lang.proficiency})`)
                .join(', ')}
            </p>
          </div>
        )}
      </div>
      <div style={{ flex: 1, marginBottom: '20px' }}>
        {data.skills.length > 0 && (
          <>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                borderBottom: '1px solid #999',
                paddingBottom: '6px',
                marginBottom: '8px'
              }}
            >
              Skills
            </h2>
            <p style={{ fontSize: '11px', margin: '0', lineHeight: '1.5' }}>
              {data.skills.join(', ')}
            </p>
          </>
        )}
      </div>
    </div>

    {data.certificates?.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #999',
            paddingBottom: '6px',
            marginBottom: '8px'
          }}
        >
          Certifications
        </h2>
        <ul style={{ fontSize: '11px', margin: '0', paddingLeft: '20px' }}>
          {data.certificates.map((cert, i) => (
            <li key={i}>{cert.name} {cert.issuer && `(${cert.issuer})`}</li>
          ))}
        </ul>
      </div>
    )}

    {data.achievements?.length > 0 && (
      <div>
        <h2
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderBottom: '1px solid #999',
            paddingBottom: '6px',
            marginBottom: '8px'
          }}
        >
          Achievements
        </h2>
        <ul style={{ fontSize: '11px', margin: '0', paddingLeft: '20px' }}>
          {data.achievements.map((ach, i) => (
            <li key={i}>{ach}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)

export default ClassicProfessional

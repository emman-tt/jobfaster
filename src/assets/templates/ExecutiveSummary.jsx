import React from 'react'

export const ExecutiveSummaryMeta = {
  name: 'Executive Summary',
  description: 'A powerful resume format designed for senior leaders and C-suite positions. Emphasizes achievements and leadership experience.',
  features: [
    'Highlighted executive profile section',
    'Key achievements prominently displayed',
    'Navy blue accent color for authority',
    'Core competencies checklist',
    'Two-column certifications layout'
  ]
}

const ExecutiveSummary = ({ data }) => (
  <div
    style={{
      fontFamily: 'Calibri, sans-serif',
      color: '#1a1a1a',
      maxWidth: '850px'
    }}
  >
    <div
      style={{
        background: '#f5f5f5',
        padding: '20px',
        marginBottom: '24px',
        borderLeft: '4px solid #003366'
      }}
    >
      <h1
        style={{ fontSize: '28px', margin: '0 0 4px 0', fontWeight: 'bold' }}
      >
        {data.name}
      </h1>
      <h2
        style={{
          fontSize: '16px',
          margin: '0 0 12px 0',
          color: '#003366',
          fontWeight: '600'
        }}
      >
        {data.jobTitle}
      </h2>
      <p style={{ fontSize: '12px', margin: '0', lineHeight: '1.5' }}>
        {data.phone} • {data.email} • {data.location}
      </p>
      {data.onlineLinks?.length > 0 && (
        <p style={{ fontSize: '11px', margin: '8px 0 0 0', color: '#666' }}>
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
        <h3
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#003366',
            borderBottom: '2px solid #003366',
            paddingBottom: '4px',
            marginBottom: '8px'
          }}
        >
          Executive Profile
        </h3>
        <p style={{ fontSize: '12px', margin: '0', lineHeight: '1.6' }}>
          {data.summary}
        </p>
      </div>
    )}

    {data.experience.length > 0 && (
      <>
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px'
            }}
          >
            Key Achievements
          </h3>
          <ul style={{ fontSize: '12px', margin: '0', paddingLeft: '20px' }}>
            {data.experience[0]?.accomplishments.map((acc, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>
                {acc}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#003366',
              borderBottom: '2px solid #003366',
              paddingBottom: '4px',
              marginBottom: '8px'
            }}
          >
            Professional Experience
          </h3>
          {data.experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 'bold', margin: '0' }}>
                  {exp.position}
                </h4>
                <span style={{ fontSize: '11px', color: '#666' }}>
                  {exp.startYear} - {exp.endYear}
                </span>
              </div>
              <p style={{ fontSize: '11px', margin: '0', color: '#666' }}>
                {exp.company}, {exp.location}
              </p>
            </div>
          ))}
        </div>
      </>
    )}

    {data.projects?.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#003366',
            borderBottom: '2px solid #003366',
            paddingBottom: '4px',
            marginBottom: '8px'
          }}
        >
          Notable Projects
        </h3>
        {data.projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: '8px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', margin: '0' }}>
              {proj.name}
            </p>
            <p style={{ fontSize: '11px', margin: '2px 0', color: '#666' }}>
              {proj.description}
            </p>
            <p style={{ fontSize: '10px', margin: '2px 0', color: '#666' }}>
              Tech Stack: {proj.techStack.join(', ')}
            </p>
          </div>
        ))}
      </div>
    )}

    {data.skills.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#003366',
            borderBottom: '2px solid #003366',
            paddingBottom: '4px',
            marginBottom: '8px'
          }}
        >
          Core Competencies
        </h3>
        <div
          style={{
            fontSize: '11px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}
        >
          {data.skills.slice(0, 6).map((skill, i) => (
            <span key={i}>✓ {skill}</span>
          ))}
        </div>
      </div>
    )}

    {(data.education.length > 0 || data.languages?.length > 0) && (
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#003366',
            borderBottom: '2px solid #003366',
            paddingBottom: '4px',
            marginBottom: '8px'
          }}
        >
          Education
        </h3>
        {data.education.map(edu => (
          <div key={edu.id} style={{ marginBottom: '6px', fontSize: '11px' }}>
            <strong>{edu.degree}</strong> {edu.field && `in ${edu.field}`} •{' '}
            {edu.school} ({edu.startYear} - {edu.endYear})
          </div>
        ))}
        {data.languages?.length > 0 && (
          <div style={{ marginTop: '8px', fontSize: '11px' }}>
            <strong>Languages:</strong>{' '}
            {data.languages
              .map(lang => `${lang.name} (${lang.proficiency})`)
              .join(', ')}
          </div>
        )}
      </div>
    )}

    {(data.certificates?.length > 0 || data.achievements?.length > 0) && (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          {data.certificates?.length > 0 && (
            <>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: '#003366',
                  borderBottom: '2px solid #003366',
                  paddingBottom: '4px',
                  marginBottom: '8px'
                }}
              >
                Certifications
              </h3>
              <ul style={{ fontSize: '11px', margin: '0', paddingLeft: '20px' }}>
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
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: '#003366',
                  borderBottom: '2px solid #003366',
                  paddingBottom: '4px',
                  marginBottom: '8px'
                }}
              >
                Awards & Recognition
              </h3>
              <ul style={{ fontSize: '11px', margin: '0', paddingLeft: '20px' }}>
                {data.achievements.map((ach, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{ach}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )}
  </div>
)

export default ExecutiveSummary

import React from 'react'

export const TechnicalFocusedMeta = {
  name: 'Technical Focused',
  description: 'A developer-friendly format with monospace fonts and technical styling. Best for software engineers and IT professionals.',
  features: [
    'Monospace typography (Consolas)',
    'Command-line style section headers',
    'Multi-column skills display',
    'Technical project details',
    'GitHub and link integration'
  ]
}

const TechnicalFocused = ({ data }) => (
  <div
    style={{
      fontFamily: 'Consolas, monospace',
      color: '#333',
      maxWidth: '850px',
      fontSize: '13px'
    }}
  >
    <div
      style={{
        marginBottom: '24px',
        borderBottom: '2px dashed #999',
        paddingBottom: '16px'
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          margin: '0',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold'
        }}
      >
        {data.name}
      </h1>
      <p
        style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: '#666',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {data.jobTitle}
      </p>
      <div
        style={{
          marginTop: '8px',
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {data.location} | {data.email} | {data.phone}
      </div>
      {data.onlineLinks?.length > 0 && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '11px',
            fontFamily: 'Arial, sans-serif',
            color: '#666'
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
    </div>

    {data.summary && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: '#f0f0f0',
            padding: '6px 8px',
            margin: '0 0 8px 0'
          }}
        >
          &gt; Professional Summary
        </h2>
        <p style={{ fontSize: '12px', margin: '0', lineHeight: '1.5' }}>
          {data.summary}
        </p>
      </div>
    )}

    {data.skills.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: '#f0f0f0',
            padding: '6px 8px',
            margin: '0 0 8px 0'
          }}
        >
          &gt; Technical Skills
        </h2>
        <div style={{ columns: 2, columnGap: '20px' }}>
          {data.skills.map((skill, i) => (
            <div key={i} style={{ marginBottom: '4px', breakInside: 'avoid' }}>
              → {skill}
            </div>
          ))}
        </div>
      </div>
    )}

    {data.experience.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: '#f0f0f0',
            padding: '6px 8px',
            margin: '0 0 8px 0'
          }}
        >
          &gt; Professional Experience
        </h2>
        {data.experience.map(exp => (
          <div key={exp.id} style={{ marginBottom: '12px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
              {exp.position} @ {exp.company}
            </div>
            <div
              style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}
            >
              {exp.startYear} - {exp.endYear} | {exp.location}
            </div>
            {exp.accomplishments.map((acc, i) => (
              <div key={i} style={{ fontSize: '12px', marginBottom: '2px' }}>
                • {acc}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}

    {data.projects?.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: '#f0f0f0',
            padding: '6px 8px',
            margin: '0 0 8px 0'
          }}
        >
          &gt; Projects
        </h2>
        {data.projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: '8px' }}>
            <div style={{ fontWeight: 'bold' }}>{proj.name}</div>
            <div
              style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}
            >
              {proj.description}
            </div>
            <div
              style={{ fontSize: '11px', color: '#555' }}
            >
              Tech Stack: {proj.techStack.join(' • ')}
            </div>
            {proj.link && (
              <div style={{ fontSize: '11px', color: '#555' }}>
                Link: {proj.link}
              </div>
            )}
            {proj.github && (
              <div style={{ fontSize: '11px', color: '#555' }}>
                GitHub: {proj.github}
              </div>
            )}
          </div>
        ))}
      </div>
    )}

    {data.education.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: '#f0f0f0',
            padding: '6px 8px',
            margin: '0 0 8px 0'
          }}
        >
          &gt; Education
        </h2>
        {data.education.map(edu => (
          <div key={edu.id} style={{ marginBottom: '6px', fontSize: '12px' }}>
            <strong>{edu.degree}</strong> {edu.field && `in ${edu.field}`}
            <br />
            {edu.school} ({edu.startYear} - {edu.endYear})
            {edu.highlights?.length > 0 && (
              <span style={{ color: '#666' }}> | {edu.highlights.join(' | ')}</span>
            )}
          </div>
        ))}
      </div>
    )}

    {data.languages?.length > 0 && (
      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            background: '#f0f0f0',
            padding: '6px 8px',
            margin: '0 0 8px 0'
          }}
        >
          &gt; Languages
        </h2>
        <div style={{ fontSize: '12px' }}>
          {data.languages
            .map(lang => `${lang.name} (${lang.proficiency})`)
            .join(', ')}
        </div>
      </div>
    )}

    {(data.certificates?.length > 0 || data.achievements?.length > 0) && (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          {data.certificates?.length > 0 && (
            <>
              <h2
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  background: '#f0f0f0',
                  padding: '6px 8px',
                  margin: '0 0 8px 0'
                }}
              >
                &gt; Certifications
              </h2>
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
              <h2
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  background: '#f0f0f0',
                  padding: '6px 8px',
                  margin: '0 0 8px 0'
                }}
              >
                &gt; Achievements
              </h2>
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

export default TechnicalFocused

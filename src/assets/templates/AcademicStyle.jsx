import React from 'react'

export const AcademicStyleMeta = {
  name: 'Academic Style',
  description: 'A scholarly CV-inspired format with serif typography and detailed sections. Suitable for researchers, educators, and academic positions.',
  features: [
    'Serif typography (Times New Roman)',
    'Centered header with contact info',
    'Detailed project descriptions',
    'Technical proficiencies section',
    'Justified text alignment'
  ]
}

const AcademicStyle = ({ data }) => (
  <div
    style={{
      fontFamily: 'Times New Roman, serif',
      color: '#1a1a1a',
      maxWidth: '900px',
      lineHeight: '1.5',
      fontSize: '12px'
    }}
  >
    <div
      style={{
        textAlign: 'center',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '1px solid #000'
      }}
    >
      <h1 style={{ fontSize: '16px', margin: '0 0 4px 0', fontWeight: 'bold' }}>
        {data.personal.contactDetails.fullName}
      </h1>
      <p style={{ fontSize: '11px', margin: '0' }}>
        {data.personal.contactDetails.email} |{' '}
        {data.personal.contactDetails.phone} |{' '}
        {data.personal.contactDetails.location}
      </p>
      {data.personal.onlineLinks && data.personal.onlineLinks.length > 0 && (
        <p style={{ fontSize: '10px', margin: '4px 0 0 0' }}>
          {data.personal.onlineLinks.map((link, idx) => (
            <span key={idx}>
              {link.name}: {link.link}
              {idx < data.personal.onlineLinks.length - 1 ? ' | ' : ''}
            </span>
          ))}
        </p>
      )}
    </div>

    <div style={{ marginBottom: '16px' }}>
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          margin: '12px 0 6px 0'
        }}
      >
        PROFESSIONAL SUMMARY
      </h2>
      <p style={{ margin: '0', lineHeight: '1.6', textAlign: 'justify' }}>
        {data.personal.summary}
      </p>
    </div>

    <div style={{ marginBottom: '16px' }}>
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          margin: '12px 0 6px 0'
        }}
      >
        PROFESSIONAL EXPERIENCE
      </h2>
      {data.work.experiences.map((exp, idx) => (
        <div
          key={exp.id}
          style={{
            marginBottom:
              idx !== data.work.experiences.length - 1 ? '12px' : '0'
          }}
        >
          <p style={{ margin: '0 0 2px 0' }}>
            <strong>{exp.position}</strong>, <em>{exp.company}</em>,{' '}
            {exp.location}
          </p>
          <p style={{ margin: '0 0 6px 0', fontSize: '11px', color: '#666' }}>
            {exp.startYear} - {exp.endYear}
          </p>
          <ul style={{ margin: '0 0 6px 0', paddingLeft: '24px' }}>
            {exp.accomplishments.map((acc, i) => (
              <li key={i} style={{ marginBottom: '2px', fontSize: '11px' }}>
                {acc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {data.work.projects && data.work.projects.length > 0 && (
      <div style={{ marginBottom: '16px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            margin: '12px 0 6px 0'
          }}
        >
          PROJECTS
        </h2>
        {data.work.projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: '8px' }}>
            <p style={{ margin: '0' }}>
              <strong>{proj.name}</strong>
            </p>
            <p style={{ margin: '2px 0', fontSize: '11px' }}>
              {proj.description}
            </p>
            <p style={{ margin: '2px 0', fontSize: '10px', color: '#666' }}>
              Tech Stack: {proj.techStack.join(', ')}
            </p>
            {proj.link && (
              <p style={{ margin: '2px 0', fontSize: '10px', color: '#666' }}>
                Link: {proj.link}
              </p>
            )}
            {proj.github && (
              <p style={{ margin: '2px 0', fontSize: '10px', color: '#666' }}>
                GitHub: {proj.github}
              </p>
            )}
          </div>
        ))}
      </div>
    )}

    <div style={{ marginBottom: '16px' }}>
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          margin: '12px 0 6px 0'
        }}
      >
        EDUCATION
      </h2>
      {data.education.educations.map((edu, idx) => (
        <div
          key={edu.id}
          style={{
            marginBottom:
              idx !== data.education.educations.length - 1 ? '8px' : '0',
            fontSize: '11px'
          }}
        >
          <p style={{ margin: '0 0 2px 0' }}>
            <strong>{edu.degree}</strong> {edu.field && `in ${edu.field}`}
          </p>
          <p style={{ margin: '0' }}>
            {edu.school}, {edu.startYear} - {edu.endYear}
          </p>
          {edu.highlights && edu.highlights.length > 0 && (
            <p style={{ margin: '2px 0 0 0', color: '#666' }}>
              {edu.highlights.join('; ')}
            </p>
          )}
        </div>
      ))}
    </div>

    <div style={{ marginBottom: '16px' }}>
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          margin: '12px 0 6px 0'
        }}
      >
        TECHNICAL PROFICIENCIES
      </h2>
      <p style={{ margin: '0', fontSize: '11px', lineHeight: '1.6' }}>
        {data.credentials.skills.join(', ')}
      </p>
    </div>

    {data.education.languages && data.education.languages.length > 0 && (
      <div style={{ marginBottom: '16px' }}>
        <h2
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            margin: '12px 0 6px 0'
          }}
        >
          LANGUAGES
        </h2>
        <p style={{ margin: '0', fontSize: '11px' }}>
          {data.education.languages
            .map(lang => `${lang.language} (${lang.proficiency})`)
            .join(', ')}
        </p>
      </div>
    )}

    <div>
      <h2
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          margin: '12px 0 6px 0'
        }}
      >
        CERTIFICATIONS & AWARDS
      </h2>
      <ul style={{ margin: '0', paddingLeft: '24px', fontSize: '11px' }}>
        {data.credentials.certifications.map((cert, i) => (
          <li key={i}>{cert}</li>
        ))}
        {data.credentials.achievements.map((ach, i) => (
          <li key={i}>{ach}</li>
        ))}
      </ul>
    </div>
  </div>
)

export default AcademicStyle

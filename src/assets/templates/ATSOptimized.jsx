import React from 'react'

export const ATSOptimizedMeta = {
  name: 'ATS-Optimized',
  description:
    'A resume format specifically designed to pass Applicant Tracking Systems. Clean, simple, and scannable by automated software.',
  features: [
    'Simple Arial font for readability',
    'No graphics or images',
    'Clear section headers',
    'Straightforward formatting',
    'Maximum compatibility with ATS'
  ]
}

const ATSOptimized = ({ data }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      color: '#000',
      maxWidth: '900px',
      fontSize: '11px',
      lineHeight: '1.5'
    }}
  >
    <div
      style={{
        marginBottom: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid #000'
      }}
    >
      <div
        style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '2px' }}
      >
        {data.personal.contactDetails.fullName}
      </div>
      <div style={{ fontSize: '10px', marginBottom: '4px' }}>
        {data.personal.contactDetails.jobTitle}
      </div>
      <div style={{ fontSize: '10px', marginBottom: '2px' }}>
        {data.personal.contactDetails.phone} |{' '}
        {data.personal.contactDetails.email}
      </div>
      <div style={{ fontSize: '10px' }}>
        {data.personal.contactDetails.location}
      </div>
      {data.personal.onlineLinks && data.personal.onlineLinks.length > 0 && (
        <div style={{ fontSize: '9px', marginTop: '2px' }}>
          {data.personal.onlineLinks.map((link, idx) => (
            <span key={idx}>
              {link.name}: {link.link}
              {idx < data.personal.onlineLinks.length - 1 ? ' | ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>

    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          marginBottom: '4px',
          textTransform: 'uppercase'
        }}
      >
        SUMMARY
      </div>
      <div style={{ fontSize: '10px', lineHeight: '1.5' }}>
        {data.personal.summary}
      </div>
    </div>

    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          marginBottom: '4px',
          textTransform: 'uppercase'
        }}
      >
        EXPERIENCE
      </div>
      {data.work.experiences.map(exp => (
        <div key={exp.id} style={{ marginBottom: '8px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '10px' }}>
            {exp.position}
          </div>
          <div style={{ fontSize: '10px' }}>
            {exp.company} | {exp.location}
          </div>
          <div style={{ fontSize: '9px', marginBottom: '4px', color: '#333' }}>
            {exp.startYear} to {exp.endYear}
          </div>
          {exp.accomplishments.map((acc, i) => (
            <div
              key={i}
              style={{
                fontSize: '9px',
                marginBottom: '2px',
                marginLeft: '12px'
              }}
            >
              • {acc}
            </div>
          ))}
        </div>
      ))}
    </div>

    {data.work.projects && data.work.projects.length > 0 && (
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '4px',
            textTransform: 'uppercase'
          }}
        >
          PROJECTS
        </div>
        {data.work.projects.map(proj => (
          <div key={proj.id} style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold' }}>
              {proj.name}
            </div>
            <div style={{ fontSize: '9px' }}>{proj.description}</div>
            <div style={{ fontSize: '9px', color: '#333' }}>
              Technologies: {proj.techStack.join(', ')}
            </div>
          </div>
        ))}
      </div>
    )}

    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          marginBottom: '4px',
          textTransform: 'uppercase'
        }}
      >
        EDUCATION
      </div>
      {data.education.educations.map(edu => (
        <div key={edu.id} style={{ marginBottom: '4px', fontSize: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>
            {edu.degree} {edu.field && `in ${edu.field}`}
          </div>
          <div>
            {edu.school} | {edu.startYear} - {edu.endYear}
          </div>
          {edu.highlights && edu.highlights.length > 0 && (
            <div style={{ fontSize: '9px', color: '#333' }}>
              {edu.highlights.join(' | ')}
            </div>
          )}
        </div>
      ))}
    </div>

    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          marginBottom: '4px',
          textTransform: 'uppercase'
        }}
      >
        SKILLS
      </div>
      <div style={{ fontSize: '10px' }}>
        {data.credentials.skills.join(', ')}
      </div>
    </div>

    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          marginBottom: '4px',
          textTransform: 'uppercase'
        }}
      >
        CERTIFICATIONS
      </div>
      <div style={{ fontSize: '10px' }}>
        {data.credentials.certifications.join(', ')}
      </div>
    </div>

    {data.education.languages && data.education.languages.length > 0 && (
      <div style={{ marginBottom: '12px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '4px',
            textTransform: 'uppercase'
          }}
        >
          LANGUAGES
        </div>
        <div style={{ fontSize: '10px' }}>
          {data.education.languages
            .map(lang => `${lang.language} (${lang.proficiency})`)
            .join(', ')}
        </div>
      </div>
    )}

    {data.credentials.achievements && data.credentials.achievements.length > 0 && (
      <div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 'bold',
            marginBottom: '4px',
            textTransform: 'uppercase'
          }}
        >
          ACHIEVEMENTS
        </div>
        <div style={{ fontSize: '10px' }}>
          {data.credentials.achievements.join(', ')}
        </div>
      </div>
    )}
  </div>
)

export default ATSOptimized

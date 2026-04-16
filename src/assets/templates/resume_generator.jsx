import React, { useState } from 'react'
import ClassicProfessional from './ClassicProfessional'
import ModernMinimalist from './ModernMinimalist'
import ExecutiveSummary from './ExecutiveSummary'
import TechnicalFocused from './TechnicalFocused'
import AcademicStyle from './AcademicStyle'
import ATSOptimized from './ATSOptimized'

const ResumeGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1)

  const sampleData = {
    personal: {
      contactDetails: {
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        jobTitle: 'Senior Product Manager'
      },
      onlineLinks: [
        { name: 'LinkedIn', link: 'linkedin.com/in/sarahjohnson' },
        { name: 'Portfolio', link: 'sarahjohnson.com' }
      ],
      summary:
        'Results-driven Product Manager with 8+ years of experience leading cross-functional teams to deliver innovative solutions. Proven track record of increasing user engagement by 45% and scaling products to 2M+ users.'
    },
    work: {
      experiences: [
        {
          id: 1,
          company: 'TechCorp Solutions',
          position: 'Senior Product Manager',
          location: 'San Francisco, CA',
          startYear: '2021',
          endYear: 'Present',
          accomplishments: [
            'Led product strategy for mobile app resulting in 3.2M downloads',
            'Reduced customer churn by 28% through UX redesign initiative',
            'Managed $5M annual product budget and 12-person cross-functional team'
          ]
        },
        {
          id: 2,
          company: 'Digital Innovations Inc',
          position: 'Product Manager',
          location: 'San Francisco, CA',
          startYear: '2018',
          endYear: '2021',
          accomplishments: [
            'Launched 3 major product features increasing revenue by 35%',
            'Implemented agile methodology reducing time-to-market by 40%',
            'Established data-driven product roadmap using analytics'
          ]
        }
      ],
      projects: [
        {
          id: 1,
          name: 'AI-Powered Analytics Dashboard',
          description:
            'Built real-time analytics platform for tracking user behavior',
          techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
          link: 'example.com/analytics',
          github: 'github.com/sarahjohnson/analytics'
        }
      ]
    },
    education: {
      educations: [
        {
          id: 1,
          school: 'Stanford University',
          degree: 'Master of Business Administration',
          field: 'Technology Management',
          startYear: '2015',
          endYear: '2017',
          highlights: ['GPA: 3.8/4.0', "Dean's List"]
        },
        {
          id: 2,
          school: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startYear: '2011',
          endYear: '2015',
          highlights: ['Cum Laude', 'Computer Science Scholar']
        }
      ],
      languages: [
        { id: 1, language: 'English', proficiency: 'Native' },
        { id: 2, language: 'Spanish', proficiency: 'Professional' }
      ]
    },
    credentials: {
      certifications: [
        'Certified Scrum Product Owner (CSPO)',
        'Google Analytics Certification'
      ],
      achievements: [
        'Product of the Year Award 2022',
        'Innovation Leadership Award 2021'
      ],
      skills: [
        'Product Strategy',
        'Data Analytics',
        'User Research',
        'Agile/Scrum',
        'Roadmap Planning',
        'Stakeholder Management',
        'SQL',
        'Google Analytics',
        'Figma',
        'Jira'
      ]
    }
  }

  const templates = [
    {
      id: 1,
      name: 'Classic Professional',
      description: 'Traditional, clean, and timeless design'
    },
    {
      id: 2,
      name: 'Modern Minimalist',
      description: 'Contemporary layout with ample whitespace'
    },
    {
      id: 3,
      name: 'Executive Summary',
      description: 'Emphasizes leadership and achievements'
    },
    {
      id: 4,
      name: 'Technical Focused',
      description: 'Highlights skills and tech stack prominently'
    },
    {
      id: 5,
      name: 'Academic Style',
      description: 'CV-like format with detailed sections'
    },
    {
      id: 6,
      name: 'ATS-Optimized',
      description: 'Designed to pass Applicant Tracking Systems'
    }
  ]

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return <ClassicProfessional data={sampleData} />
      case 2:
        return <ModernMinimalist data={sampleData} />
      case 3:
        return <ExecutiveSummary data={sampleData} />
      case 4:
        return <TechnicalFocused data={sampleData} />
      case 5:
        return <AcademicStyle data={sampleData} />
      case 6:
        return <ATSOptimized data={sampleData} />
      default:
        return null
    }
  }

  return (
    <div style={{ padding: '0', backgroundColor: '#f8f8f8' }}>
      <div
        style={{
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <h1
          style={{ fontSize: '20px', margin: '0 0 16px 0', fontWeight: 'bold' }}
        >
          Resume Template Showcase
        </h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '8px'
          }}
        >
          {templates.map(template => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              style={{
                padding: '10px',
                border:
                  selectedTemplate === template.id
                    ? '2px solid #e74c3c'
                    : '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor:
                  selectedTemplate === template.id ? '#fff5f3' : '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: selectedTemplate === template.id ? '600' : '400',
                color: selectedTemplate === template.id ? '#e74c3c' : '#333',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                {template.name}
              </div>
              <div style={{ fontSize: '10px', color: '#999' }}>
                {template.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff',
          margin: '0 20px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflowX: 'auto'
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  )
}

export default ResumeGenerator

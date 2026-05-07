import AcademicStyle from '../assets/templates/AcademicStyle'
import ATSOptimized from '../assets/templates/ATSOptimized'
import ClassicProfessional from '../assets/templates/ClassicProfessional'
import ExecutiveSummary from '../assets/templates/ExecutiveSummary'
import ModernMinimalist from '../assets/templates/ModernMinimalist'
import TechnicalFocused from '../assets/templates/TechnicalFocused'

import ClassicImage from '../assets/templates/images/Professional.png'
import ModernImage from '../assets/templates/images/ModernMinimalist.png'
import ExecutiveImage from '../assets/templates/images/Executive.png'
import ATSImage from '../assets/templates/images/ATSOptimized.png'
import AcademicImage from '../assets/templates/images/Academic.png'
import TechnicalImage from '../assets/templates/images/Technical.png'

const ClassicProfessionalMeta = {
  name: 'Classic Professional',
  description:
    'A timeless, traditional resume format with serif fonts and clean organization. Perfect for conservative industries and formal applications.',
  features: [
    'Serif typography (Georgia)',
    'Bold header with name and title',
    'Side-by-side education and skills layout',
    'Underlined section headers',
    'Professional and formal tone'
  ]
}

const ModernMinimalistMeta = {
  name: 'Modern Minimalist',
  description:
    'A contemporary design with ample whitespace and clean lines. Ideal for creative professionals and modern tech companies.',
  features: [
    'Sans-serif typography (Arial)',
    'Light letter spacing for elegance',
    'Grid-based layout for organization',
    'Pill-style skill tags',
    'Minimal visual elements'
  ]
}

export const ExecutiveSummaryMeta = {
  name: 'Executive Summary',
  description:
    'A powerful resume format designed for senior leaders and C-suite positions. Emphasizes achievements and leadership experience.',
  features: [
    'Highlighted executive profile section',
    'Key achievements prominently displayed',
    'Navy blue accent color for authority',
    'Core competencies checklist',
    'Two-column certifications layout'
  ]
}

const TechnicalFocusedMeta = {
  name: 'Technical Focused',
  description:
    'A developer-friendly format with monospace fonts and technical styling. Best for software engineers and IT professionals.',
  features: [
    'Monospace typography (Consolas)',
    'Command-line style section headers',
    'Multi-column skills display',
    'Technical project details',
    'GitHub and link integration'
  ]
}

const ATSOptimizedMeta = {
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

export const AcademicStyleMeta = {
  name: 'Academic Style',
  description:
    'A scholarly CV-inspired format with serif typography and detailed sections. Suitable for researchers, educators, and academic positions.',
  features: [
    'Serif typography (Times New Roman)',
    'Centered header with contact info',
    'Detailed project descriptions',
    'Technical proficiencies section',
    'Justified text alignment'
  ]
}

export const templates = [
  {
    id: 'classic',
    name: ClassicProfessionalMeta.name,
    description: ClassicProfessionalMeta.description,
    features: ClassicProfessionalMeta.features,
    component: ClassicProfessional,
    thumbnail: ClassicImage
  },
  {
    id: 'modern',
    name: ModernMinimalistMeta.name,
    description: ModernMinimalistMeta.description,
    features: ModernMinimalistMeta.features,
    component: ModernMinimalist,
    thumbnail: ModernImage
  },
  {
    id: 'executive',
    name: ExecutiveSummaryMeta.name,
    description: ExecutiveSummaryMeta.description,
    features: ExecutiveSummaryMeta.features,
    component: ExecutiveSummary,
    thumbnail: ExecutiveImage
  },
  {
    id: 'technical',
    name: TechnicalFocusedMeta.name,
    description: TechnicalFocusedMeta.description,
    features: TechnicalFocusedMeta.features,
    component: TechnicalFocused,
    thumbnail: TechnicalImage
  },
  {
    id: 'academic',
    name: AcademicStyleMeta.name,
    description: AcademicStyleMeta.description,
    features: AcademicStyleMeta.features,
    component: AcademicStyle,
    thumbnail: AcademicImage
  },
  {
    id: 'ats',
    name: ATSOptimizedMeta.name,
    description: ATSOptimizedMeta.description,
    features: ATSOptimizedMeta.features,
    component: ATSOptimized,
    thumbnail: ATSImage
  }
]

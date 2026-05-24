import AcademicStyle from '../assets/templates/AcademicStyle'
import ATSOptimized from '../assets/templates/ATSOptimized'
import ClassicProfessional from '../assets/templates/ClassicProfessional'
import ExecutiveSummary from '../assets/templates/ExecutiveSummary'
import ModernMinimalist from '../assets/templates/ModernMinimalist'
import TechnicalFocused from '../assets/templates/TechnicalFocused'

import CreativePortfolio from '../assets/templates/CreativePortfolio'
import CompactEfficient from '../assets/templates/CompactEfficient'
import StartupFounder from '../assets/templates/StartupFounder'
import CorporateTraditional from '../assets/templates/CorporateTraditional'
import FreelanceProject from '../assets/templates/FreelanceProject'
import ElegantMinimal from '../assets/templates/ElegantMinimal'

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

const CreativePortfolioMeta = {
  name: 'Creative Portfolio',
  description:
    'A visually engaging resume with gold decorative accents and artistic layout. Perfect for designers, artists, and creative professionals.',
  features: [
    'Gold decorative header and accents',
    'Centered elegant name presentation',
    'Italicized profile section',
    'Ample whitespace for artistic feel',
    'Two-column sidebar for skills and education'
  ]
}

const CompactEfficientMeta = {
  name: 'Compact & Efficient',
  description:
    'An efficient one-page optimized design with tight spacing and compact layout. Ideal for early-career professionals and concise applications.',
  features: [
    'Dense efficient layout for one-page resumes',
    'Right-aligned dates for clean scanning',
    'Vertical sidebar for quick reference',
    'Compact paragraph spacing',
    'Perfect for 1-2 year experience'
  ]
}

const StartupFounderMeta = {
  name: 'Startup & Founder',
  description:
    'An entrepreneur-focused format with metrics, traction, and business storytelling. Designed for founders, startup employees, and venture capital applications.',
  features: [
    'Traction/metrics section for business results',
    'Founder-focused narrative structure',
    'Revenue, users, and growth indicators',
    'Startup-friendly language and tone',
    'Ample space for key achievements'
  ]
}

const CorporateTraditionalMeta = {
  name: 'Corporate Traditional',
  description:
    'A formal business-oriented resume with subtle gray accents and classic corporate hierarchy. Perfect for Fortune 500, banking, consulting, and legal.',
  features: [
    'Deep blue-gray for section titles',
    'Medium gray for company names and dates',
    'Clear corporate hierarchy',
    'Conservative serif typography (Georgia)',
    'Ideal for formal business applications'
  ]
}

const FreelanceProjectMeta = {
  name: 'Freelance & Project-based',
  description:
    'A client-focused design with prominent projects, skills, and rate indicators. Built for freelancers, contractors, consultants, and gig economy professionals.',
  features: [
    'Projects displayed above experience',
    'Dots-bullet project accomplishments',
    'Client-facing language and presentation',
    'Rate and availability section',
    'Services and skills upfront'
  ]
}

const ElegantMinimalMeta = {
  name: 'Elegant & Refined',
  description:
    'A sophisticated minimal resume with serif typography, decorative lines, and refined spacing. For luxury industries, fashion, publishing, and high-end professional services.',
  features: [
    'Centered name with generous letter spacing',
    'Fine lines and decorative borders',
    'Italicized profile and company names',
    'Elegant serif typography (Georgia)',
    'Perfect for luxury and creative premium'
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
  },
  {
    id: 'creative',
    name: CreativePortfolioMeta.name,
    description: CreativePortfolioMeta.description,
    features: CreativePortfolioMeta.features,
    component: CreativePortfolio,
    thumbnail: ModernImage
  },
  {
    id: 'compact',
    name: CompactEfficientMeta.name,
    description: CompactEfficientMeta.description,
    features: CompactEfficientMeta.features,
    component: CompactEfficient,
    thumbnail: ATSImage
  },
  {
    id: 'startup',
    name: StartupFounderMeta.name,
    description: StartupFounderMeta.description,
    features: StartupFounderMeta.features,
    component: StartupFounder,
    thumbnail: ExecutiveImage
  },
  {
    id: 'corporate',
    name: CorporateTraditionalMeta.name,
    description: CorporateTraditionalMeta.description,
    features: CorporateTraditionalMeta.features,
    component: CorporateTraditional,
    thumbnail: ClassicImage
  },
  {
    id: 'freelance',
    name: FreelanceProjectMeta.name,
    description: FreelanceProjectMeta.description,
    features: FreelanceProjectMeta.features,
    component: FreelanceProject,
    thumbnail: TechnicalImage
  },
  {
    id: 'elegant',
    name: ElegantMinimalMeta.name,
    description: ElegantMinimalMeta.description,
    features: ElegantMinimalMeta.features,
    component: ElegantMinimal,
    thumbnail: AcademicImage
  }
]

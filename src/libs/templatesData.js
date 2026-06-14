import AcademicStyle from '../assets/templates/AcademicStyle'
import ATSOptimized from '../assets/templates/ATSOptimized'
import ClassicProfessional from '../assets/templates/ClassicProfessional'
import ExecutiveSummary from '../assets/templates/ExecutiveSummary'
import ModernMinimalist from '../assets/templates/ModernMinimalist'
import TechnicalFocused from '../assets/templates/TechnicalFocused'

import CreativePortfolio from '../assets/templates/CreativePortfolio'
import CompactLayout from '../assets/templates/CompactLayout'
import StartupBold from '../assets/templates/StartupFounder'
import CorporateStandard from '../assets/templates/CorporateTraditional'
import FreelancePortfolio from '../assets/templates/FreelancePortfolio'
import ElegantMinimal from '../assets/templates/ElegantMinimal'

import MilitaryTransition from '../assets/templates/MilitaryTransition'
import SalesMarketing from '../assets/templates/SalesMarketing'
import HealthcareProfessional from '../assets/templates/HealthcareProfessional'
import DesignPortfolio from '../assets/templates/DesignPortfolio'
import GraduateEntryLevel from '../assets/templates/GraduateEntryLevel'
import InternationalCV from '../assets/templates/InternationalCV'
import BoldStatement from '../assets/templates/BoldStatement'
import SidebarTwoColumn from '../assets/templates/SidebarTwoColumn'

import ClassicImage from '../assets/templates/images/Professional.png'
import ModernImage from '../assets/templates/images/ModernMinimalist.png'
import ExecutiveImage from '../assets/templates/images/Executive.png'
import ATSImage from '../assets/templates/images/ATSOptimized.png'
import AcademicImage from '../assets/templates/images/Academic.png'
import TechnicalImage from '../assets/templates/images/Technical.png'
import CompactEfficientImage from '../assets/templates/images/CompactEfficient.png'
import ElegantMinimalImage from '../assets/templates/images/Elegant&Refined.png'

import FreelancePortfolioImage from '../assets/templates/images/Freelance&Project.png'
import MilitaryTransitionImage from '../assets/templates/images/MilitaryVeteran.png'
import SalesMarketingImage from '../assets/templates/images/Sales&Marketing.png'
import HealthcareProfessionalImage from '../assets/templates/images/Healthcare&Medical.png'
import DesignPortfolioImage from '../assets/templates/images/DesignPortfolio.png'

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

const CompactLayoutMeta = {
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

const StartupBoldMeta = {
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

const CorporateStandardMeta = {
  name: 'Corporate Traditional',
  description:
    'A formal business-oriented resume with subtle blue accents and classic corporate hierarchy. Perfect for Fortune 500, banking, consulting, and legal.',
  features: [
    'Deep blue for section titles',
    'Medium blue for company names and links',
    'Clear corporate hierarchy',
    'Conservative serif typography (Georgia)',
    'Ideal for formal business applications'
  ]
}

const FreelancePortfolioMeta = {
  name: 'Freelance & Project-based',
  description:
    'A client-focused design with prominent projects, skills, and availability indicators. Built for freelancers, contractors, consultants, and gig economy professionals.',
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

const MilitaryTransitionMeta = {
  name: 'Military & Veteran',
  description:
    'A structured, achievement-focused resume designed for military personnel transitioning to civilian careers. Emphasizes leadership, discipline, and quantifiable accomplishments.',
  features: [
    'Bold structured layout with navy/red accents',
    'Key achievements prominently featured',
    'Military-to-civilian language translation ready',
    'Certifications and training highlighted',
    'Leadership-focused section organization'
  ]
}

const SalesMarketingMeta = {
  name: 'Sales & Marketing',
  description:
    'A results-oriented resume with metrics emphasis, perfect for sales professionals, marketers, and business development roles. Highlights revenue, growth, and campaign success.',
  features: [
    'Green/emerald accent for growth symbolism',
    'Results-driven with metrics focus',
    'Campaigns and projects prominently featured',
    'Professional yet energetic tone',
    'Perfect for showcasing quotas and KPIs'
  ]
}

const HealthcareProfessionalMeta = {
  name: 'Healthcare & Medical',
  description:
    'A clean, professional resume designed for doctors, nurses, pharmacists, and healthcare administrators. Emphasizes licenses, certifications, and clinical experience.',
  features: [
    'Teal/medical blue professional accents',
    'Licenses and certifications prioritized',
    'Clinical experience structured for clarity',
    'Patient-focused and results-driven',
    'Perfect for medical and healthcare roles'
  ]
}

const DesignPortfolioMeta = {
  name: 'Design Portfolio',
  description:
    'A visual-focused resume for UI/UX designers, graphic designers, and creative professionals. Features bold typography, color accents, and project showcase layout.',
  features: [
    'Pink/rose accent for creative energy',
    'Portfolio projects in grid layout',
    'Dark theme with bold typography',
    'Design tools and skills highlighted',
    'Perfect for creative and design roles'
  ]
}

const GraduateEntryLevelMeta = {
  name: 'Graduate & Entry-level',
  description:
    'An education-first resume designed for recent graduates, students, and entry-level professionals. Prioritizes education, projects, and internships over work experience.',
  features: [
    'Orange/energetic accent for ambition',
    'Education section prioritized',
    'Academic projects prominently featured',
    'Internships and part-time experience',
    'Skills and certifications highlighted'
  ]
}

const InternationalCVMeta = {
  name: 'International CV',
  description:
    'A European-style CV format with sidebar layout, photo placeholder, and detailed chronological presentation. Ideal for international applications and global companies.',
  features: [
    'Left sidebar with contact info and skills',
    'Photo placeholder for visual presence',
    'Teal/global professional accents',
    'Chronological experience focus',
    'Perfect for international job applications'
  ]
}

const BoldStatementMeta = {
  name: 'Bold Statement',
  description:
    'An eye-catching, high-impact resume designed for creative industries where standing out matters. Features dark themes, bold typography, and numbered sections.',
  features: [
    'Red/black bold contrasting colors',
    'Numbered sections for visual hierarchy',
    'Dark theme with accent highlights',
    'High-energy, attention-grabbing layout',
    'Perfect for creative and standout applications'
  ]
}

const SidebarTwoColumnMeta = {
  name: 'Sidebar Two-column',
  description:
    'A classic two-column layout with permanent sidebar for contact information, skills, and education. Clean, professional, and easy to scan.',
  features: [
    'Permanent left sidebar navigation',
    'Blue/light blue professional palette',
    'Contact info always visible',
    'Skills and education in sidebar',
    'Classic, proven resume structure'
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
    thumbnail: DesignPortfolioImage
  },
  {
    id: 'compact',
    name: CompactLayoutMeta.name,
    description: CompactLayoutMeta.description,
    features: CompactLayoutMeta.features,
    component: CompactLayout,
    thumbnail: CompactEfficientImage
  },
  {
    id: 'startup',
    name: StartupBoldMeta.name,
    description: StartupBoldMeta.description,
    features: StartupBoldMeta.features,
    component: StartupBold,
    thumbnail: CompactEfficientImage
  },
  {
    id: 'corporate',
    name: CorporateStandardMeta.name,
    description: CorporateStandardMeta.description,
    features: CorporateStandardMeta.features,
    component: CorporateStandard,
    thumbnail: CompactEfficientImage
  },
  {
    id: 'freelance',
    name: FreelancePortfolioMeta.name,
    description: FreelancePortfolioMeta.description,
    features: FreelancePortfolioMeta.features,
    component: FreelancePortfolio,
    thumbnail: FreelancePortfolioImage
  },
  {
    id: 'elegant',
    name: ElegantMinimalMeta.name,
    description: ElegantMinimalMeta.description,
    features: ElegantMinimalMeta.features,
    component: ElegantMinimal,
    thumbnail: ElegantMinimalImage
  },
  {
    id: 'military',
    name: MilitaryTransitionMeta.name,
    description: MilitaryTransitionMeta.description,
    features: MilitaryTransitionMeta.features,
    component: MilitaryTransition,
    thumbnail: MilitaryTransitionImage
  },
  {
    id: 'sales',
    name: SalesMarketingMeta.name,
    description: SalesMarketingMeta.description,
    features: SalesMarketingMeta.features,
    component: SalesMarketing,
    thumbnail: SalesMarketingImage
  },
  {
    id: 'healthcare',
    name: HealthcareProfessionalMeta.name,
    description: HealthcareProfessionalMeta.description,
    features: HealthcareProfessionalMeta.features,
    component: HealthcareProfessional,
    thumbnail: HealthcareProfessionalImage
  },
  {
    id: 'design',
    name: DesignPortfolioMeta.name,
    description: DesignPortfolioMeta.description,
    features: DesignPortfolioMeta.features,
    component: DesignPortfolio,
    thumbnail: DesignPortfolioImage
  },
  {
    id: 'graduate',
    name: GraduateEntryLevelMeta.name,
    description: GraduateEntryLevelMeta.description,
    features: GraduateEntryLevelMeta.features,
    component: GraduateEntryLevel,
    thumbnail: DesignPortfolioImage
  },
  {
    id: 'international',
    name: InternationalCVMeta.name,
    description: InternationalCVMeta.description,
    features: InternationalCVMeta.features,
    component: InternationalCV,
    thumbnail: DesignPortfolioImage
  },
  {
    id: 'bold',
    name: BoldStatementMeta.name,
    description: BoldStatementMeta.description,
    features: BoldStatementMeta.features,
    component: BoldStatement,
    thumbnail: DesignPortfolioImage
  },
  {
    id: 'sidebar',
    name: SidebarTwoColumnMeta.name,
    description: SidebarTwoColumnMeta.description,
    features: SidebarTwoColumnMeta.features,
    component: SidebarTwoColumn,
    thumbnail: DesignPortfolioImage
  }
]

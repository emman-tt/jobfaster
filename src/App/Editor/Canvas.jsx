import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ZoomIn, ZoomOut, RotateCcw, Layout } from 'lucide-react'
import { setShowTemplates } from '../../store/modalSlice'
import TemplateSelector from './TemplateSelector'
import ClassicProfessional from '../../assets/templates/ClassicProfessional'
import ModernMinimalist from '../../assets/templates/ModernMinimalist'
import ExecutiveSummary from '../../assets/templates/ExecutiveSummary'
import TechnicalFocused from '../../assets/templates/TechnicalFocused'
import AcademicStyle from '../../assets/templates/AcademicStyle'
import ATSOptimized from '../../assets/templates/ATSOptimized'

const templateComponents = {
  classic: ClassicProfessional,
  modern: ModernMinimalist,
  executive: ExecutiveSummary,
  technical: TechnicalFocused,
  academic: AcademicStyle,
  ats: ATSOptimized
}
const getTypeScale = base => ({
  name: base * 2.4,
  sectionHead: base * 1.3,
  jobTitle: base * 1.1,
  body: base * 1.0,
  subtle: base * 0.9
})

// getTypeScale(11) → {
//   name: 26.4,
//   sectionHead: 14.3,
//   jobTitle: 12.1,
//   body: 11,
//   subtle: 9.9
// }

// User picks 10pt base
//        ↓
// System calculates everything else automatically

// Name          → base × 2.4  = 24pt
// Section heads → base × 1.3  = 13pt
// Job title     → base × 1.1  = 11pt
// Body/bullets  → base × 1.0  = 10pt  ← base
// Dates/location → base × 0.9 = 9pt

export default function Canvas () {
  const dispatch = useDispatch()
  const [scale, setScale] = useState(50)
  const [position, setPosition] = useState({ x: 50, y: 0 })
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const elementRef = useRef(null)

  const handleMouseDown = e => {
    isDragging.current = true
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  const handleMouseMove = e => {
    if (!isDragging.current) return
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    })
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const zoomIn = () => setScale(s => Math.min(s + 10, 200))
  const zoomOut = () => setScale(s => Math.max(s - 10, 30))
  const resetView = () => {
    setScale(50)
    setPosition({ x: 50, y: 0 })
  }

  return (
    <section className='relative w-full z-30 grow h-full flex items-center justify-center overflow-hidden'>
      <div
        ref={elementRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${
            scale / 100
          })`
        }}
        className='origin-center cursor-grab active:cursor-grabbing'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Preview selectedTemplate={selectedTemplate} />
      </div>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/40 shadow-lg'>
        <button
          onClick={() => dispatch(setShowTemplates(true))}
          className='p-1.5 cursor-pointer rounded-lg transition-colors text-white hover:bg-white/20'
          title='Change Template'
        >
          <Layout size={18} />
        </button>

        <div className='w-px h-5 bg-gray-300/50' />

        <button
          onClick={zoomOut}
          className='p-1.5 cursor-pointer rounded-lg transition-colors text-white hover:bg-white/20'
        >
          <ZoomOut size={18} />
        </button>

        <span className='w-14 cursor-pointer text-center text-sm font-semibold font-satoshi text-white'>
          {scale}%
        </span>

        <button
          onClick={zoomIn}
          className='p-1.5 cursor-pointer rounded-lg transition-colors text-white hover:bg-white/20'
        >
          <ZoomIn size={18} />
        </button>

        <div className='w-px h-5 bg-gray-300/50 mx-1' />

        <button
          onClick={resetView}
          className='p-1.5 cursor-pointer rounded-lg transition-colors text-white hover:bg-white/20'
          title='Reset'
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <TemplateSelector
        isOpen={useSelector(state => state.modal.showTemplates)}
        onClose={() => dispatch(setShowTemplates(false))}
        onSelect={setSelectedTemplate}
        selectedTemplate={selectedTemplate}
      />
    </section>
  )
}

function Preview ({ selectedTemplate }) {
  const personal = useSelector(state => state.personal)
  const work = useSelector(state => state.work)
  const education = useSelector(state => state.education)
  const credentials = useSelector(state => state.credentials)

  const SelectedTemplate =
    templateComponents[selectedTemplate] || ClassicProfessional

  const userData = {
    name: personal.contactDetails.fullName,
    email: personal.contactDetails.email,
    phone: personal.contactDetails.phone,
    location: personal.contactDetails.location,
    jobTitle: personal.contactDetails.jobTitle,
    onlineLinks: personal.onlineLinks,
    summary: personal.summary,
    experience: work.experiences
      .filter(exp => exp.company || exp.position)
      .map(exp => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startYear: exp.startYear,
        endYear: exp.endYear,
        accomplishments: exp.accomplishments
          .filter(acc => acc.text)
          .map(acc => acc.text)
      })),
    education: education.educations
      .filter(edu => edu.school || edu.degree)
      .map(edu => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        field: edu.field,
        startYear: edu.startYear,
        endYear: edu.endYear,
        highlights: edu.highlights.filter(h => h.text).map(h => h.text)
      })),
    skills: credentials.skills.flatMap(skill => skill.list || []),
    languages: education.languages
      .filter(lang => lang.language)
      .map(lang => ({
        name: lang.language,
        proficiency: lang.proficiency
      })),
    projects: work.projects
      .filter(proj => proj.name || proj.description)
      .map(proj => ({
        id: proj.id,
        name: proj.name,
        description: proj.description,
        techStack: proj.techStack.filter(t => t.name).map(t => t.name),
        link: proj.link,
        github: proj.github
      })),
    certificates: credentials.certifications
      .filter(cert => cert.name)
      .map(cert => ({
        name: cert.name,
        issuer: cert.organization,
        year: cert.year
      })),
    achievements: credentials.achievements
      .filter(ach => ach.achievement)
      .map(ach => ach.achievement)
  }

  return (
    <section className='bg-white rounded-xl w-[210mm] h-[297mm] shadow-2xl p-12'>
      <SelectedTemplate data={userData} />
    </section>
  )
}

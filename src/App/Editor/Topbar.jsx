import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  FileDown,
  Link2,
  Trash2,
  LayoutTemplate,
  CircleArrowDown
} from 'lucide-react'
import { toggleModals } from '../../store/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Menubar from './Menubar'
import ExportMenu from './ExportMenu'
import { exportToPDF, exportToDOCX } from '../../services/export.jsx'
import { toast } from 'sonner'

export function Topbar () {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [menuBar, showMenuBar] = useState(false)
  const dispatch = useDispatch()

  const personal = useSelector(state => state.personal)
  const work = useSelector(state => state.work)
  const education = useSelector(state => state.education)
  const credentials = useSelector(state => state.credentials)

  function handleBack () {
    navigate('/dashboard')
  }

  function handleSave () {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  async function handleExport (format) {
    const resumeData = {
      name: personal.contactDetails.fullName,
      email: personal.contactDetails.email,
      phone: personal.contactDetails.phone,
      location: personal.contactDetails.location,
      jobTitle: personal.contactDetails.jobTitle,
      linkedin: personal.onlineLinks?.linkedin || '',
      summary: personal.summary,
      experience: work.experiences
        .filter(exp => exp.company || exp.position)
        .map(exp => ({
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

    setShowExportMenu(false)

    if (format === 'pdf') {
      const success = await exportToPDF(
        resumeData,
        personal.contactDetails.fullName || 'resume'
      )
      if (success) {
        toast.success('PDF exported successfully')
      } else {
        toast.error('Failed to export PDF')
      }
    } else if (format === 'docx') {
      const success = await exportToDOCX(
        resumeData,
        personal.contactDetails.fullName || 'resume'
      )
      if (success) {
        toast.success('DOCX exported successfully')
      } else {
        toast.error('DOCX export coming soon')
      }
    }
  }

  function handleShare () {
    console.log('Share clicked')
  }

  function handleDelete () {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      console.log('Delete confirmed')
    }
  }

  function showTemplates () {
    dispatch(toggleModals('showTemplates'))
  }

  return (
    <>
      <header className='bg-white border-b border-gray-200 px-4 py-2'>
        <div className='flex items-center relative justify-between'>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleBack}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-700 hover:bg-gray-100 font-medium text-sm transition-colors font-satoshi'
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button
              onClick={() => showMenuBar(e => !e)}
              className='flex cursor-pointer items-center gap-1.5 px-5 py-1.5 rounded-full bg-gray-100 hover:bg-[#fd9155]  font-medium transition-all    active:scale-95 disabled:opacity-50 font-IBM'
            >
              <CircleArrowDown size={15} />
              <span className=' text-black  text-sm hover:text-white'>
                Typography
              </span>
            </button>
            {menuBar && (
              <div className=' absolute top-full left-0 right-0 mt-5  w-120 z-100 '>
                <Menubar />
              </div>
            )}
          </div>

          <div className='flex items-center gap-1.5'>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-full  text-black cursor-pointer font-medium text-sm transition-all  active:scale-95 disabled:opacity-50 font-satoshi'
            >
              <Save size={15} />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>

            <button
              onClick={() => showTemplates()}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-all font-satoshi text-gray-700 hover:bg-gray-200'
            >
              <LayoutTemplate size={15} />
              <span>Templates</span>
            </button>

            <div className='relative'>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-700 hover:bg-gray-100 font-medium text-sm transition-colors font-satoshi'
              >
                <FileDown size={15} />
                <span>Export</span>
              </button>
              {showExportMenu && (
                <div className='absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50'>
                  <ExportMenu onExport={handleExport} />
                </div>
              )}
            </div>

            <div className='w-px h-8 bg-gray-200 mx-1' />

            <button
              onClick={handleShare}
              className='p-1.5 rounded-full text-gray-700 hover:bg-gray-100 transition-colors'
              title='Share'
            >
              <Link2 size={15} />
            </button>

            <button
              onClick={handleDelete}
              className='p-1.5 rounded-full text-red-500 hover:bg-red-50 transition-colors'
              title='Delete'
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

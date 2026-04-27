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
import { saveResumeFromHTML } from '../../services/Program'
import { toast } from 'sonner'

export function Topbar () {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [menuBar, showMenuBar] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [resumeName, setResumeName] = useState('')
  const dispatch = useDispatch()
  const { appearance } = useSelector(state => state.preferences)

  const personal = useSelector(state => state.personal)
  const work = useSelector(state => state.work)
  const education = useSelector(state => state.education)
  const credentials = useSelector(state => state.credentials)

  function handleBack () {
    navigate('/dashboard')
  }

  function handleSave () {
    setResumeName(personal.contactDetails.fullName || '')
    setShowSaveModal(true)
  }

  async function confirmSave () {
    if (!resumeName.trim()) {
      return
    }

    setIsSaving(true)
    setShowSaveModal(false)

    try {
      const previewElement = document.getElementById('resume-preview')
      if (!previewElement) {
        throw new Error('Preview element not found')
      }

      const html = previewElement.outerHTML
      const result = await saveResumeFromHTML(html, resumeName.trim())

      if (result.status === 'success') {
        toast.success('Resume saved successfully')
      } else {
        toast.error(result.message || 'Failed to save resume')
      }
    } catch (error) {
      console.error('Save resume error:', error)
      toast.error('Failed to save resume')
    } finally {
      setIsSaving(false)
    }
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
      <header
        className={`px-4 py-2 ${
          appearance.theme == 'dark'
            ? 'bg-[#2a2a2a]'
            : 'bg-white border-b border-gray-200'
        }`}
      >
        <div className='flex items-center relative justify-between'>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleBack}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-colors font-satoshi ${
                appearance.theme == 'dark'
                  ? 'text-slate-300 hover:bg-slate-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button
              onClick={() => showMenuBar(e => !e)}
              className={`flex cursor-pointer items-center gap-1.5 px-5 py-1.5 rounded-full font-medium transition-all active:scale-95 disabled:opacity-50 font-IBM ${
                appearance.theme == 'dark'
                  ? 'bg-[#202020] hover:bg-[#f17e27] text-white'
                  : 'bg-gray-100 hover:bg-[#fd9155]'
              }`}
            >
              <CircleArrowDown size={15} />
              <span
                className={`text-sm ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                Typography
              </span>
            </button>
            {menuBar && (
              <div className='absolute top-full left-0 right-0 mt-5 w-120 z-100'>
                <Menubar />
              </div>
            )}
          </div>

          <div className='flex items-center gap-1.5'>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer font-medium text-sm transition-all active:scale-95 disabled:opacity-50 font-satoshi ${
                appearance.theme == 'dark'
                  ? 'text-slate-300 hover:bg-slate-700'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              <Save size={15} />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>

            <button
              onClick={() => showTemplates()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-all font-satoshi ${
                appearance.theme == 'dark'
                  ? 'text-slate-300 hover:bg-slate-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <LayoutTemplate size={15} />
              <span>Templates</span>
            </button>

            <div className='relative'>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-colors font-satoshi ${
                  appearance.theme == 'dark'
                    ? 'text-slate-300 hover:bg-slate-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileDown size={15} />
                <span>Export</span>
              </button>
              {showExportMenu && (
                <div
                  className={`absolute top-full right-0 mt-2 w-80 rounded-2xl shadow-lg py-2 z-50 ${
                    appearance.theme == 'dark'
                      ? 'bg-[#2a2a2a]'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <ExportMenu onExport={handleExport} />
                </div>
              )}
            </div>

            <div
              className={`w-px h-8 mx-1 ${
                appearance.theme == 'dark' ? 'bg-slate-700' : 'bg-gray-200'
              }`}
            />

            <button
              onClick={handleShare}
              className={`p-1.5 rounded-full transition-colors ${
                appearance.theme == 'dark'
                  ? 'text-slate-300 hover:bg-slate-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
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

      {showSaveModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/50'
            onClick={() => setShowSaveModal(false)}
          />
          <div
            className={`relative w-80 rounded-2xl shadow-xl p-6 ${
              appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 font-IBM ${
                appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Name your resume
            </h3>
            <input
              type='text'
              value={resumeName}
              onChange={e => setResumeName(e.target.value)}
              placeholder='My Resume'
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border outline-none mb-4 focus:outline-none focus:ring-2 focus:ring-[#f17e27] focus:border-[#f17e27] ${
                appearance.theme == 'dark'
                  ? 'bg-[#1a1a1a] border-slate-600 text-white placeholder:text-slate-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400'
              }`}
              onKeyDown={e => e.key === 'Enter' && confirmSave()}
            />
            <div className='flex gap-3'>
              <button
                onClick={() => setShowSaveModal(false)}
                className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors ${
                  appearance.theme == 'dark'
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                disabled={!resumeName.trim()}
                className='flex-1 px-4 py-2.5 rounded-xl font-medium bg-[#f17e27] text-white hover:bg-[#e16d16] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

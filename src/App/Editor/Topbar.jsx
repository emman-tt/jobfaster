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
import useClickOutside from '../../hooks/useClick'
import Menubar from './Menubar'
import { THEME_COLORS } from './ThemeSelector'
import ExportMenu from './ExportMenu'
import { renderResumeToHTML } from '../../utils/renderResume'
import { saveResumeFromHTML } from '../../services/Program'
import { toast } from 'sonner'

export function Topbar () {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [menuBar, showMenuBar] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [resumeName, setResumeName] = useState('')
  const exportMenuRef = useClickOutside(() => setShowExportMenu(false))
  const menuBarRef = useClickOutside(() => showMenuBar(false))
  const dispatch = useDispatch()
  const { appearance } = useSelector(state => state.preferences)

  const personal = useSelector(state => state.personal)
  const work = useSelector(state => state.work)
  const education = useSelector(state => state.education)
  const credentials = useSelector(state => state.credentials)

  function handleBack () {
    navigate('/dashboard')
  }

  const [savedResumeName, setSavedResumeName] = useState(
    () => localStorage.getItem('editor-resume-name') || ''
  )

  function handleSave () {
    setResumeName(savedResumeName || personal.contactDetails.fullName || '')
    setShowSaveModal(true)
  }

  async function confirmSave () {
    if (!resumeName.trim()) {
      return
    }

    setIsSaving(true)
    setShowSaveModal(false)
    setSavedResumeName(resumeName.trim())
    localStorage.setItem('editor-resume-name', resumeName.trim())

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

  const { font, size, weight, height, theme, contrast, templateId } =
    useSelector(state => state.editor)

  async function handleExport (format) {
    if (format !== 'pdf') {
      toast.error('DOCX export coming soon')
      setShowExportMenu(false)
      return
    }

    setShowExportMenu(false)

    const getTypeScale = base => ({
      name: base * 2.4,
      sectionHead: base * 1.3,
      jobTitle: base * 1.1,
      body: base * 1.0,
      subtle: base * 0.9
    })
    const typeScale = getTypeScale(size || 14)
    const weightMap = {
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold'
    }
    const themeColors =
      THEME_COLORS[theme || 'monochrome'] || THEME_COLORS.monochrome

    const applyContrast = hex => {
      if (!hex) return hex
      const factor = Number(contrast) || 1
      const num = parseInt(hex.replace('#', ''), 16)
      const r = Math.min(
        255,
        Math.max(0, Math.floor(((num >> 16) & 0xff) / factor))
      )
      const g = Math.min(
        255,
        Math.max(0, Math.floor(((num >> 8) & 0xff) / factor))
      )
      const b = Math.min(255, Math.max(0, Math.floor((num & 0xff) / factor)))
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
    }

    const styles = {
      fontFamily: font,
      name: {
        size: typeScale.name,
        weight: weightMap[weight] || 'font-bold',
        style: 'normal',
        case: 'none',
        spacing: 2,
        color: applyContrast(themeColors.name)
      },
      sectionHeader: {
        size: typeScale.sectionHead,
        weight: weightMap[weight] || 'font-bold',
        style: 'normal',
        case: 'uppercase',
        spacing: 1,
        color: applyContrast(themeColors.sectionHeader)
      },
      company: {
        size: typeScale.body,
        weight: weightMap[weight] || 'font-medium',
        style: 'normal',
        case: 'none',
        spacing: 0,
        color: applyContrast(themeColors.company)
      },
      jobTitle: {
        size: typeScale.jobTitle,
        weight: weightMap[weight] || 'font-medium',
        style: 'italic',
        case: 'none',
        spacing: 0,
        color: applyContrast(themeColors.jobTitle)
      },
      bodyText: {
        size: typeScale.body,
        weight: 'font-normal',
        style: 'normal',
        case: 'none',
        spacing: 0,
        leading: height,
        color: applyContrast(themeColors.bodyText)
      },
      date: {
        size: typeScale.subtle,
        weight: 'font-normal',
        style: 'italic',
        case: 'none',
        spacing: 0,
        color: applyContrast(themeColors.date)
      },
      contact: {
        size: typeScale.subtle,
        weight: 'font-normal',
        style: 'normal',
        case: 'none',
        spacing: 0,
        color: applyContrast(themeColors.contact)
      }
    }

    const rawData = {
      personal,
      work,
      education,
      credentials
    }

    try {
      const resumeHTML = await renderResumeToHTML(rawData, templateId, {
        styles
      })
      const fullHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${
        personal.contactDetails.fullName || 'Resume'
      }</title><style>body{margin:0;padding:0;display:flex;justify-content:center;background:#f5f5f5;}@media print{body{background:white;padding:0;}}</style></head><body>${resumeHTML}<script>setTimeout(()=>{window.print()},200)</script></body></html>`
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        toast.error('Please allow popups to export your resume')
        return
      }
      printWindow.document.write(fullHTML)
      printWindow.document.close()
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export resume')
    }
  }

  function handleShare () {
  }

  function handleDelete () {
    if (window.confirm('Are you sure you want to delete this resume?')) {
    }
  }

  function showTemplates () {
    dispatch(toggleModals('showTemplates'))
  }

  return (
    <>
      <header
        className={`px-2 sm:px-4 py-2 ${
          appearance.theme == 'dark'
            ? 'bg-[#2a2a2a] border-b border-white/30'
            : 'bg-white border-b border-gray-200'
        }`}
      >
        <div className='relative  '>
          <div className='flex items-center justify-between overflow-x-auto [scrollbar-width:none] gap-3'>
            <div className='flex items-center gap-2 shrink-0'>
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
            </div>

            <div className='flex items-center gap-1.5 shrink-0'>
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

              <div className='relative shrink-0'>
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

          {menuBar && (
            <div ref={menuBarRef} className='absolute top-full left-0 right-0 mt-5 w-120 max-sm:w-[calc(100vw-2rem)] max-sm:left-2 z-100'>
              <Menubar />
            </div>
          )}

          {showExportMenu && (
            <div ref={exportMenuRef} className='absolute top-full right-0 mt-2 w-80 rounded-2xl shadow-lg py-2 z-50'>
              <ExportMenu onExport={handleExport} />
            </div>
          )}

          {showExportMenu && (
            <div
              ref={exportMenuRef}
              className='absolute top-full right-0 mt-2 w-80 rounded-2xl shadow-lg py-2 z-50'
            >
              <ExportMenu onExport={handleExport} />
            </div>
          )}
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

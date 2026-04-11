import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  Eye,
  FileDown,
  Settings,
  Link2,
  Copy,
  Trash2,
  LayoutTemplate,
  X
} from 'lucide-react'
export function Topbar ({ isPreview, setIsPreview }) {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)

  function handleBack () {
    navigate('/dashboard')
  }

  function handleSave () {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  function handlePreview () {
    setIsPreview(!isPreview)
  }

  function handleExport (format) {
    console.log(`Export as ${format}`)
    setShowExportMenu(false)
  }

  function handleSettings () {
    console.log('Settings clicked')
  }

  function handleShare () {
    console.log('Share clicked')
  }

  function handleDuplicate () {
    console.log('Duplicate clicked')
  }

  function handleDelete () {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      console.log('Delete confirmed')
    }
  }

  return (
    <>
      <header className='bg-white border-b border-gray-200 px-4 py-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleBack}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-700 hover:bg-gray-100 font-[500] text-sm transition-colors font-satoshi'
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          </div>

          <div className='flex items-center gap-1.5'>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fd9155] text-white font-[500] text-sm transition-all hover:bg-[#e8854a] active:scale-95 disabled:opacity-50 font-satoshi'
            >
              <Save size={15} />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>

            <button
              onClick={handlePreview}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-[500] text-sm transition-all font-satoshi ${
                isPreview
                  ? 'bg-[#fd9155] text-white hover:bg-[#e8854a]'
                  : 'text-gray-700 hover:bg-gray-100'
              } active:scale-95`}
            >
              <Eye size={15} />
              <span>Preview</span>
            </button>

            <button
              onClick={() => setShowTemplates(true)}
              className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fd9155] text-white font-[500] text-sm transition-all hover:bg-[#e8854a] active:scale-95 font-satoshi'
            >
              <LayoutTemplate size={15} />
              <span>Templates</span>
            </button>

            <div className='relative'>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-700 hover:bg-gray-100 font-[500] text-sm transition-colors font-satoshi'
              >
                <FileDown size={15} />
                <span>Export</span>
              </button>
              {showExportMenu && (
                <div className='absolute top-full right-0 mt-2 w-40 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50'>
                  <button
                    onClick={() => handleExport('PDF')}
                    className='w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors'
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => handleExport('DOCX')}
                    className='w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors'
                  >
                    DOCX
                  </button>
                  <button
                    onClick={() => handleExport('Copy')}
                    className='w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors'
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>

            <div className='w-px h-8 bg-gray-200 mx-1' />

            <button
              onClick={handleSettings}
              className='p-1.5 rounded-full text-gray-700 hover:bg-gray-100 transition-colors'
              title='Settings'
            >
              <Settings size={15} />
            </button>

            <button
              onClick={handleShare}
              className='p-1.5 rounded-full text-gray-700 hover:bg-gray-100 transition-colors'
              title='Share'
            >
              <Link2 size={15} />
            </button>

            <button
              onClick={handleDuplicate}
              className='p-1.5 rounded-full text-gray-700 hover:bg-gray-100 transition-colors'
              title='Duplicate'
            >
              <Copy size={15} />
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
      {showTemplates && (
        <TemplatesPanel onClose={() => setShowTemplates(false)} />
      )}
    </>
  )
}

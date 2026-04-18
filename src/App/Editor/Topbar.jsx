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
  X,
  CircleArrowDown
} from 'lucide-react'
import { toggleModals } from '../../store/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Menubar from './Menubar'
import { togglePreview } from '../../store/editorSlice'
export function Topbar ({ isPreview, setIsPreview }) {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [menuBar, showMenuBar] = useState(false)
  const { modals } = useSelector(state => state.modal)
  const dispatch = useDispatch()

  function handleBack () {
    navigate('/dashboard')
  }

  function handleSave () {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  function handlePreview () {
    dispatch(togglePreview())
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

            <div className='flex items-center  rounded-full p-1 gap-1'>
              <button
                onClick={handlePreview}
                className={`flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-full 
                  font-medium text-sm transition-all font-satoshi `}
              >
                <Eye size={15} />
                <span>Preview</span>
              </button>

              <button
                onClick={() => showTemplates()}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-all font-satoshi text-gray-700 hover:bg-gray-200'
              >
                <LayoutTemplate size={15} />
                <span>Templates</span>
              </button>
            </div>

            <div className='relative'>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-700 hover:bg-gray-100 font-medium text-sm transition-colors font-satoshi'
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

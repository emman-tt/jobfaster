import React, { useState } from 'react'
import {
  FileText,
  Folder,
  File,
  Image as ImageIcon,
  MoreVertical,
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
  ChevronRight
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
import UploadResume from './UploadResume'
import Upload from '../../../../services/ai'
import { saveCorrections } from '../../../../store/aiSlice'
import { toggleNotification } from '../../../../store/notificationSlice'
import { useNavigate } from 'react-router-dom'
import { GetFileIcon } from '../../../../components/getFileIcon'

export default function SelectResume () {
  const [activeTab, setActiveTab] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const [uploadedFile, setUploadedFile] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { programs } = useSelector(state => state.files)

  const closeModal = () => {
    dispatch(toggleModals('selectResume'))
  }

  function navigateNext () {
    if (activeTab === 'upload') {
      if (!uploadedFile || !uploadedFile.file) {
        return console.log('no file exists')
      }

      dispatch(toggleNotification({ category: 'tailor', value: true }))
      const formData = new FormData()
      formData.append('file', uploadedFile.file)
      Upload(formData).then(result => {
        if (result) {
          dispatch(saveCorrections(result))
          navigate('/correction')
        }
      })
    } else {
      console.log(
        'Selecting resume:',
        activeTab === 'recent' ? 'from recent' : 'from all'
      )
      closeModal()
    }
  }

  const getRecentFiles = (programs, limit = 5) => {
    const allFiles = []
    programs.forEach(item => {
      if (item.type === 'file') {
        allFiles.push(item)
      } else if (item.type === 'folder' && item.files) {
        allFiles.push(...item.files)
      }
    })

    return allFiles
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
  }
  const getAllFiles = programs => {
    const allFiles = []
    programs.forEach(item => {
      if (item.type === 'file') {
        allFiles.push(item)
      } else if (item.type === 'folder' && item.files) {
        allFiles.push(...item.files)
      }
    })

    return allFiles
    // .sort(
    //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    // )
  }

  const filteredRecent = getRecentFiles(programs).filter(resume =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredAll = getAllFiles(programs).filter(resume =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden font-satoshi min-h-135 border border-gray-100 z-50'>
      <div className='p-6'>
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-slate-900 font-IBM'>
            Select Resume
          </h2>
          <button
            onClick={closeModal}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <X className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        {/* Toggle */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex bg-gray-100 p-1 rounded-full gap-1'>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'upload'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-500 hover:text-slate-700'
              }`}
            >
              New Upload
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'recent'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-500 hover:text-slate-700'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-500 hover:text-slate-700'
              }`}
            >
              All
            </button>
          </div>
          <button className='p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors'>
            <SlidersHorizontal className='w-5 h-5 text-gray-600' />
          </button>
        </div>

        {/* Search Bar */}
        {activeTab !== 'upload' && (
          <div className='relative '>
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Search resumes...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
            />
          </div>
        )}
      </div>

      {/* Active View */}

      {activeTab == 'recent' ? (
        <RecentFiles filteredRecent={filteredRecent} />
      ) : activeTab == 'all' ? (
        <AllFiles filteredAll={filteredAll} />
      ) : (
        <UploadResume file={uploadedFile} setFile={setUploadedFile} />
      )}

      {/* Footer */}
      <div className='p-6 py-2 border-t border-gray-100 flex justify-between items-center bg-gray-50/50'>
        <button
          onClick={closeModal}
          className='px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors'
        >
          Cancel
        </button>
        <button
          onClick={navigateNext}
          className='px-8 py-2.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-2xl shadow-lg shadow-orange-200 transition-all flex items-center gap-2 group transform active:scale-95'
        >
          Continue
          <ChevronRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
        </button>
      </div>
    </div>
  )
}

function RecentFiles ({ filteredRecent }) {
  return (
    <div className='space-y-1 max-h-60 py-5  overflow-y-auto px-1 [scrollbar-width:thin]'>
      {filteredRecent.length > 0 ? (
        filteredRecent.map(resume => (
          <div
            key={resume.id}
            className='group flex items-center justify-between p-3 py-4 rounded-2xl hover:bg-slate-50 border-b border-gray-50 last:border-0 transition-all cursor-pointer'
          >
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-white border  transition-all'>
                {<GetFileIcon extension={resume.extension} />}
              </div>
              <div>
                <h3 className='text-sm font-bold text-slate-900 truncate max-w-45'>
                  {resume.name}
                </h3>
                <p className='text-[11px] text-gray-500 font-medium'>
                  {resume.time}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              {resume.status === 'error' ? (
                <div className='flex items-center gap-2'>
                  <RotateCcw className='w-4 h-4 text-red-500 cursor-pointer hover:rotate-45 transition-transform' />
                  <div className='px-2 py-0.5 border border-red-200 bg-red-50 text-red-600 text-[10px] font-bold rounded flex items-center'>
                    Error
                  </div>
                </div>
              ) : (
                <div className='px-2 py-1 border border-gray-200 text-gray-600 text-[10px] font-bold rounded bg-white'>
                  {resume.size}
                </div>
              )}
              <button className='p-1 hover:bg-gray-200 rounded-lg transition-colors'>
                <MoreVertical className='w-4 h-4 text-gray-400' />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center py-10'>
          <p className='text-gray-400 text-sm'>No resumes found</p>
        </div>
      )}
    </div>
  )
}

function AllFiles ({ filteredAll }) {
  return (
    <div className='space-y-1 max-h-60 py-5 overflow-y-auto px-1 [scrollbar-width:thin]'>
      {filteredAll.length > 0 ? (
        filteredAll.map(resume => (
          <div
            key={resume.id}
            className='group flex items-center justify-between p-3 py-4 rounded-2xl hover:bg-slate-50 border-b border-gray-50 last:border-0 transition-all cursor-pointer'
          >
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-white border  transition-all'>
                {<GetFileIcon extension={resume.extension} />}
              </div>
              <div>
                <h3 className='text-sm font-bold text-slate-900 truncate max-w-45'>
                  {resume.name}
                </h3>
                <p className='text-[11px] text-gray-500 font-medium'>
                  {resume.time}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              {resume.status === 'error' ? (
                <div className='flex items-center gap-2'>
                  <RotateCcw className='w-4 h-4 text-red-500 cursor-pointer hover:rotate-45 transition-transform' />
                  <div className='px-2 py-0.5 border border-red-200 bg-red-50 text-red-600 text-[10px] font-bold rounded flex items-center'>
                    Error
                  </div>
                </div>
              ) : (
                <div className='px-2 py-1 border border-gray-200 text-gray-600 text-[10px] font-bold rounded bg-white'>
                  {resume.size}
                </div>
              )}
              <button className='p-1 hover:bg-gray-200 rounded-lg transition-colors'>
                <MoreVertical className='w-4 h-4 text-gray-400' />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center py-10'>
          <p className='text-gray-400 text-sm'>No resumes found</p>
        </div>
      )}
    </div>
  )
}

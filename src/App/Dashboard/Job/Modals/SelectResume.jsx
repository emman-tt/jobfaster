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
import { toggleNotification } from '../../../../store/notificationSlice'
import { GetFileIcon } from '../../../../components/getFileIcon'
import { sendMessage } from '../../../../services/useSocket'

import { useQuery } from '@tanstack/react-query'
import { FetchPrograms } from '../../../../services/Program'

export default function SelectResume () {
  const [activeTab, setActiveTab] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const { appearance } = useSelector(state => state.preferences)
  const { job } = useSelector(state => state.ai)
  const [selected, setSelected] = useState(null)

  const closeModal = () => {
    dispatch(toggleModals('selectResume'))
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program'],
    queryFn: () => FetchPrograms(),
    staleTime: 3 * 60 * 1000
  })

  const programs = data?.data
  function navigateNext () {
    if (!selected) {
      return console.log('nothing selected')
    }

    const preparedData = {
      resume: selected.metaData,
      jobDescription: job.description,
      tone: job.tone,
      includeCoverLetter: job.includeCoverLetter,
      hiringEmail: job.email
    }

    if (selected.source == 'upload') {
      sendMessage('JOB_APPLY', preparedData)
      closeModal()
      return
    }

    closeModal()
  }

  const getAllFiles = programs => {
    const allFiles = []
    programs?.forEach(item => {
      if (item?.type.toLowerCase() === 'file') {
        allFiles.push(item.file)
      } else if (item?.type.toLowerCase() === 'folder' && item.files) {
        allFiles.push(...item.folder.files)
      }
    })

    return allFiles
  }
  const getRecentFiles = (programs, limit = 5) => {
    const allFiles = []
    programs?.forEach(item => {
      if (item?.type.toLowerCase() === 'file') {
        allFiles.push(item.file)
      } else if (item?.type.toLowerCase() === 'folder' && item.files) {
        allFiles.push(...item.folder.files)
      }
    })

    return allFiles
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
  }

  const filteredRecent = getRecentFiles(programs).filter(resume =>
    resume?.metaData?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const filteredAll = getAllFiles(programs).filter(resume =>
    resume?.metaData?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-between flex-col  max-w-lg rounded-3xl shadow-2xl overflow-hidden font-satoshi min-h-135 h-135 z-50 ${
        appearance.theme == 'dark'
          ? 'bg-[#2a2a2a] border border-slate-700'
          : 'bg-white border border-gray-100'
      }`}
    >
      <div className='p-6 '>
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h2
            className={`text-xl font-bold font-IBM ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Select Resume
          </h2>
          <button
            onClick={closeModal}
            className={`p-2 rounded-full transition-colors ${
              appearance.theme == 'dark'
                ? 'hover:bg-slate-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <X
              className={`w-5 h-5 ${
                appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}
            />
          </button>
        </div>

        {/* Toggle */}
        <div className='flex items-center justify-between mb-6'>
          <div
            className={`flex p-1 rounded-full gap-1 ${
              appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-gray-100'
            }`}
          >
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'recent'
                  ? 'bg-[#f17e27] text-white'
                  : appearance.theme == 'dark'
                  ? 'text-slate-400 hover:text-white'
                  : 'text-gray-500 hover:text-slate-700'
              }`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#f17e27] text-white'
                  : appearance.theme == 'dark'
                  ? 'text-slate-400 hover:text-white'
                  : 'text-gray-500 hover:text-slate-700'
              }`}
            >
              All
            </button>
          </div>
          <button
            className={`p-2 border rounded-full transition-colors ${
              appearance.theme == 'dark'
                ? 'border-slate-700 hover:bg-slate-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal
              className={`w-5 h-5 ${
                appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-600'
              }`}
            />
          </button>
        </div>

        {/* Search Bar */}
        {activeTab !== 'upload' && (
          <div className='relative'>
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                appearance.theme == 'dark' ? 'text-slate-500' : 'text-gray-400'
              }`}
            />
            <input
              type='text'
              placeholder='Search resumes...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 border rounded-2xl outline-none transition-all text-sm font-medium ${
                appearance.theme == 'dark'
                  ? 'bg-[#202020] border-slate-700 text-white placeholder:text-slate-500'
                  : 'bg-gray-50 border-transparent focus:border-orange-400 focus:bg-white'
              }`}
            />
          </div>
        )}
      </div>

      {/* Main View */}
      <div className=' h-full  '>
        {isLoading || isFetching ? (
          <div>Loading ..</div>
        ) : (
          <Files
            selected={selected}
            setSelected={setSelected}
            data={activeTab == 'recent' ? filteredRecent : filteredAll}
          />
        )}
      </div>
      {/* Footer */}
      <div
        className={`p-6 py-4  border-t flex justify-between items-center ${
          appearance.theme == 'dark'
            ? 'border-slate-700 bg-[#202020]'
            : 'border-gray-100 bg-gray-50/50'
        }`}
      >
        <button
          onClick={closeModal}
          className={`px-6 py-2.5 text-sm font-bold transition-colors ${
            appearance.theme == 'dark'
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-500 hover:text-slate-700'
          }`}
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

function Files ({ data, setSelected, selected }) {
  const { appearance } = useSelector(state => state.preferences)
  return (
    <div className='space-y-1 max-h-60 py-0  overflow-y-auto px-1 [scrollbar-width:thin]'>
      {data.length > 0 ? (
        data.map(resume => (
          <div
            key={resume.id}
            onClick={() => {
              setSelected(resume)
            }}
            className={`group flex items-center justify-between p-3 py-4 rounded-2xl   transition-all cursor-pointer ${
              resume.id == selected?.id
                ? 'bg-[#f17e27]'
                : appearance.theme == 'dark'
                ? 'hover:bg-[#202020] border-slate-700'
                : 'hover:bg-slate-50 '
            }`}
          >
            <div className='flex items-center gap-4'>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-gray-200'
                }`}
              >
                {<GetFileIcon extension={resume.metaData.extension} />}
              </div>
              <div>
                <h3
                  className={`text-sm font-bold truncate max-w-45 ${
                    resume.id == selected?.id
                      ? 'text-white'
                      : appearance.theme == 'dark'
                      ? 'text-white'
                      : 'text-slate-900'
                  }`}
                >
                  {resume.metaData.name}
                </h3>
                <p
                  className={`text-[11px] font-medium ${
                    resume.id == selected?.id
                      ? 'text-white/70'
                      : appearance.theme == 'dark'
                      ? 'text-slate-400'
                      : 'text-gray-500'
                  }`}
                >
                  {resume.updatedAt}
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
                <div
                  className={`px-2 py-1 text-[10px] font-bold rounded ${
                    resume.id == selected?.id
                      ? 'bg-white/20 text-white'
                      : appearance.theme == 'dark'
                      ? 'bg-[#202020] text-slate-300 border border-slate-700'
                      : ' text-gray-600 bg-white'
                  }`}
                >
                  {resume.metaData.size}mb
                </div>
              )}
              <button
                className={`p-1 rounded-lg transition-colors ${
                  resume.id == selected?.id
                    ? 'hover:bg-white/20'
                    : appearance.theme == 'dark'
                    ? 'hover:bg-slate-700'
                    : 'hover:bg-gray-200'
                }`}
              >
                <MoreVertical
                  className={`w-4 h-4 ${
                    resume.id == selected?.id
                      ? 'text-white'
                      : appearance.theme == 'dark'
                      ? 'text-slate-400'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center py-10'>
          <p
            className={`text-sm ${
              appearance.theme == 'dark' ? 'text-slate-500' : 'text-gray-400'
            }`}
          >
            No resumes found
          </p>
        </div>
      )}
    </div>
  )
}

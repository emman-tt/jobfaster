import React, { useState, useMemo } from 'react'
import {
  MoreHorizontal,
  Plus,
  Bookmark,
  CheckCircle2,
  Calendar,
  XCircle,
  CheckCircle,
  Link2,
  Clock,
  X
} from 'lucide-react'
import { boardData } from './boardData'
import Header from './Header'
import { DragDropProvider } from '@dnd-kit/react'
import { Draggable, Droppable } from '../../../components/dragger'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getJobTracks } from '../../../services/jobs'
import JobDetailView from '../Job-listing/Detail'

const IconMap = {
  Bookmark: Bookmark,
  CheckCircle2: CheckCircle2,
  Calendar: Calendar,
  XCircle: XCircle,
  CheckCircle: CheckCircle
}

const columnConfig = [
  { id: 'saved', title: 'Saved Jobs', icon: 'Bookmark', status: 'saved' },
  {
    id: 'applied',
    title: 'Applied Jobs',
    icon: 'CheckCircle2',
    status: 'applied'
  },
  {
    id: 'interview',
    title: 'Interviews',
    icon: 'Calendar',
    status: 'interview'
  },
  {
    id: 'rejected',
    title: 'Rejected Jobs',
    icon: 'XCircle',
    status: 'rejected'
  },
  {
    id: 'offered',
    title: 'Offered Jobs',
    icon: 'CheckCircle',
    status: 'offered'
  }
]

export default function JobBoard () {
  const [selectedJob, setSelectedJob] = useState(null)
  const { appearance } = useSelector(state => state.preferences)

  const { data, isLoading } = useQuery({
    queryKey: ['jobTracks'],
    queryFn: () => getJobTracks(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  console.log(data)

  const kanban = useMemo(() => {
    return columnConfig?.map(col => {
      const filteredJobs = data?.filter(job => job.status === col.status) || []


      const cards = filteredJobs?.map(job => ({
        id: job.id,
        company: job.employerName,
        title: job.jobTitle,
        salary: job.jobSalaryString || 'Not disclosed',
        description: job.jobDescription?.slice(0, 60) + '...' || '',
        tags: [
          job.jobIsRemote ? 'REMOTE' : 'ON-SITE',
          job.jobEmploymentType || 'Full-time'
        ],
        date: job.jobPostedHumanReadable || 'Recently',
        location: job.jobLocation || 'Remote',
        logo: job.employerLogo || null,
        applyLink: job.jobApplyLink || '',
        website: job.employerWebsite || null,
        rawJob: job
      }))
      return {
        ...col,
        count: cards.length,
        cards
      }
    })
  }, [data])

  const handleDragEnd = event => {
    const { operation, canceled } = event

    if (canceled || !operation.target) {
      return
    }

    const source = operation.source
    const target = operation.target

    const sourceData = source.id.split(',')
    const sourceParent = sourceData[0]
    const sourceCardId = sourceData[1]

    const sourceColumn = kanban.find(e => e.id == sourceParent)
    const sourceCard = sourceColumn?.cards.find(e => e.id == sourceCardId)
    if (!sourceCard) return

    const targetId = target.id
    const targetColumn = kanban.find(e => e.id === targetId)

    if (targetColumn) {
      if (sourceColumn.id == targetColumn.id) {
        const cards = [...sourceColumn.cards]
        const currentIndex = cards.findIndex(e => e.id == sourceCardId)
        const newIndex = currentIndex

        if (newIndex != currentIndex) {
          const [removed] = cards.splice(currentIndex, 1)
          cards.splice(newIndex, 0, removed)
        }
        return
      }

      const newCards = sourceColumn.cards.filter(
        item => item.id != sourceCardId
      )
      const newSource = { ...sourceColumn, cards: newCards }

      const updated = kanban.map(item => {
        if (item.id == sourceColumn.id) {
          return newSource
        }
        if (item.id == targetColumn.id) {
          return { ...item, cards: [...item.cards, sourceCard] }
        }
        return item
      })
      return
    }

    const targetData = targetId.split(',')

    if (targetData.length === 2) {
      const targetColId = targetData[0]
      const targetCardId = targetData[1]
      const targetCol = kanban.find(e => e.id === targetColId)

      if (targetCol && sourceColumn.id == targetColId) {
        const cards = [...sourceColumn.cards]
        const currentIndex = cards.findIndex(e => e.id == sourceCardId)
        const targetIndex = cards.findIndex(e => e.id == targetCardId)

        if (targetIndex !== -1 && currentIndex !== targetIndex) {
          const [removed] = cards.splice(currentIndex, 1)
          cards.splice(targetIndex, 0, removed)
        }
        return
      }

      if (targetCol) {
        const newCards = sourceColumn.cards.filter(
          item => item.id != sourceCardId
        )
        const newSource = { ...sourceColumn, cards: newCards }

        kanban.map(item => {
          if (item.id == sourceColumn.id) {
            return newSource
          }
          if (item.id == targetCol.id) {
            return { ...item, cards: [...item.cards, sourceCard] }
          }
          return item
        })
      }
    }
  }

  const closeDetail = () => setSelectedJob(null)

  function mapCardToJob (card) {
    return (
      card.rawJob || {
        jobTitle: card.title,
        employerName: card.company,
        employerLogo: card.logo || null,
        jobSalaryString: card.salary || null,
        jobDescription: card.description || '',
        jobLocation: card.location || 'Remote',
        jobEmploymentType: card.tags?.[1] || 'Full-time',
        jobPostedHumanReadable: card.date || card.time || 'Recently',
        jobIsRemote: card.tags?.includes('REMOTE') || false,
        jobHighlights: {},
        jobApplyLink: card.applyLink || '',
        employerWebsite: card.website || null
      }
    )
  }

  if (isLoading) {
    return (
      <div className='flex flex-col h-full w-full bg-white overflow-hidden'>
        <Header />
        <div className='flex items-center justify-center flex-1'>
          <div className='animate-spin w-8 h-8 border-2 border-[#f17e27] border-t-transparent rounded-full' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full w-full bg-white overflow-hidden relative'>
      <Header />
      <div className=' w-[80vw] overflow-x-auto p-5 pr-0 scrollbar-thin '>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className='flex gap-4 min-w-max h-full items-start'>
            {kanban.map(column => (
              <Droppable className={'h-full'} id={column.id}>
                <BoardColumn
                  key={column.id}
                  column={column}
                  onCardClick={card => setSelectedJob(mapCardToJob(card))}
                />
              </Droppable>
            ))}

            {/* Floating Add Column Button */}
            <button className='shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors mt-0.5'>
              <Plus className='w-5 h-5 text-gray-400' />
            </button>
          </div>
        </DragDropProvider>
      </div>

      {selectedJob && (
        <div className='fixed inset-0 z-40'>
          <div className='absolute inset-0 bg-black/20' onClick={closeDetail} />
          <div
            className={`absolute right-2 rounded-2xl top-2 bottom-2 h-[97%] w-full max-w-xl scrollbar-none shadow-2xl overflow-y-auto ${
              appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
            }`}
          >
            <button
              onClick={closeDetail}
              className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all z-10 ${
                appearance.theme == 'dark'
                  ? 'bg-[#202020] hover:bg-slate-800'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <X
                className={`w-5 h-5 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-slate-600'
                }`}
              />
            </button>
            <JobDetailView job={selectedJob} />
          </div>
        </div>
      )}
    </div>
  )
}

function BoardColumn ({ column, onCardClick }) {
  const Icon = IconMap[column.icon] || Bookmark

  return (
    <div className='w-70 bg-gray-50 rounded-xl  p-2 flex flex-col h-full'>
      {/* Column Header */}
      <div className='flex items-center justify-between mb-4 px-1'>
        <div className='flex items-center gap-2'>
          <div className='text-gray-500 bg-transparent'>
            <Icon className='w-4 h-4' strokeWidth={2.5} />
          </div>
          <h2 className='font-bold text-gray-700 text-[13px]'>
            {column.title}
          </h2>
          <span className='text-gray-400 font-medium text-[13px] ml-0.5'>
            {column.count}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <button className='text-gray-300 hover:text-gray-500'>
            <MoreHorizontal className='w-3.5 h-3.5' />
          </button>
          <button className='text-gray-300 hover:text-gray-500'>
            <Plus className='w-3.5 h-3.5' />
          </button>
        </div>
      </div>

      {/* Cards Container */}

      <div className='flex flex-col gap-3 scrollbar-none  overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200'>
        {column.cards.length === 0 && (
          <div className='text-center py-8 text-gray-300 text-xs font-medium'>
            No jobs
          </div>
        )}
        {column.cards.map(card => (
          <Droppable key={card.id} id={`${column.id},${card.id}`}>
            <Draggable itemId={`${column.id},${card.id}`}>
              <div id={`${column.id},${card.id}`}>
                <JobCard card={card} onClick={() => onCardClick(card)} />
              </div>
            </Draggable>
          </Droppable>
        ))}
      </div>
    </div>
  )
}

function JobCard ({ card, onClick }) {
  return (
    <div
      onClick={onClick}
      className='bg-white p-1.5 pl-3 h-30 rounded-xl shadow-sm border border-gray-200/50 group relative hover:border-gray-300 transition-all cursor-pointer'
    >
      <button className='absolute top-3 right-3 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity'>
        <MoreHorizontal className='w-3.5 h-3.5' />
      </button>
      <div className='flex gap-3 items-center'>
        <div className='w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-gray-100 shadow-sm'>
          {card.logo ? (
            <img
              src={card.logo}
              alt={card.company}
              className='w-6 h-6 object-contain'
            />
          ) : (
            <div className='w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
              {card.company?.charAt(0) || 'J'}
            </div>
          )}
        </div>
        <h3 className='font-bold text-gray-800 text-[13px] truncate pr-3 leading-snug'>
          {card.title}
        </h3>
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mt-0.5'>
          <span className='text-[12px] text-gray-400 truncate'>
            {card.company}
          </span>
          <span className='text-[12px] text-gray-400 truncate ml-2'>
            {card?.salary}
          </span>
          <span className='text-[12px] text-gray-400 truncate ml-2'>
            {card.location}
          </span>
        </div>

        <p className='text-[11px] text-gray-400 line-clamp-1 mb-1 font-medium'>
          {card.description}
        </p>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1.5 text-gray-400'>
          {card.time ? (
            <>
              <Clock className='w-3.5 h-3.5' />
              <span className='text-[11px] font-semibold'>{card.time}</span>
            </>
          ) : (
            <span className='text-[11px] font-semibold'>{card.date}</span>
          )}
        </div>
        {card.hasLink && (
          <button className='text-gray-300 hover:text-indigo-500 transition-colors'>
            <Link2 className='w-4 h-4' />
          </button>
        )}
      </div>
    </div>
  )
}

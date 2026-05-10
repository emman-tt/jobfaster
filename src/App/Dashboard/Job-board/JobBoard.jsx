import React, { useState, useEffect } from 'react'
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
import Header from './Header'
import { DragDropProvider } from '@dnd-kit/react'
import { Draggable, Droppable } from '../../../components/dragger'
import { useSelector } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getJobTracks,
  updateJobTrack,
  deleteJobTrack
} from '../../../services/jobs'
import JobBoardDetail from './JobBoardDetail'
import { toast } from 'sonner'

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

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['jobTracks'],
    queryFn: () => getJobTracks(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const [kanban, setKanban] = useState([])

  useEffect(() => {
    setKanban(
      columnConfig.map(col => {
        const filteredJobs =
          data?.filter(job => job.status === col.status) || []
        const cards = filteredJobs.map(job => ({
          id: job.id,
          company: job.employerName,
          title: job.jobTitle,
          salary: job.jobSalaryString || null,
          description: job.jobDescription?.slice(0, 120) + '...' || '',
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
        return { ...col, count: cards.length, cards }
      })
    )
  }, [data])

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: updateJobTrack,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['jobTracks'] })
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteJobTrack,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['jobTracks'] })
      setSelectedJob(null)
      toast.success('Job deleted')
    }
  })

  const handleDragEnd = event => {
    if (event.canceled || !event.operation.target) return

    const { source, target } = event.operation
    const [sourceColId, sourceCardId] = source.id.split(',')
    const sourceColumn = kanban.find(col => col.id === sourceColId)
    const sourceCard = sourceColumn?.cards.find(c => c.id === sourceCardId)
    if (!sourceCard) return

    const targetId = target.id
    const targetColumn = kanban.find(col => col.id === targetId)

    if (targetColumn) {
      if (sourceColumn.id === targetColumn.id) {
        const cards = [...sourceColumn.cards]
        const currentIndex = cards.findIndex(c => c.id === sourceCardId)
        const [removed] = cards.splice(currentIndex, 1)
        cards.splice(currentIndex, 0, removed)
        setKanban(prev =>
          prev.map(col => (col.id === sourceColId ? { ...col, cards } : col))
        )
        return
      }

      const newCards = sourceColumn.cards.filter(c => c.id !== sourceCardId)
      setKanban(prev =>
        prev.map(col => {
          if (col.id === sourceColumn.id) return { ...col, cards: newCards }
          if (col.id === targetColumn.id)
            return { ...col, cards: [...col.cards, sourceCard] }
          return col
        })
      )

      const newStatus = columnConfig.find(c => c.id === targetColumn.id)?.status
      updateMutation.mutate({ jobId: sourceCardId, status: newStatus })
      return
    }

    const [targetColId, targetCardId] = targetId.split(',')
    const targetCol = kanban.find(col => col.id === targetColId)
    if (!targetCol) return

    if (sourceColumn.id === targetCol.id) {
      const cards = [...sourceColumn.cards]
      const currentIndex = cards.findIndex(c => c.id === sourceCardId)
      const targetIndex = cards.findIndex(c => c.id === targetCardId)

      if (targetIndex !== -1 && currentIndex !== targetIndex) {
        const [removed] = cards.splice(currentIndex, 1)
        cards.splice(targetIndex, 0, removed)
        setKanban(prev =>
          prev.map(col => (col.id === sourceColId ? { ...col, cards } : col))
        )
      }
      return
    }

    const newCards = sourceColumn.cards.filter(c => c.id !== sourceCardId)
    const targetCardIndex = targetCol.cards.findIndex(
      c => c.id === targetCardId
    )
    const newTargetCards = [...targetCol.cards]
    newTargetCards.splice(targetCardIndex, 0, sourceCard)

    setKanban(prev =>
      prev.map(col => {
        if (col.id === sourceColumn.id) return { ...col, cards: newCards }
        if (col.id === targetCol.id) return { ...col, cards: newTargetCards }
        return col
      })
    )

    const newStatus = columnConfig.find(c => c.id === targetCol.id)?.status
    updateMutation.mutate({ jobId: sourceCardId, status: newStatus })
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
      <Header isFetching={isFetching} />
      <div className=' w-screen pr-10 sm:w-[80vw] h-full  overflow-x-auto p-5 sm:pr-0 scrollbar-thin '>
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
          </div>
        </DragDropProvider>
      </div>

      {selectedJob && (
        <div className='fixed inset-0 z-40'>
          <div className='absolute inset-0 bg-black/20' onClick={closeDetail} />
          <div
            className={`absolute inset-x-0 sm:inset-x-2 rounded-t-2xl sm:rounded-2xl top-[30%] sm:top-2 bottom-0 sm:bottom-2 sm:h-[97%] w-full max-w-xl scrollbar-none shadow-2xl overflow-y-auto ${
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
            <JobBoardDetail
              job={selectedJob}
              onSave={updatedJob => updateMutation.mutate(updatedJob)}
              onDelete={id => deleteMutation.mutate(id)}
              isSaving={updateMutation.isPending}
              isDeleting={deleteMutation.isPending}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function BoardColumn ({ column, onCardClick }) {
  const Icon = IconMap[column.icon] || Bookmark

  return (
    <div className='w-70 bg-gray-100 rounded-xl  p-2 flex flex-col h-full'>
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
      className='bg-white p-1.5 px-3 h-30 rounded-xl shadow-sm border border-gray-200/50 group relative hover:border-gray-300 transition-all cursor-pointer'
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
        <h3
          className='font-semibold text-gray-800 text-[13px]  pr-3 
        leading-none '
        >
          {card.title}
        </h3>
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mt-0.5'>
          <span className='text-[12px] text-gray-400 '>{card.company}</span>

          {card?.salary && (
            <span className=' w-full font-light text-xs font-satoshi text-gray-400  '>
              {card?.salary}
            </span>
          )}
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
        <span className='text-[12px] text-gray-400  '>{card.location}</span>
      </div>
    </div>
  )
}

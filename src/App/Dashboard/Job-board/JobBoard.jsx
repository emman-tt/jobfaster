import React, { useState } from 'react'
import {
  MoreHorizontal,
  Plus,
  Bookmark,
  CheckCircle2,
  Calendar,
  XCircle,
  CheckCircle,
  Link2,
  Clock
} from 'lucide-react'
import { boardData } from './boardData'
import Header from './Header'
import { DragDropProvider } from '@dnd-kit/react'
import { Draggable, Droppable } from '../../../components/dragger'
import { useDispatch } from 'react-redux'
import { openFileDetails } from '../../../store/modalSlice'

const IconMap = {
  Bookmark: Bookmark,
  CheckCircle2: CheckCircle2,
  Calendar: Calendar,
  XCircle: XCircle,
  CheckCircle: CheckCircle
}

export default function JobBoard () {
  const [kanban, setKanban] = useState(boardData)
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
          setKanban(prev =>
            prev.map(item =>
              item.id == sourceColumn.id ? { ...item, cards } : item
            )
          )
        }
        return
      }

      const newCards = sourceColumn.cards.filter(
        item => item.id != sourceCardId
      )
      const newSource = { ...sourceColumn, cards: newCards }

      setKanban(prev =>
        prev.map(item => {
          if (item.id == sourceColumn.id) {
            return newSource
          }
          if (item.id == targetColumn.id) {
            return { ...item, cards: [...item.cards, sourceCard] }
          }
          return item
        })
      )
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
          setKanban(prev =>
            prev.map(item =>
              item.id == sourceColumn.id ? { ...item, cards } : item
            )
          )
        }
        return
      }

      if (targetCol) {
        const newCards = sourceColumn.cards.filter(
          item => item.id != sourceCardId
        )
        const newSource = { ...sourceColumn, cards: newCards }

        setKanban(prev =>
          prev.map(item => {
            if (item.id == sourceColumn.id) {
              return newSource
            }
            if (item.id == targetCol.id) {
              return { ...item, cards: [...item.cards, sourceCard] }
            }
            return item
          })
        )
      }
    }
  }
  return (
    <div className='flex flex-col h-full w-full bg-white overflow-hidden'>
      <Header />
      <div className=' w-[80vw] overflow-x-auto p-5 pr-0 scrollbar-thin '>
        <DragDropProvider onDragEnd={handleDragEnd}>
          <div className='flex gap-4 min-w-max h-full items-start'>
            {kanban.map(column => (
              <Droppable className={'h-full'} id={column.id}>
                <BoardColumn key={column.id} column={column} />
              </Droppable>
            ))}

            {/* Floating Add Column Button */}
            <button className='shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors mt-0.5'>
              <Plus className='w-5 h-5 text-gray-400' />
            </button>
          </div>
        </DragDropProvider>
      </div>
    </div>
  )
}

function BoardColumn ({ column }) {
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
        {column.cards.map(card => (
          <Droppable key={card.id} id={`${column.id},${card.id}`}>
            <Draggable itemId={`${column.id},${card.id}`}>
              <div id={`${column.id},${card.id}`}>
                <JobCard card={card} />
              </div>
            </Draggable>
          </Droppable>
        ))}
      </div>
    </div>
  )
}

function JobCard ({ card }) {
  const dispatch = useDispatch()

  function handleOpenDetails () {
    const fileData = {
      id: card.id,
      metaData: {
        name: card.title,
        description: card.description,
        extension: 'pdf',
        size: 245000
      }
    }
    dispatch(openFileDetails(fileData))
  }

  return (
    <div
      onClick={handleOpenDetails}
      className='bg-white p-1.5 pl-3 h-30 rounded-xl shadow-sm border border-gray-200/50 group relative hover:border-gray-300 transition-all cursor-pointer'
    >
      <button className='absolute top-3 right-3 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity'>
        <MoreHorizontal className='w-3.5 h-3.5' />
      </button>
      <div className='flex gap-3 items-center'>
        <div className='w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-gray-100 shadow-sm'>
          <img
            src={card.logo}
            alt={card.company}
            className='w-6 h-6 object-contain'
          />
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

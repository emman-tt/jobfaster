import React from 'react'
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

const IconMap = {
  Bookmark: Bookmark,
  CheckCircle2: CheckCircle2,
  Calendar: Calendar,
  XCircle: XCircle,
  CheckCircle: CheckCircle
}

export default function JobBoard () {
  return (
    <div className='flex flex-col h-full w-full bg-white overflow-hidden'>
      <Header />
      <div className='flex-1 overflow-x-auto p-5 scrollbar-hide'>
        <div className='flex gap-4 min-w-max h-full items-start'>
          {boardData.map(column => (
            <BoardColumn key={column.id} column={column} />
          ))}

          {/* Floating Add Column Button */}
          <button className='shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors mt-0.5'>
            <Plus className='w-5 h-5 text-gray-400' />
          </button>
        </div>
      </div>
    </div>
  )
}

function BoardColumn ({ column }) {
  const Icon = IconMap[column.icon] || Bookmark

  return (
    <div className='w-70 flex flex-col h-full'>
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
      <div className='flex flex-col gap-3 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-gray-200'>
        {column.cards.map(card => (
          <JobCard key={card.id} card={card} columnId={column.id} />
        ))}
      </div>
    </div>
  )
}

function JobCard ({ card, columnId }) {
  const isCompact = columnId === 'saved'

  if (isCompact) {
    return (
      <div className='bg-white p-3.5 rounded-xl shadow-sm border border-gray-200/50 group relative hover:border-gray-300 transition-all cursor-pointer'>
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
          <div className='flex-1 min-w-0'>
            <h3 className='font-bold text-gray-800 text-[13px] truncate pr-3 leading-snug'>
              {card.title}
            </h3>
            <div className='flex items-center gap-2 mt-0.5'>
              <span className='text-[12px] text-gray-400 truncate'>
                {card.company}
              </span>
              <span className='text-[12px] text-gray-400 truncate ml-2'>
                {card.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-200/50 group relative hover:border-gray-300 transition-all cursor-pointer'>
      <button className='absolute top-4 right-4 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity'>
        <MoreHorizontal className='w-3.5 h-3.5' />
      </button>

      <div className='flex items-center gap-2 mb-3'>
        <div className='w-7 h-7 rounded-lg bg-white flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm'>
          <img
            src={card.logo}
            alt={card.company}
            className='w-4.5 h-4.5 object-contain'
          />
        </div>
        <span className='text-[12px] font-semibold text-gray-700'>
          {card.company}
        </span>
      </div>

      <h3 className='font-bold text-gray-800 text-[14px] mb-0.5 leading-snug pr-3'>
        {card.title}
      </h3>
      <p className='text-[12px] font-semibold text-gray-400 mb-2'>
        {card.salary}
      </p>

      <p className='text-[11px] text-gray-400 line-clamp-1 mb-3.5 font-medium'>
        {card.description}
      </p>

      <div className='flex flex-wrap gap-2 mb-4'>
        {card.tags?.map(tag => (
          <span
            key={tag}
            className='px-2 py-0.5 bg-indigo-50/50 text-[9px] font-bold text-indigo-500 rounded-md tracking-wide'
          >
            {tag}
          </span>
        ))}
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

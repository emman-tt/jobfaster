import React, { useState } from 'react'
import { Search, MapPin, SlidersHorizontal } from 'lucide-react'

export default function JobSearchHeader ({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  jobType,
  setJobType,
  jobTypes,
  onSearch
}) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className='flex items-center gap-3 w-full mb-8'>
      <div className='flex-1 flex items-center bg-white border border-gray-100 rounded-full p-1 shadowtransition-all duration-300'>
        {/* Keywords Input */}
        <div className='flex-[1.2] flex items-center px-4 gap-3 border-r border-gray-100'>
          <Search className='w-4.5 h-4.5 text-[#f17e27]' />
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Job title or keyword'
            className='w-full bg-transparent border-none outline-none text-sm font-medium text-slate-700 placeholder:text-gray-400 py-2.5'
          />
        </div>

        {/* Location Input */}
        <div className='flex-1 flex items-center px-4 gap-3'>
          <MapPin className='w-4.5 h-4.5 text-gray-400' />
          <input
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder='Add country or city'
            className='w-full bg-transparent border-none outline-none text-sm font-medium text-slate-700 placeholder:text-gray-400 py-2.5'
          />
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className='px-8 py-2.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-xs font-bold rounded-full transition-all active:scale-95 cursor-pointer'
        >
          Search
        </button>
      </div>

      {/* Filter Button */}
      <div className='relative'>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 bg-white border border-gray-100 rounded-full shadow-sm text-gray-500 hover:text-[#f17e27] hover:border-orange-100 transition-all active:scale-95 cursor-pointer ${
            showFilters ? 'bg-[#fff7ed] text-[#f17e27] border-[#feb053]' : ''
          }`}
        >
          <SlidersHorizontal className='w-4 h-4' />
        </button>

        {showFilters && (
          <>
            <div
              className='fixed inset-0 z-40'
              onClick={() => setShowFilters(false)}
            />
            <div className='absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-50 p-4 z-50 transform origin-top-right transition-all'>
              <div className='flex items-center justify-between mb-3 px-1'>
                <h4 className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                  Filters
                </h4>
                <button
                  onClick={() => {
                    setJobType('All Job Types')
                    setSearchTerm('')
                    setLocation('')
                  }}
                  className='text-[9px] font-bold text-[#f17e27] hover:text-[#e16d16] uppercase tracking-wider transition-colors'
                >
                  Reset
                </button>
              </div>

              <div className='space-y-3'>
                <div>
                  <label className='text-[10px] font-bold text-slate-800 mb-1.5 block px-1'>
                    JOB TYPE
                  </label>
                  <div className='grid grid-cols-1 gap-1'>
                    {jobTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => {
                          setJobType(type)
                          setShowFilters(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-xs rounded-lg transition-all ${
                          jobType === type
                            ? 'bg-[#f17e27] text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:bg-orange-50 font-medium'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

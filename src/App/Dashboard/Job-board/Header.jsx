import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import { ChevronDown, Plus, Filter } from 'lucide-react'

export default function Header ({ isFetching }) {
  const { appearance } = useSelector(state => state.preferences)
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filters = [
    'All',
    'Saved Jobs',
    'Applied Jobs',
    'Interviews',
    'Rejected Jobs',
    'Offered Jobs'
  ]

  return (
    <div className={`w-full border-b px-4 sm:px-8 pt-5 sm:pt-8 pb-5 relative transition-all duration-200 ${
      appearance.theme === 'dark'
        ? 'bg-[#1e1e1e] border-zinc-800'
        : 'bg-white border-gray-300'
    }`}>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2'>
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold leading-tight ${
            appearance.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Jobs
          </h1>
          <p className={`text-sm mt-0.5 ${
            appearance.theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'
          }`}>
            Keep track of your applied jobs all in one place
          </p>
        </div>

        <div className='flex items-center gap-3 w-full sm:w-auto'>
          {/* Filter Dropdown */}
          <Menu as='div' className='relative inline-block text-left'>
            <MenuButton className={`inline-flex items-center justify-between w-48 gap-x-1.5 rounded-lg border px-3 py-2 text-sm font-semibold shadow-sm transition-all ${
              appearance.theme === 'dark'
                ? 'bg-[#2a2a2a] text-zinc-300 border-zinc-800 hover:bg-[#333]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}>
              <div className='flex items-center gap-2'>
                <Filter className='w-4 h-4 text-gray-400' />
                <span className='truncate'>{selectedFilter}</span>
              </div>
              <ChevronDown
                className='-mr-1 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </MenuButton>

            <Transition
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <MenuItems className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl shadow-lg focus:outline-none overflow-hidden border ${
                appearance.theme === 'dark'
                  ? 'bg-[#1e1e1e] border-zinc-800 text-zinc-300 shadow-black/50'
                  : 'bg-white border-gray-100 text-gray-700 shadow-lg'
              }`}>
                <div className='py-1'>
                  {filters.map(filter => (
                    <MenuItem key={filter}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedFilter(filter)}
                          className={`
                            ${
                              active
                                ? appearance.theme === 'dark'
                                  ? 'bg-zinc-800/80 text-white'
                                  : 'bg-gray-50 text-gray-900'
                                : appearance.theme === 'dark'
                                ? 'text-zinc-300'
                                : 'text-gray-700'
                            }
                            flex w-full px-4 py-2 text-sm transition-colors text-left
                          `}
                        >
                          {filter}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          {/* Add Job Button */}
          <button className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer ${
            appearance.theme === 'dark'
              ? 'bg-orange-600 hover:bg-orange-500'
              : 'bg-[#0f172a] hover:bg-[#1e293b]'
          }`}>
            <Plus className='w-4 h-4' />
            Add Job
          </button>
        </div>
      </div>

      {isFetching && (
        <div className='custom-loader absolute bottom-0 left-0 right-0 w-full'></div>
      )}
    </div>
  )
}

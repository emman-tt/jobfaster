import React, { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react'
import { ChevronDown, Plus, Filter } from 'lucide-react'

export default function Header ({ isFetching }) {
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
    <div className='w-full bg-white border-b border-gray-300 px-8 pt-8 pb-5 relative'>
      <div className='flex items-center justify-between mb-2'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 leading-tight'>
            Jobs
          </h1>
          <p className='text-sm text-gray-400 mt-0.5'>
            Keep track of your applied job all in one place
          </p>
        </div>

        <div className='flex items-center gap-3'>
          {/* Filter Dropdown */}
          <Menu as='div' className='relative inline-block text-left'>
            <MenuButton className='inline-flex items-center justify-between w-48 gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 transition-all'>
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
              <MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden'>
                <div className='py-1'>
                  {filters.map(filter => (
                    <MenuItem key={filter}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedFilter(filter)}
                          className={`
                            ${
                              active
                                ? 'bg-gray-50 text-gray-900'
                                : 'text-gray-700'
                            }
                            flex w-full px-4 py-2 text-sm transition-colors
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
          <button className='inline-flex items-center gap-2 rounded-lg bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1e293b] transition-all'>
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

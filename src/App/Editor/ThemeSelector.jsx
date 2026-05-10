import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import useClickOutside from '../../hooks/useClick'
import { setTheme } from '../../store/editorSlice'

export const THEME_COLORS = {
  monochrome: {
    base: '#111111',
    name: '#111111',
    sectionHeader: '#111111',
    company: '#222222',
    jobTitle: '#444444',
    bodyText: '#333333',
    date: '#6B7280',
    contact: '#6B7280'
  },
  navy: {
    base: '#1B3A6B',
    name: '#1B3A6B',
    sectionHeader: '#1B3A6B',
    company: '#1B3A6B',
    jobTitle: '#2C5F8A',
    bodyText: '#2d2d2d',
    date: '#5A7A9A',
    contact: '#5A7A9A'
  },
  slate: {
    base: '#3D5278',
    name: '#3D5278',
    sectionHeader: '#3D5278',
    company: '#3D5278',
    jobTitle: '#5A7A9A',
    bodyText: '#2d2d2d',
    date: '#7A8FA8',
    contact: '#7A8FA8'
  },
  forest: {
    base: '#2D6A4F',
    name: '#2D6A4F',
    sectionHeader: '#2D6A4F',
    company: '#2D6A4F',
    jobTitle: '#40916C',
    bodyText: '#2d2d2d',
    date: '#5A8A72',
    contact: '#5A8A72'
  },
  charcoal: {
    base: '#1C1C1C',
    name: '#1C1C1C',
    sectionHeader: '#1C1C1C',
    company: '#2C2C2C',
    jobTitle: '#555555',
    bodyText: '#333333',
    date: '#777777',
    contact: '#777777'
  },
  burgundy: {
    base: '#6B2D3D',
    name: '#6B2D3D',
    sectionHeader: '#6B2D3D',
    company: '#6B2D3D',
    jobTitle: '#8B4A5A',
    bodyText: '#2d2d2d',
    date: '#7A5A62',
    contact: '#7A5A62'
  },
  ocean: {
    base: '#1A6B6B',
    name: '#1A6B6B',
    sectionHeader: '#1A6B6B',
    company: '#1A6B6B',
    jobTitle: '#2D8A8A',
    bodyText: '#2d2d2d',
    date: '#5A8A8A',
    contact: '#5A8A8A'
  },
  plum: {
    base: '#4A2D6B',
    name: '#4A2D6B',
    sectionHeader: '#4A2D6B',
    company: '#4A2D6B',
    jobTitle: '#6B4A8B',
    bodyText: '#2d2d2d',
    date: '#7A6A8A',
    contact: '#7A6A8A'
  }
}

const themeList = Object.keys(THEME_COLORS)

export default function ThemeSelector () {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.editor)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))

  const currentTheme = theme || 'monochrome'
  const currentColor = THEME_COLORS[currentTheme]?.base || '#111111'

  return (
    <div ref={ref} className='w-full sm:w-40 relative shrink-0'>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className='w-full border border-gray-200 pl-3 pr-3 py-2.5 rounded-xl text-xs text-gray-900 font-medium flex items-center justify-between hover:shadow-md transition-all shadow-sm bg-white'
      >
        <div className='flex items-center gap-2'>
          <div
            className='w-4 h-4 rounded-full shrink-0'
            style={{ backgroundColor: currentColor }}
          />
          <span className='capitalize'>{currentTheme}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className='absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-200 cursor-pointer rounded-xl shadow-lg overflow-hidden'>
          <ul className='max-h-48 overflow-y-auto'>
            {themeList.map(item => (
              <li
                key={item}
                onClick={() => {
                  dispatch(setTheme(item))
                  setIsOpen(false)
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs text-gray-900 hover:bg-orange-50 cursor-pointer transition-colors ${
                  item === currentTheme && 'bg-orange-400 text-white'
                }`}
              >
                <div
                  className='w-4 h-4 rounded-full shrink-0'
                  style={{ backgroundColor: THEME_COLORS[item].base }}
                />
                <span className='capitalize'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

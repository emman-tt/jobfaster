import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
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
    base: '#1B2A4A',
    name: '#1B2A4A',
    sectionHeader: '#1B2A4A',
    company: '#1B2A4A',
    jobTitle: '#2F4A7A',
    bodyText: '#2d2d2d',
    date: '#6B7280',
    contact: '#6B7280'
  },
  slate: {
    base: '#2F3E55',
    name: '#2F3E55',
    sectionHeader: '#2F3E55',
    company: '#2F3E55',
    jobTitle: '#4A6080',
    bodyText: '#333333',
    date: '#6B7280',
    contact: '#6B7280'
  },
  forest: {
    base: '#1B3A2A',
    name: '#1B3A2A',
    sectionHeader: '#1B3A2A',
    company: '#1B3A2A',
    jobTitle: '#2D6A4F',
    bodyText: '#2d2d2d',
    date: '#6B7280',
    contact: '#6B7280'
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
  }
}

const themeList = Object.keys(THEME_COLORS)

export default function ThemeSelector () {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state.editor)
  const [isOpen, setIsOpen] = useState(false)

  const currentTheme = theme || 'monochrome'
  const currentColor = THEME_COLORS[currentTheme]?.base || '#111111'

  return (
    <div className='w-full sm:w-40 relative shrink-0'>
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

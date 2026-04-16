import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Strikethrough,
  ChevronsUpDown,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'

export default function Menubar () {
  const [typography, setTypography] = useState({
    font: 'Inter',
    weight: '500',
    size: '14',
    sizeUnit: 'PX',
    height: 'Auto',
    heightUnit: 'PX',
    color: '#2563eb',
    align: 'left',
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
  })

  const handleChange = (field, value) => {
    setTypography(prev => ({ ...prev, [field]: value }))
  }

  const toggleStyle = style => {
    setTypography(prev => ({ ...prev, [style]: !prev[style] }))
  }

  const fontList = [
    {
      id: 1,
      name: 'inter',
      value: 'font-inter'
    },
    {
      id: 2,
      name: 'Open Sans',
      value: 'font-open'
    },
    {
      id: 3,
      name: 'Roboto',
      value: 'font-roboto'
    },
    {
      id: 4,
      name: 'Arial',
      value: 'font-arial'
    },
    {
      id: 5,
      name: 'Garamond',
      value: 'font-garamond '
    }
  ]

  return (
    <section className='w-full bg-white h-full rounded-2xl shadow-lg p-5 space-y-4'>
      <div className='text-lg    font-bold text-gray-900'>Typography</div>

      <div className=''>
        <label className='text-sm text-gray-600'>Font</label>

        <div className=' flex w-full flex-wrap gap-5'>
          {fontList.map(item => (
            <div
              className=' rounded-xl shadow-sm bg-white w-15 h-15'
              key={item.id}
            ></div>
          ))}
        </div>
      </div>
      <FontWeight />
      <div className='grid grid-cols-2 gap-3'>
        <div className='space-y-2'>
          <label className='text-sm text-gray-600'>Size</label>
          <div className='flex gap-2'>
            <input
              type='number'
              value={typography.size}
              onChange={e => handleChange('size', e.target.value)}
              className='flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
        <div className='space-y-2'>
          <label className='text-sm text-gray-600'>Height</label>
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='Auto'
              value={typography.height}
              onChange={e => handleChange('height', e.target.value)}
              className='flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-sm text-gray-600'>Color</label>
        <button className='w-full flex items-center gap-3 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:bg-gray-100 transition'>
          <div
            className='w-5 h-5 rounded'
            style={{ backgroundColor: typography.color }}
          />
          <span>Blue Base</span>
        </button>
      </div>

      {/* Alignment */}
      <div className='space-y-2'>
        <label className='text-sm text-gray-600'>Align</label>
        <div className='flex gap-2'>
          <button
            onClick={() => handleChange('align', 'left')}
            className={`flex-1 p-2 border rounded-lg transition ${
              typography.align === 'left'
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <AlignLeft size={18} className='mx-auto' />
          </button>
          <button
            onClick={() => handleChange('align', 'center')}
            className={`flex-1 p-2 border rounded-lg transition ${
              typography.align === 'center'
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <AlignCenter size={18} className='mx-auto' />
          </button>
          <button
            onClick={() => handleChange('align', 'right')}
            className={`flex-1 p-2 border rounded-lg transition ${
              typography.align === 'right'
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <AlignRight size={18} className='mx-auto' />
          </button>
          <button
            onClick={() => handleChange('align', 'justify')}
            className={`flex-1 p-2 border rounded-lg transition ${
              typography.align === 'justify'
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <Strikethrough size={18} className='mx-auto' />
          </button>
        </div>
      </div>

      {/* Text Styles */}
      <div className='space-y-2'>
        <label className='text-sm text-gray-600'>Style</label>
        <div className='flex gap-2'>
          <button
            onClick={() => toggleStyle('bold')}
            className={`flex-1 p-2 font-bold border rounded-lg transition ${
              typography.bold
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            B
          </button>
          <button
            onClick={() => toggleStyle('italic')}
            className={`flex-1 p-2 italic border rounded-lg transition ${
              typography.italic
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            I
          </button>
          <button
            onClick={() => toggleStyle('underline')}
            className={`flex-1 p-2 underline border rounded-lg transition ${
              typography.underline
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            U
          </button>
          <button
            onClick={() => toggleStyle('strikethrough')}
            className={`flex-1 p-2 line-through border rounded-lg transition ${
              typography.strikethrough
                ? 'bg-blue-100 border-blue-300'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            S
          </button>
        </div>
      </div>
    </section>
  )
}

const weightArray = [
  {
    name: '400 - Regular',
    value: 400
  },
  {
    name: '500 - Medium',
    value: 500
  },
  {
    name: '600 - Semi Bold',
    value: 600
  },
  {
    name: '700 - Bold',
    value: 700
  }
]

function FontWeight ({ selectSize }) {
  const [box, showBox] = useState(false)
  return (
    <section className='mt-6 flex flex-col sm:flex-row gap-3 w-full'>
      <div className='w-full sm:w-40 relative shrink-0'>
        <button
          onClick={() => showBox(e => !e)}
          className='w-full border border-gray-100 pl-4  pr-3 py-2.5 rounded-xl text-xs text-gray-900 font-medium flex items-center justify-between hover:shadow-md transition-all shadow-xs bg-white'
        >
          <span>Font weight</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-150 ${
              box ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div
          className={`absolute z-20 top-full left-0 right-0 mt-2 bg-white ${
            box && 'border'
          }  border-gray-200 cursor-pointer rounded-xl shadow-lg overflow-hidden`}
        >
          <ul className='max-h-48 overflow-y-auto'>
            {box &&
              weightArray.map(item => (
                <li
                  key={item.value}
                  onClick={() => {
                    selectSize(item.value)
                    showBox(false)
                  }}
                  className='flex items-center gap-2 px-4 py-3 text-xs text-gray-900 hover:bg-[#ec5b13]/5 cursor-pointer transition-colors'
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

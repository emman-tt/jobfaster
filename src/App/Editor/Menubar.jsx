import { useState } from 'react'
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Strikethrough,
  ChevronDown,
  AlignJustify
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setAlign,
  setFont,
  setHeight,
  setSize,
  setWeight,
  setContrast
} from '../../store/editorSlice'

const fontList = [
  { id: 1, name: 'inter', value: 'font-inter' },
  { id: 2, name: 'Open Sans', value: 'font-open' },
  { id: 3, name: 'Roboto', value: 'font-roboto' },
  { id: 4, name: 'Arial', value: 'font-arial' },
  { id: 5, name: 'Garamond', value: 'font-garamond' }
]

const weightArray = [
  { name: '400 - Regular', value: 400 },
  { name: '500 - Medium', value: 500 },
  { name: '600 - Semi Bold', value: 600 },
  { name: '700 - Bold', value: 700 }
]

const lineHeightOptions = [
  { name: '1.2 - Tight', value: 1.2 },
  { name: '1.4 - Normal', value: 1.4 },
  { name: '1.5 - Normal', value: 1.5 },
  { name: '1.6 - Relaxed', value: 1.6 }
]

const contrastOptions = [
  { name: '90% - Light', value: 0.9 },
  { name: '100% - Default', value: 1 },
  { name: '115% - Medium', value: 1.15 },
  { name: '130% - Dark', value: 1.3 }
]

const alignList = [
  { name: 'left', comp: AlignLeft },
  { name: 'right', comp: AlignRight },
  { name: 'center', comp: AlignCenter },
  { name: 'justify', comp: AlignJustify }
]

function FontWeight ({ onSelect, weight }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full sm:w-30 relative shrink-0'>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className='w-full border border-gray-200 pl-4 pr-3 py-2.5 rounded-xl text-xs text-gray-900 font-medium flex items-center justify-between  transition-all shadow-sm bg-white'
      >
        <span>Font weight</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute z-20 top-full left-0 right-0 mt-2 bg-white ${
          isOpen ? 'border border-gray-200' : ''
        } cursor-pointer rounded-xl shadow-lg overflow-hidden`}
      >
        <ul className='max-h-48 overflow-y-auto'>
          {isOpen &&
            weightArray.map(item => (
              <li
                key={item.value}
                onClick={() => {
                  onSelect(item.name)
                  setIsOpen(false)
                }}
                style={{
                  fontWeight: item.value
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs text-gray-900 ${
                  item.name == weight && 'bg-orange-400'
                }   cursor-pointer transition-colors`}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

function Alignment ({ onSelect, align }) {
  return (
    <div className='space-y-2'>
      <label className='text-sm text-gray-600'>Align</label>
      <div className='flex gap-2'>
        {alignList.map(item => {
          const Icon = item.comp
          return (
            <button
              key={item.name}
              onClick={() => onSelect(item.name)}
              className={`flex-1 hover:bg-gray-50 p-2 border rounded-lg cursor-pointer transition ${
                align === item.name ? ' border-orange-600' : ' border-gray-200'
              }`}
            >
              <Icon size={18} className='mx-auto' />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TextContrast ({ onSelect, contrast }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full sm:w-36 relative shrink-0'>
      <label className='text-sm text-gray-600'>Text Contrast</label>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className='w-full border border-gray-200 pl-4 pr-3 py-2.5 rounded-xl text-xs text-gray-900 font-medium flex items-center justify-between transition-all shadow-sm bg-white'
      >
        <span>{contrast === 1 ? 'Default' : `${Math.round(contrast * 100)}%`}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute z-20 top-full left-0 right-0 mt-2 bg-white ${
          isOpen ? 'border border-gray-200' : ''
        } cursor-pointer rounded-xl shadow-lg overflow-hidden`}
      >
        <ul className='max-h-48 overflow-y-auto'>
          {isOpen &&
            contrastOptions.map(item => (
              <li
                key={item.value}
                onClick={() => {
                  onSelect(item.value)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs text-gray-900 ${
                  item.value == contrast && 'bg-orange-500 text-white'
                } cursor-pointer transition-colors`}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

function LineHeight ({ onSelect, height }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full sm:w-36 relative shrink-0'>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className='w-full border border-gray-200 pl-4 pr-3 py-2.5 rounded-xl text-xs text-gray-900 font-medium flex items-center justify-between transition-all shadow-sm bg-white'
      >
        <span>Line height</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute z-20 top-full left-0 right-0 mt-2 bg-white ${
          isOpen ? 'border border-gray-200' : ''
        } cursor-pointer rounded-xl shadow-lg overflow-hidden`}
      >
        <ul className='max-h-48 overflow-y-auto'>
          {isOpen &&
            lineHeightOptions.map(item => (
              <li
                key={item.value}
                onClick={() => {
                  onSelect(item.value)
                  setIsOpen(false)
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs text-gray-900 ${
                  item.value == height && 'bg-orange-500 text-white'
                } cursor-pointer transition-colors`}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default function Menubar () {
  const dispatch = useDispatch()
  const { font, align, weight, height, contrast } = useSelector(state => state.editor)
  function SelectFont (item) {
    dispatch(setFont(item))
  }
  function getFont (item) {
    return fontList.find(e => e.name == item).value
  }
  return (
    <section className='w-full bg-white h-full rounded-2xl shadow-lg p-5 space-y-4'>
      <h3 className='text-lg font-bold text-gray-900'>Typography</h3>
      <p className='text-xs text-gray-500'>
        Job titles, company names, bullet points, and descriptions will inherit
        their typography changes relative to body text .
      </p>
      <div>
        <label className='text-sm text-gray-600'>Font</label>
        <div className='flex w-full flex-wrap gap-5'>
          {fontList.map(item => (
            <div
              key={item.id}
              onClick={() => {
                SelectFont(item.value)
              }}
              className={`rounded-xl 
                ${getFont(item.name)} text-xl ${
                item.value == font && 'border-orange-500 border'
              } font-medium cursor-pointer justify-center flex items-center shadow-sm bg-white w-15 h-15`}
            >
              A a
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-3'>
        <FontWeight
          weight={weight}
          onSelect={val => dispatch(setWeight(val))}
        />
        <div className='w-full h-10 flex gap-0 items-center'>
          <label className='text-sm w-15 text-gray-600 font-IBM'>Size :</label>
          <div className='gap-2 w-full border border-gray-200 rounded-xl text-xs text-gray-900 font-medium transition-all shadow-sm bg-white'>
            <input
              type='number'
              min={10}
              max={24}
              onChange={e => dispatch(setSize(e.target.value))}
              className='px-3 py-2 h-full w-full border border-gray-200 rounded-lg text-sm focus:outline-none'
            />
          </div>
        </div>

        <LineHeight
          height={height}
          onSelect={val => dispatch(setHeight(val))}
        />
      </div>
      <Alignment align={align} onSelect={val => dispatch(setAlign(val))} />
      <TextContrast contrast={contrast} onSelect={val => dispatch(setContrast(val))} />
    </section>
  )
}

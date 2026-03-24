import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { ChevronDown } from 'lucide-react'
import useClickOutside from '../../../hooks/useClick'
import { useDispatch, useSelector } from 'react-redux'
import { updateGroupStyle } from '../../../store/formatSlice'

export default function NameStyles () {
  const dispatch = useDispatch()
  const nameStyles = useSelector(state => state.format.styless.name)

  const [toggles, setToggles] = useState({
    size: false,
    weight: false,
    case: false,
    spacing: false
  })

  const closeAll = () =>
    setToggles({ size: false, weight: false, case: false, spacing: false })
  const ref = useClickOutside(closeAll)

  const handleUpdate = (field, value) => {
    dispatch(updateGroupStyle({ category: 'name', field, value }))
    closeAll()
  }

  return (
    <section className='px-5 mt-15 flex flex-col'>
      <QuestionHeader question='Customize how your Name appears on the resume.'>
        Your name is the most prominent part of your header. Choose a size and
        weight that stands out while remaining professional.
      </QuestionHeader>

      <section
        ref={ref}
        className='grid grid-cols-2 lg:grid-cols-4 w-full px-3 mt-5 gap-3'
      >
        {/* Size Dropdown */}
        <div className='relative w-full'>
          <div
            onClick={() => setToggles({ ...toggles, size: !toggles.size })}
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'
          >
            Size: {nameStyles.size}px
            <ChevronDown
              className={`h-5 transition-transform ${
                toggles.size ? 'rotate-180' : ''
              }`}
            />
          </div>
          {toggles.size && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg max-h-40 overflow-y-auto'>
              {[18, 20, 22, 24, 26, 28, 30, 32].map(s => (
                <li
                  key={s}
                  onClick={() => handleUpdate('size', s)}
                  className='text-sm cursor-pointer hover:text-blue-600 font-medium'
                >
                  {s}px
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Weight Dropdown */}
        <div className='relative w-full'>
          <div
            onClick={() => setToggles({ ...toggles, weight: !toggles.weight })}
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'
          >
            {nameStyles.weight === 'font-bold' ? 'Bold' : 'Normal'}
            <ChevronDown
              className={`h-5 transition-transform ${
                toggles.weight ? 'rotate-180' : ''
              }`}
            />
          </div>
          {toggles.weight && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              <li
                onClick={() => handleUpdate('weight', 'font-normal')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Normal
              </li>
              <li
                onClick={() => handleUpdate('weight', 'font-bold')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Bold
              </li>
            </ul>
          )}
        </div>

        {/* Case Dropdown */}
        <div className='relative w-full'>
          <div
            onClick={() => setToggles({ ...toggles, case: !toggles.case })}
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'
          >
            {nameStyles.case === 'uppercase' ? 'Uppercase' : 'Normal'}
            <ChevronDown
              className={`h-5 transition-transform ${
                toggles.case ? 'rotate-180' : ''
              }`}
            />
          </div>
          {toggles.case && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              <li
                onClick={() => handleUpdate('case', 'unset')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Normal
              </li>
              <li
                onClick={() => handleUpdate('case', 'uppercase')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Uppercase
              </li>
            </ul>
          )}
        </div>

        {/* Spacing Dropdown */}
        <div className='relative w-full'>
          <div
            onClick={() =>
              setToggles({ ...toggles, spacing: !toggles.spacing })
            }
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'
          >
            Spacing: {nameStyles.spacing}px
            <ChevronDown
              className={`h-5 transition-transform ${
                toggles.spacing ? 'rotate-180' : ''
              }`}
            />
          </div>
          {toggles.spacing && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg max-h-40 overflow-y-auto'>
              {[0, 2, 4, 6, 8, 10, 12].map(s => (
                <li
                  key={s}
                  onClick={() => handleUpdate('spacing', s)}
                  className='text-sm cursor-pointer hover:text-blue-600 font-medium'
                >
                  {s}px
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </section>
  )
}

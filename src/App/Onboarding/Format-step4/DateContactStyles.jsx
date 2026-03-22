import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { ChevronDown } from 'lucide-react'
import useClickOutside from '../../../hooks/useClick'
import { useDispatch, useSelector } from 'react-redux'
import { updateGroupStyle } from '../../../store/formatSlice'

export default function DateContactStyles () {
  const dispatch = useDispatch()
  const dateStyles = useSelector(state => state.format.styless.dateStyles)
  const contactStyles = useSelector(state => state.format.styless.contactStyles)

  const [toggles, setToggles] = useState({
    dateSize: false,
    dateStyle: false,
    contactSize: false
  })

  const closeAll = () =>
    setToggles({ dateSize: false, dateStyle: false, contactSize: false })
  const ref = useClickOutside(closeAll)

  const handleUpdateDate = (field, value) => {
    dispatch(updateGroupStyle({ category: 'dateStyles', field, value }))
    // If contact size is "linked" (Same as Dates), update it too?
    // User request says "contactSize: Same as Dates, Smaller".
    // I'll check the current contact size vs date size to determine state.
    closeAll()
  }

  const handleUpdateContact = setting => {
    const newSize =
      setting === 'Smaller' ? dateStyles.size - 1 : dateStyles.size
    dispatch(
      updateGroupStyle({
        category: 'contactStyles',
        field: 'size',
        value: newSize
      })
    )
    closeAll()
  }

  const currentContactSetting =
    contactStyles.size < dateStyles.size ? 'Smaller' : 'Same as Dates'

  return (
    <section className='px-5 mt-15 flex flex-col'>
      <QuestionHeader question='Style your Dates and Contact Information.'>
        These details are often grouped together. You can make them subtle or
        italicized to distinguish them from other metadata.
      </QuestionHeader>

      <section
        ref={ref}
        className='grid grid-cols-2 lg:grid-cols-4 w-full px-3 mt-5 gap-3'
      >
        {/* Date Size */}
        <div className='relative w-full'>
          <div
            onClick={() =>
              setToggles({ ...toggles, dateSize: !toggles.dateSize })
            }
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'
          >
            Date Size: {dateStyles.size}px
            <ChevronDown
              className={`h-5 transition-transform ${
                toggles.dateSize ? 'rotate-180' : ''
              }`}
            />
          </div>
          {toggles.dateSize && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              {[10, 11].map(s => (
                <li
                  key={s}
                  onClick={() => handleUpdateDate('size', s)}
                  className='text-sm cursor-pointer hover:text-blue-600 font-medium'
                >
                  {s}px
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Date Style */}
        <div className='relative w-full'>
          <div
            onClick={() =>
              setToggles({ ...toggles, dateStyle: !toggles.dateStyle })
            }
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'
          >
            Date: {dateStyles.style === 'italic' ? 'Italic' : 'Normal'}
            <ChevronDown
              className={`h-5 transition-transform ${
                toggles.dateStyle ? 'rotate-180' : ''
              }`}
            />
          </div>
          {toggles.dateStyle && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              <li
                onClick={() => handleUpdateDate('style', 'normal')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Normal
              </li>
              <li
                onClick={() => handleUpdateDate('style', 'italic')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Italic
              </li>
            </ul>
          )}
        </div>

        {/* Contact Size */}
        <div className='relative w-full'>
          <div
            onClick={() =>
              setToggles({ ...toggles, contactSize: !toggles.contactSize })
            }
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'
          >
            Contact: {currentContactSetting}
            <ChevronDown
              className={`h-5 transition-transform ${
                toggles.contactSize ? 'rotate-180' : ''
              }`}
            />
          </div>
          {toggles.contactSize && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              <li
                onClick={() => handleUpdateContact('Same as Dates')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Same as Dates
              </li>
              <li
                onClick={() => handleUpdateContact('Smaller')}
                className='text-sm cursor-pointer hover:text-blue-600 font-medium'
              >
                Smaller
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* <p className='mt-10 font-semibold text-sm text-center w-full'>Preview</p> */}
      {/* <div className='rounded-2xl bg-[#f3f5f7] mt-5 p-8 flex flex-col gap-2 items-center'>
         <p 
           style={{ 
             fontSize: `${contactStyles.size}px`
           }}
           className='text-slate-400'
         >
           astroverse@gmail.com | Ghana, Accra
         </p>
         <p 
           style={{ 
             fontSize: `${dateStyles.size}px`
           }}
           className={`${dateStyles.style} text-slate-400`}
         >
           Jan 2020 - Present
         </p>
      </div> */}
    </section>
  )
}

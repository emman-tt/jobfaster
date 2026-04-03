import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { ChevronDown } from 'lucide-react'
import useClickOutside from '../../../hooks/useClick'
import { useDispatch, useSelector } from 'react-redux'
import { updateGroupStyle } from '../../../store/formatSlice'

export default function JobTitleStyles () {
  const dispatch = useDispatch()
  const styles = useSelector(state => state.format.styless.jobTitle)

  const [toggles, setToggles] = useState({
    size: false,
    weight: false,
    style: false,
    case: false,
    spacing: false
  })

  const closeAll = () => setToggles({ size: false, weight: false, style: false, case: false, spacing: false })
  const ref = useClickOutside(closeAll)

  const handleUpdate = (field, value) => {
    dispatch(updateGroupStyle({ category: 'jobTitle', field, value }))
    closeAll()
  }

  return (
    <section className='px-5 mt-15 flex flex-col'>
      <QuestionHeader question="Customize your Job Titles and Roles.">
        Your job title is a key identifier. Adjust its style to distinguish it from the company name.
      </QuestionHeader>

      <section ref={ref} className='grid grid-cols-2 lg:grid-cols-4 w-full px-3 mt-5 gap-3'>
        {/* Size */}
        <div className='relative w-full'>
          <div onClick={() => setToggles({ ...toggles, size: !toggles.size })} className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'>
            Size: {styles.size}px
            <ChevronDown className={`h-5 transition-transform ${toggles.size ? 'rotate-180' : ''}`} />
          </div>
          {toggles.size && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              {[10, 11, 12, 13, 14].map(s => (
                <li key={s} onClick={() => handleUpdate('size', s)} className='text-sm cursor-pointer hover:text-blue-600 font-medium'>{s}px</li>
              ))}
            </ul>
          )}
        </div>

        {/* Style (Italic/Normal) */}
        <div className='relative w-full'>
          <div onClick={() => setToggles({ ...toggles, style: !toggles.style })} className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'>
            {styles.style === 'italic' ? 'Italic' : 'Normal'}
            <ChevronDown className={`h-5 transition-transform ${toggles.style ? 'rotate-180' : ''}`} />
          </div>
          {toggles.style && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              <li onClick={() => handleUpdate('style', 'normal')} className='text-sm cursor-pointer hover:text-blue-600 font-medium'>Normal</li>
              <li onClick={() => handleUpdate('style', 'italic')} className='text-sm cursor-pointer hover:text-blue-600 font-medium'>Italic</li>
            </ul>
          )}
        </div>

        {/* Weight */}
        <div className='relative w-full'>
          <div onClick={() => setToggles({ ...toggles, weight: !toggles.weight })} className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'>
            {styles.weight === 'font-bold' ? 'Bold' : 'Normal'}
            <ChevronDown className={`h-5 transition-transform ${toggles.weight ? 'rotate-180' : ''}`} />
          </div>
          {toggles.weight && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              <li onClick={() => handleUpdate('weight', 'font-normal')} className='text-sm cursor-pointer hover:text-blue-600 font-medium'>Normal</li>
              <li onClick={() => handleUpdate('weight', 'font-bold')} className='text-sm cursor-pointer hover:text-blue-600 font-medium'>Bold</li>
            </ul>
          )}
        </div>

        {/* Case */}
        <div className='relative w-full'>
          <div onClick={() => setToggles({ ...toggles, case: !toggles.case })} className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between bg-white'>
            {styles.case === 'uppercase' ? 'Uppercase' : 'Normal'}
            <ChevronDown className={`h-5 transition-transform ${toggles.case ? 'rotate-180' : ''}`} />
          </div>
          {toggles.case && (
            <ul className='absolute z-10 bg-white flex flex-col p-4 gap-2 mt-2 w-full text-black rounded-xl shadow-lg'>
              <li onClick={() => handleUpdate('case', 'unset')} className='text-sm cursor-pointer hover:text-blue-600 font-medium'>Normal</li>
              <li onClick={() => handleUpdate('case', 'uppercase')} className='text-sm cursor-pointer hover:text-blue-600 font-medium'>Uppercase</li>
            </ul>
          )}
        </div>
      </section>

      {/* <p className='mt-10 font-semibold text-sm text-center w-full'>Preview</p>
      <div className='rounded-2xl bg-[#f3f5f7] mt-5 p-8 flex items-center justify-center min-h-[100px]'>
         <p 
           style={{ 
             fontSize: `${styles.size}px`, 
             textTransform: styles.case,
             letterSpacing: `${styles.spacing}px`
           }}
           className={`${styles.weight} ${styles.style} text-slate-500`}
         >
           Senior Product Manager / Full Stack Developer
         </p>
      </div> */}
    </section>
  )
}

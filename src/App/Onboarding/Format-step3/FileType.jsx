import { useDispatch } from 'react-redux'
import { selectFileType } from '../../../store/formatSlice'
import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
const docu = [
  { id: 1, selected: true, name: 'PDF (.pdf)' },
  { id: 2, selected: false, name: 'Word document(.word)' },
  { id: 3, selected: false, name: 'Plain text (.txt)' }
]
export default function FileType () {
  const dispatch = useDispatch()
  const [docuType, setDocuType] = useState(docu)
  function selectDocuType (id) {
    setDocuType(prev =>
      prev.map(item => {
        if (item.id === id) {
          dispatch(selectFileType(item.name))
          return { ...item, selected: true }
        } else {
          return { ...item, selected: false }
        }
      })
    )
  }
  return (
    <section>
      <QuestionHeader question='Which file format do you plan to submit? (PDF, Word Doc, Plain Text, etc.)'>
        Note that PDF preserves formatting hence it's the default and standard
        but some ATS systems prefer Word documents for parsing
      </QuestionHeader>
      <ul className='grid grid-cols-3 gap-3 mt-5 px-10'>
        {docuType.map(item => (
          <li
            key={item.id}
            onClick={() => {
              selectDocuType(item.id)
            }}
            className='flex  gap-5 w-full border cursor-pointer rounded-xl py-4 px-2 pl-5 border-slate-200 hover:shadow-lg transition-all duration-200 ease items-center'
          >
            <div
              className={`border ${
                item.selected && 'border-4'
              } border-[#ec5b13] inline-block w-4 h-4  rounded-full`}
            ></div>
            <div className='  text-sm font-semibold'>{item.name}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

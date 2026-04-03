import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { Plus, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveLanguages,
  deleteLanguages,
  setShowLanguages
} from '../../../store/personalSlice'

const options = [
  { id: 1, name: 'Yes' },
  { id: 2, name: 'No' }
]

export default function Language () {
  const [selectedOption, setSelectedOption] = useState(null)
  const [languageInput, setLanguageInput] = useState('')
  const { languages } = useSelector(state => state.personal)
  const dispatch = useDispatch()

  function handleOptionSelect (name) {
    setSelectedOption(name)
    dispatch(setShowLanguages(name === 'Yes'))
  }

  function removeLanguage (input) {
    dispatch(deleteLanguages(input))
  }

  function addLanguage () {
    const query = languageInput.trim()
    if (!query) return
    const found = languages?.find(
      item => item.toLowerCase() === query.toLowerCase()
    )
    if (found) {
      setLanguageInput('')
      return
    }
    dispatch(saveLanguages(query))
    setLanguageInput('')
  }

  return (
    <section className='mt-14'>
      <QuestionHeader question='Do you want to show the languages you speak?'>
        Adding languages you speak can be incredibly beneficial automatically if
        applying for a role that requires bilingual skills. Let us know if you
        want to include them on your resume.
      </QuestionHeader>

      <ul className='grid w-full grid-cols-2 gap-3 mt-5 px-10'>
        {options.map(item => (
          <li
            key={item.id}
            onClick={() => handleOptionSelect(item.name)}
            className={`flex gap-5 w-full border cursor-pointer rounded-xl py-4 pl-5 hover:shadow-lg transition-all duration-200 ease items-center justify-center px-2  
                ${
                  item.name === selectedOption
                    ? 'border-[#ec5b13]'
                    : 'border-slate-200'
                }
              `}
          >
            <div
              className={`border ${
                item.name === selectedOption && 'border-4'
              } border-[#ec5b13] inline-block w-4 h-4 rounded-full`}
            ></div>
            <div className='text-sm font-semibold'>{item.name}</div>
          </li>
        ))}
      </ul>

      {selectedOption === 'Yes' && (
        <div className='px-10 mt-6'>
          <div className='flex items-center gap-4 w-full md:w-[60%] border rounded-2xl py-3 px-6 border-black relative'>
            <input
              type='text'
              value={languageInput}
              onChange={e => setLanguageInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addLanguage()
                }
              }}
              className='w-full h-full outline-0 text-sm'
              placeholder='e.g., English, Spanish, French'
            />
            <button
              onClick={addLanguage}
              className='p-2 bg-gray-100 rounded-full hover:bg-gray-200'
            >
              <Plus className='w-4 h-4 text-black' />
            </button>
          </div>

          <section className='w-full flex gap-3 flex-wrap pt-5'>
            {languages?.map(item => (
              <div
                key={item}
                className='w-max flex items-center gap-4 bg-gray-100 rounded-2xl py-2 px-4 text-xs font-semibold'
              >
                {item}
                <X
                  onClick={() => {
                    removeLanguage(item)
                  }}
                  className='h-4 cursor-pointer w-4 hover:text-red-500'
                />
              </div>
            ))}
          </section>
        </div>
      )}
    </section>
  )
}

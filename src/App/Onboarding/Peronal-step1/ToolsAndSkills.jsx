import { useEffect, useMemo, useState } from 'react'
import { skills_and_tools } from '../../../utils/PersonalSkills'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { Search, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { saveSkillsAndTools } from '../../../store/personalSlice'
import useClickOutside from '../../../hooks/useClick'
export default function ToolsAndSkills () {
  const [searchInput, setSearchInput] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])

  const [isOpen, setIsOpen] = useState(false)
  const error = useSelector(state => state.personal.errors.skillsAndTools)
  const popupRef = useClickOutside(() => setIsOpen(false))
  const dispatch = useDispatch()
  const filteredSkills = useMemo(() => {
    const query = searchInput.toLowerCase().trim()
    if (query === '') {
      return []
    }

    return skills_and_tools.filter(item => {
      return item.toLowerCase().trim().includes(query)
    })
  }, [searchInput])
  function removeSkills (input) {
    setSelectedSkills(prev => prev.filter(item => item != input))
  }
  function addToSkills (input) {
    const query = input.toLowerCase()

    const found = selectedSkills.find(item => item.toLowerCase() === query)
    if (found) {
      return
    }

    setSelectedSkills(prev => [...prev, input])
  }

  useEffect(() => {
    dispatch(saveSkillsAndTools(selectedSkills))
  }, [selectedSkills, dispatch])
  return (
    <section className='flex mt-15 flex-col'>
      <div className='w-full flex items-center'>
        <QuestionHeader
          question='  What technical skills ( tools, programming languages, equipment,software,programs) do
            you use regularly ?'
        >
          List the tools you use daily. Pro-tip: Include at least 3 libraries
          relevant to your day to day activities to boost your chance of hiring
        </QuestionHeader>

        <div
          ref={popupRef}
          className='flex  relative border rounded-2xl items-center gap-5 py-3 ml-15 mt-6 self-end grow w-[50%] px-10 border-black'
        >
          <Search className='w-6 h-6' />
          <input
            type='text'
            onFocus={() => {
              setIsOpen(true)
            }}
            onChange={e => setSearchInput(e.target.value)}
            className='w-full h-full outline-0 text-sm'
            placeholder='Search by keywords '
          />

          {/* Suggestion Box */}
          {isOpen && searchInput.length > 0 && (
            <div className='absolute shadow-sm rounded-xl z-4 w-full -bottom-42 font-mono overflow-y-scroll overflow-hidden h-40 p-8 pt-2 text-sm font-light bg-white gap-1.5 flex flex-col left-0 right-0'>
              {filteredSkills.map(item => (
                <span
                  onClick={() => {
                    addToSkills(item)
                  }}
                  className=' cursor-pointer hover:text-orange-500'
                >
                  {item}
                </span>
              ))}
              <p
                onClick={() => {
                  addToSkills(searchInput)
                }}
                className='text-black cursor-pointer'
              >
                {searchInput.length > 2 && searchInput}
              </p>
            </div>
          )}
        </div>
      </div>
      <p className='text-red-500 font-semibold text-xs pl-14 mt-4'>
        {error?.length > 0 && error}
      </p>
      <section
        className={` ${
          isOpen ? 'w-[60%]' : 'w-full'
        } flex gap-3 flex-wrap px-10 pt-5 `}
      >
        {selectedSkills.map(item => (
          <div
            key={item}
            className='w-max flex gap-4 bg-gray-100 rounded-2xl p-2 text-xs font-semibold'
          >
            {item}
            <X
              onClick={() => {
                removeSkills(item)
              }}
              className='h-4 cursor-pointer w-4'
            />
          </div>
        ))}
      </section>
    </section>
  )
}

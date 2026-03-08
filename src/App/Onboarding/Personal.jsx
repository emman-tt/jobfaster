import { useMemo, useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { workType } from '../../utils/WorkType'
import { skills_and_tools } from '../../utils/PersonalSkills'
import { BackNext } from '../../components/BackNext'
import { QuestionHeader } from '../../components/QuestionHeader'
export const Personal = () => {
  const [works, setWorks] = useState(workType)
  const [searchInput, setSearchInput] = useState('')

  const [selectedSkills, setSelectedSkills] = useState([])
  const [edu, setEdu] = useState([
    {
      id: 1,
      level: 'Level of Education',
      instituition: 'Instituition',
      degree: 'Degree',
      year: 'Graduation year'
    }
  ])

  function selector (id, status) {
    if (status === false) {
      return setWorks(prev =>
        prev.map(item => (item.id === id ? { ...item, selected: true } : item))
      )
    }

    setWorks(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: false } : item))
    )
  }

  function addNewEducation () {
    const newField = {
      id: crypto.randomUUID(),
      level: 'Level of Education',
      instituition: 'Instituition',
      degree: 'Degree',
      year: 'Graduation year'
    }

    setEdu([...edu, newField])
  }

  const filteredSkills = useMemo(() => {
    const query = searchInput.toLowerCase().trim()
    if (query === '') {
      return []
    }

    return skills_and_tools.filter(item => {
      return item.toLowerCase().trim().includes(query)
    })
  }, [searchInput])

  function removeEducation (id) {
    setEdu(prev => prev.filter(item => item.id != id))
  }

  function addToSkills (input) {
    const query = input.toLowerCase()

    const found = selectedSkills.find(item => item.toLowerCase() === query)
    if (found) {
      return
    }

    setSelectedSkills(prev => [...prev, input])
  }

  function removeSkills (input) {
    setSelectedSkills(prev => prev.filter(item => item != input))
  }
  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <section className='mt-15 '>
        <QuestionHeader question=' Fill in your contact details'>
          It must be ATS standard, you do not need your street address for
          privacy reasons, phone number should follow international format
          (e.g., +1-555-0199)
        </QuestionHeader>
        <ul className='text-black px-10 grid-cols-2 grid gap-4 mt-4 w-full'>
          <li className='flex flex-col  gap-1 w-full '>
            <div className='  text-sm font-semibold pl-5'>Full name</div>
            <input
              placeholder='eg: Michael Daps'
              className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
            />
          </li>
          <li className='flex flex-col  gap-1 w-full '>
            <div className='  text-sm font-semibold pl-5'>Phone number</div>
            <input
              placeholder='eg: +234 583742342'
              className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
            />
          </li>
          <li className='flex flex-col  gap-1 w-full '>
            <div className='  text-sm font-semibold pl-5'>
              Country and City/State
            </div>
            <input
              placeholder='eg: Norway'
              className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
            />
          </li>
          <li className='flex flex-col  gap-1 w-full '>
            <div className='  text-sm font-semibold pl-5'>Email</div>
            <input
              placeholder='eg: Alaska'
              className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
            />
          </li>
        </ul>
      </section>

      <QuestionHeader question='What kind of work do you do ?'>
        Different industries have distinct language, tone, and
        standards—specialization helps use right keywords
      </QuestionHeader>

      <section className='grid grid-cols-2 p-6 gap-x-2 w-full gap-y-2'>
        {works.map(item => (
          <div
            key={item.id}
            onClick={() => {
              selector(item.id, item.selected)
            }}
            className='flex gap-5 w-full border cursor-pointer rounded-xl py-4 px-2 pl-5 border-slate-200 hover:shadow-lg transition-all duration-200 ease items-center'
          >
            <div
              className={`border ${
                item.selected && 'border-4'
              } border-[#ec5b13] inline-block w-4 h-4  rounded-full`}
            ></div>
            <div className='  text-sm font-semibold'>{item.name}</div>
          </div>
        ))}
      </section>

      <QuestionHeader
        question='  What is your highest level of education institution, degree, and
        graduation year?'
      ></QuestionHeader>
      <section className='flex flex-col  gap-0'>
        {edu.map((item, i) => (
          <section
            key={item.id}
            className='grid grid-cols-2 gap-2 mt-0 pt-5 p-6'
          >
            <div className='col-span-2 flex px-9 w-full justify-between'>
              <p className='text-xs w-6 h-6 font-semibold bg-gray-100 rounded-full flex justify-center items-center'>
                {i + 1}
              </p>
              <button
                onClick={() => removeEducation(item.id)}
                className='p-2 cursor-pointer bg-red-200 flex justify-center rounded-full items-center'
              >
                <Trash2 className='w-3 text-red-500 h-3' />
              </button>
            </div>
            <input
              name='level'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.level}
            />
            <input
              name='institution'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.instituition}
            />
            <input
              name='degree'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.degree}
            />
            <input
              name='graduation'
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-10 pr-3'
              placeholder={item.year}
            />
          </section>
        ))}
      </section>
      <button
        onClick={() => {
          addNewEducation()
        }}
        className=' py-4 rounded-2xl bg-orange-100 gap-5 items-center cursor-pointer text-orange-400 justify-center border-0  border-black/60 mt-2 w-[50%] flex self-center text-center font-semibold'
      >
        <Plus className='w-5 h-5' /> Add new
      </button>

      <section className='flex mt-15 flex-col'>
        <div className='w-full flex items-center'>
          <QuestionHeader
            question='  What technical skills ( tools, programming languages, equipment) do
            you use regularly ?'
          ></QuestionHeader>

          <div className='flex  relative border rounded-2xl items-center gap-5 py-3 ml-15 mt-6 self-end grow w-[50%] px-10 border-black'>
            <Search className='w-6 h-6' />
            <input
              type='text'
              onChange={e => setSearchInput(e.target.value)}
              className='w-full h-full outline-0 text-sm'
              placeholder='Search by keywords '
            />

            {/* Suggestion Box */}
            {searchInput.length > 0 && (
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
              </div>
            )}
          </div>
        </div>
        <section
          className={` ${
            searchInput.length > 0 ? 'w-[60%]' : 'w-full'
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
      <section className='mt-10'>
        <QuestionHeader
          question=' What are your most significant professional achievements? Please
          include specific metrics (percentages, dollar amounts, time saved)'
        >
          Employers want to know: 'What can you do for me?' and 'Can you achieve
          those results again?
        </QuestionHeader>

        <div className='w-[70%] px-10 flex items-center gap-7 mt-6'>
          <textarea
            type='text'
            rows={7}
            className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-5 pr-3'
          />
        </div>
      </section>

      <BackNext nextLink='/onboarding/job' className={'mt-25 px-10'} />
    </section>
  )
}

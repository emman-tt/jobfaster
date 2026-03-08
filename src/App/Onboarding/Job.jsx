import { useMemo, useState } from 'react'
import { Job_titles } from '../../utils/PersonalSkills'
import { Info, Plus, Search } from 'lucide-react'
import { BackNext } from '../../components/BackNext'
import { QuestionHeader } from '../../components/QuestionHeader'
export default function Jobs () {
  const [searchInput, setSearchInput] = useState('')
  const [works, setWorks] = useState(environment)
  const [location, setLocation] = useState(locationType)

  const filteredTitles = useMemo(() => {
    const query = searchInput.toLowerCase().trim()
    if (query === '') {
      return []
    }

    return Job_titles.filter(item => {
      return item.toLowerCase().trim().includes(query)
    })
  }, [searchInput])

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
  function selectLocationType (id, status) {
    if (status === false) {
      return setLocation(prev =>
        prev.map(item => (item.id === id ? { ...item, selected: true } : item))
      )
    }

    setLocation(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: false } : item))
    )
  }

  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <div className='w-full flex items-center'>
        <QuestionHeader question='   What specific job titles are you targeting ?'>
          Different industries have distinct language, tone, and
          standards—specialization helps use right keywords
        </QuestionHeader>

        <div className='flex relative border rounded-2xl items-center gap-5 py-3 ml-15 mt-4 self-end  w-[60%] px-10 border-black'>
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
              {filteredTitles.map(item => (
                <span className=' cursor-pointer hover:text-orange-500'>
                  {item}
                </span>
              ))}
              <p className='text-black'>
                {searchInput.length > 2 && searchInput}
              </p>
            </div>
          )}
        </div>
      </div>

      <section className='mt-9'>
        <h2 className='mt-4 pl-7 w-max  font-my-font font-semibold text-lg'>
          What type of company culture/environment do you thrive in?
        </h2>

        <p className='text-xs text-black/80 flex gap-3 pl-7'>
          <Info className='w-3 h-3 mt-1 ' />
          To inject the "missing" keywords that recruiters in that specific
          environment and culture look for.
        </p>

        <ul className='grid grid-cols-2 w-full gap-3 px-10 mt-7'>
          {works.map(item => (
            <li
              key={item.id}
              onClick={() => {
                selector(item.id, item.selected)
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

      <section className='w-full mt-10'>
        <h2 className='mt-4 pl-7 w-max  font-my-font font-semibold text-lg'>
          What job location-type works best for you?
        </h2>

        <p className='text-xs text-black/80 flex gap-3 pl-7'>
          <Info className='w-3 h-3 mt-1 ' />
          Required to rate you and tailor your cover letter when applying for a
          job
        </p>

        <ul className='grid grid-cols-3 w-full gap-3 px-10 mt-3'>
          {location.map(item => (
            <li
              key={item.id}
              onClick={() => {
                selectLocationType(item.id, item.selected)
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

      <section className='mt-10 flex flex-col'>
        <h2 className='mt-4 pl-7 w-max  font-my-font font-semibold text-lg'>
          What are your salary expectations for your next role in dollars ($)?
        </h2>

        <p className='text-xs text-black/80 flex gap-3 pl-7'>
          <Info className='w-3 h-3 mt-1 ' />
          Helps to provide best financial answers to recruiters concerning
          salaries
        </p>

        <div className='flex  relative border rounded-2xl items-center gap-5 py-3 ml-10 mt-2  w-[50%] px-10 border-black'>
          <Search className='w-6 h-6' />
          <input
            type='number'
            className='w-full h-full outline-0 text-sm'
            placeholder='eg: 4302.00 '
          />
        </div>
      </section>

      <BackNext
        nextLink='/onboarding/format'
        previousLink='/onboarding/personal'
        className={'mt-13 px-10'}
      />
    </section>
  )
}

const locationType = [
  { id: 1, name: 'On-site', selected: false },
  {
    id: 2,
    name: 'Remote',
    selected: false
  },
  {
    id: 3,
    name: 'Hybrid',
    selected: false
  }
]

const environment = [
  { id: 1, name: 'Corporate', selected: false },
  {
    id: 2,
    name: 'Startup',
    selected: false
  },
  {
    id: 3,
    name: 'SME',
    selected: false
  },
  {
    id: 4,
    name: 'Freelance',
    selected: false
  },
  {
    id: 5,
    name: 'Non-profit',
    selected: false
  },
  {
    id: 6,
    name: 'Government',
    selected: false
  },
  {
    id: 7,
    name: 'Formal',
    selected: false
  },
  {
    id: 8,
    name: 'Industrial',
    selected: false
  }
]

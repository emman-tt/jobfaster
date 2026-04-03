import { useEffect, useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { saveEnvironment } from '../../../store/jobSlice'
import { useDispatch } from 'react-redux'
export default function Environment () {
  const [works, setWorks] = useState(environment)
  const dispatch = useDispatch()
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

  useEffect(() => {
    const selects = works.filter(item => item.selected === true)
    dispatch(saveEnvironment(selects.map(item => item.name)))
  }, [works, dispatch])
  return (
    <section className='mt-9'>
      <QuestionHeader question='What type of company culture/environment do you thrive in?'>
        To inject the "missing" keywords that recruiters in that specific
        environment and culture look for.
      </QuestionHeader>

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
  )
}
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

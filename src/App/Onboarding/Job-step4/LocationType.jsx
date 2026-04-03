import { Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { saveJobLocation } from '../../../store/jobSlice'
import { useDispatch } from 'react-redux'
export default function LocationType () {
  const [location, setLocation] = useState(locationType)
  const dispatch = useDispatch()
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

  useEffect(() => {
    const selects = location.filter(item => item.selected === true)
    dispatch(saveJobLocation(selects.map(item => item.name)))
  }, [location, dispatch])

  return (
    <section className='w-full mt-10'>
      <QuestionHeader question='What job location-type works best for you?'>
        Required to rate you and tailor your cover letter when applying for a
        job
      </QuestionHeader>

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

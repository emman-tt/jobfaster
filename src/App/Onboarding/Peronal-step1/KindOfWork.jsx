import { useEffect, useState } from 'react'
import { workType } from '../../../utils/WorkType'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { useDispatch } from 'react-redux'
import { saveKindsOfWorks } from '../../../store/personalSlice'
export default function KindOfWork () {
  const [works, setWorks] = useState(workType)
  const dispatch = useDispatch()
  function selector (id) {
    setWorks(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  useEffect(() => {
    const selectedWorks = works
      .filter(item => item.selected)
      .map(({ id, name, category, examples, source }) => ({
        id,
        name,
        category,
        examples,
        source
      }))

    dispatch(saveKindsOfWorks(selectedWorks))
  }, [works, dispatch])
  return (
    <section className='mt-15'>
      <QuestionHeader question='What kind of work do you do ?'>
        Different industries have distinct language, tone, and
        standards—specialization helps use right keywords.Its best to select at
        least one.
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
    </section>
  )
}

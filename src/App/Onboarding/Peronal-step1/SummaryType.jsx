import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { selectSummaryType } from '../../../store/personalSlice'
import { useDispatch } from 'react-redux'
const summaryType = [
  { id: 1, selected: true, name: 'Professional summary' },
  { id: 2, selected: false, name: 'Objectives summary' },
  { id: 3, selected: false, name: 'No summary' }
]

export default function SummaryType () {
  const [summary, setSummary] = useState(summaryType)
  const dispath = useDispatch()
  function selectSummary (id) {
    setSummary(prev =>
      prev.map(item => {
        if (item.id === id) {
          dispath(selectSummaryType(item.name))
          return { ...item, selected: true }
        } else {
          return { ...item, selected: false }
        }
      })
    )
  }
  return (
    <section className='mt-14'>
      <QuestionHeader question=' Should your resume include a professional summary or objective statement at the top?'>
        Objective statements are outdated and only needed for entry level with
        no skills nor knowledge nor idea of the job whiles profesionnal summary
        is standard and hooks the recruiter to your resume.
      </QuestionHeader>

      <ul className='grid w-full grid-cols-3 gap-3 mt-5 px-10'>
        {summary.map(item => (
          <li
            key={item.id}
            onClick={() => selectSummary(item.id)}
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

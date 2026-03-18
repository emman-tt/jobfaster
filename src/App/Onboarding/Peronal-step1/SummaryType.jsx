import { QuestionHeader } from '../../../components/QuestionHeader'
import { saveSummary, selectSummaryType } from '../../../store/personalSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
const summary = [
  { id: 1, selected: false, name: 'No summary' },
  { id: 2, selected: true, name: 'Professional summary' },
  { id: 3, selected: false, name: 'Objectives summary' }
]

export default function SummaryType () {
  const { summaryType } = useSelector(state => state.personal)
  const dispath = useDispatch()
  function selectSummary (id) {
    const type = summary.find(item => item.id == id).name
    dispath(selectSummaryType(type))
  }

  function handleChange (e) {
    const { value } = e.target
    dispath(saveSummary(value))
  }
  return (
    <section className='mt-14'>
      <QuestionHeader question=' Should your resume include a professional summary or objective statement at the top?'>
        Unless your have much experience or deem it very important , let your
        Projects and Internships do the talking. A clean, one-page layout
        without a summary looks more "Senior" and confident.Most recruiters
        prefer seeing your Experience first. Keep it under 2 lines if used.
      </QuestionHeader>

      <ul className='grid w-full   grid-cols-3 gap-3 mt-5 px-10'>
        {summary.map(item => (
          <li
            key={item.id}
            onClick={() => selectSummary(item.id)}
            className={`flex  gap-5  w-full border cursor-pointer rounded-xl py-4  pl-5  hover:shadow-lg transition-all duration-200 ease items-center justify-center px-2  
                ${
                  item.name == summaryType
                    ? 'border-[#ec5b13]'
                    : 'border-slate-200'
                }
              `}
          >
            <div
              className={`border ${
                item.name == summaryType && 'border-4'
              } border-[#ec5b13] inline-block w-4 h-4  rounded-full`}
            ></div>
            <div className='text-sm font-semibold'>{item.name}</div>
          </li>
        ))}
        {summaryType !== 'No summary' && (
          <li className=' col-span-3 '>
            <textarea
              onChange={handleChange}
              placeholder='Frontend Developer with experience in React and Node.js. Specialized in building scalable web applications and sophisticated UI animations.'
              type='text'
              rows={7}
              className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-5 pr-3'
            />
          </li>
        )}
      </ul>
    </section>
  )
}

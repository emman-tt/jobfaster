import { useState } from 'react'
import TextBox from '../../../components/Textbox'
import { Info } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { saveSummary } from '../../../store/personalSlice'

export default function Summary () {
  const [summary, setSummary] = useState('')
  const dispatch = useDispatch()
  const { appearance } = useSelector(state => state.preferences)

  const handleSummaryChange = text => {
    setSummary(text)
    dispatch(saveSummary(text))
  }

  return (
    <div className='w-full px-0'>
      <h3
        className={`text-xs font-bold uppercase tracking-wide mb-3 ${
          appearance.theme == 'dark' ? 'text-slate-300' : 'text-gray-600'
        }`}
      >
        Tell us about your professional summary
      </h3>
      <p
        className={`text-xs mb-5 flex items-start gap-2 ${
          appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-500'
        }`}
      >
        <span className='text-orange-500 shrink-0 mt-0.5'>
          <Info className='w-2 h-2' />
        </span>
        <span>
          Write a brief overview of your professional background, key
          achievements, and career goals. Keep it concise and impactful.
        </span>
      </p>
      <TextBox
        width='w-full'
        height='h-64'
        placeholder=''
        className={`${
          appearance.theme == 'dark'
            ? 'bg-black text-white border-0'
            : 'bg-gray-50 text-gray-900 border-white'
        }`}
        value={summary}
        onChange={handleSummaryChange}
      />
    </div>
  )
}

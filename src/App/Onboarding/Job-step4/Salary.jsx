import { useEffect, useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { useDispatch } from 'react-redux'
import { saveSalary } from '../../../store/jobSlice'
import { Search } from 'lucide-react'
export default function Salary () {
  const [amount, setAmount] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(saveSalary(parseFloat(amount)))
    }, 500)
  }, [amount, dispatch])
  return (
    <section className='mt-10 flex flex-col'>
      <QuestionHeader
        question='  What are your salary expectations for your next role in dollars ($)
        ?(optional)'
      >
        Helps to provide best financial answers to recruiters concerning
        salaries
      </QuestionHeader>

      <div className='flex  relative border rounded-2xl items-center gap-5 py-3 ml-10 mt-2  w-[50%] px-10 border-black'>
        <Search className='w-6 h-6' />
        <input
          onChange={e => {
            setAmount(e.target.value)
          }}
          type='number'
          className='w-full h-full outline-0 text-sm'
          placeholder='eg: 4302.00 '
        />
      </div>
    </section>
  )
}

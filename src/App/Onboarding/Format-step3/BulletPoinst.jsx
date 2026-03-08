import { QuestionHeader } from '../../../components/QuestionHeader'
import { saveBulletCount } from '../../../store/formatSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function BulletPoints () {
  const dispatch = useDispatch()
  const { relevantBulletCount, lessRelevantBulletCount } = useSelector(
    state => state.format
  )
  return (
    <section className='mt-15'>
      <QuestionHeader question='How many bullet points per job/experience/projects/volunteers should you include?'>
        Ideally , you need 3-5 bullet points for recent roles and 1-2 for older
        or less relevant positions , this is very important
      </QuestionHeader>

      <section className='flex w-[80%] mt-8 px-10 gap-5'>
        <input
          type='number'
          max={10}
          min={0}
          value={relevantBulletCount}
          onChange={e => {
            dispatch(
              saveBulletCount({
                category: 'relevant',
                value: e.target.value
              })
            )
          }}
          className=' py-4 pl-7 w-full pr-4 rounded-2xl shadow'
          placeholder='Number of relevant points'
        />
        <input
          max={10}
          min={0}
          value={lessRelevantBulletCount}
          onChange={e => {
            dispatch(
              saveBulletCount({
                category: 'irrelevant',
                value: e.target.value
              })
            )
          }}
          type='number'
          className=' py-4 pl-7 w-full pr-4 rounded-2xl shadow'
          placeholder='Number of less relevant points'
        />
      </section>
    </section>
  )
}

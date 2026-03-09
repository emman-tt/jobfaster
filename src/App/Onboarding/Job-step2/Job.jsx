import JobTitle from './JobTitle'
import { Info, Plus, Search } from 'lucide-react'
import { BackNext } from '../../../components/BackNext'
import { QuestionHeader } from '../../../components/QuestionHeader'
import Environment from './Environment'
import LocationType from './LocationType'
export default function Jobs () {
  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <JobTitle />
      <Environment />
      <LocationType />

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
        previousLink='/onboarding/experience'
        className={'mt-13 px-10'}
      />
    </section>
  )
}

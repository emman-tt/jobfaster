import JobTitle from './JobTitle'
import { Info, Plus, Search } from 'lucide-react'
import { BackNext } from '../../../components/BackNext'
import { QuestionHeader } from '../../../components/QuestionHeader'
import Environment from './Environment'
import LocationType from './LocationType'
import Salary from './Salary'
import { useNavigate } from 'react-router-dom'
export default function Jobs () {
  const navigate = useNavigate()
  function navigateNext () {
    try {
      navigate('/onboarding/format')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <JobTitle />
      <Environment />
      <LocationType />
      <Salary />

      <BackNext
        onClick={() => navigateNext()}
        previousLink='/onboarding/experience'
        className={'mt-13 px-10'}
      />
    </section>
  )
}

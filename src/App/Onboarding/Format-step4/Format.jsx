import { BackNext } from '../../../components/BackNext'
import FileType from './fileType'
import BulletPoints from './BulletPoinst'
import Hobbies from './Hobbies'
import NameStyles from './NameStyles'
import SectionHeaderStyles from './SectionHeaderStyles'
import CompanyStyles from './CompanyStyles'
import JobTitleStyles from './JobTitleStyles'
import BodyStyles from './BodyStyles'
import DateContactStyles from './DateContactStyles'
import { toggleFinale } from '../../../store/onboardingSlice'

import { useDispatch } from 'react-redux'

export default function Format () {
  
  const dispatch = useDispatch()

  function navigateNext () {
    try {
      dispatch(toggleFinale(true))
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }

  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <FileType />
      <NameStyles />
      <SectionHeaderStyles />
      <CompanyStyles />
      <JobTitleStyles />
      <BodyStyles />
      <DateContactStyles />
      <BackNext
        className={'mt-15'}
        onClick={() => navigateNext()}
        previousLink='/onboarding/job'
      />
    </section>
  )
}

const Yes_and_no = [
  { id: 1, selected: false, name: 'Yes' },
  { id: 2, selected: true, name: 'No' }
]

import { BackNext } from '../../../components/BackNext'
import FileType from './FileType'
import FontType from './FontType'
import NameStyles from './NameStyles'
import SectionHeaderStyles from './SectionHeaderStyles'
import CompanyStyles from './CompanyStyles'
import JobTitleStyles from './JobTitleStyles'
import BodyStyles from './BodyStyles'
import DateContactStyles from './DateContactStyles'


export default function Format () {
  

  function navigateNext () {
    try {
     console.log('next')
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }

  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <FileType />
      <FontType />
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

import { QuestionHeader } from '../../../components/QuestionHeader'
import { BackNext } from '../../../components/BackNext'
import { TwoButtonsAnswer } from '../../../components/TwoButtonsAnswer'
import FileType from './fileType'
import SummaryType from '../Peronal-step1/SummaryType'
import OnlineLinks from '../Peronal-step1/OnlineLinks'
import BulletPoints from './BulletPoinst'
import Hobbies from './Hobbies'
import NameStyles from './NameStyles'
import SectionHeaderStyles from './SectionHeaderStyles'
import CompanyStyles from './CompanyStyles'
import JobTitleStyles from './JobTitleStyles'
import BodyStyles from './BodyStyles'
import DateContactStyles from './DateContactStyles'
import { ValidateFormat } from '../Validators/format'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveErrors } from '../../../store/formatSlice'

export default function Format () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(state => state.format)

  function navigateNext () {
    try {
      const { hasError, error } = ValidateFormat(data)

      dispatch(saveErrors(error))
      if (hasError) {
        return
      }
      navigate('/onboarding/job')
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }

  function saveSummaryType (item) {
    // dispatch(selectSummaryType(item))
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

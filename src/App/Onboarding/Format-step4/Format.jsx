import { QuestionHeader } from '../../../components/QuestionHeader'
import { BackNext } from '../../../components/BackNext'
import { TwoButtonsAnswer } from '../../../components/TwoButtonsAnswer'
import FileType from './fileType'
import SummaryType from './SummaryType'
import OnlineLinks from './OnlineLinks'
import BulletPoints from './BulletPoinst'
import Hobbies from './Hobbies'
import HeaderStyles from './HeaderStyles'
import BulletStyles from './BulletStyles'
import BodyStyles from './BodyStyles'
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

  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <FileType />
      <SummaryType />
      <OnlineLinks />
      <section className='mt-15'>
        <QuestionHeader question='Should you include dates for education and certifications?'>
          For professionals with 20+ years of experience, removing the
          graduation year from a degree obtained in the early 2000s can help
          prevent "age-guessing" by recruiters.
        </QuestionHeader>
        <section className='flex w-[80%] mt-8 px-10 gap-5'>
          <TwoButtonsAnswer defaultSelect='No' options={['Yes', 'No']} />
        </section>
      </section>
      <section className='mt-15'>
        <QuestionHeader question='Do you want to use bullet points or paragraph descriptions for your experience?'>
          95% of recruiters prefer bullet points because they make your
          achievements easier to read at a glance.
        </QuestionHeader>
        <section className='flex w-[80%] mt-8 px-10 gap-5'>
          <TwoButtonsAnswer defaultSelect='Yes' options={['Yes', 'No']} />
        </section>
      </section>
      <BulletPoints />
      <Hobbies />
      <HeaderStyles />
      <BulletStyles />
      <BodyStyles />
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

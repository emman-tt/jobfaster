import { BackNext } from '../../../components/BackNext'
import { QuestionHeader } from '../../../components/QuestionHeader'
import Address from './Address'
import KindOfWork from './KindOfWork'
import Education from './Education'
import ToolsAndSkills from './ToolsAndSkills'
import { useSelector } from 'react-redux'
import { validateContact } from '../Validators/personal'
import { saveErrors } from '../../../store/personalSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export const Personal = () => {
  const dispatch = useDispatch()
  const personalData = useSelector(
    state => state.personal
  )
  const navigate = useNavigate()
  function navigateNext () {
    try {
      const { hasError, errors } = validateContact(personalData)
      dispatch(saveErrors(errors))
      if (hasError) {
        return
      }

      navigate('experience')
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }
  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <Address />
      <KindOfWork />
      <ToolsAndSkills />
      <Education />
      <BackNext
        onClick={() => {
          navigateNext()
        }}
        nextLink='/onboarding/experience'
        className={'mt-25 px-10'}
      />
    </section>
  )
}

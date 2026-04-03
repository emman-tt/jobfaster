import { BackNext } from '../../../components/BackNext'
import { QuestionHeader } from '../../../components/QuestionHeader'
import Address from './Address'
import KindOfWork from './KindOfWork'
import Education from './Education'
import ToolsAndSkills from './ToolsAndSkills'

import { useNavigate } from 'react-router-dom'
import SummaryType from './SummaryType'
import OnlineLinks from './OnlineLinks'
import Language from './Language'
export const Personal = () => {
  const navigate = useNavigate()
  function navigateNext () {
    try {
      navigate('/onboarding/experience')
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }
  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <Address />
      <SummaryType />
      <ToolsAndSkills />
      <Language />
      <OnlineLinks />
      <Education />
      <BackNext
        onClick={() => {
          navigateNext()
        }}
        previousLink={'/dashboard'}
        className={'mt-25 px-10'}
      />
    </section>
  )
}

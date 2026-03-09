import { BackNext } from '../../../components/BackNext'
import { QuestionHeader } from '../../../components/QuestionHeader'
import Address from './Address'
import KindOfWork from './KindOfWork'
import Education from './Education'
import ToolsAndSkills from './ToolsAndSkills'
export const Personal = () => {
  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <Address />
      <KindOfWork />
      <ToolsAndSkills />
      <Education />
      <BackNext nextLink='/onboarding/experience' className={'mt-25 px-10'} />
    </section>
  )
}

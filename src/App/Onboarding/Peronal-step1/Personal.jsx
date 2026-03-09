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
      <Education />
      <ToolsAndSkills />

      <section className='mt-10'>
        <QuestionHeader
          question=' What are your most significant professional achievements? Please
          include specific metrics (percentages, dollar amounts, time saved)'
        >
          Employers want to know: 'What can you do for me?' and 'Can you achieve
          those results again?
        </QuestionHeader>

        <div className='w-[70%] px-10 flex items-center gap-7 mt-6'>
          <textarea
            type='text'
            rows={7}
            className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-5 pr-3'
          />
        </div>
      </section>

      <BackNext nextLink='/onboarding/experience' className={'mt-25 px-10'} />
    </section>
  )
}

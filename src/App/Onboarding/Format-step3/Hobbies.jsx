import { QuestionHeader } from '../../../components/QuestionHeader'
import { TwoButtonsAnswer } from '../../../components/TwoButtonsAnswer'
import { TextArea } from '../../../components/TextArea'
export default function Hobbies () {
  return (
    <section className='mt-15'>
      <QuestionHeader question='Do you want to include non-traditional sections like hobbies in your cover letter, If yes please list them in numeric order in the box'>
        Hobbies can spark conversation but only include if relevant or
        demonstrate transferable skills
      </QuestionHeader>

      <section className='flex w-[80%] mt-8 px-10 gap-5'>
        <TwoButtonsAnswer defaultSelect='Yes' options={['Yes', 'No']} />
      </section>

      <div className='w-[70%] px-10 flex items-center gap-7 mt-6'>
        <textarea
          type='text'
          rows={7}
          className='w-full border text-sm border-slate-300 rounded-xl text-black outline-0 py-3 pl-5 pr-3'
        />
      </div>
    </section>
  )
}

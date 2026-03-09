import Question from './Question'
import { AddNewButton } from '../../../components/AddNewButton'
import { BackNext } from '../../../components/BackNext'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
export default function Experience () {
  const [questions, setQuestions] = useState(ques)

  function addNewExperience () {
    const last = questions.at(-1).id
    setQuestions(prev => [...prev, { id: last + 1, section: <Question /> }])
  }
  return (
    <section className='w-full h-max  flex flex-col py-20 pt-10  rounded-2xl bg-white'>
      <section className='flex flex-col gap-15'>
        {questions.map(item => (
          <div className='flex flex-col h-full  px-15'>
            <h2 className='text-sm font-semibold bg-slate-100 ml-10 rounded-3xl px-4 w-max py-4 flex justify-center items-center'>
              Question {item.id}
            </h2>
            {item.section}
          </div>
        ))}
      </section>

      <div className='w-full flex mt-15 justify-center'>
        <AddNewButton
          onClick={() => addNewExperience()}
          className={'w-[30%] py-4 items-center'}
        >
          <PlusCircle className='w-4 h-4' />
        </AddNewButton>
      </div>
      <BackNext
        previousLink='/onboarding/personal'
        nextLink='/onboarding/job'
        className={'mt-25 px-10'}
      />
    </section>
  )
}

const ques = [
  { id: 1, section: <Question /> },
  { id: 2, section: <Question /> },
  { id: 3, section: <Question /> }
]

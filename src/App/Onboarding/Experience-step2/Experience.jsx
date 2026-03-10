import Question from './Question'
import { AddNewButton } from '../../../components/AddNewButton'
import { BackNext } from '../../../components/BackNext'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveExperience, addExtraField } from '../../../store/experienceSlice'
export default function Experience () {
  const [questions, setQuestions] = useState([1, 2, 3])
  const dispatch = useDispatch()
  const { experience } = useSelector(state => state.experience)

  function addNewExperience () {
    const last = questions.at(-1)
    setQuestions(prev => [...prev, last + 1])

    dispatch(
      addExtraField({
        id: last + 1,
        summary: '',
        toolsAndSoftware: '',
        metricsAndValues: '',
        majorChallengeSolved: '',
        teamAbilities: '',
        finalResult: ''
      })
    )
  }

  function handleAnswer (e, id) {
    const { value, name } = e.target

    console.log(value, name, id)
    dispatch(
      saveExperience({
        id: id,
        value: value,
        name: name
      })
    )

    // setAns(prev =>
    //   prev.map(item => (item.id === id ? { ...item, [name]: value } : item))
    // )
  }

  return (
    <section className='w-full h-max  flex flex-col py-20 pt-10  rounded-2xl bg-white'>
      <section className='flex flex-col gap-15'>
        {questions.map(item => {
          const currentAns = experience.find(a => a.id === item) || {}

          return (
            <div key={item} className='flex flex-col h-full  px-15'>
              <h2 className='text-sm font-semibold bg-slate-100 ml-10 rounded-3xl px-4 w-max py-4 flex justify-center items-center'>
                Question {item}
              </h2>
              <Question
                onChange={e => {
                  handleAnswer(e, item)
                }}
                currentAns={currentAns}
              />
            </div>
          )
        })}
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

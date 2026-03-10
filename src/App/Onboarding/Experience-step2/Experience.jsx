import Question from './Question'
import { AddNewButton } from '../../../components/AddNewButton'
import { BackNext } from '../../../components/BackNext'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveExperience,
  addExtraField,
  saveErrors
} from '../../../store/experienceSlice'
import { validateExperience } from '../Validators/experience'
import { useNavigate } from 'react-router-dom'
export default function Experience () {
  const [questions, setQuestions] = useState([1, 2])
  const dispatch = useDispatch()
  const { experience } = useSelector(state => state.experience)
  const navigate = useNavigate()
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

    dispatch(
      saveExperience({
        id: id,
        value: value,
        name: name
      })
    )
  }

  function navigateNext () {
    try {
      const { hasError, errors } = validateExperience(experience)
      dispatch(saveErrors(errors))
      if (hasError) {
        return
      }
      navigate('/onboarding/job')
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }

  return (
    <section className='w-full h-max  flex flex-col py-20 pt-10  rounded-2xl bg-white'>
      <section className='flex flex-col gap-24'>
        {questions.map(item => {
          const currentAns = experience.find(a => a.id === item) || {}

          return (
            <div key={item} className='flex flex-col h-full  px-15'>
              <h2 className='text-sm font-semibold bg-slate-100 ml-10 rounded-3xl px-4 w-max py-4 flex justify-center items-center'>
                Question {item}
              </h2>
              <Question
                questionId={item}
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
          text=' Add More Experience'
          onClick={() => addNewExperience()}
          className={'w-[30%] py-4 items-center'}
        >
          <PlusCircle className='w-4 h-4' />
        </AddNewButton>
      </div>
      <BackNext
        previousLink='/onboarding/personal'
        onClick={() => navigateNext()}
        className={'mt-25 px-10'}
      />
    </section>
  )
}

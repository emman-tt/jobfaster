import { QuestionHeader } from '../components/QuestionHeader'
import { useSelector } from 'react-redux'
import { BackNext } from '../components/BackNext'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { saveCorrectionAnswers } from '../store/aiSlice'
import { toggleModals } from '../store/modalSlice'
import UploadResume from '../App/Dashboard/Overview/Modals/UploadResume'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Overlay from '../components/Overlay'

export default function Correction () {
  const corrections = useSelector(state => state.ai.corrections) || []
  const { modals } = useSelector(state => state.modal)
  const [answers, setAnswers] = useState([])
  const dispatch = useDispatch()

  function handleInput (input, data) {
    const current = answers.find(i => i.id === data.id)

    if (!current) {
      const newItem = {
        ...data,
        answer: input
      }
      return setAnswers(prev => [...prev, newItem])
    }

    setAnswers(prev =>
      prev.map(i => (i.id === current.id ? { ...i, answer: input } : i))
    )
  }

  let count = 0

  answers.map(each => {
    const ans = each.answer
    if (ans.trim().length > 5) {
      return count++
    }
  })

  const meterWidth = (count / corrections.length) * 100

  function submitAnswers () {
    dispatch(saveCorrectionAnswers(answers))
    dispatch(toggleModals('correction'))
  }

  return (
    <section className=' p-5  justify-center pt-0 relative min-h-screen  flex w-full bg-[#f3f5f7]'>
      {modals.correction && (
        <>
          <Overlay
            className={
              'bg-[#e0e4e582] z-10 pointer-events-none backdrop-blur-sm'
            }
          />

          <section className=' fixed min-h-100 p-8 pb-5 transition-all duration-200 ease-in-out translate-x-0 translate-y-20 z-51 shadow-xl w-[38%] bg-white rounded-2xl flex flex-col gap-4'>
            <section className=' w-full flex flex-col h-full gap-3'>
              <Anime />
              <p className=' text-xl font-semibold font-IBM text-center '>
                Optimizing and re-writing your resume ...
              </p>
            </section>
          </section>
        </>
      )}
      <section className='w-[65%] h-full flex flex-col relative  gap-10 '>
        <section className='w-50  flex flex-col fixed left-10 top-[20%]'>
          <div className=' w-full rounded-2xl flex h-3 border-orange-400 border flex-col bg-white  relative'>
            <div
              style={{
                width: `${meterWidth}%`
              }}
              className=' transition-all duration-350 ease-in-out absolute bg-orange-400   rounded-[inherit] inset-0'
            ></div>
          </div>
          <div className=' flex w-full justify-between  text-[11px] mt-1 font-satoshi '>
            <p className=' text-red-500'>Weak</p>
            <p className=' text-yellow-300'>Okay</p>
            <p className=' text-green-700'>Strong</p>
          </div>
          <p className=' text-sm font-satoshi text-center mt-2'>
            Boost your resume answering by more
          </p>
        </section>
        {corrections.length > 0 && (
          <h2 className=' text-4xl pl-10 mt-10 font-IBM font-semibold '>
            Maximize your hireability by clarifying these details
          </h2>
        )}

        <section className='w-full h-full rounded-2xl py-10 gap-20 flex flex-col shadow-xl bg-white'>
          {corrections.length > 0 &&
            corrections.map(item => (
              <section key={item.id} className=' px-10 '>
                <QuestionHeader question={item.suggestion}>
                  This can be found at {item.fixContext} ({item.fixLocation})
                </QuestionHeader>

                <textarea
                  onChange={e => handleInput(e.target.value, item)}
                  name='correction'
                  className=' border w-full mt-5 p-10 font-semibold rounded-xl h-50 '
                ></textarea>
              </section>
            ))}

          <section className=' w-full px-15'>
            <BackNext
              onClick={() => submitAnswers()}
              previousLink={'/dashboard'}
            />
          </section>
        </section>
      </section>
    </section>
  )
}

const Anime = () => {
  return (
    <DotLottieReact
      src='https://lottie.host/5c4c3ada-6520-42e9-baa2-d2208cbee574/JxqLRLZLZA.lottie'
      loop
      autoplay
    />
  )
}

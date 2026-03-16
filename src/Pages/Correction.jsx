import { QuestionHeader } from '../components/QuestionHeader'
import { useSelector } from 'react-redux'
import { BackNext } from '../components/BackNext'
export default function Correction () {
  const corrections = useSelector(state => state.ai.corrections) || []
  return (
    <section className=' p-5  justify-center pt-10 min-h-screen  flex w-full bg-[#f3f5f7]'>
      <section className='w-[65%] h-full flex flex-col  gap-10 '>
        {corrections.length > 0 && (
          <h2 className=' text-4xl pl-10 font-IBM font-semibold '>
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
                  name='correction'
                  className=' border w-full mt-5 p-10 font-semibold rounded-xl h-50 '
                ></textarea>
              </section>
            ))}

          <section>
            <BackNext />
          </section>
        </section>
      </section>
    </section>
  )
}

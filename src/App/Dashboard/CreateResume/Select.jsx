import { ArrowRight, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cv from '../../../assets/img/cv.jpg'
import cv1 from '../../../assets/img/cv1.jpg'

export default function Select () {
  const [select, setSelect] = useState('creative')
  const navigate = useNavigate()

  function navigateNext () {
    navigate('/dashboard/create/resume/examples')
  }
  return (
    <section className='  flex w-full h-full px-10 justify-center items-center gap-10 flex-col'>
      <h2 className=' font-semibold text-3xl font-IBM'>
        Choose your type of Resume
      </h2>

      <section className=' flex gap-20 px-10'>
        <div
          onClick={() => {
            setSelect('classic')
          }}
          className=' cursor-pointer flex flex-col items-center gap-5'
        >
          <div
            className={`h-90 ${
              select == 'classic' && 'border border-orange-400'
            } w-80 bg-gray-50 rounded-xl`}
          >
            <img
              src={cv1}
              className=' h-full w-full object-fill rounded-[inherit]'
              alt='cv'
            />
          </div>
          <div className=' flex gap-5 items-center'>
            <p className=' '>Classic Resume </p>
            {select == 'classic' && (
              <p
                className={
                  'rounded-3xl flex gap-3 items-center text-white p-2  bg-green-700 text-xs'
                }
              >
                selected
                <CheckCircle className=' w-3 h-3' />
              </p>
            )}
          </div>
          <p className=' font-satoshi text-sm'>
            This is the traditional type of resume , the colour is monochrome
            (mostly black) , the design is verly less or non actually, there's
            less need for pictures.
          </p>
        </div>
        <div
          onClick={() => {
            setSelect('creative')
          }}
          className=' cursor-pointer flex flex-col items-center gap-5'
        >
          <div
            className={`h-90 ${
              select == 'creative' && 'border border-orange-400'
            } w-80 bg-gray-50 rounded-xl`}
          >
            <img
              src={cv}
              className=' h-full w-full object-cover rounded-[inherit]'
              alt='cv'
            />
          </div>
          <div className=' flex gap-5 items-center'>
            <p className=' '>Creative Resume </p>
            {select == 'creative' && (
              <p
                className={
                  ' rounded-3xl flex gap-3 items-center text-white p-2  bg-green-700 text-xs'
                }
              >
                selected
                <CheckCircle className=' w-3 h-3' />
              </p>
            )}
          </div>
          <p className=' font-satoshi text-sm'>
            This type of resume incorperates multiple colours , the design is
            very important and needed, Pictures can be added based on the user
          </p>
        </div>
      </section>

      <button
        onClick={() => navigateNext()}
        className=' bg-orange-500 text-white cursor-pointer rounded-2xl px-9 py-3 flex justify-center items-center gap-5'
      >
        Next
        <ArrowRight />
      </button>
    </section>
  )
}

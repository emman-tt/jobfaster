import { Hammer, Info, Sparkles, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleModals } from '../../../../store/modalSlice'
export default function Resume () {
  const [selected, setSelected] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function navigateNext () {
    if (selected === 1) {
      navigate('/onboarding/personal')
    }
    if (selected === 2) {
      dispatch(toggleModals('resume'))
      dispatch(toggleModals('uploadResume'))
    }
  }

  function closeModal () {
    dispatch(toggleModals('resume'))
  }
  return (
    <section
      className=' absolute p-10 pb-5 transition-all duration-200 ease-in-out   translate-x-120  translate-y-15 z-51 shadow h-[85%] w-[35%] bg-white rounded-xl 
    flex flex-col '
    >
      <section className='h-120  w-full'>
        <div className=' w-full  flex items-center  justify-between'>
          <h2 className='text-xl font-semibold font-IBM'>
            Choose the Resume Process
          </h2>
          <div
            onClick={() => {
              closeModal()
            }}
            className='  shadow-sm cursor-pointer flex justify-center items-center p-1 rounded-lg'
          >
            <X />
          </div>
        </div>
        <p className=' text-sm text-gray-600 font-satoshi mt-1'>
          There are three selected process to go through in creating your resume
          select from the three whats best for your conditions
        </p>

        <section className=' h-[80%] flex flex-col mt-2 overflow-auto py-5  [scrollbar-width:thin] gap-2'>
          {processes.map(item => (
            <div
              onClick={() => setSelected(item.id)}
              key={item.id}
              className={` border   ${
                selected === item.id
                  ? 'border-orange-400 border-2'
                  : 'border-gray-400'
              } rounded-xl items-center cursor-pointer gap-5 p-5 flex`}
            >
              <div className='w-[15%] bg-gray-100 rounded-xl flex items-center justify-center h-15'>
                {item.icon}
              </div>
              <div className='w-full flex flex-col'>
                <div className='w-full justify-between flex'>
                  <h3 className='text-sm font-IBM font-semibold'>
                    {item.description}
                  </h3>
                  <div
                    className={`inline-block w-5 h-5 ${
                      selected === item.id
                        ? 'bg-orange-300 border-orange-400'
                        : 'border-gray-300'
                    }  border rounded-full `}
                  ></div>
                </div>
                <p className='text-sm'>{item.whatToExpect}</p>
                <div className=' w-full p-2 mt-2 items-center rounded-xl flex gap-3 bg-gray-100 '>
                  <Info className='w-4 h-4' />
                  <p className=' text-xs font-satoshi'>{item.perfectFor}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
      <section className='h-full  flex w-full justify-between'>
        <button
          onClick={() => closeModal()}
          className='border flex justify-center items-center font-semibold text-sm font-satoshi p-3 py-1 rounded-xl'
        >
          Cancel
        </button>
        <button
          onClick={() => navigateNext()}
          className=' cursor-pointer bg-[#f17e27] flex justify-center items-center font-semibold text-sm font-satoshi p-3 rounded-xl'
        >
          Save and continue
        </button>
      </section>
    </section>
  )
}

const processes = [
  {
    id: 1,
    header: 'Build from Scratch',
    description: "No resume yet? Let's build one together.",
    whatToExpect:
      'Answer 15-20 simple questions with AI guidance to build a complete resume in 8-10 minutes.',
    perfectFor: 'Students & career changers',
    icon: <Hammer className='w-4 h-4' />
  },
  {
    id: 2,
    header: 'Improve Current Resume',
    description: 'Already have a resume? Upload it.',
    whatToExpect:
      'Upload your resume, answer 5-7 targeted questions about missing elements, get AI-enhanced version in 3-5 minutes.',
    perfectFor: 'Experienced professionals',
    icon: <Sparkles className='w-4 h-4' />
  },
  {
    id: 3,
    header: 'Fast Polish',
    description: 'Confident of your Resume?',
    whatToExpect: 'Submit your resume and start applying immediately',
    perfectFor: 'Busy professionals',
    icon: <Zap className='w-4 h-4' />
  }
]

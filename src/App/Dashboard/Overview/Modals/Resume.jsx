import { Hammer, Info, Sparkles, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleModals } from '../../../../store/modalSlice'
export default function Resume () {
  const [selected, setSelected] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { appearance } = useSelector(state => state.preferences)
  function navigateNext () {
    if (selected === 1) {
      navigate('/onboarding/personal')
    }
    if (selected === 2) {
      dispatch(toggleModals('resume'))
      dispatch(toggleModals('uploadResume'))
      navigate('/dashboard/create/resume/examples')
    }
  }

  function closeModal () {
    dispatch(toggleModals('resume'))
  }
  return (
    <section
      className={`fixed inset-0 m-auto z-51 w-[calc(100%-2rem)] sm:w-[35%] max-w-lg max-h-[90vh] h-auto p-4 sm:p-10 pb-5 shadow-xl rounded-xl flex flex-col overflow-y-auto ${
        appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
      }`}
    >
      <section className='h-auto w-full'>
        <div className='w-full flex items-center justify-between'>
          <h2 className={`text-xl font-semibold font-IBM ${
            appearance.theme == 'dark' ? 'text-white' : ''
          }`}>
            Choose the Resume Process
          </h2>
          <div
            onClick={() => {
              closeModal()
            }}
            className={`shadow-sm cursor-pointer flex justify-center items-center p-1 rounded-lg ${
              appearance.theme == 'dark' ? 'hover:bg-slate-700' : ''
            }`}
          >
            <X className={appearance.theme == 'dark' ? 'text-slate-400' : ''} />
          </div>
        </div>
        <p className={`text-sm font-satoshi mt-1 ${
          appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-600'
        }`}>
          There are three selected process to go through in creating your resume
          select from the three whats best for your conditions
        </p>

        <section className='flex flex-col mt-2 py-5 gap-2'>
          {processes.map(item => (
            <div
              onClick={() => setSelected(item.id)}
              key={item.id}
              className={`border ${
                selected === item.id
                  ? 'border-orange-400 border-2'
                  : appearance.theme == 'dark' ? 'border-slate-700' : 'border-gray-400'
              } rounded-xl items-center cursor-pointer gap-3 sm:gap-5 p-3 sm:p-5 flex`}
            >
              <div className={`w-[15%] rounded-xl flex items-center justify-center h-15 ${
                appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-gray-100'
              }`}>
                {item.icon}
              </div>
              <div className='w-full flex flex-col'>
                <div className='w-full justify-between flex'>
                  <h3 className={`text-sm font-IBM font-semibold ${
                    appearance.theme == 'dark' ? 'text-white' : ''
                  }`}>
                    {item.description}
                  </h3>
                  <div
                    className={`inline-block w-5 h-5 shrink-0 ${
                      selected === item.id
                        ? 'bg-orange-300 border-orange-400'
                        : 'border-gray-300'
                    } border rounded-full`}
                  ></div>
                </div>
                <p className={`text-xs sm:text-sm ${
                  appearance.theme == 'dark' ? 'text-slate-300' : ''
                }`}>{item.whatToExpect}</p>
                <div className={`w-full p-2 mt-2 items-center rounded-xl flex gap-3 ${
                  appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-gray-100'
                }`}>
                  <Info className={`w-4 h-4 ${
                    appearance.theme == 'dark' ? 'text-slate-400' : ''
                  }`} />
                  <p className={`text-xs font-satoshi ${
                    appearance.theme == 'dark' ? 'text-slate-400' : ''
                  }`}>{item.perfectFor}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
      <section className='flex items-center w-full justify-between gap-3 pt-4'>
        <button
          onClick={() => closeModal()}
          className={`flex-1 flex justify-center items-center font-semibold text-sm font-satoshi p-3 py-3 rounded-xl ${
            appearance.theme == 'dark'
              ? 'border border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'border hover:bg-gray-50'
          }`}
        >
          Cancel
        </button>
        <button
          onClick={() => navigateNext()}
          className='flex-1 cursor-pointer bg-[#f17e27] hover:bg-[#e06d1a] flex justify-center items-center font-semibold text-sm font-satoshi p-3 rounded-xl text-white'
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
  }
]

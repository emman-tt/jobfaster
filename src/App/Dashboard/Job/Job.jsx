import React, { useState } from 'react'
import {
  Briefcase,
  Building2,
  MapPin,
  Mail,
  FileText,
  ChevronRight,
  User,
  Globe,
  MessageSquare,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModals } from '../../../store/modalSlice'
import { connector } from '../../../services/useSocket'
import { saveJobDetails } from '../../../store/aiSlice'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateJobTrack } from '../../../services/jobs'
export default function Job () {
  const { job } = useSelector(state => state.ai)

  const [toggles, setToggles] = useState({
    tone: false
  })

  const dispatch = useDispatch()
  const closeAll = () => setToggles({ tone: false })

  const handleChange = e => {
    const { name, value } = e.target
    dispatch(
      saveJobDetails({
        category: name,
        value: value
      })
    )
  }

  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: updateJobTrack,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['jobTracks'] })
    }
  })

  function saveTone (value) {
    dispatch(
      saveJobDetails({
        category: 'tone',
        value: value
      })
    )
    closeAll()
  }

  function toggleCoverLetter (value) {
    dispatch(
      saveJobDetails({
        category: 'includeCoverLetter',
        value: value
      })
    )
  }

  function navigateNext () {
    connector()
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(toggleModals('selectResume'))
  }

  const { appearance } = useSelector(state => state.preferences)

  return (
    <section
      className={`w-full h-screen overflow-y-scroll [scrollbar-width:none] flex justify-center p-6 font-satoshi ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      }`}
    >
      <div
        className={`w-full max-w-3xl h-max my-10 p-10 space-y-8 rounded-3xl shadow-xs ${
          appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className='space-y-2'>
          <h1
            className={`text-2xl font-bold font-IBM flex items-center gap-3 ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Job Details
          </h1>
          <p
            className={`text-sm ml-1 ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-500'
            }`}
          >
            Provide the details of the position you're applying for to tailor
            your application perfectly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Job Description */}
          <div className='space-y-2'>
            <label
              htmlFor='description'
              className={`block text-sm font-bold ml-1 ${
                appearance.theme == 'dark' ? 'text-white' : 'text-slate-700'
              }`}
            >
              Job Description <span className='text-orange-500'>*</span>
            </label>
            <div className='relative'>
              <div
                className={`absolute left-4 top-5 ${
                  appearance.theme == 'dark'
                    ? 'text-slate-500'
                    : 'text-slate-400'
                }`}
              >
                <FileText className='w-4 h-4' />
              </div>
              <textarea
                id='description'
                name='description'
                required
                rows={6}
                value={job.description}
                onChange={handleChange}
                placeholder='Paste the full job description '
                className={`w-full pl-11 pr-4 py-4 border rounded-3xl outline-none transition-all text-sm font-medium resize-none min-h-40 ${
                  appearance.theme == 'dark'
                    ? 'bg-[#202020]  border-0 text-white placeholder:text-slate-500 placeholder:text-xs'
                    : 'border-gray-200 focus:border-orange-400 focus:bg-white'
                }`}
              />
            </div>
          </div>

          {/* Hiring Contact Email */}
          <div className=' flex w-full gap-5'>
            <div className='space-y-2 w-full'>
              <label
                htmlFor='email'
                className={`block text-sm font-bold ml-1 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-slate-700'
                }`}
              >
                Hiring Contact Email<span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={job.email}
                  onChange={handleChange}
                  placeholder='hiring@techcorp.com'
                  className={`w-full pl-5 pr-4 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium ${
                    appearance.theme == 'dark'
                      ? 'bg-[#202020]  border-0 text-white placeholder:text-slate-500 placeholder:text-xs'
                      : 'border-gray-200 focus:border-orange-400 focus:bg-white'
                  }`}
                />
              </div>
            </div>
            <div className='space-y-2 relative w-full'>
              <label
                className={`block text-sm font-bold ml-1 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-slate-700'
                }`}
              >
                Email Tone
              </label>
              <div
                onClick={() => setToggles({ tone: !toggles.tone })}
                className={`w-full cursor-pointer rounded-2xl border py-3.5 px-6 text-sm font-semibold flex justify-between items-center transition-all hover:border-orange-200 ${
                  appearance.theme == 'dark'
                    ? ' border-0 bg-[#202020] text-white'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className='flex items-center gap-2'>
                  {job.tone.toLowerCase() === 'formal'
                    ? 'Formal'
                    : 'Conversational'}
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    toggles.tone ? 'rotate-180' : ''
                  } ${
                    appearance.theme == 'dark' ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </div>
              {toggles.tone && (
                <ul
                  className={`absolute z-10 flex flex-col p-2 top-[calc(100%+8px)] w-full rounded-xl shadow-xl border overflow-hidden ${
                    appearance.theme == 'dark'
                      ? 'bg-[#202020]  border-0 text-white'
                      : 'bg-white border-gray-100 text-black'
                  }`}
                >
                  <li
                    onClick={() => saveTone('Formal')}
                    className={`text-sm cursor-pointer p-3 px-4 rounded-lg transition-colors flex items-center gap-2 ${
                      job.tone.toLowerCase() == 'formal'
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : appearance.theme == 'dark'
                        ? 'text-white'
                        : 'text-slate-700 font-medium'
                    }`}
                  >
                    Formal
                  </li>
                  <li
                    onClick={() => saveTone('Conversational')}
                    className={`text-sm cursor-pointer p-3 px-4 rounded-lg transition-colors flex items-center gap-2 ${
                      job.tone.toLowerCase() == 'conversational'
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : appearance.theme == 'dark'
                        ? 'text-white'
                        : 'text-slate-700 font-medium'
                    }`}
                  >
                    Conversational
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Include Cover Letter Radio Group */}
          <div className='space-y-4'>
            <label
              className={`block text-sm font-bold ml-1 ${
                appearance.theme == 'dark' ? 'text-white' : 'text-slate-700'
              }`}
            >
              Include a tailored cover letter?
            </label>
            <ul className='grid grid-cols-2 gap-4'>
              <li
                onClick={() => toggleCoverLetter(true)}
                className={`flex gap-4 w-full border cursor-pointer rounded-2xl py-4 px-6 transition-all duration-200 ease items-center ${
                  job.includeCoverLetter
                    ? 'border-orange-400 shadow-md translate-y-0.5'
                    : appearance.theme == 'dark'
                    ? ' border-0 bg-[#202020] hover:border-orange-200'
                    : 'border-slate-100 bg-white hover:border-orange-200'
                }`}
              >
                <div
                  className={`border transition-all ${
                    job.includeCoverLetter ? 'border-[5px]' : 'border'
                  } border-[#f17e27] inline-block w-4 h-4 rounded-full`}
                ></div>
                <div
                  className={`text-sm font-bold ${
                    job.includeCoverLetter
                      ? appearance.theme == 'dark'
                        ? 'text-white'
                        : ''
                      : appearance.theme == 'dark'
                      ? 'text-slate-400'
                      : 'text-slate-600'
                  }`}
                >
                  Yes, include it
                </div>
              </li>
              <li
                onClick={() => toggleCoverLetter(false)}
                className={`flex gap-4 w-full border cursor-pointer rounded-2xl py-4 px-6 transition-all duration-200 ease items-center ${
                  !job.includeCoverLetter
                    ? 'border-orange-400 shadow-md translate-y-0.5'
                    : appearance.theme == 'dark'
                    ? ' border-0 text-white bg-[#202020] hover:border-orange-200'
                    : 'border-slate-100 bg-white hover:border-orange-200'
                }`}
              >
                <div
                  className={`border transition-all ${
                    !job.includeCoverLetter ? 'border-[5px]' : 'border'
                  } border-[#f17e27] inline-block w-4 h-4 rounded-full`}
                ></div>
                <div
                  className={`text-sm font-bold
                    ${
                      appearance.theme == 'dark'
                        ? 'text-white'
                        : 'text-slate-600'
                    }
                    
                 `}
                >
                  No, just resume
                </div>
              </li>
            </ul>
          </div>

          {/* Footer Actions */}
          <div className='flex items-center justify-between pt-6 border-t border-slate-100'>
            <button
              type='button'
              className={`px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 ${
                appearance.theme == 'dark' ? 'text-white' : 'text-gray-300'
              } transition-colors`}
            >
              Reset Form
            </button>
            <button
              onClick={() => {
                navigateNext()
              }}
              type='submit'
              className={`px-10 py-3.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-[1.25rem] shadow-lg shadow-orange-100 transition-all flex items-center gap-2 group active:scale-95 ${
                appearance.theme == 'dark'
                  ? ' shadow-none'
                  : 'shadow-orange-100'
              }`}
            >
              Continue
              <ChevronRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

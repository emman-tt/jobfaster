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
import { connector } from '../../../hooks/useSocket'
import useClickOutside from '../../../hooks/useClick'
import { saveJobDetails } from '../../../store/aiSlice'
export default function Job () {
  const { job } = useSelector(state => state.ai)

  const [toggles, setToggles] = useState({
    tone: false
  })

  const dispatch = useDispatch()
  const closeAll = () => setToggles({ tone: false })
  const toneRef = useClickOutside(closeAll)

  const handleChange = e => {
    const { name, value } = e.target
    dispatch(
      saveJobDetails({
        category: name,
        value: value
      })
    )
  }

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

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(toggleModals('selectResume'))
  }

  return (
    <div className='w-full h-screen overflow-y-scroll [scrollbar-width:none] flex justify-center p-6 font-satoshi'>
      <div className='w-full max-w-3xl bg-white h-max my-10 p-10 space-y-8 rounded-3xl shadow-xs'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-slate-900 font-IBM flex items-center gap-3'>
            Job Details
          </h1>
          <p className='text-slate-500 text-sm ml-1'>
            Provide the details of the position you're applying for to tailor
            your application perfectly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Job Title */}
            <div className='space-y-2'>
              <label
                htmlFor='title'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Job Title <span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Briefcase className='w-4 h-4' />
                </div> */}
                <input
                  type='text'
                  id='title'
                  name='title'
                  required
                  value={job.title}
                  onChange={handleChange}
                  placeholder='e.g. Senior Frontend Developer'
                  className='w-full pl-5 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>

            {/* Company */}
            <div className='space-y-2'>
              <label
                htmlFor='company'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Company <span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Building2 className='w-4 h-4' />
                </div> */}
                <input
                  type='text'
                  id='company'
                  name='company'
                  required
                  value={job.company}
                  onChange={handleChange}
                  placeholder='e.g. TechCorp Inc.'
                  className='w-full pl-5 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Hiring Manager */}
            <div className='space-y-2'>
              <label
                htmlFor='hiringManager'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Hiring Manager Name
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <User className='w-4 h-4' />
                </div> */}
                <input
                  type='text'
                  id='hiringManager'
                  name='hiringManager'
                  value={job.hiringManager}
                  onChange={handleChange}
                  placeholder='e.g. Jane Smith'
                  className='w-full pl-5 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>

            {/* Job Source */}
            <div className='space-y-2'>
              <label
                htmlFor='source'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Job Source
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Globe className='w-4 h-4' />
                </div> */}
                <input
                  type='text'
                  id='source'
                  name='source'
                  value={job.source}
                  onChange={handleChange}
                  placeholder='e.g. LinkedIn'
                  className='w-full pl-5 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>
          </div>

          {/* Location & Tone Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6' ref={toneRef}>
            <div className='space-y-2'>
              <label
                htmlFor='location'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Location
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <MapPin className='w-4 h-4' />
                </div> */}
                <input
                  type='text'
                  id='location'
                  name='location'
                  value={job.location}
                  onChange={handleChange}
                  placeholder='e.g. San Francisco (Remote)'
                  className='w-full pl-5 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>

            <div className='space-y-2 relative'>
              <label className='block text-sm font-bold text-slate-700 ml-1'>
                Email Tone
              </label>
              <div
                onClick={() => setToggles({ tone: !toggles.tone })}
                className='w-full cursor-pointer rounded-2xl border border-gray-200 py-3.5 px-6 text-sm font-semibold flex justify-between items-center bg-white transition-all hover:border-orange-200'
              >
                <div className='flex items-center gap-2'>
                 
                  {job.tone.toLowerCase() === 'formal'
                    ? 'Formal'
                    : 'Conversational'}
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform text-slate-400 ${
                    toggles.tone ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {toggles.tone && (
                <ul className='absolute z-10 bg-white flex flex-col p-2 top-[calc(100%+8px)] w-full text-black rounded-xl shadow-xl border border-gray-100 overflow-hidden'>
                  <li
                    onClick={() => saveTone('Formal')}
                    className={`text-sm cursor-pointer p-3 px-4 rounded-lg transition-colors flex items-center gap-2 ${
                      job.tone.toLowerCase() == 'formal'
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : ' text-slate-700 font-medium'
                    }`}
                  >
                    Formal
                  </li>
                  <li
                    onClick={() => saveTone('Conversational')}
                    className={`text-sm cursor-pointer p-3 px-4 rounded-lg transition-colors flex items-center gap-2 ${
                      job.tone.toLowerCase() == 'conversational'
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : ' text-slate-700 font-medium'
                    }`}
                  >
                    Conversational
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className='space-y-2'>
            <label
              htmlFor='description'
              className='block text-sm font-bold text-slate-700 ml-1'
            >
              Job Description <span className='text-orange-500'>*</span>
            </label>
            <div className='relative'>
              <div className='absolute left-4 top-5 text-slate-400'>
                <FileText className='w-4 h-4' />
              </div>
              <textarea
                id='description'
                name='description'
                required
                rows={6}
                value={job.description}
                onChange={handleChange}
                placeholder='Paste the full job description or job URL here...'
                className='w-full pl-11 pr-4 py-4 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-3xl outline-none transition-all text-sm font-medium resize-none min-h-40'
              />
            </div>
          </div>

          {/* Hiring Contact Email */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='block text-sm font-bold text-slate-700 ml-1'
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
                className='w-full pl-5 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
              />
            </div>
          </div>

          {/* Include Cover Letter Radio Group */}
          <div className='space-y-4'>
            <label className='block text-sm font-bold text-slate-700 ml-1'>
              Include a tailored cover letter?
            </label>
            <ul className='grid grid-cols-2 gap-4'>
              <li
                onClick={() => toggleCoverLetter(true)}
                className={`flex gap-4 w-full border cursor-pointer rounded-2xl py-4 px-6 transition-all duration-200 ease items-center ${
                  job.includeCoverLetter
                    ? 'border-orange-400  shadow-md translate-y-0.5'
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
                    job.includeCoverLetter ? '' : 'text-slate-600'
                  }`}
                >
                  Yes, include it
                </div>
              </li>
              <li
                onClick={() => toggleCoverLetter(false)}
                className={`flex gap-4 w-full border cursor-pointer rounded-2xl py-4 px-6 transition-all duration-200 ease items-center ${
                  !job.includeCoverLetter
                    ? 'border-orange-400  shadow-md translate-y-0.5'
                    : 'border-slate-100 bg-white hover:border-orange-200'
                }`}
              >
                <div
                  className={`border transition-all ${
                    !job.includeCoverLetter ? 'border-[5px]' : 'border'
                  } border-[#f17e27] inline-block w-4 h-4 rounded-full`}
                ></div>
                <div
                  className={`text-sm font-bold ${
                    !job.includeCoverLetter ? '' : 'text-slate-600'
                  }`}
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
              className='px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors'
            >
              Reset Form
            </button>
            <button
              onClick={() => {
                connector()
              }}
              type='submit'
              className='px-10 py-3.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-[1.25rem] shadow-lg shadow-orange-100 transition-all flex items-center gap-2 group active:scale-95'
            >
              Continue
              <ChevronRight className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

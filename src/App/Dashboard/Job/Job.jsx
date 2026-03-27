import React, { useState } from 'react'
import {
  Briefcase,
  Building2,
  MapPin,
  Mail,
  FileText,
  ChevronRight
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toggleModals } from '../../../store/modalSlice'
import { connector } from '../../../hooks/useSocket'
export default function Job () {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    location: '',
    description: '',
    email: ''
  })
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(toggleModals('selectResume'))
  }

  return (
    <div className='flex items-center w-full justify-center h-screen [scrollbar-width:none]  overflow-y-scroll p-6 font-satoshi'>
      <div className='w-full max-w-2xl bg-white mt-20   p-10 space-y-8'>
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
                htmlFor='jobTitle'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Job Title <span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Briefcase className='w-4 h-4' />
                </div>
                <input
                  type='text'
                  id='jobTitle'
                  name='jobTitle'
                  required
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder='e.g. Senior Frontend Developer'
                  className='w-full pl-11 pr-4 py-3.5   border border-gray-200  focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
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
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Building2 className='w-4 h-4' />
                </div>
                <input
                  type='text'
                  id='company'
                  name='company'
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder='e.g. TechCorp Inc.'
                  className='w-full pl-11 pr-4 py-3.5  border border-gray-200  focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className='space-y-2'>
            <label
              htmlFor='location'
              className='block text-sm font-bold text-slate-700 ml-1'
            >
              Location
            </label>
            <div className='relative'>
              <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                <MapPin className='w-4 h-4' />
              </div>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                onChange={handleChange}
                placeholder='e.g. San Francisco, CA (Remote)'
                className='w-full pl-11 pr-4 py-3.5  border border-gray-200  focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
              />
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
                value={formData.description}
                onChange={handleChange}
                placeholder='Paste the full job description or job URL here...'
                className='w-full pl-11 pr-4 py-4  border border-gray-200  focus:border-orange-400 focus:bg-white rounded-3xl outline-none transition-all text-sm font-medium resize-none min-h-40'
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
              <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                <Mail className='w-4 h-4' />
              </div>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='hiring@techcorp.com'
                className='w-full pl-11 pr-4 py-3.5  border border-gray-200  focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className='flex items-center justify-between pt-6 border-t border-slate-100'>
            <button
              type='button'
              className='px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors'
            >
              Reset Form
            </button>
            <button onClick={() => {connector()}}
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

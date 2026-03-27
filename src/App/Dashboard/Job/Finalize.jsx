import React, { useState } from 'react'
import {
  Mail,
  User,
  Send,
  Lock,
  Unlock,
  Type,
  AlignLeft,
  ChevronRight
} from 'lucide-react'

export default function Finalize () {
  const [isEmailLocked, setIsEmailLocked] = useState(true)
  const [isNameLocked, setIsNameLocked] = useState(true)
  
  const [formData, setFormData] = useState({
    userEmail: 'user@example.com',
    userName: 'John Doe',
    recruiterEmail: '',
    subject: 'Application for [Job Title]',
    message: `Dear Recruiter,\n\nI am writing to express my strong interest in the [Job Title] position. With my background in [Your Field], I am confident in my ability to contribute effectively to your team.\n\nMy name is John Doe, and I have attached my resume for your review.\n\nBest regards,\nJohn Doe`
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNameChange = (e) => {
    const newName = e.target.value
    setFormData(prev => ({
      ...prev,
      userName: newName,
      message: prev.message.replace(prev.userName, newName) 
    }))
  }

  return (
    <div className='flex items-center w-full pt-30  justify-center h-screen [scrollbar-width:none] overflow-y-scroll p-6 font-satoshi'>
      <div className='w-full max-w-2xl bg-white mt-40 p-10 space-y-8'>
        {/* Header */}
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-slate-900 font-IBM flex items-center gap-3'>
     
            Send Application
          </h1>
          <p className='text-slate-500 text-sm ml-1'>
            Review your application and send it directly to the recruiter.
          </p>
        </div>

        <div className='space-y-6'>
          {/* Sender Email Section */}
          <div className='space-y-2'>
            <label className='block text-sm font-bold text-slate-700 ml-1'>
              Your Email
            </label>
            <div className='relative flex gap-3'>
              <div className='relative flex-1'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  {isEmailLocked ? <Lock className='w-4 h-4' /> : <Mail className='w-4 h-4' />}
                </div>
                <input
                  type='email'
                  name='userEmail'
                  disabled={isEmailLocked}
                  value={formData.userEmail}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium ${
                    isEmailLocked 
                      ? 'bg-slate-50 border-gray-100 text-slate-500 cursor-not-allowed' 
                      : 'border-orange-200 focus:border-orange-400 bg-white text-slate-900 shadow-sm'
                  }`}
                />
              </div>
              <button
                type='button'
                onClick={() => setIsEmailLocked(!isEmailLocked)}
                className='px-4 py-2 text-xs font-bold text-white cursor-pointer rounded-xl transition-colors bg-[#f17e27] whitespace-nowrap'
              >
                {isEmailLocked ? 'Change' : 'Lock'}
              </button>
            </div>
          </div>

          {/* Username Section */}
          <div className='space-y-2'>
            <label className='block text-sm font-bold text-slate-700 ml-1'>
              Display Name
            </label>
            <div className='relative flex gap-3'>
              <div className='relative flex-1'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  {isNameLocked ? <Lock className='w-4 h-4' /> : <User className='w-4 h-4' />}
                </div>
                <input
                  type='text'
                  name='userName'
                  disabled={isNameLocked}
                  value={formData.userName}
                  onChange={handleNameChange}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-2xl outline-none transition-all text-sm font-medium ${
                    isNameLocked 
                      ? 'bg-slate-50 border-gray-100 text-slate-500 cursor-not-allowed' 
                      : 'border-orange-200 focus:border-orange-400 bg-white text-slate-900 shadow-sm'
                  }`}
                />
              </div>
              <button
                type='button'
                onClick={() => setIsNameLocked(!isNameLocked)}
                className='px-4 py-2 text-xs font-bold text-white  rounded-xl transition-colors bg-[#f17e27] whitespace-nowrap cursor-pointer'
              >
                {isNameLocked ? 'Change' : 'Lock'}
              </button>
            </div>
          </div>

          <div className='h-px bg-slate-100 my-4' />

          {/* Recruiter Email */}
          <div className='space-y-2'>
            <label htmlFor='recruiterEmail' className='block text-sm font-bold text-slate-700 ml-1'>
              To:
            </label>
            <div className='relative'>
              <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                <Mail className='w-4 h-4' />
              </div>
              <input
                type='email'
                id='recruiterEmail'
                name='recruiterEmail'
                placeholder='recruiter@company.com'
                value={formData.recruiterEmail}
                onChange={handleChange}
                className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
              />
            </div>
          </div>

          {/* Subject */}
          <div className='space-y-2'>
            <label htmlFor='subject' className='block text-sm font-bold text-slate-700 ml-1'>
              Subject:
            </label>
            <div className='relative'>
              <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                <Type className='w-4 h-4' />
              </div>
              <input
                type='text'
                id='subject'
                name='subject'
                placeholder='Application for...'
                value={formData.subject}
                onChange={handleChange}
                className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className='space-y-2'>
            <label htmlFor='message' className='block text-sm font-bold text-slate-700 ml-1'>
              Message Body
            </label>
            <div className='relative'>
              <div className='absolute left-4 top-5 text-slate-400'>
                <AlignLeft className='w-4 h-4' />
              </div>
              <textarea
                id='message'
                name='message'
                rows={10}
                value={formData.message}
                onChange={handleChange}
                className='w-full pl-11 pr-4 py-4 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-3xl outline-none transition-all text-sm font-medium resize-none min-h-60'
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className='flex items-center justify-end pt-6 border-t border-slate-100'>
            <button
              type='button'
              className='px-10 py-3.5 bg-[#f17e27] hover:bg-[#e16d16] text-white text-sm font-bold rounded-[1.25rem] shadow-lg shadow-orange-100 transition-all flex items-center gap-2 group active:scale-95'
            >
              Send Application
              <Send className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

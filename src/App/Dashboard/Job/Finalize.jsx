import { useState } from 'react'
import { Mail, User, Send, Type, Edit3, Eye } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { saveEmailDetails } from '../../../store/emailSlice'
import { saveJobDetails } from '../../../store/aiSlice'
import { toast } from 'sonner'

export default function Finalize () {
  const { emailDetails } = useSelector(state => state.email)
  const { job } = useSelector(state => state.ai)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    userEmail: '',
    userName: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEmailDetailsChange = e => {
    const { name, value } = e.target
    dispatch(saveEmailDetails({ category: name, value: value }))
  }

  const navigateNext = () => {
    if (!formData.userEmail.trim()) {
      return toast.error('Please provide your email address')
    }
    if (!formData.userName.trim()) {
      return toast.error('Please provide your display name')
    }

    toast.success('Ready to send application!')
  }

  return (
    <div className='w-full h-screen overflow-y-scroll [scrollbar-width:none] flex justify-center p-6 font-satoshi'>
      <div className='w-full max-w-5xl bg-white h-max my-10 p-10 space-y-8 rounded-3xl shadow-xs'>
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Sender Email Section */}
            <div className='space-y-2'>
              <label className='block text-sm font-bold text-slate-700 ml-1'>
                Your Email <span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Mail className='w-4 h-4' />
                </div> */}
                <input
                  type='email'
                  name='userEmail'
                  required
                  value={formData.userEmail}
                  onChange={handleChange}
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium bg-white text-slate-900 '
                />
              </div>
            </div>

            {/* Username Section */}
            <div className='space-y-2'>
              <label className='block text-sm font-bold text-slate-700 ml-1'>
                Display Name <span className='text-orange-500'>*</span>
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <User className='w-4 h-4' />
                </div> */}
                <input
                  type='text'
                  name='userName'
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all  text-sm font-medium bg-white text-slate-900 '
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Recruiter Email */}
            <div className='space-y-2'>
              <label
                htmlFor='email'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                To:
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Mail className='w-4 h-4' />
                </div> */}
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='recruiter@company.com'
                  value={job?.email || ''}
                  onChange={e =>
                    dispatch(
                      saveJobDetails({
                        category: 'email',
                        value: e.target.value
                      })
                    )
                  }
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>

            {/* Subject */}
            <div className='space-y-2'>
              <label
                htmlFor='subjectLine'
                className='block text-sm font-bold text-slate-700 ml-1'
              >
                Subject:
              </label>
              <div className='relative'>
                {/* <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>
                  <Type className='w-4 h-4' />
                </div> */}
                <input
                  type='text'
                  id='subjectLine'
                  name='subjectLine'
                  placeholder='Application for...'
                  value={emailDetails?.subjectLine || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full pl-11 pr-4 py-3.5 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium'
                />
              </div>
            </div>
          </div>

          {/* Email Body & Preview Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6'>
            {/* Left Column: Edit Fields */}
            <div className='space-y-4  p-6 rounded-3xl border border-slate-100 '>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-bold text-slate-800 flex items-center gap-2'>
                  Edit Content
                </h3>
              </div>

              {/* Greeting */}
              <div className='space-y-2'>
                <label
                  htmlFor='greeting'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Greeting
                </label>
                <input
                  type='text'
                  id='greeting'
                  name='greeting'
                  value={emailDetails?.greeting || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-3 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium bg-white/60'
                />
              </div>

              {/* Message Body Textarea */}
              <div className='space-y-2'>
                <label
                  htmlFor='body'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Core Message
                </label>
                <div className='relative'>
                  <textarea
                    id='body'
                    name='body'
                    rows={6}
                    value={emailDetails?.body || ''}
                    onChange={handleEmailDetailsChange}
                    className='w-full px-4 py-4 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium resize-none min-h-40 bg-white/60'
                  />
                </div>
              </div>

              {/* Call To Action */}
              <div className='space-y-2'>
                <label
                  htmlFor='callToAction'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Call to Action
                </label>
                <textarea
                  id='callToAction'
                  name='callToAction'
                  rows={3}
                  value={emailDetails?.callToAction || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-4 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium resize-none min-h-25 bg-white/60'
                />
              </div>

              {/* Attachment Note */}
              <div className='space-y-2'>
                <label
                  htmlFor='attachmentNote'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Attachment Note
                </label>
                <input
                  type='text'
                  id='attachmentNote'
                  name='attachmentNote'
                  value={emailDetails?.attachmentNote || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-3 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium bg-white/60'
                />
              </div>

              {/* Sign Off */}
              <div className='space-y-2'>
                <label
                  htmlFor='signOff'
                  className='block text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider'
                >
                  Sign Off
                </label>
                <input
                  type='text'
                  id='signOff'
                  name='signOff'
                  value={emailDetails?.signOff || ''}
                  onChange={handleEmailDetailsChange}
                  className='w-full px-4 py-3 border border-gray-200 focus:border-orange-400 focus:bg-white rounded-xl outline-none transition-all text-sm font-medium bg-white/60'
                />
              </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className=' p-8 shadow-md  pointer-events-none rounded-3xl flex flex-col h-[80%]'>
              <div className='flex justify-between items-center mb-6 pb-4 border-b border-slate-200'>
                <h3 className='font-bold text-slate-800 flex items-center gap-2'>
                  <Eye className='w-4 h-4 text-orange-500' />
                  Live Preview
                </h3>
                <span className='invisible md:visible text-[10px] text-white font-bold px-2 py-2 bg-orange-500 rounded-lg uppercase tracking-wider'>
                  Final Application Mail
                </span>
              </div>

              <div className='flex-1 space-y-4 text-slate-700 font-medium leading-relaxed font-satoshi whitespace-pre-wrap text-[15px]'>
                <p>{emailDetails?.greeting || 'Dear [Name],'}</p>
                <p className='text-justify'>
                  {emailDetails?.body ||
                    'I am applying for the [Role] position...'}
                </p>
                <p>
                  {emailDetails?.callToAction ||
                    'I look forward to discussing...'}
                </p>
                <p className='italic text-sm text-slate-500'>
                  {emailDetails?.attachmentNote ||
                    'Please find my CV attached.'}
                </p>
                <br />
                <p className='mb-0'>
                  {emailDetails?.signOff || 'Best regards,'}
                </p>
                <p className='mt-1 font-bold text-slate-900'>
                  {formData.userName || 'John Doe'}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className='flex items-center justify-end pt-6  border-slate-100 mt-8'>
            <button
              type='button'
              onClick={navigateNext}
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

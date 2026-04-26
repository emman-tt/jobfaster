import { useState } from 'react'
import { saveContactDetails } from '../../../store/personalSlice'
import { useDispatch, useSelector } from 'react-redux'
import OnlineLinks from './OnlineLinks'
import Summary from './Summary'
import { Info, ChevronDown } from 'lucide-react'

export default function Identity () {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const { errors, contactDetails } = useSelector(state => state.personal)
  const { appearance } = useSelector(state => state.preferences)

  const handleChange = e => {
    const { name, value } = e.target
    dispatch(
      saveContactDetails({
        name: name,
        value: value
      })
    )
  }

  return (
    <section className='w-full'>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer border-b transition-colors ${
          appearance.theme == 'dark' ? 'border-white/50' : 'border-gray-200'
        }`}
      >
        <h2
          className={`text-lg font-bold flex items-center ${
            appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          <span className='inline-block w-1 h-6 bg-[#f56010] mr-3'></span>
          Basic Information
        </h2>
        <button
          className={`p-1 rounded-lg transition-colors ${
            appearance.theme == 'dark'
              ? 'hover:bg-slate-700'
              : 'hover:bg-gray-200'
          }`}
        >
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              isOpen ? 'rotate-0' : '-rotate-180'
            } ${appearance.theme == 'dark' ? 'text-white' : ''}`}
          />
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className='px-4 sm:px-6 md:px-8 lg:px-10'>
          <div className='mt-4 '>
            <h3
              className={`text-xs font-bold uppercase tracking-wide mb-2 ${
                appearance.theme == 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}
            >
              What's your primary or major job title?
            </h3>
            <p
              className={`text-xs mb-4 ${
                appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}
            >
              In the world of Applicant Tracking Systems (ATS) and 6-second
              recruiter scans, titles are arguably the most important part of
              your resume.
            </p>
            <div className='w-full h-12'>
              <input
                value={contactDetails.jobTitle}
                name='jobTitle'
                onChange={handleChange}
                type='text'
                className={`w-full h-full px-5 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f17e27] focus:border-[#f17e27] text-xs transition-shadow ${
                  appearance.theme == 'dark'
                    ? 'bg-[#202020] border-0 text-white placeholder:text-slate-500'
                    : 'border-gray-200'
                }`}
                placeholder='Principal Product Designer'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 mt-7 sm:grid-cols-2 gap-6 w-full'>
            <div className='flex flex-col gap-1.5'>
              <label
                className={`text-xs font-IBM uppercase tracking-wide font-light pl-0 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-gray-600'
                }`}
              >
                FULL NAME
              </label>
              {errors.fullName?.length > 0 && (
                <p className='text-red-500 font-semibold text-xs pl-0'>
                  {errors.fullName}
                </p>
              )}
              <input
                value={contactDetails.fullName}
                type='text'
                required
                name='fullName'
                onChange={handleChange}
                placeholder='Julianne Thorne'
                className={`border pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md shadow-sm transition-shadow ${
                  appearance.theme == 'dark'
                    ? 'border-0 bg-[#202020] text-white placeholder:text-slate-500'
                    : 'border-gray-200  text-gray-900'
                }`}
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label
                className={`text-xs font-light font-IBM uppercase tracking-wide pl-0 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-gray-600'
                }`}
              >
                EMAIL ADDRESS
              </label>
              {errors.email?.length > 0 && (
                <p className='text-red-500 font-semibold text-xs pl-0'>
                  {errors.email}
                </p>
              )}
              <input
                value={contactDetails.email}
                name='email'
                required
                onChange={handleChange}
                placeholder='j.thorne@curate.io'
                className={`border pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md shadow-sm transition-shadow ${
                  appearance.theme == 'dark'
                    ? 'border-0 bg-[#202020] text-white placeholder:text-slate-500'
                    : 'border-gray-200 text-gray-900'
                }`}
              />
            </div>

            {/* Phone Number */}
            <div className='flex flex-col gap-1.5'>
              <label
                className={`text-xs font-light font-IBM uppercase tracking-wide pl-0 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-gray-600'
                }`}
              >
                PHONE NUMBER
              </label>
              {errors.phone?.length > 0 && (
                <p className='text-red-500 font-semibold text-xs pl-0'>
                  {errors.phone}
                </p>
              )}
              <input
                value={contactDetails.phone}
                type='text'
                required
                name='phone'
                onChange={handleChange}
                placeholder='+1 (555) 234-8890'
                className={`border pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md shadow-sm transition-shadow ${
                  appearance.theme == 'dark'
                    ? 'border-0 bg-[#202020] text-white placeholder:text-slate-500'
                    : 'border-gray-200 text-gray-900'
                }`}
              />
            </div>

            {/* Location */}
            <div className='flex flex-col gap-1.5'>
              <label
                className={`text-xs font-light font-IBM uppercase tracking-wide pl-0 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-gray-600'
                }`}
              >
                LOCATION
              </label>
              {errors.location?.length > 0 && (
                <p className='text-red-500 font-semibold text-xs pl-0'>
                  {errors.location}
                </p>
              )}
              <input
                value={contactDetails.location}
                name='location'
                type='text'
                required
                onChange={handleChange}
                placeholder='San Francisco, CA'
                className={`border pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md shadow-sm transition-shadow ${
                  appearance.theme == 'dark'
                    ? 'border-0 bg-[#202020] text-white placeholder:text-slate-500'
                    : 'border-gray-200 text-gray-900'
                }`}
              />
            </div>
          </div>

          {/* Portfolio Links Section */}
          <div className='mt-12'>
            <h3
              className={`text-xs font-bold uppercase tracking-wide mb-3 ${
                appearance.theme == 'dark' ? 'text-white' : 'text-gray-600'
              }`}
            >
              Do you want to include links to your portfolio, GitHub, or online
              profiles?
            </h3>
            <p
              className={`text-xs mb-5 flex items-start gap-2 ${
                appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-500'
              }`}
            >
              <span className='text-orange-500 shrink-0 mt-0.5'>
                <Info className=' w-2 h-2' />
              </span>
              <span>
                Hyperlinked portfolios give immediate access to work samples,
                ensure profiles are working and not very long.
              </span>
            </p>
            <OnlineLinks />
          </div>

          {/* Summary Section */}
          <div className='mt-12'>
            <Summary />
          </div>
        </div>
      )}
    </section>
  )
}

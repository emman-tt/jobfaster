import { saveContactDetails } from '../../../store/personalSlice'
import { useDispatch, useSelector } from 'react-redux'
import OnlineLinks from './OnlineLinks'
import Summary from './Summary'
import { Info } from 'lucide-react'

export default function Identity () {
  const dispatch = useDispatch()
  const { errors, contactDetails } = useSelector(state => state.personal)

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
    <section className='w-full mb-7'>
      {/* Basic Information Section */}
      <div className='px-4 sm:px-6 md:px-8 lg:px-10'>
        <h2 className='text-lg font-bold text-gray-900  flex items-center'>
          <span className='inline-block w-1 h-6 bg-[#f56010] mr-3'></span>
          Basic Information
        </h2>

        {/* Job Title Section */}
        <div className='px-4 sm:px-6 md:px-8 lg:px-0 mt-4 '>
          <h3 className='text-xs font-bold text-gray-600 uppercase tracking-wide mb-2'>
            What's your primary or major job title?
          </h3>
          <p className='text-xs text-gray-500 mb-4'>
            In the world of Applicant Tracking Systems (ATS) and 6-second
            recruiter scans, titles are arguably the most important part of your
            resume.
          </p>
          <div className='w-full h-12'>
            <input
              value={contactDetails.jobTitle}
              name='jobTitle'
              onChange={handleChange}
              type='text'
              className='w-full h-full px-5 rounded-xl border border-gray-200 shadow-sm focus:outline-[#ec5b13] focus:border-[#ec5b13] focus:shadow-md text-xs transition-shadow'
              placeholder='Principal Product Designer'
            />
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className='grid grid-cols-1 mt-7 sm:grid-cols-2 gap-6 w-full'>
          {/* Full Name */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs  font-IBM text-gray-600 uppercase tracking-wide font-light pl-0'>
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
              className='border border-gray-200 pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md text-gray-900 shadow-sm transition-shadow'
            />
          </div>

          {/* Email */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-light font-IBM text-gray-600 uppercase tracking-wide pl-0'>
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
              className='border border-gray-200 pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md text-gray-900 shadow-sm transition-shadow'
            />
          </div>

          {/* Phone Number */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-light font-IBM text-gray-600 uppercase tracking-wide pl-0'>
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
              className='border border-gray-200 pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md text-gray-900 shadow-sm transition-shadow'
            />
          </div>

          {/* Location */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-light font-IBM text-gray-600 uppercase tracking-wide pl-0'>
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
              className='border border-gray-200 pl-4 pr-3 outline-[#ec5b13] py-3 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md text-gray-900 shadow-sm transition-shadow'
            />
          </div>
        </div>
      </div>

      {/* Portfolio Links Section */}
      <div className='px-4 sm:px-6 md:px-8 lg:px-10 mt-12'>
        <h3 className='text-xs font-bold text-gray-600 uppercase tracking-wide mb-3'>
          Do you want to include links to your portfolio, GitHub, or online
          profiles?
        </h3>
        <p className='text-xs text-gray-500  mb-5 flex items-start gap-2'>
          <span className='text-orange-500 shrink-0 mt-0.5'>
            <Info className=' w-2 h-2' />
          </span>
          <span>
            Hyperlinked portfolios give immediate access to work samples, ensure
            profiles are working and not very long.
          </span>
        </p>
        <OnlineLinks />
      </div>

      {/* Summary Section */}
      <div className='mt-12'>
        <Summary />
      </div>
    </section>
  )
}

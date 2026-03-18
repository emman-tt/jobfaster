import { QuestionHeader } from '../../../components/QuestionHeader'
import { saveContactDetails } from '../../../store/personalSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function Address () {
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
    <section className='mt-15 '>
      <QuestionHeader question="What's your primary or major job title ? ">
        In the world of Applicant Tracking Systems (ATS) and 6-second recruiter
        scans, titles are arguably the most important part of your resume.
      </QuestionHeader>
      <div className=' w-full px-10 mt-2 mb-10 h-15'>
        <input
          value={contactDetails.jobTitle}
          name='jobTitle'
          onChange={handleChange}
          type='text'
          className=' w-full h-full px-10   rounded-xl border'
          placeholder='Software Engineer'
        />
      </div>

      <QuestionHeader question=' Fill in your contact details'>
        It must be ATS standard, you do not need your street address for privacy
        reasons, phone number should follow international format (e.g.,
        +1-555-0199)
      </QuestionHeader>
      <ul className='text-black px-10 grid-cols-2 grid gap-4 mt-4 w-full'>
        <li className='flex flex-col  gap-1 w-full '>
          <div className='  text-sm font-semibold pl-5'>Full name</div>
          <p className='text-red-500 font-semibold text-xs pl-5'>
            {errors.fullName?.length > 0 && errors.fullName}
          </p>
          <input
            value={contactDetails.fullName}
            type='text'
            required
            name='fullName'
            onChange={handleChange}
            placeholder='eg: Michael Daps'
            className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
          />
        </li>
        <li className='flex flex-col  gap-1 w-full '>
          <div className='  text-sm font-semibold pl-5'>Phone number</div>
          <p className='text-red-500 font-semibold text-xs pl-5'>
            {errors.phone?.length > 0 && errors.phone}
          </p>
          <input
            value={contactDetails.phone}
            type='text'
            required
            name='phone'
            onChange={handleChange}
            placeholder='eg: +234 583742342'
            className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
          />
        </li>
        <li className='flex flex-col  gap-1 w-full '>
          <div className='  text-sm font-semibold pl-5'>
            Country and City/State
          </div>
          <p className='text-red-500 font-semibold text-xs pl-5'>
            {errors.location?.length > 0 && errors.location}
          </p>
          <input
            value={contactDetails.location}
            name='location'
            type='text'
            required
            onChange={handleChange}
            placeholder='eg: Norway'
            className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
          />
        </li>
        <li className='flex flex-col  gap-1 w-full '>
          <div className='  text-sm font-semibold pl-5'>Email</div>
          <p className='text-red-500 font-semibold text-xs pl-5'>
            {errors.email?.length > 0 && errors.email}
          </p>
          <input
            value={contactDetails.email}
            name='email'
            required
            onChange={handleChange}
            placeholder='eg: acq@gmail.com'
            className={`border pl-7 pr-3 outline-[#ec5b13] py-3 inline-block   rounded-xl`}
          />
        </li>
      </ul>
    </section>
  )
}

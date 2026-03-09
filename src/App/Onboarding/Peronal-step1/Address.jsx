import { useEffect, useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { saveContactDetails } from '../../../store/personalSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function Address () {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    email: ''
  })
  const { errors } = useSelector(state => state.personal)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(saveContactDetails(formData))
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [formData, dispatch])

  return (
    <section className='mt-15 '>
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
            type='tel'
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

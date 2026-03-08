import { NavLink } from 'react-router-dom'

export function BackNext ({ className, nextLink = '', previousLink = '' }) {
  return (
    <section className={`w-full flex justify-between  ${className}`}>
      <NavLink
        to={previousLink}
        className='bg-[#fd9159] hover:bg-orange-600 rounded-2xl text-white text-center font-semibold text-sm w-40 py-4'
      >
        Previous
      </NavLink>
      <NavLink
        to={nextLink}
        className='bg-[#fd9159] hover:bg-orange-600 rounded-2xl text-white text-center font-semibold text-sm w-40 py-4'
      >
        Next
      </NavLink>
    </section>
  )
}

import { NavLink } from 'react-router-dom'

export function BackNext ({ className, onClick, previousLink }) {
  return (
    <section className={`w-full flex justify-between  ${className}`}>
      <NavLink
        to={previousLink}
        className='bg-[#fd9159] cursor-pointer hover:bg-orange-600 rounded-2xl text-white text-center font-semibold text-sm w-40 py-4'
      >
        Previous
      </NavLink>
      <button
        onClick={onClick}
        className='bg-[#fd9159] cursor-pointer hover:bg-orange-600 rounded-2xl text-white text-center font-semibold text-sm w-40 py-4'
      >
        Next
      </button>
    </section>
  )
}

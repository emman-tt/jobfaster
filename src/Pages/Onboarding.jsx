import Steps from '../App/Onboarding/Steps'
import { Outlet } from 'react-router-dom'
export default function Onboarding () {
  return (
    <section className='flex flex-col w-full p-5 items-center min-h-screen bg-[#f3f5f7]'>
      <section className='w-[65%]'>
        <Steps />
        <section className='w-full h-full rounded-2xl shadow-xl bg-white'>
          <Outlet />
        </section>
      </section>
    </section>
  )
}

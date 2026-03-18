import { Outlet } from 'react-router-dom'
import ProgressBar from '../App/Onboarding/ProgressBar'
import PreviewBar from '../App/Onboarding/PreviewBar'
export default function Onboarding () {
  return (
    <section className='flex  w-full gap-10 px-0 p-5 items-center min-h-screen bg-[#f3f5f7]'>
      <ProgressBar />
      <section className='w-full  flex pl-[12%]'>
        <section className=' w-[69%] h-full rounded-2xl shadow-xl bg-white'>
          <Outlet />
        </section>
      </section>
      <PreviewBar />
    </section>
  )
}

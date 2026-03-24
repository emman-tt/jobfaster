import { Outlet } from 'react-router-dom'
import ProgressBar from '../App/Onboarding/ProgressBar'
import PreviewBar from '../App/Onboarding/PreviewBar'
import { useSelector } from 'react-redux'
import Overlay from '../components/Overlay'
import SaveResume from '../App/Onboarding/saveResume'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
export default function Onboarding () {
  const { modals } = useSelector(state => state.modal)
  const { showFinale } = useSelector(state => state.onboarding)
  const outletRef = useRef(null)

  useEffect(() => {
    if (!showFinale) {
      return
    }
    gsap.to(outletRef.current, {
      opacity: 0,
      ease: 'sine',
      duration: 0.5
    })
  }, [showFinale])

  return (
    <section className='flex  w-full gap-10 px-0 p-5 items-center min-h-screen bg-[#f3f5f7]'>
      <ProgressBar />
      <section className='w-full  flex pl-[12%]'>
        <section
          ref={outletRef}
          className=' w-[69%] h-full rounded-2xl shadow-xl bg-white'
        >
          <Outlet />
        </section>
      </section>
      <PreviewBar />

      {modals.saveResume && (
        <section className=' fixed inset-0 flex justify-center items-center h-full z-20  w-full'>
          <Overlay className={'w-full bg-black/80 '} />
          <SaveResume />
        </section>
      )}
    </section>
  )
}

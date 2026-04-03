import { useNavigate } from 'react-router-dom'
import { BackNext } from '../../../components/BackNext'
import Projects from './Projects'
import Certificates from './Certificates'

export default function Additional () {
  const navigate = useNavigate()
  function navigateNext () {
    try {
      navigate('/onboarding/format')
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }
  return (
    <section className='w-full min-h-100 flex flex-col py-10 pt-10 rounded-2xl bg-white'>
      <Projects />
      <Certificates />

      <BackNext
        previousLink='/onboarding/experience'
        onClick={() => navigateNext()}
        className={`mt-25 px-10`}
      />
    </section>
  )
}

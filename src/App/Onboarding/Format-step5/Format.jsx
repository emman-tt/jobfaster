import { BackNext } from '../../../components/BackNext'

export default function Format () {
  function navigateNext () {
    try {
    } catch (err) {
      console.error('Validation failed to execute:', err)
    }
  }

  return (
    <section className=' w-full pb-20  h-full p-10 px-15 flex flex-col pt-5 rounded-2xl bg-white'>
      <BackNext
        className={'mt-15'}
        onClick={() => navigateNext()}
        previousLink='/onboarding/job'
      />
    </section>
  )
}

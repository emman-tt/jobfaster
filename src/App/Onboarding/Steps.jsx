export default function Steps ({ number = 1 }) {
  return (
    <section className='w-full flex items-start  flex-col gap-4 px-10 py-5'>
      <div className='text-sm font-semibold'>Step {number} of 5</div>
      <h2 className='text-2xl font-semibold'>Tell us about You</h2>
      <div className='w-full rounded-3xl h-1.5 bg-[#e2e8f0]  relative'>
        <div className="w-[30%] rounded-[inherit] bg-[#ec5b13] inline-block left-0 top-0 bottom-0 absolute"></div>
      </div>
    </section>
  )
}

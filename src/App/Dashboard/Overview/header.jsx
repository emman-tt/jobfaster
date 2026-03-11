import paper from '../../../assets/img/paper.png'
import apply from '../../../assets/img/applied.png'
export const Header = () => {
  return (
    <section className='flex flex-col p-10 pt-5'>
      <h2 className=' text-3xl font-garamond'>Good Morning, Emmanuel</h2>
      <p className=' font-semibold mt-1 text-black/20 text-xs font-satoshi'>
        A new day, a new opportunity! Lets create something new
      </p>

      <nav className='flex w-full justify-between h-34 mt-5 gap-10 pr-40'>
        <section className='w-full hover:bg-gray-100 cursor-pointer bg-[#f8f8f8] overflow-hidden rounded-xl  flex h-full p-2'>
          <div className='w-full pl-5 py-2  font-semibold h-full flex flex-col justify-between rounded-l-[inherit]'>
            <p>Help me build my resume</p>
            <p className='text-xs text-gray-400'>
              Start afresh or let Ai do the heavy lifting
            </p>
          </div>
          <div className='w-full px-5 relative  rounded-r-[inherit]'>
            <p className=' absolute top-6  text-sm left-10 z-12 font-music font-light'>
              Resume
            </p>
            <img
              src={paper}
              className='w-30 h-33 z-11 shadow-xl translate-y-6 absolute bottom-0'
              alt='paper'
            />

            <img
              src={paper}
              className='w-30 h-33 translate-x-5 shadow-xl translate-y-2 absolute bottom-0'
              alt='paper'
            />
          </div>
        </section>
        <section className='w-full hover:bg-gray-100 cursor-pointer bg-[#f8f8f8] overflow-hidden rounded-xl  flex h-full p-2'>
          <div className='w-full pl-5 py-2  font-semibold h-full flex flex-col justify-between rounded-l-[inherit]'>
            <p>Help me craft a cover letter</p>
            <p className='text-xs text-gray-400'>
              Generate a personalized cover letter based on the job.
            </p>
          </div>
          <div className='w-full px-5 relative  rounded-r-[inherit]'>
            <img
              src={paper}
              className='w-30 h-36 z-11 shadow-xl -rotate-35 translate-x-10 translate-y-6 absolute bottom-0'
              alt='paper'
            />

            <img
              src={paper}
              className='w-30 h-36 translate-x-15  shadow-xl translate-y-2 absolute bottom-0'
              alt='paper'
            />
          </div>
        </section>

        <section className='w-full relative hover:bg-gray-100 cursor-pointer bg-[#f8f8f8] overflow-hidden rounded-xl  flex h-full p-2'>
          <div className='w-full pl-5 py-2  font-semibold h-full flex flex-col justify-between rounded-l-[inherit]'>
            <p>View previous applications</p>
            <div className='bg-[#fcbe77] rounded-2xl flex justify-center items-center absolute top-15 right-10 text-white text-xs -rotate-12 p-2 z-5'>
              Applied
            </div>
            <img
              src={apply}
              className=' h-auto shadow-xl translate-y-2 absolute bottom-0 w-50 flex items-center self-center object-cover'
              alt=''
            />
          </div>
        </section>
      </nav>
    </section>
  )
}

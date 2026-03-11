import { Blocks, IceCream2Icon, PanelLeftClose } from 'lucide-react'

export default function Sidebar ({ className }) {
  return (
    <section className={`$ flex flex-col h-full justify-between  ${className}`}>
      <div>
        <section className='w-full flex justify-between items-center rounded-xl text-xs  bg-white p-2'>
          <div className='flex items-center gap-2'>
            <div className='p-3 rounded-sm bg-orange-400 flex justify-center items-center'>
              <IceCream2Icon className='w-6 h-6 text-black' />
            </div>
            <div className='flex flex-col '>
              <p className=' font-semibold font-inter'>JobFaster</p>
              <p className='font-light'>Free plan</p>
            </div>
          </div>
          <PanelLeftClose className='w-5 h-5' />
        </section>

        <section className='flex flex-col w-full p-2 mt-5 gap-5'>
          {processes.map(item => (
            <div key={item.id} className='flex gap-3'>
              <span className='w-4 h-4'>{item.icon}</span>
              <p className='text-sm'>{item.name}</p>
            </div>
          ))}
        </section>
      </div>
    </section>
  )
}

const processes = [
  {
    id: 1,
    name: 'Overview',
    icon: <Blocks className='w-6 h-6' />
  },
  {
    id: 2,
    name: 'My Resumes',
    icon: <Blocks />
  },
  {
    id: 3,
    name: 'Templates Library',
    icon: <Blocks />
  }
]

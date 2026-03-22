import {
  ArrowUpDown,
  BadgePlus,
  Blocks,
  Circle,
  CircleEllipsis,
  IceCream2Icon,
  Layers,
  Mail,
  Newspaper,
  NotebookPenIcon,
  PanelLeftClose,
  PlusCircle,
  Settings,
  User2
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Sidebar ({ className }) {
  const pathname = useLocation().pathname
  const actualPath = pathname.split('/').at(-1)
  const isActive =
    processes.find(item => item.href.includes(actualPath))?.id ||
    tools.find(item => item.href.includes(actualPath))?.id
  return (
    <section className={`$ flex flex-col h-full justify-between  ${className}`}>
      <div>
        <section className='w-full flex justify-between items-center rounded-xl text-xs  bg-white p-2 '>
          <div className='flex items-center gap-2'>
            <div className='p-2 rounded-sm bg-orange-400 flex justify-center items-center'>
              <IceCream2Icon className='w-4 h-4  text-black' />
            </div>
            <div className='flex flex-col '>
              <p className=' font-semibold font-inter'>JobFaster</p>
              <p className='font-light'>Free plan</p>
            </div>
          </div>
          <PanelLeftClose className='w-5 h-5' />
        </section>

        <section className='flex flex-col w-full p-2 mt-5 gap-2'>
          {processes.map(item => (
            <NavLink
              to={item.href}
              key={item.id}
              style={{
                backgroundColor: item.id === isActive ? '#e6e8ec' : 'inherit'
              }}
              className='flex gap-3  rounded-xl p-2 items-center'
            >
              <span>{item.icon}</span>
              <p className='text-sm font-IBM text-[12px]'>{item.name}</p>
            </NavLink>
          ))}
        </section>
        <section className='flex flex-col w-full border-t border-gray-700 pt-7 p-2 mt-5 gap-2'>
          {tools.map(item => (
            <NavLink
              style={{
                backgroundColor: item.id === isActive ? '#e6e8ec' : 'inherit'
              }}
              to={item.href}
              key={item.id}
              className='flex gap-3 p-2 rounded-xl items-center'
            >
              <span>{item.icon}</span>
              <p className='text-sm font-IBM text-[12px]'>{item.name}</p>
            </NavLink>
          ))}
        </section>
      </div>

      <div className=' flex flex-col gap-4  '>
        <div className='px-2 flex flex-col gap-3'>
          {bottom.map(item => (
            <div key={item.id} className='flex gap-3 items-center'>
              <span>{item.icon}</span>
              <p className='text-sm font-IBM  text-[12px]'>{item.name}</p>
            </div>
          ))}
        </div>
        <div className=' w-full flex gap-3 px-2 rounded-xl py-3 items-center bg-[#e8e7ea]'>
          <div className='w-[20%] bg-white p-2 rounded-xl flex justify-center items-center'>
            <User2 className='w-6 h-6' />
          </div>
          <div className='flex w-[60%] flex-col text-xs'>
            <p className=' font-satoshi font-semibold'>Emmanuel Acquah</p>
            <p className=' truncate'>emmanuelacquah.dev@gmail.com</p>
          </div>
          <div className='w-[20%]'>
            <ArrowUpDown className='h-4 w-4' />
          </div>
        </div>
      </div>
    </section>
  )
}

const processes = [
  {
    id: 1,
    name: 'Overview',
    icon: <Blocks className='w-4 h-4' />,
    href: 'overview'
  },
  {
    id: 2,
    name: 'My Resumes',
    icon: <Newspaper className='w-4 h-4' />,
    href: 'resumes'
  },
  {
    id: 3,
    name: 'Templates Library',
    icon: <Layers className='w-4 h-4' />,
    href: 'templates'
  },
  {
    id: 4,
    name: 'Apply for  job',
    icon: <BadgePlus className='w-4 h-4' />,
    href: 'jobs'
  }
]

const tools = [
  {
    id: 5,
    name: 'Integrate Mail',
    icon: <Mail className='w-4 h-4' />,
    href: 'email'
  },
  {
    id: 6,
    name: 'Create Resume',
    icon: <PlusCircle className='w-4 h-4' />,
    href: 'create/resume/select'
  },
  {
    id: 7,
    name: 'Generate Cover Letter',
    href: 'cover',
    icon: <NotebookPenIcon className='w-4 h-4' />
  }
]

const bottom = [
  { id: 1, name: 'FAQ', icon: <CircleEllipsis className='w-4 h-4' /> },
  { id: 2, name: 'Settings', icon: <Settings className='w-4 h-4' /> }
]

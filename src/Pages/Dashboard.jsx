import { Outlet } from 'react-router-dom'
import Sidebar from '../App/Dashboard/Sidebar'
export default function Dashboard () {
  return (
    <section className='flex  w-full h-screen'>
      <Sidebar className={'w-[18%] bg-[#f8f8f8] p-5 '} />
      <section className='w-full h-full '>
        <Outlet />
      </section>
    </section>
  )
}

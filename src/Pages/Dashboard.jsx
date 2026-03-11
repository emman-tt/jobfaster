import Sidebar from '../App/Dashboard/Sidebar'
export default function Dashboard () {
  return (
    <section className='flex flex-col w-full h-screen'>
      <Sidebar className={'w-[20%] bg-[#f8f8f8] p-5'} />
      <section className='w-full'></section>
    </section>
  )
}

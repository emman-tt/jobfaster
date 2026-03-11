import { Search } from 'lucide-react'
import Folder from '../../../components/Folder'
export default function Main () {
  return (
    <section className='flex flex-col p-10 gap-10 pt-0'>
      <div className='w-full flex  justify-between items-center px-5 pr-40'>
        <h2 className=' text-2xl font-inter  font-light'>Recently Opened</h2>
        <div className=' w-[30%] border-slate-200 p-3 rounded-xl items-center gap-5 border flex'>
          <Search className='w-5 h-5' />
          <input
            type='text'
            placeholder='Search by Folder or File name'
            className='w-full text-sm h-full outline-0'
            name=''
            id=''
          />
        </div>
      </div>

      <section className='flex  items-start justify-start  pl-10   h-full w-full gap-15'>
        {userFolders.map(item => (
          <div key={item.id} className='w-20 cursor-pointer '>
            <Folder />
            <div className='flex w-full text-xs mt-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
              <p className=' truncate'>{item.name}</p>
              <p>{item.size}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
const userFolders = [
  {
    id: 1,
    name: 'Tripify',
    size: '5kb'
  },
  {
    id: 2,
    name: 'Scorpio-Ecommerce',
    size: '10kb'
  },
  {
    id: 2,
    name: 'LinkedIn job',
    size: '15kb'
  }
]

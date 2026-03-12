import { Search } from 'lucide-react'
import Folder from '../../../components/Folder'
import { PaperFile } from './Paper'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
export default function Main () {
  const { programs } = useSelector(state => state.files)
  const [header, setHeader] = useState('Recently Opened')

  const location = useLocation()
  useEffect(() => {
    const path = location.pathname.split('/')
    const actualPath = path.at(-1)
    if (actualPath == 'resumes') {
      setHeader('Saved Resumes')
    } else {
      setHeader('Recently Opened')
    }
  }, [location])
  return (
    <section className='flex flex-col p-10 gap-10 pt-0'>
      <div className='w-full flex  justify-between items-center px-5 pr-40'>
        <h2 className=' text-2xl font-IBM'>{header}</h2>
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

      <section className='flex  items-center justify-start  pl-10   h-full w-full gap-20 flex-wrap'>
        {programs.map(item =>
          item.type === 'folder' ? (
            <div key={item.id} className='w-20 cursor-pointer '>
              <Folder files={item.files} />
              <div className='flex w-full text-xs mt-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
                <p className=' truncate'>{item.name}</p>
                <p>{item.size}mb</p>
              </div>
            </div>
          ) : (
            <PaperFile item={item} />
          )
        )}
      </section>
    </section>
  )
}

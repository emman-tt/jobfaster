import { X } from 'lucide-react'
import folderImage from '../../../../assets/img/folder.png'
import { useDispatch } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
export default function Folder () {
  const dispatch = useDispatch()
  function closeFolderModal () {
    dispatch(toggleModals('folder'))
  }
  return (
    <section className='absolute h-130 p-2 pb-5 transition-all duration-200 ease-in-out translate-x-130 translate-y-15 z-51 shadow-xl w-[28%] bg-white rounded-2xl flex flex-col gap-4'>
      <div
        onClick={() => {
          closeFolderModal()
        }}
        className=' w-9 self-end  shadow-sm cursor-pointer flex justify-center items-center p-1 rounded-lg'
      >
        <X />
      </div>
      <div className=' w-full h-[70%] rounded-xl flex justify-center items-center bg-gray-50'>
        <img src={folderImage} className=' w-[70%] h-auto' alt='' />
      </div>
      <di className='w-full px-10 mt-4'>
        <input
          type='text'
          placeholder='Folder name'
          className=' border-b border-gray-400 pb-2 w-full outline-0 '
        />
      </di>

      <div className=' px-15 w-full'>
        <button className='bg-orange-200 cursor-pointer rounded-xl w-full py-3 flex justify-center items-center '>
          Create Folder
        </button>
      </div>
    </section>
  )
}

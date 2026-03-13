import { Outlet } from 'react-router-dom'
import Sidebar from '../App/Dashboard/Sidebar'
import { useSelector } from 'react-redux'
import Overlay from '../components/Overlay'
import Resume from '../App/Dashboard/Overview/Modals/Resume'

import UploadResume from '../App/Dashboard/Overview/Modals/UploadResume'
import UploadFile from '../App/Dashboard/Overview/Modals/UploadFile'
import Folder from '../App/Dashboard/Overview/Modals/Folder'
export default function Dashboard () {
  const { modals } = useSelector(state => state.modal)

  return (
    <section className='flex relative  w-full h-screen '>
      <Sidebar className={'w-[18%] bg-[#f8f8f8] p-5 '} />
      <section className='w-full h-full '>
        <Outlet />
      </section>

      {modals.resume && (
        <>
          <Overlay className={'bg-[#e0e4e582] backdrop-blur-sm'} />
          <Resume />
        </>
      )}
      {modals.uploadFile && (
        <>
          <Overlay className={'bg-[#e0e4e582] backdrop-blur-sm'} />
          <UploadFile />
        </>
      )}
      {modals.uploadResume && (
        <>
          <Overlay className={'bg-[#e0e4e582] backdrop-blur-sm'} />
          <UploadResume />
        </>
      )}
      {modals.folder && (
        <>
          <Overlay className={'bg-[#e0e4e582] backdrop-blur-sm'} />
          <Folder />
        </>
      )}
    </section>
  )
}

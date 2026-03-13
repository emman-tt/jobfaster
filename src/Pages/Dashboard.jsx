import { Outlet } from 'react-router-dom'
import Sidebar from '../App/Dashboard/Sidebar'
import { useSelector } from 'react-redux'
import Overlay from '../components/Overlay'
import Resume from '../App/Dashboard/Overview/Modals/Resume'
import { toggleRightbar } from '../store/dashboardSlice'
import UploadResume from '../App/Dashboard/Overview/Modals/UploadResume'
import UploadFile from '../App/Dashboard/Overview/Modals/UploadFile'
import Folder from '../App/Dashboard/Overview/Modals/Folder'
import Rightbar from '../App/Dashboard/Rightbar/Rightbar'
import { PanelLeftOpenIcon, PanelRightOpenIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
export default function Dashboard () {
  const { modals } = useSelector(state => state.modal)
  const { showRightbar } = useSelector(state => state.dashboard)
  const dispatch = useDispatch()

  function openRightbar () {
    dispatch(toggleRightbar(true))
  }
  function closeRightbar () {
    dispatch(toggleRightbar(false))
  }

  return (
    <section className='flex relative overflow-hidden  w-full h-screen '>
      <Sidebar className={'w-[18%] bg-[#f8f8f8] p-5 '} />
      <section className='w-full h-full '>
        <Outlet />
      </section>
      <section className=' flex gap-4  pt-3 pr-3 pb-3'>
        <div className=''>
          {!showRightbar ? (
            <PanelRightOpenIcon
              onClick={() => {
                openRightbar()
              }}
              className={`w-6  cursor-pointer h-6 mt-5 mr-7   `}
            />
          ) : (
            <PanelLeftOpenIcon
              onClick={() => {
                closeRightbar()
              }}
              className={`w-6 cursor-pointer h-6 mt-5 `}
            />
          )}
        </div>
        {showRightbar && (
          <Rightbar
            className={'w-80  rounded-xl shadow-[#23232389] shadow-sm '}
          />
        )}
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

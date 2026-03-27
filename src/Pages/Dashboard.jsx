import { Outlet } from 'react-router-dom'
import Sidebar from '../App/Dashboard/Sidebar'
import { useSelector } from 'react-redux'
import Overlay from '../components/Overlay'
import Resume from '../App/Dashboard/Overview/Modals/Resume'
import { toggleRightbar } from '../store/dashboardSlice'
import UploadFile from '../App/Dashboard/Overview/Modals/UploadFile'
import Folder from '../App/Dashboard/Overview/Modals/Folder'
import Rightbar from '../App/Dashboard/Rightbar/Rightbar'
import { PanelLeftOpenIcon, PanelRightOpenIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { toggleNotification } from '../store/notificationSlice'
import SelectResume from '../App/Dashboard/Job/Modals/SelectResume'
import { setCallback } from '../hooks/useSocket'
import { saveResume } from '../store/filesSlice'
import { getAllFiles } from '../utils/getAllFiles'

export default function Dashboard () {
  const { modals } = useSelector(state => state.modal)
  const { showRightbar } = useSelector(state => state.dashboard)
  const { showNotification } = useSelector(state => state.notification)
  const { programs } = useSelector(state => state.files)
  const allFilesOnly = getAllFiles(programs)
  const { tailor } = showNotification
  const dispatch = useDispatch()

  function openRightbar () {
    dispatch(toggleRightbar(true))
  }
  function closeRightbar () {
    dispatch(toggleRightbar(false))
  }
  useEffect(() => {
    setCallback(data => {
      const { status, response, jobId, timestamp, fileId } = data

      if (status == true) {
        const parsed = JSON.parse(response)
        const match = allFilesOnly.find(item => item.id == fileId)

        const tobeSaved = {
          ...match,
          id: jobId,
          name: `${match.name}-${jobId}`,
          content: parsed,
          createdAt: timestamp
        }
        dispatch(saveResume(tobeSaved))

        return
      }
    })
  }, [dispatch, allFilesOnly])
  // dispatch(toggleNotification({ category: 'tailor', value: true }))

  useEffect(() => {
    let toastId = null

    if (tailor) {
      toastId = toast.loading('Parsing and rewriting Resume...', {
        style: {
          background: '#f1b672',
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
          boxShadow: '2px 2px 10px solid black'
        },
        description:
          'Ai proccessing takes 20s - 40s, you would be redirected to the resume  on completion',
        position: 'top-center',
        id: 'tailor-loading'
      })
    }

    return () => {
      setTimeout(() => {
        toast.dismiss(toastId)
        dispatch(toggleNotification({ category: 'tailor', value: false }))
      }, 10000)
    }
  }, [tailor, dispatch])

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
            className={
              'w-80 transition-all duration-200 transform-gpu ease-linear  rounded-xl shadow-[#23232389] shadow-sm '
            }
          />
        )}
      </section>

      {modals.selectResume && (
        <>
          <Overlay className={'bg-[#e0e4e582] backdrop-blur-sm'} />
          <SelectResume />
        </>
      )}
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
      {modals.folder && (
        <>
          <Overlay className={'bg-[#e0e4e582] backdrop-blur-sm'} />
          <Folder />
        </>
      )}
    </section>
  )
}

import { Outlet, useNavigate } from 'react-router-dom'
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
import { useEffect, useRef } from 'react'

import SelectResume from '../App/Dashboard/Job/Modals/SelectResume'
import { setCallback } from '../hooks/useSocket'
import { saveResume } from '../store/filesSlice'
import { getAllFiles } from '../utils/getAllFiles'
import { dumpEmailDetails } from '../store/emailSlice'
import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'

export default function Dashboard () {
  const { modals } = useSelector(state => state.modal)
  const { showRightbar } = useSelector(state => state.dashboard)
  const { programs } = useSelector(state => state.files)
  const allFilesOnly = getAllFiles(programs)
  const allFilesOnlyRef = useRef(allFilesOnly)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function openRightbar () {
    dispatch(toggleRightbar(true))
  }
  function closeRightbar () {
    dispatch(toggleRightbar(false))
  }

  useEffect(() => {
    console.log('🔵 useEffect running - setting callback')

    setCallback(raw => {
      const data = JSON.parse(raw)
      if (data) {
        toast.dismiss('ai-processing')

        const status = data.status
        const response = data.response
        const jobId = data.jobId
        const timestamp = data.timestamp
        const fileId = data.fileId

        if (status == true) {
          toast.success('Ready!', {
            ...toastPresets.aiSuccess(
              'Resume processed successfully! Redirecting you to your tailored resume...'
            ),
            id: 'ai-success',
            position: 'top-right'
          })

          const content = response.resume
          const match = allFilesOnlyRef.current.find(item => item.id == fileId)

          const splitted = jobId.split('-')[0]
          const tobeSaved = {
            ...match,
            id: splitted,
            name: `${match.name}-${splitted}`,
            content: content,
            createdAt: timestamp
          }

          dispatch(saveResume(tobeSaved))
          dispatch(dumpEmailDetails(response.email))
          navigate(`/dashboard/file/?resumeID=${splitted}`)
        } else {
          toastPresets.aiError()
          navigate('/dashboard/job')
          console.log(' Status false or not true')
        }
      }
    })
  }, [dispatch, navigate, allFilesOnly])

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

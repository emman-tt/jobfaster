import { Outlet, useLocation, useNavigate } from 'react-router-dom'
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
import SelectResume from '../App/Dashboard/Job/Modals/SelectResume'
import { onJobApply, onSendJobMail } from '../services/useSocket'

import { dumpEmailDetails } from '../store/emailSlice'
import { saveTailoredResume } from '../store/aiSlice'
import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'
import FileDetails from '../App/Dashboard/Overview/Modals/FileDetails'

import { useQuery } from '@tanstack/react-query'
import { getActivity } from '../services/activity'

export default function Dashboard () {
  const { modals } = useSelector(state => state.modal)
  const { showRightbar } = useSelector(state => state.dashboard)
  const { appearance } = useSelector(state => state.preferences)
  const location = useLocation()
  const actualPath = location.pathname.split('/').at(-1)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function openRightbar () {
    dispatch(toggleRightbar(true))
  }
  function closeRightbar () {
    dispatch(toggleRightbar(false))
  }

  useEffect(() => {
    onJobApply(data => {
      toast.dismiss('ai-processing')
      const status = data?.status
      const response = data?.response
      if (status == 'success') {
        toast.success('Ready!', {
          ...toastPresets.aiSuccess(
            'Resume processed successfully! Redirecting you to your tailored resume...'
          ),
          id: 'ai-success',
          position: 'top-right'
        })
        const content = response.resume
        console.log('resume', content)
        dispatch(dumpEmailDetails(response.email))
        dispatch(saveTailoredResume(response))
        console.log('email', response.email)
        navigate('finalize')
        return
      } else {
        toastPresets.aiError()
        console.log(' Status false or not true')
      }
    })
  }, [dispatch, navigate])

  useEffect(() => {
    onSendJobMail(data => {
      if (data) {
        const status = data?.status

        console.log('status in dashboard', status)
        if (!status) {
          return console.log('still loading')
        }

        if (status == 'success') {
          toast.dismiss('job-mail')
          navigate('/dashboard/board')
          toast.success('Email sent!', {
            ...toastPresets.generalSuccess(
              'Email processed and sent successfully to the hiring address'
            ),
            id: 'job-mail',
            position: 'top-right'
          })
          return
        }

        if (status == 'failed') {
          toast.dismiss('job-mail')
          toast.error('Unable to send mail!', {
            ...toastPresets.generalError(
              'Resume processed successfully! Redirecting you to your tailored resume...'
            ),
            id: 'job-mail',
            position: 'top-right'
          })
          return
        }
      }
    })
  }, [navigate])

  const { data } = useQuery({
    queryKey: ['activity'],
    queryFn: () => getActivity(),
    staleTime: 3 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false
  })

  const activities = data?.data

  return (
    <section
      className={`flex relative ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      }  overflow-hidden   w-full h-screen `}
    >
      <Sidebar
        className={`w-70 ${
          appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-[#f8f8f8]'
        }  p-5 `}
      />
      <section className='w-full h-full'>
        <Outlet />
      </section>
      <section className='flex gap-4  pt-3 pr-3 pb-3'>
        <div
          className={` ${
            appearance.theme == 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          {(actualPath == 'resumes' || actualPath == 'overview') &&
            (!showRightbar ? (
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
            ))}
        </div>
        {showRightbar &&
          (actualPath == 'resumes' || actualPath == 'overview') && (
            <Rightbar
              data={activities}
              className={
                'w-80 transition-all duration-200 transform-gpu ease-linear  rounded-xl shadow-[#23232389] shadow-sm '
              }
            />
          )}
      </section>

      {modals.selectResume && (
        <>
          <Overlay
            className={` ${
              appearance.theme == 'dark' ? 'bg-[#00000000]' : 'bg-[#e0e4e582]'
            } backdrop-blur-sm`}
          />
          <SelectResume />
        </>
      )}
      {modals.resume && (
        <>
          <Overlay
            className={` ${
              appearance.theme == 'dark' ? 'bg-[#00000000]' : 'bg-[#e0e4e582]'
            } backdrop-blur-sm`}
          />
          <Resume />
        </>
      )}
      {modals.uploadFile && (
        <>
          <Overlay
            className={` ${
              appearance.theme == 'dark' ? 'bg-[#00000000]' : 'bg-[#e0e4e582]'
            } backdrop-blur-sm`}
          />
          <UploadFile />
        </>
      )}
      {modals.folder && (
        <>
          <Overlay
            className={` ${
              appearance.theme == 'dark' ? 'bg-[#00000000]' : 'bg-[#e0e4e582]'
            } backdrop-blur-sm`}
          />
          <Folder />
        </>
      )}
      {modals.fileDetails && (
        <>
          <Overlay
            className={` ${
              appearance.theme == 'dark' ? 'bg-[#00000000]' : 'bg-[#e0e4e582]'
            } backdrop-blur-sm`}
          />
          <FileDetails />
        </>
      )}
    </section>
  )
}

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../App/Dashboard/Sidebar'
import { useSelector } from 'react-redux'
import Overlay from '../components/Overlay'
import Resume from '../App/Dashboard/Overview/Modals/Resume'
import { toggleRightbar } from '../store/dashboardSlice'
import UploadFile from '../App/Dashboard/Overview/Modals/UploadFile'
import Folder from '../App/Dashboard/Overview/Modals/Folder'
import Rightbar from '../App/Dashboard/Rightbar/Rightbar'
import { Menu, X, PanelLeftOpenIcon, PanelRightOpenIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

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
      {/* Desktop sidebar */}
      <Sidebar
        className={`hidden md:flex w-70 ${
          appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-[#f8f8f8]'
        } p-5`}
      />

      <section className='  w-full  relative     sm:h-full sm:border-0 max-sm:border-b max-sm:py-4 border-white min-w-0'>
        {/* Mobile hamburger */}
        <button
          onClick={() => setShowMobileSidebar(true)}
          className={`md:hidden absolute bottom-10 right-5  p-4    rounded-full shadow-sm  z-20 cursor-pointer ${
            appearance.theme == 'dark'
              ? 'text-white  bg-black'
              : 'text-black bg-white'
          }`}
        >
          <Menu className={`sm:w-6 sm:h-6 w-8 h-8`} />
        </button>

        {(actualPath == 'resumes' || actualPath == 'overview') && (
          <button
            onClick={() => {
              showRightbar ? closeRightbar() : openRightbar()
            }}
            className={`absolute right-3 max-sm:p-0  max-sm:rounded-full  md:right-10 top-5 z-20 cursor-pointer ${
              appearance.theme == 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            {showRightbar ? (
              <PanelLeftOpenIcon className='sm:w-6 sm:h-6' />
            ) : (
              <PanelRightOpenIcon className='sm:w-6 sm:h-6  w-7 h-7' />
            )}
          </button>
        )}
        <Outlet />
      </section>

      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div className='fixed inset-0 z-50 md:hidden'>
          <div
            className='absolute inset-0 bg-black/50'
            onClick={() => setShowMobileSidebar(false)}
          />
          <aside
            className={`absolute left-0 top-0 bottom-0 w-70 p-5 overflow-y-auto ${
              appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-[#f8f8f8]'
            }`}
          >
            <Sidebar className='' />
          </aside>
        </div>
      )}

      {showRightbar && (actualPath == 'resumes' || actualPath == 'overview') && (
        <>
          {/* Mobile overlay */}
          <div className='fixed inset-0 z-50 md:hidden' onClick={closeRightbar}>
            <div className='absolute inset-0 bg-black/50' />
            <aside
              className={`absolute right-0 top-0 bottom-0 w-80 transition-all duration-200 rounded-xl shadow-[#23232389] shadow-sm ${
                appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <Rightbar data={activities} className='' />
            </aside>
          </div>
          {/* Desktop inline */}
          <div className='hidden md:block'>
            <Rightbar
              data={activities}
              className='w-80 transition-all duration-200 transform-gpu ease-linear rounded-xl shadow-[#23232389] shadow-sm'
            />
          </div>
        </>
      )}

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

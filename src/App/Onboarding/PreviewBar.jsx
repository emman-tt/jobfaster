import TwoColumnResume from '../../App/Dashboard/CreateResume/templates/TwoColumn'
import LeftAlligned from '../../App/Dashboard/CreateResume/templates/LeftAlligned'
import SkillsFirstResume from '../../App/Dashboard/CreateResume/templates/SkillsFirst'
import DividedResume from '../../App/Dashboard/CreateResume/templates/Divided'
import Default from '../../App/Dashboard/CreateResume/templates/Default'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { useRef } from 'react'
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import {
  toggleFinale,
  toggleZoom,
  controlZoom
} from '../../store/onboardingSlice'
import { toggleModals } from '../../store/modalSlice'

export default function PreviewBar () {
  const { layoutId } = useSelector(state => state.ai)
  const {
    contactDetails,
    education,
    kindsOfWork,
    skillsAndTools,
    summary,
    summaryType,
    languages,
    showLanguages
  } = useSelector(state => state.personal)
  const { experience } = useSelector(state => state.experience)
  const { styless } = useSelector(state => state.format)
  const { showFinale, zoom } = useSelector(state => state.onboarding)
  const { showProjects, projects, showCertificates, certificates } =
    useSelector(state => state.additional)
  const dispatch = useDispatch()
  const nodeRef = useRef(null)

  const userData = {
    name: contactDetails.fullName,
    email: contactDetails.email,
    phone: contactDetails.phone,
    location: contactDetails.location,
    jobTitle: contactDetails.jobTitle,
    education: education,
    skills: skillsAndTools,
    kindsOfWork: kindsOfWork,
    summary: summary,
    showSummary: summaryType !== 'No summary',
    experience: experience,
    styles: styless,
    languages: languages,
    showLanguages: showLanguages,
    showProjects: showProjects,
    projects: projects,
    showCertificates: showCertificates,
    certificates: certificates
  }

  function handleClose () {
    if (zoom.value) {
      dispatch(toggleZoom())
    } else {
      dispatch(toggleFinale(false))
      dispatch(toggleModals('saveResume'))
    }
  }

  function handleZoomIn () {
    dispatch(controlZoom('increase'))
  }

  function handleZoomOut () {
    dispatch(controlZoom('decrease'))
  }

  function handleZoomReset () {
    dispatch({ type: 'onboarding/controlZoom', payload: 'reset' })
  }

  const zoomPercentage = 50 + zoom.amount

  if (zoom.value) {
    return (
      <div className='fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex flex-col'>
        <div className='flex  justify-end  px-6 py-4  border-b border-orange-500'>
          <div className='flex items-center gap-3'>
            <button
              onClick={handleZoomOut}
              className='p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white'
              title='Zoom Out'
            >
              <ZoomOut className='w-5 h-5' />
            </button>
            <span className='text-white font-medium min-w-16 text-center'>
              {zoomPercentage}%
            </span>
            <button
              onClick={handleZoomIn}
              className='p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white'
              title='Zoom In'
            >
              <ZoomIn className='w-5 h-5' />
            </button>
            <button
              onClick={handleZoomReset}
              className='p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white'
              title='Reset Zoom'
            >
              <Maximize2 className='w-5 h-5' />
            </button>
            <div className='w-px h-6 bg-slate-600 mx-2' />
            <button
              onClick={handleClose}
              className='flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-white font-medium'
            >
              <X className='w-4 h-4' />
              Close
            </button>
          </div>
        </div>

        <div className='flex-1 [scrollbar-width:thin] overflow-auto p-8 flex items-start justify-center'>
          <div
            className='bg-white shadow-2xl rounded-lg'
            style={{
              transform: `scale(${zoomPercentage / 100})`,
              transformOrigin: 'top center'
            }}
          >
            {layoutId == 1 ? (
              <Default className={'w-[210mm]'} userData={userData} />
            ) : layoutId == 2 ? (
              <LeftAlligned className={'w-[210mm]'} userData={userData} />
            ) : layoutId == 3 ? (
              <TwoColumnResume className={'w-[210mm]'} userData={userData} />
            ) : layoutId == 4 ? (
              <SkillsFirstResume className={'w-[210mm]'} userData={userData} />
            ) : (
              <DividedResume className={'w-[210mm]'} userData={userData} />
            )}
          </div>
        </div>
      </div>
    )
  }

  function navigateNext () {
    dispatch(toggleFinale(false))
    dispatch(toggleModals('saveResume'))
  }

  return (
    <section className='bg-none fixed top-0 bottom-0 right-0 w-[32%]'>
      {showFinale && (
        <div
          onClick={() => dispatch(toggleFinale(false))}
          className='absolute inset-0 bg-black/50 z-40 cursor-pointer'
        />
      )}

      {showFinale && (
        <button
          onClick={navigateNext}
          className='top-10 right-20 py-3 w-max cursor-pointer px-10 absolute z-50 bg-orange-300 rounded-xl flex justify-center items-center text-white font-semibold font-satoshi hover:bg-orange-400 transition-colors'
        >
          Save Resume
        </button>
      )}

      <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          className={`relative z-80 w-[180mm] h-[250mm] overflow-hidden ${
            showFinale
              ? 'overflow-y-scroll [scrollbar-width:thin]'
              : ''
          }`}
        >
          <div className={`w-[210mm] min-h-[297mm] scale-55 origin-top-left ${
            layoutId == 2 ? 'absolute top-0 right-0' : ''
          }`}>
            {layoutId == 1 ? (
              <Default
                className={'w-[210mm] min-h-[297mm]'}
                userData={userData}
              />
            ) : layoutId == 2 ? (
              <LeftAlligned
                className={'w-[210mm] min-h-[297mm]'}
                userData={userData}
              />
            ) : layoutId == 3 ? (
              <TwoColumnResume
                className={'w-[210mm] min-h-[297mm]'}
                userData={userData}
              />
            ) : layoutId == 4 ? (
              <SkillsFirstResume
                className={'w-[210mm] min-h-[297mm]'}
                userData={userData}
              />
            ) : (
              <DividedResume
                className={'w-[210mm] min-h-[297mm]'}
                userData={userData}
              />
            )}
          </div>
        </div>
      </Draggable>
    </section>
  )
}

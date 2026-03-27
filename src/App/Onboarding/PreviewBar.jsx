import TwoColumnResume from '../../App/Dashboard/CreateResume/templates/TwoColumn'
import LeftAlligned from '../../App/Dashboard/CreateResume/templates/LeftAlligned'
import SkillsFirstResume from '../../App/Dashboard/CreateResume/templates/SkillsFirst'
import DividedResume from '../../App/Dashboard/CreateResume/templates/Divided'
import Default from '../../App/Dashboard/CreateResume/templates/Default'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { useEffect, useRef } from 'react'
import { gsap } from '../../libs/gsap'
import Overlay from '../../components/Overlay'
import { toggleFinale } from '../../store/onboardingSlice'
import { toggleModals } from '../../store/modalSlice'
export default function PreviewBar () {
  const { layoutId } = useSelector(state => state.ai)
  const {
    contactDetails,
    education,
    kindsOfWork,
    skillsAndTools,
    summary,
    summaryType
  } = useSelector(state => state.personal)
  const { experience } = useSelector(state => state.experience)
  const { styless } = useSelector(state => state.format)
  const { showFinale } = useSelector(state => state.onboarding)
  const dispatch = useDispatch()
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
    styles: styless
  }
  const nodeRef = useRef(null)

  useEffect(() => {
    if (!showFinale) {
      return
    }
    gsap.to(nodeRef.current, {
      scale: 1.5,
      y: 70,
      x: -600
    })
  }, [showFinale])

  function navigateNext () {
    dispatch(toggleFinale(false))
    dispatch(toggleModals('saveResume'))
  }

  return (
    <section className=' bg-none fixed top-0 bottom-0 right-0 w-[32%] '>
      {showFinale && <Overlay className={' absolute bg-black/50 inset-0'} />}
      {showFinale && (
        <div
          onClick={() => {
            navigateNext()
          }}
          className={
            ' top-10 right-20 py-3 w-max  cursor-pointer px-10 absolute z-90 bg-orange-300 rounded-xl flex justify-center items-center text-white font-semibold font-satoshi'
          }
        >
          Save Resume
        </div>
      )}
      <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          className={`relative z-80 ${
            showFinale && 'overflow-y-scroll [scrollbar-width:thin]   min-h-115'
          }`}
        >
          {layoutId == 1 ? (
            <Default
              className={'w-[210mm] min-h-[297mm] scale-75'}
              userData={userData}
            />
          ) : layoutId == 2 ? (
            <LeftAlligned
              className={
                'w-[210mm] min-h-[297mm] scale-55 absolute top-0 right-0 left-0 -translate-y-45 -translate-x-20'
              }
              userData={userData}
            />
          ) : layoutId == 3 ? (
            <TwoColumnResume
              className={'w-[210mm] min-h-[297mm] scale-55'}
              userData={userData}
            />
          ) : layoutId == 4 ? (
            <SkillsFirstResume
              className={'w-[210mm] min-h-[297mm] scale-55'}
              userData={userData}
            />
          ) : (
            <DividedResume
              className={'w-[210mm] min-h-[297mm] scale-75'}
              userData={userData}
            />
          )}
        </div>
      </Draggable>

      {/* <button className=' bg-blue-400   rounded-xl flex justify-center items-center text-sm'>
        Change template
      </button> */}
    </section>
  )
}

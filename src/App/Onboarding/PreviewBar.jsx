import TwoColumnResume from '../../App/Dashboard/CreateResume/templates/TwoColumn'
import LeftAlligned from '../../App/Dashboard/CreateResume/templates/LeftAlligned'
import SkillsFirstResume from '../../App/Dashboard/CreateResume/templates/SkillsFirst'
import DividedResume from '../../App/Dashboard/CreateResume/templates/Divided'
import Default from '../../App/Dashboard/CreateResume/templates/Default'
import { useSelector } from 'react-redux'

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
    experience: experience
  }

  return (
    <section className=' fixed top-0 right-0 w-[30%] '>
      {
        <div
          className={` ${
            layoutId == 1 || layoutId == 3
              ? '-translate-y-10  scale-75'
              : '-translate-y-10 scale-65'
          } `}
        >
          {layoutId == 1 ? (
            <Default userData={userData} />
          ) : layoutId == 2 ? (
            <LeftAlligned userData={userData} />
          ) : layoutId == 3 ? (
            <TwoColumnResume userData={userData} />
          ) : layoutId == 4 ? (
            <SkillsFirstResume userData={userData} />
          ) : (
            <DividedResume userData={userData} />
          )}
        </div>
      }
    </section>
  )
}

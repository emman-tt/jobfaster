import TwoColumnResume from '../../App/Dashboard/CreateResume/templates/TwoColumn'
import LeftAlligned from '../../App/Dashboard/CreateResume/templates/LeftAlligned'
import SkillsFirstResume from '../../App/Dashboard/CreateResume/templates/SkillsFirst'
import DividedResume from '../../App/Dashboard/CreateResume/templates/Divided'
import Default from '../../App/Dashboard/CreateResume/templates/Default'
import { useSelector } from 'react-redux'

const views = [
  {
    id: 1,
    name: 'Default Classic Layout',
    Comp: <Default />
  },
  {
    id: 2,
    name: 'Left Aligned Layout',
    Comp: <LeftAlligned />
  },
  {
    id: 3,
    name: 'Two Column Layout',
    Comp: <TwoColumnResume />
  },
  {
    id: 4,
    name: 'Skills First Layout',
    Comp: <SkillsFirstResume />
  },
  {
    id: 5,
    name: 'Divided Sections Layout',
    Comp: <DividedResume />
  }
]
export default function PreviewBar () {
  const { layoutId } = useSelector(state => state.ai)
  const { contactDetails, education, kindsOfWork, skillsAndTools, summary } =
    useSelector(state => state.personal)
  const userData = {
    name: contactDetails.fullName,
    email: contactDetails.email,
    phone: contactDetails.phone,
    location: contactDetails.location,
    jobTitle: contactDetails.jobTitle,
    education: education,
    skills: skillsAndTools,
    kindsOfWork: kindsOfWork,
    summary: summary
  }

  return (
    <section className=' fixed top-0 right-0 w-[30%] '>
      {
        <div
          className={` ${
            layoutId == 1 || layoutId == 3
              ? '-translate-y-10  scale-75'
              : '-translate-y-20 scale-65'
          } `}
        >
          {layoutId == 1 ? (
            <Default userData={userData} />
          ) : layoutId == 2 ? (
            <LeftAlligned />
          ) : layoutId == 3 ? (
            <TwoColumnResume />
          ) : layoutId == 4 ? (
            <SkillsFirstResume />
          ) : (
            <DividedResume />
          )}
        </div>
      }
    </section>
  )
}

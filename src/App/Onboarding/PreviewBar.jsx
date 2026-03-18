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

  return (
    <section className=' fixed top-0 right-0 w-[30%] '>
      {
        <div className={` ${layoutId == 1 || layoutId == 3 ?'-translate-y-10  scale-75' : '-translate-y-20 scale-65' } `}>
          {views.find(item => item.id == layoutId).Comp}
        </div>
      }
    </section>
  )
}

import { ArrowRight, CheckCheckIcon, View } from 'lucide-react'
import TwoColumnResume from './templates/TwoColumn'
import LeftAlligned from './templates/LeftAlligned'
import SkillsFirstResume from './templates/SkillsFirst'
import DividedResume from './templates/Divided'
import Default from './templates/Default'
import { changeLayout } from '../../../store/aiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const views = [
  {
    id: 1,
    name: 'Default Classic Layout',
    Comp: Default
  },
  {
    id: 2,
    name: 'Left Aligned Layout',
    Comp: LeftAlligned
  },
  {
    id: 3,
    name: 'Two Column Layout',
    Comp: TwoColumnResume
  },
  {
    id: 4,
    name: 'Skills First Layout',
    Comp: SkillsFirstResume
  },
  {
    id: 5,
    name: 'Divided Sections Layout',
    Comp: DividedResume
  }
]
export default function Examples () {
  const dispatch = useDispatch()
  const { layoutId } = useSelector(state => state.ai)
  const navigate = useNavigate()

  function navigateNext () {
    navigate('/onboarding/personal')
  }

  return (
    <section className=' w-full h-full pt-20 px-20 overflow-scroll [scrollbar-width:thin]'>
      <div className=' flex items-center'>
        <div>
          <h2 className=' text-2xl font-semibold font-satoshi'>
            Choose from the 5 structures to begin with
          </h2>
          <p className=' text-sm  font-satoshi pr-8'>
            This is a list of refrained and modern resume templates to help you
            structure your resume.Note that this only applies to the stucture of
            your resume and not the content within
          </p>
        </div>
        <button
          onClick={() => navigateNext()}
          className=' bg-orange-500 w[20%] text-white cursor-pointer rounded-2xl px-9 py-2 flex justify-center items-center gap-5'
        >
          Next
          <ArrowRight />
        </button>
      </div>
      <section className=' grid grid-cols-4 gap-9 mt-4'>
        {views.map(item => {
          const Component = item.Comp
          return (
            <div
              onClick={() => dispatch(changeLayout(item.id))}
              className={` ${
                item.id == layoutId && 'border-2 border-orange-400'
              } group relative cursor-pointer pb-2 flex  flex-col gap-5 shadow-md h-70 w-full min-w-45  rounded-xl`}
            >
              <div className=' h-full w-full rounded-xl overflow-y-scroll overflow-hidden  [scrollbar-width:none] relative'>
                <Component className={'scale-100'} />
              </div>
              <p className=' text-md  font-satoshi text-center '>{item.name}</p>
            </div>
          )
        })}
      </section>
    </section>
  )
}

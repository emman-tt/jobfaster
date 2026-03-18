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
      <section className=' grid grid-cols-3 gap-9 mt-4'>
        {views.map(item => (
          <div
            onClick={() => dispatch(changeLayout(item.id))}
            className={` ${
              item.id == layoutId && 'border-2 border-orange-400'
            } group relative cursor-pointer pb-5 flex flex-col gap-10 shadow-xl h-110 w-full min-w-45  rounded-xl`}
          >
            <div className=' h-full w-full rounded-xl overflow-scroll  [scrollbar-width:thin] relative'>
              {item.Comp}
            </div>
            <p className=' font-semibold text-lg font-satoshi text-center '>
              {item.name}
            </p>

            <div className=' group-hover:flex absolute hidden bottom-15 cursor-pointer self-center   gap-3 w-full px-2 mb-2'>
              <button
                onClick={() => dispatch(changeLayout(item.id))}
                className=' rounded-4xl gap-2 flex w-full py-3 justify-center items-center  text-sm font-satoshi bg-orange-600 text-white  '
              >
                <CheckCheckIcon className=' w-3 h-3' />
                {layoutId == item.id ? 'Selected' : 'Select'}
              </button>
              <button className=' rounded-4xl gap-2 flex w-full py-3 justify-center items-center  text-sm font-satoshi text-white bg-orange-600  '>
                <View className=' w-3 h-3' />
                Preview
              </button>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

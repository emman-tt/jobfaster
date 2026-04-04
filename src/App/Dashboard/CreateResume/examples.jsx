import { ArrowRight } from 'lucide-react'
import TwoColumnResume from './templates/TwoColumn'
import LeftAlligned from './templates/LeftAlligned'
import SkillsFirstResume from './templates/SkillsFirst'
import DividedResume from './templates/Divided'
import Default from './templates/Default'
import { changeLayout } from '../../../store/aiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sampleUserData } from '../../../utils/sample'

const views = [
  {
    id: 1,
    name: 'Default Classic',
    Comp: Default
  },
  {
    id: 2,
    name: 'Left Aligned',
    Comp: LeftAlligned
  },
  {
    id: 3,
    name: 'Two Column',
    Comp: TwoColumnResume
  },
  {
    id: 4,
    name: 'Skills First',
    Comp: SkillsFirstResume
  },
  {
    id: 5,
    name: 'Divided',
    Comp: DividedResume
  }
]

const templateStyles = {
  1: { scale: 0.3, className: 'w-[210mm] min-h-[297mm]' },
  2: { scale: 0.3, className: 'w-[210mm] min-h-[297mm]' },
  3: { scale: 0.3, className: 'w-[210mm] min-h-[297mm]' },
  4: { scale: 0.3, className: 'w-[210mm] min-h-[297mm]' },
  5: { scale: 0.38, className: 'w-[210mm] min-h-[297mm]' }
}

export default function Examples () {
  const dispatch = useDispatch()
  const { layoutId } = useSelector(state => state.ai)
  const navigate = useNavigate()

  function navigateNext () {
    navigate('/onboarding/personal')
  }

  return (
    <section className='w-full h-full pt-16 px-12 overflow-auto'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-semibold font-satoshi'>
            Choose your template
          </h2>
          <p className='text-sm font-satoshi text-slate-500 mt-1'>
            Select a layout structure for your resume
          </p>
        </div>
        <button
          onClick={() => navigateNext()}
          className='bg-orange-500 text-white cursor-pointer rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-orange-600 transition-colors font-satoshi font-medium'
        >
          Next <ArrowRight className='w-4 h-4' />
        </button>
      </div>
      <section className='grid grid-cols-5 gap-4'>
        {views.map(item => {
          const Component = item.Comp
          const config = templateStyles[item.id]
          return (
            <div
              key={item.id}
              onClick={() => dispatch(changeLayout(item.id))}
              className={`cursor-pointer ${
                item.id == layoutId
                  ? 'ring-2 ring-orange-500 ring-offset-2 rounded-xl'
                  : ''
              }`}
            >
              <div
                className={`relative bg-white border border-slate-200 rounded-lg overflow-hidden ${
                  item.id == layoutId ? 'shadow-lg' : 'shadow-sm'
                }`}
              >
                <div
                  className='overflow-hidden overflow-y-scroll [scrollbar-width:thin] '
                  style={{ height: '210px' }}
                >
                  <div
                    className='origin-top-left w-full h-60'
                    style={{ transform: `scale(${config.scale})` }}
                  >
                    <Component
                      className={config.className}
                      userData={sampleUserData}
                    />
                  </div>
                </div>
              </div>
              <p
                className={`text-sm font-satoshi font-medium text-center mt-2 ${
                  item.id == layoutId ? 'text-orange-600' : 'text-slate-600'
                }`}
              >
                {item.name}
              </p>
            </div>
          )
        })}
      </section>
    </section>
  )
}

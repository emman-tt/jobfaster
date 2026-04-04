import { CheckCircle, Library, ScanSearch, ZoomIn } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleZoom, controlZoom } from '../../store/onboardingSlice'
export default function ProgressBar () {
  const { zoom } = useSelector(state => state.onboarding)
  const dispatch = useDispatch()
  const pathname = useLocation().pathname
  const actualPath = pathname.split('/').at(-1)
  const isActive = navi.find(item =>
    item.name.includes(actualPath.toLowerCase())
  )?.id

  function toggler () {
    dispatch(toggleZoom())
  }

  return (
    <section className=' bg-orange-300 fixed flex flex-col items-center gap-5  pt-15  top-0 left-0 w-[6%] h-full '>
      <div>
        <Library className=' w-14 h-14 mb-5' color='white' />
      </div>
      {navi.map(item => (
        <div>
          {item.id > isActive ? (
            <div className='  text-sm rounded-full px-2.5 bg-white py-1  flex justify-center items-center'>
              {item.id}
            </div>
          ) : (
            <div>
              <CheckCircle color='green' />
            </div>
          )}
        </div>
      ))}

      <div
        onClick={() => {
          toggler()
        }}
        className=' bg-white rounded-xl p-3'
      >
        <ZoomIn />
      </div>
    </section>
  )
}

const navi = [
  { id: 1, name: 'personal' },
  { id: 2, name: 'experience' },
  { id: 3, name: 'job' },
  { id: 4, name: 'format' }
]

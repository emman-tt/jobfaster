import { useDispatch, useSelector } from 'react-redux'
import Canvas from './Canvas'
import Steps from './Steps'
import TemplateSelector from './TemplateSelector'
import { toggleModals } from '../../store/modalSlice'
import { saveTemplateId } from '../../store/dashboardSlice'
export function Main ({ activeSection }) {
  const { modals } = useSelector(state => state.modal)
  const dispatch = useDispatch()
  return (
    <section className='h-full w-full overflow-hidden flex'>
      <TemplateSelector
        onSelect={id => dispatch(saveTemplateId(id))}
        onClose={() => dispatch(toggleModals('showTemplates'))}
        isOpen={modals.showTemplates == true}
      />

      <Steps />
      <div className='flex-1 overflow-auto'>
        <Canvas />
      </div>
    </section>
  )
}

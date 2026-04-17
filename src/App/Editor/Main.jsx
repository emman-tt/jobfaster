import { useDispatch, useSelector } from 'react-redux'
import Canvas from './Canvas'
import Steps from './Steps'
import TemplateSelector from './TemplateSelector'
import { toggleModals } from '../../store/modalSlice'
import { saveTemplateId } from '../../store/editorSlice'
export function Main () {
  const { modals } = useSelector(state => state.modal)
  const { templateId } = useSelector(state => state.editor)

  const dispatch = useDispatch()
  return (
    <section className='h-full w-full overflow-hidden flex'>
      <TemplateSelector
        selectedTemplate={templateId}
        onSelect={item => dispatch(saveTemplateId(item))}
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

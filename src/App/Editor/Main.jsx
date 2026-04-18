import { useDispatch, useSelector } from 'react-redux'
import Canvas from './Canvas'
import Steps from './Steps'
import TemplateSelector from './TemplateSelector'
import { Modal as ExperienceModal } from './Experience/Modal'
import { Modal as EducationModal } from './Education/Modal'
import { Modal as ProjectsModal } from './Projects/Modal'
import { Modal as AchievementsModal } from './Achievements/Modal'
import { Modal as CertificationsModal } from './Certifications/Modal'
import { toggleModals } from '../../store/modalSlice'
import { saveTemplateId } from '../../store/editorSlice'
import { useState } from 'react'
export function Main () {
  const { modals } = useSelector(state => state.modal)
  const { templateId, modal } = useSelector(state => state.editor)
  const [editingId, setEditingId] = useState(null)
  const dispatch = useDispatch()

  return (
    <section className='h-full w-full overflow-hidden flex'>
      <TemplateSelector
        selectedTemplate={templateId}
        onSelect={item => dispatch(saveTemplateId(item))}
        onClose={() => dispatch(toggleModals('showTemplates'))}
        isOpen={modals.showTemplates == true}
      />
      <Steps editingId={editingId} setEditingId={setEditingId} />
      <div className='flex-1 overflow-auto'>
        <Canvas />
      </div>
      {modal === 'experience' && (
        <ExperienceModal editingId={editingId} />
      )}
      {modal === 'education' && (
        <EducationModal editingId={editingId} />
      )}
      {modal === 'projects' && (
        <ProjectsModal editingId={editingId} />
      )}
      {modal === 'achievements' && (
        <AchievementsModal editingId={editingId} />
      )}
      {modal === 'certifications' && (
        <CertificationsModal editingId={editingId} />
      )}
    </section>
  )
}
import { templates } from '../../../libs/templatesData'

const LAYOUT_TO_TEMPLATE = {
  1: 'classic',
  2: 'modern',
  3: 'executive',
  4: 'technical',
  5: 'academic',
  6: 'ats'
}

export default function FilePreview ({ data, layoutId, className }) {
  const templateId = LAYOUT_TO_TEMPLATE[layoutId] || 'classic'
  const template = templates.find(t => t.id === templateId)

  if (!template) {
    return null
  }

  return (
    <section className={` relative  w-full  overflow-hidden ${className}`}>
      <div
        className='absolute top-0 h-full bottom-0  origin-top-left  '
        style={{ transform: 'scale(0.35)' }}
      >
        <template.component data={data} className='shadow-none' />
      </div>
    </section>
  )
}

import { TEMPLATES } from '../CreateResume/templates/layout'
export default function FilePreview ({ data, layoutId, className }) {
  const Template = TEMPLATES[layoutId]
  return (
    <section className={` relative  w-full  overflow-hidden ${className}`}>
      <div
        className='absolute top-0 h-full bottom-0  origin-top-left  '
        style={{ transform: 'scale(0.35)' }}
      >
        <Template userData={data} className='shadow-none' />
      </div>
    </section>
  )
}

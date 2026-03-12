import { ResumeHtml } from '../../../assets/templates/ResumeHtml'

export const ResumePreview = ({
  scale = 0.1, // Very small for "file icon" size
  className,
  content
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-white shadow-sm border border-slate-200 rounded-sm ${className}`}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '800px',
          height: '1132px'
        }}
        className='pointer-events-none select-none'
      >
        <iframe
          srcDoc={content}
          title='Resume Preview'
          className='w-full h-full border-0'
          scrolling='no'
        />
      </div>
      <div className='absolute inset-0 z-10' />
    </div>
  )
}

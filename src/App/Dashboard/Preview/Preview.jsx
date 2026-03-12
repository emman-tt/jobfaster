import { ResumeHtml } from './ResumeHtml'
export const ResumePreviewStage = () => {
  return (
    <div className='relative w-full  aspect-[1/1.41] overflow-hidden rounded-lg    transition-all  h-full flex border-0  justify-center items-center'>
      <div
        style={{
          //   transform: `scale(0.5)`,
          transformOrigin: 'top left',

          height: '1132px'
        }}
        className=' flex  justify-center items-center w-full select-none'
      >
        <iframe
          srcDoc={ResumeHtml[4].content}
          title='Resume Preview'
          className='w-300 h-screen   border-0'
        />
      </div>
    </div>
    //     shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)]
  )
}

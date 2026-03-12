export const FullPreview = ({ scale = 1, className, content }) => {
  return (
    <section className=' h-full overflow-auto [scrollbar-width:thin] pt-15 p-8'>
      <div className={`w-full h-max  ${className}`}>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: '800px',
            height: '1352px',
            margin: '0 auto'
          }}
          className='bg-white shadow-xl mx-auto'
        >
          <iframe
            srcDoc={content}
            title='Resume Preview'
            className='w-full h-full border-0'
            scrolling='no'
          />
        </div>
      </div>
    </section>
  )
}

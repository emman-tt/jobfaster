import { ResumePreview } from '../Preview/Preview'

export const Paper = ({ className, extension }) => {
  return (
    <div className={`bg-[#f2f2f2] w-15  h-18 rounded-xl p-3 ${className} `}>
      <p className='text-xs font-extralight  line-clamp-4'>
        {extension === 'pdf' ? (
          <img
            width='23'
            height='23'
            src='https://img.icons8.com/color/48/pdf-2--v1.png'
            alt='pdf-2--v1'
          />
        ) : (
          <img
            width='23'
            height='23'
            src='https://img.icons8.com/color/48/microsoft-word-2019--v2.png'
            alt='microsoft-word-2019--v2'
          />
        )}
        la laaaaaaaa la la
      </p>
    </div>
  )
}

export const PaperFile = ({ className, item }) => {
  return (
    <section className=' flex flex-col w-35 cursor-pointer h-30   px-2 bg-[#cbc9c947] p-2 rounded-xl '>
      <div
        className={`bg-[#fefefec1] items-start relative shadow-xs h-full w-full flex      rounded-xl   ${className} `}
      >
        {item.extension == 'pdf' ? (
          <img
            width='23'
            height='23'
            src='https://img.icons8.com/color/48/pdf-2--v1.png'
            alt='pdf-2--v1'
          />
        ) : (
          <img
            width='23'
            height='23'
            src='https://img.icons8.com/color/48/microsoft-word-2019--v2.png'
            alt='microsoft-word-2019--v2'
          />
        )}

        <ResumePreview
          scale={0.2}
          content={item.content}
          className='w-full h-full'
        />
      </div>
      <div className='flex w-[90%]  mt-1 pl-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
        <p className=' truncate'>{item.name}.pdf</p>
        <p className=' whitespace-nowrap'>{item.size}mb</p>
      </div>
    </section>
  )
}

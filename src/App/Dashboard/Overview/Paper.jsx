export const Paper = ({ className }) => {
  return (
    <div className={`bg-[#f2f2f2] w-15  h-18 rounded-xl p-3 ${className} `}>
      <p className='text-xs font-extralight  line-clamp-4'>
        <img
          width='23'
          height='23'
          src='https://img.icons8.com/color/48/pdf-2--v1.png'
          alt='pdf-2--v1'
        />
        la laaaaaaaa la la
      </p>
    </div>
  )
}

export const PaperFile = ({ className }) => {
  return (
    <section className=' flex flex-col w-35 cursor-pointer   px-4 bg-[#cbc9c947] p-3 rounded-xl '>
      <div
        className={`bg-[#fefefec1] shadow-xs     rounded-xl px-3 p-1 ${className} `}
      >
        <p className='text-xs font-extralight float-start font-satoshi  line-clamp-3'>
          <img
            width='15'
            height='10'
            className=''
            src='https://img.icons8.com/color/48/pdf-2--v1.png'
            alt='pdf-2--v1'
          />
          la laaaaaaaa la la la laaaaaaaa la la la laaaaaaaa la la la laaaaaaaa
          la la la laaaaaaaa la la la laaaaaaaa la la la laaaaaaaa la la
        </p>
      </div>
      <div className='flex w-full text-xs mt-2 items-center text-[10px] text-gray-700 justify-center font-semibold gap-1'>
        <p className=' truncate'>Rull Ai.pdf</p>
        <p>6kb</p>
      </div>
    </section>
  )
}

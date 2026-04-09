import { Paper } from '../App/Dashboard/Overview/Paper'

export default function Folder ({ files }) {
  return (
    <section className='w-full  flex justify-center items-center'>
      <div className='relative flex flex-col'>
        <svg
          width='89'
          height='20'
          viewBox='0 -5 90 20'
          fill='none'
          className=''
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.96281 0C9.96281 0 27.1369 0 38.1413 0C44.2203 0 52.182 0 58.0913 0C62.3785 0 65.5758 1.91359 66.0987 3.97737C68.4101 13.1001 89 20 89 20H1.02815C1.02815 20 -4.47007 1.00166 9.96281 0Z'
            fill={`#feb053`}
          />
        </svg>

        <div
          className={`bg-[#feb053] group  cursor-pointer  relative rounded-tl-none rounded-xl h-22 w-28`}
        >
          {files?.map((item, i) => (
            <Paper
              key={item.name}
              extension={item.extension}
              className={`${item.styles} 
            ${filesArray[i]?.styles}
            paper absolute`}
            />
          ))}
          <div
            className={`bg-[#ff8c00b3] group-hover:bg-[#ff8c008a] transition-all duration-100 ease-in-out absolute left-0 backdrop-blur-xs right-0 bottom-0 h-15 z-40 rounded-xl `}
          ></div>
        </div>
      </div>
    </section>
  )
}

const filesArray = [
  {
    id: 1,
    styles: 'rotate-10 z-40 shadow-sm  -translate-y-8 top-0 right-1'
  },
  {
    id: 2,
    styles:
      '-rotate-5  z-30 shadow-xs translate-x-5 -translate-y-8 top-0 left-0'
  },
  {
    id: 3,
    styles: 'rotate-12  z-22 shadow-xs  translate-x-2 -translate-y-5'
  }
]

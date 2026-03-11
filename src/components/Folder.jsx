import { useRef } from 'react'
import { gsap } from '../libs/gsap'
import { useGSAP } from '@gsap/react'

const folderColour = '#feb053'
export default function Folder () {
  const box = useRef(null)
  useGSAP(() => {}, {
    scope: box
  })

  function onHoverPaper () {
    const papers = gsap.utils.toArray('.paper')
    papers.forEach(item => {
      gsap.to(item, {
        y: -40,
        // translateX: i === 1 ? -30 : 0,
        ease: 'bounce',
        duration: 0.6
      })
    })
  }
  function onLeavePaper () {
    const papers = gsap.utils.toArray('.paper')
    papers.forEach(item => {
      gsap.to(item, {
        y: 0,

        ease: 'bounce',
        duration: 0.1
      })
    })
  }
  return (
    <section
      ref={box}
      className='w-full h-screen flex justify-center items-center'
    >
      <div className='relative flex flex-col'>
        <svg
          width='89'
          height='20'
          viewBox='0 -5 90 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.96281 0C9.96281 0 27.1369 0 38.1413 0C44.2203 0 52.182 0 58.0913 0C62.3785 0 65.5758 1.91359 66.0987 3.97737C68.4101 13.1001 89 20 89 20H1.02815C1.02815 20 -4.47007 1.00166 9.96281 0Z'
            fill={`${folderColour}`}
          />
        </svg>

        <div
          onMouseOver={() => onHoverPaper()}
          onMouseLeave={() => onLeavePaper()}
          //   onMouseEnter={() => onHoverPaper()}
          className={`bg-[${folderColour}] cursor-pointer  relative rounded-tl-none rounded-xl h-35 w-40`}
        >
          {filesArray.map(item => (
            <Paper key={item.id} className={`${item.styles} paper absolute`} />
          ))}
          <div
            className={`bg-[#feb053] absolute left-0 backdrop-blur-xs right-0 bottom-0 h-25 z-40 rounded-xl `}
          ></div>
        </div>
      </div>
    </section>
  )
}

const filesArray = [
  {
    id: 1,
    styles: 'rotate-1 z-30  -translate-y-1 top-0 right-2'
  },
  { id: 2, styles: '-rotate-12  z-9 -translate-y-4 top-0 left-2' },
  {
    id: 3,
    styles: 'rotate-12  z-10  translate-x-2 top-0'
  }
]

export const Paper = ({ className }) => {
  return (
    <div className={`bg-[#f2f2f2] w-28  h-30 rounded-xl p-3 ${className} `}>
      <p className='text-xs font-extralight  line-clamp-4'>
        <img
          width='23'
          height='23'
          src='https://img.icons8.com/color/48/pdf-2--v1.png'
          alt='pdf-2--v1'
        />
        a lot of scribbling you know just to scribble scriblle as apdf doc foe
        scriblling coud be word or pdf or text md tho any of them
      </p>
    </div>
  )
}

import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { ChevronDown } from 'lucide-react'

export default function BulletStyles () {
  const [toggle, setToggles] = useState({
    font: {
      show: false,
      selected: 'Inter'
    },
    size: {
      show: false,
      selected: 14
    },
    type: {
      show: false,
      selected: 'disc'
    }
  })

  return (
    <section className='px-5 mt-15 flex flex-col'>
      <QuestionHeader question="Let's build the best styling and fonts of your Bullet text. ">
        Customize the font, size, and bullet type for your experience and
        project descriptions. The preview below shows how they will look.
        Leaving it untouched results to the default and standard styling of
        bullet points.
      </QuestionHeader>

      <section className='flex w-full px-3 mt-5 gap-3'>
        {/* Choose Font */}
        <div className=' relative w-full  '>
          <div
            onClick={() => {
              setToggles({
                ...toggle,
                font: {
                  ...toggle.font,
                  show: !toggle.font.show
                }
              })
            }}
            className='w-full  cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between'
          >
            Choose Font
            <button>
              <ChevronDown
                className={`h-5 transition-all cursor-pointer duration-150 ease  ${
                  toggle.font.show ? 'rotate-180' : 'rotate-0'
                } w-5`}
              />
            </button>
          </div>
          {toggle.font.show && (
            <ul className=' absolute z-10 bg-white  flex flex-col justify-between p-10 pr-2 gap-4 py-4 overflow-y-scroll h-40  w-full text-black rounded-xl shadow-lg [scrollbar-width:thin]'>
              {bulletFonts.map(item => (
                <li
                  onClick={() =>
                    setToggles({
                      ...toggle,
                      font: { ...toggle.font, selected: item.name },
                      show: false
                    })
                  }
                  className={`text-sm gap-4 ${item.type} flex items-center  cursor-pointer`}
                  key={item.name}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Choose Size */}
        <div className=' relative w-full  '>
          <div
            onClick={() => {
              setToggles({
                ...toggle,
                size: {
                  ...toggle.size,
                  show: !toggle.size.show
                }
              })
            }}
            className='w-full  cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between'
          >
            Choose Size
            <button>
              <ChevronDown
                className={`h-5 transition-all cursor-pointer duration-150 ease  ${
                  toggle.size.show ? 'rotate-180' : 'rotate-0'
                } w-5`}
              />
            </button>
          </div>
          {toggle.size.show && (
            <ul className=' absolute z-10 bg-white  flex flex-col justify-between p-10 pr-2 gap-4 py-4 overflow-y-scroll h-40  w-full text-black rounded-xl font-semibold shadow-lg [scrollbar-width:thin]'>
              {bulletSize.map(item => (
                <li
                  onClick={() =>
                    setToggles({
                      ...toggle,
                      size: { ...toggle.size, selected: item },
                      show: false
                    })
                  }
                  className={`text-sm gap-4   flex items-center  cursor-pointer`}
                  key={item}
                >
                  {item}px
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bullet Type */}
        <div className=' relative w-full  '>
          <div
            onClick={() => {
              setToggles({
                ...toggle,
                type: {
                  ...toggle.type,
                  show: !toggle.type.show
                }
              })
            }}
            className='w-full  cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between'
          >
            Bullet Type
            <button>
              <ChevronDown
                className={`h-5 transition-all cursor-pointer duration-150 ease  ${
                  toggle.type.show ? 'rotate-180' : 'rotate-0'
                } w-5`}
              />
            </button>
          </div>
          {toggle.type.show && (
            <ul className=' absolute z-10 bg-white   flex flex-col  p-10 pr-2 gap-4 py-4 overflow-y-scroll h-40  w-full text-black rounded-xl font-semibold shadow-lg [scrollbar-width:thin]'>
              {bulletTypes.map(item => (
                <li
                  onClick={() =>
                    setToggles({
                      ...toggle,
                      type: { ...toggle.type, selected: item }
                    })
                  }
                  className={`text-sm gap-4   flex items-center  cursor-pointer`}
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className='mt-10 font-semibold text-sm text-center w-full'>
        Preview here
      </p>

      <div className='rounded-2xl bg-[#f3f5f7] mt-5 p-8 w-full'>
        <ul
          style={{
            fontSize: `${toggle.size.selected}pt`,
            listStyleType: toggle.type.selected
          }}
          className={` flex flex-col gap-2   font-normal ${
            bulletFonts.find(item => item.name === toggle.font.selected).type
          }`}
        >
          <li>
            Developed and maintained
            <span className='font-semibold'> web applications</span> using
            <span className='font-semibold italic'> React</span> and Tailwind
            CSS.
          </li>
          <li>
            Collaborated with cross-functional teams at
            <span className='font-semibold italic'> Microsoft</span> to deliver
            high-quality products.
          </li>
          <li>
            Optimized application performance by
            <span className='font-semibold'> 60%</span> speed compared to the
            previous and improved user experience.
          </li>
        </ul>
      </div>
    </section>
  )
}

const bulletFonts = [
  { name: 'Inter', type: 'font-inter' },
  { name: 'Roboto', type: 'font-roboto' },
  { name: 'Lato', type: 'font-lato' },
  { name: 'Open Sans', type: 'font-open' }
  //   { name: 'Garamond', type: 'font-garamond' },
  //   { name: 'Georgia', type: 'font-georgia' }
]

const bulletTypes = ['disc', 'circle', 'square', 'none']

const bulletSize = [12, 13, 14, 15, 16]

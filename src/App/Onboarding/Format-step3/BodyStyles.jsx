import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { ChevronDown } from 'lucide-react'

export default function BodyStyles () {
  const [toggle, setToggles] = useState({
    font: {
      show: false,
      selected: 'Inter'
    },
    size: {
      show: false,
      selected: 10
    },
    align: {
      show: false,
      selected: 'left'
    }
  })

  return (
    <section className='px-5 mt-15 flex flex-col'>
      <QuestionHeader question="Let's build the best styling and fonts of your Body text. ">
        Customize the font, size, and alignment for your resume's main content
        like descriptions and summaries. The preview below is an example to
        guide you. Leaving it untouched results to the default and standard
        styling of body text.
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
              {bodyFonts.map(item => (
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
            <ul className=' absolute z-10 bg-white  flex flex-col  p-10 pr-2 gap-4 py-4 overflow-y-scroll h-40  w-full text-black rounded-xl font-semibold shadow-lg [scrollbar-width:thin]'>
              {bodySize.map(item => (
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

        {/* Alignment */}
        <div className=' relative w-full  '>
          <div
            onClick={() => {
              setToggles({
                ...toggle,
                align: {
                  ...toggle.align,
                  show: !toggle.align.show
                }
              })
            }}
            className='w-full  cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between'
          >
            Select Alignment
            <button>
              <ChevronDown
                className={`h-5 transition-all cursor-pointer duration-150 ease  ${
                  toggle.align.show ? 'rotate-180' : 'rotate-0'
                } w-5`}
              />
            </button>
          </div>
          {toggle.align.show && (
            <ul className=' absolute z-10 bg-white  flex flex-col  p-10 pr-2 gap-4 py-4 overflow-y-scroll h-40  w-full text-black rounded-xl font-semibold shadow-lg [scrollbar-width:thin]'>
              {bodyAlign.map(item => (
                <li
                  onClick={() =>
                    setToggles({
                      ...toggle,
                      align: { ...toggle.align, selected: item }
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
        <p
          style={{
            fontSize: `${toggle.size.selected}px`,
            textAlign: toggle.align.selected
          }}
          className={`font-medium
            ${bodyFonts.find(item => item.name === toggle.font.selected).type}`}
        >
          Senior Software Engineer with 5+ years of experience in building
          scalable web applications. Proficient in React, Node.js, and cloud
          technologies. Passionate about solving complex problems and delivering
          high-quality software solutions that drive business growth.
        </p>
      </div>
    </section>
  )
}

const bodyFonts = [
  { name: 'Inter', type: 'font-inter' },
  { name: 'Roboto', type: 'font-roboto' },
  { name: 'Lato', type: 'font-lato' },
  { name: 'Open Sans', type: 'font-open' },
  { name: 'Garamond', type: 'font-garamond' },
  { name: 'Georgia', type: 'font-georgia' }
]

const bodyAlign = ['left', 'right', 'center', 'justify']

const bodySize = [10, 11]

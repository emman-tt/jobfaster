import { useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { ChevronDown } from 'lucide-react'

export default function HeaderStyles () {
  const [toggle, setToggles] = useState({
    font: {
      show: false,
      selected: 'Inter'
    },
    size: {
      show: false,
      selected: 20
    },
    align: {
      show: false,
      selected: 'center'
    }
  })
  return (
    <section className='px-5 mt-15 flex flex-col'>
      <QuestionHeader question="Let's build the best styling and fonts of your Header text. ">
        Note that your header is your email, name , contact and the personal
        details at the very top. The preview Box below is an example to guide
        you. Leaving it untouched results to the default and standard styling of
        headers.
      </QuestionHeader>

      <section className='flex w-full px-3 mt-5 gap-3'>
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
              {headerFonts.map(item => (
                <li
                  onClick={() =>
                    setToggles({
                      ...toggle,
                      font: { ...toggle.font, selected: item.name }
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

        {/* Font size options  */}

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
              {headerSize.map(item => (
                <li
                  onClick={() =>
                    setToggles({
                      ...toggle,
                      size: { ...toggle.size, selected: item }
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

        {/* Font alignment */}
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
              {headerAlign.map(item => (
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
      <p className='mt-5 font-semibold text-sm text-center w-full'>
        Preview here
      </p>
      <p
        style={{
          fontSize: `${headerSize.find(
            item => item === toggle.size.selected
          )}pt`,
          justifyContent: `${headerAlign.find(
            item => item === toggle.align.selected
          )}`,
          textAlign: `${headerAlign.find(
            item => item === toggle.align.selected
          )}`
        }}
        className={`py-6 ${
          headerFonts.find(item => item.name === toggle.font.selected).type
        }  h-22 rounded-2xl items-center bg-[#f3f5f7] flex mt-5 font-bold  px-2 w-full`}
      >
        Emmanuel Acquah | astroverse@gmail.com | Ghana,Accra
      </p>
    </section>
  )
}

const headerFonts = [
  { name: 'Inter', type: 'font-inter' },
  { name: 'Roboto', type: 'font-roboto' },
  { name: 'Lato', type: 'font-lato' },
  { name: 'Open Sans', type: 'font-open' },
  { name: 'Garamond', type: 'font-garamond' },
  { name: 'Georgia', type: 'font-georgia' }
]
const headerAlign = ['left', 'right', 'center']

const headerSize = [18, 19, 20, 21, 22, 23, 24]

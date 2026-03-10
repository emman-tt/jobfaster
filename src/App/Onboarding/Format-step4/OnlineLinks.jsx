import { useEffect, useState } from 'react'
import { QuestionHeader } from '../../../components/QuestionHeader'
import { onlineProfiles } from '../../../utils/links'
import { ChevronDown, Trash2 } from 'lucide-react'
import useClickOutside from '../../../hooks/useClick'
import { useDispatch } from 'react-redux'
import { saveOnlineLinks } from '../../../store/formatSlice'
export default function OnlineLinks () {
  const [links, setLinks] = useState(onlineProfiles)
  const [linksBox, showLinksBox] = useState(false)
  const [savedLinks, setSavedLinks] = useState([
    {
      name: 'LinkedIn',
      link: ''
    }
  ])
  const dispatch = useDispatch()
  const popupRef = useClickOutside(() => showLinksBox(false))
  function addNewLink (id) {
    const itemToAdd = links.find(item => item.id === id)

    if (!itemToAdd) return

    setLinks(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: true } : item))
    )

    setSavedLinks(prevSaved => {
      const alreadyExists = prevSaved.find(link => link.name === itemToAdd.name)

      if (alreadyExists) return prevSaved

      return [...prevSaved, { name: itemToAdd.name, link: '' }]
    })
  }
  useEffect(() => {
    console.log(savedLinks)
  }, [savedLinks])

  function handleChange (e) {
    const { name, value } = e.target

    const alreadyExists = savedLinks.find(item => item.name === name)
    setSavedLinks(prev => {
      if (alreadyExists) {
        console.log('this exists', alreadyExists.name)
        return prev.map(item =>
          item === alreadyExists ? { ...item, link: value } : item
        )
      }
      return [...prev, alreadyExists]
    })
  }

  function removeLink (id) {
    setLinks(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: false } : item))
    )
    const found = links.find(item => item.id === id)
    setSavedLinks(prev => prev.filter(item => item.name !== found.name))
  }

  useEffect(() => {
    dispatch(saveOnlineLinks(savedLinks))
  }, [savedLinks, dispatch])
  return (
    <section ref={popupRef} className='mt-15 '>
      <QuestionHeader question=' Do you want to include links to your portfolio, GitHub, or online profiles?'>
        Hyperlinked portfolios give immediate access to work samples,ensure
        links are working and not very long
      </QuestionHeader>

      {/* Selected links */}
      <section className='mt-5 flex flex-col gap-4 px-10'>
        {links.map(
          item =>
            item.selected === true && (
              <div key={item.id} className='flex gap-2  w-full'>
                <div className='text-sm p-10 pr-2 gap-4 py-4 flex items-center  cursor-pointer min-w-[30%] shadow  rounded-xl'>
                  <svg
                    role='img'
                    viewBox='0 0 24 24'
                    color='blue'
                    fill={item.fill}
                    height={16}
                    width={16}
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d={item.path} />
                  </svg>
                  <p>{item.name}</p>
                </div>
                <input
                  type='text'
                  onChange={handleChange}
                  name={item.name}
                  className=' py-4 pl-7 w-full pr-4 rounded-2xl shadow'
                  placeholder='Type or paste the link here'
                />
                <button
                  onClick={() => {
                    removeLink(item.id)
                  }}
                  className='p-2 cursor-pointer  px-4 h-max py-4 self-center bg-red-200 flex justify-center rounded-full items-center'
                >
                  <Trash2 className='w-3 text-red-500 h-3' />
                </button>
              </div>
            )
        )}
      </section>
      <div className='px-10 w-full flex items-center gap-5  mt-4'>
        <div className='min-w-[30%] relative  '>
          <div
            onClick={() => {
              showLinksBox(e => !e)
            }}
            className='w-full cursor-pointer rounded-2xl shadow py-4 px-6 text-sm font-semibold flex justify-between'
          >
            Select Link
            <button>
              <ChevronDown
                className={`h-5 transition-all cursor-pointer duration-150 ease  ${
                  linksBox ? 'rotate-180' : 'rotate-0'
                } w-5`}
              />
            </button>
          </div>

          {/* Floating Links Box */}
          {linksBox && (
            <ul className=' absolute z-10 bg-white  flex flex-col justify-between p-10 pr-2 gap-4 py-4 overflow-y-scroll h-40      w-full text-black rounded-xl shadow-lg [scrollbar-width:thin]'>
              {links.map(
                item =>
                  item.selected === false && (
                    <li
                      onClick={() => {
                        addNewLink(item.id)
                      }}
                      className='text-sm gap-4 flex items-center  cursor-pointer'
                      key={item.id}
                    >
                      <svg
                        role='img'
                        viewBox='0 0 24 24'
                        color='blue'
                        fill={item.fill}
                        height={16}
                        width={16}
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d={item.path} />
                      </svg>
                      {item.name}
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
        <input
          type='text'
          className=' py-4 pl-7 w-full pr-4 rounded-2xl shadow'
          placeholder='Type or paste the link here'
        />
      </div>
    </section>
  )
}

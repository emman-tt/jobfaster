import { useEffect, useState } from 'react'
import { onlineProfiles } from '../../../utils/links'
import { ChevronDown } from 'lucide-react'
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
      return [...prevSaved, { name: itemToAdd.name, link: '', id: itemToAdd.id, fill: itemToAdd.fill, path: itemToAdd.path }]
    })
  }

  function handleChange (e, index) {
    const { value } = e.target
    setSavedLinks(prev => {
      const updated = [...prev]
      updated[index].link = value
      return updated
    })
  }

  function removeLink (id) {
    setLinks(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: false } : item))
    )
    setSavedLinks(prev => prev.filter(item => item.id !== id))
  }

  useEffect(() => {
    dispatch(saveOnlineLinks(savedLinks))
  }, [savedLinks, dispatch])

  return (
    <section ref={popupRef} className='w-full'>
      {/* Selected Links */}
      <div className='space-y-3'>
        {savedLinks.map((link, index) => (
          <div
            key={link.id || index}
            className='flex flex-col sm:flex-row gap-3 sm:items-center w-full'
          >
            <div className='w-full sm:w-40 shrink-0 bg-white border border-gray-200 rounded-xl py-2.5 px-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                {link.path && (
                  <svg
                    role='img'
                    viewBox='0 0 24 24'
                    fill={link.fill}
                    height={16}
                    width={16}
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d={link.path} />
                  </svg>
                )}
                <span className='text-xs font-medium text-gray-900'>
                  {link.name}
                </span>
              </div>
              <button
                onClick={() => removeLink(link.id)}
                className='text-red-500 hover:text-red-700 text-sm shrink-0 w-5 h-5 flex items-center justify-center hover:bg-red-50 rounded transition-colors'
                title='Remove link'
              >
                🗑️
              </button>
            </div>
            <input
              type='text'
              value={link.link}
              onChange={e => handleChange(e, index)}
              placeholder='linkedin.com/in/jthorne'
              className='flex-1 border border-gray-200 pl-4 pr-3 outline-[#ec5b13] py-2.5 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md text-gray-900 shadow-sm transition-shadow'
            />
          </div>
        ))}
      </div>

      {/* Add Link Section */}
      <div className='mt-6 flex flex-col sm:flex-row gap-3 w-full'>
        <div className='w-full sm:w-40 relative shrink-0'>
          <button
            onClick={() => showLinksBox(e => !e)}
            className='w-full border border-gray-200 pl-4 pr-3 py-2.5 rounded-xl text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13] text-gray-900 font-medium flex items-center justify-between hover:shadow-md transition-all shadow-sm bg-white'
          >
            <span>Select Link</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${
                linksBox ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {linksBox && (
            <div className='absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'>
              <ul className='max-h-48 overflow-y-auto'>
                {links.map(
                  item =>
                    item.selected === false && (
                      <li
                        key={item.id}
                        onClick={() => {
                          addNewLink(item.id)
                          showLinksBox(false)
                        }}
                        className='flex items-center gap-2 px-4 py-3 text-xs text-gray-900 hover:bg-[#ec5b13]/5 cursor-pointer transition-colors'
                      >
                        {item.path && (
                          <svg
                            role='img'
                            viewBox='0 0 24 24'
                            fill={item.fill}
                            height={14}
                            width={14}
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d={item.path} />
                          </svg>
                        )}
                        <span>{item.name}</span>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
        </div>

        <input
          type='text'
          placeholder='Type or paste the link here'
          className='flex-1 border border-gray-200 pl-4 pr-3 outline-[#ec5b13] py-2.5 rounded-xl text-xs focus:border-[#ec5b13] focus:shadow-md text-gray-900 shadow-sm transition-shadow bg-white'
        />
      </div>
    </section>
  )
}

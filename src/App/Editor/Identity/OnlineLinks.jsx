import { useEffect, useState } from 'react'
import { onlineProfiles } from '../../../utils/links'
import { ChevronDown, Trash, Trash2 } from 'lucide-react'
import useClickOutside from '../../../hooks/useClick'
import { useDispatch, useSelector } from 'react-redux'
import { saveOnlineLinks } from '../../../store/personalSlice'
import { setUnsavedChanges } from '../../../store/editorSlice'

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
  const { appearance } = useSelector(state => state.preferences)
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
      return [
        ...prevSaved,
        {
          name: itemToAdd.name,
          link: '',
          id: itemToAdd.id,
          fill: itemToAdd.fill,
          path: itemToAdd.path
        }
      ]
    })
    dispatch(setUnsavedChanges(true))
  }

  function handleChange (e, name) {
    const { value } = e.target
    setSavedLinks(prev => {
      return prev.map(item =>
        item.name === name ? { ...item, link: value } : item
      )
    })
    dispatch(setUnsavedChanges(true))
  }

  function removeLink (id) {
    setLinks(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: false } : item))
    )
    setSavedLinks(prev => prev.filter(item => item.id !== id))
    dispatch(setUnsavedChanges(true))
  }

  useEffect(() => {
    dispatch(saveOnlineLinks(savedLinks))
  }, [savedLinks, dispatch])

  return (
    <section ref={popupRef} className='w-full'>
      {/* Selected Links */}
      <div className='space-y-3'>
           {savedLinks.map((link) => (
           <div
             key={link.name}
             className='flex flex-col sm:flex-row gap-3 sm:items-center w-full'
           >
            <div
              className={`w-full sm:w-40 shrink-0 border rounded-xl py-2.5 px-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between ${
                appearance.theme == 'dark'
                  ? 'bg-[#202020] border-0'
                  : 'bg-white border-gray-200'
              }`}
            >
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
                <span
                  className={`text-xs font-medium ${
                    appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {link.name}
                </span>
              </div>
              <button
                onClick={() => removeLink(link.id)}
                className='text-red-500 hover:text-red-700 text-sm shrink-0 w-5 h-5 flex items-center cursor-pointer justify-center hover:bg-red-50 rounded transition-colors'
                title='Remove link'
              >
                <Trash2 className=' w-4 h-4' />
              </button>
            </div>
            <input
              type='text'
              value={link.link}
              onChange={e => handleChange(e, link.name)}
              placeholder='linkedin.com/in/jthorne'
              className={`flex-1 border pl-4 pr-3 outline-none py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-[#f17e27] focus:border-[#f17e27] shadow-sm transition-shadow ${
                appearance.theme == 'dark'
                  ? 'border-0 bg-[#202020] text-white placeholder:text-slate-500'
                  : 'border-gray-200 text-gray-900'
              }`}
            />
          </div>
        ))}
      </div>

      <div className='mt-6 flex flex-col sm:flex-row gap-3 w-full'>
        <div className='w-full sm:w-40 relative shrink-0'>
          <button
            onClick={() => showLinksBox(e => !e)}
            className={`w-full border pl-4 pr-3 py-2.5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#f17e27] focus:border-[#f17e27] font-medium flex items-center justify-between hover:shadow-md transition-all shadow-sm ${
              appearance.theme == 'dark'
                ? 'border-0 bg-[#202020] text-white'
                : 'border-gray-200 bg-white text-gray-900'
            }`}
          >
            <span>Select Link</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${
                linksBox ? 'rotate-180' : ''
              }`}
            />
          </button>

          {linksBox && (
            <div
              className={`absolute z-20 top-full left-0 right-0 mt-2 border rounded-xl shadow-lg overflow-hidden ${
                appearance.theme == 'dark'
                  ? 'bg-[#202020] border-0'
                  : 'bg-white border-gray-200'
              }`}
            >
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
                        className={`flex items-center gap-2 px-4 py-3 text-xs hover:bg-[#ec5b13]/5 cursor-pointer transition-colors ${
                          appearance.theme == 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
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
          className={`flex-1 border pl-4 pr-3 outline-none py-2.5 rounded-xl text-xs focus:ring-2 focus:ring-[#f17e27] focus:border-[#f17e27] shadow-sm transition-shadow ${
            appearance.theme == 'dark'
              ? 'border-0 bg-[#202020] text-white placeholder:text-slate-500'
              : 'border-gray-200 bg-white text-gray-900'
          }`}
        />
      </div>
    </section>
  )
}

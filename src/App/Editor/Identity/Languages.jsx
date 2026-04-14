import { useEffect, useState } from 'react'
import { ChevronDown, Trash2, Plus } from 'lucide-react'
import useClickOutside from '../../../hooks/useClick'
import { useDispatch } from 'react-redux'
import { saveLanguages } from '../../../store/formatSlice'

const availableLanguages = [
  { id: 1, name: 'English', selected: false },
  { id: 2, name: 'French', selected: false },
  { id: 3, name: 'Spanish', selected: false },
  { id: 4, name: 'German', selected: false },
  { id: 5, name: 'Portuguese', selected: false },
  { id: 6, name: 'Italian', selected: false },
  { id: 7, name: 'Chinese', selected: false },
  { id: 8, name: 'Japanese', selected: false },
  { id: 9, name: 'Korean', selected: false },
  { id: 10, name: 'Arabic', selected: false },
  { id: 11, name: 'Hindi', selected: false },
  { id: 12, name: 'Russian', selected: false },
  { id: 13, name: 'Dutch', selected: false },
  { id: 14, name: 'Swedish', selected: false },
  { id: 15, name: 'Polish', selected: false },
  { id: 16, name: 'Turkish', selected: false },
  { id: 17, name: 'Greek', selected: false },
  { id: 18, name: 'Hebrew', selected: false },
  { id: 19, name: 'Vietnamese', selected: false },
  { id: 20, name: 'Thai', selected: false }
]

const proficiencyLevels = [
  'Native',
  'Fluent',
  'Professional',
  'Conversational',
  'Basic'
]

export default function Languages () {
  const [languages, setLanguages] = useState(availableLanguages)
  const [languageBox, showLanguageBox] = useState(false)
  const [savedLanguages, setSavedLanguages] = useState([])
  const dispatch = useDispatch()
  const popupRef = useClickOutside(() => showLanguageBox(false))

  function addNewLanguage (id) {
    const itemToAdd = languages.find(item => item.id === id)
    if (!itemToAdd) return

    setLanguages(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: true } : item))
    )

    setSavedLanguages(prevSaved => {
      const alreadyExists = prevSaved.find(lang => lang.name === itemToAdd.name)
      if (alreadyExists) return prevSaved
      return [
        ...prevSaved,
        {
          id: itemToAdd.id,
          name: itemToAdd.name,
          proficiency: 'Professional'
        }
      ]
    })
  }

  function removeLanguage (id) {
    setLanguages(prev =>
      prev.map(item => (item.id === id ? { ...item, selected: false } : item))
    )
    setSavedLanguages(prev => prev.filter(item => item.id !== id))
  }

  function updateProficiency (index, proficiency) {
    setSavedLanguages(prev => {
      const updated = [...prev]
      updated[index].proficiency = proficiency
      return updated
    })
  }

  useEffect(() => {
    dispatch(saveLanguages(savedLanguages))
  }, [savedLanguages, dispatch])

  return (
    <section ref={popupRef} className='w-full'>
      <div className='space-y-3'>
        {savedLanguages.map((lang, index) => (
          <LanguageItem
            key={lang.id || index}
            lang={lang}
            index={index}
            proficiencyLevels={proficiencyLevels}
            onRemove={() => removeLanguage(lang.id)}
            onProficiencyChange={updateProficiency}
          />
        ))}
      </div>

      <div className='mt-4 w-full sm:w-48 relative'>
        <button
          onClick={() => showLanguageBox(e => !e)}
          className='w-full border border-gray-200 pl-4 pr-3 py-2.5 rounded-xl text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13] text-gray-900 font-medium flex items-center justify-between hover:shadow-md transition-all shadow-sm bg-white'
        >
          <span className='flex items-center gap-2'>
            <Plus className='w-4 h-4' />
            Add Language
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-150 ${
              languageBox ? 'rotate-180' : ''
            }`}
          />
        </button>

        {languageBox && (
          <div className='absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'>
            <ul className='max-h-48 overflow-y-auto'>
              {languages.map(
                item =>
                  item.selected === false && (
                    <li
                      key={item.id}
                      onClick={() => {
                        addNewLanguage(item.id)
                        showLanguageBox(false)
                      }}
                      className='px-4 py-3 text-xs text-gray-900 hover:bg-[#ec5b13]/5 cursor-pointer transition-colors'
                    >
                      {item.name}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

function LanguageItem ({
  lang,
  index,
  proficiencyLevels,
  onRemove,
  onProficiencyChange
}) {
  const [proficiencyBox, showProficiencyBox] = useState(false)
  const profRef = useClickOutside(() => showProficiencyBox(false))

  return (
    <div className='flex items-center gap-3 w-full'>
      <div className='w-full sm:w-40 shrink-0 bg-white border border-gray-200 rounded-xl py-2.5 px-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between'>
        <span className='text-xs font-medium text-gray-900'>{lang.name}</span>
        <button
          onClick={onRemove}
          className='text-red-500 hover:text-red-700 text-sm shrink-0 w-5 h-5 flex items-center cursor-pointer justify-center hover:bg-red-50 rounded transition-colors'
          title='Remove language'
        >
          <Trash2 className='w-4 h-4' />
        </button>
      </div>

      <div ref={profRef} className='flex-1 relative'>
        <button
          onClick={() => showProficiencyBox(e => !e)}
          className='w-full border border-gray-200 pl-4 pr-3 py-2.5 rounded-xl text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13] text-gray-900 font-medium flex items-center justify-between hover:shadow-md transition-all shadow-sm bg-white'
        >
          <span>{lang.proficiency}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-150 ${
              proficiencyBox ? 'rotate-180' : ''
            }`}
          />
        </button>

        {proficiencyBox && (
          <div className='absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'>
            <ul className='max-h-48 overflow-y-auto'>
              {proficiencyLevels.map(level => (
                <li
                  key={level}
                  onClick={() => {
                    onProficiencyChange(index, level)
                    showProficiencyBox(false)
                  }}
                  className='px-4 py-3 text-xs text-gray-900 hover:bg-[#ec5b13]/5 cursor-pointer transition-colors'
                >
                  {level}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

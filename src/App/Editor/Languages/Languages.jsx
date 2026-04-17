import { useState } from 'react'
import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addLanguage, removeLanguage, updateLanguageProficiency } from '../../../store/educationSlice'

const proficiencyLevels = ['Native', 'Fluent', 'Professional', 'Conversational', 'Basic']

export default function Languages () {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const languages = useSelector(state => state.education.languages)
  const [editingLanguageId, setEditingLanguageId] = useState(null)
  const [editingLanguageValue, setEditingLanguageValue] = useState('')

  const handleAddLanguage = () => {
    dispatch(addLanguage())
  }

  const handleDeleteLanguage = id => {
    dispatch(removeLanguage(id))
  }

  const handleLanguageChange = (id, value) => {
    const lang = languages.find(l => l.id === id)
    if (lang) {
      dispatch(updateLanguageProficiency({ id, proficiency: lang.proficiency }))
    }
  }

  const startEditing = (id, currentValue) => {
    setEditingLanguageId(id)
    setEditingLanguageValue(currentValue)
  }

  const finishEditing = () => {
    setEditingLanguageId(null)
    setEditingLanguageValue('')
  }

  const handleLanguageInputChange = (id, value) => {
    setEditingLanguageValue(value)
  }

  const handleLanguageInputBlur = (id) => {
    const lang = languages.find(l => l.id === id)
    if (lang) {
      dispatch(updateLanguageProficiency({ id, language: editingLanguageValue, proficiency: lang.proficiency }))
    }
    finishEditing()
  }

  const handleLanguageInputKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleLanguageInputBlur(id)
    } else if (e.key === 'Escape') {
      finishEditing()
    }
  }

  const handleProficiencyChange = (id, proficiency) => {
    const lang = languages.find(l => l.id === id)
    if (lang) {
      dispatch(updateLanguageProficiency({ id, language: lang.language, proficiency }))
    }
  }

  return (
    <section className='w-full'>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer border-b border-gray-200 transition-colors'
      >
        <h2 className='text-lg font-bold text-gray-900 flex items-center'>
          <span className='inline-block w-1 h-6 bg-[#f56010] mr-3'></span>
          Languages
        </h2>
        <button className='p-1 hover:bg-gray-200 rounded-lg transition-colors'>
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              isOpen ? 'rotate-0' : '-rotate-180'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      {isOpen && (
        <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3'>
          {languages.map(lang => (
            <LanguageRow
              key={lang.id}
              lang={lang}
              isEditing={editingLanguageId === lang.id}
              editingValue={editingLanguageValue}
              onStartEditing={() => startEditing(lang.id, lang.language)}
              onInputChange={(value) => handleLanguageInputChange(lang.id, value)}
              onFinishEditing={() => handleLanguageInputBlur(lang.id)}
              onKeyDown={(e) => handleLanguageInputKeyDown(e, lang.id)}
              onProficiencyChange={(proficiency) => handleProficiencyChange(lang.id, proficiency)}
              onDelete={() => handleDeleteLanguage(lang.id)}
            />
          ))}

          {/* Add New Language Button */}
          <button
            onClick={handleAddLanguage}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm'
          >
            <Plus size={18} />
            Add a new language
          </button>
        </div>
      )}
    </section>
  )
}

function LanguageRow ({ lang, isEditing, editingValue, onStartEditing, onInputChange, onFinishEditing, onKeyDown, onProficiencyChange, onDelete }) {
  const [proficiencyBox, setProficiencyBox] = useState(false)

  return (
    <div className='flex items-center gap-3 w-full'>
      <div className='flex-1'>
        {isEditing ? (
          <input
            type='text'
            autoFocus
            value={editingValue}
            onChange={(e) => onInputChange(e.target.value)}
            onBlur={onFinishEditing}
            onKeyDown={onKeyDown}
            className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] text-gray-900 bg-white shadow-sm'
          />
        ) : (
          <input
            type='text'
            value={lang.language}
            onClick={onStartEditing}
            readOnly
            placeholder='Language'
            className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] placeholder:text-gray-300 transition-all text-gray-900 bg-white shadow-sm hover:shadow-md transition-shadow cursor-text'
          />
        )}
      </div>

      <div className='relative w-40 shrink-0'>
        <button
          onClick={() => setProficiencyBox(!proficiencyBox)}
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
                    onProficiencyChange(level)
                    setProficiencyBox(false)
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

      <button
        onClick={onDelete}
        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0'
        title='Delete'
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

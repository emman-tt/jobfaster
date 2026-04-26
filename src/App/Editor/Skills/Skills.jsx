import { useState } from 'react'
import { ChevronDown, Plus, GripVertical, Trash2, Edit2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addSkill, removeSkill, updateSkill, reArrange } from '../../../store/credentialsSlice'
import { DragDropProvider } from '@dnd-kit/react'
import { Sortable } from '../../../components/dragger'

export default function Skills () {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const skills = useSelector(state => state.credentials.skills)
  const { appearance } = useSelector(state => state.preferences)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ category: '', list: [] })
  const [listInput, setListInput] = useState('')

  const handleDeleteSkill = id => {
    dispatch(removeSkill(id))
  }

  const handleAddField = () => {
    dispatch(addSkill())
  }

  const handleEditSkill = id => {
    const skill = skills.find(s => s.id === id)
    if (skill) {
      setFormData({ category: skill.category, list: skill.list || [] })
      setEditingId(id)
    }
  }

  const handleUpdateSkill = () => {
    if (formData.category.trim()) {
      dispatch(updateSkill({ id: editingId, data: formData }))
      setFormData({ category: '', list: [] })
      setEditingId(null)
    }
  }

  const handleSave = () => {
    handleUpdateSkill()
  }

  const handleInput = e => {
    const { name, value } = e.target
    if (name === 'category') {
      setFormData(prev => ({ ...prev, category: value }))
    }
  }

  const handleAddListItem = () => {
    if (listInput.trim()) {
      setFormData(prev => ({
        ...prev,
        list: [...prev.list, listInput.trim()]
      }))
      setListInput('')
    }
  }

  const handleRemoveListItem = (index) => {
    setFormData(prev => ({
      ...prev,
      list: prev.list.filter((_, i) => i !== index)
    }))
  }

  const handleListKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddListItem()
    }
  }

  const handleDragEnd = event => {
    const { source } = event.operation
    const { initialIndex, index } = source
    if (initialIndex !== index) {
      const newItems = [...skills]
      const [removed] = newItems.splice(initialIndex, 1)
      newItems.splice(index, 0, removed)
      dispatch(reArrange({ category: 'skills', value: newItems }))
    }
  }

  const formatList = (list) => {
    return list?.join(' - ') || ''
  }

  return (
    <section className='w-full'>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer border-b transition-colors ${
            appearance.theme == 'dark' ? 'border-white/50' : 'border-gray-200'
          }`}
        >
          <h2 className={`text-lg font-bold flex items-center ${
            appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className='inline-block w-1 h-6 bg-[#f56010] mr-3'></span>
            Skills
          </h2>
          <button className={`p-1 rounded-lg transition-colors ${
            appearance.theme == 'dark'
              ? 'hover:bg-slate-700'
              : 'hover:bg-gray-200'
          }`}>
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                isOpen ? 'rotate-0' : '-rotate-180'
              } ${appearance.theme == 'dark' ? 'text-white' : ''}`}
            />
          </button>
        </div>

      {isOpen && (
        <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3'>
          {skills.map((skill, index) => (
            <Sortable
              index={index}
              id={skill.id}
              key={skill.id}
              className={`rounded-xl overflow-hidden hover:shadow-sm transition-shadow ${
                appearance.theme == 'dark'
                  ? 'border-0 bg-[#2a2a2a]'
                  : 'border border-gray-200 bg-white'
              }`}
            >
              <div className='w-full flex items-start justify-between p-4 transition-colors gap-4'>
                <div className='flex items-center gap-3 flex-1'>
                  <GripVertical size={16} className={`shrink-0 mt-2 ${
                    appearance.theme == 'dark'
                      ? 'text-slate-400'
                      : 'text-black'
                  }`} />
                  <div className='flex flex-col w-full gap-2'>
                    <input
                      type='text'
                      name='category'
                      onChange={handleInput}
                      placeholder='Skill Category'
                      disabled={editingId !== skill.id}
                      value={
                        editingId === skill.id
                          ? formData.category
                          : skill.category
                      }
                      className={`placeholder:text-sm rounded-xl py-2 text-sm font-IBM border px-4 ${
                        appearance.theme == 'dark'
                          ? 'border-0 bg-[#202020] text-white'
                          : 'border-gray-200 bg-transparent'
                      } ${
                        editingId === skill.id
                          ? appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
                          : appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-400'
                      }`}
                    />
                    
                    {editingId === skill.id ? (
                      <div className='space-y-2'>
                        {formData.list.map((item, index) => (
                          <div key={index} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                            appearance.theme == 'dark'
                              ? 'bg-[#202020]'
                              : 'bg-gray-50'
                          }`}>
                            <span className={`text-sm flex-1 ${
                              appearance.theme == 'dark'
                                ? 'text-slate-300'
                                : 'text-gray-700'
                            }`}>{item}</span>
                            <button
                              onClick={() => handleRemoveListItem(index)}
                              className={appearance.theme == 'dark'
                                ? 'text-slate-400 hover:text-red-500'
                                : 'text-gray-400 hover:text-red-500'}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <div className='flex gap-2'>
                          <input
                            type='text'
                            value={listInput}
                            onChange={(e) => setListInput(e.target.value)}
                            onKeyDown={handleListKeyDown}
                            placeholder='Add skill...'
                            className={`flex-1 rounded-xl px-4 py-2 text-sm ${
                              appearance.theme == 'dark'
                                ? 'border-0 bg-[#202020] text-white placeholder:text-slate-500'
                                : 'border border-gray-100 bg-white'
                            }`}
                          />
                          <button
                            onClick={handleAddListItem}
                            className='p-2 bg-[#ec5b13] text-white rounded-xl hover:bg-[#f8571d]'
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className={`text-sm ${
                        appearance.theme == 'dark'
                          ? 'text-slate-400'
                          : 'text-gray-500'
                      }`}>
                        {formatList(skill.list)}
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex flex-col items-center gap-1 shrink-0'>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      editingId === skill.id
                        ? handleSave()
                        : handleEditSkill(skill.id)
                    }}
                    className={`p-1.5 px-3.5 border cursor-pointer rounded-lg transition-colors text-sm ${
                      appearance.theme == 'dark'
                        ? 'border-0 text-white hover:bg-orange-400 hover:text-white'
                        : 'border-gray-200 text-black hover:bg-orange-400 hover:text-white'
                    }`}
                    title='Edit'
                  >
                    {editingId === skill.id ? 'Save' : 'Edit'}
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleDeleteSkill(skill.id)
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      appearance.theme == 'dark'
                        ? 'text-slate-400 hover:bg-red-900/30'
                        : 'text-red-500 hover:bg-red-50'
                    }`}
                    title='Delete'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Sortable>
          ))}

          <button
            onClick={() => handleAddField()}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed rounded-xl cursor-pointer transition-colors text-sm ${
              appearance.theme == 'dark'
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <Plus size={18} />
            Add a new skill
          </button>
        </div>
      )}
      </DragDropProvider>
    </section>
  )
}

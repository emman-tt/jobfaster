import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProject } from '../../../store/workSlice'
import { setModal, setUnsavedChanges } from '../../../store/editorSlice'
import { X, Plus } from 'lucide-react'

export function Modal ({ editingId }) {
  const [techInput, setTechInput] = useState('')
  const dispatch = useDispatch()
  const { projects } = useSelector(state => state.work)
  const { appearance } = useSelector(state => state.preferences)
  const proj = projects.find(item => item.id == editingId) || null
  const derivedData = proj ?? {
    name: '',
    description: '',
    techStack: [],
    link: '',
    github: ''
  }
  const [formData, setFormData] = useState(derivedData)

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, { id: Date.now(), name: techInput }]
      }))
      setTechInput('')
      dispatch(setUnsavedChanges(true))
    }
  }

  const handleRemoveTech = id => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech.id !== id)
    }))
    dispatch(setUnsavedChanges(true))
  }

  const handleSaveProject = () => {
    if (formData.name.trim()) {
      if (editingId) {
        dispatch(updateProject({ id: editingId, data: formData }))
      } else {
        const ramdom = crypto.randomUUID().split('-')[0]
        dispatch(updateProject({ id: ramdom, data: formData }))
      }
      dispatch(setUnsavedChanges(true))
      closeModal()
    }
  }

  const closeModal = () => {
    dispatch(setModal(null))
    setTechInput('')
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200'>
      <div
        className={`rounded-4xl shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200 ${
          appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
        }`}
      >
        <div className={`flex items-center justify-between px-8 py-6 border-b ${
          appearance.theme == 'dark'
            ? 'border-white/30'
            : 'border-gray-200'
        }`}>
          <h3
            className={`text-2xl font-bold ${
              appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {editingId ? 'Edit Project' : 'Add Project'}
          </h3>
          <button
            onClick={closeModal}
            className={`p-2 rounded-full transition-colors ${
              appearance.theme == 'dark'
                ? 'hover:bg-slate-700 text-white'
                : 'hover:bg-gray-100 text-black'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className='px-8 pb-8 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar'>
          <div>
            <label
              className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
                appearance.theme == 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              PROJECT NAME
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder='E-Commerce Platform'
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                appearance.theme == 'dark'
                  ? 'border-0 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                  : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
              }`}
            />
          </div>

          <div>
            <label
              className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
                appearance.theme == 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              DESCRIPTION
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder='Describe your project...'
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all resize-none h-24 ${
                appearance.theme == 'dark'
                  ? 'border-0 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                  : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
              }`}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div>
              <label
                className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                PROJECT LINK
              </label>
              <input
                type='url'
                value={formData.link}
                onChange={e =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder='https://example.com'
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                  appearance.theme == 'dark'
                    ? 'border-0 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                    : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
                }`}
              />
            </div>
            <div>
              <label
                className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
                  appearance.theme == 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                GITHUB LINK
              </label>
              <input
                type='url'
                value={formData.github}
                onChange={e =>
                  setFormData({ ...formData, github: e.target.value })
                }
                placeholder='https://github.com/...'
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                  appearance.theme == 'dark'
                    ? 'border-0 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                    : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
                }`}
              />
            </div>
          </div>

          <div>
            <label
              className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
                appearance.theme == 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              TECH STACK
            </label>
            <div className='space-y-3 mb-4'>
              {formData.techStack.map(tech => (
                <div
                  key={tech.id}
                  className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl group transition-all ${
                    appearance.theme == 'dark' ? 'bg-[#2a2a2a]' : 'bg-[#F9F9F9]'
                  }`}
                >
                  <span
                    className={`text-sm flex-1 ${
                      appearance.theme == 'dark'
                        ? 'text-slate-300'
                        : 'text-gray-500'
                    }`}
                  >
                    {tech.name}
                  </span>
                  <button
                    onClick={() => handleRemoveTech(tech.id)}
                    className={`p-1 rounded-lg transition-all ${
                      appearance.theme == 'dark'
                        ? 'text-slate-500 hover:text-red-500 hover:bg-red-900/30'
                        : 'text-gray-300 hover:text-red-500 hover:bg-white'
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className='flex gap-2'>
              <input
                type='text'
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder='Add a technology...'
                className={`flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                  appearance.theme == 'dark'
                    ? 'border-0 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                    : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
                }`}
                onKeyDown={e => e.key === 'Enter' && handleAddTech()}
              />
              <button
                onClick={handleAddTech}
                className='p-3 bg-[#ec5b13] text-white rounded-xl hover:bg-[#f8571d] transition-colors'
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`flex items-center justify-end gap-4 px-8 py-6 border-t ${
            appearance.theme == 'dark'
              ? 'border-white/30 bg-[#202020]'
              : 'border-gray-200 bg-white'
          }`}
        >
          <button
            onClick={closeModal}
            className={`px-10 py-3 text-sm font-bold rounded-full transition-all active:scale-95 ${
              appearance.theme == 'dark'
                ? 'text-slate-300 border-0 hover:bg-slate-800'
                : 'text-gray-600 border border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProject}
            className='px-10 py-3 text-sm font-bold text-white bg-[#fd9d6d] hover:bg-[#ec560a] rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!formData.name.trim()}
          >
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  )
}

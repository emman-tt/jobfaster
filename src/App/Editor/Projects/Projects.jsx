import { useState } from 'react'
import { ChevronDown, Plus, GripVertical, Trash2, X, Edit2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProject, removeProject, reArrange } from '../../../store/workSlice'
import { DragDropProvider } from '@dnd-kit/react'
import { Sortable } from '../../../components/dragger'

export default function Projects () {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const projects = useSelector(state => state.work.projects)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [techInput, setTechInput] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: [],
    link: '',
    github: ''
  })

  const openModal = (id = null) => {
    if (id) {
      const project = projects.find(p => p.id === id)
      if (project) {
        setFormData({ ...project })
        setEditingId(id)
      }
    } else {
      setFormData({
        name: '',
        description: '',
        techStack: [],
        link: '',
        github: ''
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setTechInput('')
  }

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        techStack: [
          ...prev.techStack,
          { id: Date.now(), name: techInput }
        ]
      }))
      setTechInput('')
    }
  }

  const handleRemoveTech = (id) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(tech => tech.id !== id)
    }))
  }

  const handleSaveProject = () => {
    if (formData.name.trim()) {
      if (editingId) {
        dispatch(updateProject({ id: editingId, data: formData }))
      } else {
        dispatch(updateProject({ id: Date.now(), data: formData }))
      }
      closeModal()
    }
  }

  const handleDeleteProject = id => {
    dispatch(removeProject(id))
  }

  const handleDragEnd = event => {
    const { source } = event.operation
    const { initialIndex, index } = source
    if (initialIndex !== index) {
      const newItems = [...projects]
      const [removed] = newItems.splice(initialIndex, 1)
      newItems.splice(index, 0, removed)
      dispatch(reArrange({ category: 'projects', value: newItems }))
    }
  }

  return (
    <section className='w-full'>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer border-b border-gray-200 transition-colors'
      >
        <h2 className='text-lg font-bold text-gray-900 flex items-center'>
          <span className='inline-block w-1 h-6 bg-[#f56010] mr-3'></span>
          Projects
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

      {isOpen && (
        <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3'>
          {projects.map((project, index) => (
            <Sortable
              index={index}
              id={project.id}
              key={project.id}
              className='border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow'
            >
              <div className='w-full flex items-center justify-between p-4 transition-colors'>
                <div className='flex items-center gap-3 flex-1'>
                  <GripVertical size={16} className='text-black shrink-0' />
                  <div className='text-left'>
                    <p className='text-sm font-semibold text-gray-900'>
                      {project.name || 'Untitled'}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {project.techStack?.length > 0
                        ? project.techStack.map(t => t.name).join(', ')
                        : 'No technologies added'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      openModal(project.id)
                    }}
                    className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Edit'
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleDeleteProject(project.id)
                    }}
                    className='p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    title='Delete'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </Sortable>
          ))}

          <button
            onClick={() => openModal()}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm'
          >
            <Plus size={18} />
            Add a new project
          </button>
        </div>
      )}

      {showModal && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200'>
          <div className='bg-white rounded-4xl shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200'>
            <div className='flex items-center justify-between px-8 py-6'>
              <h3 className='text-2xl font-bold text-gray-900'>
                {editingId ? 'Edit Project' : 'Add Project'}
              </h3>
              <button
                onClick={closeModal}
                className='p-2 hover:bg-gray-100 rounded-full transition-colors text-black'
              >
                <X size={20} />
              </button>
            </div>

            <div className='px-8 pb-8 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar'>
              <div>
                <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                  PROJECT NAME
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder='E-Commerce Platform'
                  className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
                />
              </div>

              <div>
                <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                  DESCRIPTION
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder='Describe your project...'
                  className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700 resize-none h-24'
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div>
                  <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                    PROJECT LINK
                  </label>
                  <input
                    type='url'
                    value={formData.link}
                    onChange={e =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder='https://example.com'
                    className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
                  />
                </div>
                <div>
                  <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                    GITHUB LINK
                  </label>
                  <input
                    type='url'
                    value={formData.github}
                    onChange={e =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    placeholder='https://github.com/...'
                    className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
                  />
                </div>
              </div>

              <div>
                <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                  TECH STACK
                </label>
                <div className='space-y-3 mb-4'>
                  {formData.techStack.map(tech => (
                    <div
                      key={tech.id}
                      className='flex items-center justify-between gap-4 bg-[#F9F9F9] px-4 py-3 rounded-xl group transition-all'
                    >
                      <span className='text-sm text-gray-500 flex-1'>
                        {tech.name}
                      </span>
                      <button
                        onClick={() => handleRemoveTech(tech.id)}
                        className='p-1 text-gray-300 hover:text-red-500 hover:bg-white rounded-lg transition-all'
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
                    className='flex-1 border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
                    onKeyDown={e =>
                      e.key === 'Enter' && handleAddTech()
                    }
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

            <div className='flex items-center justify-end gap-4 px-8 py-6 bg-white'>
              <button
                onClick={closeModal}
                className='px-10 py-3 text-sm font-bold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 rounded-full transition-all active:scale-95'
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
      )}
      </DragDropProvider>
    </section>
  )
}

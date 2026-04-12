import { useState } from 'react'
import { ChevronDown, Plus, GripVertical, Trash2, X, Edit2 } from 'lucide-react'

export default function Projects () {
  const [isOpen, setIsOpen] = useState(true)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: '',
      techStack: [],
      link: '',
      github: ''
    }
  ])
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
        setFormData(project)
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
        setProjects(prev =>
          prev.map(project => (project.id === editingId ? formData : project))
        )
      } else {
        const newProject = {
          ...formData,
          id: Date.now()
        }
        setProjects([...projects, newProject])
      }
      closeModal()
    }
  }

  const handleDeleteProject = id => {
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <section className='w-full'>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors'
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

      {/* Content */}
      {isOpen && (
        <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3 border-t border-gray-200'>
          {/* Project Items */}
          {projects.map(project => (
            <div
              key={project.id}
              className='border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow'
            >
              {/* Item Header */}
              <div className='w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors'>
                <div className='flex items-center gap-3 flex-1'>
                  <GripVertical
                    size={16}
                    className='text-gray-400 flex-shrink-0'
                  />
                  <div className='text-left'>
                    <p className='text-sm font-semibold text-gray-900'>
                      {project.name}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {project.techStack.length > 0
                        ? project.techStack.map(t => t.name).join(', ')
                        : 'No technologies added'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => openModal(project.id)}
                    className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Edit'
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className='p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    title='Delete'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Project Button */}
          <button
            onClick={() => openModal()}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm font-medium'
          >
            <Plus size={18} />
            Add a new project
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white'>
              <h3 className='text-lg font-bold text-gray-900'>
                {editingId ? 'Edit Project' : 'Add Project'}
              </h3>
              <button
                onClick={closeModal}
                className='p-1 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-6 space-y-4'>
              {/* Project Name */}
              <div>
                <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                  PROJECT NAME
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder='e.g., E-Commerce Platform'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                />
              </div>

              {/* Description */}
              <div>
                <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                  DESCRIPTION
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder='Describe your project...'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13] resize-none h-24'
                />
              </div>

              {/* Links */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    PROJECT LINK
                  </label>
                  <input
                    type='url'
                    value={formData.link}
                    onChange={e =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder='e.g., https://example.com'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    GITHUB LINK
                  </label>
                  <input
                    type='url'
                    value={formData.github}
                    onChange={e =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    placeholder='e.g., https://github.com/...'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                  TECH STACK
                </label>
                <div className='space-y-2 mb-3'>
                  {formData.techStack.map(tech => (
                    <div
                      key={tech.id}
                      className='flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg'
                    >
                      <span className='text-xs text-gray-700 flex-1'>
                        {tech.name}
                      </span>
                      <button
                        onClick={() => handleRemoveTech(tech.id)}
                        className='p-0.5 text-red-500 hover:bg-red-100 rounded transition-colors flex-shrink-0'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Tech Input */}
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    placeholder='Add a technology...'
                    className='flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                    onKeyDown={e =>
                      e.key === 'Enter' && handleAddTech()
                    }
                  />
                  <button
                    onClick={handleAddTech}
                    className='px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 text-xs font-medium'
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex gap-2 justify-end px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white'>
              <button
                onClick={closeModal}
                className='px-6 py-2.5 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className='px-6 py-2.5 text-xs font-medium text-white bg-[#ec5b13] hover:bg-[#d94d0d] rounded-lg transition-colors'
              >
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

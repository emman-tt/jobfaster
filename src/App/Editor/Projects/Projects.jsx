import { useState } from 'react'
import { ChevronDown, Plus, GripVertical, Trash2, Edit2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeProject, reArrange } from '../../../store/workSlice'
import { setModal } from '../../../store/editorSlice'
import { DragDropProvider } from '@dnd-kit/react'
import { Sortable } from '../../../components/dragger'

export default function Projects ({ setEditingId }) {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const projects = useSelector(state => state.work.projects)
  const { appearance } = useSelector(state => state.preferences)

  const openModal = (id = null) => {
    setEditingId(id)
    dispatch(setModal('projects'))
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
          className={`flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer border-b transition-colors ${
            appearance.theme == 'dark' ? 'border-slate-700' : 'border-gray-200'
          }`}
        >
          <h2 className={`text-lg font-bold flex items-center ${
            appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className='inline-block w-1 h-6 bg-[#f56010] mr-3'></span>
            Projects
          </h2>
          <button className={`p-1 rounded-lg transition-colors ${
            appearance.theme == 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'
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
            {projects.map((project, index) => (
              <Sortable
                index={index}
                id={project.id}
                key={project.id}
                className={`rounded-xl overflow-hidden hover:shadow-sm transition-shadow ${
                  appearance.theme == 'dark'
                    ? 'border border-slate-700 bg-[#202020]'
                    : 'border border-gray-200 bg-white'
                }`}
              >
                <div className='w-full flex items-center justify-between p-4 transition-colors'>
                  <div className='flex items-center gap-3 flex-1'>
                    <GripVertical size={16} className={`shrink-0 ${
                      appearance.theme == 'dark' ? 'text-slate-400' : 'text-black'
                    }`} />
                    <div className='text-left'>
                      <p className={`text-sm font-semibold ${
                        appearance.theme == 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.name || 'Untitled'}
                      </p>
                      <p className={`text-xs ${
                        appearance.theme == 'dark' ? 'text-slate-400' : 'text-gray-500'
                      }`}>
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
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm ${
                appearance.theme == 'dark'
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'border-gray-300 text-gray-600'
              }`}
            >
              <Plus size={18} />
              Add a new project
            </button>
          </div>
        )}
      </DragDropProvider>
    </section>
  )
}
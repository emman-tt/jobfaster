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
      </DragDropProvider>
    </section>
  )
}
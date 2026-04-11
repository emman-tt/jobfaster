import { useState } from 'react'
import { LayoutTemplate, X } from 'lucide-react'
import { Sidebar } from '../App/Editor/Sidebar'
import { Topbar } from '../App/Editor/Topbar'
import { Main } from '../App/Editor/Main'

const templates = [
  { id: 1, name: 'Classic', thumbnail: '/templates/classic.png' },
  { id: 2, name: 'Modern', thumbnail: '/templates/modern.png' },
  { id: 3, name: 'Minimal', thumbnail: '/templates/minimal.png' },
  { id: 4, name: 'Creative', thumbnail: '/templates/creative.png' }
]

function TemplatesPanel ({ onClose }) {
  return (
    <div className='absolute inset-0 bg-black/30 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-2xl w-[600px] max-h-[80vh] overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
          <h2 className='text-lg font-semibold font-satoshi text-gray-900'>
            Templates
          </h2>
          <button
            onClick={onClose}
            className='p-1.5 rounded-full hover:bg-gray-100 transition-colors'
          >
            <X size={18} className='text-gray-500' />
          </button>
        </div>
        <div className='p-6 grid grid-cols-2 gap-4'>
          {templates.map(template => (
            <button
              key={template.id}
              className='group relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#fd9155] transition-all'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center'>
                <LayoutTemplate size={32} className='text-gray-400' />
              </div>
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3'>
                <span className='text-sm font-medium text-white font-satoshi'>
                  {template.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Editor () {
  const [isPreview, setIsPreview] = useState(false)
  const [activeSection, setActiveSection] = useState('identity')

  return (
    <section className='dotted-pattern w-full h-full absolute flex '>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <section className=' w-full flex flex-col'>
        <Topbar isPreview={isPreview} setIsPreview={setIsPreview} />
        <Main activeSection={activeSection} />
      </section>
    </section>
  )
}

import { Download, Save, Send, Undo2 } from 'lucide-react'
import { templates } from '../../../libs/templatesData'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LAYOUT_TO_TEMPLATE = {
  1: 'classic',
  2: 'modern',
  3: 'executive',
  4: 'technical',
  5: 'academic',
  6: 'ats'
}

export default function Builder ({ layoutId, resume }) {
  const navigate = useNavigate()
  const { previewType } = useSelector(state => state.preview)
  const templateId = LAYOUT_TO_TEMPLATE[layoutId] || 'classic'
  const template = templates.find(t => t.id === templateId)

  if (!template) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <h2 className='text-xl font-semibold'>Template not found</h2>
        <p>Layout ID: {resume?.layoutId}</p>
      </div>
    )
  }

  return (
    <section className=' w-full h-screen relative  '>
      <section className=' absolute top-[10%] font-IBM text-sm flex gap-4 flex-col left-10'>
        {previewType !== 'job' && (
          <>
            <div
              onClick={() => {
                navigate('/dashboard/finalize')
              }}
              className=' flex gap-2 border-b-2  border-white hover:border-black cursor-pointer'
            >
              <Send className='w-4 h-4' />
              <p>Confirm</p>
            </div>
            <div className=' flex gap-2 border-b-2  border-white hover:border-black cursor-pointer'>
              <Save className='w-4 h-4' />
              <p>Save</p>
            </div>
          </>
        )}
        <div
          onClick={() => {
            navigate(-1)
          }}
          className=' flex gap-2 border-b-2  border-white hover:border-black cursor-pointer '
        >
          <Undo2 className='w-4 h-4' />
          <p>Back</p>
        </div>
        <div className=' flex gap-2 border-b-2  border-white hover:border-black cursor-pointer'>
          <Download className='w-4 h-4' />
          <p>Download</p>
        </div>
      </section>

      <section className='w-full flex justify-center overflow-y-auto  h-170 my-10 mb-50  p-8'>
        <div className='flex flex-col gap-5 items-center origin-top'>
          <div className=' font-satoshi'>
            {resume.name} <span className=' text-sm'>{resume.size}mb</span>
          </div>
          <div style={{ zoom: '1' }} className='shadow-xs max-w-200 pb-10'>
            <template.component data={resume.content} />
          </div>
        </div>
      </section>
    </section>
  )
}

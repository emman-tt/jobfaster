import { Download, Save, Send, Undo2 } from 'lucide-react'
import { TEMPLATES } from '../CreateResume/templates/layout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Builder ({ layoutId, resume }) {
  const navigate = useNavigate()
  const { previewType } = useSelector(state => state.preview)
  const Template = TEMPLATES[layoutId]

  if (!Template) {
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
            <Template userData={resume.content} />
          </div>
        </div>
      </section>
    </section>
  )
}

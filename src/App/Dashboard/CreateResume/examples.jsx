import { ArrowRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveTemplateId } from '../../../store/editorSlice'
import { templates } from '../../../libs/templatesData'

export default function Examples () {
  const dispatch = useDispatch()
  const { templateId } = useSelector(state => state.editor)
  const { appearance } = useSelector(state => state.preferences)
  const navigate = useNavigate()

  return (
    <section
      className={`w-full h-full pt-16 px-12 overflow-auto ${
        appearance.theme == 'dark' ? 'bg-[#202020]' : 'bg-white'
      }`}
    >
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2
            className={`text-2xl font-semibold font-satoshi ${
              appearance.theme == 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Choose your template
          </h2>
          <p
            className={`text-sm font-satoshi mt-1 ${
              appearance.theme == 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Select a layout structure for your resume
          </p>
        </div>
        <button
          onClick={() => navigate('/editor')}
          className='bg-orange-500 text-white cursor-pointer rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-orange-600 transition-colors font-satoshi font-medium'
        >
          Next <ArrowRight className='w-4 h-4' />
        </button>
      </div>
      <section className='grid grid-cols-6 gap-4'>
        {templates.map(item => {
          return (
            <div
              key={item.id}
              onClick={() => dispatch(saveTemplateId(item.id))}
              className={`cursor-pointer ${
                item.id == templateId
                  ? 'ring-2 ring-orange-500 ring-offset-2 rounded-xl'
                  : ''
              }`}
            >
              <div
                className={`relative rounded-lg overflow-hidden ${
                  appearance.theme == 'dark'
                    ? 'bg-[#202020] border-slate-700'
                    : 'bg-white border-slate-200'
                } ${item.id == templateId ? 'shadow-lg' : 'shadow-sm'} border`}
              >
                <div className='h-50 p-1'>
                  <img
                    src={item.thumbnail}
                    alt=''
                    className='w-full object-cover h-auto'
                  />
                </div>
              </div>
              <p
                className={`text-sm font-satoshi font-medium text-center mt-2 ${
                  item.id == templateId
                    ? 'text-orange-600'
                    : appearance.theme == 'dark'
                    ? 'text-white'
                    : 'text-slate-600'
                }`}
              >
                {item.name}
              </p>
            </div>
          )
        })}
      </section>
    </section>
  )
}

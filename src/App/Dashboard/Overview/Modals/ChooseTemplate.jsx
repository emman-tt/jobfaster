import { X, Check } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModals } from '../../../../store/modalSlice'
import { changeLayout } from '../../../../store/aiSlice'
import { selectFontType } from '../../../../store/formatSlice'
import TwoColumnResume from '../../CreateResume/templates/TwoColumn'
import LeftAlligned from '../../CreateResume/templates/LeftAlligned'
import SkillsFirstResume from '../../CreateResume/templates/SkillsFirst'
import DividedResume from '../../CreateResume/templates/Divided'
import Default from '../../CreateResume/templates/Default'
import { sampleUserData } from '../../../../utils/sample'

const templates = [
  { id: 1, name: 'Classic', Comp: Default },
  { id: 2, name: 'Modern', Comp: LeftAlligned },
  { id: 3, name: 'Minimal', Comp: TwoColumnResume },
  { id: 4, name: 'Executive', Comp: SkillsFirstResume },
  { id: 5, name: 'Bold', Comp: DividedResume }
]

const fonts = [
  { id: 'calibri', label: 'Calibri' },
  { id: 'arial', label: 'Arial' },
  { id: 'times-new-roman', label: 'Times New Roman' },
  { id: 'georgia', label: 'Georgia' },
  { id: 'garamond', label: 'Garamond' }
]

const colors = [
  '#0a66c2',
  '#1a1a1a',
  '#2563eb',
  '#059669',
  '#7c3aed',
  '#db2777',
  '#ea580c'
]

function TemplateCard ({ template, isSelected, onSelect }) {
  const Component = template.Comp

  return (
    <div
      onClick={onSelect}
      className='cursor-pointer flex flex-col items-center'
    >
      <div
        className={`relative border-2 rounded-lg overflow-hidden transition-all bg-white ${
          isSelected
            ? 'border-orange-500'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className='w-73 h-78 overflow-hidden'>
          <div
            className='origin-top-left'
            style={{
              width: '1200px',
              height: '1414px',
              transform: 'scale(0.25)'
            }}
          >
            <Component
              className='w-[210mm] min-h-[297mm]'
              userData={sampleUserData}
            />
          </div>
        </div>
        {isSelected && (
          <div className='absolute top-1 right-1 bg-orange-500 text-white p-0.5 rounded-full'>
            <Check className='w-3 h-3' />
          </div>
        )}
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <span
          className={`text-sm font-medium font-satoshi ${
            isSelected ? 'text-orange-600' : 'text-slate-700'
          }`}
        >
          {template.name}
        </span>
        {isSelected && (
          <span className='text-xs font-satoshi text-orange-500'>selected</span>
        )}
      </div>
    </div>
  )
}

export default function ChooseTemplate () {
  const dispatch = useDispatch()
  const { layoutId } = useSelector(state => state.ai)
  const { styless } = useSelector(state => state.format)

  function closeModal () {
    dispatch(toggleModals('chooseTemplate'))
  }

  return (
    <section className='absolute inset-0 z-50 bg-black/40 flex items-center justify-center'>
      <div className='bg-white rounded-2xl w-[90%] h-[90%] flex flex-col shadow-2xl'>
        <div className='flex items-center justify-between px-8 py-5 border-b border-slate-200'>
          <div>
            <h2 className='text-xl font-semibold font-satoshi'>
              Choose a Template
            </h2>
            <p className='text-sm font-satoshi text-slate-500 mt-0.5'>
              Pick a style for your resume
            </p>
          </div>
          <button
            onClick={closeModal}
            className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
          >
            <X className='w-5 h-5 text-slate-500' />
          </button>
        </div>

        <div className='flex-1 overflow-auto p-8'>
          <div className='flex flex-wrap justify-center items-start gap-8'>
            {templates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={layoutId === template.id}
                onSelect={() => dispatch(changeLayout(template.id))}
              />
            ))}
          </div>
        </div>

        <div className='border-t border-slate-200 px-8 py-5'>
          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-satoshi font-medium text-slate-600'>
                Font
              </span>
              <select
                value={styless?.fontType || 'calibri'}
                onChange={e => dispatch(selectFontType(e.target.value))}
                className='border border-slate-300 rounded-lg px-3 py-2 text-sm font-satoshi bg-white focus:outline-none focus:ring-2 focus:ring-orange-500'
              >
                {fonts.map(font => (
                  <option key={font.id} value={font.id}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-satoshi font-medium text-slate-600'>
                Accent Color
              </span>
              <div className='flex items-center gap-2'>
                {colors.map(color => (
                  <button
                    key={color}
                    className='w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform'
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-slate-200 px-8 py-5 flex items-center justify-end gap-4'>
          <button
            onClick={closeModal}
            className='px-6 py-3 rounded-xl border border-slate-300 text-sm font-satoshi font-medium text-slate-700 hover:bg-slate-50 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={closeModal}
            className='px-6 py-3 rounded-xl bg-orange-500 text-white text-sm font-satoshi font-medium hover:bg-orange-600 transition-colors flex items-center gap-2'
          >
            Apply Template <span>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

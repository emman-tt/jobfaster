import { useDispatch, useSelector } from 'react-redux'
import { selectFontType } from '../../../store/formatSlice'
import { QuestionHeader } from '../../../components/QuestionHeader'

const fontOptions = [
  { id: 'calibri', label: 'Calibri', description: 'Modern, clean sans-serif' },
  { id: 'arial', label: 'Arial', description: 'Classic, widely supported' },
  { id: 'times-new-roman', label: 'Times New Roman', description: 'Traditional serif font' },
  { id: 'georgia', label: 'Georgia', description: 'Elegant, readable serif' },
  { id: 'garamond', label: 'Garamond', description: 'Classic, sophisticated serif' }
]

export default function FontType () {
  const dispatch = useDispatch()
  const currentFont = useSelector(state => state.format.styless.fontType)

  function selectFont (fontId) {
    dispatch(selectFontType(fontId))
  }

  return (
    <section className='mb-8'>
      <QuestionHeader question='Choose your resume font'>
        Select a font family that matches your professional style. These fonts are
        ATS-friendly and ensure your resume looks great on all systems.
      </QuestionHeader>
      <ul className='grid grid-cols-3 gap-3 mt-5 px-10'>
        {fontOptions.map(font => (
          <li
            key={font.id}
            onClick={() => selectFont(font.id)}
            className={`flex flex-col gap-1 w-full border cursor-pointer rounded-xl py-4 px-4 transition-all duration-200 ease items-start hover:shadow-lg
              ${currentFont === font.id
                ? 'border-[#ec5b13] bg-orange-50'
                : 'border-slate-200 hover:border-slate-300'
              }`}
          >
            <div className='flex items-center gap-3 w-full'>
              <div
                className={`border ${
                  currentFont === font.id ? 'border-4' : 'border-slate-300'
                } border-[#ec5b13] inline-block w-4 h-4 rounded-full shrink-0`}
              ></div>
              <div className='text-sm font-semibold'>{font.label}</div>
            </div>
            <div className={`text-xs ml-7 ${currentFont === font.id ? 'text-orange-600' : 'text-slate-400'}`}>
              {font.description}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

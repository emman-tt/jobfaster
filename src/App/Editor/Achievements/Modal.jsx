import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addAchievement,
  updateAchievement
} from '../../../store/credentialsSlice'
import { setModal } from '../../../store/editorSlice'
import { X, ChevronDown } from 'lucide-react'

const years = [
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010'
]

export function Modal ({ editingId }) {
  const [yearBox, setYearBox] = useState(false)
  const dispatch = useDispatch()
  const { achievements } = useSelector(state => state.credentials)
  const { appearance } = useSelector(state => state.preferences)
  const ach = achievements.find(item => item.id == editingId) || null
  const derivedData = ach ?? {
    achievement: '',
    context: '',
    year: ''
  }
  const [formData, setFormData] = useState(derivedData)

  const handleSaveAchievement = () => {
    if (formData.achievement.trim()) {
      if (editingId) {
        dispatch(updateAchievement({ id: editingId, data: formData }))
      } else {
        dispatch(addAchievement(formData))
      }
      closeModal()
    }
  }

  const closeModal = () => {
    dispatch(setModal(null))
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200'>
      <div className={`rounded-4xl shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200 ${
        appearance.theme == 'dark'
          ? 'bg-[#202020]'
          : 'bg-white'
      }`}>
        <div className={`flex items-center justify-between px-8 py-6 border-b ${
          appearance.theme == 'dark'
            ? 'border-slate-700'
            : 'border-gray-200'
        }`}>
          <h3 className={`text-2xl font-bold ${
            appearance.theme == 'dark'
              ? 'text-white'
              : 'text-gray-900'
          }`}>
            {editingId ? 'Edit Achievement' : 'Add Achievement'}
          </h3>
          <button
            onClick={closeModal}
            className={`p-2 rounded-full transition-colors ${
              appearance.theme == 'dark'
                ? 'hover:bg-slate-700 text-white'
                : 'hover:bg-gray-100 text-black'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className='px-8 pb-8 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar'>
          <div>
            <label className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
              appearance.theme == 'dark'
                ? 'text-slate-400'
                : 'text-black'
            }`}>
              ACHIEVEMENT <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={formData.achievement}
              onChange={e =>
                setFormData({ ...formData, achievement: e.target.value })
              }
              placeholder='Led team of 5 engineers to deliver project 2 weeks ahead of schedule, saving $50K in costs'
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition-all resize-none h-24 ${
                appearance.theme == 'dark'
                  ? 'border-slate-700 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                  : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
              appearance.theme == 'dark'
                ? 'text-slate-400'
                : 'text-black'
            }`}>
              COMPANY / ROLE{' '}
              <span className={appearance.theme == 'dark' ? 'text-slate-500' : 'text-gray-400'} font-normal>
                (optional)
              </span>
            </label>
            <input
              type='text'
              value={formData.context}
              onChange={e =>
                setFormData({ ...formData, context: e.target.value })
              }
              placeholder='At TechCorp, as Senior Developer'
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition-all ${
                appearance.theme == 'dark'
                  ? 'border-slate-700 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                  : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
              }`}
            />
          </div>

          <div>
            <label className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
              appearance.theme == 'dark'
                ? 'text-slate-400'
                : 'text-black'
            }`}>
              YEAR <span className={appearance.theme == 'dark' ? 'text-slate-500' : 'text-gray-400'} font-normal>
                (optional)
              </span>
            </label>
            <div className='relative'>
              <input
                type='text'
                value={formData.year}
                readOnly
                onClick={() => setYearBox(!yearBox)}
                placeholder='Select Year'
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] transition-all cursor-pointer ${
                  appearance.theme == 'dark'
                    ? 'border-slate-700 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                    : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
                }`}
              />
              <ChevronDown
                size={16}
                className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-150 ${
                  appearance.theme == 'dark'
                    ? 'text-slate-400'
                    : 'text-black'
                } ${yearBox ? 'rotate-180' : ''}`}
              />
              {yearBox && (
                <div className={`absolute z-20 top-full left-0 right-0 mt-2 border rounded-xl shadow-lg overflow-hidden ${
                  appearance.theme == 'dark'
                    ? 'bg-[#2a2a2a] border-slate-700'
                    : 'bg-white border-gray-200'
                }`}>
                  <ul className='max-h-60 overflow-y-auto custom-scrollbar'>
                    {years.map(year => (
                      <li
                        key={year}
                        onClick={() => {
                          setFormData({ ...formData, year })
                          setYearBox(false)
                        }}
                        className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                          appearance.theme == 'dark'
                            ? 'text-white hover:bg-slate-700'
                            : 'text-gray-900 hover:bg-[#ec5b13]/5'
                        }`}
                      >
                        {year}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`flex items-center justify-end gap-4 px-8 py-6 border-t ${
          appearance.theme == 'dark'
            ? 'border-slate-700 bg-[#202020]'
            : 'border-gray-200 bg-white'
        }`}>
          <button
            onClick={closeModal}
            className={`px-10 py-3 text-sm font-bold rounded-full transition-all active:scale-95 ${
              appearance.theme == 'dark'
                ? 'text-slate-300 border border-slate-700 hover:bg-slate-800'
                : 'text-gray-600 border border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAchievement}
            className='px-10 py-3 text-sm font-bold text-white bg-[#fd9d6d] hover:bg-[#ec560a] rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!formData.achievement.trim()}
          >
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  )
}

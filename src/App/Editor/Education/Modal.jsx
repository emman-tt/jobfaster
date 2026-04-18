import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateEducation } from '../../../store/educationSlice'
import { setModal } from '../../../store/editorSlice'
import { X, Plus, ChevronDown } from 'lucide-react'

export function Modal ({ editingId }) {
  const [highlightInput, setHighlightInput] = useState('')
  const dispatch = useDispatch()
  const { educations } = useSelector(state => state.education)
  const edu = educations.find(item => item.id == editingId) || null
  const derivedData = edu ?? {
    school: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    highlights: []
  }
  const [formData, setFormData] = useState(derivedData)

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [
          ...prev.highlights,
          { id: Date.now(), text: highlightInput }
        ]
      }))
      setHighlightInput('')
    }
  }

  const handleSaveEducation = () => {
    if (formData.school.trim() && formData.degree.trim()) {
      if (editingId) {
        dispatch(updateEducation({ id: editingId, data: formData }))
      } else {
        const ramdom = crypto.randomUUID().split('-')[0]
        dispatch(updateEducation({ id: ramdom, data: formData }))
      }
      closeModal()
    }
  }

  const closeModal = () => {
    dispatch(setModal(null))
    setHighlightInput('')
  }

  const handleRemoveHighlight = id => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(highlight => highlight.id !== id)
    }))
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200'>
      <div className='bg-white rounded-4xl shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200'>
        <div className='flex items-center justify-between px-8 py-6'>
          <h3 className='text-2xl font-bold text-gray-900'>
            {editingId ? 'Edit Education' : 'Add Education'}
          </h3>
          <button
            onClick={closeModal}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors text-black'
          >
            <X size={20} />
          </button>
        </div>

        <div className='px-8 pb-8 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div>
              <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                SCHOOL
              </label>
              <input
                type='text'
                value={formData.school}
                onChange={e =>
                  setFormData({ ...formData, school: e.target.value })
                }
                placeholder='University of Ghana'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
              />
            </div>
            <div>
              <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                DEGREE
              </label>
              <input
                type='text'
                value={formData.degree}
                onChange={e =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                placeholder='Bachelor of Science'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
              />
            </div>
          </div>

          <div>
            <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
              FIELD OF STUDY
            </label>
            <input
              type='text'
              value={formData.field}
              onChange={e =>
                setFormData({ ...formData, field: e.target.value })
              }
              placeholder='Computer Science'
              className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div>
              <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                START YEAR
              </label>
              <input
                type='text'
                value={formData.startYear}
                onChange={e =>
                  setFormData({ ...formData, startYear: e.target.value })
                }
                placeholder='2018'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
              />
            </div>
            <div>
              <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                END YEAR
              </label>
              <input
                type='text'
                value={formData.endYear}
                onChange={e =>
                  setFormData({ ...formData, endYear: e.target.value })
                }
                placeholder='2022'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
              />
            </div>
          </div>

          <div>
            <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
              HIGHLIGHTS
            </label>
            <div className='space-y-3 mb-4'>
              {formData.highlights.map(highlight => (
                <div
                  key={highlight.id}
                  className='flex items-center justify-between gap-4 bg-[#F9F9F9] px-4 py-3 rounded-xl group transition-all'
                >
                  <span className='text-sm text-gray-500 flex-1'>
                    {highlight.text}
                  </span>
                  <button
                    onClick={() => handleRemoveHighlight(highlight.id)}
                    className='p-1 text-gray-300 hover:text-red-500 hover:bg-white rounded-lg transition-all'
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className='flex gap-2'>
              <input
                type='text'
                value={highlightInput}
                onChange={e => setHighlightInput(e.target.value)}
                placeholder='Add a highlight...'
                className='flex-1 border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all text-gray-700'
                onKeyDown={e =>
                  e.key === 'Enter' && handleAddHighlight()
                }
              />
              <button
                onClick={handleAddHighlight}
                className='p-3 bg-[#ec5b13] text-white rounded-xl hover:bg-[#f8571d] transition-colors'
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-4 px-8 py-6 bg-white'>
          <button
            onClick={closeModal}
            className='px-10 py-3 text-sm font-bold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 rounded-full transition-all active:scale-95'
          >
            Cancel
          </button>
          <button
            onClick={handleSaveEducation}
            className='px-10 py-3 text-sm font-bold text-white bg-[#fd9d6d] hover:bg-[#ec560a] rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!formData.school.trim() || !formData.degree.trim()}
          >
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  )
}
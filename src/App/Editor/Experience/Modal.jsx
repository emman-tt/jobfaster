import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateExperience } from '../../../store/workSlice'
import { setModal } from '../../../store/editorSlice'
import { ChevronDown, Plus, X } from 'lucide-react'
import { useSelector } from 'react-redux'
export function Modal ({ editingId }) {
  const [accomplishmentInput, setAccomplishmentInput] = useState('')
  const [isAddingBullet, setIsAddingBullet] = useState(false)
  const { experiences } = useSelector(state => state.work)
  const { appearance } = useSelector(state => state.preferences)
  const dispatch = useDispatch()
  const exp = experiences.find(item => item.id == editingId) || null
  const derivedData = exp ?? {
    company: '',
    position: '',
    location: '',
    startYear: '',
    endYear: '',
    accomplishments: []
  }
  const [formData, setFormData] = useState(derivedData)

  const handleAddAccomplishment = () => {
    if (accomplishmentInput.trim()) {
      setFormData(prev => ({
        ...prev,
        accomplishments: [
          ...prev.accomplishments,
          { id: Date.now(), text: accomplishmentInput }
        ]
      }))
      setAccomplishmentInput('')
      setIsAddingBullet(false)
    }
  }

  const handleSaveExperience = () => {
    if (formData.company.trim() && formData.position.trim()) {
      if (editingId) {
        dispatch(updateExperience({ id: editingId, data: formData }))
      } else {
        const ramdom = crypto.randomUUID().split('-')[0]
        dispatch(updateExperience({ id: ramdom, data: formData }))
      }
      closeModal()
    }
  }

  const closeModal = () => {
    dispatch(setModal(null))
    setAccomplishmentInput('')
    setIsAddingBullet(false)
    dispatch(setModal(null))
  }

  const handleRemoveAccomplishment = id => {
    setFormData(prev => ({
      ...prev,
      accomplishments: prev.accomplishments.filter(acc => acc.id !== id)
    }))
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm z-20 transition-all animate-in fade-in duration-200 will-change-transform'>
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
            {editingId ? 'Edit Experience' : 'Add Experience'}
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
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <div>
              <label className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
                appearance.theme == 'dark'
                  ? 'text-slate-400'
                  : 'text-black'
              }`}>
                COMPANY
              </label>
              <input
                type='text'
                value={formData.company}
                onChange={e =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder='Paystack'
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
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
                ROLE
              </label>
              <input
                type='text'
                value={formData.position}
                onChange={e =>
                  setFormData({ ...formData, position: e.target.value })
                }
                placeholder='Frontend Developer'
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                  appearance.theme == 'dark'
                    ? 'border-slate-700 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                    : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
                }`}
              />
            </div>
          </div>
          <div>
            <label className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
              appearance.theme == 'dark'
                ? 'text-slate-400'
                : 'text-black'
            }`}>
              LOCATION
            </label>
            <input
              type='text'
              value={formData.location}
              onChange={e =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder='Accra, Ghana'
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                appearance.theme == 'dark'
                  ? 'border-slate-700 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                  : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
              }`}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
                appearance.theme == 'dark'
                  ? 'text-slate-400'
                  : 'text-black'
              }`}>
                START YEAR
              </label>
              <input
                type='text'
                value={formData.startYear}
                onChange={e =>
                  setFormData({ ...formData, startYear: e.target.value })
                }
                placeholder='2022'
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
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
                END YEAR
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={formData.endYear}
                  onChange={e =>
                    setFormData({ ...formData, endYear: e.target.value })
                  }
                  placeholder='Present'
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                    appearance.theme == 'dark'
                      ? 'border-slate-700 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                      : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
                  }`}
                />
                <ChevronDown
                  size={16}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                    appearance.theme == 'dark'
                      ? 'text-slate-400'
                      : 'text-black'
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <label className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${
              appearance.theme == 'dark'
                ? 'text-slate-400'
                : 'text-black'
            }`}>
              KEY ACCOMPLISHMENTS
            </label>
            <p className={`text-xs mb-3 ${
              appearance.theme == 'dark'
                ? 'text-slate-500'
                : 'text-gray-400'
            }`}>
              Include at least 3 points to make your experience stand out
            </p>
            <div className='space-y-3 mb-4'>
              {formData.accomplishments.map(acc => (
                <div
                  key={acc.id}
                  className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl group transition-all ${
                    appearance.theme == 'dark'
                      ? 'bg-[#2a2a2a]'
                      : 'bg-[#F9F9F9]'
                  }`}
                >
                  <span className={`text-sm ${
                    appearance.theme == 'dark'
                      ? 'text-slate-300'
                      : 'text-gray-500'
                  }`}>{acc.text}</span>
                  <button
                    onClick={() => handleRemoveAccomplishment(acc.id)}
                    className={`p-1 rounded-lg transition-all ${
                      appearance.theme == 'dark'
                        ? 'text-slate-500 hover:text-red-500 hover:bg-red-900/30'
                        : 'text-gray-300 hover:text-red-500 hover:bg-white'
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {isAddingBullet ? (
              <div className='flex gap-2 animate-in slide-in-from-top-2 duration-200'>
                <input
                  autoFocus
                  type='text'
                  value={accomplishmentInput}
                  onChange={e => setAccomplishmentInput(e.target.value)}
                  placeholder='Detail your accomplishment...'
                  className={`flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] transition-all ${
                    appearance.theme == 'dark'
                      ? 'border-slate-700 bg-[#2a2a2a] text-white placeholder:text-slate-500'
                      : 'border-gray-100 bg-white text-gray-700 placeholder:text-gray-300'
                  }`}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleAddAccomplishment()
                    if (e.key === 'Escape') setIsAddingBullet(false)
                  }}
                  onBlur={() => {
                    if (!accomplishmentInput) setIsAddingBullet(false)
                  }}
                />
                <button
                  onClick={handleAddAccomplishment}
                  className='p-3 bg-[#ec5b13] text-white rounded-xl hover:bg-[#f8571d] transition-colors'
                >
                  <Plus size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingBullet(true)}
                className='flex items-center gap-2 text-sm pl-5 font-semibold text-[#ff8c52] cursor-pointer transition-colors py-1'
              >
                <Plus size={16} />
                Add bullet
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
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
            onClick={handleSaveExperience}
            className='px-10 py-3 text-sm font-bold text-white bg-[#fd9d6d] hover:bg-[#ec560a] rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!formData.company.trim() || !formData.position.trim()}
          >
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  )
}

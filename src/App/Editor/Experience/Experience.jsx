import { useState } from 'react'
import { ChevronDown, Plus, GripVertical, Trash2, X, Edit2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeExperience, updateExperience } from '../../../store/workSlice'

export default function Experience () {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const experiences = useSelector(state => state.work.experiences)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [accomplishmentInput, setAccomplishmentInput] = useState('')
  const [isAddingBullet, setIsAddingBullet] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startYear: '',
    endYear: '',
    accomplishments: []
  })

  const openModal = (id = null) => {
    if (id) {
      const exp = experiences.find(e => e.id === id)
      if (exp) {
        setFormData({ ...exp })
        setEditingId(id)
      }
    } else {
      setFormData({
        company: '',
        position: '',
        location: '',
        startYear: '',
        endYear: '',
        accomplishments: []
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setAccomplishmentInput('')
    setIsAddingBullet(false)
  }

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

  const handleDeleteExperience = id => {
    dispatch(removeExperience(id))
  }

  const handleSaveExperience = () => {
    if (formData.company.trim() && formData.position.trim()) {
      if (editingId) {
        dispatch(updateExperience({ id: editingId, data: formData }))
      } else {
        dispatch(updateExperience({ id: Date.now(), data: formData }))
      }
      closeModal()
    }
  }

  return (
    <section className='w-full'>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer border-b border-gray-200 transition-colors'
      >
        <h2 className='text-lg font-bold text-gray-900 flex items-center'>
          <span className='inline-block w-1 h-6 bg-[#f56010] mr-3'></span>
          Experience
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

      {/* Content */}
      {isOpen && (
        <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3 '>
          {/* Experience Items */}
          {experiences.map(exp => (
            <div
              key={exp.id}
              className='border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow'
            >
              {/* Item Header */}
              <div className='w-full flex items-center justify-between p-4  transition-colors'>
                <div className='flex items-center gap-3 flex-1'>
                  <GripVertical size={16} className='text-black shrink-0' />
                  <div className='text-left'>
                    <p className='text-sm font-semibold text-gray-900'>
                      {exp.company || 'Untitled'}
                    </p>
                    <p className='text-xs text-gray-500'>{exp.position}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      openModal(exp.id)
                    }}
                    className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Edit'
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleDeleteExperience(exp.id)
                    }}
                    className='p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    title='Delete'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Experience Button */}
          <button
            onClick={() => openModal()}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm '
          >
            <Plus size={18} />
            Add a new experience
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          setFormData={setFormData}
          formData={formData}
          isAddingBullet={isAddingBullet}
          editingId={editingId}
          setAccomplishmentInput={setAccomplishmentInput}
          accomplishmentInput={accomplishmentInput}
          setIsAddingBullet={setIsAddingBullet}
          closeModal={closeModal}
          handleAddAccomplishment={handleAddAccomplishment}
          handleSaveExperience={handleSaveExperience}
        />
      )}
    </section>
  )
}

function Modal ({
  formData,
  setFormData,
  isAddingBullet,
  editingId,
  setAccomplishmentInput,
  accomplishmentInput,
  setIsAddingBullet,
  closeModal,
  handleAddAccomplishment,
  handleSaveExperience
}) {
  const handleRemoveAccomplishment = id => {
    setFormData(prev => ({
      ...prev,
      accomplishments: prev.accomplishments.filter(acc => acc.id !== id)
    }))
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200'>
      <div className='bg-white rounded-4xl shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200'>
        <div className='flex items-center justify-between px-8 py-6'>
          <h3 className='text-2xl font-bold text-gray-900'>
            {editingId ? 'Edit Experience' : 'Add Experience'}
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
                COMPANY
              </label>
              <input
                type='text'
                value={formData.company}
                onChange={e =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder='Paystack'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300  placeholder:text-xstransition-all  text-gray-700'
              />
            </div>
            <div>
              <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                ROLE
              </label>
              <input
                type='text'
                value={formData.position}
                onChange={e =>
                  setFormData({ ...formData, position: e.target.value })
                }
                placeholder='Frontend Developer'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all font-satoshi  text-gray-700'
              />
            </div>
          </div>
          <div>
            <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
              LOCATION
            </label>
            <input
              type='text'
              value={formData.location}
              onChange={e =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder='Accra, Ghana'
              className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all  text-gray-700'
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
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
                placeholder='2022'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all  text-gray-700'
              />
            </div>
            <div>
              <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
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
                  className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all  text-gray-700'
                />
                <ChevronDown
                  size={16}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none'
                />
              </div>
            </div>
          </div>

          <div>
            <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
              KEY ACCOMPLISHMENTS
            </label>
            <p className='text-xs text-gray-400 mb-3'>
              Include at least 3 points to make your experience stand out
            </p>
            <div className='space-y-3 mb-4'>
              {formData.accomplishments.map(acc => (
                <div
                  key={acc.id}
                  className='flex items-center justify-between gap-4 bg-[#F9F9F9] px-4 py-3 rounded-xl group transition-all'
                >
                  <span className='text-sm text-gray-500 '>{acc.text}</span>
                  <button
                    onClick={() => handleRemoveAccomplishment(acc.id)}
                    className='p-1 text-gray-300 hover:text-red-500 hover:bg-white rounded-lg transition-all'
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
                  className='flex-1 border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#6B4E42] placeholder:text-gray-300 transition-all  text-gray-700'
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
                className='flex items-center gap-2 text-sm pl-5 font-semibold text-[#ff8c52]  cursor-pointer transition-colors py-1'
              >
                <Plus size={16} />
                Add bullet
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className='flex items-center justify-end gap-4 px-8 py-6 bg-white'>
          <button
            onClick={closeModal}
            className='px-10 py-3 text-sm font-bold text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 rounded-full transition-all active:scale-95'
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

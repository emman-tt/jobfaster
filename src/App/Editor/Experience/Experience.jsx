import { useState } from 'react'
import { ChevronDown, Plus, GripVertical, Trash2, X, Edit2 } from 'lucide-react'

export default function Experience () {
  const [isOpen, setIsOpen] = useState(true)
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: 'Astroverse',
      position: 'Software Intern',
      location: '',
      startYear: '',
      endYear: '',
      accomplishments: []
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [accomplishmentInput, setAccomplishmentInput] = useState('')
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
        setFormData(exp)
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
    }
  }

  const handleRemoveAccomplishment = id => {
    setFormData(prev => ({
      ...prev,
      accomplishments: prev.accomplishments.filter(acc => acc.id !== id)
    }))
  }

  const handleSaveExperience = () => {
    if (formData.company.trim() && formData.position.trim()) {
      if (editingId) {
        setExperiences(prev =>
          prev.map(exp => (exp.id === editingId ? formData : exp))
        )
      } else {
        const newExperience = {
          ...formData,
          id: Date.now()
        }
        setExperiences([...experiences, newExperience])
      }
      closeModal()
    }
  }

  const handleDeleteExperience = id => {
    setExperiences(experiences.filter(exp => exp.id !== id))
  }

  return (
    <section className='w-full'>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors'
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
        <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3 border-t border-gray-200'>
          {/* Experience Items */}
          {experiences.map(exp => (
            <div
              key={exp.id}
              className='border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow'
            >
              {/* Item Header */}
              <div className='w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors'>
                <div className='flex items-center gap-3 flex-1'>
                  <GripVertical
                    size={16}
                    className='text-gray-400 flex-shrink-0'
                  />
                  <div className='text-left'>
                    <p className='text-sm font-semibold text-gray-900'>
                      {exp.company}
                    </p>
                    <p className='text-xs text-gray-500'>{exp.position}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => openModal(exp.id)}
                    className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Edit'
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
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
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm font-medium'
          >
            <Plus size={18} />
            Add a new experience
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white'>
              <h3 className='text-lg font-bold text-gray-900'>
                {editingId ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button
                onClick={closeModal}
                className='p-1 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className='p-6 space-y-4'>
              {/* Company and Role */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    COMPANY
                  </label>
                  <input
                    type='text'
                    value={formData.company}
                    onChange={e =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder='e.g., Paystack'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    ROLE
                  </label>
                  <input
                    type='text'
                    value={formData.position}
                    onChange={e =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    placeholder='e.g., Frontend Developer'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                  LOCATION
                </label>
                <input
                  type='text'
                  value={formData.location}
                  onChange={e =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder='e.g., Accra, Ghana'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                />
              </div>

              {/* Start and End Year */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    START YEAR
                  </label>
                  <input
                    type='number'
                    value={formData.startYear}
                    onChange={e =>
                      setFormData({ ...formData, startYear: e.target.value })
                    }
                    placeholder='2022'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    END YEAR
                  </label>
                  <input
                    type='text'
                    value={formData.endYear}
                    onChange={e =>
                      setFormData({ ...formData, endYear: e.target.value })
                    }
                    placeholder='Present'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
              </div>

              {/* Key Accomplishments */}
              <div>
                <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                  KEY ACCOMPLISHMENTS
                </label>
                <div className='space-y-2 mb-3'>
                  {formData.accomplishments.map(acc => (
                    <div
                      key={acc.id}
                      className='flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg'
                    >
                      <span className='text-xs text-gray-700 flex-1'>
                        {acc.text}
                      </span>
                      <button
                        onClick={() => handleRemoveAccomplishment(acc.id)}
                        className='p-0.5 text-red-500 hover:bg-red-100 rounded transition-colors flex-shrink-0'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Accomplishment Input */}
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={accomplishmentInput}
                    onChange={e => setAccomplishmentInput(e.target.value)}
                    placeholder='Add an accomplishment...'
                    className='flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                    onKeyDown={e =>
                      e.key === 'Enter' && handleAddAccomplishment()
                    }
                  />
                  <button
                    onClick={handleAddAccomplishment}
                    className='px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 text-xs font-medium'
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex gap-2 justify-end px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white'>
              <button
                onClick={closeModal}
                className='px-6 py-2.5 text-xs font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                className='px-6 py-2.5 text-xs font-medium text-white bg-[#ec5b13] hover:bg-[#d94d0d] rounded-lg transition-colors'
              >
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

import { useState } from 'react'
import { ChevronDown, Plus, GripVertical, Trash2, X, Edit2 } from 'lucide-react'

export default function Education () {
  const [isOpen, setIsOpen] = useState(true)
  const [educations, setEducations] = useState([
    {
      id: 1,
      school: 'University of Ghana',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: '',
      endYear: '',
      highlights: []
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [highlightInput, setHighlightInput] = useState('')
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    highlights: []
  })

  const openModal = (id = null) => {
    if (id) {
      const edu = educations.find(e => e.id === id)
      if (edu) {
        setFormData(edu)
        setEditingId(id)
      }
    } else {
      setFormData({
        school: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: '',
        highlights: []
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setHighlightInput('')
  }

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

  const handleRemoveHighlight = (id) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(highlight => highlight.id !== id)
    }))
  }

  const handleSaveEducation = () => {
    if (formData.school.trim() && formData.degree.trim()) {
      if (editingId) {
        setEducations(prev =>
          prev.map(edu => (edu.id === editingId ? formData : edu))
        )
      } else {
        const newEducation = {
          ...formData,
          id: Date.now()
        }
        setEducations([...educations, newEducation])
      }
      closeModal()
    }
  }

  const handleDeleteEducation = id => {
    setEducations(educations.filter(edu => edu.id !== id))
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
          Education
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
          {/* Education Items */}
          {educations.map(edu => (
            <div
              key={edu.id}
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
                      {edu.school}
                    </p>
                    <p className='text-xs text-gray-500'>{edu.degree}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => openModal(edu.id)}
                    className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Edit'
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className='p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    title='Delete'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Education Button */}
          <button
            onClick={() => openModal()}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm font-medium'
          >
            <Plus size={18} />
            Add a new education
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
                {editingId ? 'Edit Education' : 'Add Education'}
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
              {/* School and Degree */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    SCHOOL
                  </label>
                  <input
                    type='text'
                    value={formData.school}
                    onChange={e =>
                      setFormData({ ...formData, school: e.target.value })
                    }
                    placeholder='e.g., University of Ghana'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                    DEGREE
                  </label>
                  <input
                    type='text'
                    value={formData.degree}
                    onChange={e =>
                      setFormData({ ...formData, degree: e.target.value })
                    }
                    placeholder='e.g., Bachelor of Science'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
              </div>

              {/* Field of Study */}
              <div>
                <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                  FIELD OF STUDY
                </label>
                <input
                  type='text'
                  value={formData.field}
                  onChange={e =>
                    setFormData({ ...formData, field: e.target.value })
                  }
                  placeholder='e.g., Computer Science'
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
                    placeholder='2018'
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
                    placeholder='2022'
                    className='w-full border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                  />
                </div>
              </div>

              {/* Highlights */}
              <div>
                <label className='text-xs font-bold text-gray-600 uppercase tracking-wide block mb-2'>
                  HIGHLIGHTS
                </label>
                <div className='space-y-2 mb-3'>
                  {formData.highlights.map(highlight => (
                    <div
                      key={highlight.id}
                      className='flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg'
                    >
                      <span className='text-xs text-gray-700 flex-1'>
                        {highlight.text}
                      </span>
                      <button
                        onClick={() => handleRemoveHighlight(highlight.id)}
                        className='p-0.5 text-red-500 hover:bg-red-100 rounded transition-colors flex-shrink-0'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Highlight Input */}
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={highlightInput}
                    onChange={e => setHighlightInput(e.target.value)}
                    placeholder='Add a highlight...'
                    className='flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-xs focus:outline-[#ec5b13] focus:border-[#ec5b13]'
                    onKeyDown={e =>
                      e.key === 'Enter' && handleAddHighlight()
                    }
                  />
                  <button
                    onClick={handleAddHighlight}
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
                onClick={handleSaveEducation}
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

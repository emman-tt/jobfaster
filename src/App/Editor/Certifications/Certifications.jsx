import { useState } from 'react'
import { ChevronDown, Plus, Trash2, X, Edit2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addCertification, removeCertification, updateCertification } from '../../../store/credentialsSlice'

const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010']

export default function Certifications () {
  const [isOpen, setIsOpen] = useState(true)
  const dispatch = useDispatch()
  const certifications = useSelector(state => state.credentials.certifications)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    year: '',
    hasExpiry: false,
    expiryYear: ''
  })

  const openModal = (id = null) => {
    if (id) {
      const cert = certifications.find(c => c.id === id)
      if (cert) {
        setFormData({ ...cert })
        setEditingId(id)
      }
    } else {
      setFormData({
        name: '',
        organization: '',
        year: '',
        hasExpiry: false,
        expiryYear: ''
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setFormData({
      name: '',
      organization: '',
      year: '',
      hasExpiry: false,
      expiryYear: ''
    })
  }

  const handleDeleteCertification = id => {
    dispatch(removeCertification(id))
  }

  const handleSaveCertification = () => {
    if (formData.name.trim() && formData.organization.trim() && formData.year) {
      if (editingId) {
        dispatch(updateCertification({ id: editingId, data: formData }))
      } else {
        dispatch(updateCertification({ id: Date.now(), data: formData }))
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
          Certifications
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
        <div className='px-4 sm:px-6 md:px-8 lg:px-10 py-4 space-y-3'>
          {/* Certification Items */}
          {certifications.map(cert => (
            <div
              key={cert.id}
              className='border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow'
            >
              <div className='w-full flex items-center justify-between p-4 transition-colors'>
                <div className='flex items-center gap-3 flex-1'>
                  <p className='text-sm font-semibold text-gray-900'>
                    {cert.name || 'Untitled'}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {cert.organization} | {cert.year}
                  </p>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      openModal(cert.id)
                    }}
                    className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                    title='Edit'
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleDeleteCertification(cert.id)
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

          {/* Add New Certification Button */}
          <button
            onClick={() => openModal()}
            className='w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-sm'
          >
            <Plus size={18} />
            Add a new certification
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          closeModal={closeModal}
          handleSaveCertification={handleSaveCertification}
        />
      )}
    </section>
  )
}

function Modal ({
  formData,
  setFormData,
  editingId,
  closeModal,
  handleSaveCertification
}) {
  const [yearBox, setYearBox] = useState(false)
  const [expiryYearBox, setExpiryYearBox] = useState(false)

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200'>
      <div className='bg-white rounded-4xl shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200'>
        <div className='flex items-center justify-between px-8 py-6'>
          <h3 className='text-2xl font-bold text-gray-900'>
            {editingId ? 'Edit Certification' : 'Add Certification'}
          </h3>
          <button
            onClick={closeModal}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors text-black'
          >
            <X size={20} />
          </button>
        </div>

        <div className='px-8 pb-8 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar'>
          <div>
            <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
              CERTIFICATION NAME <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder='AWS Certified Solutions Architect'
              className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] placeholder:text-gray-300 transition-all text-gray-700'
            />
          </div>

          <div>
            <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
              ISSUING ORGANIZATION
            </label>
            <input
              type='text'
              value={formData.organization}
              onChange={e => setFormData({ ...formData, organization: e.target.value })}
              placeholder='Amazon Web Services (AWS)'
              className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] placeholder:text-gray-300 transition-all text-gray-700'
            />
          </div>

          <div>
            <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
              YEAR OBTAINED
            </label>
            <div className='relative'>
              <input
                type='text'
                value={formData.year}
                readOnly
                onClick={() => setYearBox(!yearBox)}
                placeholder='Select Year'
                className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] placeholder:text-gray-300 transition-all text-gray-700 cursor-pointer'
              />
              <ChevronDown
                size={16}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none transition-transform duration-150 ${
                  yearBox ? 'rotate-180' : ''
                }`}
              />
              {yearBox && (
                <div className='absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'>
                  <ul className='max-h-60 overflow-y-auto custom-scrollbar'>
                    {years.map(year => (
                      <li
                        key={year}
                        onClick={() => {
                          setFormData({ ...formData, year })
                          setYearBox(false)
                        }}
                        className='px-4 py-3 text-sm text-gray-900 hover:bg-[#ec5b13]/5 cursor-pointer transition-colors'
                      >
                        {year}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className='flex items-center gap-3 pt-2'>
            <input
              type='checkbox'
              id='hasExpiry'
              checked={formData.hasExpiry}
              onChange={e => setFormData({ ...formData, hasExpiry: e.target.checked })}
              className='w-4 h-4 text-[#ec5b13] border-gray-300 rounded focus:ring-[#ec5b13] cursor-pointer'
            />
            <label htmlFor='hasExpiry' className='text-xs text-gray-600 cursor-pointer'>
              This certification expires
            </label>
          </div>

          {formData.hasExpiry && (
            <div>
              <label className='text-[10px] font-bold text-black uppercase tracking-widest block mb-2'>
                EXPIRY YEAR
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={formData.expiryYear}
                  readOnly
                  onClick={() => setExpiryYearBox(!expiryYearBox)}
                  placeholder='Select Expiry Year'
                  className='w-full border border-gray-100 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#ec5b13] placeholder:text-gray-300 transition-all text-gray-700 cursor-pointer'
                />
                <ChevronDown
                  size={16}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none transition-transform duration-150 ${
                    expiryYearBox ? 'rotate-180' : ''
                  }`}
                />
                {expiryYearBox && (
                  <div className='absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'>
                    <ul className='max-h-60 overflow-y-auto custom-scrollbar'>
                      {years.map(year => (
                        <li
                          key={year}
                          onClick={() => {
                            setFormData({ ...formData, expiryYear: year })
                            setExpiryYearBox(false)
                          }}
                          className='px-4 py-3 text-sm text-gray-900 hover:bg-[#ec5b13]/5 cursor-pointer transition-colors'
                        >
                          {year}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
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
            onClick={handleSaveCertification}
            className='px-10 py-3 text-sm font-bold text-white bg-[#fd9d6d] hover:bg-[#ec560a] rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={!formData.name.trim() || !formData.organization.trim() || !formData.year}
          >
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </div>
    </div>
  )
}

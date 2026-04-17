import { X } from 'lucide-react'
import { templates } from '../../libs/templatesData'

export default function TemplateSelector ({
  isOpen,
  onClose,
  onSelect,
  selectedTemplate
}) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0  z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      <div className='relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-4xl max-h-[85vh] overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
          <h2 className='text-lg font-semibold font-satoshi text-slate-800'>
            Choose a Template
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer'
          >
            <X size={20} className='text-slate-500' />
          </button>
        </div>

        <div className='p-6 overflow-y-auto max-h-[calc(85vh-80px)]'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => {
                  onSelect(template.id)
                  onClose()
                }}
                className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedTemplate === template.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className='flex items-center gap-2 mb-2'>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedTemplate == template.id
                        ? 'bg-orange-500'
                        : 'bg-slate-300'
                    }`}
                  />
                  <h3 className='font-semibold text-sm text-slate-800'>
                    {template.name}
                  </h3>
                </div>
                <p className='text-xs text-slate-500 mb-3 line-clamp-2'>
                  {template.description}
                </p>
                <div className='space-y-1'>
                  {template.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <span className='text-[8px] text-orange-400'>•</span>
                      <span className='text-[10px] text-slate-400'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

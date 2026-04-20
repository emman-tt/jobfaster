import { FileText, FileDown, File } from 'lucide-react'

export default function ExportMenu ({ onExport }) {
  const exportOptions = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Best for sharing and printing',
      icon: FileText,
      color: 'bg-red-500'
    },
    {
      id: 'docx',
      name: 'DOCX',
      description: 'Editable Word document',
      icon: File,
      color: 'bg-blue-500'
    }
  ]

  function handleExport (format) {
    onExport(format)
  }

  return (
    <section className='w-full bg-white h-full rounded-2xl shadow-lg p-5 space-y-4'>
      <h3 className='text-lg font-bold text-gray-900'>Export Resume</h3>
      <p className='text-xs text-gray-500'>
        Choose your preferred format to download your resume.
      </p>
      <div className='space-y-3'>
        {exportOptions.map(option => {
          const Icon = option.icon
          return (
            <div
              key={option.id}
              onClick={() => handleExport(option.id)}
              className='flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-orange-500 cursor-pointer transition-all hover:shadow-md group'
            >
              <div className={`${option.color} p-3 rounded-lg`}>
                <Icon size={20} className='text-white' />
              </div>
              <div className='flex-1'>
                <h4 className='font-medium text-gray-900 group-hover:text-orange-600 transition-colors'>
                  {option.name}
                </h4>
                <p className='text-xs text-gray-500'>{option.description}</p>
              </div>
              <FileDown size={18} className='text-gray-400 group-hover:text-orange-500 transition-colors' />
            </div>
          )
        })}
      </div>
    </section>
  )
}

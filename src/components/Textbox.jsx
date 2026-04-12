import { useRef } from 'react'
import { Bold, Italic, Underline } from 'lucide-react'

export default function TextBox ({
  width = 'w-full',
  height = 'h-64',
  placeholder = 'Begin detailing your professional philosophy and key career achievements...'
}) {
  const editorRef = useRef(null)

  const applyFormatting = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleInput = () => {
    // Update editor content
  }

  return (
    <div
      className={`${width} ${height} flex flex-col bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden`}
    >
      {/* Toolbar */}
      <div className='bg-white border-b border-gray-200 p-3 flex flex-wrap gap-2 items-center justify-end'>
        {/* Bold */}
        <button
          onClick={() => applyFormatting('bold')}
          className='p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 flex items-center justify-center'
          title='Bold (Ctrl+B)'
        >
          <Bold size={18} />
        </button>

        {/* Italic */}
        <button
          onClick={() => applyFormatting('italic')}
          className='p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 flex items-center justify-center'
          title='Italic (Ctrl+I)'
        >
          <Italic size={18} />
        </button>

        {/* Underline */}
        <button
          onClick={() => applyFormatting('underline')}
          className='p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 flex items-center justify-center'
          title='Underline (Ctrl+U)'
        >
          <Underline size={18} />
        </button>

        {/* Divider */}
        <div className='w-px h-6 bg-gray-300'></div>

        {/* Clear Formatting */}
        <button
          onClick={() => applyFormatting('removeFormat')}
          className='px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium transition-colors'
          title='Clear Formatting'
        >
          Clear
        </button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        onInput={handleInput}
        contentEditable
        suppressContentEditableWarning
        className='flex-1 p-4 overflow-auto text-sm text-gray-900 bg-white focus:outline-none'
        style={{
          wordWrap: 'break-word'
        }}
      >
        <span className='text-gray-400 pointer-events-none select-none'>
          {placeholder}
        </span>
      </div>
    </div>
  )
}

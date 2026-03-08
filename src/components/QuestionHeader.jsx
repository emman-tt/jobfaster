import { Info } from 'lucide-react'

export function QuestionHeader ({ question = '', children }) {
  return (
    <div>
      <h2 className='mt-4 pl-7  font-my-font font-semibold text-lg'>
        {question}
      </h2>

      <p className='text-xs text-black/80 flex gap-3 pl-7'>
        <Info className='w-3 h-3 mt-1' />
        {children}
      </p>
    </div>
  )
}

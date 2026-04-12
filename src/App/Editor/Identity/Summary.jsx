import TextBox from '../../../components/Textbox'
import { Info } from 'lucide-react'

export default function Summary () {
  return (
    <div className='w-full px-4 sm:px-6 md:px-8 lg:px-10'>
      <h3 className='text-xs font-bold text-gray-600 uppercase tracking-wide mb-3'>
        Tell us about your professional summary
      </h3>
      <p className='text-xs text-gray-500 mb-5 flex items-start gap-2'>
        <span className='text-orange-500 shrink-0 mt-0.5'>
          <Info className='w-2 h-2' />
        </span>
        <span>
          Write a brief overview of your professional background, key
          achievements, and career goals. Keep it concise and impactful.
        </span>
      </p>
      <TextBox width='w-full' height='h-64' placeholder='' />
    </div>
  )
}

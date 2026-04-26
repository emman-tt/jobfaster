import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadFile } from '../../services/Program'
import { generatePDFFromHtml } from '../../utils/generatePdf'
import { toast } from 'sonner'
import { toastPresets } from '../../components/toasters'
import Loader from '../../components/Loader'

export default function SaveResume () {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSave () {
    if (!name.trim()) {
      toast.error('Please enter a resume name', {
        position: 'top-center',
        ...toastPresets.authError()
      })
      return
    }

    setLoading(true)

    try {
      const pdfFile = await generatePDFFromHtml('resume-preview', `${name}.pdf`)

      const formData = new FormData()
      formData.append('file', pdfFile)

      const result = await UploadFile(formData)

      if (result.status === 'success') {
        toast.success('Resume saved!', {
          position: 'top-center',
          ...toastPresets.aiSuccess(`Your resume "${name}" has been saved`)
        })
        navigate('/quick/actions')
      } else {
        throw new Error(result.message || 'Failed to save')
      }
    } catch (error) {
      console.error('Save resume error:', error)
      toast.error('Failed to save resume', {
        position: 'top-center',
        ...toastPresets.authError('Please try again')
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='relative z-100 w-120 h-90 py-7 justify-between self-center rounded-xl bg-white items-center flex flex-col'>
      {loading && (
        <Loader className='absolute w-full backdrop-blur-sm items-center pl-100 bg-[#e9e4e4a1] h-full z-10' />
      )}
      <img
        width='80'
        height='80'
        src='https://img.icons8.com/officel/80/receipt-approved.png'
        alt='receipt-approved'
      />
      <h3>Resume created Successfully!</h3>

      <div className='rounded-xl bg-slate-50 p-10 flex flex-col py-5 gap-3 h-[40%] w-[70%]'>
        <h3 className='font-semibold font-IBM'>Give your Resume a name</h3>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='My Professional Resume'
          className='rounded-xl border px-5 outline-0 border-gray-600 w-full h-30'
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className='cursor-pointer rounded-xl bg-[#fcbe77] text-black px-13 font-satoshi font-semibold py-3 disabled:opacity-50'
      >
        Save Resume
      </button>
    </section>
  )
}
import { pdf } from '@react-pdf/renderer'
import { ResumePDF } from '../App/Editor/ResumePDF'

export async function exportToPDF (data, fileName = 'resume') {
  try {
    const blob = await pdf(<ResumePDF data={data} />).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileName}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return true
  } catch (error) {
    console.error('PDF export error:', error)
    return false
  }
}

export async function exportToDOCX (data, _fileName = 'resume') {
  console.log('DOCX export - data:', data)
  return false
}

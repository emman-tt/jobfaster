import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generatePDFFromHtml (elementId, fileName = 'resume.pdf') {
  console.log('generatePDFFromHtml called with:', elementId, fileName)
  const element = document.getElementById(elementId)
  console.log('Element found:', !!element)
  
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }

  const originalWidth = element.offsetWidth
  const originalHeight = element.offsetHeight
  console.log('Original dimensions:', originalWidth, originalHeight)

  const scale = 3
  console.log('Starting html2canvas capture...')
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    logging: true,
    backgroundColor: '#ffffff',
    width: originalWidth,
    height: originalHeight,
    onclone: (clonedDoc) => {
      const clonedElement = clonedDoc.getElementById(elementId)
      if (clonedElement) {
        clonedElement.style.transform = 'none'
        clonedElement.style.width = `${originalWidth}px`
      }
    }
  })
  console.log('html2canvas completed, canvas:', canvas.width, canvas.height)

  const imgWidth = 210
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  const pdf = new jsPDF({
    orientation: imgHeight > 297 ? 'portrait' : 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false
  })

  const imgData = canvas.toDataURL('image/png', 1.0)

  if (imgHeight > 297) {
    const pages = Math.ceil(imgHeight / 297)
    for (let i = 0; i < pages; i++) {
      if (i > 0) {
        pdf.addPage()
      }
      const yOffset = -(i * 297)
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, (canvas.height * imgWidth) / canvas.width)
    }
  } else {
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
  }

  console.log('Creating blob...')
  const blob = pdf.output('blob')
  console.log('Blob created, size:', blob.size)
  return new File([blob], fileName, { type: 'application/pdf' })
}
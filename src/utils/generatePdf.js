import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function generatePDFFromHtml (elementId, fileName = 'resume.pdf') {
  const element = document.getElementById(elementId)

  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  })

  const imgData = canvas.toDataURL('image/png')
  const imgWidth = 210
  const pageHeight = 297
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0

  const pdf = new jsPDF('p', 'mm', 'a4')
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  const blob = pdf.output('blob')
  return new File([blob], fileName, { type: 'application/pdf' })
}

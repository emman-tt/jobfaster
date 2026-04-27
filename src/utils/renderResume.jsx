import ReactDOMServer from 'react-dom/server'
import { templates } from '../libs/templatesData'

export async function renderResumeToHTML (resumeData, templateName) {
  const template = templates.find(t => t.id === templateName)

  if (!template) {
    throw new Error(`Template not found for: ${templateName}`)
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <template.component data={resumeData} />
  )

  return html
}

export async function generateTailoredResumePDF (resumeData, templateName, fileName) {
  const { saveResumeFromHTML } = await import('../services/Program')

  const html = await renderResumeToHTML(resumeData, templateName)

  const result = await saveResumeFromHTML(html, fileName)

  return result
}
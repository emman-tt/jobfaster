import ReactDOMServer from 'react-dom/server'
import { TEMPLATES } from '../App/Dashboard/CreateResume/templates/layout'
import { getLayoutIdFromTemplate } from './templateMap'

export async function renderResumeToHTML (resumeData, templateName) {
  const layoutId = getLayoutIdFromTemplate(templateName)
  const Template = TEMPLATES[layoutId]

  if (!Template) {
    throw new Error(`Template not found for layoutId: ${layoutId}`)
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <Template userData={resumeData} />
  )

  return html
}

export async function generateTailoredResumePDF (resumeData, templateName, fileName) {
  const { saveResumeFromHTML } = await import('../services/Program')

  const html = await renderResumeToHTML(resumeData, templateName)

  const result = await saveResumeFromHTML(html, fileName)

  return result
}
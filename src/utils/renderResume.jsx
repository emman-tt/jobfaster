import ReactDOMServer from 'react-dom/server'
import { templates } from '../libs/templatesData'
import { transformResumeData } from './transformResumeData'

const A4_WRAPPER = `
<div style="width: 210mm; min-height: 297mm; padding: 20mm; box-sizing: border-box; background: white;">
{{content}}
</div>
`

export async function renderResumeToHTML (resumeData, templateName) {
  const template = templates.find(t => t.id === templateName)

  if (!template) {
    throw new Error(`Template not found for: ${templateName}`)
  }

  const transformedData = transformResumeData(resumeData)

  const content = ReactDOMServer.renderToStaticMarkup(
    <template.component data={transformedData} />
  )

  return A4_WRAPPER.replace('{{content}}', content)
}

export async function generateTailoredResumePDF (
  resumeData,
  templateName,
  fileName
) {
  const { saveResumeFromHTML } = await import('../services/Program')

  const html = await renderResumeToHTML(resumeData, templateName)
 
  const result = await saveResumeFromHTML(html, fileName)

  return result
}

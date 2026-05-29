import ReactDOMServer from 'react-dom/server'
import { templates } from '../libs/templatesData'

const A4_WRAPPER = `
<div style="width: 210mm; min-height: 297mm; padding: 0; box-sizing: border-box; background: white;">
{{content}}
</div>
`

export function transformResumeData (rawData, options = {}) {
  if (!rawData?.personal) {
    return {}
  }

  const { personal, work, education, credentials } = rawData

  const transformed = {
    name: personal.contactDetails.fullName,
    email: personal.contactDetails.email,
    phone: personal.contactDetails.phone,
    location: personal.contactDetails.location,
    jobTitle: personal.contactDetails.jobTitle,
    onlineLinks: personal.onlineLinks || [],
    summary: personal.summary,
    experience: work.experiences
      .filter(exp => exp.company || exp.position)
      .map(exp => ({
        id: exp.id,
        company: exp.company,
        position: exp.position,
        location: exp.location,
        startYear: exp.startYear,
        endYear: exp.endYear,
        accomplishments: exp.accomplishments
          .filter(acc => acc.text)
          .map(acc => acc.text)
      })),
    education: education.educations
      .filter(edu => edu.school || edu.degree)
      .map(edu => ({
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        field: edu.field,
        startYear: edu.startYear,
        endYear: edu.endYear,
        highlights: edu.highlights.filter(h => h.text).map(h => h.text)
      })),
    skills: credentials.skills.flatMap(skill => skill.list || []),
    languages: education.languages
      .filter(lang => lang.language)
      .map(lang => ({
        name: lang.language,
        proficiency: lang.proficiency
      })),
    projects: work.projects
      .filter(proj => proj.name || proj.description)
      .map(proj => ({
        id: proj.id,
        name: proj.name,
        description: proj.description,
        techStack: proj.techStack.filter(t => t.name).map(t => t.name),
        link: proj.link,
        github: proj.github
      })),
    certificates: credentials.certifications
      ? credentials.certifications
          .filter(cert => cert.name)
          .map(cert => ({
            name: cert.name,
            issuer: cert.organization,
            year: cert.year
          }))
      : [],
    achievements: credentials.achievements
      ? credentials.achievements
          .filter(ach => ach.achievement)
          .map(ach => ach.achievement)
      : []
  }

  return { ...transformed, styles: options.styles }
}

export async function renderResumeToHTML (
  resumeData,
  templateName,
  options = {}
) {
  const template = templates.find(t => t.id === templateName)

  if (!template) {
    throw new Error(`Template not found for: ${templateName}`)
  }

  const transformedData = transformResumeData(resumeData, options)

  const content = ReactDOMServer.renderToStaticMarkup(
    <template.component data={transformedData} />
  )

  return A4_WRAPPER.replace('{{content}}', content)
}

export async function generateTailoredResumePDF (
  resumeData,
  templateName,
  fileName,
  options = {}
) {
  const { saveResumeFromHTML } = await import('../services/Program')

  const html = await renderResumeToHTML(resumeData, templateName, options)

  const result = await saveResumeFromHTML(html, fileName)

  return result
}

import ReactDOMServer from 'react-dom/server'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { templates } from '../libs/templatesData'

function wrapPage (content) {
  return `<div style="width:210mm;min-height:297mm;padding:0;box-sizing:border-box;background:white;">${content}</div>`
}

const PAGE_HEIGHT_PX = 297 * 3.7795
const MINI_HEADER_PX = 40

let measurer = null

function getMeasurer () {
  if (!measurer) {
    const div = document.createElement('div')
    div.style.cssText =
      'position:fixed;left:-9999px;top:0;width:210mm;padding:0;box-sizing:border-box;background:white;z-index:-1;'
    document.body.appendChild(div)
    measurer = { div, root: createRoot(div) }
  }
  return measurer
}

function getItemList (rawData) {
  const exps = rawData.work?.experiences || []
  const projs = rawData.work?.projects || []
  const edus = rawData.education?.educations || []
  return [
    ...exps.map((_, i) => ({ section: 'experience', index: i })),
    ...projs.map((_, i) => ({ section: 'projects', index: i })),
    ...edus.map((_, i) => ({ section: 'education', index: i }))
  ]
}

function buildPageData (rawData, items, includeHeader) {
  const expIndices = new Set(
    items.filter(i => i.section === 'experience').map(i => i.index)
  )
  const projIndices = new Set(
    items.filter(i => i.section === 'projects').map(i => i.index)
  )
  const eduIndices = new Set(
    items.filter(i => i.section === 'education').map(i => i.index)
  )

  return {
    personal: {
      ...rawData.personal,
      contactDetails: includeHeader
        ? rawData.personal.contactDetails
        : {
            fullName: rawData.personal?.contactDetails?.fullName,
            email: '',
            phone: '',
            location: '',
            jobTitle: ''
          },
      onlineLinks: includeHeader ? rawData.personal.onlineLinks : [],
      summary: includeHeader ? rawData.personal.summary : ''
    },
    work: {
      ...rawData.work,
      experiences: (rawData.work?.experiences || []).filter((_, i) =>
        expIndices.has(i)
      ),
      projects: (rawData.work?.projects || []).filter((_, i) =>
        projIndices.has(i)
      )
    },
    education: {
      ...rawData.education,
      educations: (rawData.education?.educations || []).filter((_, i) =>
        eduIndices.has(i)
      ),
      languages: includeHeader ? (rawData.education?.languages || []) : []
    },
    credentials: includeHeader
      ? rawData.credentials
      : {
          skills: [],
          certifications: [],
          achievements: []
        }
  }
}

export function greedyPaginate (rawData, Template, styles) {
  const { div, root } = getMeasurer()
  const items = getItemList(rawData)

  if (items.length === 0) return [{ data: rawData, pageNumber: 1 }]

  const pages = []
  let cursor = 0

  while (cursor < items.length) {
    const pageNum = pages.length + 1
    const isFirst = pageNum === 1
    const availHeight = PAGE_HEIGHT_PX - (isFirst ? 0 : MINI_HEADER_PX)

    let lo = cursor
    let hi = items.length

    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2)
      const pageRaw = buildPageData(rawData, items.slice(cursor, mid), isFirst)
      const pageTransformed = transformResumeData(pageRaw, { styles })
      pageTransformed.pageNumber = pageNum
      pageTransformed.totalPages = 0

      flushSync(() => {
        root.render(<Template data={pageTransformed} />)
      })

      if (div.scrollHeight <= availHeight) {
        lo = mid
      } else {
        hi = mid - 1
      }
    }

    const taken = items.slice(cursor, lo)
    if (taken.length === 0) {
      taken.push(items[cursor])
      cursor++
    } else {
      cursor = lo
    }

    pages.push({
      data: buildPageData(rawData, taken, isFirst),
      pageNumber: pageNum
    })
  }

  flushSync(() => {
    root.render(<></>)
  })

  const totalPages = pages.length
  return pages.map(p => ({ ...p, totalPages }))
}

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

  return wrapPage(content)
}

export async function generatePaginatedResumeHTML (
  resumeData,
  templateName,
  options = {}
) {
  const template = templates.find(t => t.id === templateName)

  if (!template) {
    throw new Error(`Template not found for: ${templateName}`)
  }

  const pages = greedyPaginate(resumeData, template.component, options.styles)

  const pageHtmls = pages.map(({ data: pageData, pageNumber, totalPages }, i) => {
    const transformed = transformResumeData(pageData, options)
    transformed.pageNumber = pageNumber
    transformed.totalPages = totalPages

    const content = ReactDOMServer.renderToStaticMarkup(
      <template.component data={transformed} />
    )

    return wrapPage(content)
  })

  return pageHtmls.join('')
}

export async function generateTailoredResumePDF (
  resumeData,
  templateName,
  fileName,
  options = {}
) {
  const { saveResumeFromHTML } = await import('../services/Program')

  const html = await generatePaginatedResumeHTML(resumeData, templateName, options)

  const result = await saveResumeFromHTML(html, fileName)

  return result
}

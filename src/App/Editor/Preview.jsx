import { useSelector } from 'react-redux'
import { templates } from '../../libs/templatesData'
import ClassicProfessional from '../../assets/templates/ClassicProfessional'
export function Preview () {
  const personal = useSelector(state => state.personal)
  const work = useSelector(state => state.work)
  const education = useSelector(state => state.education)
  const credentials = useSelector(state => state.credentials)
  const { templateId, size, font, weight, height } = useSelector(
    state => state.editor
  )
  const SelectedTemplate =
    templates.find(item => item.id == templateId)?.component ||
    ClassicProfessional
  const getTypeScale = base => ({
    name: base * 2.4,
    sectionHead: base * 1.3,
    jobTitle: base * 1.1,
    body: base * 1.0,
    subtle: base * 0.9
  })

  const typeScale = getTypeScale(size)
  const weightMap = {
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold'
  }

  const styles = {
    fontFamily: font,
    name: {
      size: typeScale.name,
      weight: weightMap[weight] || 'font-bold',
      style: 'normal',
      case: 'none',
      spacing: 2
    },
    sectionHeader: {
      size: typeScale.sectionHead,
      weight: weightMap[weight] || 'font-bold',
      style: 'normal',
      case: 'uppercase',
      spacing: 1
    },
    company: {
      size: typeScale.body,
      weight: weightMap[weight] || 'font-medium',
      style: 'normal',
      case: 'none',
      spacing: 0
    },
    jobTitle: {
      size: typeScale.jobTitle,
      weight: weightMap[weight] || 'font-medium',
      style: 'italic',
      case: 'none',
      spacing: 0
    },
    bodyText: {
      size: typeScale.body,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0,
      leading: height
    },
    date: {
      size: typeScale.subtle,
      weight: 'font-normal',
      style: 'italic',
      case: 'none',
      spacing: 0
    },
    contact: {
      size: typeScale.subtle,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0
    }
  }

  const userData = {
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
      .filter(cert => cert.name)
      .map(cert => ({
        name: cert.name,
        issuer: cert.organization,
        year: cert.year
      })),
    achievements: credentials.achievements
      .filter(ach => ach.achievement)
      .map(ach => ach.achievement),
    styles
  }

  return (
    <section
      id='resume-preview'
      className='bg-white rounded-xl w-[210mm] h-[297mm] shadow-2xl p-12'
    >
      <SelectedTemplate data={userData} />
    </section>
  )
}

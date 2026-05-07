import { useSelector } from 'react-redux'
import { templates } from '../../libs/templatesData'
import ClassicProfessional from '../../assets/templates/ClassicProfessional'
import { THEME_COLORS } from './ThemeSelector'
import { transformResumeData } from '../../utils/renderResume'

export function Preview () {
  const personal = useSelector(state => state.personal)
  const work = useSelector(state => state.work)
  const education = useSelector(state => state.education)
  const credentials = useSelector(state => state.credentials)
  const { templateId, size, font, weight, height, theme, contrast } = useSelector(
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

  const themeColors = THEME_COLORS[theme || 'monochrome'] || THEME_COLORS.monochrome

  const applyContrast = hex => {
    if (!hex) return hex
    const factor = Number(contrast) || 1
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.min(255, Math.max(0, Math.floor(((num >> 16) & 0xff) / factor)))
    const g = Math.min(255, Math.max(0, Math.floor(((num >> 8) & 0xff) / factor)))
    const b = Math.min(255, Math.max(0, Math.floor((num & 0xff) / factor)))
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  }

  const styles = {
    fontFamily: font,
    name: {
      size: typeScale.name,
      weight: weightMap[weight] || 'font-bold',
      style: 'normal',
      case: 'none',
      spacing: 2,
      color: applyContrast(themeColors.name)
    },
    sectionHeader: {
      size: typeScale.sectionHead,
      weight: weightMap[weight] || 'font-bold',
      style: 'normal',
      case: 'uppercase',
      spacing: 1,
      color: applyContrast(themeColors.sectionHeader)
    },
    company: {
      size: typeScale.body,
      weight: weightMap[weight] || 'font-medium',
      style: 'normal',
      case: 'none',
      spacing: 0,
      color: applyContrast(themeColors.company)
    },
    jobTitle: {
      size: typeScale.jobTitle,
      weight: weightMap[weight] || 'font-medium',
      style: 'italic',
      case: 'none',
      spacing: 0,
      color: applyContrast(themeColors.jobTitle)
    },
    bodyText: {
      size: typeScale.body,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0,
      leading: height,
      color: applyContrast(themeColors.bodyText)
    },
    date: {
      size: typeScale.subtle,
      weight: 'font-normal',
      style: 'italic',
      case: 'none',
      spacing: 0,
      color: applyContrast(themeColors.date)
    },
    contact: {
      size: typeScale.subtle,
      weight: 'font-normal',
      style: 'normal',
      case: 'none',
      spacing: 0,
      color: applyContrast(themeColors.contact)
    }
  }

  const userData = transformResumeData(
    { personal, work, education, credentials },
    { styles }
  )

  return (
    <section
      id='resume-preview'
      className='bg-white rounded-xl w-[210mm] h-[297mm] shadow-2xl p-12'
    >
      <SelectedTemplate data={userData} />
    </section>
  )
}

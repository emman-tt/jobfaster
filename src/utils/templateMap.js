const TEMPLATE_MAP = {
  'classic-professional': 1,
  'modern-minimalist': 2,
  'executive-summary': 3,
  'technical-focused': 4,
  'ats-optimized': 5,
  'academic-style': 1
}

export function getLayoutIdFromTemplate (templateName) {
  return TEMPLATE_MAP[templateName?.toLowerCase()] || 1
}

export function getTemplateNameFromLayout (layoutId) {
  const entry = Object.entries(TEMPLATE_MAP).find(([, id]) => id === layoutId)
  return entry ? entry[0] : 'classic-professional'
}
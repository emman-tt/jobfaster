const getTextValue = item => {
  if (typeof item === 'string') return item
  if (typeof item?.text === 'string') return item.text
  return ''
}

export function transformResumeData (aiResponse) {
  if (!aiResponse?.personal) {
    return {}
  }

  const { personal, work, education, credentials } = aiResponse

  return {
    name: personal?.contactDetails?.fullName || '',
    email: personal?.contactDetails?.email || '',
    phone: personal?.contactDetails?.phone || '',
    location: personal?.contactDetails?.location || '',
    jobTitle: personal?.contactDetails?.jobTitle || '',
    linkedin: personal.onlineLinks || [],
    summary: personal?.summary || '',
    experience:
      work?.experiences
        ?.filter(exp => exp.company || exp.position)
        ?.map(exp => ({
          id: exp.id,
          company: exp.company,
          position: exp.position,
          location: exp.location,
          startYear: exp.startYear,
          endYear: exp.endYear,
          accomplishments: exp.accomplishments?.map(getTextValue) || []
        })) || [],
    education:
      education?.educations
        ?.filter(edu => edu.school || edu.degree)
        ?.map(edu => ({
          id: edu.id,
          school: edu.school,
          degree: edu.degree,
          field: edu.field,
          startYear: edu.startYear,
          endYear: edu.endYear,
          highlights: edu.highlights?.map(getTextValue) || []
        })) || [],
    skills:
      credentials?.skills?.flatMap(skill => {
        if (Array.isArray(skill.list)) return skill.list.map(getTextValue)
        if (typeof skill.list === 'string') return skill.list
        return []
      }) || [],
    languages:
      education?.languages
        ?.filter(lang => lang.language)
        ?.map(lang => ({
          name: lang.language,
          proficiency: lang.proficiency
        })) || [],
    projects:
      work?.projects
        ?.filter(proj => proj.name || proj.description)
        ?.map(proj => ({
          id: proj.id,
          name: proj.name,
          description: proj.description,
          techStack: proj.techStack?.map(getTextValue) || [],
          link: proj.link,
          github: proj.github
        })) || [],
    certificates:
      credentials?.certificates
        ?.filter(cert => cert.name)
        ?.map(cert => ({
          name: cert.name,
          issuer: cert.issuer,
          year: cert.year
        })) || [],
    achievements:
      credentials?.achievements
        ?.filter(ach => ach.achievement)
        ?.map(ach => getTextValue(ach.achievement)) || []
  }
}

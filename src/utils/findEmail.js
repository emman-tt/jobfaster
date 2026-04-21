export function findEmail (text) {
  if (!text) return null

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const matches = text.match(emailRegex)

  if (matches && matches.length > 0) {
    return matches[0]
  }

  return null
}

export function getApplyInfo (job) {
  const hasApplyLink = !!job.jobApplyLink
  const email = findEmail(job.jobDescription)

  return {
    hasApplyLink,
    email,
    canApplyOnApp: !!email,
    canApplyExternal: hasApplyLink
  }
}
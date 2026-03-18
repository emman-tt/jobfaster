export function validateContact (data) {
  const { fullName, phone, location, email } = data.contactDetails
  // const skills = data.skillsAndTools
  const education = data.education

  const errors = {}
  let hasError = false
  if (!fullName.trim()) {
    errors.fullName = 'Name is required.'
    hasError = true
  }
  if (fullName.trim().length < 2) {
    errors.fullName = 'Enter a valid full name.'
    hasError = true
  }

  // const phoneRegex = /^\+?[\d\s\-()]{7,15}$/
  if (!phone.trim()) {
    errors.phone = 'Phone number is required.'
    hasError = true
  }
  // if (!phoneRegex.test(phone)) {
  //   errors.phone = 'Use an international format'
  //   hasError = true
  // }

  if (!location.trim()) {
    errors.location = 'Location is required.'
    hasError = true
  }
  if (location.length < 3) {
    errors.location = 'Enter city and country.'
    hasError = true
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.trim()) {
    errors.email = 'Email is required.'
    hasError = true
  }
  if (!emailRegex.test(email)) {
    errors.email = 'Invalid email address.'
    hasError = true
  }

  // if (skills.length < 3 || !skills) {
  //   hasError = true
  //   errors.skillsAndTools = 'Must have  at least three (3)'
  // }

  const atLeastOneFilled = education.find(item => {
    const { level, instituition, degree, startYear, endYear } = item

    return (
      level.trim() ||
      instituition.trim() ||
      degree.trim() ||
      startYear.trim() ||
      endYear.trim()
    )
  })

  if (!atLeastOneFilled) {
    hasError = true
    errors.education = 'Fill at least one education details'
  }

  return {
    errors,
    hasError
  }
}

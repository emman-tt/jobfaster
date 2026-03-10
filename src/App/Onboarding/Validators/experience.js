export const validateExperience = experienceArray => {
  let hasError = false

  const errors = experienceArray.map(exp => {
    const itemErrors = {}

    const followUpKeys = [
      'summary',
      'toolsAndSoftware',
      'metricsAndValues',
      'majorChallengeSolved',
      'teamAbilities',
      'finalResult'
    ]

    // 2. Count how many are actually filled out
    const answeredCount = followUpKeys.filter(
      key => exp[key]?.trim().length > 0
    ).length

    // 3. Apply your rules
    if (!exp.summary || exp.summary.trim().length < 10) {
      itemErrors.summary = 'A brief summary of your role is required.'
    }

    if (answeredCount < 3) {
      // General error message if they haven't hit the "3 answers" threshold
      itemErrors.general = `Please answer at least ${
        3 - answeredCount
      } more questions to strengthen this experience.`
    }

    if (Object.keys(itemErrors).length > 0) hasError = true
    return itemErrors
  })

  return { hasError, errors }
}

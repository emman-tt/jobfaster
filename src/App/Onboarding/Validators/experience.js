export const validateExperience = experienceArray => {
  let hasError = false

  const errors = experienceArray.map(exp => {
    const itemErrors = {}

    const followUps = [
      'toolsAndSoftware',
      'metricsAndValues',
      'majorChallengeSolved',
      'teamAbilities',
      'finalResult'
    ]

    const answeredCount = followUps.filter(
      key => exp[key]?.trim().length > 0
    ).length

    if (!exp.summary || exp.summary.trim().length < 10) {
      itemErrors.summary = 'A brief summary of your role is required.'
    }

    if (answeredCount < 3) {
      itemErrors.followUps = `Please answer at least ${
        3 - answeredCount
      } more questions to strengthen this experience.`
    }

    if (Object.keys(itemErrors).length > 0) {
      hasError = true
      itemErrors.id = exp.id
    }
    return itemErrors
  })

  return { hasError, errors }
}

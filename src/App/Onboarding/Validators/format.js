export function ValidateFormat (data) {
  const { onlineLinks, relevantBulletCount, lessRelevantBulletCount } = data
  let hasError = false
  let error = {
    onlineLinks: []
  }

  onlineLinks.map(item => {
    const isEmpty = !item.link.trim()

    if (isEmpty) {
      hasError = true
      error.onlineLinks.push(item.name)
    }
    return item
  })

  if (Number(relevantBulletCount) < 3 || Number(relevantBulletCount) > 9) {
    hasError = true
    error.relevantBulletCount =
      'Input should  fall within the standard range of  3 - 9'
  }
  if (
    Number(lessRelevantBulletCount) < 1 ||
    Number(lessRelevantBulletCount) > 5
  ) {
    hasError = true
    error.irrelevantBulletCount =
      'Input should  fall within the standard range of 1 - 5'
  }

  return {
    hasError,
    error
  }
}

export function ValidateFormat (data) {
  const { onlineLinks } = data
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

  return {
    hasError,
    error
  }
}

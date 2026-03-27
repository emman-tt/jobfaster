 export const getAllFiles = programs => {
    const allFiles = []
    programs.forEach(item => {
      if (item.type === 'file') {
        allFiles.push(item)
      } else if (item.type === 'folder' && item.files) {
        allFiles.push(...item.files)
      }
    })

    return allFiles
    // .sort(
    //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    // )
  }
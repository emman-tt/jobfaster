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

  }
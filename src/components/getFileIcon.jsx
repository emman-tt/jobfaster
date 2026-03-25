export const GetFileIcon = ({ extension, size = 23 }) => {
  if (extension == 'pdf') {
    return (
      <img
        width={size}
        height={size}
        src='https://img.icons8.com/color/48/pdf-2--v1.png'
        alt='pdf-2--v1'
      />
    )
  } else {
    return (
      <img
        width={size}
        height={size}
        src='https://img.icons8.com/color/48/microsoft-word-2019--v2.png'
        alt='microsoft-word-2019--v2'
      />
    )
  }
}

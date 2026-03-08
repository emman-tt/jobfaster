import { Plus } from "lucide-react"

export const AddNewButton = ({ className, text = 'Add new',children }) => {
  return (
    <button
      className={`rounded-2xl bg-orange-100 gap-2 items-center cursor-pointer text-orange-600 justify-center    text-sm    flex  text-center font-semibold ${className}`}
    >
      {children} {text}
    </button>
  )
}

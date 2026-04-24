import { useDraggable } from '@dnd-kit/react'
import { useDroppable } from '@dnd-kit/react'
import { useSortable } from '@dnd-kit/react/sortable'

export function Sortable ({ id, index, children, className }) {
  const { ref } = useSortable({ id, index })

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

export function Draggable ({ itemId, children }) {
  const { ref } = useDraggable({
    id: itemId
  })

  return <div ref={ref}>{children}</div>
}

export function Droppable ({ id, children }) {
  const { ref } = useDroppable({
    id: id
  })

  return <div ref={ref}>{children}</div>
}

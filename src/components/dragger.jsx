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

export function Draggable ({ itemId, children, parentId }) {
  const { ref } = useDraggable({
    id: itemId,
    data: {
      parentId: parentId || null
    }
  })

  return <div ref={ref} data-item-id={itemId}>{children}</div>
}

export function Droppable ({ id, children, className }) {
  const { ref } = useDroppable({
    id: id
  })

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

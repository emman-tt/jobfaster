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

export function Draggable ({ itemId, children, parentId, disabled, data }) {
  const { ref } = useDraggable({
    id: itemId,
    data: data,
    disabled
  })

  return (
    <div ref={ref} data-item-id={itemId}>
      {children}
    </div>
  )
}

export function Droppable ({ id, children, className, data }) {
  const { ref } = useDroppable({
    id: id,
    data: data
  })

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

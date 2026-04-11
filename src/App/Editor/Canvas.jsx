import { useRef, useState } from 'react'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import Steps from './Steps'

export default function Canvas () {
  const [scale, setScale] = useState(55)
  const [position, setPosition] = useState({ x: 100, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const elementRef = useRef(null)

  const handleMouseDown = e => {
    isDragging.current = true
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  const handleMouseMove = e => {
    if (!isDragging.current) return
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    })
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const zoomIn = () => setScale(s => Math.min(s + 10, 200))
  const zoomOut = () => setScale(s => Math.max(s - 10, 30))
  const resetView = () => {
    setScale(60)
    setPosition({ x: 200, y: 0 })
  }

  return (
    <section className='relative w-full z-30 grow h-full flex items-center justify-center overflow-hidden'>
      <div
        ref={elementRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${
            scale / 100
          })`
        }}
        className='origin-center cursor-grab active:cursor-grabbing'
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Preview />
      </div>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/60  backdrop-blur-xl border border-white/40 shadow-lg'>
        <button
          onClick={zoomOut}
          className='p-1.5 cursor-pointer rounded-lg transition-colors text-white'
        >
          <ZoomOut size={18} />
        </button>

        <span className='w-14 cursor-pointer text-center text-sm font-semibold font-satoshi text-white'>
          {scale}%
        </span>

        <button
          onClick={zoomIn}
          className='p-1.5 cursor-pointer rounded-lg transition-colors text-white'
        >
          <ZoomIn size={18} />
        </button>

        <div className='w-px h-5 bg-gray-300/50 mx-1' />

        <button
          onClick={resetView}
          className='p-1.5 cursor-pointer rounded-lg transition-colors text-white'
          title='Reset'
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </section>
  )
}

function Preview () {
  return (
    <section className='bg-white rounded-xl w-[210mm] h-[297mm] shadow-2xl p-12'>
      <div className='space-y-4'>
        <div className='h-8 bg-gray-200 rounded w-3/4' />
        <div className='h-4 bg-gray-100 rounded w-1/2' />
        <div className='h-4 bg-gray-100 rounded w-full' />
        <div className='h-4 bg-gray-100 rounded w-5/6' />
        <div className='h-24 bg-gray-100 rounded w-full mt-6' />
        <div className='h-4 bg-gray-200 rounded w-full mt-6' />
        <div className='h-4 bg-gray-100 rounded w-full' />
        <div className='h-4 bg-gray-100 rounded w-4/5' />
      </div>
    </section>
  )
}

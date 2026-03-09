// hooks/useClickOutside.js
import { useEffect, useRef } from 'react'

/**
 * Custom hook that detects clicks outside a specified element
 * @param {Function} callback - Function to call when click outside occurs
 * @returns {Object} ref - Ref to attach to the element you want to monitor
 */
function useClickOutside (callback) {
  const ref = useRef(null)

  useEffect(() => {
    // Handler to call on outside click
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside) // For mobile

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [callback])

  return ref
}

export default useClickOutside

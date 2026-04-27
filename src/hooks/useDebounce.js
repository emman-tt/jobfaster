import { useRef, useCallback } from 'react'

/**
 * Debounce hook to limit the rate at which a function can fire
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {Function} Debounced function
 */
export function useDebounce (fn, delay = 300) {
  const timeoutRef = useRef(null)

  const debouncedFn = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay]
  )

  return debouncedFn
}

/**
 * Hook that returns a value that's debounced
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {any} Debounced value
 */
export function useDebouncedValue (value, delay = 300) {
  const timeoutRef = useRef(null)

  const debouncedValue = useCallback(() => value, [value])

  return debouncedValue
}

export default useDebounce
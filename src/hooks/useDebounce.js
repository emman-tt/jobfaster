import { useRef, useCallback, useState, useEffect } from 'react'

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

export function useDebouncedValue (value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
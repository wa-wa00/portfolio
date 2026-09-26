import { useState, useEffect, useRef } from 'react'

/**
 * Fires once when the element enters the viewport.
 * Returns [ref, isVisible]
 */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

export default useInView

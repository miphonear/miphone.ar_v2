'use client'
import { useEffect } from 'react'

export default function OpinionesGoogle() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://static.elfsight.com/platform/platform.js'
      script.async = true
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="elfsight-app-64f6b24a-f6f5-41ae-b9cb-3d01fe9b56e3" data-elfsight-app-lazy></div>
  )
}

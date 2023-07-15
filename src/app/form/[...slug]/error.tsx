'use client'

import { useEffect } from "react"


export default function Error({
  error,
  reset
} : {
  error: Error,
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Question not found</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </div>
  )
}
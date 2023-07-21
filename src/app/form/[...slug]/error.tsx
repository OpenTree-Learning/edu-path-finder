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
      <a href="#" onClick={() => reset()}>Réessayer</a>
      <a href="/">Revenir à l'acceuil</a>
    </div>
  )
}
'use client'

import { useEffect } from "react"
import EndPage from "./end"


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
    <EndPage>
      <h2>Question not found</h2>
      <p>{error.message}</p>
      <a href="#" onClick={() => reset()}>Réessayer</a>
    </EndPage>
  )
}
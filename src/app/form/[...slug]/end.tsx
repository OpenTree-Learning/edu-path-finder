'use client'


import { useRouter } from 'next/navigation'
import { useAppDispatch  } from '../../../store/hooks'

import { reset } from '../../../store/features/responses'



export default async function EndPage ({ children }: any) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleRestart = () => {
    dispatch(reset())
    router.push('/')
  }

  return (
    <div style={{textAlign: 'center'}}>
      { children }
      <button onClick={handleRestart}>Restart form</button>
    </div>
  )
}

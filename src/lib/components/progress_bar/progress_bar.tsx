'use client'


import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useAppSelector  } from 'store/hooks'
import { BarLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faFlag } from '@fortawesome/free-solid-svg-icons'
import styles from './progress_bar.module.scss'



function ProgressBar () 
{
  const [total, setTotal] = useState<number>(0)
  const [submitted, setSubmitted] = useState<number>(0)
  const [display, setDisplay] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(0)
  const [stepWidth, setStepWidth] = useState<number>(0)

  const questions = useAppSelector((state: any) => state.persistedQuestionsReducer.questions)
  const history = useAppSelector((state: any) => state.persistedQuestionsReducer.history)
  const nextPossibleQuestions = useAppSelector((state: any) =>
    state.persistedQuestionsReducer.nextPossibleQuestions)

  const barRef = useRef(null);


  useEffect(() => {
    if (questions && Array.isArray(questions)) {
      setTotal(history.length + nextPossibleQuestions.length)
    }
    if (history && Array.isArray(history)) {
      setSubmitted(history.length + 1)
      setDisplay(true)
    }
  }, [questions, history])

  useLayoutEffect(() => {
    if (barRef.current) {
      // @ts-ignore
      const rect = barRef.current.getBoundingClientRect()

      setWidth(rect.width)
    
      if (total > 0) {
        setStepWidth(Math.floor(rect.width / total))
      }
    }
  }, [display])


  return (
    <div className={styles.progressBar} >
      <div>
        <FontAwesomeIcon 
          icon={faQuestionCircle}
          color={'#ffffff'}
          size='2x'
        />
      </div>
      {display ? (
        <div className={styles.bar} ref={barRef}>
          {history.map((_: any, idx: number) => (
            <span style={{width: stepWidth}} key={idx}/>
          ))}
        </div>
      ) : (
        <BarLoader height={6} speedMultiplier={0.4} />
      )}
      <div>
        <FontAwesomeIcon 
          icon={faFlag}
          color={'#ffffff'}
          size='2x'
        />
      </div>
    </div>
  )
}

export default ProgressBar
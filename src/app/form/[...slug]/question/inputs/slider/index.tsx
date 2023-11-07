'use client'


import { Field, useField, useFormikContext } from 'formik'
import { useState, useRef, useEffect, use } from 'react'
import { copyAndDelete } from '../../../../../../utils/helpers/object' 
import styles from './style.module.scss'
import responses from 'store/features/responses'



interface SliderProps {
  min: number
  max: number
  step: number,
  inputName: string,
  defaultValue: number
  questionId: string
}


export default function SliderInput ({ 
  min,
  max, 
  step,
  unitName,
  defaultValue,
  questionId
}: SliderInputProps
) {
  const [value, setValue] = useState(defaultValue)

  const { setFieldValue, submitForm } = useFormikContext()

  const totalSteps = Math.abs(max - min)


  function parseInput (e: any): number {
    const value: string = e?.target?.value as string
    const parsedValue: number = Number(value) as number

    return parsedValue
  }

  function handleChange (e: any) {
    setValue(parseInput(e))
    e.stopPropagation()
  }

  function handleMouseUp (e: any) {
    setFieldValue('response', {
      ids: [parseInput(e)],
      questionId: questionId
    })
    submitForm()
  }

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        className={styles.input}
      />
      <p className='h4'>
        <span className={styles.value}>{ value }</span> { unitName }
      </p>
    </div>
  )
}
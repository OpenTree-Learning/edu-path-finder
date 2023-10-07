'use client'


import { Field, useField, useFormikContext } from 'formik'
import { useState } from 'react'
import { copyAndDelete } from '../../../../../utils/helpers/object' 


//const NewInput = (props) => {
//  const setRef = useCallback((el) => {
//    el.onchange = props.onChange || null;
//  }, [props.onChange]);
//  return <input ref={setRef} {...props} />
//}

interface SliderProps {
  min: number
  max: number
  step: number
}


interface SliderWrapperProps extends SliderProps {
  value: number,
  onChange: (e: Event) => any
}

//function SliderWrapper ({
//  min,
//  max, 
//  step,
//  value,
//  inputProps,
//  onChange
//}: SliderWrapperProps) {
//
//  const setRef = useCallback((element: HTMLElement | null) => {
//    if (element) {
//      element.onmouseup = onChange || null
//    }
//  }, [onChange])
//
//  return <input
//    ref={setRef}
//    type="range"
//    min={min}
//    max={max}
//    step={step}
//    value={value}
//    {...inputProps}
//  />
//}


interface SliderInputProps extends SliderProps {
  defaultValue: number
  questionId: string
}

function SliderInput ({ 
  min,
  max, 
  step,
  defaultValue,
  questionId
}: SliderInputProps
) {
  const [value, setValue] = useState(defaultValue)
  const { setFieldValue, submitForm } = useFormikContext()

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
    <>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        className='input-default'
      />
      {/*
      <SliderWrapper
        min={min}
        max={max}
        step={step}
        value={value}
        inputProps={inputProps}
        onChange={handleChange}
      />
      */}
      <p>{ value }</p>
    </>
  )
}


export default function Slider (props: any) {
  const { min, max, step, defaultValue, questionId } = props

  return <SliderInput
    min={min}
    max={max}
    step={step}
    defaultValue={defaultValue}
    questionId={questionId}
  />
}
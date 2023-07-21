'use client'


import { Field } from 'formik'
import { useState } from 'react'
import { copyAndDelete } from '../../../../../utils/utils'


interface SliderInputProps {
  min: number
  max: number
  step: number
  inputProps: any
}

function SliderInput ({ 
  min,
  max, 
  step,
  inputProps
}: SliderInputProps
) {
  const [value, setValue] = useState(min)

  function handleChange (e: any) {
    const value: string = e?.target?.value as string
    const parsedValue: number = Number(value) as number

    setValue(parsedValue)
  }

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
      <p>{ value }</p>
    </div>
  )
}


export default function Slider (props: any) {
  const sliderProps = { ...props }
  const { min, max, step } = copyAndDelete(sliderProps, ['min', 'max', 'step'])
  const inputProps = { min, max, step, inputProps: sliderProps }

  return <Field
    type="slider"
    id="response"
    name="response"
    inputProps={inputProps} 
    component={SliderInput}
  />
}
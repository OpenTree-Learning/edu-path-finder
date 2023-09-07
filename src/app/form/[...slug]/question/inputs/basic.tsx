'use client'


import { Field } from 'formik'
import { useFormikContext } from 'formik'
import { copyAndDelete } from '../../../../../utils/helpers/object'


function BasicInput (props: any) {
  const { setFieldValue, submitForm } = useFormikContext()
  const { type } = copyAndDelete(props, ['type', 'id', 'name'])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFieldValue('response', {
      ids: [e.target.value],
      questionId: props.questionId
    })
    submitForm()
    e.stopPropagation()
  }

  delete props.defaultValue

  return <input 
    type={type}
    id='response'
    name='response' 
    onChange={handleChange}
    {...props}
  />
}

export const Text = (props: any) => <BasicInput {...props} type='text' />
export const Number = (props: any) => <BasicInput {...props} type='number' />
export const Email = (props: any) => <BasicInput {...props} type='email' />
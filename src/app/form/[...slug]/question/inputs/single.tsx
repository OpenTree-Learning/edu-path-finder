'use client'


import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { Response } from '../../../../../types/question'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import loadFontAwesomeIcon, { getIconShortName } from './utils/load_font_awesome_icon'



export default function Single (props: any) {
  const { setFieldValue, submitForm } = useFormikContext()
  const responses: Response [] = props.responses as Response []


  useEffect(() => {
    responses.forEach((response: Response) => {
      loadFontAwesomeIcon(response.iconName)
      .then((icon: any) => library.add(icon))
      .catch((err: any) => console.log(err))
    })
    
  }, [responses])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setFieldValue('response', {
      ids: [e.target.value],
      questionId: props.questionId
    })
    submitForm()
    e.stopPropagation()
  }

  return (
    <div>
      {responses.map((response: Response, idx: number) => (
        <div
          key={idx}
        >
          <FontAwesomeIcon 
            // @ts-ignore
            icon={getIconShortName(response.iconName)}
          />
          <span>{ response.text }</span>
        </div>
      ))}
    </div>
  )

  /*
  return (
    <>
      {responses.map((response: Response, idx: number) => (
        <label
          key={idx}
          className='select-item'
        >
          <input
            type="radio"
            id={response.id}
            name="response"
            value={response.id}
            onChange={handleChange}
            className='input-default select-item'
          />
          { response.text }
        </label>
      ))}
    </>
  )
  */

}
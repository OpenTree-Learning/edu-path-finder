'use client'


import { use, useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import { Response } from '../../../../../../types/question'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, IconName, IconProp, icon, library } from '@fortawesome/fontawesome-svg-core'
import loadFontAwesomeIcon, { getIconShortName } from '../utils/load_font_awesome_icon'

import styles from './style.module.scss'



type IconNameDefinitionMap = Record<IconName, IconDefinition>


export default function Single (props: any) {
  const [icons, setIcons] = useState<Record<string, IconDefinition>>({} as IconNameDefinitionMap)

  const { setFieldValue, submitForm } = useFormikContext()
  const responses: Response [] = props.responses as Response []


  useEffect(() => {
    if (Object.keys(icons).length > 0) {
      return
    }

    let newIcons = {} as any

    for (const response of responses) {
      if (response.iconName) {
        const icon = loadFontAwesomeIcon(response.iconName) as IconDefinition
        const newIcon = icon as any;
        const newIconName = icon.iconName as string;

        newIcons[newIconName] = icon
      }
    }

    setIcons(newIcons)
    
  }, [responses])


  const handleChange = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const response: Response = responses[idx]
    // @ts-ignore
    setFieldValue('response', {
      ids: [response.id],
      questionId: props.questionId
    })
    submitForm()
    e.stopPropagation()
  }

  const renderIcon = (response: Response) => {
    const iconName = response.iconName
    const iconShortName = getIconShortName(iconName)
    const icon = icons[iconShortName as IconName]

    if (!icon) {
      return <div>Loading...</div>
    }

    return <FontAwesomeIcon icon={icon}/>
  }

  return (
    <div>
      {responses.map((response: Response, idx: number) => (
        <div
          key={idx}
          className={`select-item ${styles.responseItem}`}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => handleChange(e, idx)}
        >
          {icons && renderIcon(response)}
          <span>{ response.text }</span>
        </div>
      ))}
    </div>
  )
}
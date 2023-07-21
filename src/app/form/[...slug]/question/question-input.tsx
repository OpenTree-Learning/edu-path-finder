import { ReactElement } from 'react'
import { Question, InputType } from '../../../../types/question'
import inputTypeComponentMap from './question-input-map'


interface QuestionInputProps {
  question: Question
}

export default function QuestionInput ({
  question
}: QuestionInputProps) {
  const { responses, inputType, inputProps } = question
  const Input: React.ComponentType<any> = inputTypeComponentMap[inputType]

  return <Input responses={responses} {...inputProps} />
}
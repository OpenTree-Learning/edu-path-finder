import { Question, InputType } from '../../../../types/question'
import inputTypeComponentMap from './question-input-map'


interface QuestionInputProps {
  question: Question
}

export default function QuestionInput ({
  question
}: QuestionInputProps) {
  const { questionId, responses, inputType, inputProps } = question
  const Input: React.ComponentType<any> = inputTypeComponentMap[inputType]

  return <Input questionId={questionId} responses={responses} {...inputProps} />
}
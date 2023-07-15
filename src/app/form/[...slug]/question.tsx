import Question from "../../../types/question"


export interface QuestionProps {
  question: Question
}

export default function Question(
  { question }: QuestionProps
) {
  return <p>Current question: { JSON.stringify(question) }</p>
}

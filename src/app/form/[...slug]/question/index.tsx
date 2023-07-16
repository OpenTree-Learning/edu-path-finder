import Question from "../../../../types/question"


export interface QuestionProps {
  question: Question
}

export default function Question(
  { question }: QuestionProps
) {
  return (
    <div className="questionLayout" id={ `question_${question.id}` }>
      <div className="title">
        <h3>{ question.text }</h3>
      </div>
      <div className="input"></div>
    </div>
  )
}

import Question from "../../../types/question"


// TODO: Create a component for each inputType field value.
//
// TODO: Load the matching component when next question is loaded.
//
// TODO: Store in the cache the question answer into an history.
//
// TODO: Write a function that takes as input two parameters:
//       - the JSON of the question containing the logic.
//       - the history of questions with their answers 
//         so that the form customize itself for the student.
//
//

export interface QuestionProps {
  question: Question
}

export default function Question(
  { question }: QuestionProps
) {
  return <p>Current question: { JSON.stringify(question) }</p>
}

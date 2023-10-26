import { Question, Condition, ConditionOperator, QuestionConditions, Response } from 'types/question'



export function getQuestionFromId(
  questionId: string,
  questions: Question []
): Question 
{
  const question: Question = questions.find(
    (question: Question) => question.questionId == questionId
  ) as Question

  return question
}


export function getQuestionResponses(
  questionId: string,
  questions: Question []
): string []
{
  const question: Question = getQuestionFromId(questionId, questions)
  
  if (!question) {
    return []
  }
  return question.responses.map((response: Response) => response.id)
}


export function getResponseConditions(
  questionId: string,
  condition: Condition,
  operator: ConditionOperator,
  questions: Question []  
): QuestionConditions 
{
  if (operator == 'comparison') {
    return condition.condition.comparison as QuestionConditions
  }

  return getQuestionResponses(questionId, questions)
}
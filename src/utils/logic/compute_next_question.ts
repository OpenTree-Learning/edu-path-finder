'use client'


import {
  ResponseHistory,
  Question,
  Response,
  Condition,
  NumericalComparison,
  ConditionsOperator,
  ProcessPossibleQuestion,
  ProcessResponses,
  ConditionOperator,
  SubmitedResponse,
  QuestionConditions
} from '../../types/question'


import { getQuestionFromId, getQuestionResponses, getResponseConditions } from './get_question'



function processResponsesLogical(
  questionId: string,
  conditions: QuestionConditions,
  history: ResponseHistory,
  operator: ConditionOperator
): boolean
{
  const submittedResponse = history.find((response: SubmitedResponse) => response.questionId === questionId)

  if (!submittedResponse) {
    return false
  }
  //
  // TODO: Fix this bug:
  //
  // "TypeError: Cannot read properties of undefined (reading 'ids')"
  //
  // Reason: The slider on conding_experience question still emit onChange event
  //         when next question is loaded. As the next question a question id as input
  //         and not a numerical value as the slider sends.
  //         This it throws the error above.
  //
  const submittedResponses = (submittedResponse as SubmitedResponse).ids as string []
  const isResponseIncluded = ((response: string) => submittedResponses.includes(response))

  if (operator === 'AND') {
    return conditions.every((response: string | NumericalComparison) => isResponseIncluded(response as string))
  }
  return conditions.some((response: string | NumericalComparison) => submittedResponses.includes(response as string))
}


function processResponsesNumerical(
  questionId: string,
  conditions: QuestionConditions,
  history: ResponseHistory,
): boolean
{
  // TODO: Make sure this function works (need to test with comparison condition).
  const submittedResponse = history.find((response: SubmitedResponse) => response.questionId === questionId)

  if (!submittedResponse) {
    return false
  }

  const submittedValue = Number(submittedResponse?.ids[0]) as number
  const processComparison = {
    '=': (a: number, b: number) => a == b,
    '!=': (a: number, b: number) => a != b,
    '>=': (a: number, b: number) => a >= b,
    '<=': (a: number, b: number) => a <= b,
  }
  let conditonsBool: boolean [] = []

  for (const response of conditions) {
    const {type, value} = response as NumericalComparison
    const comparison: boolean = processComparison[type](submittedValue, value) as boolean

    conditonsBool.push(comparison)
  }

  return conditonsBool.every(condition => !!condition)
}


const processPossibleQuestion: ProcessPossibleQuestion =
{
  AND: (conditions: boolean []): boolean => conditions.every((e: boolean) => !!e),
  OR: (conditions: boolean []): boolean => conditions.some((e: boolean) => !!e)
}


const processResponses: ProcessResponses =
{
  AND: (questionId: string, conditions: QuestionConditions, history: ResponseHistory) => 
    processResponsesLogical(questionId, conditions, history, 'AND'),
  OR: (questionId: string, conditions: QuestionConditions, history: ResponseHistory) => 
    processResponsesLogical(questionId, conditions, history, 'OR'),
  comparison: processResponsesNumerical
}



export default function computeNextQuestion (
  currentQuestion: Question,
  history: ResponseHistory,
  questions: Question []
): string
{
  /**
   * 
   * 1. Read the next question conditions.
   * 
   */
  const { nextQuestions }: Question = currentQuestion

  if (!nextQuestions || nextQuestions.length === 0) {
    return ''
  }
  /**
   * 
   * 2. Iterate over each next possible question and their conditions.
   * 
   */
  for (let i = 0; i < nextQuestions.length; i++) {
    /**
     * 
     * 3. Variables explanation:
     * 
     *    - question: The current next possible question with its conditions to be the next question.
     * 
     *    - questionId: The id of the next possible question to be able to retrieve the matching question later.
     * 
     *    - operator: Two possible values that process the array of conditions:
     *        - AND: All the conditions must be validated to be redirected to the current next possible question
     *        - OR: At least one condition must be validated to be redirected to the current next possible question
     * 
     *    - conditions: The array of conditions that is stored in a 'AND' or 'OR' field.
     * 
     *    - results: For each condition of the array of conditions, true value is pushed if the condition 
     *               is validated, false otherwise.
     * 
     */
    const question = nextQuestions[i]
    const questionId: string = question.id

    /**
     * 
     * If this next possible question has no conditions it's considered as valid.
     * So it's the next question.
     * 
     */
    if (!question.conditions) {
      return questionId
    }

    const operator: ConditionsOperator = Object.keys(question.conditions)[0] as ConditionsOperator
    const conditions: Condition [] = question.conditions[operator] as Condition []

    let results: boolean [] = []

    /**
     * 
     * 4. Iterate over each response conditions to know if the current possible question is the next one
     * displayed in the form.
     * 
     */
    for (const condition of conditions) {
      /**
       * 
       * 5. Variables explanation:
       * 
       *    - responseId: Id of the current response, the id is used to retrieve the response data.
       * 
       *    - conditionOperator: Two possible values that process the array of conditions:
       *        - AND: All the conditions must be validated to be redirected to the current next possible question
       *        - OR: At least one condition must be validated to be redirected to the current next possible question
       * 
       *    - conditions: The conditions to validate of the current response.
       * 
       *    - processResponse: The function that returns true if the response conditions are validated,
       *                       false otherwise.
       * 
       *    - processResponseResult: The value returned by the processResponse() function.
       * 
       */
      const responseId = condition.id
      const conditionOperator: ConditionOperator = Object.keys(condition.condition)[0] as ConditionOperator
      const conditions = getResponseConditions(responseId, condition, conditionOperator, questions)

      /**
       * 
       * If we don't find the question in the memory with questionId as id we admit that the current
       * question conditions are not valid.
       * 
       */
      if (conditions.length === 0) {
        results.push(false)
        continue
      }

      const processResponse = processResponses[conditionOperator]
      const processResponseResult = processResponse(responseId, conditions, history)

      /**
       * 
       * 6. We push true value if the conditions of the current response are valid,
       *    false otherwise.
       * 
       */
      results.push(processResponseResult)
    }

    /**
     * 
     * 7. Variables explanation
     * 
     *    - process: The function that returns true if current next possible question's responses
     *               are valid, false otherwise. 
     * 
     *    - processResult: The value returned by the process() function.
     * 
     */
    const process = processPossibleQuestion[operator]
    const processResult = process(results, history)

    /**
     * 
     * 8. If all the conditions are met for the current next possible question, we return it.
     * 
     */
    if (processResult) {
      return questionId
    }
  }
  /**
   * 
   * 9. If no conditions are met for none of the next possible questions, it means that 
   *    either we are at the end of the form or the next possible question was not found
   *    from its id. In that case we return an empty string.
   * 
   */
  if (nextQuestions.length === 0) {
    return ''
  }
  return nextQuestions[0].id
}
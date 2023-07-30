import { Document } from "mongoose";


export type QuestionConditions = string [] | NumericalComparison []

// TODO: Rename that type
export type ProcessResponsesOperator = (questionId: string, conditions: QuestionConditions, history: ResponseHistory) => boolean
export type ProcessNumericalResponseOperator = (questionId: string, conditions: QuestionConditions, history: ResponseHistory) => boolean

export type ProcessPossibleQuestionOperator = (responses: boolean [], history: ResponseHistory) => boolean

export interface ProcessPossibleQuestion {
  AND: ProcessPossibleQuestionOperator,
  OR: ProcessPossibleQuestionOperator
}

export interface ProcessResponses {
  AND: ProcessResponsesOperator,
  OR: ProcessResponsesOperator,
  comparison: ProcessNumericalResponseOperator
}


export type ComparisonOperator = '=' 
  | '!='
  | '>='
  | '<='
export type ConditionsOperator = 'AND' | 'OR'
export type ConditionOperator = ConditionsOperator | 'comparison'

export interface NumericalComparison {
  type: ComparisonOperator
  value: number
}

export interface Condition {
  id: string
  condition: {
    comparison?: NumericalComparison []
    OR?: string []
    AND?: string []
  }
}

export interface NextQuestion {
  id: string
  conditions: {
    OR?: Condition [];
    AND?: Condition [];
  };
}

export interface Response {
  id: string
  text: string
}

export interface Question {
  questionId: string
  text: string
  inputType: InputType
  inputProps: any
  responses: Response []
  nextQuestions: NextQuestion []
}

export interface QuestionDocument extends 
  Document, 
  Exclude<Question, 'inputType' | 'inputProps'> 
{}


export interface QuestionResponse {
  messsage: string,
  data: Question []
}

export type InputType = 'text' 
  | 'number'
  | 'email'
  | 'slider'
  | 'single'
  | 'multi'
  | 'single-suggestion'
  | 'multi-suggestion'


export interface SubmitedResponse {
  ids: string []
  questionId: string
}

export type ResponseHistory = SubmitedResponse []
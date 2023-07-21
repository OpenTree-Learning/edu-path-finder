import { Document } from "mongoose";


interface NumericalComparison {
  type: string
  value: number
}

interface Condition {
  id: string
  condition: {
    comparison?: NumericalComparison []
    OR?: string []
    AND?: string []
  }
}

interface NextQuestion {
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
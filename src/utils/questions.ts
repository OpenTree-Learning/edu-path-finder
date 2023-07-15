import { apiFetch } from "./api_client"
import Question, { QuestionResponse } from "../types/question"


export async function getQuestions (): Promise<QuestionResponse> {
  const questions = await apiFetch<QuestionResponse>(
    'questions', 
    {
      next: {
        revalidate: 3600
      }
    }
  )

  return questions
}
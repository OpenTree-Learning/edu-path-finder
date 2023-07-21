// @ts-nocheck
import mongoose, { Schema } from 'mongoose'
import { QuestionDocument } from '../types/question'


const QuestionSchema = new Schema<QuestionDocument>({
  questionId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  inputProps: {
    type: Schema.Types.Mixed
  },
  responses: {
    type: Array,
    default: undefined
  },
  nextQuestions: {
    type: Array,
    default: undefined,
  },
})

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema)

export default Question
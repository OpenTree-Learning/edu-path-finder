// @ts-nocheck
import mongoose, { Schema, Document } from 'mongoose'
import Question from '../types/question'

// TODO: Fix the model

const QuestionSchema = new Schema<Question>({
  //id: {
  //  type: String,
  //  required: true
  //},
  //text: {
  //  type: String,
  //  required: true
  //},
  //inputType: {
  //  type: String,
  //  required: true
  //},
  //inputProps: {
  //  type: Schema.Types.Mixed
  //},
  //responses: [
  //  {
  //    type: String,
  //    required: true
  //  }
  //],
  //nextQuestions: {
  //  type: Array,
  //  default: undefined,
  //},
})

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema)

export default Question
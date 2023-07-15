// models/Question.ts
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Question from './src/models/question'


const MONGO_URI = 'mongodb://localhost:27017/myDatabase';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

const questionsFilePath = path.resolve(__dirname, './questions.json');
const questionsJson = fs.readFileSync(questionsFilePath, 'utf8');
const questions = JSON.parse(questionsJson);

questions.forEach(async (questionData: any, idx: number) => {
  const question = new Question(questionData);
  await question.save()
    .then((res: any) => console.log(res))
    .catch((err: any) => console.log(err));
});

console.log('Questions seeded successfully');
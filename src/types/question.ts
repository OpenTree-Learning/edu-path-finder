import { Document } from "mongoose";


interface NumericalComparison {
  type: string,
  value: number
}

interface Condition {
  id: string;
  condition: {
    comparison?: NumericalComparison [],
    OR?: string [];
    AND?: string [];
  };
}

interface NextQuestion {
  id: string;
  conditions: {
    OR?: Condition [];
    AND?: Condition [];
  };
}

interface Question extends Document {
  id: string;
  text: string;
  responses: string[];
  nextQuestions: NextQuestion [];
}

export default Question;

export interface QuestionResponse {
  messsage: string,
  data: Question []
}
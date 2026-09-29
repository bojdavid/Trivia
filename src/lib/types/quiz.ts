export interface QuizQuestion {
  ID: number;
  Question: string;
  CorrectOption: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  AnswerExplanation?: string;
  Category: string;
  answered?: boolean;
  view_correct_ans?: boolean;
  choice?: string;
  id?: number;
}

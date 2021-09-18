export type QuestionT = {
  id: string;
  content: string;
  type: string;
  answer: Answer;
};

export type Answer = {
  content: string;
};

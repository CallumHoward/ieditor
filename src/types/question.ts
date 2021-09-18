export type QuestionT = {
  id: string;
  content: string;
  type: ResponseType;
  answer: Answer;
};

export type Answer = {
  content: string;
};

export enum ResponseType {
  Radio,
  Input,
}

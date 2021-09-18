import React, { FunctionComponent } from "react";
import { Question } from "../components/question";
import { ScrollableDraggableList } from "../components/scrollable-draggable-list";
import { QuestionT } from "../types/question";

const initialQuestions = [
  {
    id: "0",
    content: "foo 0",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "1",
    content: "bar 1",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "2",
    content: "baz 2",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "3",
    content: "fizz 3",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "4",
    content: "buzz 4",
    type: "input",
    answer: { content: "unanswered" },
  },
] as QuestionT[];

const ScrollListTest: FunctionComponent = () => {
  return (
    <ScrollableDraggableList
      height={800}
      initialItems={initialQuestions.map(({ content, id }) => ({
        key: id,
        node: ({ isDragging }) => (
          <Question content={content} isDragging={isDragging} />
        ),
      }))}
    />
  );
};

export { ScrollListTest };

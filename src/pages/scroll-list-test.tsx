import React, { FunctionComponent } from "react";
import styled from "styled-components";
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

const ScrollListContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

const ScrollListTest: FunctionComponent = () => {
  return (
    <ScrollListContainer>
      <ScrollableDraggableList
        initialItems={initialQuestions.map(({ content, id }) => ({
          key: id,
          node: ({ isDragging }) => (
            <Question content={content} isDragging={isDragging} />
          ),
        }))}
      />
    </ScrollListContainer>
  );
};

export { ScrollListTest };

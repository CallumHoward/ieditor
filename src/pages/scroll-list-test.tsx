import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Question } from "../components/question";
import {
  ListIndexData,
  ScrollableDraggableList,
} from "../components/scrollable-draggable-list";
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
  height: 90vh;
  width: 100%;
  position: relative;
`;

const ControlsHolder = styled.div`
  position: absolute;
  right: 0;
`;

const ScrollListTest: FunctionComponent = () => {
  const [currentIndex, setCurrentIndex] = useState<ListIndexData>({
    value: 0,
  });

  const scrollPrev = () => {
    if (currentIndex.value - 1 >= 0) {
      setCurrentIndex({
        value: currentIndex.value - 1,
        shouldAutoScroll: true,
      });
    }
  };

  const scrollNext = () => {
    if (currentIndex.value + 1 < initialQuestions.length) {
      setCurrentIndex({
        value: currentIndex.value + 1,
        shouldAutoScroll: true,
      });
    }
  };

  return (
    <ScrollListContainer>
      <ControlsHolder>
        <button type="button" onClick={scrollPrev}>
          Previous
        </button>
        <button type="button" onClick={scrollNext}>
          Next
        </button>
      </ControlsHolder>
      <ScrollableDraggableList
        currentIndex={currentIndex}
        onChangeIndex={(newValue) => {
          setCurrentIndex({ value: newValue });
        }}
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

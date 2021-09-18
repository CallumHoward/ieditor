import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Question } from "../components/question";
import {
    ListIndexData,
    ScrollableDraggableList
} from "../components/scrollable-draggable-list";
import { QuestionT } from "../types/question";

const initialQuestions = [
  {
    id: "0",
    content: `Have you selected "Abercrombie Caves" for sites`,
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "1",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "2",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "3",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "4",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
] as QuestionT[];

const PageContainer = styled.div``;

const NavBar = styled.header`
  width: 100%;
  min-height: 6vh;
  padding: 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
`;

const ScrollListContainer = styled.div`
  height: 90vh;
  width: 100%;
  position: relative;
`;

const ControlsHolder = styled.div`
  position: absolute;
  right: 0;
`;

export const EditorPage: FunctionComponent = () => {
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
    <PageContainer>
      <NavBar>
        <button>Back</button>
      </NavBar>
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
    </PageContainer>
  );
};

import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { PageContainer } from "../components/page-container";
import { Question } from "../components/question";
import {
  ListIndexData,
  ScrollableDraggableList,
} from "../components/scrollable-draggable-list";
import { QuestionT, ResponseType } from "../types/question";

const initialQuestions = [
  {
    id: "0",
    content: `Have you selected "Abercrombie Caves" for sites`,
    type: ResponseType.Input,
    answer: { content: "unanswered" },
  },
  {
    id: "1",
    content: "Should be profiled and have current day and time.",
    type: ResponseType.Radio,
    answer: { content: "unanswered" },
  },
  {
    id: "2",
    content: "Should be profiled and have current day and time.",
    type: ResponseType.Input,
    answer: { content: "unanswered" },
  },
  {
    id: "3",
    content: "Should be profiled and have current day and time.",
    type: ResponseType.Radio,
    answer: { content: "unanswered" },
  },
  {
    id: "4",
    content: "Should be profiled and have current day and time.",
    type: ResponseType.Input,
    answer: { content: "unanswered" },
  },
] as QuestionT[];

const ScrollListContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
`;

const ControlsHolder = styled.div`
  display: flex;
  justify-content: flex-end;
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
          initialItems={initialQuestions.map(({ content, id, type }) => ({
            key: id,
            node: ({ isDragging, index }) => (
              <Question
                isDragging={isDragging}
                content={content}
                index={index}
                type={type}
              />
            ),
          }))}
        />
      </ScrollListContainer>
    </PageContainer>
  );
};

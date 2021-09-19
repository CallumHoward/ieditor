import React, { FunctionComponent, useCallback, useRef } from "react";
import { Form, FormSpy } from "react-final-form";
import styled from "styled-components";
import { PageContainer } from "../components/page-container";
import { Question } from "../components/question";
import {
  ListIndexData,
  ListItem,
  ListItemProps,
  ScrollableDraggableList,
} from "../components/scrollable-draggable-list";
import { QuestionT, ResponseType } from "../types/question";

const initialQuestionsData = [
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
  const currentIndex = useRef<ListIndexData>({
    value: 0,
  });

  const renderInitialQuestions = () =>
    initialQuestionsData.map((question) => ({
      key: question.id,
      node: ({ isDragging, index }: ListItemProps) => (
        <Question index={index} question={question} isDragging={isDragging} />
      ),
    }));

  const initialItems = useRef<ListItem[]>(renderInitialQuestions());

  const scrollPrev = () => {
    if (currentIndex.current.value - 1 >= 0) {
      currentIndex.current = {
        value: currentIndex.current.value - 1,
        shouldAutoScroll: true,
      };
    }
  };

  const scrollNext = () => {
    if (currentIndex.current.value + 1 < initialQuestionsData.length) {
      currentIndex.current = {
        value: currentIndex.current.value + 1,
        shouldAutoScroll: true,
      };
    }
  };

  const handleOnChange = useCallback((newValue: number) => {
    currentIndex.current = { value: newValue };
  }, []);

  return (
    <PageContainer>
      <ControlsHolder>
        <button type="button" onClick={scrollPrev}>
          Previous
        </button>
        <button type="button" onClick={scrollNext}>
          Next
        </button>
      </ControlsHolder>
      <ScrollListContainer>
        <Form
          onSubmit={() => {
            // console.log(values);
          }}
          subscription={{ submitting: true, pristine: true }}
        >
          {({ handleSubmit }) => {
            return (
              <form
                onSubmit={handleSubmit}
                style={{ height: "100%", width: "100%" }}
              >
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => {
                    console.log(values);
                    return <pre>{JSON.stringify(values)}</pre>;
                  }}
                </FormSpy>
                <ScrollableDraggableList
                  currentIndex={currentIndex.current}
                  onChangeIndex={handleOnChange}
                  initialItems={initialItems.current}
                />
                <button type={"button"} onSubmit={handleSubmit}>
                  Submit
                </button>
              </form>
            );
          }}
        </Form>
      </ScrollListContainer>
    </PageContainer>
  );
};

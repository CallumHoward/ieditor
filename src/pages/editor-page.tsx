import React, { FunctionComponent, useCallback, useRef, useState } from "react";
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
  const currentIndexRef = useRef<ListIndexData>({
    value: 0,
  });
  const [currentIndexState, setCurrentIndexState] = useState<ListIndexData>(
    currentIndexRef.current
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  const renderInitialQuestions = () =>
    initialQuestionsData.map((question) => ({
      key: question.id,
      node: ({ isDragging, index, currentIndex, meta }: ListItemProps) => (
        <Question
          index={index}
          question={question}
          focused={index === currentIndex}
          focusMode={meta.focusMode}
          isDragging={isDragging}
          editing={meta.editing}
        />
      ),
    }));

  const initialItems = useRef<ListItem[]>(renderInitialQuestions());

  const scrollPrev = () => {
    if (currentIndexRef.current.value - 1 >= 0) {
      const newIndex = {
        value: currentIndexRef.current.value - 1,
        shouldAutoScroll: true,
      };
      currentIndexRef.current = newIndex;
      setCurrentIndexState(newIndex);
    }
  };

  const scrollNext = () => {
    if (currentIndexRef.current.value + 1 < initialQuestionsData.length) {
      const newIndex = {
        value: currentIndexRef.current.value + 1,
        shouldAutoScroll: true,
      };
      currentIndexRef.current = newIndex;
      setCurrentIndexState(newIndex);
    }
  };

  const handleOnChange = useCallback((newValue: number) => {
    currentIndexRef.current = { value: newValue };
    // Do not call setCurrentIndexState here to avoid re-rendering on scroll
  }, []);

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      focusMode={focusMode}
      setFocusMode={setFocusMode}
    >
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
                autoComplete={"off"}
                onSubmit={handleSubmit}
                style={{ height: "100%", width: "100%" }}
              >
                <FormSpy subscription={{ values: true }}>
                  {({ values }) => {
                    console.log("form values:", values);
                    return <pre>{JSON.stringify(values)}</pre>;
                  }}
                </FormSpy>
                <ScrollableDraggableList
                  currentIndex={currentIndexState}
                  onChangeIndex={handleOnChange}
                  initialItems={initialItems.current}
                  scrollAlignmentMode={focusMode ? "center" : "start"}
                  meta={{ editing, focusMode }}
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

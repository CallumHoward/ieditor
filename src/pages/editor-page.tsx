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

export const EditorPage: FunctionComponent = () => {
  const [currentIndexState, setCurrentIndexState] = useState<ListIndexData>({
    value: 0,
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  const renderInitialQuestions = () =>
    initialQuestionsData.map((question) => ({
      key: question.id,
      node: ({
        isDragging,
        index,
        currentIndex,
        handleScrollToIndex,
        meta,
      }: ListItemProps) => (
        <Question
          index={index}
          isLast={index === initialQuestionsData.length - 1}
          scrollPrev={() => handleScrollToIndex(currentIndex - 1)}
          scrollNext={() => handleScrollToIndex(currentIndex + 1)}
          scrollToMe={() => handleScrollToIndex(index)}
          question={question}
          focused={index === currentIndex}
          focusMode={meta.focusMode}
          isDragging={isDragging}
          editing={meta.editing}
        />
      ),
    }));

  const initialItems = useRef<ListItem[]>(renderInitialQuestions());

  const handleScrollToIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < initialQuestionsData.length) {
      setCurrentIndexState({
        value: newIndex,
        shouldAutoScroll: true,
      });
    }
  };

  const handleOnChange = useCallback((newValue: number) => {
    setCurrentIndexState({ value: newValue });
  }, []);

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      focusMode={focusMode}
      setFocusMode={setFocusMode}
    >
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
                {/* <FormSpy subscription={{ values: true }}> */}
                {/*   {({ values }) => { */}
                {/*     // console.log("form values:", values); */}
                {/*     return <pre>{JSON.stringify(values)}</pre>; */}
                {/*   }} */}
                {/* </FormSpy> */}
                <ScrollableDraggableList
                  currentIndex={currentIndexState}
                  handleScrollToIndex={handleScrollToIndex}
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

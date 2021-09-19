import React, { FunctionComponent, useCallback, useRef, useState } from "react";
import { Form, FormSpy } from "react-final-form";
import styled from "styled-components";
import { PageContainer } from "../components/page-container";
import { ProgressBar } from "../components/progress-bar";
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
        changeIndex,
        meta,
      }: ListItemProps) => (
        <Question
          index={index}
          isLast={index === initialQuestionsData.length - 1}
          scrollPrev={() =>
            changeIndex({ value: currentIndex - 1, shouldAutoScroll: true })
          }
          scrollNext={() =>
            changeIndex({ value: currentIndex + 1, shouldAutoScroll: true })
          }
          scrollToMe={() =>
            changeIndex({ value: index, shouldAutoScroll: true })
          }
          question={question}
          focused={index === currentIndex}
          focusMode={meta.focusMode}
          isDragging={isDragging}
          editing={meta.editing}
        />
      ),
    }));

  const initialItems = useRef<ListItem[]>(renderInitialQuestions());

  const handleOnChange = useCallback((newValue: ListIndexData) => {
    if (newValue.value >= 0 && newValue.value < initialQuestionsData.length) {
      setCurrentIndexState(newValue);
    }
  }, []);

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      focusMode={focusMode}
      setFocusMode={setFocusMode}
    >
      <ProgressBar
        totalSteps={initialItems.current.length}
        myIndex={currentIndexState.value}
      />
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

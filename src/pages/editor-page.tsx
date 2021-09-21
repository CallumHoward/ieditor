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
import { mapFieldStateToStepStatus } from "../utils/mapFieldStateToStepStatus";
import { initialQuestionsData } from "../fixtures/questions-data";
import { FormYJSObserver } from "../components/form/form-yjs-observer";
import { setValue } from "../components/form/mutatators";
import { useYProvider } from "../contexts/yjs-context";

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
  const { ymap } = useYProvider();

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
      <ScrollListContainer>
        <Form
          onSubmit={() => undefined}
          subscription={{ active: true }}
          mutators={{
            setValue,
          }}
          initialValues={ymap.toJSON()}
        >
          {({ handleSubmit, form: { getFieldState, getRegisteredFields } }) => {
            return (
              <form
                autoComplete={"off"}
                onSubmit={handleSubmit}
                style={{ height: "100%", width: "100%" }}
              >
                <FormYJSObserver />
                <FormSpy subscription={{ values: true }}>
                  {() => {
                    return (
                      <>
                        <ProgressBar
                          totalSteps={initialItems.current.length}
                          myIndex={currentIndexState.value}
                          // TODO: This rebuilds the step status array on keypress
                          // and scroll which is a performance concern
                          stepStatus={getRegisteredFields().map((fieldName) =>
                            mapFieldStateToStepStatus(getFieldState(fieldName))
                          )}
                        />
                        {/* <pre>{JSON.stringify(values)}</pre> */}
                      </>
                    );
                  }}
                </FormSpy>

                <ScrollableDraggableList
                  currentIndex={currentIndexState}
                  onChangeIndex={handleOnChange}
                  isDragDisabled={!editing}
                  initialItems={initialItems.current}
                  scrollAlignmentMode={focusMode ? "center" : "start"}
                  meta={{ editing, focusMode }}
                />
              </form>
            );
          }}
        </Form>
      </ScrollListContainer>
    </PageContainer>
  );
};

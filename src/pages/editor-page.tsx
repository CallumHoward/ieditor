import React, {
  FunctionComponent,
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";
import { Form, FormSpy } from "react-final-form";
import styled from "styled-components";
import Drawer from "react-bottom-drawer";
import { PageContainer } from "../components/page-container";
import { ProgressBar, StepStatus } from "../components/progress-bar";
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
import { BottomDrawer } from "../components/bottom-drawer";
import { useUserProvider } from "../contexts/user-context";
import { UserProfileDrawer } from "../components/user-profile-drawer";

export const QUESTION_INPUT_NAME_PREFIX = "ql";

const ScrollListContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledDrawer = styled(Drawer)`
  .bottom-drawer__content {
    padding: 0;
  }
  .bottom-drawer__backdrop {
    z-index: 11;
  }
`;

const NO_ID = "noid";

export const EditorPage: FunctionComponent = () => {
  const [currentIndexState, setCurrentIndexState] = useState<ListIndexData>({
    value: 0,
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [drawOpen, setDrawOpen] = useState<boolean>(false);
  const openDrawer = React.useCallback(() => setDrawOpen(true), []);
  const closeDrawer = React.useCallback(() => {
    setDrawOpen(false);
    setSelectedUser(NO_ID);
  }, []);
  const { ymap } = useYProvider();
  const { setCurrentIndex: setCurrentIndexYMap } = useUserProvider();

  const { id: myId } = useUserProvider();
  const [selectedUser, setSelectedUser] = useState<string>(myId);

  useEffect(() => {
    setFocusMode(false);
  }, [editing]);

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
          setFocusMode={setFocusMode}
          isDragging={isDragging}
          editing={meta.editing}
        />
      ),
    }));

  const initialItems = useRef<ListItem[]>(renderInitialQuestions());

  const handleOnChange = useCallback((newValue: ListIndexData) => {
    if (newValue.value >= 0 && newValue.value < initialQuestionsData.length) {
      setCurrentIndexState(newValue);
      setCurrentIndexYMap(newValue.value);
    }
  }, []);

  const createInitialFormData = () => {
    const initialFormData: Record<string, any> = ymap.toJSON();

    initialQuestionsData.forEach((q) => {
      initialFormData[`${QUESTION_INPUT_NAME_PREFIX}${q.id}`] = q.content;
    });

    return initialFormData;
  };

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      focusMode={focusMode}
      setFocusMode={setFocusMode}
      openDrawer={openDrawer}
      setCurrentIndex={(newValue) =>
        handleOnChange({ value: newValue, shouldAutoScroll: true })
      }
    >
      <ScrollListContainer>
        <Form
          onSubmit={() => undefined}
          subscription={{ active: true }}
          mutators={{
            setValue,
          }}
          initialValues={createInitialFormData()}
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
                          stepStatus={
                            getRegisteredFields()
                              .map((fieldName) =>
                                mapFieldStateToStepStatus(
                                  editing,
                                  fieldName,
                                  getFieldState(fieldName as never)
                                )
                              )
                              .filter((v) => v !== null) as StepStatus[]
                          }
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
                  scrollAlignmentMode={"center"}
                  meta={{ editing, focusMode }}
                />
              </form>
            );
          }}
        </Form>
      </ScrollListContainer>
      <StyledDrawer
        isVisible={drawOpen}
        onClose={closeDrawer}
        className={"bottom-drawer"}
      >
        {selectedUser === NO_ID ? (
          <BottomDrawer
            editing={editing}
            setEditing={setEditing}
            closeDrawer={closeDrawer}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <UserProfileDrawer
            closeDrawer={closeDrawer}
            userId={selectedUser}
            setSelectedUser={setSelectedUser}
            handleOnChange={(value) => { handleOnChange({value, shouldAutoScroll: true}) }}
          />
        )}
      </StyledDrawer>
    </PageContainer>
  );
};

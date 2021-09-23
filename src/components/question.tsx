import React, { FunctionComponent } from "react";

import { ActionBoxSvg } from "../assets/action-box-svg";
import { ArrowDownSvg } from "../assets/arrow-down-svg";
import { ArrowUpSvg } from "../assets/arrow-up-svg";
import { MediaSvg } from "../assets/media-svg";
import { useUserProvider } from "../contexts/user-context";
import { QUESTION_INPUT_NAME_PREFIX } from "../pages/editor-page";
import { QuestionT, ResponseType } from "../types/question";
import { FormInput } from "./form/form-input";
import { FormQuestionLabel } from "./form/form-question-label";
import { FormRadio } from "./form/form-radio";
import { FormTextArea } from "./form/form-text-area";
import { StyledNavButton } from "./nav-bar-styled";
import {
  AttachmentBar,
  ControlsContainer,
  InlineButton,
  InnerContainer,
  OuterContainer,
  QuestionContainer,
  ResponseContainer,
} from "./question-styled";

const renderResponse = (
  question: QuestionT,
  scrollNext: () => void,
  scrollToMe: () => void,
  focusMode: boolean,
  focused: boolean
) => {
  switch (question.type) {
    case ResponseType.Radio:
      return (
        <FormRadio
          name={`qr${question.id}`}
          onChange={focusMode ? scrollNext : undefined}
          onClick={focusMode && focused ? scrollNext : scrollToMe}
        />
      );
    case ResponseType.Input:
      return (
        <FormInput
          name={`qi${question.id}`}
          onBlur={focusMode ? scrollNext : undefined}
          onFocus={scrollToMe}
          focusMode={focusMode}
          focused={focused}
        />
      );
  }
};

type QuestionProps = {
  index: number;
  question: QuestionT;
  focused: boolean;
  focusMode: boolean;
  setFocusMode: (value: boolean) => void;
  editing?: boolean;
  isLast: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollToMe: () => void;
  isDragging?: boolean;
};

export const Question: FunctionComponent<QuestionProps> = ({
  index,
  question,
  focused,
  focusMode = false,
  setFocusMode,
  editing = false,
  isLast,
  scrollPrev,
  scrollNext,
  scrollToMe,
  isDragging = false,
}) => {
  const { allUsers, id: myUserId } = useUserProvider();
  let clickTimeout: NodeJS.Timeout | null = null;

  const getBorderColour = () => {
    const otherUser = Object.entries(allUsers).find(
      ([id, u]) => u.currentIndex === index && id !== myUserId
    );

    if (otherUser) {
      return otherUser?.[1].color;
    }

    return focused ? "#6559ff" : "#dee4ed";
  };

  return (
    <OuterContainer focusMode={focusMode}>
      <QuestionContainer
        isDragging={isDragging}
        mandatory={true}
        borderColour={getBorderColour()}
      >
        <InnerContainer
          onClick={(e) => {
            if (clickTimeout !== null) {
              // console.log("double click executes");
              setFocusMode(!focusMode);

              // Cleanup
              clearTimeout(clickTimeout);
              clickTimeout = null;
            } else {
              // console.log("single click");
              clickTimeout = setTimeout(() => {
                // console.log("first click executes ");

                const target = e.target as Element;

                // To prevent this click event being triggered by the buttons as well,
                // restrict the event to elements that contain question-clickable
                if (
                  !editing &&
                  target.classList.contains("allow-click-to-scroll")
                ) {
                  scrollToMe();
                }

                // Cleanup
                if (clickTimeout !== null) {
                  clearTimeout(clickTimeout);
                  clickTimeout = null;
                }
              }, 150);
            }
          }}
        >
          {editing ? (
            <FormTextArea
              className="allow-click-to-scroll"
              value={""}
              name={`${QUESTION_INPUT_NAME_PREFIX}${question.id}`}
            />
          ) : (
            <FormQuestionLabel
              className="allow-click-to-scroll"
              name={`${QUESTION_INPUT_NAME_PREFIX}${question.id}`}
            >
              {question.content}
            </FormQuestionLabel>
          )}
          <ResponseContainer>
            {renderResponse(
              question,
              scrollNext,
              scrollToMe,
              focusMode,
              focused
            )}
          </ResponseContainer>
          {!editing && (
            <AttachmentBar>
              <span
                style={{ flexGrow: 1, cursor: "pointer" }}
                className="allow-click-to-scroll"
              >
                <InlineButton
                  tabIndex={index * 100 + 1}
                  className="allow-click-to-scroll"
                >
                  Add note...
                </InlineButton>
              </span>
              <InlineButton
                tabIndex={index * 100 + 2}
                style={{ marginRight: "1rem" }}
                className="allow-click-to-scroll"
              >
                <MediaSvg style={{ marginRight: "0.5rem" }} />
                Media
              </InlineButton>
              <InlineButton
                tabIndex={index * 100 + 3}
                className="allow-click-to-scroll"
              >
                <ActionBoxSvg style={{ marginRight: "0.5rem" }} />
                Action
              </InlineButton>
            </AttachmentBar>
          )}
        </InnerContainer>
      </QuestionContainer>
      <ControlsContainer visible={focusMode && focused}>
        {index !== 0 && (
          <StyledNavButton style={{ flexGrow: 1 }} onClick={scrollPrev}>
            <ArrowUpSvg />
          </StyledNavButton>
        )}
        <StyledNavButton style={{ flexGrow: 1 }} onClick={scrollNext}>
          {isLast ? "Finish" : <ArrowDownSvg />}
        </StyledNavButton>
      </ControlsContainer>
    </OuterContainer>
  );
};

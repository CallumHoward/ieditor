import React, { FunctionComponent } from "react";
import { useField } from "react-final-form";

import { ActionBoxSvg } from "../assets/action-svg";
import { ArrowDownSvg } from "../assets/arrow-down-svg";
import { ArrowUpSvg } from "../assets/arrow-up-svg";
import { MediaSvg } from "../assets/media-svg";
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

const renderResponse = (question: QuestionT, scrollNext: () => void) => {
  switch (question.type) {
    case ResponseType.Radio:
      return <FormRadio name={`qr${question.id}`} onChange={scrollNext} />;
    case ResponseType.Input:
      return <FormInput name={`qi${question.id}`} />;
  }
};

type QuestionProps = {
  index: number;
  question: QuestionT;
  focused: boolean;
  focusMode: boolean;
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
  editing = false,
  isLast,
  scrollPrev,
  scrollNext,
  scrollToMe,
  isDragging = false,
}) => {
  return (
    <OuterContainer focusMode={focusMode}>
      <QuestionContainer
        isDragging={isDragging}
        mandatory={true}
        focused={focused}
      >
        <InnerContainer
          onClick={(e) => {
            const target = e.target as Element;

            // To prevent this click event being triggered by the buttons as well,
            // restrict the event to elements that contain question-clickable
            if (
              !editing &&
              target.classList.contains("allow-click-to-scroll")
            ) {
              scrollToMe();
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
            {renderResponse(question, scrollNext)}
          </ResponseContainer>
          {!editing && (
            <AttachmentBar>
              <span style={{ flexGrow: 1 }} className="allow-click-to-scroll">
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

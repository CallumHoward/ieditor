import React, { FunctionComponent } from "react";
import { ActionBoxSvg } from "../assets/action-svg";
import { ArrowDownSvg } from "../assets/arrow-down-svg";
import { ArrowUpSvg } from "../assets/arrow-up-svg";
import { MediaSvg } from "../assets/media-svg";
import { QuestionT, ResponseType } from "../types/question";
import { FormInput } from "./form/form-input";
import { FormRadio } from "./form/form-radio";
import { StyledNavButton } from "./nav-bar-styled";
import {
  AttachmentBar,
  ControlsContainer,
  InlineButton,
  InnerContainer,
  Label,
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
            if (target.classList.contains("question-clickable")) {
              scrollToMe();
            }
          }}
        >
          <Label className="question-clickable">{`${index}. ${question.content}`}</Label>
          <ResponseContainer>
            {renderResponse(question, scrollNext)}
          </ResponseContainer>
          {!editing && (
            <AttachmentBar>
              <span style={{ flexGrow: 1 }}>
                <InlineButton tabIndex={index * 100 + 1}>
                  Add note...
                </InlineButton>
              </span>
              <InlineButton
                tabIndex={index * 100 + 2}
                style={{ marginRight: "1rem" }}
              >
                <MediaSvg style={{ marginRight: "0.5rem" }} />
                Media
              </InlineButton>
              <InlineButton tabIndex={index * 100 + 3}>
                <ActionBoxSvg style={{ marginRight: "0.5rem" }} />
                Action
              </InlineButton>
            </AttachmentBar>
          )}
        </InnerContainer>
      </QuestionContainer>
      <ControlsContainer visible={focusMode && focused}>
        {index !== 0 && (
          <StyledNavButton
            style={{ flexGrow: 1 }}
            onClick={scrollPrev}
            question-interactive
          >
            <ArrowUpSvg />
          </StyledNavButton>
        )}
        <StyledNavButton
          style={{ flexGrow: 1 }}
          onClick={scrollNext}
          question-interactive
        >
          {isLast ? "Finish" : <ArrowDownSvg />}
        </StyledNavButton>
      </ControlsContainer>
    </OuterContainer>
  );
};

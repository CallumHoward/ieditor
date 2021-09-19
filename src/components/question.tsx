import React, { FunctionComponent } from "react";
import { ActionBoxSvg } from "../assets/action-svg";
import { MediaSvg } from "../assets/media-svg";
import { QuestionT, ResponseType } from "../types/question";
import { FormInput } from "./form/form-input";
import { FormRadio } from "./form/form-radio";
import {
  AttachmentBar,
  InlineButton,
  InnerContainer,
  Label,
  OuterContainer,
  QuestionContainer,
  ResponseContainer,
} from "./question-styled";

const renderResponse = (question: QuestionT) => {
  switch (question.type) {
    case ResponseType.Radio:
      return <FormRadio />;
    case ResponseType.Input:
      return <FormInput name={`q${question.id}`} />;
  }
};

type QuestionProps = {
  index: number;
  question: QuestionT;
  isDragging?: boolean;
};

export const Question: FunctionComponent<QuestionProps> = ({
  index,
  question,
  isDragging = false,
}) => {
  return (
    <OuterContainer>
      <QuestionContainer isDragging={isDragging} mandatory={true}>
        <InnerContainer>
          <Label>{`${index}. ${question.content}`}</Label>
          <ResponseContainer>{renderResponse(question)}</ResponseContainer>
          <AttachmentBar>
            <span style={{ flexGrow: 1 }}>
              <InlineButton>Add note...</InlineButton>
            </span>
            <InlineButton style={{ marginRight: "1rem" }}>
              <MediaSvg style={{ marginRight: "0.5rem" }} />
              Media
            </InlineButton>
            <InlineButton>
              <ActionBoxSvg style={{ marginRight: "0.5rem" }} />
              Action
            </InlineButton>
          </AttachmentBar>
        </InnerContainer>
      </QuestionContainer>
    </OuterContainer>
  );
};

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
      return <FormRadio name={`qr${question.id}`} />;
    case ResponseType.Input:
      return <FormInput name={`qi${question.id}`} />;
  }
};

type QuestionProps = {
  index: number;
  question: QuestionT;
  focused: boolean;
  editing?: boolean;
  isDragging?: boolean;
};

export const Question: FunctionComponent<QuestionProps> = ({
  index,
  question,
  focused,
  editing = false,
  isDragging = false,
}) => {
  console.log("LOG focused: ", focused);
  return (
    <OuterContainer>
      <QuestionContainer
        isDragging={isDragging}
        mandatory={true}
        focused={focused}
      >
        <InnerContainer>
          <Label>{`${index}. ${question.content} ${
            editing ? "(isEdit: true)" : "(isEdit: false)"
          }`}</Label>
          <ResponseContainer>{renderResponse(question)}</ResponseContainer>
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
    </OuterContainer>
  );
};

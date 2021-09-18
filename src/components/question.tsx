import React, { FunctionComponent } from "react";
import { ActionBoxSvg } from "../assets/action-svg";
import { MediaSvg } from "../assets/media-svg";
import { ResponseType } from "../types/question";
import {
  AttachmentBar,
  InlineButton,
  InnerContainer,
  Label,
  OuterContainer,
  QuestionContainer,
  ResponseContainer,
  StyledButton,
  StyledInput,
} from "./question-styled";

const renderResponse = (type: ResponseType) => {
  switch (type) {
    case ResponseType.Input:
      return (
        <>
          <StyledButton>Yes</StyledButton>
          <StyledButton>No</StyledButton>
          <StyledButton>N/A</StyledButton>
        </>
      );
    case ResponseType.Radio:
      return <StyledInput />;
  }
};

type QuestionProps = {
  content: string;
  index: number;
  isDragging?: boolean;
  type: ResponseType;
};

export const Question: FunctionComponent<QuestionProps> = ({
  content,
  index,
  type,
  isDragging = false,
}) => {
  return (
    <OuterContainer>
      <QuestionContainer isDragging={isDragging} mandatory={true}>
        <InnerContainer>
          <Label>{`${index}. ${content}`}</Label>
          <ResponseContainer>
            {renderResponse(type)}
          </ResponseContainer>
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

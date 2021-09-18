import React, { FunctionComponent } from "react";
import styled from "styled-components";

const QuestionContainer = styled.div<{
  isDragging: boolean;
  mandatory: boolean;
}>`
  padding: 1.5rem 0 1.25rem;
  border: 1px solid #dee4ed;
  border-radius: 0.75rem;

  box-shadow: ${(p) =>
    p.isDragging
      ? "0 0px 7px rgba(66,66,66,0.08), 0 8px 10px rgba(66,66,66,0.1)"
      : ""};
  background: ${(p) => (p.isDragging ? "#fafafa" : "#fff")};
`;

const OuterContainer = styled.div`
  &::focus {
    outline: 0px;
  }
  user-select: none;
  padding: 0 0 0.5rem 0;
  margin: 0;
  border: 0;
`;

const InnerContainer = styled.div`
  padding: 0 1rem;
`;

const Label = styled.div`
  padding-bottom: 1rem;
  margin: 0 0.5rem;
  text-align: left;
  line-height: 1.5rem;
`;

const ResponseContainer = styled.div`
  display: flex;
  user-select: none;
  flex-direction: column wrap;
  align-items: stretch;
  :first-child {
    margin: 0 0.5rem 0 0;
  }
`;

const StyledButton = styled.button`
  background: #f3f6fb;
  margin: 0 0 0 0.5rem;
  flex: 1;

  padding: 0.75rem 1.25rem;
  background-color: #f9fbfe;
  border: 1px solid #dee4ed;
  border-radius: 0.5rem;
  color: #344563;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  opacity: 1;
  outline: 0px;
  text-align: center;
  text-overflow: ellipsis;
  user-select: none;
  word-break: normal;

  &:active {
    background: #f3f6fb;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const renderResponse = () => {
  return (
    <ResponseContainer>
      <StyledButton>Yes</StyledButton>
      <StyledButton>No</StyledButton>
      <StyledButton>N/A</StyledButton>
    </ResponseContainer>
  );
};

type QuestionProps = {
  content: string;
  isDragging?: boolean;
};

export const Question: FunctionComponent<QuestionProps> = ({
  content,
  isDragging = false,
}) => {
  return (
    <OuterContainer>
      <QuestionContainer isDragging={isDragging} mandatory={true}>
        <InnerContainer>
          <Label>{content}</Label>
          {renderResponse()}
        </InnerContainer>
      </QuestionContainer>
    </OuterContainer>
  );
};

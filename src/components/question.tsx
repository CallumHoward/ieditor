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
      ? "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
      : ""};
  background: ${(p) => (p.isDragging ? "#dee4ed" : "#fff")};
`;

const OuterContainer = styled.div`
  padding: 0 0 0.5rem 0;
  margin: 0;
  border: 0;
`;

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
        {content}
      </QuestionContainer>
    </OuterContainer>
  );
};

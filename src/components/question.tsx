import React, { FunctionComponent } from "react";
import styled from "styled-components";

const QuestionContainer = styled.div<{ isDragging: boolean, mandatory: boolean }>`
  // padding: 1.5rem 0 1.25rem;
  padding: 150px 20px;
  margin-bottom: 0.5rem;
  // width: 50%;
  // border: 1px solid #dee4ed;
  border-radius: 0.75rem;
  background: ${(p) => (p.isDragging ? "#dee4ed" : "#fff")};
  // :before {
  //   border-left: 0.3rem solid #ff656c;
  //   content: "";
  //   transition: all 0.3s ease 0s;
  //   position: absolute;
  //   height: calc(100% - 0.25rem);
  //   top: 0.125rem;
  //   left: -0.0625rem;
  //   border-top-left-radius: 0.75rem;
  //   border-bottom-left-radius: 0.75rem;
  // }
`;

const OuterContainer = styled.div`
  padding: 0;
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
      <QuestionContainer isDragging={isDragging} mandatory={true}>{content}</QuestionContainer>
  );
};

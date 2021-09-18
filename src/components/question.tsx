import React, { FunctionComponent } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const QuestionContainer = styled.div`
  width: 100%;
  height: 100px;
  background: #cc66ff;
  margin: 10px;
`;

type Props = {
  index: number;
  content: string;
};

export const Question: FunctionComponent<Props> = ({ index, content }) => {
  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <QuestionContainer>{content}</QuestionContainer>
        </div>
      )}
    </Draggable>
  );
};

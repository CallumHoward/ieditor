import React, { FunctionComponent } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import styled from "styled-components";

const QuestionContainer = styled.div<{ snapshot: DraggableStateSnapshot }>`
  padding: 20px;
  width: 50%;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-bottom: 10px;
  background: ${(p) => (p.snapshot.isDragging ? "#cc660f" : "#cc66ff")};
`;

type DndProps = {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
};

type QuestionProps = {
  content: string;
};

type Props = QuestionProps & DndProps;

export const Question: FunctionComponent<Props> = ({
  content,
  provided,
  snapshot,
}) => {
  return (
    <QuestionContainer
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {content}
    </QuestionContainer>
  );
};

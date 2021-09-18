import React, { FunctionComponent } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Question } from "./question";

type DndProps = {
  snapshot: DraggableStateSnapshot;
  provided: DraggableProvided;
};

type QuestionProps = {
  content: string;
};

type Props = QuestionProps & DndProps;

export const DraggableQuestion: FunctionComponent<Props> = ({
  content,
  provided,
  snapshot,
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Question isDragging={snapshot.isDragging} content={content} />
    </div>
  );
};

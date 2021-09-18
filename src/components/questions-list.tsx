import React, { FunctionComponent, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { QuestionT } from "../types/question";
import { Question } from "./question";

const initialQuestions = [
  {
    id: "0",
    content: "foo",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "1",
    content: "bar",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "2",
    content: "baz",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "3",
    content: "fizz",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "4",
    content: "buzz",
    type: "input",
    answer: { content: "unanswered" },
  },
] as QuestionT[];

export const QuestionsList: FunctionComponent = () => {
  const [questions, setQuestions] = useState<QuestionT[]>(initialQuestions);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const newQuestions = [...questions];
    const [removed] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, removed);
    setQuestions(newQuestions);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"droppable"}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map(({ id, content }, index) => (
              <Draggable
                key={id}
                draggableId={id}
                index={index}
              >
                {(provided, snapshot) => (
                  <Question
                    provided={provided}
                    snapshot={snapshot}
                    content={content}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

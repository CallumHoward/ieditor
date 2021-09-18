import React, { FunctionComponent, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { QuestionT } from "../types/question";
import { Question } from "./question";

const initialQuestions = [
  {
    index: 0,
    content: "foo",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    index: 1,
    content: "bar",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    index: 2,
    content: "baz",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    index: 3,
    content: "fizz",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    index: 4,
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
      <Droppable droppableId={"droppable"} mode={"standard"}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {questions.map(({ index, content }) => (
              <Question key={index} index={index} content={content} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

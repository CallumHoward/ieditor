import React, { FunctionComponent, useState, useRef } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { QuestionT } from "../types/question";
import { scrollToElement } from "../utils/scrollToElement";
import { DraggableQuestion } from "./draggable-question";

const DROPPABLE_CONTAINER_ID = "droppable";

const initialQuestions = [
  {
    id: "0",
    content: "foo 0",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "1",
    content: "bar 1",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "2",
    content: "baz 2",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "3",
    content: "fizz 3",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "4",
    content: "buzz 4",
    type: "input",
    answer: { content: "unanswered" },
  },
] as QuestionT[];

type ScrollableDraggableListProps = {
  onNextControl?: (index: number) => void;
  onPrev?: (index: number) => void;
};

const ScrollableDraggableListContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
`;

const ControlsHolder = styled.div`
  position: absolute;
  right: 0;
`;

const ScrollableItems = styled.div`
  height: 100%;
  overflow: scroll;
`;

const ScrollableDraggableList: FunctionComponent<ScrollableDraggableListProps> =
  () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const listContainerRef = useRef<HTMLDivElement | null>(null);
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

    const getListItems = () => {
      if (!listContainerRef?.current) {
        return;
      }

      return listContainerRef.current.children[0].children;
    };

    const getListItemsLength = () => {
      if (!listContainerRef?.current) {
        return 0;
      }

      return listContainerRef.current.children[0].children.length;
    };

    const scrollToIndex = (newIndex: number) => {
      if (newIndex >= getListItemsLength() || newIndex < 0) {
        return;
      }

      scrollToElement({
        element: getListItems()?.[newIndex] as HTMLElement,
        scrollableParent: listContainerRef.current,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    };

    const scrollPrev = () => {
      scrollToIndex(currentIndex - 1);
    };

    const scrollNext = () => {
      scrollToIndex(currentIndex + 1);
    };

    return (
      <ScrollableDraggableListContainer>
        <ControlsHolder>
          <button type="button" onClick={scrollPrev}>
            Previous
          </button>
          <button type="button" onClick={scrollNext}>
            Next
          </button>
        </ControlsHolder>
        <ScrollableItems ref={listContainerRef}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={DROPPABLE_CONTAINER_ID}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questions.map(({ id, content }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <DraggableQuestion
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
        </ScrollableItems>
      </ScrollableDraggableListContainer>
    );
  };

export { ScrollableDraggableList };

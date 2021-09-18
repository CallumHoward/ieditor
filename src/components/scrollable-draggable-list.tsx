import React, { FunctionComponent, useState, useRef, ReactNode } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { scrollToElement } from "../utils/scrollToElement";

const DROPPABLE_CONTAINER_ID = "droppable";

type ListItemProps = {
  isDragging?: boolean;
};

type ListItem = {
  key: string;
  node: (props: ListItemProps) => ReactNode;
};

type ScrollableDraggableListProps = {
  onNextControl?: (index: number) => void;
  onPrev?: (index: number) => void;
  initialItems: ListItem[];
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
  ({ initialItems }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const listContainerRef = useRef<HTMLDivElement | null>(null);
    const [items, setItems] = useState<ListItem[]>(initialItems);

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      const newItems = [...items];
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setItems(newItems);
      setCurrentIndex(result.destination.index);
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
                  {items.map(({ key, node }, index) => (
                    <Draggable key={key} draggableId={key} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {node({ isDragging: snapshot.isDragging })}
                        </div>
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

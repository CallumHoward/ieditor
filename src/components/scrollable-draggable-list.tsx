import React, {
  FunctionComponent,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled, { css } from "styled-components";
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
  /**
   * For this component height to work either set the height explicitly
   * as a prop or set the height of the parent container it is in
   */
  height?: number;
};

const ComponentContainer = styled.div<{ $height?: number }>`
  width: 100%;
  overflow: hidden;
  position: relative;

  ${({ $height }) =>
    $height
      ? css`
          height: ${$height}px;
        `
      : css`
          height: 100%;
        `}
`;

const ControlsHolder = styled.div`
  position: absolute;
  right: 0;
`;

const ScrollableItems = styled.div`
  height: 100%;
  overflow: scroll;

  // add empty space at the end so that the last item has room to scroll up
  &::after {
    display: inline-block;
    height: 500px;
    width: 100px;
    content: "";
  }
`;

const ScrollableDraggableList: FunctionComponent<ScrollableDraggableListProps> =
  ({ initialItems, height }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items, setItems] = useState<ListItem[]>(initialItems);
    const listContainerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);

    const intersectionCallback = (
      intersectingItemRefs: IntersectionObserverEntry[]
    ) => {
      intersectingItemRefs.forEach((itemRef) => {
        if (itemRef.isIntersecting) {
          const itemIndex = Number(
            itemRef.target.getAttribute("list-item-index")
          );
          setCurrentIndex(itemIndex);
        }
      });
    };

    useEffect(() => {
      const observer = new IntersectionObserver(intersectionCallback, {
        root: listContainerRef.current,
        threshold: 1.0,
        // shrink the observable area by 30% so that the item that is
        // closer to the top of the viewport is treated as the current
        // one the user is looking at
        rootMargin: "0px 0px -30% 0px",
      });

      itemRefs.current.forEach((ref) => {
        observer.observe(ref);
      });

      return () => {
        observer.disconnect();
      };
    }, []);

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

    const scrollToIndex = (newIndex: number) => {
      if (
        !itemRefs.current ||
        newIndex >= itemRefs.current.length ||
        newIndex < 0
      ) {
        return;
      }

      scrollToElement({
        element: itemRefs.current[newIndex] as HTMLElement,
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

    const updateItemRef = (newRef: HTMLDivElement | null, index: number) => {
      if (!itemRefs.current || !newRef) {
        return;
      }

      if (index === itemRefs.current.length) {
        itemRefs.current.push(newRef);
      } else {
        itemRefs.current[index] = newRef;
      }
    };

    return (
      <ComponentContainer $height={height}>
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
                          list-item-index={index}
                          ref={(ref) => {
                            // TODO: ref gets called every re-render
                            // investigate if this is a performance concern
                            provided.innerRef(ref);
                            updateItemRef(ref, index);
                          }}
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
      </ComponentContainer>
    );
  };

export { ScrollableDraggableList };

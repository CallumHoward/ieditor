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

export type ListIndexData = {
  value: number;
  shouldAutoScroll?: boolean;
};

type ScrollableDraggableListProps = {
  initialItems: ListItem[];
  /**
   * For this component height to work either set the height explicitly
   * as a prop or set the height of the parent container it is in
   */
  height?: number;
  currentIndex: ListIndexData;
  onChangeIndex: (newIndex: number) => void;
};

const ComponentContainer = styled.div<{ $height?: number }>`
  width: 100%;
  overflow: hidden;

  ${({ $height }) =>
    $height
      ? css`
          height: ${$height}px;
        `
      : css`
          height: 100%;
        `}
`;

const ScrollableItems = styled.div`
  height: 100%;
  overflow: scroll;

  // add empty space at the end so that the last item has room to scroll up
  &::after {
    display: inline-block;
    height: 300px;
    width: 100%;
    content: "";
  }
`;

const ScrollableDraggableList: FunctionComponent<ScrollableDraggableListProps> =
  ({ initialItems, height, currentIndex, onChangeIndex }) => {
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
          onChangeIndex(itemIndex);
        }
      });
    };

    useEffect(() => {
      const observer = new IntersectionObserver(intersectionCallback, {
        root: listContainerRef.current,
        // shrink the observable area by 99% so that the top item
        // is treated as the current one the user is looking at
        rootMargin: "0px 0px -99% 0px",
        // 0.01 of the item needs to be within the observable area
        // to trigger the intersectionCallback
        threshold: 0.01,
      });

      itemRefs.current.forEach((ref) => {
        observer.observe(ref);
      });

      return () => {
        observer.disconnect();
      };
    }, []);

    useEffect(() => {
      if (currentIndex.shouldAutoScroll) {
        scrollToIndex(currentIndex.value);
      } else {
        onChangeIndex(currentIndex.value);
      }
    }, [currentIndex.value]);

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      const newItems = [...items];
      const [removed] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);
      setItems(newItems);
      onChangeIndex(result.destination.index);
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
        offsetPx: 50,
      });
      onChangeIndex(newIndex);
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

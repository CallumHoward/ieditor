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
import deepEqual from "fast-deep-equal/react";

const DROPPABLE_CONTAINER_ID = "droppable";

// TODO: Make ListMeta generic to make this component more reusable
export type ListMeta = {
  editing: boolean;
  focusMode: boolean;
};

export type ListItemProps = {
  isDragging?: boolean;
  currentIndex: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  index: number;
  meta: ListMeta;
};

export type ListItem = {
  key: string;
  node: (props: ListItemProps) => ReactNode;
};

export type ListIndexData = {
  value: number;
  shouldAutoScroll?: boolean;
};

type ScrollAlignmentMode = "center" | "start";

type ScrollableDraggableListProps = {
  initialItems: ListItem[];
  /**
   * For this component height to work either set the height explicitly
   * as a prop or set the height of the parent container it is in
   */
  height?: number;
  currentIndex: ListIndexData;
  scrollPrev: () => void;
  scrollNext: () => void;
  onChangeIndex: (newIndex: number) => void;
  scrollAlignmentMode: ScrollAlignmentMode;
  meta: ListMeta;
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

const ScrollableItems = styled.div<{ focusMode: boolean }>`
  height: 100%;
  overflow: scroll;
  scroll-snap-type: y mandatory;

  // add empty space at the end so that the last item has room to scroll up
  &::after {
    display: inline-block;
    transition: height 500ms ease;
    width: 100%;
    height: 100vh;
    content: "";
  }

  &::before {
    display: inline-block;
    transition: height 500ms ease;
    width: 100%;
    content: "";
    ${({ focusMode }) => (focusMode ? "height: 25vh" : "height: 0")};
  }
`;

const SnapScrollContainer = styled.div<{
  scrollAlignment: ScrollAlignmentMode;
}>`
  ${({ scrollAlignment }) =>
    css`
      scroll-snap-align: ${scrollAlignment};
    `}
`;

const intersectionCallback =
  (onChangeIndex: (newIndex: number) => void) =>
  (intersectingItemRefs: IntersectionObserverEntry[]) => {
    intersectingItemRefs.forEach((itemRef) => {
      const itemIndex = Number(itemRef.target.getAttribute("list-item-index"));

      if (itemRef.isIntersecting) {
        console.log(itemIndex);
        onChangeIndex(itemIndex);
      }
    });
  };

const ScrollableDraggableListBase: FunctionComponent<ScrollableDraggableListProps> =
  ({
    initialItems,
    height,
    currentIndex,
    scrollPrev,
    scrollNext,
    onChangeIndex,
    meta,
    scrollAlignmentMode,
  }) => {
    const [items, setItems] = useState<ListItem[]>(initialItems);
    const listContainerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
      const startAlignmentObserver = new IntersectionObserver(
        intersectionCallback(onChangeIndex),
        {
          root: listContainerRef.current,
          // shrink the observable area by 99% so that the top item
          // is treated as the current one the user is looking at
          rootMargin: "0px 0px -99% 0px",
          // 0.01 of the item needs to be within the observable area
          // to trigger the intersectionCallback
          threshold: 0.01,
        }
      );

      const centerAlignmentObserver = new IntersectionObserver(
        intersectionCallback(onChangeIndex),
        {
          root: listContainerRef.current,
          rootMargin: "-49% 0px -49% 0px",
          threshold: 0.01,
        }
      );

      if (scrollAlignmentMode === "start") {
        itemRefs.current.forEach((ref) => {
          startAlignmentObserver.observe(ref);
        });
      } else {
        itemRefs.current.forEach((ref) => {
          centerAlignmentObserver.observe(ref);
        });
      }

      return () => {
        startAlignmentObserver.disconnect();
        centerAlignmentObserver.disconnect();
      };
    }, [onChangeIndex, scrollAlignmentMode]);

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
        <ScrollableItems ref={listContainerRef} focusMode={meta.focusMode}>
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
                          <SnapScrollContainer
                            scrollAlignment={scrollAlignmentMode}
                          >
                            {node({
                              isDragging: snapshot.isDragging,
                              index,
                              currentIndex: currentIndex.value,
                              scrollPrev,
                              scrollNext,
                              meta,
                            })}
                          </SnapScrollContainer>
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

const ScrollableDraggableList = React.memo(
  ScrollableDraggableListBase,
  (prevProps, nextProps) => deepEqual(prevProps, nextProps)
);

export { ScrollableDraggableList };

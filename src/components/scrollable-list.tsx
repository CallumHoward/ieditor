import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import styled from "styled-components";

type ScrollableListProps = {
  onNext?: (index: number) => void;
  onPrev?: (index: number) => void;
};

const ScrollableListContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const ControlsHolder = styled.div``;

const ScrollableItems = styled.div`
  height: 100%;
  overflow: scroll;
`;

const ScrollableList: FunctionComponent<ScrollableListProps> = ({
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const getChildren = () => {
    if (!listContainerRef?.current) {
      return;
    }

    return listContainerRef.current.children;
  };

  return (
    <ScrollableListContainer>
      <ControlsHolder>
        <button
          type="button"
          onClick={() => {
            getChildren()?.[7].scrollIntoView({ behavior: "smooth" });
          }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            getChildren()?.[9].scrollIntoView({ behavior: "smooth" });
          }}
        >
          Next
        </button>
      </ControlsHolder>
      <ScrollableItems ref={listContainerRef}></ScrollableItems>
    </ScrollableListContainer>
  );
};

export { ScrollableList };

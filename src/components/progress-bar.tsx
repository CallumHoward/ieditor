import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const Track = styled.div`
  background: #6559ff;
  height: 0.5rem;
  width: 100%;
`;

const MyThumb = styled.div<{ position: number }>`
  height: 1rem;
  width: 1rem;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: -0.25rem;
  transition: left 400ms ease;
  ${({ position }) => `left: ${position}px`};
`;

type ProgressBarProps = {
  totalSteps: number;
  myIndex: number;
};

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  totalSteps,
  myIndex,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  useEffect(() => {
    const trackWidth = trackRef.current?.getBoundingClientRect().width;
    if (trackWidth) {
      setThumbPosition((myIndex / totalSteps) * trackWidth);
    }
  }, [myIndex, totalSteps]);

  return (
    <ProgressBarWrapper>
      <Track ref={trackRef}>
        <MyThumb position={thumbPosition} />
      </Track>
    </ProgressBarWrapper>
  );
};

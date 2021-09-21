import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { NAVBAR_HEIGHT } from "./nav-bar-styled";

type ProgressBarProps = {
  totalSteps: number;
  stepStatus: StepStatus[];
  myIndex: number;
  stepSize?: number;
};

export enum StepStatus {
  COMPLETE = "complete",
  TOUCHED = "touched",
  UNSEEN = "unseen",
}

const StepStatusColours = {
  COMPLETE: "#6559ff",
  PENDING: "#a39ef0",
  EMPTY: "transparent",
};

const ProgressBarWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: ${NAVBAR_HEIGHT};
  left: 0;
`;

const Track = styled.div<{ totalSteps: number }>`
  display: grid;
  background: #ddd;
  height: 0.5rem;
  width: 100%;
  grid-template-rows: 100%;

  ${({ totalSteps }) =>
    css`
      grid-template-columns: repeat(${totalSteps}, 1fr);
    `}
`;

const Step = styled.div<{ colour: string; isEmptyStep: boolean }>`
  height: 100%;

  ${({ colour, isEmptyStep }) => css`
    background-color: ${colour};
    width: ${isEmptyStep ? "0" : "100%"};
  `}
`;

const MyThumb = styled.div<{ position: number }>`
  height: 1rem;
  width: 1rem;
  background: #6559ff;
  border-radius: 50%;
  position: absolute;
  top: -0.25rem;
  transition: left 400ms ease;
  ${({ position }) => `left: calc(${position}px - 1rem)`};
`;

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  myIndex,
  stepStatus,
  stepSize = 1,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  useEffect(() => {
    const trackWidth = trackRef.current?.getBoundingClientRect().width;
    if (trackWidth) {
      setThumbPosition(
        (((myIndex + 1) * stepSize) / stepStatus.length) * trackWidth
      );
    }
  }, [myIndex, stepStatus]);

  const getStepColour = (stepStatus: StepStatus, stepIndex: number) => {
    if (stepIndex > myIndex) {
      return StepStatusColours.EMPTY;
    }

    if (stepStatus === StepStatus.COMPLETE) {
      return StepStatusColours.COMPLETE;
    }

    return StepStatusColours.PENDING;
  };

  return (
    <ProgressBarWrapper>
      <Track
        ref={trackRef}
        totalSteps={Math.floor(stepStatus.length / stepSize)}
      >
        <MyThumb position={thumbPosition} />
        {stepStatus.map((status, index) => (
          <Step
            key={`progress-step-${index}`}
            colour={getStepColour(status, index)}
            isEmptyStep={index > myIndex}
          />
        ))}
      </Track>
    </ProgressBarWrapper>
  );
};

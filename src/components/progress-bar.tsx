import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useUserProvider } from "../contexts/user-context";
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

export const Track = styled.div<{ totalSteps: number }>`
  display: grid;
  background: #dee4ed;
  height: 4px;
  width: 100%;
  grid-template-rows: 100%;

  ${({ totalSteps }) =>
    css`
      grid-template-columns: repeat(${totalSteps}, 1fr);
    `}
`;

const Step = styled.div<{ colour: string; isEmptyStep: boolean }>`
  height: 100%;
  // &:last-child {
  //   transition: width 400ms ease;
  // }

  ${({ colour, isEmptyStep }) => css`
    background-color: ${colour};
    width: ${isEmptyStep ? "0" : "100%"};
  `}
`;

const Thumb = styled.div<{ position: number; color: string }>`
  height: 6px;
  width: 6px;
  background: ${({ color }) => color};
  position: absolute;
  top: -2px;
  transition: left 150ms ease;
  ${({ position }) => `left: calc(${position}px - 8px)`};
  border: 1px solid white;
  border-radius: 50%;
`;

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  myIndex,
  stepStatus,
  stepSize = 1,
}) => {
  const { allUsers } = useUserProvider();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const getThumbPosition = (stepIndex: number) => {
    const trackWidth = trackRef.current?.getBoundingClientRect().width;
    if (trackWidth) {
      return (((stepIndex + 1) * stepSize) / stepStatus.length) * trackWidth;
    }
    return 0;
  };

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
        {Object.entries(allUsers).map(([id, user]) => (
          <Thumb
            key={id}
            position={getThumbPosition(user.currentIndex)}
            color={user.currentIndex !== myIndex ? user.color : "#6559ff"}
          />
        ))}
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

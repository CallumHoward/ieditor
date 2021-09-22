import React, { FunctionComponent, useRef } from "react";
import styled, { css } from "styled-components";
import { User, useUserProvider } from "../contexts/user-context";
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

const ProgressBarWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: ${NAVBAR_HEIGHT};
  left: 0;
`;

const Track = styled.div<{ totalSteps: number }>`
  display: grid;
  background: #fff;
  height: 4px;
  width: 100%;
  grid-template-rows: 100%;

  ${({ totalSteps }) =>
    css`
      grid-template-columns: repeat(${totalSteps}, 1fr);
    `}
`;

const Step = styled.div<{ colour: string; opacity: number }>`
  height: 100%;

  transition: background-color 700ms ease;
  ${({ colour, opacity }) => css`
    background-color: ${colour};
    opacity: ${opacity};
  `}
`;

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  myIndex,
  stepStatus,
  stepSize = 1,
}) => {
  const { allUsers } = useUserProvider();
  const userColourMapCounter = useRef(0);

  /**
   *
   * Get a list of users sorted by the current step index they are at,
   * but no more than one user per step
   */
  const getUserColourMap = (): User[] => {
    const colourMap = new Map();
    Object.values(allUsers).forEach((user) => {
      colourMap.set(user.currentIndex, user);
    });

    const usersSortedByStepIndex = Array.from(colourMap.values()).sort(
      (u1, u2) => u1.currentIndex - u2.currentIndex
    );
    return usersSortedByStepIndex;
  };

  const getStepColour = (stepStatus: StepStatus, stepIndex: number) => {
    const userColourMap = getUserColourMap();
    if (stepIndex === 0) {
      userColourMapCounter.current = 0;
    }

    const currentUserForThisStep = userColourMap[userColourMapCounter.current];
    // TODO: why can user colour be undefined???
    if (!currentUserForThisStep?.color) {
      return {
        hex: "#FFF",
        opacity: 0,
      };
    }

    let stepColour = "";

    if (currentUserForThisStep.currentIndex === myIndex) {
      stepColour = "#6559ff";
    } else {
      stepColour = currentUserForThisStep.color;
    }

    if (
      userColourMapCounter.current < userColourMap.length - 1 &&
      currentUserForThisStep.currentIndex === stepIndex
    ) {
      userColourMapCounter.current++;
    }

    // return stepColour;

    if (stepIndex > myIndex) {
      return {
        hex: stepColour,
        opacity: 0.2,
      };
    }

    if (stepStatus === StepStatus.COMPLETE) {
      return {
        hex: stepColour,
        opacity: 1,
      };
    }

    return {
      hex: stepColour,
      opacity: 1,
    };
  };

  return (
    <ProgressBarWrapper>
      <Track totalSteps={Math.floor(stepStatus.length / stepSize)}>
        {stepStatus.map((status, index) => {
          const colour = getStepColour(status, index);
          return (
            <Step
              key={`progress-step-${index}`}
              colour={colour.hex}
              opacity={colour.opacity}
            />
          );
        })}
      </Track>
    </ProgressBarWrapper>
  );
};

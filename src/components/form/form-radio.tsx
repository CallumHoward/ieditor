import React, { FunctionComponent } from "react";
import { StyledButton } from "../question-styled";

export const FormRadio: FunctionComponent = () => {
  return (
    <>
      <StyledButton>Yes</StyledButton>
      <StyledButton>No</StyledButton>
      <StyledButton>N/A</StyledButton>
    </>
  );
};

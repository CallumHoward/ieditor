import React, { FunctionComponent } from "react";
import { useField } from "react-final-form";
import { StyledButton } from "../question-styled";

type Props = {
  name: string;
} & React.HTMLProps<HTMLInputElement>;

export const FormRadio: FunctionComponent<Props> = ({ name }) => {
  const { radio } = useField(name, {});
  return (
    <>
      <StyledButton {...radio}>Yes</StyledButton>
      <StyledButton {...radio}>No</StyledButton>
      <StyledButton {...radio}>N/A</StyledButton>
    </>
  );
};

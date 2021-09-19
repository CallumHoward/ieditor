import React, { FunctionComponent } from "react";
import { useField } from "react-final-form";
import { StyledInput } from "../question-styled";

type Props = {
  name: string;
} & React.HTMLProps<HTMLInputElement>;

export const FormInput: FunctionComponent<Props> = ({ name }) => {
  const { input } = useField(name, {});
  return <StyledInput {...input} />;
};

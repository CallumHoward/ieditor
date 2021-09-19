import React, { FunctionComponent } from "react";
import { useField, useForm } from "react-final-form";
import { StyledInput } from "../question-styled";

type Props = {
  name: string;
} & React.HTMLProps<HTMLInputElement>;

export const FormInput: FunctionComponent<Props> = ({ name }) => {
  const { input } = useField(name, {});
  const form = useForm();
  console.log("getRegisteredFields", form.getState().values);
  return <StyledInput {...input} />;
};

import React, { ChangeEventHandler, FunctionComponent } from "react";
import { useField } from "react-final-form";
import { useYProvider } from "../../contexts/yjs-context";
import { StyledTextArea } from "../question-styled";

type Props = {
  name: string;
} & React.HTMLProps<HTMLInputElement>;

export const FormTextArea: FunctionComponent<Props> = ({ name }) => {
  const { input } = useField(name, {});
  const { ymap } = useYProvider();

  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newValue = e.target.value;
    input.onChange(newValue);
    ymap.set(name, newValue);
  };

  return <StyledTextArea {...input} onChange={handleOnChange} />;
};

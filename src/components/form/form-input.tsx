import React, { ChangeEventHandler, FunctionComponent } from "react";
import { useField } from "react-final-form";
import { useYProvider } from "../../contexts/yjs-context";
import { StyledInput } from "../question-styled";

type Props = {
  name: string;
  onBlur?: () => void;
} & React.HTMLProps<HTMLInputElement>;

export const FormInput: FunctionComponent<Props> = ({ name, onBlur }) => {
  const { input } = useField(name, {});
  const { ymap } = useYProvider();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    if (newValue) {
      input.onChange(newValue);
      ymap.set(name, newValue);
    }
  };

  return <StyledInput {...input} onChange={handleOnChange} onBlur={onBlur} />;
};

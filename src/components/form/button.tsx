import React, { FunctionComponent } from "react";
import { StyledButton } from "../question-styled";
import { Option } from "./form-radio";

type Props = {
  value: string;
  onChange: (value: string) => void;
  active?: boolean;
  option: Option;
};

export const Button: FunctionComponent<Props> = ({
  value,
  onChange,
  active = false,
  option,
}) => {
  return (
    <StyledButton
      onClick={() => {
        onChange(value);
      }}
      active={active}
      activeColor={option?.meta?.color}
    >
      {option.label}
    </StyledButton>
  );
};

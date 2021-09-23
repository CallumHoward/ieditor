import React, { FunctionComponent } from "react";
import { StyledButton } from "../question-styled";
import { Option } from "./form-radio";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  active?: boolean;
  option: Option;
};

export const Button: FunctionComponent<Props> = ({
  value,
  onChange,
  onClick = () => {},
  active = false,
  option,
}) => {
  return (
    <StyledButton
      onClick={() => {
        onChange(value);
        onClick();
      }}
      active={active}
      activeColor={option?.meta?.color}
    >
      {option.label}
    </StyledButton>
  );
};

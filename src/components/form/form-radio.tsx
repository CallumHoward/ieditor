import React, { FunctionComponent } from "react";
import { useField, useForm } from "react-final-form";
import { Button } from "./button";

export type Option = {
  label: string;
  value: string;
  meta?: Record<string, string>;
};

type Props = {
  name: string;
  onChange: (value: string) => void;
  options?: Array<Option>;
} & React.HTMLProps<HTMLInputElement>;

const defaultOptions: Array<Option> = [
  { label: "Yes", value: "yes", meta: { color: "#13855f" } },
  { label: "No", value: "no", meta: { color: "#c60022" } },
  { label: "N/A", value: "na", meta: { color: "#707070" } },
];

export const FormRadio: FunctionComponent<Props> = ({
  name,
  onChange,
  options = defaultOptions,
}) => {
  const { input } = useField(name, { type: "radio" });
  const form = useForm();
  const currentValue = form.getState().values[name];

  return (
    <>
      {options.map((option, index) => (
        <Button
          key={index}
          {...input}
          onChange={(value) => {input.onChange(value); onChange(value)}}
          value={option.value}
          active={currentValue === option.value}
          option={option}
        >
          {option.label}
        </Button>
      ))}
    </>
  );
};

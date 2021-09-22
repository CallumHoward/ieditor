import React, { FunctionComponent } from "react";
import { useField } from "react-final-form";
import { QuestionLabel } from "../question-styled";

type Props = {
  name: string;
  value: string;
  className?: string;
};

const ControlledQuestionLabel: FunctionComponent<Props> = ({
  value,
  ...props
}) => <QuestionLabel {...props}>{value}</QuestionLabel>;

export const FormQuestionLabel: FunctionComponent<Omit<Props, "value">> = ({
  name,
  ...props
}) => {
  const { input } = useField(name, {});

  return <ControlledQuestionLabel {...props} {...input} />;
};

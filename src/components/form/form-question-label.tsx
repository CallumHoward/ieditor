import React, { FunctionComponent } from "react";
import { useField } from "react-final-form";
import { QuestionLabel } from "../question-styled";

const ControlledQuestionLabel: FunctionComponent<{ value: string }> = ({
  value,
}) => <QuestionLabel>{value}</QuestionLabel>;

type Props = {
  name: string;
} & React.HTMLProps<HTMLDivElement>;

export const FormQuestionLabel: FunctionComponent<Props> = ({ name }) => {
  const { input } = useField(name, {});

  return <ControlledQuestionLabel {...input} />;
};

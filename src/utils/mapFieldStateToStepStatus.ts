import { FieldState } from "final-form";
import { StepStatus } from "../components/progress-bar";

export const mapFieldStateToStepStatus = (
  fieldState?: FieldState<never>
): StepStatus => {
  if (fieldState?.value) {
    return StepStatus.COMPLETE;
  }
  if (fieldState?.active || fieldState?.touched) {
    return StepStatus.TOUCHED;
  }

  return StepStatus.UNSEEN;
};

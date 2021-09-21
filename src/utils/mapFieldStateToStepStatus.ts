import { FieldState } from "final-form";
import { StepStatus } from "../components/progress-bar";

export const mapFieldStateToStepStatus = (
  isEditing: boolean,
  fieldState?: FieldState<never>
): StepStatus => {
  // Do not show partial completion for edit mode
  if (isEditing) {
    return StepStatus.COMPLETE;
  }

  if (fieldState?.value) {
    return StepStatus.COMPLETE;
  }
  if (fieldState?.active || fieldState?.touched) {
    return StepStatus.TOUCHED;
  }

  return StepStatus.UNSEEN;
};

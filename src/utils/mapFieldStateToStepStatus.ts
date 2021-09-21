import { FieldState } from "final-form";
import { StepStatus } from "../components/progress-bar";
import { QUESTION_INPUT_NAME_PREFIX } from "../pages/editor-page";

export const mapFieldStateToStepStatus = (
  isEditing: boolean,
  fieldName: string,
  fieldState?: FieldState<never>
): StepStatus | null => {
  // The question inputs do not contribute to the progress
  if (fieldName.startsWith(QUESTION_INPUT_NAME_PREFIX)) {
    return null;
  }

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

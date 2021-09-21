import { Mutator } from "final-form";
/**
 *
 * Add to <Form> to let you set the form values externally.
 * You can access this mutator easily with useForm().
 * Example usage:
 *
 * const form = useForm();
 * form.mutators.setValue('fieldName', 'value);
 *
 */
export const setValue: Mutator = (
  [field, value],
  formState,
  { changeValue }
) => {
  changeValue(formState, field, () => value);
};

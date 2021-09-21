import { useEffect } from "react";
import { useForm } from "react-final-form";
import { useYProvider } from "../../contexts/yjs-context";

const FormYJSObserver = () => {
  const { ymap } = useYProvider();
  const form = useForm();

  const updateFormValuesFromYJS = () => {
    const fieldsIterator = ymap.entries();

    let yMapEntries = fieldsIterator.next();
    while (!yMapEntries.done) {
      const fieldName = yMapEntries.value[0];
      const fieldValue = yMapEntries.value[1];

      form.mutators.setValue(fieldName, fieldValue);

      yMapEntries = fieldsIterator.next();
    }
  };

  useEffect(() => {
    ymap.observe(() => {
      updateFormValuesFromYJS();
    });
  }, []);

  return null;
};

export { FormYJSObserver };

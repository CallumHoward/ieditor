import { useEffect } from "react";
import { useForm } from "react-final-form";
import { useYProvider } from "../../contexts/yjs-context";

const FormYJSObserver = (): null => {
  const { ymap } = useYProvider();
  const form = useForm();

  const updateFormValuesFromYJS = (keysChanged: Set<string>) => {
    keysChanged.forEach((key) => {
      //FIXME hack to stop undo to blank state
      if (ymap.get(key)) {
        form.mutators.setValue(key, ymap.get(key));
      }
    });
  };

  useEffect(() => {
    ymap.observe((event) => {
      updateFormValuesFromYJS(event.keysChanged);
    });
  }, []);

  return null;
};

export { FormYJSObserver };

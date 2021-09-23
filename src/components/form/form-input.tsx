import React, {
  useEffect,
  useRef,
  ChangeEventHandler,
  FunctionComponent,
} from "react";
import { useField } from "react-final-form";
import { useYProvider } from "../../contexts/yjs-context";
import { StyledInput } from "../question-styled";

type Props = {
  name: string;
  onBlur?: () => void;
  onFocus: () => void;
  focused: boolean;
  focusMode: boolean;
} & React.HTMLProps<HTMLInputElement>;

export const FormInput: FunctionComponent<Props> = ({
  name,
  onBlur,
  onFocus,
  focusMode,
  focused,
}) => {
  const { input } = useField(name, {});
  const { ymap } = useYProvider();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      }
    }
  }, [inputRef]);

  //useEffect(() => {
  //  //FIXME https://codesandbox.io/s/react-final-form-how-to-get-ref-ekc6m?file=/index.js
  //  if (focused) {
  //    // setTimeout(() => {
  //    // inputRef.current?.focus({ preventScroll: true });
  //    inputRef.current?.focus();
  //    // }, 500);
  //  }
  //}, [focused]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    if (newValue) {
      input.onChange(newValue);
      ymap.set(name, newValue);
    }
  };

  return (
    <StyledInput
      className={"allow-click-to-scroll"}
      {...input}
      autoFocus={focusMode && focused}
      ref={inputRef}
      onChange={handleOnChange}
      // onBlur={inputRef.current === document.activeElement ? onBlur : undefined}
      onBlur={undefined}
      onFocus={onFocus}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (onBlur) {
            onBlur();
          }
          if (focused && inputRef.current !== null) {
            inputRef.current.blur();
          }
        }
      }}
    />
  );
};

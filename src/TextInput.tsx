import { Component, Accessor, Setter } from "solid-js";

import ConverterInput, { ConverterResult } from "./ConverterInput";

const TextInput: Component<{
  value: Accessor<string>;
  setValue: Setter<string>;
  placeholder?: string;
  debounce?: number;
}> = (props) => {
  const render = (value: string) => {
    return value;
  };
  const convert = (text: string): ConverterResult<string> => {
    return {
      type: "success",
      value: text,
    };
  };

  return (
    <>
      <ConverterInput
        value={props.value}
        setValue={props.setValue}
        placeholder={props.placeholder}
        convert={convert}
        render={render}
        debounce={props.debounce}
      />
    </>
  );
};

export default TextInput;

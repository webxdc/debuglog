import { Component, Accessor } from "solid-js";

import ConverterInput, { ConverterResult } from "./ConverterInput";

const DateInput: Component<{
  value: Accessor<Date | undefined>;
  setValue: (date: Date | undefined) => void;
  placeholder?: string;
}> = (props) => {
  const render = (value: Date | undefined) => {
    return value != null ? value.toISOString() : "";
  };
  const convert = (text: string): ConverterResult<Date | undefined> => {
    if (text.trim() === "") {
      return { type: "success", value: undefined };
    }
    let converted: Date;
    try {
      converted = new Date(text);
    } catch {
      return { type: "failure", message: "Illegal date" };
    }
    if (isNaN(converted as any)) {
      return { type: "failure", message: "Illegal date" };
    }
    return {
      type: "success",
      value: converted,
    };
  };

  return (
    <>
      <ConverterInput
        placeholder={props.placeholder}
        value={props.value}
        setValue={props.setValue}
        convert={convert}
        render={render}
        debounce={200}
      />
    </>
  );
};

export default DateInput;

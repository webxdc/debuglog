import { createEffect, createSignal, Accessor, Show } from "solid-js";
import { debounce } from "./debounce";

export type ConverterResult<T> =
  | { type: "success"; value: T }
  | { type: "failure"; message: string };

function ConverterInput<T>(props: {
  value: Accessor<T>;
  placeholder?: string;
  setValue: (value: T) => void;
  convert: (text: string) => ConverterResult<T>;
  render: (value: T) => string;
  debounce?: number;
}) {
  const value = () => {
    return props.render(props.value());
  };

  const [error, setError] = createSignal<string | undefined>(undefined);
  const [textValue, setTextValue] = createSignal(value());

  const setter = (text: string) => {
    const result = props.convert(textValue());
    if (result.type === "failure") {
      setError(result.message);
      return;
    }
    setError(undefined);
    props.setValue(result.value);
    setTextValue(props.render(result.value));
  };

  const setValue =
    props.debounce != null ? debounce(setter, props.debounce) : setter;

  createEffect(() => {
    setValue(textValue());
  });

  return (
    <>
      <input
        type="text"
        placeholder={props.placeholder}
        value={textValue()}
        onInput={(ev) => {
          setTextValue(ev.currentTarget.value);
        }}
      />
      <Show when={error()}>{(e) => e}</Show>
    </>
  );
}

export default ConverterInput;

import {
  createEffect,
  createSignal,
  Component,
  Accessor,
  Setter,
  Show,
} from "solid-js";

const DateInput: Component<{
  value: Accessor<Date | undefined>;
  setValue: Setter<Date | undefined>;
}> = (props) => {
  const value = () => {
    const v = props.value();
    if (v == null) {
      return "";
    }
    return v.toISOString();
  };

  const [error, setError] = createSignal<string | undefined>(undefined);
  const [textValue, setTextValue] = createSignal(value());

  createEffect(() => {
    if (textValue() === "") {
      setError(undefined);
      props.setValue(undefined);
      return;
    }
    let converted: Date;
    try {
      converted = new Date(textValue());
    } catch {
      setError("Illegal date");
      return;
    }
    if (isNaN(converted as any)) {
      setError("Illegal date");
      return;
    }
    setError(undefined);
    props.setValue(converted);
    setTextValue(converted.toISOString());
  });

  return (
    <>
      <input
        type="text"
        placeholder="Date"
        value={textValue()}
        onInput={(ev) => {
          setTextValue(ev.currentTarget.value);
        }}
      />
      <Show when={error()}>{(e) => e}</Show>
    </>
  );
};

export default DateInput;

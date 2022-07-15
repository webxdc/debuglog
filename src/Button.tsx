import { Component, JSX, mergeProps } from "solid-js";
import { mergeClass } from "./mergeClass";

const Button: Component<JSX.IntrinsicElements["button"]> = (props) => {
  const twClasses = `mr-1 rounded-lg border border-gray-200 bg-white py-1
  px-1 font-medium text-gray-900 hover:bg-gray-100
  hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4
  focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800
  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
  dark:focus:ring-gray-700 text-sm md:text-base lg:text-lg xl:2xl:text-2xl`;
  props = mergeProps(props, { class: mergeClass(props.class, twClasses) });
  return <button {...props} />;
};

export default Button;

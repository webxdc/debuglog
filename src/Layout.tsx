import { mergeProps, JSX } from "solid-js";

import { mergeClass } from "./mergeClass";

// based on
// https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
// the top answer was refined in https://jsfiddle.net/ot7wd3pe/3/

export function Container(props: JSX.HTMLAttributes<HTMLDivElement>) {
  props = mergeProps(props, {
    class: mergeClass(props.class, "flex h-screen flex-col"),
  });
  return <div {...props} />;
}

// this will grow to fit
export function Header(props: { children: JSX.Element }) {
  return <div class="shrink flex-grow-0 basis-auto">{props.children}</div>;
}

// this will grow to fit the rest of the available height,
// if the parent element is h-screen, see Container
export function Content(props: { children: JSX.Element }) {
  return (
    <div class="shrink flex-grow basis-auto overflow-y-auto">
      {props.children}
    </div>
  );
}

export function AppContainer(props: JSX.HTMLAttributes<HTMLDivElement>) {
  props = mergeProps(props, {
    class: mergeClass(
      props.class,
      "font-sans text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-2xl"
    ),
  });
  return <Container {...props} />;
}

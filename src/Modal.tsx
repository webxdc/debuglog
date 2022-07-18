import { Show, Component, Accessor, JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { AppContainer } from "./Layout";

const Modal: Component<{
  isOpen: Accessor<boolean>;
  onClose: () => void;
  children: JSX.Element;
}> = (props) => {
  return (
    <Portal>
      <Show when={props.isOpen()}>
        <AppContainer>
          <div
            class="fixed top-0 left-0 h-screen w-screen "
            classList={{ block: props.isOpen(), hidden: !props.isOpen() }}
          >
            <div
              class="absolute top-1/2 left-1/2 h-screen
                   w-screen -translate-x-1/2 -translate-y-1/2 bg-slate-200 py-2.5 pl-5"
            >
              {props.children}
              <a
                onClick={props.onClose}
                class="absolute top-1 right-3 font-semibold no-underline"
              >
                &times;
              </a>
            </div>
          </div>
        </AppContainer>
      </Show>
    </Portal>
  );
};

export default Modal;

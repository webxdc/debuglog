import { Show, Component, Accessor, createSignal, JSX } from "solid-js";
import { Portal } from "solid-js/web";

const Modal: Component<{
  isOpen: Accessor<boolean>;
  onClose: () => void;
  children: JSX.Element;
}> = (props) => {
  return (
    <Portal>
      <Show when={props.isOpen()}>
        <div id="popup" style={{ display: props.isOpen() ? "block" : "none" }}>
          <div class="popup-content">
            {props.children}
            <a onClick={props.onClose} class="close-popup">
              &times;
            </a>
          </div>
        </div>
      </Show>
    </Portal>
  );
};

export function createOpen() {
  const [isOpen, setIsOpen] = createSignal(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
}

export default Modal;

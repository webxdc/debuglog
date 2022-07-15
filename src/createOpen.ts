import { createSignal } from "solid-js";

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

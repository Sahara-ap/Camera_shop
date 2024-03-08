type TModalWrapperProps = {
  children: React.ReactNode;
}
function ModalWrapper({ children }: TModalWrapperProps) {
  return children as JSX.Element;
}

export { ModalWrapper };

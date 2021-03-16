import React from "react";
import { SlotHost, Slot } from "../";

type SimpleButtonProps = JSX.IntrinsicElements["button"];

const SimpleButton = SlotHost<SimpleButtonProps>((props) => {
  return (
    <button {...props}>
      <Slot>Default Button Text</Slot>
    </button>
  );
});

export default SimpleButton;

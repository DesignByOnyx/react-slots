import React, { isValidElement, useContext } from "react";
import { DEFAULT_SLOT_NAME, getSlotContent, SlotContext } from "./utils";

type SlotProps = {
  name?: string;
  [bindProps: string]: any;
};

const Slot: React.FC<SlotProps> = ({
  name = DEFAULT_SLOT_NAME,
  children: fallback,
  ...bindProps
}) => {
  const slotCtx = useContext(SlotContext);
  const slotContent = getSlotContent(slotCtx, name);
  if (typeof slotContent === "function") {
    return slotContent(bindProps);
  }
  return slotContent && (!Array.isArray(slotContent) || slotContent.length)
    ? React.Children.map(slotContent, (child) => {
        return isValidElement(child) &&
          typeof child.props.children === "function"
          ? // render prop - pass all bound props
            child.props.children(bindProps)
          : child;
      })
    : fallback || null;
};

export default Slot;

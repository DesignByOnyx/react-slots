import React, { isValidElement, ReactNode, useContext, useMemo } from "react";
import {
  DEFAULT_SLOT_NAME,
  PARENT_SLOT_CTX,
  SlotContext,
  SlotDict
} from "./utils";
import Slot from "./Slot";
import Template from "./Template";
import IfSlotAssigned from "./IfSlotAssigned";

export const makeContextFromChildren = (
  children: ReactNode | ReactNode[],
  parentContext?: SlotDict
) => {
  return React.Children.toArray(children).reduce(
    (obj: SlotDict, child) => {
      if (isValidElement(child)) {
        const { slot, children } = child.props;
        if (slot && slot !== DEFAULT_SLOT_NAME) {
          // named slot, last one wins, even if it's nullish
          // TODO: collect all?
          obj[slot] =
            child.type === Template
              ? children == null
                ? null
                : children
              : child;
          return obj;
        }
      }
      obj[DEFAULT_SLOT_NAME].push(child);
      return obj;
    },
    {
      [DEFAULT_SLOT_NAME]: [],
      [PARENT_SLOT_CTX]: parentContext
    }
  );
};

/**
 * Higher Order Component for creating a slotted component
 * @param Component
 * @returns
 */
const SlotHost = <P,>(Component: React.ComponentType<P>): React.FC<P> => ({
  children,
  ...props
}) => {
  const slotCtx = useContext(SlotContext);
  const namedSlots = useMemo(() => {
    return makeContextFromChildren(children, slotCtx);
  }, [children]);

  return (
    <SlotContext.Provider value={namedSlots}>
      <Component {...(props as P)} />
    </SlotContext.Provider>
  );
};

export { SlotHost, Slot, Template, IfSlotAssigned };

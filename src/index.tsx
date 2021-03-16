import React, {
  createContext,
  useContext,
  useMemo,
  isValidElement,
  ReactElement
} from "react";
import {
  DEFAULT_SLOT_NAME,
  PARENT_SLOT_CTX,
  SlotDict,
  getSlotContent
} from "./utils";

type SlotProps = {
  name?: string;
  [bindProps: string]: any;
};
type TemplateProps = {
  slot: string;
};
type IfSlotAssignedProps = {
  name: string;
};

const SlotContext = createContext({} as SlotDict);

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
    return React.Children.toArray(children).reduce(
      (obj: SlotDict, child) => {
        if (isValidElement(child)) {
          const { slot, children } = child.props;
          if (slot && slot !== DEFAULT_SLOT_NAME) {
            // named slot, last one wins, even if it's nullish
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
        [PARENT_SLOT_CTX]: slotCtx
      }
    );
  }, [children]);

  return (
    <SlotContext.Provider value={namedSlots}>
      <Component {...(props as P)} />
    </SlotContext.Provider>
  );
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

const Template: React.FC<TemplateProps> = ({ children }) =>
  children as ReactElement;
Template.defaultProps = { slot: DEFAULT_SLOT_NAME };

/**
 * Renders content only when the named slot is assigned content.
 */
const IfSlotAssigned: React.FC<IfSlotAssignedProps> = ({ name, children }) => {
  const slotCtx = useContext(SlotContext);
  return slotCtx.hasOwnProperty(name) ? (children as ReactElement) : null;
};

export { SlotHost, Slot, Template, IfSlotAssigned };

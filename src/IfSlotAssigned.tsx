import { ReactElement, useContext } from "react";
import { SlotContext } from "./utils";

type IfSlotAssignedProps = {
  name: string;
};

/**
 * Renders content only when the named slot is assigned content.
 */
const IfSlotAssigned: React.FC<IfSlotAssignedProps> = ({ name, children }) => {
  const slotCtx = useContext(SlotContext);
  return slotCtx.hasOwnProperty(name) ? (children as ReactElement) : null;
};

export default IfSlotAssigned;

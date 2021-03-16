import React from "react";
import { SlotHost, Slot, IfSlotAssigned } from "../..";

type DataProviderProps = JSX.IntrinsicElements["div"];

const DataProvider: React.FC<DataProviderProps> = ({ className, ...props }) => {
  const user = { id: 1234, name: "Nina Conti" };
  return (
    <div className={`page-layout ${className || ""}`} {...props}>
      <Slot name="header" user={user} foo="bar" />
      <Slot name="footer" user={user} bing="baz" />
    </div>
  );
};

export default SlotHost(DataProvider);

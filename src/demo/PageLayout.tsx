import React from "react";
import { SlotHost, Slot, IfSlotAssigned } from "../";

type PageLayoutProps = JSX.IntrinsicElements["div"];

const PageLayout: React.FC<PageLayoutProps> = (props) => {
  return (
    <div className="page-layout">
      <header>
        <Slot name="header">Default Header</Slot>
      </header>
      <div className="content">
        <main>
          <Slot />
        </main>
        <aside>
          <Slot name="aside">Default aside</Slot>
        </aside>
      </div>
      <IfSlotAssigned name="footer">
        <footer>
          <Slot name="footer">Default footer</Slot>
        </footer>
      </IfSlotAssigned>
    </div>
  );
};

export default SlotHost(PageLayout);

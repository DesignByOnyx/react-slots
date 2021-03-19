import React from "react";
import { SlotHost, Slot } from "../..";
import CodeExample from "./CodeExample";

type DemoContainerProps = JSX.IntrinsicElements["details"] & {
  summary: string;
};

const DemoContainer = SlotHost<DemoContainerProps>(({ summary, ...props }) => {
  return (
    <details {...props}>
      <summary>{summary}</summary>
      <CodeExample title="Component Code:">
        <Slot name="component-code" />
      </CodeExample>
      <Slot />
    </details>
  );
});

export default DemoContainer;

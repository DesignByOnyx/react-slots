import React from "react";
import { SlotHost, Slot, IfSlotAssigned } from "../";

type CodeExampleProps = JSX.IntrinsicElements["div"] & {
  title: string;
};

const CodeExample = SlotHost<CodeExampleProps>(
  ({ title, className, ...props }) => {
    return (
      <div className={`code-example ${className || ""}`} {...props}>
        <div>
          <h3>{title}</h3>
          <pre>
            <code>
              <Slot />
            </code>
          </pre>
        </div>
        <IfSlotAssigned name="result">
          <div>
            <h4>Result:</h4>
            <Slot name="result" />
          </div>
        </IfSlotAssigned>
      </div>
    );
  }
);

export default CodeExample;

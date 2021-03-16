import React from "react";
import { Slot, SlotHost } from "../..";

type ClassComponentProps = JSX.IntrinsicElements["div"];

class ClassComponent extends React.Component<ClassComponentProps> {
  render() {
    return (
      <div>
        <div>
          Foo: <Slot name="foo" />
        </div>
        <div>
          Bar: <Slot name="bar" />
        </div>
      </div>
    );
  }
}

export default SlotHost(ClassComponent);

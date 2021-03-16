import React from "react";
import ReactDOM from "react-dom";
import SimpleButton from "./SimpleButton";
import "./index.scss";
import DemoContainer from "./DemoContainer";
import { Template } from "..";
import PageLayout from "./PageLayout";
import CodeExample from "./CodeExample";

const trimFirst = (str: string) => str.slice(1);

const ReactSlotsDemo = () => (
  <div>
    <h1>React Slots Component Demo</h1>

    <DemoContainer summary="Simple Button">
      <Template slot="component-code">
        {trimFirst(`
<button {...props}>
    <Slot>Default Button Text</Slot>
</button>`)}
      </Template>
      <CodeExample title="Simple Usage:">
        {`<SimpleButton />`}
        <SimpleButton slot="result" />
      </CodeExample>

      <CodeExample title="Full Usage:">
        {`<SimpleButton>Click Me!</SimpleButton>`}
        <SimpleButton slot="result">Click Me!</SimpleButton>
      </CodeExample>
    </DemoContainer>

    <DemoContainer summary="Page Layout">
      <Template slot="component-code">
        {trimFirst(`
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
</div>`)}
      </Template>

      <CodeExample title="Simple Usage:">
        {`<PageLayout>Main Content</PageLayout>`}
        <PageLayout slot="result">Main Content</PageLayout>
      </CodeExample>

      <CodeExample title="Full Usage:">
        {trimFirst(`
<PageLayout>
    <span slot="header">Logo and primary navigation</span>
    <p>Main content</p>
    <SimpleButton>Deeply nested button!</SimpleButton>
    <span slot="aside">Side navigation, advertisements</span>
    <div slot="footer">Footer navigation, contact info</div>
</PageLayout>`)}
        <PageLayout slot="result">
          <span slot="header">Logo and primary navigation</span>
          <p>Main content</p>
          <SimpleButton>Deeply nested button!</SimpleButton>
          <span slot="aside">Side navigation, advertisements</span>
          <div slot="footer">Footer navigation, contact info</div>
        </PageLayout>
      </CodeExample>
    </DemoContainer>
  </div>
);

ReactDOM.render(<ReactSlotsDemo />, document.getElementById("root"));

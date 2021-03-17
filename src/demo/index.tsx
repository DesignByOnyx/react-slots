import React from "react";
import ReactDOM from "react-dom";
import SimpleButton from "./components/SimpleButton";
import "./index.scss";
import DemoContainer from "./components/DemoContainer";
import { Template } from "..";
import PageLayout from "./components/PageLayout";
import CodeExample from "./components/CodeExample";
import ClassComponent from "./components/ClassComponent";
import DataProvider from "./components/DataProvider";

const trimFirst = (str: string) => str.slice(1);

const ReactSlotsDemo = () => (
  <div>
    <h1>React Slots Component Demo</h1>

    <DemoContainer summary="Simple Button">
      <Template slot="component-code">
        {trimFirst(`
const SimpleButton = (props) => {
  return (
    <button {...props}>
      <Slot>Default Button Text</Slot>
    </button>
  )
})
export default SlotHost(SimpleButton)`)}
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
const PageLayout = () => {
  return (
    <div>
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
          <Slot name="footer" />
        </footer>
      </IfSlotAssigned>
    </div>
  )
}
export default SlotHost(PageLayout)`)}
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

    <DemoContainer summary="Class Component">
      <Template slot="component-code">
        {trimFirst(`
class ClassComponent extends React.Component {
  render() {
    return (
      <div>
        <div>Foo: <Slot name="foo" /></div>
        <div>Bar: <Slot name="bar" /></div>
      </div>
    );
  }
}
export default SlotHost(ClassComponent)`)}
      </Template>

      <CodeExample title="Usage:">
        {trimFirst(`
<ClassComponent>
  <b slot="foo">I AM FOO</b>
  <i slot="bar">I AM BAR</i>
</ClassComponent>`)}
        <ClassComponent slot="result">
          <b slot="foo">I AM FOO</b>
          <i slot="bar">I AM BAR</i>
        </ClassComponent>
      </CodeExample>
    </DemoContainer>

    <DemoContainer summary="Advanced: Passing custom data to slots">
      <Template slot="component-code">
        {trimFirst(`
const DataProvider = () => {
  const user = { id: 1234, name: "Nina Conti" };
  return (
    <div>
      <Slot name="header" user={user} foo="bar" />
      <Slot name="footer" user={user} bing="baz" />
    </div>
  );
};
export default SlotHost(DataProvider)`)}
      </Template>

      <CodeExample title="Usage:">
        {trimFirst(`
<DataProvider>
  <header slot="header">
    {({ user, foo }) => (
      <div>
        Hello {user.name}! The FOO is {foo}.
      </div>
    )}
  </header>
  <footer slot="footer">
    {({ user, bing }) => (
      <div>
        Hello {user.name}! The BING is {bing}.
      </div>
    )}
  </footer>
</DataProvider>`)}
        <DataProvider slot="result">
          <header slot="header">
            {({ user, foo }: any) => (
              <div>
                Hello {user.name}! The FOO is {foo}.
              </div>
            )}
          </header>
          <footer slot="footer">
            {({ user, bing }: any) => (
              <div>
                Hello {user.name}! The BING is {bing}.
              </div>
            )}
          </footer>
        </DataProvider>
      </CodeExample>
    </DemoContainer>
  </div>
);

// see rollup config for HTML
ReactDOM.render(<ReactSlotsDemo />, document.getElementById("root"));

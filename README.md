# React Slots - the one you've been waiting for

This is a set of components which provide a similar and familiar implementation of the HTML5 `<slot>` behavior for react. Please note, this does not use _real_ slots under the hood, but rather provides developers with the same expressive experience.

```zsh
npm install react-slots
yarn add react-slots
```

## Usage

1. Use the `Slot` component like you would normal `<slot>` elements.
2. Pass your component to the `SlotHost` function (HOC).

```tsx
import React from "react";
import { SlotHost, Slot } from "react-slots";

const PageLayout = (props) => {
  return (
    <div className="page-layout" {...props}>
      <header>
        <Slot name="header">Default header</Slot>
      </header>
      <div className="content">
        <main>
          <Slot /> {/* Same as <Slot name="default" /> */}
        </main>
        <aside>
          <Slot name="aside">Default aside</Slot>
        </aside>
      </div>
      <footer>
        <Slot name="footer">Default footer</Slot>
      </footer>
    </div>
  );
};

export default SlotHost(PageLayout);
```

3. Fill the slots with your content by adding the "slot" attribute to top-level elements and components.

```tsx
<PageLayout>
  <span slot="header">Logo and top navigation</span>
  <p>All other content will be placed into the "default" (or unnamed) slot</p>
  <div slot="aside">Side nav and advertisements</div>
  <SomeComponent slot="footer">Footer nav and contact info</SomeComponent>
</PageLayout>
```

## API

- ### **`SlotHost(YourComponent)`** - Higher Order Component (HOC)

  Any component which uses slots must be wrapped in the `SlotHost` HOC.

  ```tsx
  const SimpleButton = (props) => {
    return (
      <button {...props}>
        <Slot />
      </button>
    );
  };

  export default SlotHost(SimpleButton);
  ```

- ### **`<Slot [name="[string]"]>[fallback]</Slot>`**

  This is analogous to the HTML5 `<slot>` element - the "name" is optional. Any slot without a name becomes the "default" slot (same as `<Slot name="default" />`). If the user does not provide any content, the `fallback` content will be used.

  > NOTE: see Advanced Usage below for other neat features

- ### **`<Template [slot="[string]"]>...</Template>`**

  This is a utility component which will only render its children in the given slot. This is best explained by example:

  ```tsx
  // Without a Template:
  <SomeComponent>
    <span slot="foo">The span gets inserted into the slot</span>
  </SomeComponent>

  // With a Template:
  <SomeComponent>
    <Template slot="foo">Only the text gets inserted into the slot</Template>
  </SomeComponent>
  ```

* ### **`<IfSlotAssigned name="[string]">...</IfSlotAssigned>`**

  This is a utility component for conditionally rendering content depending on whether the slot as assigned any content.

  ```tsx
  const SomeComponent = () => {
    return (
      <div>
        <Slot name="header" />
        <IfSlotAssigned name="footer">
          {/* This will only render if the "footer" slot is used */}
          <footer>
            <Slot name="footer" />
          </footer>
        </IfSlotAssigned>
      </div>
    );
  };
  ```

## Advanced Usage

You can pass custom data to slots by doing the following:

```tsx
const PageLayout = () => {
  // This is just an example - you have to get the data yourself
  const currentUser = getCurrentUser();

  return (
    <div>
      <Slot name="header" foo="bar" currentUser={currentUser} />
      <Slot />
      <Slot name="footer" bing="baz" currentUser={currentUser} />
    </div>
  );
};
```

Then you can use a ["render prop"](https://reactjs.org/docs/render-props.html) to access the data:

```tsx
<PageLayout>
  <header slot="header">
    {({ currentUser, foo }) => {
      return (
        <div>
          Hello {currentUser.name}! The FOO is {foo}.
        </div>
      );
    }}
  </header>
  ...
  <footer slot="footer">
    {({ currentUser, bing }) => {
      return (
        <div>
          Hello {currentUser.name}! The BING is {bing}.
        </div>
      );
    }}
  </footer>
</PageLayout>
```

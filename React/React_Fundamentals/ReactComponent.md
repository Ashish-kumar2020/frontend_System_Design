# ⚛️ React Components

---

# What is a React Component?

A **React Component** is a **JavaScript function** (or class) that returns **React Elements**.

It is the building block of a React application.

Example:

```jsx
function Button() {
  return <button>Save</button>;
}
```

Here, `Button` is a **React Component**.

---

# Why do we need Components?

Components help us:

- Reuse UI
- Organize code
- Split large UIs into smaller pieces
- Improve maintainability

Instead of writing:

```jsx
<button>Save</button>
<button>Cancel</button>
<button>Delete</button>
```

We can create:

```jsx
function Button() {
  return <button>Save</button>;
}
```

and reuse it multiple times.

---

# Function Components vs Class Components

## Function Component

```jsx
function Button() {
  return <button>Save</button>;
}
```

- Preferred in modern React
- Supports Hooks
- Easier to read and maintain

---

## Class Component

```jsx
class Button extends React.Component {
  render() {
    return <button>Save</button>;
  }
}
```

- Older React approach
- Uses lifecycle methods
- Rarely used in new projects

---

# Component vs React Element

## Component

A component is a **function or class**.

Example:

```jsx
function Button() {
  return <button>Save</button>;
}
```

---

## React Element

When React sees:

```jsx
<Button />
```

It creates:

```js
{
  type: Button,
  props: {}
}
```

This object is a **React Element**.

---

# Important Concept

Writing:

```jsx
<Button />
```

**does NOT execute** the `Button()` function.

Instead, Babel converts it into:

```js
jsx(Button, {});
```

or (before React 17):

```js
React.createElement(Button, {});
```

which returns:

```js
{
  type: Button,
  props: {}
}
```

React later executes:

```js
Button();
```

during rendering.

---

# Component Execution Flow

Example:

```jsx
function Button() {
  return <button>Save</button>;
}

function App() {
  return <Button />;
}
```

Execution Flow:

```text
React executes App()
        │
        ▼
App returns

{
   type: Button,
   props: {}
}

        │
        ▼
React executes Button()

        │
        ▼
Button returns

{
   type: "button",
   props: {
      children: "Save"
   }
}

        │
        ▼
React creates/updates the DOM
```

---

# Component Composition

Components can return other components.

Example:

```jsx
function Child() {
  return <h1>Child</h1>;
}

function Parent() {
  return (
    <div>
      <Child />
    </div>
  );
}
```

Execution:

```text
React executes Parent()

        │
        ▼

Parent returns

div
 └── Child

        │
        ▼

React executes Child()

        │
        ▼

Child returns

h1
```

This is called **Component Composition**.

---

# Nested Components

Example:

```jsx
function C() {
  return <button>Click</button>;
}

function B() {
  return <C />;
}

function A() {
  return <B />;
}
```

Execution order:

```text
A()
 ↓
B()
 ↓
C()
 ↓
button
```

React executes one component at a time until it reaches native HTML elements.

---

# Native Elements

These are HTML elements:

```jsx
<div />
<button />
<h1 />
<input />
<span />
```

Once React reaches native elements, it knows what should be rendered in the browser.

---

# Complete Flow

```text
Developer writes JSX
        │
        ▼
Babel
        │
        ▼
React.createElement() / jsx()
        │
        ▼
React Element
(JS Object)
        │
        ▼
React executes Components
        │
        ▼
Components return more React Elements
        │
        ▼
Eventually reaches native HTML elements
(div, button, h1...)
        │
        ▼
React creates/updates the DOM
        │
        ▼
Browser Paints the Screen
```

---

# Important Notes

- A React Component is a function (or class).
- Components return React Elements.
- `<Button />` is **not** the `Button()` function.
- `<Button />` creates a React Element whose `type` is `Button`.
- React decides **when** to execute the component.
- Components can return other components.
- React executes components recursively until it reaches native HTML elements.

---

# Interview Questions

## What is a React Component?

A JavaScript function (or class) that returns React Elements.

---

## What is the difference between a Component and a React Element?

**Component**

- Function or class
- Contains logic
- Returns React Elements

**React Element**

- JavaScript object
- Describes the UI
- Created by `React.createElement()` or `jsx()`

---

## Does `<Button />` execute the `Button()` function?

No.

`<Button />` creates a React Element.

React later executes the component during rendering.

---

## What does a component return?

A component returns **React Elements**, not DOM nodes.

---

## What is Component Composition?

Creating larger UIs by combining smaller components.

---

## What is the execution order of nested components?

Example:

```jsx
function C() {
  return <button>Click</button>;
}

function B() {
  return <C />;
}

function A() {
  return <B />;
}
```

Execution:

```text
A()
 ↓
B()
 ↓
C()
 ↓
button
```

---

# Visual Summary

```text
Component
(Function)

        │
        ▼

Returns JSX

        │
        ▼

Babel

        │
        ▼

React Element
(JS Object)

        │
        ▼

React executes next Component

        │
        ▼

Eventually reaches native HTML elements

        │
        ▼

React creates/updates the DOM

        │
        ▼

Browser Paint
```

---

# Key Takeaways

- Components are JavaScript functions (or classes).
- Components return React Elements.
- `<Component />` creates a React Element; it does **not** directly execute the component.
- React executes components during rendering.
- Components can return other components (Component Composition).
- React recursively executes components until it reaches native HTML elements, then creates or updates the DOM.
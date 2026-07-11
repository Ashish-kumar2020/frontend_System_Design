# ⚛️ React Elements

---

# What is a React Element?

A **React Element** is an **immutable JavaScript object** that describes **what should be rendered on the UI**.

It is the **smallest unit** that React understands.

> ❌ A React Element is **NOT** a DOM node.
>
> ✅ It is only a JavaScript object describing the UI.

---

# Why does React use React Elements?

Creating and manipulating **DOM nodes is expensive**.

Instead of immediately creating DOM nodes, React:

1. Creates lightweight JavaScript objects (React Elements).
2. Builds an in-memory representation of the UI.
3. Later determines what changes are actually needed in the DOM.

This approach makes rendering much more efficient.

---

# Creating a React Element

When you write JSX:

```jsx
const element = <h1>Hello World</h1>;
```

React (or the JSX compiler) converts it into:

```js
const element = React.createElement(
  "h1",
  null,
  "Hello World"
);
```

This returns a JavaScript object similar to:

```js
{
  $$typeof: Symbol(react.element),
  type: "h1",
  key: null,
  ref: null,
  props: {
    children: "Hello World"
  }
}
```

React understands this object and later uses it to update the DOM.

---

# React Element vs DOM Node

## React Element

```js
{
  type: "button",
  props: {
    children: "Click Me"
  }
}
```

- JavaScript object
- Lightweight
- Immutable
- Lives in memory
- Created during rendering

---

## DOM Node

```html
<button>Click Me</button>
```

- Real browser element
- Exists inside the DOM
- Created after React finishes rendering
- Expensive to create and modify

---

# Rendering Flow

```
JSX
   ↓
React Element (JavaScript Object)
   ↓
React builds an element tree
   ↓
React compares UI
   ↓
DOM is updated
```

---

# Example

```jsx
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <button>Click</button>
    </div>
  );
}
```

React first creates an element tree like this:

```
App
 │
 ▼
div
 ├── h1
 │     └── Hello
 └── button
       └── Click
```

> This is **NOT** the DOM.

It is a tree of React Elements.

---

# React Elements are Immutable

Once a React Element is created, **it cannot be changed**.

Example:

```jsx
const element = <h1>Hello</h1>;
```

If later the UI becomes:

```jsx
<h1>Hi</h1>
```

React does **NOT** modify the previous element.

Instead, it creates a completely new React Element.

Old:

```js
{
  type: "h1",
  props: {
    children: "Hello"
  }
}
```

New:

```js
{
  type: "h1",
  props: {
    children: "Hi"
  }
}
```

React then compares the old and new UI descriptions and updates only the necessary DOM nodes.

---

# Why are React Elements Immutable?

Immutability makes React's rendering predictable.

Instead of changing existing objects, React creates a new UI description for every render.

Benefits:

- Easier comparison
- Predictable rendering
- Efficient UI updates
- Simpler rendering algorithm

> React creates **new React Elements** instead of modifying existing ones.

---

# React Element vs React Component

## React Component

A component is a **function or class** that returns React Elements.

```jsx
function Button() {
  return <button>Save</button>;
}
```

Characteristics:

- Contains logic
- Receives props
- Can manage state
- Returns React Elements

---

## React Element

When React sees:

```jsx
<Button />
```

It creates an object similar to:

```js
{
  type: Button,
  props: {}
}
```

This object is the React Element.

Later, React executes the `Button` component and gets the elements it returns.

---

# Component vs Element

| React Component | React Element |
|-----------------|---------------|
| Function or Class | JavaScript Object |
| Contains business logic | Describes UI |
| Can receive props | Stores props |
| Can manage state | Cannot manage state |
| Returns React Elements | Used by React to render UI |

---

# Important Points

- JSX creates React Elements.
- React Elements are plain JavaScript objects.
- React Elements are immutable.
- React Elements describe the UI.
- React Components return React Elements.
- React Elements are **not** DOM nodes.

---

# Common Interview Questions

## What is a React Element?

A React Element is an immutable JavaScript object that describes what should be rendered on the screen.

---

## Is a React Element the same as a DOM node?

No.

A React Element is only a JavaScript object.

The DOM node is created later by React.

---

## Does JSX create DOM nodes?

No.

JSX creates React Elements.

React later creates or updates the DOM.

---

## Why are React Elements immutable?

React creates a new element tree for every render.

Because elements never change after creation, React can efficiently compare the old and new UI descriptions and determine the minimum DOM updates.

---

## Difference between React Component and React Element?

**Component**

- Function or class
- Contains logic
- Returns React Elements

**Element**

- JavaScript object
- Describes UI
- Used by React for rendering

---

# Visual Summary

```
JSX
 │
 ▼
React Element
(JavaScript Object)
 │
 ▼
Component returns Elements
 │
 ▼
React builds Element Tree
 │
 ▼
React compares old vs new tree
 │
 ▼
Updates only necessary DOM nodes
```

---

# Key Takeaways

- React Elements are the smallest building blocks understood by React.
- They are plain JavaScript objects.
- They are immutable.
- JSX compiles into React Elements.
- Components return React Elements.
- React Elements describe the UI but are **not** actual DOM nodes.
- React updates the real DOM only after processing these element trees.
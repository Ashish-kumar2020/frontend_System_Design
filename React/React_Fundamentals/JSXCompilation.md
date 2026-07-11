# ⚛️ JSX Compilation

---

# What is JSX?

- **JSX (JavaScript XML)** is a **syntax extension for JavaScript**.
- It is **not HTML**.
- It is **not a programming language**.
- It provides an HTML-like syntax to describe the UI.

Example:

```jsx
<button>Save</button>
```

---

# Why can't browsers understand JSX?

Browsers understand:

- ✅ JavaScript
- ✅ HTML
- ✅ CSS

Browsers **cannot understand JSX**, so it must first be converted into JavaScript.

---

# What is Babel?

**Babel** is a **JavaScript compiler (transpiler)**.

Its job is to convert:

- JSX → JavaScript
- Modern JavaScript → Browser-compatible JavaScript

---

# JSX Compilation

## Before React 17

```jsx
<button>Save</button>
```

↓

```js
React.createElement("button", null, "Save");
```

---

## React 17+

```jsx
<button>Save</button>
```

↓

```js
jsx("button", {
  children: "Save",
});
```

Imported from:

```js
react/jsx-runtime
```

---

# Why don't we import React anymore?

## Before React 17

Babel generated:

```js
React.createElement(...)
```

Since `React.createElement()` was used, the `React` object had to exist in the file.

```js
import React from "react";
```

Without this import, the application would throw:

```text
React is not defined
```

---

## React 17+

Babel generates:

```js
jsx(...)
```

from:

```js
react/jsx-runtime
```

Since the compiled code no longer references the `React` variable, importing React is no longer required just for using JSX.

---

# What does `React.createElement()` return?

`React.createElement()` **does not create a DOM node**.

It returns a **React Element**.

A **React Element** is simply an **immutable JavaScript object**.

Example:

```js
{
  type: "button",
  props: {
    children: "Save",
  },
}
```

> **React Element = JavaScript Object**

These are **not two different things**.

---

# React Element vs DOM Node

## React Element

- JavaScript object
- Blueprint (description) of the UI
- Exists only in memory
- Not visible on the screen
- Immutable

---

## DOM Node

- Real browser element
- Visible on the screen
- Created by React after processing React Elements

---

# Complete Rendering Flow

```text
JSX
   ↓
Babel transpiles JSX
   ↓
React.createElement() / jsx()
   ↓
React Element (JavaScript Object)
   ↓
React processes the elements
   ↓
Builds the Fiber Tree (Internal)
   ↓
Creates / Updates the Real DOM
   ↓
Browser Paints the Screen
```

---

# Important Notes

- JSX is only syntax.
- Babel converts JSX into JavaScript.
- Before React 17, JSX compiled into `React.createElement()`.
- React 17+ uses `jsx()` from `react/jsx-runtime`.
- `React.createElement()` returns a React Element.
- A React Element is an immutable JavaScript object.
- React Elements are **descriptions (blueprints)** of the UI.
- React later creates or updates the real DOM using these descriptions.

---

# Interview Questions

## What is JSX?

JSX is a syntax extension for JavaScript that allows developers to write HTML-like code inside JavaScript.

---

## Is JSX HTML?

No.

JSX only looks like HTML.

It is JavaScript syntax.

---

## Why can't browsers execute JSX directly?

Because browsers only understand JavaScript, HTML, and CSS.

JSX must first be compiled into JavaScript.

---

## What is Babel?

Babel is a JavaScript compiler (transpiler) that converts JSX and modern JavaScript into browser-compatible JavaScript.

---

## What did JSX compile into before React 17?

```js
React.createElement(...)
```

---

## What does JSX compile into after React 17?

```js
jsx(...)
```

from:

```js
react/jsx-runtime
```

---

## What does `React.createElement()` return?

A **React Element**, which is an immutable JavaScript object.

---

## Does `React.createElement()` create DOM nodes?

No.

It only creates a React Element (JavaScript object).

React later uses that object to create or update the DOM.

---

## Why is `import React from "react"` no longer required?

Because React 17 introduced the new JSX Transform.

Babel now generates `jsx()` calls from `react/jsx-runtime` instead of `React.createElement()`, so the `React` variable is no longer needed in scope.

---

# Visual Summary

```text
JSX
 │
 ▼
Babel
 │
 ▼
React.createElement() / jsx()
 │
 ▼
React Element
(Immutable JavaScript Object)
 │
 ▼
React Processes Elements
 │
 ▼
Fiber Tree
 │
 ▼
Creates / Updates DOM
 │
 ▼
Browser Paint
```

---

# Key Takeaways

- JSX is a syntax extension for JavaScript.
- Browsers cannot understand JSX directly.
- Babel converts JSX into JavaScript.
- Before React 17, JSX compiled into `React.createElement()`.
- React 17+ compiles JSX into `jsx()` from `react/jsx-runtime`.
- `React.createElement()` returns a **React Element**.
- A React Element is an immutable JavaScript object.
- React Elements describe the UI but are **not** DOM nodes.
- React uses React Elements to build its internal Fiber Tree and efficiently create or update the real DOM.
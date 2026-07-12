# ⚛️ React Rendering - Virtual DOM vs Real DOM

---

# Rendering Flow Recap

When state changes, React follows this rendering pipeline:

```text
User Click
      │
      ▼
setState()
      │
      ▼
Queue Update
      │
      ▼
Event Handler Finishes
      │
      ▼
Process Update Queue
      │
      ▼
Calculate Final State
      │
      ▼
Update Internal State Storage
      │
      ▼
React Starts Re-render
      │
      ▼
Calls Component Function
      │
      ▼
Creates React Elements (JS Objects)
      │
      ▼
Creates New Virtual DOM Tree
      │
      ▼
Reconciliation
(Compare Old Tree vs New Tree)
      │
      ▼
Diffing Algorithm
(Find Differences)
      │
      ▼
Commit Phase
(Update Real DOM)
      │
      ▼
Browser Rendering Pipeline
      │
      ▼
UI Updated
```

---

# What is the Virtual DOM?

The **Virtual DOM** is an **in-memory tree of React Elements (JavaScript Objects)** that describes **what the UI should look like**.

It is **NOT** the browser's DOM.

Example:

```jsx
<div>
    <h1>Hello</h1>
    <button>Save</button>
</div>
```

becomes conceptually:

```js
{
  type: "div",
  props: {
    children: [
      {
        type: "h1",
        props: {
          children: "Hello"
        }
      },
      {
        type: "button",
        props: {
          children: "Save"
        }
      }
    ]
  }
}
```

This is just a JavaScript object living in memory.

---

# What is the Real DOM?

The **Real DOM** is the actual DOM created and managed by the browser.

Example:

```html
<div>
    <h1>Hello</h1>
    <button>Save</button>
</div>
```

Internally, the browser creates a DOM tree like:

```text
Document
   │
   ▼
div
├── h1
│    └── "Hello"
└── button
      └── "Save"
```

Every node is a browser object.

Example:

```js
const button = document.querySelector("button");

button.style.color = "red";
button.classList.add("active");
button.appendChild(div);
button.remove();
```

These methods exist because the browser created the DOM node.

---

# React Element vs Real DOM Node

## React Element

```js
{
  type: "button",
  props: {
    children: "Save"
  }
}
```

Characteristics:

- Plain JavaScript Object
- Exists only in memory
- Created by React
- Cannot manipulate the browser

❌ No

```js
element.style.color = "red";

element.appendChild(...);
```

---

## Real DOM Node

```html
<button>Save</button>
```

or

```js
document.createElement("button");
```

Characteristics:

- Browser Object
- Created by Browser
- Exists in the actual DOM
- Appears on the screen

Supports:

```js
button.style.color = "red";

button.classList.add("active");

button.appendChild(...);

button.remove();
```

---

# Virtual DOM is NOT a Copy of the Real DOM

❌ Incorrect

> Virtual DOM is a copy of the Real DOM.

✅ Correct

> Virtual DOM is an in-memory tree of React Elements that describes what the UI should look like.

It represents the UI but is **not** the browser DOM.

---

# What Happens When State Changes?

Suppose the UI is:

```jsx
<h1>0</h1>
```

User clicks:

```jsx
setCount(1);
```

React creates:

```text
Old Virtual DOM

h1
│
└── "0"

────────────────────────

New Virtual DOM

h1
│
└── "1"
```

React compares both trees.

This comparison process is called:

```text
Reconciliation
```

The algorithm used to find differences is:

```text
Diffing Algorithm
```

React discovers:

```text
Only the text changed

"0"

↓

"1"
```

During the **Commit Phase**, React updates only the changed node in the Real DOM.

---

# Browser Rendering Pipeline

After React updates the Real DOM, React's work is finished.

Now the browser takes over.

```text
DOM Update
      │
      ▼
Recalculate Styles (if needed)
      │
      ▼
Layout / Reflow (if needed)
      │
      ▼
Paint
      │
      ▼
Composite
      │
      ▼
Screen Updated
```

> **React updates the Real DOM.**
>
> **The browser updates what the user sees on the screen.**

---

# React vs Browser Responsibilities

## React

Responsible for:

- Managing state
- Creating React Elements
- Creating the Virtual DOM
- Reconciliation
- Diffing
- Updating the Real DOM

React's job ends after the Commit Phase.

---

## Browser

Responsible for:

- Creating the Real DOM
- Style Calculation
- Layout (Reflow)
- Paint
- Composite
- Displaying pixels on the screen

---

# Vanilla JavaScript vs React

## Vanilla JavaScript

```text
User Click
      │
      ▼
JavaScript
      │
      ▼
Directly Update Real DOM
      │
      ▼
Browser Rendering Pipeline
      │
      ▼
UI Updated
```

Example:

```js
document.querySelector("h1").textContent = "Hi";
```

Developer responsibilities:

- Find the correct DOM node
- Decide what to update
- Avoid unnecessary DOM operations
- Keep UI synchronized with application state

Everything is managed manually.

---

## React

```text
User Click
      │
      ▼
setState()
      │
      ▼
Queue Update
      │
      ▼
Process Queue
      │
      ▼
Update State
      │
      ▼
Render Phase
      │
      ▼
Create New Virtual DOM
      │
      ▼
Reconciliation
      │
      ▼
Diffing Algorithm
      │
      ▼
Commit Phase
(Update Real DOM)
      │
      ▼
Browser Rendering Pipeline
      │
      ▼
UI Updated
```

Developer responsibilities:

- Update state only

React automatically:

- Re-renders components
- Compares Virtual DOM trees
- Finds differences
- Updates only the necessary Real DOM nodes

---

# Why React Exists

With Vanilla JavaScript, the developer is responsible for:

- Tracking which DOM nodes need to change
- Avoiding unnecessary DOM manipulations
- Keeping the UI synchronized with application state

With React:

- You update the state.
- React creates a new Virtual DOM.
- React compares it with the previous Virtual DOM.
- React finds the minimal set of changes.
- React updates only the necessary Real DOM nodes.

The browser then performs its normal rendering process.

---

# Important Clarification

❌ Incorrect

> Virtual DOM is faster than the Real DOM.

✅ Correct

React does **not** replace the Real DOM.

The browser must always use the Real DOM to display the UI.

React's advantage is that it performs cheap calculations in JavaScript first and minimizes unnecessary Real DOM updates.

---

# Complete Comparison

| Virtual DOM | Real DOM |
|--------------|----------|
| Created by React | Created by Browser |
| Tree of React Elements | Tree of Browser DOM Nodes |
| JavaScript Objects | Browser Objects |
| Lives in Memory | Lives inside the Browser |
| Used for Comparison | Used for Rendering UI |
| Cheap to Create & Compare | Expensive to Manipulate |
| Does Not Appear on Screen | Appears on Screen |
| No DOM APIs | Supports DOM APIs (`appendChild`, `style`, `classList`, etc.) |

---

# React Rendering vs Browser Rendering

```text
                    React
────────────────────────────────────────

State Update

↓

Render Phase

↓

Create Virtual DOM

↓

Reconciliation

↓

Diffing

↓

Commit Phase

↓

Update Real DOM

────────────────────────────────────────

                   Browser
────────────────────────────────────────

Detect DOM Change

↓

Style Calculation

↓

Layout (if needed)

↓

Paint

↓

Composite

↓

Display Screen
```

---

# Interview Questions

## What is the Virtual DOM?

An in-memory tree of React Elements (JavaScript objects) that describes what the UI should look like.

---

## What is the Real DOM?

The actual DOM tree created and managed by the browser.

---

## Does React update the entire DOM?

No.

React compares the previous and new Virtual DOM, finds the differences, and updates only the necessary nodes in the Real DOM.

---

## Who paints the screen?

The browser.

React only updates the Real DOM.

---

## Why is updating a JavaScript object cheaper than updating the Real DOM?

Updating a JavaScript object only changes memory.

Updating the Real DOM may trigger browser rendering work such as:

- Style recalculation
- Layout (Reflow)
- Paint
- Composite

---

# Key Takeaways

- Virtual DOM is a tree of React Elements (JavaScript objects).
- Real DOM is the browser's DOM tree.
- React creates and compares Virtual DOM trees.
- Reconciliation compares the old and new trees.
- Diffing finds what changed.
- During the Commit Phase, React updates only the changed Real DOM nodes.
- After the Commit Phase, the browser performs its rendering pipeline.
- React's job ends at updating the Real DOM.
- The browser is responsible for displaying the updated UI.
- React simplifies UI development by automatically determining the minimal DOM changes required.
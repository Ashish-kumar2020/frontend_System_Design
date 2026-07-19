# 🚀 React Portals (Interview Notes)

---

# What is a React Portal?

A React Portal allows you to render a component into a **different DOM location** while keeping it in the **same React component tree**.

```jsx
import { createPortal } from "react-dom";

createPortal(children, container);
```

- `children` → Component to render
- `container` → DOM node where it should be mounted

---

# Why do we need Portals?

Normally React renders like this:

```text
React Tree
     ↓
DOM Tree
```

Sometimes this becomes a problem.

Example:

```jsx
<App>
    <Dashboard>
        <Modal />
    </Dashboard>
</App>
```

```css
.dashboard {
    overflow: hidden;
}
```

Without a Portal:

```text
Dashboard
│
└── Modal ❌ (Gets Clipped)
```

Users expect:

```text
Entire Screen
────────────────────

        Modal

────────────────────
```

A Portal moves the Modal outside the constrained parent.

---

# React Tree vs DOM Tree

## React Tree

```text
App
│
└── Dashboard
      │
      └── Modal
```

## DOM Tree

```html
<body>

<div id="root">
    <App />
    <Dashboard />
</div>

<div id="modal-root">
    <Modal />
</div>

</body>
```

✅ React Tree remains the same.

✅ DOM location changes.

---

# Implementation

## index.html

```html
<body>

<div id="root"></div>

<div id="modal-root"></div>

</body>
```

---

## Modal.jsx

```jsx
import { createPortal } from "react-dom";

export default function Modal() {
    return createPortal(
        <div className="modal">
            Hello
        </div>,
        document.getElementById("modal-root")
    );
}
```

---

# What changes?

Only the **DOM placement**.

Everything else remains the same.

---

# What still works inside a Portal?

✅ Props

✅ State

✅ Context

✅ Hooks

✅ Refs

✅ React Event Bubbling

Reason:

All of these depend on the **React Tree**, not the DOM Tree.

---

# Event Bubbling

React events bubble through the **React Tree**.

NOT through the DOM Tree.

Example:

```text
React Tree

App
│
└── Dashboard
      │
      └── Modal
```

Even if Modal is rendered under:

```html
<body>

<div id="modal-root">
    <Modal />
</div>

</body>
```

Clicking the Modal still bubbles to:

```text
Modal

↓

Dashboard

↓

App
```

---

# Why isn't the Modal clipped?

Without Portal:

```text
Dashboard
│
└── Modal
```

`overflow: hidden` applies because Modal is a DOM descendant.

---

With Portal:

```text
body
│
├── root
│
└── modal-root
      │
      └── Modal
```

Modal is **no longer inside** `.dashboard`.

Therefore:

- `overflow: hidden`
- `transform`
- `z-index`
- Stacking Context

from `.dashboard` no longer affect it.

---

# Can we use document.body?

Yes.

```jsx
createPortal(
    <Modal />,
    document.body
);
```

Works perfectly.

Most projects create:

```html
<div id="modal-root"></div>
```

instead because:

- Better organization
- Easier styling
- Easier cleanup
- Multiple portal containers (modal, tooltip, toast)

---

# Common Use Cases

✅ Modal Dialog

✅ Tooltip

✅ Dropdown

✅ Popover

✅ Context Menu

✅ Toast Notifications

---

# Does Portal reduce CSS?

❌ No.

Its primary purpose is **not** writing less CSS.

Its purpose is:

> Render a component outside problematic DOM parents while keeping it inside the same React component hierarchy.

---

# React Libraries

Many UI libraries use Portals internally.

Examples:

- Material UI Dialog
- Ant Design Modal
- Chakra UI Modal
- Radix Dialog
- Headless UI Dialog

Even if you never call `createPortal()`, you may already be using Portals.

---

# Interview Questions

## What is a Portal?

> A React Portal allows a component to render its DOM into a different location in the DOM tree while remaining part of the same React component tree.

---

## Why use Portals?

> To escape CSS constraints like `overflow: hidden`, `transform`, clipping, and stacking contexts while preserving React features.

---

## Does Context work inside a Portal?

✅ Yes.

Context follows the **React Tree**, not the DOM Tree.

---

## Does Event Bubbling work?

✅ Yes.

React synthetic events bubble through the **React Tree**.

---

## Can we use document.body?

✅ Yes.

`createPortal()` accepts any valid DOM element as its container.

---

# ⭐ Golden Mental Model

```text
Need same React relationship?

        YES

Need different DOM placement?

        YES

        ↓

   Use React Portal
```
# 📚 Module 10 - Virtualization

---

# What is Virtualization?

Virtualization is a rendering optimization technique where **only the visible portion of a large list is rendered into the DOM**, while the complete data remains in memory.

Instead of rendering:

```text
100,000 Items

↓

100,000 DOM Nodes
```

React renders only:

```text
Visible Items

+

Small Buffer
```

Example:

```text
Viewport

↓

20 Visible Items

↓

5 Above

↓

5 Below

↓

≈ 30 DOM Nodes
```

---

# Why Do We Need Virtualization?

Suppose:

```jsx
products.map(product => (
    <ProductCard key={product.id} product={product} />
));
```

Products:

```text
100,000
```

React will create:

```text
100,000 React Elements

↓

100,000 Fibers

↓

100,000 Reconciliation Operations

↓

100,000 DOM Nodes
```

Even though the user may only see:

```text
20 Products
```

---

# The Problem

Without virtualization:

```text
100,000 DOM Nodes

↓

Layout

↓

Paint

↓

Composite

↓

Slow Application
```

The browser spends most of its time managing invisible DOM nodes.

---

# The Core Idea

Keep:

```text
100,000 Data Objects
```

But render only:

```text
20–30 DOM Nodes
```

Virtualization optimizes the DOM, **not** the data.

---

# Internal Flow

```text
User Scrolls

↓

Read scrollTop

↓

Calculate Visible Range

↓

Render Visible Items Only

↓

Unmount Items Leaving View

↓

Mount / Reuse Items Entering View

↓

DOM Size Remains Almost Constant
```

---

# Windowing

Instead of rendering:

```text
1
2
3
4
...
100000
```

Render only:

```text
Viewport

↓

21
22
23
24
25
26
27
28
```

As the user scrolls:

```text
Viewport

↓

41
42
43
44
45
46
47
48
```

The rendering window moves.

---

# Virtualization Algorithm

## Step 1

Know the item height.

Example:

```text
Item Height = 50px
```

---

## Step 2

Know the viewport height.

Example:

```text
Viewport = 500px
```

Visible items:

```text
500 / 50

=

10 Items
```

---

## Step 3

Read scroll position.

```text
scrollTop
```

Calculate:

```js
const startIndex = Math.floor(scrollTop / itemHeight);
```

---

## Step 4

Calculate visible items.

```js
const visibleItems = Math.ceil(viewportHeight / itemHeight);
```

Calculate:

```js
const endIndex = startIndex + visibleItems;
```

React renders only:

```text
startIndex

↓

endIndex
```

---

## Step 5

Fake the Total Height

Container:

```text
Height

↓

100000 × 50px

↓

5,000,000px
```

The browser believes the complete list exists, so the scrollbar behaves correctly.

---

## Step 6

Position Visible Items

Render only the visible rows using:

```css
position: absolute;
```

or

```css
transform: translateY(...)
```

Example:

```js
translateY(startIndex * itemHeight)
```

The visible rows appear at the correct scroll position.

---

# React Rendering

Without Virtualization:

```text
100,000 Data

↓

100,000 React Elements

↓

100,000 Fibers

↓

100,000 DOM Nodes

↓

Layout

↓

Paint
```

---

With Virtualization:

```text
100,000 Data

↓

30 React Elements

↓

30 Fibers

↓

30 DOM Nodes

↓

Layout

↓

Paint
```

---

# Browser vs React

Virtualization optimizes **both**.

React:

- Fewer React Elements
- Fewer Fibers
- Less Reconciliation

Browser:

- Fewer DOM Nodes
- Less Layout
- Less Paint
- Less Memory Usage

The biggest performance gain usually comes from reducing browser DOM work.

---

# Real Implementation

Most applications use libraries such as:

- react-window
- @tanstack/react-virtual
- react-virtualized

Example:

```jsx
import { FixedSizeList } from "react-window";

function Row({ index, style }) {
    return (
        <div style={style}>
            Item {index}
        </div>
    );
}

export default function App() {
    return (
        <FixedSizeList
            height={500}
            width={300}
            itemSize={50}
            itemCount={100000}
        >
            {Row}
        </FixedSizeList>
    );
}
```

The library automatically:

- Calculates visible indices.
- Handles scrolling.
- Positions items.
- Maintains buffers (overscan).
- Recycles DOM nodes.

---

# Complete Internal Flow

```text
User Scrolls

↓

Read scrollTop

↓

Calculate startIndex

↓

Calculate endIndex

↓

Create Visible Window

↓

Position Window Using translateY

↓

Render Visible Items Only

↓

Unmount Old Items

↓

Mount / Reuse New Items

↓

Commit DOM Changes
```

---

# Key Takeaways

- Virtualization renders only the visible portion of a list.
- The complete data remains in memory.
- React creates far fewer Fibers and React Elements.
- The browser manages far fewer DOM nodes.
- The largest performance gain comes from reducing DOM work.
- A large container height preserves the scrollbar.
- Visible items are positioned using `translateY` or absolute positioning.
- As the user scrolls, the rendering window moves while the DOM size remains nearly constant.

---

# Interview Answers

## What is Virtualization?

Virtualization is a rendering optimization technique that renders only the visible portion of a large list while keeping the complete dataset in memory.

---

## Does Virtualization optimize React or the Browser?

It optimizes both.

- React performs less rendering and reconciliation.
- The browser manages fewer DOM nodes, reducing layout, paint, and memory usage.

The biggest performance gain typically comes from reducing browser DOM work.

---

## How would you implement Virtualization?

1. Keep the complete dataset in memory.
2. Read the scroll position.
3. Calculate the visible start and end indices.
4. Render only the visible items plus a small buffer.
5. Fake the total container height to preserve scrolling.
6. Position the visible items using `translateY` or absolute positioning.
7. Update the visible window as the user scrolls.

In production, use libraries such as **react-window** or **@tanstack/react-virtual** instead of implementing the algorithm manually.
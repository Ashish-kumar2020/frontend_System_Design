# ⚛️ Concurrent Rendering - `startTransition()`

---

# What is `startTransition()`?

`startTransition()` is a React API that marks state updates as **non-urgent (transition updates)**.

It tells React:

> "These updates can wait. If a more important update arrives, process that first."

Instead of making rendering faster, `startTransition()` changes the **priority** of the updates.

---

# Syntax

```jsx
import { startTransition } from "react";

startTransition(() => {
    // Non-urgent state updates
    setResults(filteredProducts);
});
```

---

# Why is `startTransition()` Needed?

Consider a search application:

```jsx
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
```

When the user types:

```jsx
setQuery(value);
setResults(filterProducts(value));
```

Two updates occur:

1. Update the input.
2. Render a large list of filtered products.

These updates are **not equally important**.

- Updating the input is **urgent**.
- Rendering the product list is **non-urgent**.

Without `startTransition()`, React treats both updates as regular updates.

---

# Without `startTransition()`

```jsx
setQuery(value);
setResults(filteredProducts);
```

Flow:

```text
User Types

↓

Update Input

↓

Render Large Product List

↓

Commit
```

If rendering the list is expensive, the input may feel slow.

---

# With `startTransition()`

```jsx
setQuery(value);

startTransition(() => {
    setResults(filteredProducts);
});
```

Flow:

```text
User Types

↓

Update Input (High Priority)

↓

Transition Update (Low Priority)

↓

Render Product List

↓

Commit
```

The input remains responsive while the list updates later.

---

# How `startTransition()` Works Internally

```text
setState()

↓

Create Update

↓

Assign Transition Lane

↓

Scheduler

↓

Render Transition

↓

Higher Priority Update Arrives?

↓

Yes

↓

Pause / Restart / Discard Transition

↓

Process Urgent Update

↓

Continue Latest Transition
```

---

# Resume vs Restart

Suppose React is rendering search results for:

```text
A
```

Before rendering finishes, the user types:

```text
AB
```

Instead of completing the outdated render:

```text
Results for "A"
```

React discards it and starts rendering:

```text
Results for "AB"
```

This avoids wasting time rendering UI the user will never see.

---

# Relationship with Lanes

`startTransition()` assigns updates to a **lower-priority lane**.

Conceptually:

```text
Typing

↓

High Priority Lane

────────────────────

Transition

↓

Low Priority Lane
```

The Scheduler always processes high-priority updates first.

---

# Relationship with Concurrent Rendering

```text
startTransition()

↓

Lower Priority Update

↓

Scheduler

↓

Concurrent Rendering

↓

Pause if Necessary

↓

Resume or Restart Later

↓

Commit
```

This is possible because React Fiber supports interruptible rendering.

---

# Complete Flow

```text
User Types
      │
      ▼
setQuery()
      │
      ▼
High Priority Lane
      │
      ▼
Immediate Render

────────────────────────

startTransition()
      │
      ▼
Transition Lane
      │
      ▼
Scheduler
      │
      ▼
Render Transition
      │
      ▼
Higher Priority Update?
      │
      ├── No → Continue Rendering
      │
      └── Yes
             │
             ▼
      Pause / Restart / Discard
             │
             ▼
      Process Urgent Update
             │
             ▼
      Continue Latest Transition
      │
      ▼
Commit
```

---

# Important Points

- `startTransition()` marks updates as **non-urgent**.
- It **does not make rendering faster**.
- It changes the **priority** of state updates.
- Updates inside `startTransition()` are assigned to a **lower-priority lane**.
- Higher-priority updates like typing and clicking are processed first.
- React can **pause, resume, restart, or discard** transition work if newer, more important updates arrive.

---

# Key Takeaways

- `startTransition()` improves **responsiveness**, not rendering speed.
- It separates urgent updates from non-urgent updates.
- It works together with the **Scheduler**, **Lanes**, **Fiber**, and **Concurrent Rendering**.
- It is ideal for expensive UI updates that should not block user interactions.

---

# Interview Questions

## What is `startTransition()`?

`startTransition()` is a React API that marks state updates as non-urgent. React assigns these updates a lower-priority lane, allowing urgent updates such as typing and clicking to be processed first.

---

## Does `startTransition()` make React faster?

No.

It does not improve rendering speed. It changes the priority of updates so urgent interactions remain responsive.

---

## When should you use `startTransition()`?

Use `startTransition()` for expensive, non-urgent state updates such as:

- Filtering large lists
- Rendering search results
- Updating charts
- Rendering complex dashboards

---

## What happens if a user interacts during a transition?

If a higher-priority update arrives while a transition is rendering, React can pause, restart, or discard the transition, process the urgent update first, and then continue rendering the latest transition.
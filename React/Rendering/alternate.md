# ⚛️ React Fiber - Alternate Fiber (`alternate`)

---

# Why does React need an Alternate Fiber?

React maintains **two versions** of the same component during rendering.

1. **Current Fiber**
   - Represents the UI currently visible on the screen.

2. **Work-In-Progress (WIP) Fiber**
   - Represents the next UI React is preparing.

Example:

```text
Current Fiber

count = 0

────────────────────

WIP Fiber

count = 1
```

The browser continues displaying the Current Fiber until rendering finishes.

---

# The Problem

Suppose React has:

```text
Current Tree

App
├── Header
├── Sidebar
└── Dashboard
```

React creates another tree:

```text
WIP Tree

App
├── Header
├── Sidebar
└── Dashboard
```

Question:

How does React know that:

```text
Current Header

↓

WIP Header
```

represent the same component?

Without a connection, React would have to search the entire tree every time.

Example:

```text
Current App

↓

Search Header

↓

Search Sidebar

↓

Search Dashboard
```

This would be inefficient.

---

# Solution - Alternate Pointer

Every Fiber has an `alternate` field.

```js
fiber.alternate
```

The `alternate` field points to the corresponding Fiber in the other tree.

Example:

```text
Current Counter Fiber
count = 0
       ▲
       │ alternate
       ▼
WIP Counter Fiber
count = 1
```

The connection works in both directions.

```text
Current Fiber

↓

alternate

↓

WIP Fiber

↓

alternate

↓

Current Fiber
```

This allows React to instantly access the matching Fiber.

Time Complexity:

```text
O(1)
```

instead of searching the tree.

---

# What does Alternate store?

❌ The `alternate` pointer does **not** store state.

❌ It does **not** store props.

It only stores a **reference** to the corresponding Fiber.

State is stored inside each individual Fiber.

Example:

```text
Current Fiber

memoizedState = 0

────────────────────

WIP Fiber

memoizedState = 1
```

The `alternate` pointer simply connects these two Fiber Nodes.

---

# During setState()

Suppose:

```jsx
setCount(1);
```

Current Fiber:

```text
memoizedState = 0
```

React follows:

```text
alternate
```

to obtain the Work-In-Progress Fiber.

```text
Current Fiber
count = 0
       ▲
       │ alternate
       ▼
WIP Fiber
count = 0
```

React updates only the WIP Fiber.

```text
Current Fiber
count = 0
       ▲
       │ alternate
       ▼
WIP Fiber
count = 1
```

The Current Fiber remains unchanged.

---

# Why update only the WIP Fiber?

Because the browser is still displaying:

```text
Count = 0
```

If React modified the Current Fiber immediately:

```text
Current Fiber

count = 1
```

the browser would still show:

```text
Count = 0
```

React's internal data and the visible UI would become inconsistent.

Therefore React performs all rendering work on the WIP Fiber.

---

# Render Phase

During the Render Phase React:

```text
Current Fiber
       │
alternate
       ▼
WIP Fiber

↓

Process Update Queue

↓

Calculate New State

↓

Store New memoizedState

↓

Call Component

↓

Create React Elements

↓

Reconciliation

↓

Diffing
```

Only the WIP Fiber is modified.

---

# Browser During Render

While React renders:

```text
Current Fiber

count = 0

────────────────────

WIP Fiber

count = 1
```

The browser still displays:

```text
Count: 0
```

The browser never reads from the WIP Tree.

---

# Commit Phase

Once rendering finishes:

```text
Current Fiber

count = 0

────────────────────

WIP Fiber

count = 1
```

React enters the Commit Phase.

After the commit:

```text
Current Fiber

count = 1
```

The finished WIP Tree becomes the Current Tree.

The browser now displays:

```text
Count: 1
```

---

# Does React create new Fiber Trees every render?

No.

Creating thousands of new Fiber objects every render would be inefficient.

Instead React **reuses** the existing Fiber objects.

The two Fiber Nodes remain connected using `alternate`.

Only their roles change.

Before Commit:

```text
Current

↓

count = 0

────────────────────

WIP

↓

count = 1
```

After Commit:

```text
Current

↓

count = 1
```

The previous Current Fiber becomes the reusable alternate for the next render.

---

# Double Buffering

React follows the same idea used in graphics programming.

```text
Current Tree

↓

Displayed

────────────────────

Work-In-Progress Tree

↓

Prepared

────────────────────

Commit

↓

Current Tree Updated
```

The user only sees completed updates.

---

# Complete Flow

```text
setState()
      │
      ▼
Create Update Object
      │
      ▼
Store in updateQueue
      │
      ▼
Scheduler
      │
      ▼
Reuse Work-In-Progress Fiber
(via alternate)
      │
      ▼
Process updateQueue
      │
      ▼
Calculate New State
      │
      ▼
Update memoizedState in WIP Fiber
      │
      ▼
Render Phase
      │
      ▼
Reconciliation
      │
      ▼
Diffing
      │
      ▼
Commit Phase
      │
      ▼
Finished WIP becomes Current
      │
      ▼
Real DOM Updated
      │
      ▼
Browser Paint
```

---

# Key Differences

| Current Fiber | Work-In-Progress Fiber |
|---------------|------------------------|
| Represents the current UI | Represents the next UI |
| Browser reads from this tree | React renders into this tree |
| Not modified during rendering | Updated during rendering |
| Becomes the alternate after commit | Becomes the Current tree after commit |

---

# Important Notes

- Every Fiber has an `alternate` pointer.
- `alternate` connects the Current Fiber with the corresponding Work-In-Progress Fiber.
- `alternate` stores a reference, not state.
- State is stored inside each Fiber (`memoizedState`).
- React updates only the Work-In-Progress Fiber during rendering.
- The browser always reads from the Current Fiber Tree.
- After the Commit Phase, the finished Work-In-Progress Tree becomes the Current Tree.
- React reuses Fiber objects instead of allocating new ones every render.

---

# Interview Questions

## What is the `alternate` pointer?

The `alternate` pointer connects a Current Fiber with its corresponding Work-In-Progress Fiber, allowing React to switch between the two trees efficiently.

---

## Why does React need the `alternate` pointer?

Without it, React would need to search the Fiber Tree to find the matching Fiber during rendering. The `alternate` pointer provides constant-time access.

---

## Does the `alternate` pointer store state?

No.

It only stores a reference to the corresponding Fiber. Each Fiber stores its own state in `memoizedState`.

---

## Which Fiber is updated during the Render Phase?

Only the Work-In-Progress Fiber is updated.

The Current Fiber remains unchanged until the Commit Phase.

---

## Which Fiber does the browser use?

The browser always reflects the Current Fiber Tree. The Work-In-Progress Tree exists only in memory until the Commit Phase.

---

# One-Line Definition

**The `alternate` pointer is a reference that connects the Current Fiber and the corresponding Work-In-Progress Fiber of the same React component, allowing React to efficiently reuse Fiber nodes and prepare updates without affecting the current UI.**
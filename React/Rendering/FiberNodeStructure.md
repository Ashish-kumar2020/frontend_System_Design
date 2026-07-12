# ⚛️ React Fiber - Fiber Node Structure

---

# What is a Fiber Node?

A Fiber Node is a JavaScript object that represents **one React component**.

Every React component has its own corresponding Fiber Node.

Example:

```jsx
function Counter() {
    return <h1>Hello</h1>;
}
```

React creates:

```text
Counter Fiber
```

This Fiber stores everything React needs to render and update the component.

---

# Why does a Fiber Node contain many fields?

Think like React.

When React reaches a Fiber during rendering, it asks:

```text
1. Which component am I?

2. What props should I use?

3. What is my current state?

4. Are there any pending updates?

5. Who is my parent?

6. Who is my first child?

7. Who is my next sibling?

8. Where is my corresponding Fiber
   in the other tree?

9. What DOM work should I perform?

10. What is the priority of this work?
```

Every one of these questions corresponds to a field inside the Fiber Node.

---

# Important Fiber Fields

## 1. type

Stores the component represented by this Fiber.

Example:

```jsx
function Counter() {}
```

Conceptually:

```js
fiber.type = Counter;
```

During the Render Phase React conceptually executes:

```js
const Component = fiber.type;

Component(fiber.pendingProps);
```

Purpose:

```text
Which component function should React execute?
```

---

## 2. pendingProps

Stores the props for the current render.

Example:

```jsx
<Counter step={2} />
```

Conceptually:

```js
fiber.pendingProps = {
    step: 2
}
```

Purpose:

```text
What props should React pass
to the component?
```

---

## 3. memoizedState

Stores the current state of the component.

Example:

```jsx
const [count] = useState(0);
```

Conceptually:

```js
fiber.memoizedState

↓

count = 0
```

Purpose:

```text
What is the current state
of this component?
```

---

## 4. updateQueue

Stores pending updates.

Example:

```jsx
setCount(1);
```

Conceptually:

```text
updateQueue

↓

Update Object

↓

count = 1
```

Purpose:

```text
Which updates are waiting
to be processed?
```

---

## 5. child

Points to the first child Fiber.

Example:

```text
App
└── Header
```

Conceptually:

```text
App Fiber

child

↓

Header Fiber
```

Purpose:

```text
Move down the Fiber Tree.
```

---

## 6. sibling

Points to the next sibling Fiber.

Example:

```text
App
├── Header
└── Sidebar
```

Conceptually:

```text
Header Fiber

sibling

↓

Sidebar Fiber
```

Purpose:

```text
Move to the next sibling.
```

---

## 7. return

Points to the parent Fiber.

Example:

```text
App
└── Header
```

Conceptually:

```text
Header Fiber

return

↓

App Fiber
```

Purpose:

```text
Move back to the parent.
```

---

## 8. alternate

Connects the Current Fiber with the corresponding Work-In-Progress Fiber.

Example:

```text
Current Fiber
count = 0
       ▲
       │ alternate
       ▼
WIP Fiber
count = 1
```

Purpose:

```text
Quickly access the matching
Fiber in the other tree.
```

Time Complexity:

```text
O(1)
```

---

## 9. flags

Stores what work React should perform during the Commit Phase.

Examples:

```text
Placement

Update

Deletion

Passive

Layout
```

We'll study this in detail later.

Purpose:

```text
What DOM work
needs to happen?
```

---

## 10. lanes

Stores the priority of the update.

Examples:

```text
Urgent

Transition

Idle
```

The Scheduler uses lanes to determine which work should be processed first.

We'll study this in detail later.

Purpose:

```text
What is the priority
of this work?
```

---

# Conceptual Fiber Node

```ts
Fiber {

    type

    pendingProps

    memoizedState

    updateQueue

    child

    sibling

    return

    alternate

    flags

    lanes
}
```

---

# Fiber Node Explained

| Fiber Field | Purpose |
|-------------|----------|
| `type` | Which component should React execute? |
| `pendingProps` | Props for the current render |
| `memoizedState` | Current state (hooks/state) |
| `updateQueue` | Pending updates from `setState` |
| `child` | First child Fiber |
| `sibling` | Next sibling Fiber |
| `return` | Parent Fiber |
| `alternate` | Connects Current ↔ Work-In-Progress Fiber |
| `flags` | Work to perform during Commit |
| `lanes` | Priority of the update |

---

# Fiber Node Flow

```text
Fiber
        │
        ├── type
        │       ↓
        │   Execute Component
        │
        ├── pendingProps
        │       ↓
        │   Pass Props
        │
        ├── memoizedState
        │       ↓
        │   Read State
        │
        ├── updateQueue
        │       ↓
        │   Process Updates
        │
        ├── child
        │
        ├── sibling
        │
        ├── return
        │
        ├── alternate
        │
        ├── flags
        │
        └── lanes
```

---

# Complete Rendering Flow

```text
React reaches a Fiber

↓

Read type

↓

Execute Component

↓

Read pendingProps

↓

Read memoizedState

↓

Process updateQueue

↓

Return React Elements

↓

Reconciliation

↓

Diffing

↓

Commit
```

---

# Key Takeaways

- Every React component has its own Fiber Node.
- A Fiber Node is a JavaScript object stored in the Heap.
- `type` identifies the component to execute.
- `pendingProps` stores props for the current render.
- `memoizedState` stores the current hook state.
- `updateQueue` stores pending state updates.
- `child`, `sibling`, and `return` connect the Fiber Tree.
- `alternate` connects the Current and Work-In-Progress Fiber.
- `flags` describe the work to perform during the Commit Phase.
- `lanes` store the priority of the work.

---

# Interview Questions

## What is a Fiber Node?

A Fiber Node is a JavaScript object representing a React component. It stores all the information React needs to render, update, and manage that component.

---

## Where is component state stored?

Component state is stored in the Fiber Node's `memoizedState` field.

---

## Where are pending state updates stored?

Pending updates created by `setState` are stored in the Fiber Node's `updateQueue`.

---

## What does the `type` field store?

The `type` field stores the component function or class that the Fiber represents. React uses it during the Render Phase to execute the component.

---

## What does the `alternate` field do?

The `alternate` field connects the Current Fiber with the corresponding Work-In-Progress Fiber, allowing React to reuse Fiber nodes and switch efficiently between the two trees.
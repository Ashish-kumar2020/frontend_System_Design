# ⚛️ React Fiber - Introduction

---

# Why was Fiber introduced?

Before React 16, React used the **Stack Reconciler**.

The Stack Reconciler relied on the JavaScript Call Stack to traverse the component tree.

Since JavaScript execution is synchronous, React could not:

- Pause rendering
- Resume rendering
- Prioritize updates
- Interrupt rendering

Large renders could block the main thread and make the UI feel unresponsive.

---

# Stack Reconciler

Example:

```jsx
<App>
    <Header />
    <Body />
    <News />
</App>
```

Rendering Flow

```text
App()

↓

Header()

↓

Return

↓

Body()

↓

Return

↓

News()

↓

Return
```

This execution uses the JavaScript Call Stack.

Because JavaScript cannot pause the current call stack, React could not interrupt rendering.

---

# JavaScript Memory

JavaScript mainly uses two memory areas.

```text
JavaScript Memory

├── Call Stack
│
└── Heap
```

## Call Stack

Stores:

- Function execution
- Local variables
- Execution contexts

Example:

```js
function Header() {
    let x = 10;
}
```

While executing:

```text
Call Stack

Header()

x = 10
```

After the function returns:

```text
Call Stack

(empty)
```

The local variables disappear.

---

## Heap

Stores JavaScript objects.

Example:

```js
const obj = {
    theme: "dark"
};
```

The object lives in the Heap.

---

# Important Misconception

❌ State is **not** stored in the JavaScript Call Stack.

The Call Stack only executes component functions.

Persistent component data is stored in objects allocated in the Heap.

---

# Before Fiber

React maintained internal objects (conceptually) for each rendered component.

Example:

```text
Header Internal Object

theme = "dark"

────────────────────

Body Internal Object

count = 0

────────────────────

News Internal Object

articles = []
```

These internal objects lived in the JavaScript Heap.

React read from them whenever it rendered a component.

---

# After Fiber

React replaced those internal objects with Fiber Nodes.

Example:

```text
Header Fiber

memoizedState = "dark"

────────────────────

Body Fiber

memoizedState = 0

────────────────────

News Fiber

memoizedState = []
```

Fiber Nodes also live in the JavaScript Heap.

---

# What is a Fiber?

A **Fiber** is a JavaScript object representing a single React component.

Each React component has its own corresponding Fiber Node.

Example:

```jsx
<App>
    <Header />
    <Body />
    <News />
</App>
```

React creates:

```text
App Fiber

Header Fiber

Body Fiber

News Fiber
```

One Fiber Node per React component.

---

# What does a Fiber Node store?

A Fiber Node stores everything React needs for that component.

Conceptually:

```text
Fiber Node

↓

State

Props

Update Queue

Effects

Parent

Child

Sibling
```

Later modules will cover the exact fields.

---

# Where is useState stored?

Example:

```jsx
function Counter() {
    const [count, setCount] = useState(0);
}
```

The value is **not** stored inside the component function.

Instead:

```text
Counter Fiber

↓

memoizedState

↓

count = 0
```

The component function executes and finishes.

The Fiber Node persists.

---

# Component Function vs Fiber

Component

```text
Counter()

↓

Execute

↓

Return JSX

↓

Function Ends
```

Fiber

```text
Counter Fiber

↓

Still Exists

↓

Stores State

Stores Props

Stores Effects

Stores Update Queue
```

The function is temporary.

The Fiber Node is persistent.

---

# Fiber Tree

Suppose:

```jsx
<App>
    <Header />
    <Sidebar />
    <Dashboard />
</App>
```

React creates:

```text
App Fiber
├── Header Fiber
├── Sidebar Fiber
└── Dashboard Fiber
```

This collection of connected Fiber Nodes is called the **Fiber Tree**.

---

# Fiber Connections

Each Fiber Node is connected using three references.

```text
child

↓

First Child
```

```text
sibling

↓

Next Sibling
```

```text
return

↓

Parent Fiber
```

---

# Example

Component Tree

```text
App
├── Header
├── Sidebar
└── Dashboard
```

Fiber Tree

```text
                App Fiber
                    │
                 child
                    ▼
             Header Fiber
                 │     ▲
          sibling     return
                 │       │
                 ▼       │
            Sidebar Fiber
                 │     ▲
          sibling     return
                 │       │
                 ▼       │
          Dashboard Fiber
                    ▲
                 return
                    │
                App Fiber
```

---

# Why child, sibling, return?

These three references allow React to:

- Traverse down the tree
- Move across siblings
- Return to the parent

without relying on recursive JavaScript function calls.

---

# Current Fiber vs Work-in-Progress Fiber

React does **not** directly modify the current Fiber Tree.

Instead it creates (or reuses) a **Work-in-Progress (WIP) Fiber Tree**.

Current Tree

```text
Counter

count = 0
```

Work-in-Progress Tree

```text
Counter

count = 1
```

The browser continues using the Current Tree while React prepares the next UI using the WIP Tree.

---

# Why Two Trees?

Suppose React immediately modified the Current Tree.

Halfway through rendering:

```text
Current

count = 1
```

But the browser is still displaying:

```text
Count = 0
```

React's internal data and the screen would become inconsistent.

Instead:

```text
Current Tree

count = 0

────────────────────────

Work-In-Progress Tree

count = 1
```

The Current Tree remains untouched until rendering finishes.

---

# Commit Phase

After rendering completes:

```text
Current Tree

count = 0

────────────────────────

Work-In-Progress Tree

count = 1
```

React performs the Commit Phase.

Conceptually:

```text
Current

↓

Work-In-Progress

↓

Swap

↓

Browser Updates
```

The Work-in-Progress Tree becomes the Current Tree.

---

# Double Buffering

React's two-tree architecture is similar to double buffering used in graphics programming.

```text
Current Buffer

↓

Displayed

────────────────────

Back Buffer

↓

Prepared

────────────────────

Swap

↓

Displayed
```

React performs the same idea with Fiber Trees.

---

# Complete Flow

```text
setState()
      │
      ▼
Scheduler
      │
      ▼
Create / Reuse Work-In-Progress Tree
      │
      ▼
Render Phase
      │
      ├── Call Components
      ├── Read State from Fiber
      ├── Reconciliation
      ├── Diffing
      └── Prepare Changes
      │
      ▼
Commit Phase
      │
      ▼
Swap Current & Work-In-Progress Trees
      │
      ▼
Update Real DOM
      │
      ▼
Browser Paint
```

---

# Important Notes

- Each React component has one corresponding Fiber Node.
- Fiber Nodes are JavaScript objects stored in the Heap.
- Component functions are temporary; Fiber Nodes persist across renders.
- Fiber Nodes store state, props, update queues, effects, and tree relationships.
- The JavaScript Call Stack is used only for executing functions.
- React no longer depends on the Call Stack to traverse the component tree.
- React prepares updates in the Work-in-Progress Tree.
- The browser continues using the Current Tree until the Commit Phase.
- The Work-in-Progress Tree becomes the Current Tree after the Commit Phase.

---

# Interview Questions

## What is React Fiber?

React Fiber is the internal architecture introduced in React 16. A Fiber is a JavaScript object representing a single React component and all the information React needs to render, update, and manage that component.

---

## Why was Fiber introduced?

Fiber was introduced to enable interruptible rendering, scheduling, prioritization, and concurrent rendering, which were not possible with the synchronous Stack Reconciler.

---

## Where is component state stored?

In modern React, component state is stored on the component's corresponding Fiber Node (for hooks, in the `memoizedState` field).

---

## Where are Fiber Nodes stored?

Fiber Nodes are JavaScript objects allocated in the JavaScript Heap.

---

## What is the difference between the Current Fiber Tree and the Work-in-Progress Fiber Tree?

The Current Fiber Tree represents the UI currently displayed on the screen.

The Work-in-Progress Fiber Tree represents the next UI that React is preparing during the Render Phase.

---

## Why does React maintain two Fiber Trees?

To prepare the next UI without modifying the currently displayed UI. This allows React to pause, restart, or discard rendering while keeping the visible UI consistent.

---

# Key Takeaways

- Fiber replaced the old Stack Reconciler architecture.
- Each component has its own Fiber Node.
- Fiber Nodes live in the JavaScript Heap.
- Component functions execute and finish; Fiber Nodes persist.
- Fiber Nodes store state, props, effects, update queues, and tree relationships.
- React uses `child`, `sibling`, and `return` references to build the Fiber Tree.
- React maintains both a Current Fiber Tree and a Work-in-Progress Fiber Tree.
- The Work-in-Progress Tree is prepared during the Render Phase.
- During the Commit Phase, the Work-in-Progress Tree becomes the Current Tree.
# ⚛️ React Rendering & Re-rendering - React.memo Internals

---

# What is `React.memo`?

`React.memo` is a Higher-Order Component (HOC) that memoizes a component.

It prevents unnecessary re-renders by comparing the component's previous props with its new props.

If the props are unchanged, React skips rendering the component.

---

# Where Are Previous Props Stored?

React stores the previously committed props inside the component's **Fiber**.

```text
Child Fiber
│
├── memoizedProps
├── memoizedState
├── child
├── sibling
└── return
```

`memoizedProps` contains the props from the **last committed render**.

---

# What Happens During a Parent Re-render?

Suppose:

```jsx
const Child = React.memo(function Child({ name }) {
    return <h1>{name}</h1>;
});

function Parent() {
    const [count, setCount] = useState(0);

    return <Child name="Ashish" />;
}
```

Parent updates:

```jsx
setCount(c => c + 1);
```

---

# Complete Internal Flow

```text
Current Tree

↓

User Click

↓

setState()

↓

Create Update Object

↓

Append Update to Parent Hook Queue

↓

Notify Scheduler

↓

═══════════════════════════════
Render Phase
═══════════════════════════════

↓

Clone Current Tree

↓

Create Work In Progress (WIP) Tree

↓

Execute Parent()

↓

React reaches Memo Component

↓

Read Current Fiber

memoizedProps

↓

Read WIP Fiber

pendingProps

↓

Shallow Compare
(Object.is for every prop)

↓

Props Changed?

├───────────────────────────────┐
│                               │
│ No                            │
│                               │
│ Bailout                       │
│                               │
│ Skip Child()                  │
│                               │
│ Reuse Previous Output          │
│                               │
└───────────────────────────────┘

               OR

┌───────────────────────────────┐
│ Yes                           │
│                               │
│ Execute Child()               │
│                               │
│ Execute Hooks                 │
│                               │
│ Generate JSX                  │
│                               │
│ Update Child WIP Fiber        │
│                               │
│ Continue Reconciliation       │
└───────────────────────────────┘

↓

Render Phase Ends

↓

Commit Phase

↓

Update Only Changed DOM Nodes

↓

Swap WIP Tree

↓

Browser Paint

↓

Run useEffect()
```

---

# Current Fiber vs WIP Fiber

During rendering:

```text
Current Fiber

memoizedProps

↓

{name:"Ashish"}

────────────────────────────

WIP Fiber

pendingProps

↓

{name:"Ashish"}
```

React compares:

```text
memoizedProps

↓

pendingProps

↓

Object.is() (Shallow Comparison)
```

---

# Bailout

If props are identical:

```text
Compare Props

↓

Same

↓

Bailout

↓

Skip Executing Child()

↓

Reuse Previous Render Output
```

The child component function is **never executed**.

---

# Props Changed

Example:

```jsx
<Child name="Ashuu" />
```

Comparison:

```text
memoizedProps

{name:"Ashish"}

↓

pendingProps

{name:"Ashuu"}

↓

Different

↓

Execute Child()

↓

Continue Rendering
```

---

# Why is it Called `memoizedProps`?

React stores the props from the last successful render.

Just like:

```text
memoizedState
```

stores the previously committed state,

```text
memoizedProps
```

stores the previously committed props.

---

# React.memo Decision Flow

```text
Parent Render

↓

Reach Memo Component

↓

Read memoizedProps

↓

Read pendingProps

↓

Compare Props

↓

Props Changed?

├── No
│
│   Bailout
│
│   Skip Child()
│
└── Yes
    │
    ▼
Execute Child()

↓

Continue Rendering
```

---

# Key Takeaways

- `React.memo` stores previous props in the Fiber's `memoizedProps`.
- During a parent re-render, the WIP Fiber receives `pendingProps`.
- React performs a shallow comparison using `Object.is()` for each prop.
- The comparison happens **before** the child component is executed.
- If props are unchanged, React performs a bailout.
- During a bailout, React skips executing the child component and reuses the previous render output.
- If props have changed, React executes the child component and continues the normal rendering process.

---

# Interview Questions

## How does `React.memo` work internally?

React stores the previously committed props in the component's Fiber as `memoizedProps`. During a parent re-render, the Work In Progress Fiber receives `pendingProps`. React performs a shallow comparison between `memoizedProps` and `pendingProps`. If they are equal, React performs a bailout and skips executing the component. Otherwise, React renders the component normally.

---

## What is a bailout?

A bailout is an optimization where React skips executing a component because its props haven't changed. Instead of rendering the component again, React reuses the previous render output.

---

## Where are previous props stored?

Previous props are stored in the component Fiber as `memoizedProps`.

---

## When does React compare props?

React compares `memoizedProps` and `pendingProps` during the **Render Phase**, before executing the component.

---

# Complete Process in One Sentence

When a parent re-renders, React creates a Work In Progress Fiber for the memoized child, compares the child's previously committed `memoizedProps` with the new `pendingProps` using a shallow comparison, performs a bailout and skips executing the child if the props are unchanged, otherwise executes the child, reconciles its output, and commits any resulting DOM updates.
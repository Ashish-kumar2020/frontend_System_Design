# ⚛️ React Rendering & Re-rendering - Child → Parent Re-render Flow

---

# Does a Child Re-render Cause the Parent to Re-render?

**No.**

A child updating its own state **does not** cause its parent to re-render.

React only re-renders the component whose:

- State changed
- Props changed
- Context changed

---

# Example

```jsx
function Parent() {
    console.log("Parent Render");

    return <Child />;
}

function Child() {
    const [count, setCount] = useState(0);

    console.log("Child Render");

    return (
        <button onClick={() => setCount(c => c + 1)}>
            {count}
        </button>
    );
}
```

---

# Initial Render

```text
Parent Render

↓

Child Render
```

Both components render.

---

# Child State Update

```jsx
setCount(c => c + 1);
```

The state belongs to **Child's Fiber**.

```text
Parent Fiber

↓

Child Fiber
│
└── Hook Linked List
      │
      ▼
   useState(count)
```

React creates an update only for the Child.

---

# Internal Flow

```text
Child setState()

↓

Create Update

↓

Update Queue (Child)

↓

Scheduler

↓

Render Child

↓

Reconciliation

↓

Commit Phase

↓

Update Child DOM
```

The parent is **not** re-rendered.

---

# Why Doesn't the Parent Render?

The parent:

- State didn't change ❌
- Props didn't change ❌
- Context didn't change ❌

Therefore, React has no reason to execute the parent component again.

---

# Parent → Child vs Child → Parent

## Parent State Update

```text
Parent State Changes

↓

Parent Render

↓

Child Render (by default)
```

A parent re-render causes its children to render.

---

## Child State Update

```text
Child State Changes

↓

Child Render

↓

Parent Does NOT Render
```

A child re-render does **not** affect its parent.

---

# Rendering Direction

```text
State Updates

↓

Render Starts From The Component

↓

That Component Re-renders

↓

Its Children Re-render (by default)

↓

Parents Do NOT Re-render
```

Rendering always flows **downwards**.

---

# Component Tree Example

```text
App
│
├── Header
│
├── Dashboard
│   │
│   ├── Stats
│   └── Chart
│
└── Footer
```

### If `Dashboard` state changes

```text
Dashboard    ✅ Render

↓

Stats        ✅ Render

↓

Chart        ✅ Render
```

Only the updated component and its subtree render.

---

### If `App` state changes

```text
App          ✅ Render

↓

Header       ✅ Render

↓

Dashboard    ✅ Render

↓

Stats        ✅ Render

↓

Chart        ✅ Render

↓

Footer       ✅ Render
```

The entire subtree renders (unless optimizations like `React.memo` skip components).

---

# Key Takeaways

- A child updating its own state does not re-render its parent.
- React schedules updates for the Fiber whose state changed.
- A parent re-render causes child components to render by default.
- Rendering flows from parent to child, never from child to parent.
- State updates affect the component that owns the state and its descendants.

---

# Interview Questions

## If a child component updates its own state, will the parent re-render?

No. React schedules work only for the child's Fiber. The child and its subtree re-render, while the parent does not because neither its state nor its props changed.

---

## Why doesn't a child state update affect the parent?

State belongs to the component that created it. Updating that state schedules a render for that component's Fiber only. Since the parent is unaffected, React does not execute it again.

---

## What is the rendering direction in React?

Rendering always flows **downward**. A component re-render can cause its children to render, but a child re-render never causes its parent to render.
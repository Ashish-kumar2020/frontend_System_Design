# ⚛️ React Rendering & Re-rendering - Common Re-render Myths

---

# Myth 1

## "If a component re-renders, its DOM always updates."

❌ False

### Actual Flow

```text
Component Render

↓

Execute Component

↓

Generate JSX

↓

Reconciliation

↓

Any Changes?

├── Yes
│
│   Commit Phase
│
│   Update DOM
│
└── No
    │
    ▼
No DOM Update
```

A component can render many times without causing any DOM updates.

---

# Myth 2

## "React.memo prevents every re-render."

❌ False

`React.memo` only prevents re-renders caused by **unchanged props**.

It does **not** prevent:

- State updates inside the component
- Context updates
- Actual prop changes

### Flow

```text
Parent Render

↓

React.memo

↓

Compare Props

↓

Same?

├── Yes
│
│   Bailout
│
└── No
    │
    ▼
Execute Child()
```

---

# Myth 3

## "useMemo always improves performance."

❌ False

`useMemo` itself has overhead.

Every render React still needs to:

```text
Reach useMemo

↓

Compare Dependencies

↓

Dependencies Changed?

├── No
│
│   Return Cached Value
│
└── Yes
    │
    ▼
Execute Callback
```

For cheap computations:

```jsx
const fullName = first + last;
```

`useMemo` often adds unnecessary work.

Use it only when:

- Computation is expensive.
- Stable object/array references are needed.

---

# Myth 4

## "useCallback makes functions execute faster."

❌ False

`useCallback` does **not** speed up function execution.

Its purpose is to keep the **function reference stable**.

Without `useCallback`:

```text
Render

↓

Create Function #1

────────────────────

Render Again

↓

Create Function #2
```

With `useCallback`:

```text
Render

↓

Create Function #1

↓

Store in Hook.memoizedState

────────────────────

Render Again

↓

Return Cached Function #1
```

---

# Myth 5

## "Inline functions are always bad."

❌ False

Example:

```jsx
<button onClick={() => setCount(c => c + 1)}>
```

Creating a small function is inexpensive.

The real issue is only when:

```text
Inline Function

↓

Passed to React.memo Child

↓

New Function Reference

↓

Comparison Fails

↓

Child Re-renders
```

Otherwise, inline functions are generally fine.

---

# Myth 6

## "Every re-render is bad."

❌ False

Rendering is usually cheap.

```text
Execute Component

↓

Generate JSX

↓

Reconciliation
```

The expensive part is:

```text
DOM Updates
```

React minimizes DOM updates through reconciliation.

---

# Myth 7

## "React compares the Virtual DOM with the Real DOM."

❌ False

Internally React compares:

```text
Current Fiber Tree

↓

Work In Progress Tree
```

Only after reconciliation does React update the Real DOM.

---

# Myth 8

## "React.memo should be used everywhere."

❌ False

`React.memo` itself has a cost.

Every parent render still performs:

```text
React.memo

↓

Compare Props

↓

Bailout?
```

For very small components, the comparison may cost more than rendering.

Use `React.memo` only when profiling shows it provides a benefit.

---

# Golden Rules

- Rendering ≠ DOM Update.
- Optimize only after measuring.
- `useMemo` and `useCallback` are performance optimizations, not requirements.
- `React.memo` only skips renders caused by unchanged props.
- Stable references are important for successful bailouts.
- Profile before optimizing.

---

# Interview Questions

## Does every render update the DOM?

No. Rendering computes the next UI, while reconciliation determines whether any DOM updates are required.

---

## Does React.memo prevent all re-renders?

No. It only skips parent-triggered renders when props remain referentially equal.

---

## Should useMemo be used everywhere?

No. It introduces dependency comparison overhead and should only be used when it provides measurable benefits.

---

## Are inline functions bad?

No. They are only problematic when passed as props to memoized children because they create new function references.

---

## Does React compare the Virtual DOM with the Real DOM?

No. React reconciles the Current Fiber Tree with the Work In Progress Fiber Tree and updates the Real DOM during the Commit Phase.
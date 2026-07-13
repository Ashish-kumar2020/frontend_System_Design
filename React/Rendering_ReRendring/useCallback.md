# ⚛️ React Rendering & Re-rendering - When `useCallback` Actually Helps

---

# Why Do We Need `useCallback`?

Without `useCallback`, functions declared inside a component are recreated on every render.

This creates a **new function reference**, even if the function body remains the same.

Since `React.memo` performs a shallow comparison, the new function reference causes the comparison to fail.

---

# Example Without `useCallback`

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    function handleClick() {
        console.log("Clicked");
    }

    return <Child onClick={handleClick} />;
}

const Child = React.memo(function Child({ onClick }) {
    return <button onClick={onClick}>Click</button>;
});
```

---

# Internal Flow (Without `useCallback`)

```text
Parent Render

↓

JavaScript Executes

↓

Create Function #1

↓

Pass Function #1 to Child

↓

React Stores

memoizedProps.onClick = Function #1

────────────────────────────

Parent Re-renders

↓

JavaScript Executes Again

↓

Create Function #2

↓

Pass Function #2 to Child

↓

React.memo

↓

Compare

Function #1

vs

Function #2

↓

Object.is()

↓

false

↓

Props Changed

↓

Execute Child()
```

Although the function body is identical, the references are different.

---

# Why?

Every render executes:

```jsx
function handleClick() {
    console.log("Clicked");
}
```

JavaScript creates a **new function object** every time.

```text
Function #1

≠

Function #2
```

React compares references, not function bodies.

---

# Using `useCallback`

```jsx
const handleClick = useCallback(() => {
    console.log("Clicked");
}, []);
```

---

# Internal Flow (With `useCallback`)

```text
Parent Render

↓

useCallback()

↓

Dependencies Changed?

├── Yes
│
│   Create Function #1
│
│   Store in Hook.memoizedState
│
│   Return Function #1
│
└── No
    │
    ▼
Return Cached Function #1

↓

Pass Function #1 to Child

↓

React.memo

↓

Compare

Function #1

vs

Function #1

↓

Object.is()

↓

true

↓

Bailout

↓

Skip Child()
```

The function reference remains stable.

---

# Relationship Between `useCallback` and `React.memo`

```text
Parent Render

↓

useCallback

↓

Return Stable Function

↓

Pass as Props

↓

React.memo

↓

Compare Props

↓

Same Reference?

├── Yes
│
│   Bailout
│
│   Skip Child Render
│
└── No
    │
    ▼
Execute Child()
```

`useCallback` and `React.memo` complement each other.

---

# Responsibilities

## useCallback

```text
Memoizes

↓

Function Reference
```

Purpose:

> Keep function references stable.

---

## React.memo

```text
Memoizes

↓

Component Rendering
```

Purpose:

> Skip rendering when props haven't changed.

---

# useCallback vs React.memo

| useCallback | React.memo |
|--------------|------------|
| Memoizes a function reference | Memoizes a component |
| Returns the same function until dependencies change | Skips executing the component if props haven't changed |
| Runs inside the parent component | Wraps the child component |
| Helps maintain stable function references | Helps prevent unnecessary re-renders |

---

# useMemo vs useCallback

| useMemo | useCallback |
|----------|-------------|
| Memoizes values (objects, arrays, computed results) | Memoizes functions |
| Returns the same value reference | Returns the same function reference |
| Used for stable data | Used for stable callbacks |

---

# Complete Mental Model

```text
Parent Render

↓

useCallback

↓

Keep Function Stable

↓

Pass Stable Callback

↓

React.memo

↓

Compare Previous Props

↓

Same?

├── Yes
│
│   Bailout
│
│   Skip Child Render
│
└── No
    │
    ▼
Execute Child()
```

---

# Key Takeaways

- Without `useCallback`, JavaScript creates a new function object on every render.
- `useCallback` caches the function and returns the same reference until dependencies change.
- `React.memo` never caches functions.
- `React.memo` only compares previous and current prop references.
- Stable function references from `useCallback` allow `React.memo` to perform a bailout.
- `useCallback` does **not** make function execution faster.
- The primary purpose of `useCallback` is to preserve function references across renders.

---

# Interview Questions

## Why is `useCallback` often used with `React.memo`?

`React.memo` performs a shallow comparison of props. Functions declared during rendering receive a new reference every render, causing the comparison to fail. `useCallback` caches the function and returns the same reference until dependencies change, allowing `React.memo` to skip unnecessary renders.

---

## Does `React.memo` compare function bodies?

No. `React.memo` performs a shallow comparison using `Object.is()`. For functions, only the references are compared.

---

## What is the difference between `useCallback` and `React.memo`?

`useCallback` memoizes function references, while `React.memo` memoizes component rendering by skipping execution when props remain unchanged.

---

# Complete Process in One Sentence

When a parent re-renders, `useCallback` returns the previously cached function if its dependencies haven't changed, preserving the same function reference; `React.memo` then compares the child's previous `memoizedProps` with the new `pendingProps`, performs a bailout if the function references are unchanged, and skips executing the child component.
# ⚛️ Hooks Internals - `useCallback` Internals

---

# What is `useCallback`?

`useCallback` caches a **function reference** and returns the same function between renders as long as its dependencies do not change.

Example:

```jsx
const handleClick = useCallback(() => {
    console.log("Clicked");
}, []);
```

Unlike `useState`, `useCallback` does not have an update queue or scheduler.

---

# What Happens During the First Render?

When React encounters:

```jsx
useCallback(() => {
    console.log("Clicked");
}, []);
```

it creates a Hook object.

```text
Fiber
│
▼
memoizedState
│
▼
Hook
```

The Hook's `memoizedState` stores:

```text
Hook
│
└── memoizedState
      │
      ▼
{
    callback: Function,
    deps: Dependency Array
}
```

Finally, React returns the callback function.

---

# First Render Flow

```text
Create Hook

↓

Store

{
    callback,
    deps
}

↓

Return Callback
```

Since there are no previous dependencies, React always stores the callback on the first render.

---

# What Happens on the Next Render?

React reaches the same `useCallback()` Hook.

It reads:

```text
Previous Hook

↓

memoizedState

↓

{
    callback,
    deps
}
```

Then React compares:

- Previous dependencies
- Current dependencies

using **`Object.is()`**.

---

# If Dependencies Have NOT Changed

```text
Dependencies Same

↓

Return Previous Callback
```

The existing function reference is reused.

---

# If Dependencies Have Changed

```text
Dependencies Changed

↓

JavaScript Creates New Function

↓

Update memoizedState

↓

Return New Callback
```

React replaces the cached callback with the new function.

---

# Important

React **does not modify** the existing function.

When dependencies change, JavaScript creates a **new function object**, and React stores the new function in the Hook's `memoizedState`.

Example:

```jsx
const handleClick = useCallback(() => {
    console.log(count);
}, [count]);
```

### Render 1

```text
count = 0

↓

Function Object #1

↓

Store Function #1
```

### Render 2 (`count` changes)

```text
count = 1

↓

Dependencies Changed

↓

JavaScript Creates Function Object #2

↓

Replace Function Object #1

↓

Return Function Object #2
```

---

# Complete Lifecycle

```text
Initial Render

↓

Create Hook

↓

Store

{
    callback,
    deps
}

↓

Return Callback

────────────────────────────

Next Render

↓

Read Previous Hook

↓

Read Previous memoizedState

↓

Compare Dependencies (Object.is)

↓

Dependencies Changed?

├── No
│
│   Return Previous Callback
│
└── Yes
    │
    ▼
Create New Function

↓

Update memoizedState

↓

Return New Callback
```

---

# `useMemo` vs `useCallback`

| useMemo | useCallback |
|----------|-------------|
| Caches a computed value | Caches a function reference |
| Stores `{ value, deps }` | Stores `{ callback, deps }` |
| Returns a value | Returns a function |
| Recomputes when dependencies change | Creates a new function when dependencies change |

---

# Internal Structure

```text
Hook
│
└── memoizedState
      │
      ▼
{
    callback: Function,
    deps: [dep1, dep2]
}
```

---

# Key Takeaways

- `useCallback` creates one Hook object.
- The Hook's `memoizedState` stores:
  - Callback function
  - Dependency array
- On the first render, React stores the callback.
- On subsequent renders, React compares dependencies using `Object.is()`.
- If dependencies are unchanged, React returns the previous callback.
- If dependencies change, JavaScript creates a new function object, and React replaces the cached callback.
- `useCallback` does not have an update queue or scheduler.
- `useCallback` itself never triggers a re-render.

---

# Interview Questions

## What does `useCallback` store internally?

`useCallback` stores an object inside the Hook's `memoizedState` containing the callback function and its dependency array.

---

## How does React decide whether to return the same callback?

On every render, React compares the current dependency array with the previous one using `Object.is()`. If all dependencies are unchanged, React returns the previously cached callback. Otherwise, it stores and returns a new callback.

---

## Does `useCallback` modify the existing function?

No. Functions are immutable in JavaScript. When dependencies change, JavaScript creates a new function object, and React replaces the previously cached callback with the new one.

---

## What is the internal difference between `useMemo` and `useCallback`?

Both Hooks use the same caching mechanism and compare dependencies using `Object.is()`. The difference is that `useMemo` caches a computed value, whereas `useCallback` caches a function reference.
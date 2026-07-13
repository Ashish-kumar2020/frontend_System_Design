
# ⚛️ Hooks Internals - `useMemo` Internals

---

# What is `useMemo`?

`useMemo` caches the result of an expensive computation and recomputes it only when its dependencies change.

Example:

```jsx
const sortedItems = useMemo(() => {
    return items.sort();
}, [items]);
```

Unlike `useState`, `useMemo` does not have an update queue or scheduler. Its only responsibility is to cache a computed value.

---

# What Happens During the First Render?

When React encounters:

```jsx
useMemo(() => {
    return items.sort();
}, [items]);
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

The Hook's `memoizedState` stores both the cached value and its dependency array.

```text
Hook
│
└── memoizedState
      │
      ▼
{
    value: Cached Value,
    deps: Dependency Array
}
```

---

# First Render Flow

During the initial render:

```text
Create Hook

↓

Execute Callback

↓

Compute Value

↓

Store

{
    value,
    deps
}

↓

Return Cached Value
```

Since there are no previous dependencies, React always executes the callback on the first render.

---

# What Happens on the Next Render?

React reaches the same `useMemo()` Hook.

It reads the previous Hook.

```text
Hook

↓

memoizedState

↓

{
    value,
    deps
}
```

Then React compares:

- Previous dependencies
- Current dependencies

using **`Object.is()`**.

---

# Dependency Comparison

```text
Previous deps

↓

Current deps

↓

Object.is()

↓

Dependencies Changed?
```

---

# If Dependencies Have NOT Changed

```text
Dependencies Same

↓

Do NOT execute callback

↓

Return Cached Value
```

The expensive computation is skipped.

---

# If Dependencies Have Changed

```text
Dependencies Changed

↓

Execute Callback

↓

Compute New Value

↓

Update memoizedState

↓

Return New Value
```

React updates both:

- Cached value
- Dependency array

---

# Complete Lifecycle

```text
Initial Render

↓

Create Hook

↓

Execute Callback

↓

Compute Value

↓

Store

{
    value,
    deps
}

↓

Return Value

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
│   Return Cached Value
│
└── Yes
    │
    ▼
Execute Callback

↓

Compute New Value

↓

Update memoizedState

↓

Return New Value
```

---

# Internal Structure

```text
Hook
│
└── memoizedState
      │
      ▼
{
    value: Cached Result,
    deps: [dep1, dep2]
}
```

Unlike `useState`, `useMemo` does not store an update queue.

---

# `useMemo` vs `useEffect`

| useMemo | useEffect |
|----------|-----------|
| Runs during the Render Phase | Runs after the Commit Phase |
| Caches a computed value | Performs side effects |
| Returns a value | Returns nothing |
| Stores `{ value, deps }` | Stores an Effect object |

---

# Complete Internal Flow

```text
Render

↓

Reach useMemo()

↓

Read Previous Hook

↓

Read Previous memoizedState

↓

Read Previous deps

↓

Compare with Current deps

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

↓

Compute New Value

↓

Update memoizedState

↓

Return New Value
```

---

# Key Takeaways

- `useMemo` creates one Hook object.
- The Hook's `memoizedState` stores:
  - Cached value
  - Dependency array
- The callback executes during the Render Phase.
- On the first render, the callback always executes.
- On subsequent renders, React compares dependencies using `Object.is()`.
- If dependencies are unchanged, React returns the cached value.
- If dependencies change, React recomputes the value and updates the cache.
- `useMemo` does not use an update queue or scheduler.

---

# Interview Questions

## What does `useMemo` store internally?

`useMemo` stores an object inside the Hook's `memoizedState` containing the cached value and its dependency array.

---

## When does the `useMemo` callback execute?

The callback always executes on the initial render. On subsequent renders, React first compares the dependency array using `Object.is()`. The callback executes only if one or more dependencies have changed.

---

## How does React decide whether to recompute a memoized value?

React compares each dependency in the current dependency array with the previous one using `Object.is()`. If all dependencies are equal, React returns the cached value. Otherwise, it executes the callback, computes a new value, updates the cache, and returns the new value.

---

## Why doesn't `useMemo` have an update queue?

Unlike `useState`, `useMemo` does not manage state updates. Its only responsibility is to cache a computed value and recompute it when dependencies change, so it does not require an update queue or scheduler.
# ⚛️ Hooks Internals - `useState` Internals

---

# What Happens During the First Render?

Consider:

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    return <button>{count}</button>;
}
```

When React encounters `useState(0)` for the first time, it creates a **Hook object**.

```text
Counter Fiber
      │
      ▼
memoizedState
      │
      ▼
Hook
├── memoizedState = 0
├── queue = []
└── next = null
```

The Hook is attached to the component's Fiber through `fiber.memoizedState`.

Finally, React returns:

```jsx
const [count, setCount] = useState(0);
```

where:

- `count` = `Hook.memoizedState`
- `setCount` = function that adds updates to the Hook's queue

---

# What Happens When `setCount()` is Called?

Calling `setCount()` **does not immediately update the state**.

Instead, React:

1. Creates an **Update object**.
2. Adds it to the Hook's **update queue**.
3. Schedules a re-render.

Example:

```jsx
setCount(5);
```

Queue:

```text
Hook
├── memoizedState = 0
└── queue

      ▼
 Update(action = 5)
```

The state is updated during the **next render**, not immediately.

---

# Value Updates

Example:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Assume:

```text
count = 0
```

Before React receives the updates, **JavaScript evaluates each expression**.

```text
count + 1

↓

0 + 1

↓

1
```

So React actually receives:

```jsx
setCount(1);
setCount(1);
setCount(1);
```

The queue becomes:

```text
Update(action = 1)

↓

Update(action = 1)

↓

Update(action = 1)
```

During the next render:

```text
memoizedState = 0

↓

Set to 1

↓

Set to 1

↓

Set to 1

↓

Final State = 1
```

---

# Functional Updates

Example:

```jsx
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
```

React does **not** execute the functions immediately.

Instead, it stores the updater functions.

Queue:

```text
Update(action = c => c + 1)

↓

Update(action = c => c + 1)

↓

Update(action = c => c + 1)
```

During the next render:

```text
memoizedState = 0

↓

action(0)

↓

1

↓

action(1)

↓

2

↓

action(2)

↓

3

↓

Final State = 3
```

---

# Why Does Functional Update Work?

The updater function **does not remember the previous state**.

React stores the updater function in the update queue.

During the next render, React processes each queued update sequentially and passes the **latest computed state** (`memoizedState`) into the updater function.

Example:

```text
memoizedState = 0

↓

action(0)

↓

memoizedState = 1

↓

action(1)

↓

memoizedState = 2

↓

action(2)

↓

memoizedState = 3
```

React keeps track of the latest state, **not the updater function**.

---

# Value Update vs Functional Update

| Value Update | Functional Update |
|---------------|-------------------|
| `setCount(count + 1)` | `setCount(c => c + 1)` |
| JavaScript evaluates the expression immediately | React stores the updater function |
| Queue stores values | Queue stores functions |
| Every update sets the same value | Every update receives the latest computed state |
| Final result = `1` | Final result = `3` |

---

# Complete Flow

```text
Component Mount
      │
      ▼
useState(0)
      │
      ▼
Create Hook
      │
      ├── memoizedState = 0
      ├── queue = []
      └── next
      │
      ▼
Attach Hook to Fiber
      │
      ▼
Return count & setCount()

────────────────────────────

setCount(...)

↓

Create Update Object

↓

Push into Hook Queue

↓

Scheduler

↓

Next Render

↓

Read Hook

↓

Process Update Queue

↓

Compute New State

↓

Update memoizedState

↓

Commit

↓

UI Updates
```

---

# Key Takeaways

- Every `useState()` creates one Hook object.
- Hook state is stored in `Hook.memoizedState`.
- Each Hook has its own update queue.
- `setState()` creates an Update object and adds it to the queue.
- State is updated during the next render, not immediately.
- Value updates store computed values in the queue.
- Functional updates store updater functions in the queue.
- React executes updater functions during the next render using the latest computed `memoizedState`.

---

# Interview Questions

## What happens internally when `useState()` is called for the first time?

React creates a Hook object, stores the initial state in `memoizedState`, creates an update queue, links the Hook to the component's Fiber through `fiber.memoizedState`, and returns the current state along with the `setState` function.

---

## What happens internally when `setState()` is called?

React creates an Update object, adds it to the Hook's update queue, schedules a re-render, and processes the queued updates during the next render to compute the new state.

---

## Why does `setCount(count + 1)` produce `1` while `setCount(c => c + 1)` produces `3`?

`setCount(count + 1)` is evaluated immediately by JavaScript, so React queues three updates with the value `1`. During the next render, React repeatedly sets the state to `1`. `setCount(c => c + 1)` queues updater functions instead. During the next render, React executes each function sequentially with the latest computed state, resulting in `0 → 1 → 2 → 3`.

---

## Does the updater function remember the previous state?

No. The updater function does not remember any previous state. React stores the function in the update queue and, during the next render, calls it with the latest computed `memoizedState`.
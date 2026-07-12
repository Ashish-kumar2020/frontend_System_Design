# ⚛️ React Fiber - Update Queue

---

# Why does React need an Update Queue?

When you call:

```jsx
setCount(1);
```

React **does not update the state immediately**.

Instead, React creates an **Update Object** and stores it in the Hook's queue.

This allows React to:

- Batch multiple updates together
- Prioritize updates
- Process updates during the Render Phase
- Support concurrent rendering

---

# Update Flow

```text
setState()

↓

Create Update Object

↓

Store Update in Hook Queue

↓

Scheduler schedules work

↓

Render Phase

↓

Process Update Queue

↓

Calculate New State

↓

Store New memoizedState

↓

Component Re-renders
```

---

# Where is the Update Queue stored?

We already know:

```text
Counter Fiber

↓

fiber.memoizedState

↓

Hook Linked List
```

Each Hook contains:

```text
Hook

↓

memoizedState

queue

next
```

Example:

```text
Counter Fiber
        │
        ▼
fiber.memoizedState
        │
        ▼
┌────────────────────────────┐
│ Hook 1 (count)             │
├────────────────────────────┤
│ memoizedState = 0          │
│ queue                      │
│ next ───────────────────┐  │
└─────────────────────────│──┘
                          ▼
┌────────────────────────────┐
│ Hook 2 (name)              │
├────────────────────────────┤
│ memoizedState = "Ashu"     │
│ queue                      │
│ next = null                │
└────────────────────────────┘
```

Notice:

Every Hook has **its own queue**.

---

# Why does every Hook have its own queue?

Suppose:

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState("Ashu");
const [age, setAge] = useState(24);
```

Calling:

```jsx
setName("John");
```

should only affect the **name Hook**.

React stores:

```text
Hook (name)

↓

queue

↓

Update(name = "John")
```

The queues for `count` and `age` remain unchanged.

This keeps updates isolated to the Hook they belong to.

---

# What is an Update Object?

Calling:

```jsx
setCount(c => c + 1);
```

creates an Update Object.

Conceptually:

```js
Update = {
    action: c => c + 1,
    next: null
}
```

The Update stores the action needed to compute the next state.

It does **not** immediately change the state.

---

# Multiple Updates

Example:

```jsx
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
```

React creates:

```text
Update1

↓

Update2

↓

Update3
```

These Updates are stored in the Hook's queue until the Render Phase.

---

# Why not use an Array?

React could conceptually store:

```text
[
 Update1,
 Update2,
 Update3
]
```

But React uses a linked structure because updates are frequently added while work is being scheduled and processed.

---

# Circular Linked List

React stores Updates using a **circular linked list**.

Conceptually:

```text
        ┌──────────────┐
        │              │
        ▼              │
Update1 ─► Update2 ─► Update3
   ▲                    │
   └────────────────────┘
```

The last Update points back to the first Update.

---

# Why Circular Linked List?

React keeps a pointer to the **last Update** (tail).

Current queue:

```text
tail

↓

Update3
```

When a new Update arrives:

```text
Update4
```

React performs:

```text
Update3.next = Update4

Update4.next = Update1

tail = Update4
```

No traversal is required.

Time Complexity:

```text
O(1)
```

This makes appending updates very efficient.

---

# Render Phase

Suppose:

```jsx
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
```

Current state:

```text
count = 0
```

Render Phase:

```text
Update1

0

↓

1

────────────────────

Update2

1

↓

2

────────────────────

Update3

2

↓

3
```

Final state:

```text
count = 3
```

Only after processing all Updates does React update:

```text
memoizedState = 3
```

---

# Functional Updates

Example:

```jsx
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
```

Stored Updates:

```text
action = c => c + 1

↓

action = c => c + 1

↓

action = c => c + 1
```

Each Update receives the result of the previous Update.

Result:

```text
0

↓

1

↓

2

↓

3
```

Final state:

```text
3
```

---

# Direct Value Updates

Example:

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Suppose:

```text
count = 0
```

JavaScript evaluates immediately:

```jsx
setCount(1);
setCount(1);
setCount(1);
```

React stores:

```text
Update1

action = 1

↓

Update2

action = 1

↓

Update3

action = 1
```

Render Phase:

```text
0

↓

1

↓

1

↓

1
```

Final state:

```text
1
```

---

# Comparison

## Functional Updates

```jsx
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
```

Result:

```text
3
```

Because each Update receives the latest computed state.

---

## Direct Updates

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Result:

```text
1
```

Because all three Updates contain the same value.

---

# Complete Update Queue Flow

```text
setState()
      │
      ▼
Create Update Object
      │
      ▼
Store in Hook's Queue
(Circular Linked List)
      │
      ▼
Scheduler
      │
      ▼
Render Phase
      │
      ▼
Process Updates One by One
      │
      ▼
Calculate New State
      │
      ▼
Update Hook.memoizedState
      │
      ▼
Component Re-renders
```

---

# Key Takeaways

- `setState()` does not immediately update state.
- Every `useState` Hook has its own update queue.
- `setState()` creates an Update Object.
- Update Objects are stored in the Hook's queue.
- React uses a circular linked list to efficiently append updates.
- Updates are processed during the Render Phase.
- Functional updates receive the latest computed state.
- Direct value updates store the provided value.
- After processing all Updates, React stores the final value in `hook.memoizedState`.

---

# Interview Questions

## What happens when `setState()` is called?

React creates an Update Object, stores it in the Hook's update queue, schedules work, and later processes the queue during the Render Phase to compute the new state.

---

## Where is the update queue stored?

Each `useState` Hook has its own update queue. The Hook itself is part of the linked list referenced by `fiber.memoizedState`.

---

## Why does React use a circular linked list?

A circular linked list allows React to append new updates in **O(1)** time by keeping a pointer to the last Update.

---

## Why do functional updates work correctly?

Functional updates receive the latest computed state while React processes the update queue, allowing multiple updates to build on one another.

---

## Why do multiple direct updates sometimes produce only one increment?

Expressions like `setCount(count + 1)` are evaluated immediately using the current render's value of `count`. If `count` is `0`, all three updates become `setCount(1)`, so the final state remains `1`.
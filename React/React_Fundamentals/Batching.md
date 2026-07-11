# ⚛️ React State Internals - Batching

---

# What is Batching?

Batching is React's optimization technique where **multiple state updates are grouped together** and processed in a **single re-render**.

Instead of rendering after every `setState()`, React waits until the current event handler finishes.

---

# Example

```jsx
function handleClick() {
  setCount(1);
  setName("Ashu");
  setDark(true);
}
```

React does **NOT** do:

```text
setCount()

↓

Render ❌

↓

setName()

↓

Render ❌

↓

setDark()

↓

Render ❌
```

Instead, React does:

```text
setCount()

↓

Queue Update

↓

setName()

↓

Queue Update

↓

setDark()

↓

Queue Update

↓

Event Handler Finishes

↓

Process Queue

↓

ONE Render ✅
```

React waits until the event handler finishes before processing queued state updates. This behavior is called **batching**.  [oai_citation:0‡React](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

# Why does React Batch Updates?

Without batching:

```text
3 setState()

↓

3 Re-renders
```

With batching:

```text
3 setState()

↓

1 Re-render
```

Benefits:

- Better performance
- Fewer unnecessary renders
- Prevents half-updated UI

---

# Batching Flow

```text
User Clicks Button
        │
        ▼
setState()
        │
        ▼
Add Update To Queue
        │
        ▼
Event Handler Continues
        │
        ▼
More setState()
        │
        ▼
More Updates Added To Queue
        │
        ▼
Event Handler Finishes
        │
        ▼
React Processes Queue
        │
        ▼
Calculate Final State
        │
        ▼
Update State Storage
        │
        ▼
Create New Render
        │
        ▼
Update UI
```

---

# Example

```jsx
function handleClick() {
  setCount(1);
  console.log("Hello");
  setName("Ashu");
}
```

Execution:

```text
setCount()

↓

Queue Update

↓

console.log("Hello")

↓

setName()

↓

Queue Update

↓

handleClick() finishes

↓

React processes queue

↓

ONE render
```

The UI updates **only after** the event handler completes.  [oai_citation:1‡React](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

# Batching + Value Updates

```jsx
setCount(count + 5);
setCount(count + 5);
```

Current render:

```text
count = 0
```

Queue:

```text
[
  Replace with 5,
  Replace with 5
]
```

Final state:

```text
5
```

---

# Batching + Functional Updates

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Queue:

```text
[
  prev => prev + 1,
  prev => prev + 1,
  prev => prev + 1
]
```

Processing:

```text
Start = 0

↓

Function 1

0 → 1

↓

Function 2

1 → 2

↓

Function 3

2 → 3
```

Final state:

```text
3
```

Updater functions are executed one after another, each receiving the latest state from the previous update.  [oai_citation:2‡React](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

# Mixed Updates

```jsx
setCount(count + 5);
setCount(prev => prev + 1);
```

Current state:

```text
0
```

Queue:

```text
[
  Replace with 5,
  prev => prev + 1
]
```

Processing:

```text
0

↓

Replace with 5

↓

5

↓

prev => prev + 1

↓

6
```

Final state:

```text
6
```

---

# State Storage vs Update Queue

Current State:

```text
count = 10
```

Queue:

```text
[
  Replace with 20,
  prev => prev * 2,
  prev => prev - 5
]
```

React **does not** immediately change state storage.

Instead:

```text
State Storage

count = 10

↓

Process Queue

↓

20

↓

40

↓

35

↓

Update State Storage

count = 35

↓

New Render
```

---

# Order of Execution

```text
Current State Storage

↓

setState()

↓

Build Update Queue

↓

Event Handler Finishes

↓

Process Queue

↓

Calculate Final State

↓

Update State Storage

↓

Create New Render

↓

Update UI
```

---

# Important Notes

- React batches multiple state updates into a single render.
- State storage is **not updated immediately** after `setState()`.
- React first builds an update queue.
- After the event handler finishes, React processes the queue.
- Once all updates are processed, React updates state storage.
- Finally, React creates a new render.

---

# Interview Questions

## What is batching?

Batching is React's optimization where multiple state updates are grouped together and processed in a single re-render.

---

## When does React process queued updates?

After the current event handler finishes executing.  [oai_citation:3‡React](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

## Does `setState()` immediately update state storage?

No.

It adds an update to the queue. React processes the queue later, calculates the final state, updates state storage, and then re-renders.

---

## Why is batching useful?

- Reduces unnecessary renders
- Improves performance
- Keeps the UI consistent by avoiding partial updates

---

# Key Takeaways

- React batches state updates.
- Multiple `setState()` calls usually produce only one re-render.
- Updates are stored in a queue first.
- The queue is processed after the event handler completes.
- State storage is updated only after the queue has been processed.
- React then creates a new render using the final state.
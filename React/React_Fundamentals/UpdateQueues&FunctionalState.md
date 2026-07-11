# ⚛️ React State Internals - Update Queue & Functional Updates

---

# Recap

Each render gets its **own snapshot** of state.

Example:

```jsx
const [count, setCount] = useState(0);
```

First Render:

```text
count = 0
```

After:

```js
setCount(1);
```

React **does not** change the current `count`.

Instead, React creates a **new render** where:

```text
count = 1
```

---

# State is a Snapshot

Every render has its own variables.

```text
Render #1

count = 0

────────────

Render #2

count = 1

────────────

Render #3

count = 2
```

React never mutates variables of an existing render.

Instead, it creates a new render.

---

# What does setState() do?

Calling:

```jsx
setCount(5);
```

does NOT immediately update:

```jsx
count
```

Instead it tells React:

> "Please schedule another render using this new state."

---

# Value Updates

Example:

```jsx
setCount(5);
```

React receives:

```text
5
```

You are passing a **value**.

---

# Functional Updates

Example:

```jsx
setCount(prev => prev + 1);
```

React receives:

```js
(prev) => prev + 1
```

You are passing a **function**, not a value.

---

# Value Update vs Functional Update

## Value Update

```jsx
setCount(10);
```

Meaning:

> "Set the next state to 10."

---

## Functional Update

```jsx
setCount(prev => prev + 1);
```

Meaning:

> "When you're ready to process this update, give me the latest state and I'll calculate the next one."

---

# React Update Queue

React does not immediately process updates.

Instead, it stores them in an internal queue.

Conceptually:

```js
const queue = [];
```

---

Example:

```jsx
setCount(5);
setCount(10);
```

Queue becomes:

```text
[
   5,
   10
]
```

---

Example:

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Queue becomes:

```text
[
   prev => prev + 1,
   prev => prev + 1,
   prev => prev + 1
]
```

React queues these updates and processes them later, after the event handler finishes, during the next render.  [oai_citation:0‡React](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

# Why does this become 1?

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Current render:

```text
count = 0
```

React receives:

```text
setCount(1)
setCount(1)
setCount(1)
```

Queue:

```text
[
   1,
   1,
   1
]
```

Final state:

```text
1
```

Because every call uses the same snapshot of:

```text
count = 0
```

---

# Why does Functional Update become 3?

Example:

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

---

React starts processing the queue.

Current state:

```text
0
```

---

First function

```js
(prev => prev + 1)(0)
```

Returns:

```text
1
```

Current state becomes:

```text
1
```

---

Second function

```js
(prev => prev + 1)(1)
```

Returns:

```text
2
```

Current state becomes:

```text
2
```

---

Third function

```js
(prev => prev + 1)(2)
```

Returns:

```text
3
```

Current state becomes:

```text
3
```

React processes updater functions sequentially during the next render, passing the latest state from one updater to the next.  [oai_citation:1‡React](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

# Visual Flow

```text
Current State

0

        │
        ▼

Queue

[
 prev => prev + 1,
 prev => prev + 1,
 prev => prev + 1
]

        │
        ▼

Process Function 1

0 → 1

        │
        ▼

Process Function 2

1 → 2

        │
        ▼

Process Function 3

2 → 3

        │
        ▼

Final State

3

        │
        ▼

React Creates New Render

        │
        ▼

UI = 3
```

---

# When should you use Functional Updates?

Use functional updates whenever the next state depends on the previous state.

Examples:

```jsx
setCount(prev => prev + 1);

setCount(prev => prev - 1);

setTodos(prev => [...prev, newTodo]);

setUser(prev => ({
  ...prev,
  name: "Ashu"
}));
```

---

# Important Notes

- Every render gets its own state snapshot.
- `setState()` never changes variables of the current render.
- `setState()` schedules a new render.
- Passing a value stores a value in the update queue.
- Passing a function stores a function in the update queue.
- Functional updates receive the latest state while React processes the queue.
- Use functional updates whenever the next state depends on the previous state.

---

# Interview Questions

## Why does this update only once?

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Because every call uses the same snapshot of `count` from the current render, so all three become `setCount(1)`.

---

## Why does this update three times?

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

Because React queues updater functions and executes them one by one, passing the latest state returned from the previous updater into the next.  [oai_citation:2‡React](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

## What is the difference between these?

```jsx
setCount(10);
```

Passes a value.

---

```jsx
setCount(prev => prev + 1);
```

Passes a function.

---

# Key Takeaways

- State is a snapshot.
- React never mutates state variables of the current render.
- `setState()` schedules a new render.
- React maintains an internal update queue.
- Value updates replace the state.
- Functional updates calculate the next state from the latest available state.
- Functional updates are the correct choice when the next state depends on the previous state.
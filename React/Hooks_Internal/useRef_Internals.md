# ⚛️ Hooks Internals - `useRef` Internals

---

# What is `useRef`?

`useRef` returns a **mutable object** whose value persists across re-renders.

```jsx
const inputRef = useRef(null);
```

React returns:

```js
{
    current: null
}
```

Unlike `useState`, updating `ref.current` does **not** trigger a re-render.

---

# What Happens During the First Render?

When React encounters:

```jsx
const inputRef = useRef(null);
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
│
└── memoizedState
      │
      ▼
{
    current: null
}
```

The Hook is attached to the component's Fiber through `fiber.memoizedState`.

Finally, React returns the same ref object.

---

# What Happens After Commit?

For DOM refs:

```jsx
<input ref={inputRef} />
```

After the Commit Phase, React updates:

```text
inputRef.current
```

to point to the actual DOM node.

```text
{
    current: <input />
}
```

Now:

```jsx
inputRef.current.focus();
```

works because the DOM element has been mounted.

---

# Why Doesn't `useRef` Trigger a Re-render?

Example:

```jsx
const countRef = useRef(0);

countRef.current++;
```

React simply mutates the existing object.

```text
Before

{
    current: 0
}

↓

After

{
    current: 1
}
```

No Update object is created.

No update queue is used.

No scheduler is invoked.

Therefore, **no re-render occurs**.

---

# `useState` vs `useRef`

### `useState`

```jsx
setCount(1);
```

Flow:

```text
setState()

↓

Create Update

↓

Push into Queue

↓

Scheduler

↓

Re-render
```

---

### `useRef`

```jsx
ref.current = 1;
```

Flow:

```text
Mutate Object

↓

Done

↓

No Queue

↓

No Scheduler

↓

No Re-render
```

---

# When Does the UI Show the Updated `ref.current`?

Updating `ref.current` changes the value **immediately in memory**, but the UI does **not** update automatically.

Example:

```jsx
const countRef = useRef(0);

function increment() {
    countRef.current++;
}
```

```jsx
<h1>{countRef.current}</h1>
```

Clicking the button updates:

```text
countRef.current = 1
```

But the UI still shows:

```text
0
```

because no re-render occurred.

---

# When Does the UI Update?

The updated `ref.current` appears in the UI only when the component re-renders due to another reason, such as:

- `useState`
- New props
- Parent component re-render

Example:

```jsx
function increment() {
    countRef.current++;
    setCount(c => c + 1);
}
```

Flow:

```text
ref.current changes

↓

State changes

↓

Component re-renders

↓

React reads ref.current again

↓

UI updates
```

---

# Complete Flow

```text
Component Mount

↓

useRef(null)

↓

Create Hook

↓

Create Ref Object

↓

Store in Hook.memoizedState

↓

Return Ref Object

────────────────────────────

Update ref.current

↓

Mutate Existing Object

↓

No Queue

↓

No Scheduler

↓

No Re-render

────────────────────────────

Some Other State Changes

↓

Component Re-renders

↓

React Reads ref.current Again

↓

UI Reflects Latest Value
```

---

# Key Takeaways

- `useRef` creates one Hook object.
- The Hook's `memoizedState` stores the ref object.
- A ref object has the shape `{ current: value }`.
- Updating `ref.current` mutates the existing object.
- `useRef` does not create Update objects.
- `useRef` does not use an update queue.
- `useRef` does not schedule a re-render.
- The UI reflects the latest `ref.current` only after another render occurs.

---

# Interview Questions

## What does `useRef` store internally?

`useRef` stores a mutable ref object inside the Hook's `memoizedState`. The object has the shape `{ current: value }` and persists across re-renders.

---

## Why doesn't updating `ref.current` trigger a re-render?

Updating `ref.current` only mutates the existing ref object. React does not create an Update object, does not add anything to an update queue, and does not schedule a render. Therefore, changing `ref.current` does not trigger a re-render.

---

## When does the updated `ref.current` appear in the UI?

The updated value appears in the UI only when the component re-renders due to another reason, such as a state update, prop change, or parent re-render. During that render, React reads the latest value of `ref.current`.
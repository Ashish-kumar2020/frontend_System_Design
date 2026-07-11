# ⚛️ React State Internals - How `useState()` Works

---

# Why do we need `useState`?

Normal JavaScript variables **do not persist across renders**.

Example:

```jsx
function Counter() {
  let count = 0;

  function increment() {
    count++;
    console.log(count);
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
    </>
  );
}
```

Output:

```text
Console
1
2
3
```

UI:

```text
0
```

Why?

- React doesn't track normal variables.
- Updating a normal variable does **not** trigger a re-render.

---

# Why does `useState` work?

```jsx
const [count, setCount] = useState(0);
```

React manages the state.

Calling:

```js
setCount(1);
```

tells React:

> "The component's state has changed. Schedule a re-render."

---

# Where is State Stored?

State is **NOT** stored inside the component.

❌ Not here:

```jsx
function Counter() {
  const [count] = useState(0);
}
```

Why?

Because every render executes:

```js
Counter();
```

again.

If state were stored inside the function, it would reset every render.

---

## State is stored inside React

Conceptually:

```text
React

State Storage

Counter
──────────────
count = 5
```

React keeps the state **outside** the component and provides it back on every render.

> Internally, React stores state in the component's Fiber node.

---

# First Render vs Re-render

```jsx
const [count] = useState(0);
```

## First Render

No previous state exists.

```text
useState(0)

↓

count = 0
```

---

## After

```js
setCount(5);
```

React stores:

```text
count = 5
```

---

## Second Render

React executes:

```jsx
useState(0)
```

Does React use `0` again?

❌ No.

React returns:

```text
count = 5
```

The initial value is ignored after the first render.

---

# Meaning of the Initial Value

```jsx
useState(0)
```

does **NOT** mean:

> Set `count` to `0` every render.

It means:

> If this is the first render, initialize the state to `0`. Otherwise, return the previously stored state.

---

# Mini `useState` Implementation

Conceptually:

```js
let state;

function useState(initialValue) {
  if (state === undefined) {
    state = initialValue;
  }

  function setState(newValue) {
    state = newValue;
  }

  return [state, setState];
}
```

Why do we check:

```js
if (state === undefined)
```

Because otherwise:

```js
state = initialValue;
```

would execute every render and reset the state.

---

# Why not always do this?

```js
state = initialValue;
```

Suppose:

```jsx
const [count] = useState(0);
```

Current value:

```text
count = 5
```

Re-render:

```text
state = 0
```

The counter would reset to `0` every render.

---

# Multiple `useState` Calls

Example:

```jsx
function App() {
  const [count] = useState(0);
  const [name] = useState("Ashu");
  const [isDark] = useState(false);
}
```

React conceptually stores:

```js
[
  0,
  "Ashu",
  false
]
```

---

# Hook Pointer (Mental Model)

React also keeps a pointer.

Initially:

```text
Pointer = 0
```

---

First Hook:

```jsx
const [count] = useState(0);
```

React returns:

```text
state[0]
```

Pointer becomes:

```text
1
```

---

Second Hook:

```jsx
const [name] = useState("Ashu");
```

React returns:

```text
state[1]
```

Pointer becomes:

```text
2
```

---

Third Hook:

```jsx
const [isDark] = useState(false);
```

React returns:

```text
state[2]
```

Pointer becomes:

```text
3
```

---

Before every render, React resets:

```text
Pointer = 0
```

Then reads hooks again in the same order.

---

# Why Hooks Must Always Be Called in the Same Order

Correct:

```jsx
function App() {
  const [count] = useState(0);
  const [name] = useState("Ashu");
  const [isDark] = useState(false);
}
```

Hook order:

```text
0 → count
1 → name
2 → isDark
```

---

Incorrect:

```jsx
function App() {
  const [count] = useState(0);

  if (count > 0) {
    useState("Ashu");
  }

  const [isDark] = useState(false);
}
```

### First Render

```text
0 → count
1 → isDark
```

### Second Render

```text
0 → count
1 → name
2 → isDark
```

The hook order changes.

React can no longer match the stored state with the correct hook.

This is why Hooks cannot be called inside:

- `if`
- `for`
- `while`
- nested functions

---

# `useState` Flow

```text
Component renders
        │
        ▼
React resets Hook Pointer = 0
        │
        ▼
First useState()
        │
        ▼
Return state[0]
        │
        ▼
Pointer++
        │
        ▼
Second useState()
        │
        ▼
Return state[1]
        │
        ▼
Pointer++
        │
        ▼
Third useState()
        │
        ▼
Return state[2]
```

---

# Important Notes

- State is managed by React.
- State is **not** stored inside the component function.
- The initial value is used only on the first render.
- React ignores the initial value on subsequent renders.
- React remembers state between renders.
- React conceptually matches hooks by their order.
- Hook order must never change.

---

# Interview Questions

## Where is state stored?

State is stored internally by React (in the component's Fiber), not inside the component function.

---

## Why doesn't `useState(0)` reset the value on every render?

Because `0` is only used during the first render. React returns the previously stored state on subsequent renders.

---

## Why can't Hooks be called inside conditions?

React associates each Hook with its position (order) during rendering. Changing the order causes React to associate the wrong state with the wrong Hook.

---

## Why do normal variables reset on every render?

Because the component function executes again, creating new local variables every time.

---

# Visual Summary

```text
Component Render
        │
        ▼
useState(initialValue)
        │
        ▼
First Render?
      │
 ┌────┴────┐
 │         │
Yes        No
 │         │
 ▼         ▼
Store      Ignore Initial Value
Initial    Return Stored State
Value
        │
        ▼
Return Current State
        │
        ▼
React Executes Component
```

---

# Key Takeaways

- `useState` stores state outside the component.
- The initial value is used only once.
- React remembers state between renders.
- Hooks are matched by their execution order.
- Hook order must remain the same on every render.
- This is the reason behind the **Rules of Hooks**.
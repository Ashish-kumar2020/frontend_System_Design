# ⚛️ Hooks Internals - Building a Mini Hook System

---

# Why Build a Mini Hook System?

Building a simplified Hook system helps understand how React preserves state across renders.

React's implementation is much more complex, but the core idea is the same.

---

# Naive Implementation

```jsx
function useState(initialValue) {
    let state = initialValue;

    function setState(value) {
        state = value;
    }

    return [state, setState];
}
```

---

# Why Doesn't This Work?

During the first render:

```text
App()

↓

useState(0)

↓

state = 0
```

Everything works.

Suppose:

```jsx
setState(5);
```

Now:

```text
state = 5
```

However, when the component renders again:

```text
App()

↓

useState(0)

↓

let state = initialValue
```

A new local variable is created.

```text
state = 0
```

The previous state is lost.

**Reason:** Local variables do not persist across function executions.

---

# Store State Outside the Function

Instead of storing state inside `useState`, store it outside.

```jsx
let hooks = [];
let currentHook = 0;

function useState(initialValue) {
    if (hooks[currentHook] === undefined) {
        hooks[currentHook] = initialValue;
    }

    const hookIndex = currentHook;

    function setState(newValue) {
        hooks[hookIndex] = newValue;
    }

    const value = hooks[currentHook];

    currentHook++;

    return [value, setState];
}
```

Now the state persists because it is stored outside the function.

---

# First Render

```text
hooks = []

↓

useState(0)

↓

hooks[0] = 0

↓

Return 0
```

Array:

```text
hooks

↓

[0]
```

---

# State Update

```jsx
setState(5);
```

Array becomes:

```text
hooks

↓

[5]
```

---

# Second Render

Before rendering:

```text
currentHook = 0
```

React executes:

```text
useState()

↓

hooks[0]

↓

5
```

The previous state is preserved.

---

# Internal Flow

```text
Render Starts

↓

currentHook = 0

↓

useState()

↓

Read hooks[currentHook]

↓

Return State

↓

currentHook++

↓

Next Hook

↓

Repeat
```

---

# Why Doesn't React Use an Array?

For learning purposes, an array works well.

React uses a **Hook linked list** attached to the component's Fiber because it supports:

- Efficient updates
- Concurrent rendering
- Better memory management
- Multiple render trees

---

# Mini Hook System vs React

### Mini Hook System

```text
hooks[0]

↓

hooks[1]

↓

hooks[2]
```

### React

```text
Fiber

↓

Hook1

↓

Hook2

↓

Hook3
```

The concept is the same.

The data structure is different.

---

# Complete Mental Model

```text
Component Render

↓

Read Hook

↓

Read memoizedState

↓

Return Value

↓

Hook Executes

↓

Move to Next Hook

↓

Repeat Until Render Ends
```

---

# What You've Learned About Hooks

| Hook | `memoizedState` stores |
|------|-------------------------|
| `useState` | Current state value + Update Queue |
| `useEffect` | Effect object (`create`, `destroy`, `deps`, `tag`) |
| `useRef` | `{ current }` |
| `useMemo` | `{ value, deps }` |
| `useCallback` | `{ callback, deps }` |
| Custom Hook | No special Hook object; simply executes built-in Hooks |

---

# Key Takeaways

- Local variables are recreated on every function execution.
- State must be stored outside the component function to persist across renders.
- A simple Hook system can use an array and an index.
- React uses a Hook linked list instead of an array.
- React identifies Hooks by their execution order.
- Every Hook is represented by the same Hook object.
- The only difference between Hooks is what they store in `memoizedState`.

---

# Interview Questions

## Why can't `useState` store state in a local variable?

Local variables are recreated every time the component function executes. To preserve state across renders, React stores Hook data outside the component function.

---

## How does a simplified Hook system preserve state?

A simplified Hook system stores Hook values in an external array and uses an index to associate each Hook call with its stored value.

---

## Why does React use a linked list instead of an array?

A linked list provides greater flexibility for React's Fiber architecture, enabling efficient updates, concurrent rendering, and better memory management while still preserving Hook order.

---

## What is the biggest idea behind React Hooks?

React preserves Hook data outside the component function and associates each Hook call with its stored Hook object based solely on the Hook's execution order.
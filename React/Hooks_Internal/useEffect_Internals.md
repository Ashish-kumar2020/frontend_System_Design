

# ⚛️ Hooks Internals - `useEffect` Internals

---

# What is `useEffect`?

`useEffect` is used to perform **side effects** such as:

- API calls
- Timers
- Event listeners
- Subscriptions
- DOM manipulation

Unlike `useState`, `useEffect` does not store a state value. It stores information required to execute and manage an effect.

---

# What Happens During the First Render?

Consider:

```jsx
function App() {

    useEffect(() => {
        console.log("Mounted");
    }, []);

    return <h1>Hello</h1>;
}
```

When React encounters `useEffect()`, it creates a Hook object.

```text
Fiber
│
▼
memoizedState
│
▼
Hook
```

Instead of storing a primitive value, the Hook's `memoizedState` stores an **Effect object**.

```text
Hook
│
└── memoizedState
      │
      ▼
Effect
├── create    → Effect callback
├── destroy   → Cleanup function (initially null)
├── deps      → Dependency array
├── tag       → Passive Effect
└── next      → Next Effect
```

---

# What Does Each Field Store?

### `create`

Stores the callback passed to `useEffect`.

```jsx
useEffect(() => {
    console.log("Mounted");
}, []);
```

```text
create

↓

() => {
    console.log("Mounted");
}
```

---

### `destroy`

Stores the cleanup function.

Initially:

```text
destroy = null
```

If the effect returns a cleanup function:

```jsx
return () => {
    console.log("Cleanup");
};
```

React stores it in `destroy`.

---

### `deps`

Stores the dependency array.

Example:

```jsx
[count, user]
```

React uses these dependencies on the next render to determine whether the effect should run again.

---

### `tag`

Marks the type of effect.

For `useEffect`, React marks it as a **Passive Effect**, indicating that it should run after the Commit Phase.

---

# Why Doesn't `useEffect` Run Immediately?

During the Render Phase, React **only prepares the effect**.

Flow:

```text
Render Phase

↓

Create Hook

↓

Create Effect Object

↓

Store in Hook.memoizedState

↓

Mark Fiber with Passive Flag

↓

Add Effect to Effect List
```

The callback is **not executed** during rendering.

---

# Commit Phase

After React updates the Real DOM:

```text
Commit Phase

↓

Traverse Effect List

↓

Run create()

↓

Store cleanup() in destroy

↓

Done
```

This is why `useEffect` always runs **after the Commit Phase**.

---

# Why Does `useEffect` Run After Commit?

The Render Phase must remain **pure** and free of side effects.

If `useEffect` ran during rendering:

- The Render Phase would become impure.
- React could execute effects for renders that are later interrupted or discarded.
- Duplicate API calls, subscriptions, or DOM manipulations could occur.
- The UI could become inconsistent.

Running `useEffect` after the Commit Phase ensures the UI is fully committed before executing side effects.

---

# Dependency Comparison

On the **first render**, React has no previous dependencies.

Therefore:

```text
Always Schedule Effect
```

---

On subsequent renders:

```text
Previous deps

↓

Compare

↓

Current deps
```

React compares **each dependency individually** using `Object.is()`.

Example:

```jsx
useEffect(() => {}, [count, name]);
```

Previous:

```text
[5, "Ashu"]
```

Current:

```text
[5, "Ashu"]
```

Comparison:

```text
Object.is(5, 5)

↓

true

Object.is("Ashu", "Ashu")

↓

true
```

All dependencies are equal.

```text
Skip Effect
```

---

If any dependency changes:

```text
Object.is(5, 6)

↓

false
```

React:

```text
Mark Passive Flag

↓

Add Effect to Effect List

↓

Run Effect After Commit
```

---

# Complete Lifecycle

```text
Initial Render

↓

Create Hook

↓

Create Effect Object

↓

Store in Hook.memoizedState

↓

Mark Passive Flag

↓

Add Effect to Effect List

↓

Commit Phase

↓

Run create()

↓

Store cleanup()

────────────────────────────

Next Render

↓

Read Previous Effect

↓

Compare Dependencies (Object.is)

↓

Dependencies Changed?

├── No → Skip Effect
│
└── Yes
      │
      ▼
Mark Passive Flag

↓

Add Effect to Effect List

↓

Commit Phase

↓

Run Cleanup

↓

Run New Effect
```

---

# Key Takeaways

- `useEffect` creates one Hook object.
- The Hook's `memoizedState` stores an Effect object.
- The Effect object stores:
  - `create`
  - `destroy`
  - `deps`
  - `tag`
- On the initial render, React always schedules the effect.
- On subsequent renders, React compares dependencies using `Object.is()`.
- If any dependency changes, React marks the Fiber with the Passive flag and adds the Effect to the Effect List.
- `useEffect` runs only after the Commit Phase.
- Cleanup runs before the next effect execution or when the component unmounts.

---

# Interview Questions

## What does `useEffect` store internally?

`useEffect` stores an Effect object inside the Hook's `memoizedState`. The Effect object contains the callback (`create`), cleanup function (`destroy`), dependency array (`deps`), and effect tag.

---

## Why does `useEffect` run after the Commit Phase?

The Render Phase must remain pure and can be interrupted or discarded. Running side effects after the Commit Phase ensures the DOM has been updated and prevents inconsistent UI, duplicate side effects, and unnecessary work.

---

## How does React decide whether to run an effect again?

On subsequent renders, React compares each dependency in the new dependency array with the previous one using `Object.is()`. If any dependency changes, the effect is scheduled to run after the Commit Phase. If all dependencies are equal, the effect is skipped.

---

## How does cleanup work internally?

If an effect returns a cleanup function, React stores it in the Effect object's `destroy` field. Before running the effect again or when the component unmounts, React executes the stored cleanup function.
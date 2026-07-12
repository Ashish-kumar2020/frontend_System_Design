# ⚛️ React Fiber - Effect Processing (`useEffect`)

---

# Why does `useEffect` run after the Commit Phase?

React divides rendering into two phases:

1. **Render Phase**
2. **Commit Phase**

The Render Phase is a **pure calculation phase**.

The Commit Phase is where React updates the Real DOM and executes side effects.

---

# Why doesn't React execute `useEffect` during rendering?

The Render Phase can be:

- Paused
- Interrupted
- Restarted
- Discarded

If React executed side effects during rendering, it could create inconsistent application behavior.

Example:

```jsx
useEffect(() => {
    fetch("/users");
}, []);
```

Suppose React:

```text
Start Rendering

↓

Execute useEffect()

↓

API Call Starts

↓

Higher Priority Update Arrives

↓

Render Gets Discarded
```

The UI was never committed.

But the API call already happened.

This creates an inconsistent application state.

---

# React's Solution

Instead of executing the effect immediately, React:

```text
useEffect()

↓

Create Effect Information

↓

Store It

↓

Continue Rendering
```

Rendering remains a pure calculation.

---

# Timeline

```text
Render Phase

↓

Execute Component

↓

Encounter useEffect()

↓

Create Effect Information

↓

Store Effect

↓

Continue Rendering

────────────────────────────

Commit Phase

↓

Update Real DOM

↓

Execute Stored Effects
```

---

# Example

```jsx
function App() {
    useEffect(() => {
        console.log("Hello");
    }, []);

    return <h1>Hello</h1>;
}
```

### Render Phase

React executes:

```text
App()

↓

useEffect()

↓

Store Effect

↓

Return React Elements
```

Nothing is executed yet.

---

### Commit Phase

React:

```text
Update Real DOM

↓

Execute Effect
```

Console:

```text
Hello
```

---

# Multiple Effects

Example:

```jsx
function App() {

    useEffect(() => {
        console.log("A");
    }, []);

    useEffect(() => {
        console.log("B");
    }, []);

}
```

### Render Phase

```text
Store Effect A

↓

Store Effect B
```

No effects run.

---

### Commit Phase

```text
Update Real DOM

↓

Run Effect A

↓

Run Effect B
```

Output:

```text
A

B
```

---

# Dependency Array

Example:

```jsx
useEffect(() => {
    fetchData();
}, [userId]);
```

Previous dependencies:

```text
[5]
```

Current dependencies:

```text
[5]
```

React compares them.

No change:

```text
Skip Effect
```

If they become:

```text
Old

[5]

──────────────

New

[10]
```

React schedules the effect to run after the Commit Phase.

---

# Complete Effect Flow

```text
Component Executes
        │
        ▼
useEffect()
        │
        ▼
Create Effect Information
        │
        ▼
Store Effect
        │
        ▼
Continue Rendering
        │
        ▼
Render Phase Finishes
        │
        ▼
Commit Phase
        │
        ├── Update Real DOM
        └── Execute Effects
```

---

# Why does React wait?

React waits because the Render Phase is not guaranteed to finish.

If rendering is discarded:

```text
Render

↓

Discard

↓

No Commit
```

Then:

```text
No Effects Should Run
```

This guarantees that side effects always correspond to the UI that is actually visible to the user.

---

# Relationship with Render & Commit

```text
Render Phase

✔ Execute Components

✔ Read State

✔ Reconciliation

✔ Diffing

✔ Store Effects

❌ Do NOT Execute Effects

────────────────────────────

Commit Phase

✔ Update Real DOM

✔ Execute useEffect

✔ Execute Cleanup Functions

✔ Attach Refs
```

---

# Complete React Flow

```text
setState()
      │
      ▼
Scheduler
      │
      ▼
Render Phase
      │
      ├── Read Hooks
      ├── Process Update Queue
      ├── Create React Elements
      ├── Reconciliation
      ├── Diffing
      └── Collect Effect Information
      │
      ▼
Commit Phase
      │
      ├── Update Real DOM
      ├── Execute useEffect
      ├── Execute Cleanup Functions
      └── Attach Refs
      │
      ▼
Browser Rendering Pipeline
      │
      ├── Style
      ├── Layout
      ├── Paint
      └── Composite
```

---

# Key Takeaways

- `useEffect` does **not** execute during the Render Phase.
- The Render Phase is a **pure calculation phase**.
- React only collects effect information during rendering.
- The Render Phase can be paused, interrupted, restarted, or discarded.
- React executes effects only after the Commit Phase.
- This guarantees that side effects always correspond to the committed UI.
- Multiple effects are collected during rendering and executed after the Real DOM has been updated.
- Dependency arrays determine whether an effect should run again.

---

# Interview Questions

## Why does `useEffect` run after the Commit Phase?

`useEffect` runs after the Commit Phase because the Render Phase must remain a pure calculation phase. During rendering, React may pause, interrupt, restart, or even discard the work before it is committed. If side effects executed during rendering, operations such as API calls, event listeners, or timers could run even though the UI was never displayed. Therefore, React collects effect information during the Render Phase and executes the effects only after the Commit Phase, once the Real DOM has been updated.

---

## Does React execute `useEffect` during rendering?

No.

During the Render Phase, React only collects and stores effect information. The actual effect callbacks execute after the Commit Phase.

---

## What happens if React discards a render?

If a render is discarded before the Commit Phase, its effects are never executed because the corresponding UI was never committed.

---

## What is the role of the dependency array?

The dependency array allows React to determine whether an effect should run again by comparing the current dependencies with those from the previous render.
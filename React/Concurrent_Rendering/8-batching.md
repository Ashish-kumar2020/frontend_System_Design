# ⚛️ Concurrent Rendering - Automatic Batching (React 18)

---

# What is Automatic Batching?

Automatic Batching is a React 18 feature that groups multiple state updates into a **single render**.

Instead of re-rendering after every `setState()`, React waits until all related updates are complete and then performs **one render**.

This reduces unnecessary rendering and improves performance.

---

# Why is Batching Needed?

Consider:

```jsx
setCount(c => c + 1);
setName("Ashu");
```

Without batching:

```text
setCount()

↓

Render

↓

setName()

↓

Render
```

Two renders are performed.

With batching:

```text
setCount()

↓

setName()

↓

Single Render
```

React updates both states together.

---

# Before React 18

Automatic batching only worked inside **React event handlers**.

Example:

```jsx
function handleClick() {
    setCount(c => c + 1);
    setName("Ashu");
}
```

Flow:

```text
Click Event

↓

setCount()

↓

setName()

↓

Single Render
```

This was already optimized.

---

# Limitation Before React 18

Batching **did not** work inside asynchronous callbacks.

Example:

```jsx
setTimeout(() => {
    setCount(c => c + 1);
    setName("Ashu");
}, 1000);
```

Before React 18:

```text
setCount()

↓

Render

↓

setName()

↓

Render
```

Two renders occurred.

The same problem existed with:

- Promises
- `async/await`
- Native event listeners

---

# React 18 Automatic Batching

React 18 automatically batches updates from many asynchronous sources.

Example:

```jsx
setTimeout(() => {
    setCount(c => c + 1);
    setName("Ashu");
}, 1000);
```

Flow:

```text
setCount()

↓

setName()

↓

Automatic Batch

↓

Single Render
```

Only one render occurs.

---

# Automatic Batching Works In

✅ React event handlers

```jsx
onClick={() => {
    setCount(c => c + 1);
    setName("Ashu");
}}
```

---

✅ `setTimeout`

```jsx
setTimeout(() => {
    setCount(c => c + 1);
    setName("Ashu");
});
```

---

✅ Promises

```jsx
fetch("/api").then(() => {
    setCount(c => c + 1);
    setName("Ashu");
});
```

---

✅ `async/await`

```jsx
async function loadData() {
    await fetch("/api");

    setCount(c => c + 1);
    setName("Ashu");
}
```

---

✅ Native Event Listeners

```jsx
window.addEventListener("click", () => {
    setCount(c => c + 1);
    setName("Ashu");
});
```

---

# Before vs React 18

| Source | Before React 18 | React 18 |
|----------|-----------------|----------|
| React Event Handler | ✅ Batched | ✅ Batched |
| `setTimeout` | ❌ Not Batched | ✅ Batched |
| Promise (`then`) | ❌ Not Batched | ✅ Batched |
| `async/await` | ❌ Not Batched | ✅ Batched |
| Native Events | ❌ Not Batched | ✅ Batched |

---

# Complete Flow

```text
Multiple setState()

↓

React Collects Updates

↓

Automatic Batch

↓

Single Render

↓

Commit Phase

↓

Update Real DOM
```

---

# Why is Automatic Batching Important?

Without batching:

```text
setState()

↓

Render

↓

setState()

↓

Render
```

More renders mean:

- More reconciliation
- More diffing
- More rendering work
- Lower performance

---

With batching:

```text
setState()

↓

setState()

↓

Single Render
```

Less work is performed.

---

# Key Takeaways

- Automatic Batching groups multiple state updates into a single render.
- React 18 extends batching beyond React event handlers.
- Updates inside `setTimeout`, Promises, `async/await`, and native event listeners are automatically batched.
- Fewer renders improve application performance.
- Automatic Batching reduces unnecessary reconciliation and diffing.

---

# Interview Questions

## What is Automatic Batching?

Automatic Batching is a React 18 feature that groups multiple state updates into a single render, reducing unnecessary renders and improving performance.

---

## What changed in React 18 regarding batching?

Before React 18, automatic batching only worked inside React event handlers. In React 18, batching also works for updates inside `setTimeout`, Promises, `async/await`, and native event listeners.

---

## Why is Automatic Batching beneficial?

It reduces the number of renders, which means React performs reconciliation, diffing, and DOM updates fewer times, resulting in better performance.
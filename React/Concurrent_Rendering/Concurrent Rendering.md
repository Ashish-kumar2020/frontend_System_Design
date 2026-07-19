# 🚀 Module 11 - Concurrent React (Interview Revision Notes)

---

# Why Concurrent React?

## Problem with Legacy React

- Rendering was **synchronous**.
- Once the Render Phase started, React **couldn't pause**.
- Large renders blocked user interactions.
- UI became laggy.

### Legacy Flow

```text
setState()
      ↓
Scheduler
      ↓
Render Starts
      ↓
Must Finish ❌
      ↓
Commit
```

---

## Concurrent React

Concurrent React allows React to:

- Pause Rendering
- Resume Rendering
- Restart Rendering
- Prioritize Updates

> **Concurrent React does NOT make React faster.**
>
> It makes React **more responsive**.

---

# Current Tree vs Work In Progress Tree

```text
Current Tree (Visible UI)
          ↓
       Clone
          ↓
Work In Progress Tree
          ↓
       Render
          ↓
       Commit
          ↓
     Swap Trees
```

- Current Tree = UI visible to the user.
- WIP Tree = Tree React is currently building.
- UI never changes until Commit Phase.

---

# What Happens When High Priority Update Arrives?

```text
Rendering WIP
      ↓
High Priority Update
      ↓
Pause Current Work
      ↓
Process High Priority Update
      ↓
Resume OR Restart Previous Work
      ↓
Commit
```

React can safely discard unfinished work because the **Current Tree is still displayed**.

---

# Automatic Batching

## React 17

Only React event handlers were batched.

```jsx
onClick(() => {
    setA();
    setB();
});
```

✅ 1 Render

```jsx
setTimeout(() => {
    setA();
    setB();
});
```

❌ 2 Renders

---

## React 18

Everything is automatically batched.

Works inside:

- React Events ✅
- setTimeout ✅
- Promise.then() ✅
- fetch().then() ✅
- Native Events ✅

---

# When Does React Flush Updates?

React batches updates during the **same JavaScript execution context**.

```text
Current Callback
        ↓
Collect Updates
        ↓
Callback Ends
        ↓
Flush Queue
        ↓
Render
```

---

# What Breaks Automatic Batching?

```jsx
setCount();

await fetch(...);

setUser();
```

`await` creates a **new execution context**.

Result:

```text
Batch 1
   ↓
Render

---------

Batch 2
   ↓
Render
```

---

# Lanes (Priority System)

**Lane = Priority attached to an Update.**

React schedules **priorities**, not updates.

```text
setState()
      ↓
Create Update
      ↓
Assign Lane
      ↓
Scheduler
      ↓
Highest Priority First
```

---

## Example

```text
Typing
   ↓
High Priority

-----------------

Dashboard Rendering
        ↓
Low Priority
```

Typing always wins.

---

# Scheduler

Scheduler reads the lane.

```text
Sync Lane
    >
Input Lane
    >
Default Lane
    >
Transition Lane
```

Higher priority interrupts lower priority.

---

# Interruptible Rendering

## Legacy React

```text
Render
   ↓
Finish
```

---

## Concurrent React

```text
Render
   ↓
Pause
   ↓
Resume
   ↓
Restart
   ↓
Commit
```

---

# Can React Reuse Previous Work?

React **does NOT reuse the entire WIP Tree.**

It reuses **valid Fiber subtrees**.

Example:

```text
Header        ✅ Reuse

Sidebar       ✅ Reuse

ProductList   ❌ Re-render

Footer        ✅ Reuse
```

React checks:

- Props
- State
- Context
- Lane Priority

Only affected subtrees are re-rendered.

---

# startTransition()

Purpose:

Marks updates as **non-urgent**.

```jsx
startTransition(() => {
    setProducts(...);
});
```

Internally:

```text
Update
   ↓
Transition Lane
   ↓
Low Priority
```

> **Does NOT make rendering faster.**
>
> It changes the **priority**.

---

## Use Cases

✅ Search Results

✅ Charts

✅ Large Lists

✅ Dashboards

Do NOT use for:

❌ Typing

❌ Button Clicks

❌ Checkbox State

---

# useTransition()

```jsx
const [isPending, startTransition] = useTransition();
```

Returns:

- startTransition()
- isPending

---

## isPending

Tracks whether a **Transition** is still rendering.

It is **NOT**:

- API Loading
- Network Request
- Fetch Status

Example:

```jsx
{isPending && <Spinner />}
```

React doesn't show the loader automatically.

You decide what to render.

---

# startTransition vs useTransition

## startTransition()

Changes update priority.

---

## useTransition()

Returns:

- startTransition()
- isPending

---

# useDeferredValue()

Creates a deferred version of a value.

```jsx
const deferredQuery = useDeferredValue(query);
```

Think:

```text
query
   ↓
Latest Value

-----------------

deferredQuery
      ↓
May Lag Behind
```

---

## Example

```jsx
<input value={query} />

<ProductList query={deferredQuery} />
```

### User Types

```text
Input

A
↓

AB
↓

ABC
```

Updates immediately.

---

### Product List

```text
A

↓

(wait...)

↓

AB

↓

(wait...)

↓

ABC
```

Allowed to lag behind.

---

# Important

Input uses:

```jsx
query
```

Expensive component uses:

```jsx
deferredQuery
```

The input NEVER lags.

Only expensive rendering lags.

---

# When to use useDeferredValue?

When you **don't control the state update**.

Example:

```jsx
const deferredQuery = useDeferredValue(query);
```

instead of

```jsx
startTransition(...)
```

---

# startTransition vs useDeferredValue

## startTransition

You control the update.

```jsx
startTransition(() => {
    setProducts(...);
});
```

---

## useDeferredValue

You only have a value.

```jsx
const deferredQuery = useDeferredValue(query);
```

React creates a deferred version automatically.

---

# Complete Concurrent React Flow

```text
User Action
      ↓
setState()
      ↓
Create Update Object
      ↓
Assign Lane
      ↓
Append To Update Queue
      ↓
Scheduler Reads Lanes
      ↓
Highest Priority Selected
      ↓
Clone Current Tree
      ↓
Create WIP Tree
      ↓
Render Phase
      ↓
Can Pause?
      ↓
Higher Priority Update?
      ↓
YES
      ↓
Pause Current Work
      ↓
Process High Priority Update
      ↓
Resume OR Restart Previous Work
      ↓
Commit
      ↓
Swap Current ↔ WIP
      ↓
Browser Paint
```

---

# Interview One-Liners

### Concurrent React

> Makes React **more responsive**, not faster.

---

### Automatic Batching

> React batches updates within the **same JavaScript execution context**.

---

### Lane

> A Lane is the priority assigned to an update.

---

### startTransition

> Marks updates as **Transition Lane (low-priority)** updates.

---

### useTransition

> Returns **startTransition() + isPending**.

---

### isPending

> Tracks **transition rendering**, not API loading.

---

### useDeferredValue

> Returns a deferred version of a value so **expensive UI can lag while urgent UI stays responsive.**

---

# 🔥 Golden Mental Model

```text
User Action
      ↓
setState()
      ↓
Create Update
      ↓
Assign Lane
      ↓
Scheduler
      ↓
Highest Priority
      ↓
Create WIP Tree
      ↓
Render
      ↓
Pause if Needed
      ↓
Resume / Restart
      ↓
Commit
      ↓
Browser Paint
```
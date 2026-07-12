# ⚛️ React Fiber - Lanes

---

# What are Lanes?

Lanes are React's **priority system**.

Every update is assigned a Lane, which tells React **how important that update is** and **when it should be processed**.

Instead of treating every update equally, React processes higher-priority updates before lower-priority ones.

---

# Why were Lanes introduced?

Imagine an application:

```jsx
function App() {
    const [text, setText] = useState("");
    const [products, setProducts] = useState([]);
}
```

Suppose two updates happen almost at the same time:

```jsx
setText("H");
```

and

```jsx
setProducts(bigArray);
```

Without priorities, React would process updates in the order they arrived.

```text
Render 10,000 Products

↓

Update Input
```

The user would experience input lag because rendering the large list blocks the text update.

---

# React's Solution

React assigns a priority (Lane) to every update.

Example:

```text
setText("H")

↓

High Priority Lane
```

```text
setProducts(bigArray)

↓

Low Priority Lane
```

The Scheduler then processes the higher-priority work first.

---

# Relationship with Scheduler

When an update occurs:

```text
setState()

↓

Assign Lane

↓

Scheduler

↓

Pick Highest Priority Lane

↓

Start Rendering
```

The Scheduler does not randomly choose work.

It always selects the highest-priority lane that is ready to run.

---

# Highway Analogy

Think of Lanes like lanes on a highway.

```text
🚑 Ambulance

🚗 Car

🚛 Truck
```

The ambulance gets priority.

Similarly, React gives urgent user interactions higher priority than background work.

---

# Common Examples

| Update | Typical Priority |
|---------|------------------|
| Typing in an input | High |
| Button click | High |
| Checkbox toggle | High |
| Rendering a large list | Lower |
| Background rendering | Lower |
| Prefetching work | Very Low |

> Note: React's internal lane values are implementation details and may change. The important concept is that updates are grouped by priority.

---

# How Lanes Enable Concurrent Rendering

Suppose React is rendering:

```text
10,000 Products
```

Halfway through rendering:

```text
User types "A"
```

Without Lanes:

```text
Finish Rendering Products

↓

Update Input
```

The UI feels slow.

---

With Lanes:

```text
Render Products

↓

High Priority Input Arrives

↓

Pause Product Rendering

↓

Update Input

↓

Resume Product Rendering
```

The application remains responsive.

---

# Relationship with the Render Phase

The Render Phase is interruptible.

```text
Render

↓

Higher Priority Update Arrives

↓

Pause Current Work

↓

Process High Priority Work

↓

Resume Previous Work
```

Lanes tell React **which work should interrupt other work**.

---

# Relationship with useEffect

`useEffect` is considered **passive work**.

Timeline:

```text
Render Phase

↓

Commit Phase

↓

Update Real DOM

↓

Browser Paint

↓

Run useEffect
```

React does not allow `useEffect` to block rendering or painting.

This keeps the UI responsive while non-critical side effects execute afterward.

---

# useLayoutEffect vs useEffect

```text
Commit Phase

↓

Update Real DOM

↓

useLayoutEffect

↓

Browser Paint

↓

useEffect
```

- `useLayoutEffect` runs **before** the browser paints.
- `useEffect` runs **after** the browser has had a chance to paint.

---

# Complete Rendering Flow

```text
User Action
      │
      ▼
setState()
      │
      ▼
Create Update Object
      │
      ▼
Store in Hook Queue
      │
      ▼
Assign Lane
      │
      ▼
Scheduler
      │
      ▼
Pick Highest Priority Lane
      │
      ▼
Render Phase
      │
      ├── Process Update Queue
      ├── Read Hooks
      ├── Call Components
      ├── Reconciliation
      ├── Diffing
      ├── Mark Flags
      └── Collect Effects
      │
      ▼
Commit Phase
      │
      ├── Read Flags
      ├── Update Real DOM
      ├── Attach Refs
      └── Schedule Passive Effects
      │
      ▼
Browser
      │
      ├── Style
      ├── Layout
      ├── Paint
      └── Composite
      │
      ▼
Run useEffect
```

---

# Key Takeaways

- Lanes are React's priority system.
- Every update is assigned a Lane.
- The Scheduler always chooses the highest-priority lane to process first.
- Lanes allow urgent user interactions to remain responsive.
- The Render Phase can be interrupted to process higher-priority work.
- `useEffect` is passive work and runs after the Commit Phase.
- `useLayoutEffect` runs after the DOM update but before the browser paints.

---

# Interview Questions

## What are Lanes in React?

Lanes are React's priority system. Every update is assigned a Lane, allowing the Scheduler to determine which updates should be processed first.

---

## Why were Lanes introduced?

Lanes allow React to prioritize urgent updates, such as user input, over less urgent work like rendering large lists or background updates, improving application responsiveness.

---

## How do Lanes work with the Scheduler?

When `setState()` is called, React assigns a Lane to the update. The Scheduler then selects the highest-priority lane and begins rendering that work.

---

## How do Lanes enable Concurrent Rendering?

Because updates have priorities, React can pause lower-priority rendering, process a higher-priority update, and later resume the interrupted work. This keeps the UI responsive during expensive renders.

---

## Does `useEffect` have high priority?

No. `useEffect` is passive work. React schedules it after the Commit Phase so it does not block rendering or browser painting.
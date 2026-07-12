# ⚛️ React Scheduler

---

# Why was the Scheduler introduced?

Before React Fiber, rendering was **synchronous**.

Once React started rendering a large component tree, it had to finish the entire render before handling any new updates.

Example:

```text
Large Dashboard Render

↓

User Click

↓

User waits until rendering finishes
```

This could make the UI feel slow and unresponsive.

React needed a way to prioritize urgent updates.

---

# What is the React Scheduler?

The **Scheduler** is responsible for deciding:

- Which update should React work on next?
- Which update is more important?
- Which updates can wait?
- When should React pause rendering?
- When should React resume rendering?

The Scheduler **does not**:

- Render components ❌
- Update the Real DOM ❌
- Compare Virtual DOM trees ❌

Its only responsibility is **scheduling work**.

---

# React Rendering Pipeline

```text
State Update
      │
      ▼
Scheduler
      │
      ▼
Assign Priority
      │
      ▼
Render Phase
      │
      ▼
Commit Phase
      │
      ▼
Update Real DOM
      │
      ▼
Browser Paint
```

The Scheduler always runs **before** the Render Phase.

---

# Real World Analogy

Imagine a company manager.

Tasks arrive:

```text
Task 1

Update Dashboard

────────────────────

Task 2

User Clicked Logout

────────────────────

Task 3

Update Analytics
```

The manager does not simply execute tasks in arrival order.

Instead:

```text
Logout

↓

Dashboard

↓

Analytics
```

The manager prioritizes urgent work.

The Scheduler behaves the same way.

---

# Another Analogy

Supermarket Checkout

Customer 1

```text
100 Items
```

Customer 2

```text
1 Item
```

Instead of making Customer 2 wait, the store provides an express lane.

The Scheduler is React's express lane.

---

# Scheduler Priority (Conceptual)

Conceptually React treats updates differently.

```text
Highest Priority

↓

User Typing

────────────────────

High Priority

↓

Button Click

────────────────────

Normal Priority

↓

State Updates

────────────────────

Low Priority

↓

Background Rendering
```

The Scheduler always prefers urgent updates.

> Note: These are conceptual categories to understand scheduling. We'll learn the actual priority model when studying Fiber and concurrent features.

---

# Example

Suppose React is rendering:

```text
Dashboard

↓

Charts

↓

Reports
```

While rendering:

```text
User Types
```

The Scheduler decides:

```text
Pause Dashboard Rendering

↓

Render Input Update

↓

Commit Input Update

↓

Resume Dashboard Rendering
```

The user experiences a responsive application.

---

# The Scheduler Works Only During the Render Phase

The Scheduler can control:

```text
Render Phase

↓

Pause

↓

Resume

↓

Restart

↓

Discard
```

The Scheduler cannot interrupt:

```text
Commit Phase
```

Once React starts updating the Real DOM, the Commit Phase must complete.

---

# Can the Scheduler Pause Rendering?

Yes.

```text
Render Started

↓

Pause

↓

Handle High Priority Update

↓

Resume Rendering
```

This is possible because the Render Phase only performs calculations in memory.

---

# Can the Scheduler Interrupt the Commit Phase?

No.

Once React starts modifying the Real DOM:

```text
Commit Started

↓

Update Real DOM

↓

Browser Uses Updated DOM
```

Stopping halfway would produce an inconsistent UI.

---

# What Happens if a New Update Arrives?

Suppose React is rendering:

```text
Render 1
```

Halfway through:

```text
Render 2 arrives
```

React may do:

```text
Discard Render 1

↓

Start Render 2
```

instead of:

```text
Finish Render 1

↓

Start Render 2
```

Why?

Because Render 1 never reached the Commit Phase.

Nothing has been shown to the user.

---

# Example

Initial State

```jsx
count = 0
```

React starts rendering:

```text
Render

count = 0
```

Before rendering finishes:

```jsx
setCount(1)
```

arrives.

Instead of finishing:

```text
count = 0
```

React discards that render.

New Flow:

```text
Discard Old Render

↓

Start New Render

↓

count = 1

↓

Commit
```

React prefers rendering the latest state instead of committing stale work.

---

# Why Can React Discard a Render?

Because during the Render Phase:

- The Real DOM has not changed.
- Nothing has been painted.
- Everything exists only in memory.

Therefore React can safely:

- Pause
- Resume
- Restart
- Discard

without affecting the user.

---

# Render Phase vs Commit Phase

Render Phase

```text
Can Pause ✅

Can Resume ✅

Can Restart ✅

Can Discard ✅
```

Commit Phase

```text
Cannot Pause ❌

Cannot Resume ❌

Cannot Restart ❌

Must Finish Completely ✅
```

---

# Complete Scheduling Flow

```text
State Update
      │
      ▼
Scheduler
      │
      ▼
Choose Priority
      │
      ▼
Render Phase
      │
      ├── Pause
      ├── Resume
      ├── Restart
      └── Discard
      │
      ▼
Commit Phase
      │
      ▼
Update Real DOM
      │
      ▼
Browser Rendering Pipeline
      │
      ▼
Updated UI
```

---

# Relationship Between Scheduler & Render Phase

The Scheduler decides:

```text
When to Start Rendering

When to Pause Rendering

When to Resume Rendering

When to Restart Rendering

Which Update to Render First
```

The Render Phase performs the calculations.

The Scheduler does not perform rendering itself.

---

# Why the Scheduler Exists

Without the Scheduler:

```text
Render Everything

↓

Handle User Input
```

The application becomes unresponsive.

With the Scheduler:

```text
Render

↓

Pause

↓

Handle Urgent Update

↓

Resume Rendering

↓

Commit
```

The application remains responsive.

---

# Important Notes

- The Scheduler only schedules work.
- The Scheduler does not update the Real DOM.
- The Scheduler only affects the Render Phase.
- The Scheduler cannot interrupt the Commit Phase.
- React may discard an unfinished render if a newer, more important update arrives.
- React always tries to commit the latest UI instead of outdated work.

---

# Interview Questions

## What is the React Scheduler?

The Scheduler is responsible for deciding which updates React should process first, assigning priorities, and determining when rendering should start, pause, resume, or restart.

---

## Does the Scheduler render components?

No.

Rendering is performed during the Render Phase.

The Scheduler only decides when and in what order rendering should occur.

---

## Can the Scheduler interrupt the Commit Phase?

No.

Once React begins updating the Real DOM, the Commit Phase must complete to avoid an inconsistent UI.

---

## Why can React discard a render?

Because during the Render Phase all work exists only in memory. Since no Real DOM updates have occurred, React can safely throw away the current render and start a newer one.

---

## Why was the Scheduler introduced?

To keep applications responsive by allowing urgent updates (such as typing or button clicks) to be processed before less important rendering work.

---

# Key Takeaways

- The Scheduler decides **what to render next**, not **how to render**.
- It assigns priorities to updates.
- It can pause, resume, restart, or discard the Render Phase.
- It cannot interrupt the Commit Phase.
- The Scheduler keeps React applications responsive by prioritizing urgent user interactions.
- React prefers committing the latest completed render instead of outdated work.
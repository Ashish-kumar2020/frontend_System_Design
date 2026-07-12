# ⚛️ Concurrent Rendering - What is Concurrent Rendering?

---

# What is Concurrent Rendering?

Concurrent Rendering is React's ability to **pause, interrupt, and later resume the Render Phase** based on update priorities.

Instead of blocking the main thread until rendering is complete, React performs rendering in small chunks, yields control back to the browser so it can process user interactions, and then resumes rendering from where it left off.

The goal of Concurrent Rendering is **not to make rendering faster**, but to make applications **more responsive**.

---

# Before Concurrent Rendering

Before React 18, rendering behaved like this:

```text
Start Rendering

↓

Continue Rendering

↓

Finish Rendering

↓

Commit

↓

Update UI
```

Once React started rendering, it continued until all work was finished.

If rendering took a long time, the browser could not respond to user interactions.

---

# Example

Suppose React is rendering:

```text
20,000 Products
```

While rendering:

```text
User Clicks Button
```

Without Concurrent Rendering:

```text
Render 20,000 Products

↓

Finish Rendering

↓

Process Button Click
```

The button click must wait.

The application appears frozen.

---

# With Concurrent Rendering

React performs rendering in smaller chunks.

```text
Render Some Components

↓

Pause

↓

Browser Handles Events

↓

Resume Rendering

↓

Pause Again

↓

Browser Handles Input

↓

Resume Rendering

↓

Commit
```

The browser stays responsive while React continues rendering.

---

# Concurrent vs Parallel

Concurrent Rendering is **not** parallel rendering.

## Parallel

```text
CPU Core 1

↓

Render

──────────────────

CPU Core 2

↓

Render
```

Two tasks execute at the same time.

---

## Concurrent

```text
Render

↓

Pause

↓

Browser Work

↓

Resume Render

↓

Pause

↓

Browser Work

↓

Resume Render
```

Only one task runs at a time.

React simply switches between rendering and browser work.

JavaScript still runs on a single main thread.

---

# Why is Fiber Required?

Concurrent Rendering is possible because of the Fiber architecture.

Before Fiber:

```text
Component

↓

Child

↓

Child

↓

Finish
```

Rendering relied on the JavaScript Call Stack.

Once rendering started, it could not pause and later continue.

---

With Fiber:

```text
Fiber 1

↓

Fiber 2

↓

Fiber 3

↓

Pause

↓

Resume at Fiber 4
```

Every component has its own Fiber Node stored in heap memory.

React can pause after processing some Fiber Nodes and later continue from the next Fiber.

---

# Work-In-Progress Tree

Suppose React is rendering:

```text
100,000 Products
```

After rendering:

```text
30,000 Products
```

React pauses.

The Work-In-Progress Tree already contains the completed work.

```text
Product 1        ✅

Product 2        ✅

...

Product 30,000   ✅

Product 30,001   ⏸

...

Product 100,000
```

When React resumes:

```text
Continue from

↓

Product 30,001
```

React does not start from Product 1 again.

---

# Relationship with Scheduler

When an update occurs:

```text
setState()

↓

Create Update

↓

Assign Lane

↓

Scheduler

↓

Start Rendering

↓

Process Some Fiber Nodes

↓

Yield to Browser

↓

Resume Rendering

↓

Commit
```

The Scheduler decides when React should pause and resume work.

---

# Why is Concurrent Rendering Better?

Without Concurrent Rendering:

```text
Typing

↓

Wait

↓

Render Completes

↓

Input Appears
```

With Concurrent Rendering:

```text
Typing

↓

Pause Rendering

↓

Update Input

↓

Resume Rendering
```

The application feels smooth and responsive.

---

# Important Clarification

Concurrent Rendering **does not make React faster**.

Sometimes rendering may even take slightly longer because React pauses and resumes work.

Its goal is to improve **responsiveness**, not raw rendering speed.

---

# Complete Flow

```text
setState()
      │
      ▼
Create Update
      │
      ▼
Assign Lane
      │
      ▼
Scheduler
      │
      ▼
Start Render
      │
      ▼
Process Some Fiber Nodes
      │
      ▼
Yield to Browser
      │
      ▼
Browser Handles Events
      │
      ▼
Resume Rendering
      │
      ▼
Repeat Until Complete
      │
      ▼
Commit Phase
      │
      ▼
Update Real DOM
```

---

# Key Takeaways

- Concurrent Rendering allows React to pause, interrupt, and later resume rendering.
- Rendering is performed in small chunks instead of blocking the main thread.
- React yields control to the browser so it can process user interactions.
- Concurrent Rendering improves responsiveness, not rendering speed.
- JavaScript still runs on a single thread; Concurrent Rendering is not parallel rendering.
- Fiber makes Concurrent Rendering possible because rendering progress is stored in the Work-In-Progress Fiber Tree.
- When rendering resumes, React continues from where it paused instead of starting over.

---

# Interview Questions

## What is Concurrent Rendering?

Concurrent Rendering is React's ability to pause, interrupt, and later resume the Render Phase based on update priorities. React renders work in small chunks, yields control to the browser for user interactions, and then continues rendering from where it left off using the Work-In-Progress Fiber Tree.

---

## Is Concurrent Rendering the same as parallel rendering?

No.

Concurrent Rendering does not execute multiple renders simultaneously. JavaScript still runs on a single thread. React improves responsiveness by pausing and resuming rendering, not by running work in parallel.

---

## Why is Fiber necessary for Concurrent Rendering?

Fiber stores rendering progress in the Work-In-Progress Fiber Tree. This allows React to pause rendering and later resume from the same point instead of restarting from the beginning.

---

## Does Concurrent Rendering make React faster?

Not necessarily.

Concurrent Rendering improves application responsiveness by allowing urgent user interactions to be processed without waiting for long-running renders to complete.
# ⚛️ Concurrent Rendering - Time Slicing

---

# What is Time Slicing?

Time Slicing is the technique React uses to break the **Render Phase** into small chunks of work.

Instead of rendering an entire update in one long operation, React performs some rendering work, pauses, gives control back to the browser, and then resumes rendering later.

The goal is to keep the application responsive while rendering expensive updates.

---

# Why is Time Slicing Needed?

Suppose React needs to render:

```text
100,000 Products
```

Without Time Slicing:

```text
Start Rendering

↓

Render 100,000 Products

↓

Finish Rendering

↓

Commit

↓

Browser Handles User Events
```

The browser must wait until rendering finishes.

The UI feels frozen.

---

# With Time Slicing

React splits rendering into smaller chunks.

```text
Render Some Components

↓

Pause

↓

Browser Handles Events

↓

Resume Rendering

↓

Pause

↓

Browser Handles Input

↓

Resume Rendering

↓

Finish Render

↓

Commit
```

The browser remains responsive while React continues rendering.

---

# How Time Slicing Works

React processes a group of Fiber Nodes.

```text
Fiber 1

↓

Fiber 2

↓

Fiber 3

↓

Fiber 4

↓

Fiber 5
```

After working for a short period, React checks whether it should continue rendering or yield control back to the browser.

Conceptually:

```text
Work for a Short Time

↓

Time Budget Reached?

↓

Yes

↓

Yield to Browser

↓

Resume Later
```

The exact time budget is an implementation detail and may change between React versions.

---

# Relationship with Fiber

Time Slicing is possible because of the Fiber architecture.

Each component is represented by a Fiber Node stored in heap memory.

This allows React to pause rendering and later continue from the same Fiber Node instead of restarting the entire render.

Example:

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

---

# Render Phase vs Commit Phase

Time Slicing only affects the **Render Phase**.

The Commit Phase is never split.

### Render Phase

```text
Render

↓

Pause

↓

Resume

↓

Pause

↓

Resume

↓

Finish Rendering
```

---

### Commit Phase

```text
Commit

↓

Update Real DOM

↓

Run Layout Effects

↓

Browser Paint

↓

Run useEffect
```

The Commit Phase happens once after the entire Render Phase completes.

---

# Important Clarification

React does **not** commit partially rendered UI.

Incorrect:

```text
Render 500 Components

↓

Commit

↓

Render Next 500

↓

Commit
```

Correct:

```text
Render 500 Components

↓

Pause

↓

Resume

↓

Render Remaining Components

↓

Render Complete

↓

Single Commit
```

The Real DOM is updated only once.

---

# Why Doesn't React Commit Partial UI?

Suppose React committed halfway.

The user could see:

```text
Old UI

+

New UI
```

This would create an inconsistent interface.

Instead, React guarantees that the user always sees either:

```text
Old UI
```

or

```text
New UI
```

Never a mixture of both.

---

# Relationship with Concurrent Rendering

```text
Concurrent Rendering

↓

Allows React to pause and resume rendering

────────────────────────

Time Slicing

↓

Technique used to split rendering into small chunks
```

Concurrent Rendering is the overall capability.

Time Slicing is one of the techniques that enables it.

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
Render Phase
      │
      ├── Process Some Fiber Nodes
      ├── Yield to Browser
      ├── Resume Rendering
      ├── Repeat Until Complete
      └── Finish Work-In-Progress Tree
      │
      ▼
Commit Phase
      │
      ├── Read Flags
      ├── Update Real DOM
      ├── Run Layout Effects
      └── Schedule useEffect
      │
      ▼
Browser Paint
      │
      ▼
Run useEffect
```

---

# Key Takeaways

- Time Slicing breaks the Render Phase into small chunks.
- React periodically yields control back to the browser to keep the UI responsive.
- Time Slicing is possible because rendering progress is stored in the Work-In-Progress Fiber Tree.
- React resumes rendering from where it paused instead of restarting.
- Time Slicing affects only the Render Phase.
- The Commit Phase is synchronous and is never interrupted.
- React never commits partially rendered UI.
- The Real DOM is updated only after the entire Render Phase completes.

---

# Interview Questions

## What is Time Slicing?

Time Slicing is the technique React uses to divide the Render Phase into smaller chunks of work. React periodically pauses rendering, allows the browser to process user interactions, and then resumes rendering from where it left off.

---

## Does Time Slicing split the Commit Phase?

No.

Time Slicing only affects the Render Phase. The Commit Phase remains synchronous and updates the Real DOM only after the entire render is complete.

---

## Why doesn't React commit partially rendered UI?

Committing partial UI could leave the application in an inconsistent state where some parts of the interface are updated while others are not. React waits until the entire Work-In-Progress tree is complete and then commits all changes atomically.

---

## Why is Fiber required for Time Slicing?

Fiber stores rendering progress in the Work-In-Progress Fiber Tree, allowing React to pause rendering and later resume from the same point instead of starting over.
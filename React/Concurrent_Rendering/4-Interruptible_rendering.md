# ⚛️ Concurrent Rendering - Interruptible Rendering

---

# What is Interruptible Rendering?

Interruptible Rendering is React's ability to **pause, resume, restart, or discard the Render Phase** without affecting the UI.

This is possible because React performs rendering on the **Work-In-Progress (WIP) Fiber Tree**, while the user continues to see the **Current Fiber Tree**.

---

# Why can the Render Phase be interrupted?

During the Render Phase, React is only calculating the next UI.

It performs operations such as:

- Processing the update queue
- Reading Hooks
- Calling components
- Reconciliation
- Diffing
- Marking Flags
- Collecting Effects
- Building the Work-In-Progress Tree

At this stage, **the Real DOM has not been modified**.

Example:

```text
Current Tree

count = 0

────────────────────────

WIP Tree

count = 1
```

If React pauses rendering:

```text
Render

↓

Pause
```

The user still sees:

```text
count = 0
```

The visible UI remains consistent because only the WIP Tree is being updated.

---

# What can React do during the Render Phase?

The Render Phase is flexible.

React can:

```text
Render

↓

Pause

↓

Resume

↓

Restart

↓

Discard
```

Since no DOM changes have occurred yet, React can safely interrupt or abandon the work.

---

# Why can't the Commit Phase be interrupted?

The Commit Phase modifies the **Real DOM**.

Suppose React updates:

```text
Header

↓

Updated ✅

────────────────

Sidebar

↓

Updated ✅

────────────────

Content

↓

Old ❌
```

If React paused here, the user would see:

```text
Half New UI

+

Half Old UI
```

This would leave the application in an inconsistent state.

---

# React's Solution

The Commit Phase is **atomic**.

React either:

```text
Commit Everything
```

or

```text
Do Not Commit
```

It never commits only part of the UI.

---

# Render vs Commit

## Render Phase

```text
Process Update Queue

↓

Read Hooks

↓

Call Components

↓

Reconciliation

↓

Diffing

↓

Mark Flags

↓

Collect Effects

↓

Build WIP Tree
```

Characteristics:

- Pure calculation phase
- Does not modify the Real DOM
- Can pause
- Can resume
- Can restart
- Can discard

---

## Commit Phase

```text
Swap WIP Tree

↓

Update Real DOM

↓

Attach Refs

↓

Run Layout Effects

↓

Browser Paint

↓

Run useEffect
```

Characteristics:

- Updates the Real DOM
- Atomic
- Cannot pause
- Cannot restart
- Cannot be interrupted

---

# Why does React maintain two trees?

React keeps:

```text
Current Tree

↓

Visible UI

────────────────────────

Work-In-Progress Tree

↓

Future UI
```

React performs all calculations on the WIP Tree.

Only after the WIP Tree is completely built does React swap it with the Current Tree during the Commit Phase.

This guarantees that the user always sees a complete and consistent UI.

---

# Complete Rendering Flow

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
      ├── Process Update Queue
      ├── Read Hooks
      ├── Call Components
      ├── Reconciliation
      ├── Diffing
      ├── Mark Flags
      ├── Collect Effects
      └── Build WIP Tree
             │
             ├── Pause ✅
             ├── Resume ✅
             ├── Restart ✅
             └── Discard ✅
      │
      ▼
Commit Phase
      │
      ├── Swap WIP ↔ Current
      ├── Update Real DOM
      ├── Attach Refs
      └── Run Layout Effects
             │
             ├── Cannot Pause ❌
             ├── Cannot Restart ❌
             └── Cannot Be Interrupted ❌
      │
      ▼
Browser Paint
      │
      ▼
Run useEffect
```

---

# Key Takeaways

- Interruptible Rendering applies only to the Render Phase.
- The Render Phase can pause, resume, restart, or discard work because it only builds the Work-In-Progress Tree.
- The Real DOM is not modified during rendering.
- The Commit Phase updates the Real DOM and must remain atomic.
- React never commits partially rendered UI.
- Maintaining separate Current and Work-In-Progress Trees allows React to safely interrupt rendering while keeping the visible UI consistent.

---

# Interview Questions

## What is Interruptible Rendering?

Interruptible Rendering is React's ability to pause, resume, restart, or discard the Render Phase without affecting the visible UI because all work is performed on the Work-In-Progress Fiber Tree.

---

## Why can React interrupt the Render Phase?

React can interrupt the Render Phase because it is only calculating the next UI. Since the Real DOM has not been updated, React can safely pause or discard the work without affecting what the user sees.

---

## Why can't React interrupt the Commit Phase?

The Commit Phase updates the Real DOM. Interrupting it could leave the UI in a partially updated and inconsistent state. Therefore, React performs the Commit Phase atomically.

---

## What does "atomic commit" mean?

An atomic commit means React either applies **all** DOM updates or **none** of them. It never commits only part of the UI.
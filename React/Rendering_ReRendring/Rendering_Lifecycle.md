# ⚛️ React Rendering Lifecycle (Complete Flow)

---

# Complete Flow After `setState()`

When a user interacts with the UI and `setState()` is called, React follows the following pipeline.

```text
Current Tree (Visible UI)

↓

User Click

↓

Event Handler Executes

↓

setState()

↓

Create Update Object

↓

Append Update to Hook's Update Queue

↓

Notify Scheduler

↓

Scheduler Schedules Work

↓

═══════════════════════════════
Render Phase
═══════════════════════════════

↓

Clone Current Fiber Tree

↓

Create Work In Progress (WIP) Tree

↓

Execute Component Function

↓

Execute Hooks

↓

Read Hook Update Queue

↓

Process Pending Updates

↓

Compute New State

↓

Update Hook.memoizedState (WIP Tree)

↓

Generate New JSX

↓

Create React Elements

↓

Build/Update WIP Fiber Tree

↓

Reconciliation

↓

Compare Current Tree vs WIP Tree

↓

Determine Required DOM Changes

↓

Render Phase Ends

(No DOM Updates Yet)

═══════════════════════════════
Commit Phase
═══════════════════════════════

↓

Apply Changes to Real DOM

↓

Swap Trees

WIP Tree

↓

Becomes New Current Tree

↓

Browser Paint

↓

Run useEffect()

↓

Done
```

---

# Current Tree vs Work In Progress Tree

During rendering, React never modifies the Current Tree.

Instead:

```text
Current Tree

↓

Clone

↓

Work In Progress (WIP) Tree

↓

All calculations happen here
```

Only after rendering completes successfully:

```text
Work In Progress Tree

↓

Commit

↓

Becomes New Current Tree
```

The previous Current Tree can then be reused or discarded.

---

# What Happens in the Render Phase?

The Render Phase is responsible for calculating the next UI.

It performs:

- Execute component functions
- Execute Hooks
- Process Hook update queues
- Compute new state
- Generate JSX
- Create React Elements
- Build/Update the WIP Fiber Tree
- Reconcile with the Current Tree
- Determine what needs to change

No DOM updates happen during this phase.

---

# What Happens in the Commit Phase?

The Commit Phase is responsible for applying the calculated changes.

It performs:

- Update the Real DOM
- Swap the WIP Tree to become the Current Tree
- Browser paints the updated UI
- Execute `useEffect()` callbacks

The Commit Phase is atomic and cannot be interrupted.

---

# Why Does React Use a WIP Tree?

The WIP Tree allows React to safely prepare the next UI without affecting the currently visible UI.

Benefits:

- UI remains stable during rendering.
- React can pause rendering.
- React can resume rendering.
- React can restart rendering.
- React can discard unfinished work.

Only when rendering finishes successfully does React commit the changes.

---

# Complete Mental Model

```text
Current Tree

↓

Update Queue

↓

Scheduler

↓

Work In Progress Tree

↓

Render Phase

↓

Reconciliation

↓

Commit Phase

↓

Current Tree Updated

↓

Browser Paint

↓

useEffect()
```

---

# Key Takeaways

- `setState()` does not immediately update the UI.
- React creates an Update object.
- The Update object is stored in the Hook's update queue.
- The Scheduler decides when rendering should begin.
- React clones the Current Tree into a Work In Progress (WIP) Tree.
- All calculations happen on the WIP Tree.
- Reconciliation compares the Current Tree with the WIP Tree.
- The Commit Phase updates the Real DOM.
- The WIP Tree becomes the new Current Tree.
- `useEffect()` runs only after the Commit Phase.

---

# Interview Questions

## What happens internally when `setState()` is called?

React creates an Update object, appends it to the Hook's update queue, notifies the scheduler, renders a Work In Progress Fiber Tree by processing the pending updates and performing reconciliation, commits the calculated DOM changes, swaps the WIP Tree to become the Current Tree, and finally executes `useEffect()` callbacks.

---

## Why does React use a Work In Progress Tree?

The Work In Progress Tree allows React to calculate the next UI without modifying the currently visible UI. This enables rendering to be paused, resumed, restarted, or discarded while keeping the UI consistent.

---

## Why doesn't React update the DOM during the Render Phase?

The Render Phase is purely computational. React first calculates the entire next UI before modifying the DOM. This prevents partially updated interfaces and allows rendering to be interruptible.

---

# Complete Process in One Sentence

When `setState()` is called, React creates an Update object and stores it in the Hook's update queue, the Scheduler schedules work, React clones the Current Fiber Tree into a Work In Progress (WIP) Tree, processes all pending updates while rendering the WIP Tree, performs reconciliation to determine the required DOM changes, commits those changes to the Real DOM, promotes the WIP Tree to become the new Current Tree, the browser paints the updated UI, and finally React executes any eligible `useEffect()` callbacks.
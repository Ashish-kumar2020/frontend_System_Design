# ⚛️ Concurrent Rendering - Cooperative Scheduling

---

# What is Cooperative Scheduling?

Cooperative Scheduling is the mechanism by which React **voluntarily yields control back to the browser** while rendering.

Instead of blocking the main thread until rendering is complete, React periodically checks whether it should pause. If it determines that it has been rendering long enough, it stops its work, returns control to the browser, and later resumes rendering from where it left off.

The browser does **not** interrupt React. React chooses to yield.

---

# Why is Cooperative Scheduling Needed?

JavaScript runs on a single thread.

Once a JavaScript function starts executing, the browser **cannot forcefully interrupt it**.

Example:

```js
function work() {
    while (true) {
        // Expensive work
    }
}
```

The browser cannot stop this function in the middle of execution.

This is why long-running JavaScript blocks:

- User input
- Scrolling
- Animations
- Painting

---

# React's Solution

Instead of performing all rendering in one long task:

```text
Render Everything

↓

Finish

↓

Return Control
```

React performs rendering in smaller chunks.

```text
Process Some Fiber Nodes

↓

Should Yield?

↓

No

↓

Continue Rendering

↓

Should Yield?

↓

Yes

↓

Yield to Browser

↓

Resume Later
```

React voluntarily gives control back to the browser.

---

# Why is it called "Cooperative"?

React cooperates with the browser.

The browser does not stop React.

React decides:

```text
I've worked long enough.

↓

I'll let the browser run now.

↓

I'll continue later.
```

This allows both React and the browser to share the main thread efficiently.

---

# What happens when React yields?

After yielding, the browser can:

- Process user input
- Handle mouse clicks
- Handle keyboard events
- Paint the screen
- Run animations
- Execute other pending tasks

Once the browser has completed its work, React resumes rendering.

---

# Relationship with Time Slicing

Time Slicing:

```text
Split Rendering

↓

Chunk 1

↓

Chunk 2

↓

Chunk 3
```

Cooperative Scheduling:

```text
Chunk 1

↓

Should Yield?

↓

Yes

↓

Browser Runs

↓

Resume Chunk 2
```

Time Slicing divides rendering into chunks.

Cooperative Scheduling determines when React should yield between those chunks.

---

# Relationship with the Scheduler

Complete flow:

```text
setState()

↓

Create Update

↓

Assign Lane

↓

Scheduler

↓

Select Highest Priority Work

↓

Render Some Fiber Nodes

↓

Should Yield?

↓

Yes

↓

Yield to Browser

↓

Browser Processes Events

↓

Resume Rendering

↓

Commit
```

The Scheduler decides **what** work to process.

Cooperative Scheduling determines **when** to temporarily stop processing.

---

# Complete Rendering Flow

```text
User Action
      │
      ▼
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
Select Highest Priority Work
      │
      ▼
Render Phase
      │
      ├── Process Fiber Nodes
      ├── Check Should Yield
      ├── Yield to Browser
      ├── Resume Rendering
      └── Repeat Until Complete
      │
      ▼
Commit Phase
      │
      ├── Update Real DOM
      ├── Attach Refs
      └── Run Layout Effects
      │
      ▼
Browser Paint
      │
      ▼
Run useEffect
```

---

# Key Takeaways

- Cooperative Scheduling allows React to voluntarily yield control to the browser.
- The browser does not interrupt running JavaScript.
- React periodically checks whether it should yield.
- When React yields, the browser can process user interactions, animations, and painting.
- After yielding, React resumes rendering from the Work-In-Progress Fiber Tree.
- Cooperative Scheduling works together with Time Slicing and the Scheduler to keep applications responsive.

---

# Interview Questions

## What is Cooperative Scheduling?

Cooperative Scheduling is React's mechanism for voluntarily yielding control back to the browser during the Render Phase. React periodically checks whether it should pause, allows the browser to process other tasks, and later resumes rendering from where it left off.

---

## Does the browser interrupt React's rendering?

No.

The browser cannot forcefully interrupt a running JavaScript function. React cooperatively yields control by deciding when to pause its own work.

---

## What happens when React yields?

When React yields, the browser gets an opportunity to process user input, paint the screen, run animations, and execute other pending tasks. React then resumes rendering afterward.

---

## How is Cooperative Scheduling related to Time Slicing?

Time Slicing divides rendering into smaller chunks of work. Cooperative Scheduling is the mechanism that allows React to yield control to the browser between those chunks.
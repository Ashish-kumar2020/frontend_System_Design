# ⚛️ React Fiber - Flags

---

# What are Flags?

Flags are markers attached to a Fiber Node during the **Render Phase**.

They tell React exactly **what work needs to be performed during the Commit Phase**.

Instead of comparing the tree again, React simply reads the Flags and executes the required operations.

---

# Why does React need Flags?

React rendering consists of two phases:

1. Render Phase
2. Commit Phase

During the Render Phase, React performs:

- Component execution
- Reconciliation
- Diffing

By the end of the Render Phase, React already knows what changed.

Without Flags, React would have to perform reconciliation and diffing again during the Commit Phase.

That would be unnecessary and inefficient.

---

# React's Solution

During the Render Phase:

```text
Compare Trees

↓

Find Changes

↓

Mark Fiber with Flags

↓

Render Complete
```

During the Commit Phase:

```text
Read Flags

↓

Perform Required Work
```

The Commit Phase performs work instead of making decisions.

---

# Example 1 - Update Flag

Before:

```jsx
<h1>Hello</h1>
```

After:

```jsx
<h1>Hi</h1>
```

Render Phase:

```text
H1 Fiber

↓

flags = Update
```

Commit Phase:

```text
Read Flag

↓

Update Real DOM Text
```

---

# Example 2 - Placement Flag

Before:

```jsx
<div>
    <h1>Hello</h1>
</div>
```

After:

```jsx
<div>
    <h1>Hello</h1>
    <button>Click</button>
</div>
```

Render Phase:

```text
Button Fiber

↓

flags = Placement
```

Commit Phase:

```text
Insert Button into Real DOM
```

---

# Example 3 - Deletion Flag

Before:

```jsx
<div>
    <button>Delete</button>
</div>
```

After:

```jsx
<div></div>
```

Render Phase:

```text
Button Fiber

↓

flags = Deletion
```

Commit Phase:

```text
Remove Button from Real DOM
```

---

# Common Flags

| Flag | Purpose |
|-------|---------|
| `Placement` | Insert a new DOM node |
| `Update` | Update an existing DOM node |
| `Deletion` | Remove a DOM node |
| `Passive` | Execute `useEffect` |
| `Layout` | Execute `useLayoutEffect` |
| `Ref` | Attach or detach refs |

---

# NoFlags

If React finds no changes during the Render Phase:

```text
flags = NoFlags
```

During the Commit Phase:

```text
Skip Fiber
```

No DOM work is performed.

---

# Render vs Commit

## Render Phase

```text
Execute Components

↓

Read State

↓

Reconciliation

↓

Diffing

↓

Mark Flags

↓

Render Complete
```

The Render Phase decides **what needs to change**.

---

## Commit Phase

```text
Read Flags

↓

Update Real DOM

↓

Attach Refs

↓

Execute Effects
```

The Commit Phase performs **the work already decided during rendering**.

---

# Example Flow

Suppose:

```jsx
<div>
    <h1>Hello</h1>
</div>
```

becomes:

```jsx
<div>
    <h1>Hi</h1>

    <button>Click</button>
</div>
```

### Render Phase

React performs:

```text
Reconciliation

↓

Diffing

↓

H1 Fiber

flags = Update

↓

Button Fiber

flags = Placement
```

---

### Commit Phase

React reads:

```text
Update

↓

Change H1 Text

────────────────────

Placement

↓

Insert Button
```

No comparison happens during the Commit Phase.

---

# Complete Rendering Pipeline

```text
setState()
      │
      ▼
Scheduler
      │
      ▼
Render Phase
      │
      ├── Execute Components
      ├── Process Update Queue
      ├── Read Hooks
      ├── Reconciliation
      ├── Diffing
      └── Mark Flags
      │
      ▼
Commit Phase
      │
      ├── Read Flags
      ├── Update Real DOM
      ├── Attach Refs
      └── Execute Effects
      │
      ▼
Browser Rendering
      │
      ├── Style
      ├── Layout
      ├── Paint
      └── Composite
```

---

# Why are Flags important?

Without Flags:

```text
Render

↓

Reconciliation

↓

Commit

↓

Reconciliation Again ❌

↓

Diff Again ❌
```

With Flags:

```text
Render

↓

Reconciliation

↓

Mark Flags

↓

Commit

↓

Read Flags

↓

Execute Work
```

This avoids repeating expensive work.

---

# Key Takeaways

- Flags are markers stored on Fiber Nodes.
- Flags are created during the Render Phase.
- They describe the work React must perform during the Commit Phase.
- The Commit Phase does not perform reconciliation or diffing again.
- Common Flags include `Placement`, `Update`, `Deletion`, `Passive`, `Layout`, and `Ref`.
- If a Fiber has `NoFlags`, React skips it during the Commit Phase.
- Flags make the Commit Phase fast because React simply executes previously determined work.

---

# Interview Questions

## What are React Flags?

Flags are markers attached to Fiber Nodes during the Render Phase that tell React what work needs to be performed during the Commit Phase.

---

## Why does React use Flags?

React uses Flags so it doesn't have to perform reconciliation or diffing again during the Commit Phase. The Render Phase determines what changed, and the Commit Phase simply executes those changes.

---

## When are Flags created?

Flags are created during the Render Phase after React performs reconciliation and diffing.

---

## When are Flags used?

Flags are read during the Commit Phase to update the Real DOM, attach refs, and execute effects.

---

## What happens if a Fiber has `NoFlags`?

React skips that Fiber during the Commit Phase because there is no work to perform.
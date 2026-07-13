# ⚛️ React Rendering & Re-rendering - Reconciliation During Re-render

---

# What is Reconciliation?

Reconciliation is the process where React compares the **Current Fiber Tree** with the **Work In Progress (WIP) Fiber Tree** to determine the minimum set of changes required to update the UI.

> **React does NOT compare the Real DOM with the Virtual DOM.**

Internally, React compares:

```text
Current Fiber Tree

↓

Work In Progress (WIP) Fiber Tree
```

---

# Example

```jsx
function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>{count}</h1>
            <button>Increment</button>
        </>
    );
}
```

Initially:

```html
<h1>0</h1>
<button>Increment</button>
```

After:

```jsx
setCount(c => c + 1);
```

New UI:

```html
<h1>1</h1>
<button>Increment</button>
```

---

# Internal Flow

```text
setState()

↓

Scheduler

↓

Render Phase

↓

Clone Current Tree

↓

Create Work In Progress Tree

↓

Execute Component

↓

Process Hook Updates

↓

Generate New JSX

↓

Update WIP Tree

↓

Reconciliation

↓

Compare Current Tree

vs

Work In Progress Tree

↓

Find Differences

↓

Create Effect List

↓

Commit Phase

↓

Traverse Effect List

↓

Update Only Changed DOM Nodes
```

---

# Example Comparison

## Current Tree

```text
App
│
├── h1
│     └── "0"
│
└── button
      └── "Increment"
```

---

## WIP Tree

```text
App
│
├── h1
│     └── "1"
│
└── button
      └── "Increment"
```

---

## Reconciliation

```text
Current Tree                WIP Tree

h1             vs          h1

↓

Same Type

↓

Reuse Fiber

────────────────────────

"0"            vs          "1"

↓

Different

↓

Mark Text Node For Update

────────────────────────

button         vs          button

↓

Same Type

↓

Reuse Fiber

────────────────────────

"Increment"    vs       "Increment"

↓

Same

↓

No DOM Update
```

Only the text node changes.

---

# Commit Phase

React updates only:

```html
<h1>0</h1>
```

↓

```html
<h1>1</h1>
```

The button is never touched.

---

# Another Example

Current UI:

```jsx
<div>
    <h1>Hello</h1>
    <button>Click</button>
</div>
```

New UI:

```jsx
<div>
    <h1>Hello</h1>
    <button>Submit</button>
</div>
```

Reconciliation:

```text
div

↓

Same Type

↓

Reuse

────────────────────────

h1

↓

Same Type

↓

Reuse

────────────────────────

"Hello"

↓

Same

↓

No DOM Update

────────────────────────

button

↓

Same Type

↓

Reuse

────────────────────────

"Click"

↓

"Submit"

↓

Different

↓

Mark For Update
```

During Commit, only the button text is updated.

---

# Component Tree Example

```text
App
│
├── Header
├── Dashboard
└── Footer
```

Suppose only `Dashboard` changes.

Reconciliation:

```text
Header

↓

Same

↓

Reuse

────────────────────────

Dashboard

↓

Changed

↓

Continue Comparing

────────────────────────

Footer

↓

Same

↓

Reuse
```

During Commit:

```text
Header      ❌ No DOM Update

Dashboard   ✅ DOM Update

Footer      ❌ No DOM Update
```

Only the changed DOM inside `Dashboard` is updated.

---

# Effect List

During reconciliation, React records every required DOM operation.

Conceptually:

```text
Effect List

↓

Update Text Node

↓

Insert Element

↓

Delete Element

↓

Replace Element
```

During the Commit Phase:

```text
Traverse Effect List

↓

Apply DOM Updates
```

React does not scan the tree again during commit.

---

# Complete Rendering Pipeline

```text
setState()

↓

Create Update Object

↓

Update Queue

↓

Scheduler

↓

Render Phase

↓

Create WIP Tree

↓

Execute Components

↓

Generate JSX

↓

Reconciliation

↓

Compare Current Tree

↓

Compare WIP Tree

↓

Find Differences

↓

Create Effect List

↓

Commit Phase

↓

Traverse Effect List

↓

Update Real DOM

↓

Browser Paint

↓

Run useEffect()
```

---

# Key Takeaways

- Reconciliation compares the Current Fiber Tree with the Work In Progress Tree.
- React does not compare the Real DOM with the Virtual DOM.
- React reuses Fiber nodes whenever possible.
- Only changed nodes are marked for updates.
- During reconciliation, React builds an Effect List.
- During the Commit Phase, React traverses the Effect List and updates only the affected DOM nodes.
- Rendering a component does not imply updating its entire DOM subtree.

---

# Interview Questions

## What does React compare during reconciliation?

React compares the Current Fiber Tree with the Work In Progress (WIP) Fiber Tree. Based on this comparison, it determines the minimum set of DOM operations required.

---

## Does React compare the Virtual DOM with the Real DOM?

No. Internally, React reconciles the Current Fiber Tree against the Work In Progress Fiber Tree. The Real DOM is updated later during the Commit Phase.

---

## What is the purpose of the Effect List?

The Effect List stores the DOM operations discovered during reconciliation, such as insertions, updates, and deletions. During the Commit Phase, React traverses this list to efficiently update only the affected DOM nodes.

---

## Why is reconciliation efficient?

React reuses existing Fiber nodes whenever possible and records only the differences between the Current Tree and the Work In Progress Tree. During the Commit Phase, only those differences are applied to the Real DOM.
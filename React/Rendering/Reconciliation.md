# ⚛️ React Rendering - Reconciliation

---

# What is Reconciliation?

**Reconciliation** is the process in which React compares the **previous React Element Tree** with the **new React Element Tree** to determine the **minimum number of changes required** for the Real DOM.

React performs reconciliation **before** updating the Real DOM.

---

# Where does Reconciliation happen?

```text
State Update
      │
      ▼
Render Phase
      │
      ▼
Create New React Element Tree
      │
      ▼
Reconciliation
      │
      ▼
Diffing Algorithm
      │
      ▼
Commit Phase
      │
      ▼
Update Real DOM
      │
      ▼
Browser Rendering Pipeline
```

---

# Rendering Flow

```text
User Click
      │
      ▼
setState()
      │
      ▼
Queue Update
      │
      ▼
Process Update Queue
      │
      ▼
Update Internal State
      │
      ▼
React Starts Re-render
      │
      ▼
Calls Component Function
      │
      ▼
Creates New React Elements
      │
      ▼
Creates New React Element Tree
      │
      ▼
Reconciliation
      │
      ▼
Diffing Algorithm
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

---

# What does Reconciliation do?

React compares the **old tree** with the **new tree**.

Example:

Old Tree

```text
div
├── h1
│    └── "Hello"
└── button
     └── "Save"
```

New Tree

```text
div
├── h1
│    └── "Hi"
└── button
     └── "Save"
```

React walks through both trees and compares the corresponding elements.

Conceptually:

```text
div      ↔ div

↓

h1       ↔ h1

↓

Hello    ↔ Hi

↓

button   ↔ button

↓

Save      ↔ Save
```

React then determines which DOM updates are actually required.

---

# Diffing Algorithm

The **Diffing Algorithm** is used during reconciliation.

Its job is to determine:

- Which nodes changed
- Which nodes stayed the same
- Which nodes should be created
- Which nodes should be removed

The output of the diffing algorithm is the list of changes that React applies during the Commit Phase.

---

# Reconciliation Rule #1

## Different Element Type

Old

```jsx
<div>Hello</div>
```

New

```jsx
<span>Hello</span>
```

Comparison

```text
div ≠ span
```

React assumes they produce completely different trees.

Result:

```text
Destroy Old Subtree

↓

Create New Subtree
```

Even if the text is identical:

```text
Hello
```

the subtree is recreated because the **element type changed**.

---

# Reconciliation Rule #2

## Same Element Type

Old

```jsx
<button className="red">
    Save
</button>
```

New

```jsx
<button className="blue">
    Save
</button>
```

Comparison

```text
button == button
```

Result

```text
Reuse Existing DOM Node

↓

Compare Props

↓

Compare Children

↓

Update Only Changed Parts
```

React keeps the existing DOM node.

Only the changed prop is updated.

```text
className

red

↓

blue
```

---

# How React Thinks

For every corresponding node React conceptually asks:

```text
Old Node
      │
      ▼
New Node
      │
      ▼
Same Element Type?
      │
 ┌────┴────┐
 │         │
Yes        No
 │         │
 ▼         ▼
Reuse     Destroy Old Subtree
DOM Node  Create New Subtree
 │
 ▼
Compare Props
 │
 ▼
Compare Children
 │
 ▼
Diffing Finds Changes
 │
 ▼
Commit Only Required DOM Updates
```

---

# Example

Old

```jsx
<div>
    <button className="red">
        Save
    </button>
</div>
```

New

```jsx
<div>
    <button className="blue">
        Save
    </button>
</div>
```

React performs:

```text
Compare

div ↔ div

↓

Same Type

↓

Reuse div DOM Node

↓

Compare Children

↓

button ↔ button

↓

Same Type

↓

Reuse button DOM Node

↓

Compare Props

↓

className

red → blue

↓

Commit className update
```

Notice that React **does not jump directly to comparing props**.

It first checks whether the element type is the same.

Only then does it compare props and children.

---

# React Does NOT Think in Parent/Child Terms

❌ Incorrect

> Parent changed, so React recreates everything.

✅ Correct

React compares **corresponding elements at the same position** in the old and new trees.

The decision is based on:

```text
Same Element Type?

YES

↓

Reuse

NO

↓

Destroy & Recreate
```

---

# Relationship Between Reconciliation & Diffing

```text
New React Element Tree
            │
            ▼
Reconciliation
            │
            ▼
Diffing Algorithm
            │
            ▼
Find Differences
            │
            ▼
Commit Phase
            │
            ▼
Update Real DOM
```

- **Reconciliation** is the overall comparison process.
- **Diffing Algorithm** is the algorithm React uses during reconciliation to identify the differences.

---

# Reconciliation Summary

```text
Old Tree
      │
      ▼
New Tree
      │
      ▼
Compare Corresponding Elements
      │
      ▼
Same Type?
      │
 ┌────┴────┐
 │         │
Yes        No
 │         │
 ▼         ▼
Reuse     Destroy Subtree
Node      Create New Tree
 │
 ▼
Compare Props
 │
 ▼
Compare Children
 │
 ▼
Commit Only Necessary DOM Changes
```

---

# Important Notes

- Reconciliation happens before the Commit Phase.
- React compares the previous React Element Tree with the new React Element Tree.
- React compares **corresponding elements**, not every possible combination of nodes.
- If the element type changes, React destroys the old subtree and creates a new one.
- If the element type stays the same, React reuses the existing DOM node.
- React then compares props and children.
- Diffing determines the minimal DOM changes required.
- During the Commit Phase, only those changes are applied to the Real DOM.

---

# Interview Questions

## What is Reconciliation?

Reconciliation is the process where React compares the previous React Element Tree with the new React Element Tree to determine the minimum number of changes required for the Real DOM.

---

## What is the Diffing Algorithm?

The Diffing Algorithm is the algorithm React uses during reconciliation to identify the differences between the old and new React Element Trees.

---

## What happens when the element type changes?

Example:

```jsx
<div>

↓

<span>
```

React destroys the old subtree and creates a new subtree.

---

## What happens when the element type stays the same?

React reuses the existing DOM node, compares props and children, and updates only the changed parts.

---

# Key Takeaways

- Reconciliation compares the old and new React Element Trees.
- Diffing finds the differences between the trees.
- React compares corresponding elements at the same position.
- Different element type → Destroy old subtree and create a new subtree.
- Same element type → Reuse existing DOM node.
- React then compares props and children.
- Only the required DOM updates are committed.
```
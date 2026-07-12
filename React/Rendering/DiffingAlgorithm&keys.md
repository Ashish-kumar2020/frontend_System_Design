# ⚛️ React Rendering - Diffing Algorithm & Keys

---

# What is the Diffing Algorithm?

The **Diffing Algorithm** is the algorithm React uses during **Reconciliation** to identify the differences between the **previous React Element Tree** and the **new React Element Tree**.

It tells React:

- Which nodes changed
- Which nodes stayed the same
- Which nodes should be created
- Which nodes should be removed

The output of the Diffing Algorithm is used during the **Commit Phase** to update the Real DOM.

---

# Relationship Between Reconciliation & Diffing

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
List of Changes
      │
      ▼
Commit Phase
      │
      ▼
Update Real DOM
```

---

# What does the Diffing Algorithm return?

Suppose:

Old Tree

```text
div
├── h1 → Hello
└── button → Save
```

New Tree

```text
div
├── h1 → Hi
└── button → Save
```

The Diffing Algorithm conceptually produces:

```text
Changes

✓ h1 text changed

Hello

↓

Hi
```

or

```text
Update Text Node

Old : "Hello"

New : "Hi"
```

This list of changes is then executed during the Commit Phase.

---

# Why did React create its own Diffing Algorithm?

A general Tree Diff algorithm compares many possible node combinations.

Conceptually:

```text
Old A ↔ New A

Old A ↔ New B

Old A ↔ New C

Old B ↔ New A

Old B ↔ New B

...
```

For large trees this becomes extremely expensive.

General Tree Diff Complexity:

```text
O(n³)
```

This is too slow for UI rendering.

---

# React's Optimization

React makes two important assumptions.

---

## Assumption 1

Elements of different types produce different trees.

Example:

```jsx
<div>

↓

<span>
```

React immediately assumes:

```text
Different Element Type

↓

Destroy Old Subtree

↓

Create New Subtree
```

Instead of trying to compare them deeply.

---

## Assumption 2

Developers provide stable **keys** for list items.

Instead of identifying items by their position, React identifies them by their key.

---

# Why is React's Diffing Algorithm O(n)?

React compares **corresponding elements** in both trees.

Example:

Old

```text
div
├── h1
└── button
```

New

```text
div
├── h1
└── button
```

React compares:

```text
div ↔ div

↓

h1 ↔ h1

↓

button ↔ button
```

It **does not** compare:

```text
div ↔ button

button ↔ div

button ↔ h1
```

Each node is visited approximately once.

Result:

```text
O(n)
```

---

# Diffing Flow

For every corresponding node React conceptually performs:

```text
Compare Old Node
        │
        ▼
Compare New Node
        │
        ▼
Same Element Type?
      /         \
    Yes          No
    │            │
    ▼            ▼
Reuse Node    Destroy Subtree
    │
    ▼
Compare Props
    │
    ▼
Compare Children
    │
    ▼
Continue Recursively
```

---

# The Problem Without Keys

Suppose:

```jsx
<ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
</ul>
```

becomes

```jsx
<ul>
    <li>C</li>
    <li>A</li>
    <li>B</li>
</ul>
```

Without keys React compares by **position**.

Comparison:

```text
Position 0

A ↔ C

────────────

Position 1

B ↔ A

────────────

Position 2

C ↔ B
```

React thinks:

```text
Item at Position 0 changed

Item at Position 1 changed

Item at Position 2 changed
```

It cannot determine that the items simply moved.

---

# What is a Key?

A **key** is a stable identity for an element across renders.

Instead of identifying an item by its position, React identifies it by its key.

Example:

```jsx
<li key="1">A</li>

<li key="2">B</li>

<li key="3">C</li>
```

React now identifies elements by:

```text
key

↓

Identity
```

instead of

```text
Position
```

---

# How Keys Solve the Problem

Old

```text
key=1 → A

key=2 → B

key=3 → C
```

New

```text
key=3 → C

key=1 → A

key=2 → B
```

React thinks:

```text
key=3

↓

Found it!

Moved from Position 2 → Position 0

────────────────────────

key=1

↓

Moved from Position 0 → Position 1

────────────────────────

key=2

↓

Moved from Position 1 → Position 2
```

React understands that the elements are the same.

Only their positions changed.

---

# Compare by Position vs Compare by Identity

Without Keys

```text
Compare by Position
```

With Keys

```text
Compare by Identity
```

This is the single most important concept about keys.

---

# Why is Using Index as Key Bad?

Example:

```jsx
const users = [1, 2, 3];

users.map((user, index) => (
    <User key={index} user={user} />
));
```

Initial Render

```text
key=0 → User 1

key=1 → User 2

key=2 → User 3
```

Now insert a new user at the beginning.

```js
[4, 1, 2, 3]
```

React now sees:

```text
key=0 → User 4

key=1 → User 1

key=2 → User 2

key=3 → User 3
```

Notice:

```text
Before

key=0 → User 1

────────────────

After

key=0 → User 4
```

React thinks:

```text
key=0

↓

Same Component

↓

Reuse It
```

React does **not** think:

```text
User 1 moved.
```

Because the identity is the **key**, not the data.

---

# The Real Bug

Suppose:

```text
key=0

User 1

Input Value = "John"
```

After inserting User 4:

```text
key=0

User 4

Input Value = "John"
```

The component state stays attached to the key.

This causes bugs such as:

- Input values moving to the wrong row
- Checkboxes remaining checked for the wrong item
- Incorrect animations
- Wrong component state

---

# Correct Way

```jsx
users.map(user => (
    <User key={user.id} user={user} />
));
```

Initial

```text
key=1 → User 1

key=2 → User 2

key=3 → User 3
```

After inserting User 4

```text
key=4 → User 4

key=1 → User 1

key=2 → User 2

key=3 → User 3
```

React now thinks:

```text
key=4

↓

New Component

──────────────────

key=1

↓

Same Component

Moved

──────────────────

key=2

↓

Same Component

Moved

──────────────────

key=3

↓

Same Component

Moved
```

Each component keeps its correct state.

---

# Think of Keys Like Employee IDs

Without IDs

```text
Desk 1 → Rahul

Desk 2 → Amit

Desk 3 → Neha
```

Employees change desks.

You identify them by desk.

Result:

```text
Everyone changed
```

Wrong.

---

With IDs

```text
ID 101 → Rahul

ID 102 → Amit

ID 103 → Neha
```

Employees change desks.

You identify them by ID.

Result:

```text
Same Employees

Different Positions
```

This is exactly how React uses keys.

---

# When is Index Safe?

Using the index is acceptable only when:

- The list is static.
- Items are never reordered.
- Items are never inserted.
- Items are never deleted.

Example:

```jsx
const months = [
    "January",
    "February",
    "March"
];
```

Since the order never changes, using the index is generally fine.

---

# Important Notes

- Keys must be unique among siblings.
- Keys should be stable across renders.
- Keys are used by React during reconciliation.
- Keys are not available as props inside the component.
- React compares list items by key, not by their displayed value.

---

# Interview Questions

## What is the Diffing Algorithm?

The Diffing Algorithm is the algorithm React uses during Reconciliation to identify the differences between the previous and new React Element Trees.

---

## Why is React's Diffing Algorithm O(n)?

Because React compares corresponding elements instead of comparing every node with every other node. It also relies on two assumptions:
- Different element types produce different trees.
- Developers provide stable keys for lists.

---

## What is a key?

A key is a stable identity for an element across renders.

---

## Why should we avoid using the array index as a key?

React identifies components by their keys.

When using the array index as the key, inserting, deleting, or reordering items changes the keys. React may then reuse existing component instances for different data, causing component state, input values, focus, or animations to become associated with the wrong item.

---

## Why is `user.id` better than `index`?

`user.id` remains stable even if the item's position changes, allowing React to correctly identify and preserve the component across renders.

---

# Key Takeaways

- Diffing Algorithm is part of Reconciliation.
- Diffing identifies the minimal set of changes.
- React compares corresponding elements, not every node with every other node.
- React's diffing algorithm runs in approximately O(n).
- Keys provide a stable identity for list items.
- Without keys, React compares by position.
- With keys, React compares by identity.
- Avoid using the array index as a key when items can be inserted, removed, or reordered.
- Stable keys help React preserve component state correctly.
# ⚛️ Virtual DOM, Reconciliation & Diffing

---

# Why do we need the Virtual DOM?

Updating the **Real DOM** is expensive because it can trigger the browser's rendering pipeline (Layout → Paint → Composite). React uses the **Virtual DOM** to determine the minimum changes required before updating the Real DOM, reducing unnecessary DOM operations.

---

# Virtual DOM

## Definition

The **Virtual DOM** is a lightweight JavaScript representation of the Real DOM maintained by React. Whenever state or props change, React creates a new Virtual DOM, compares it with the previous one, and updates only the necessary parts of the Real DOM.

### Important Points

* Lightweight JavaScript object.
* Managed by React.
* Not visible to the user.
* Helps minimize expensive Real DOM updates.

---

# Real DOM

## Definition

The **Real DOM** is the actual Document Object Model created by the browser after parsing HTML. It represents the webpage displayed to the user, and any updates to it may trigger browser rendering work.

### Important Points

* Managed by the browser.
* Visible to the user.
* Expensive to update.
* Browser renders the Real DOM.

---

# Re-render

## Definition

A **Re-render** occurs when a component's **state** or **props** change. React executes the component function again and creates a **new Virtual DOM** representing the updated UI.

### Important Points

* Triggered by State or Props changes.
* Component function executes again.
* Creates a new Virtual DOM.
* Does **not** recreate the entire Real DOM.

---

# Reconciliation

## Definition

**Reconciliation** is the process React uses to compare the previous Virtual DOM with the new Virtual DOM after a re-render. Based on the differences, React determines the minimum updates required for the Real DOM.

### Important Points

* Starts after a re-render.
* Compares:

  * Old Virtual DOM
  * New Virtual DOM
* Uses the Diffing Algorithm.

---

# Diffing

## Definition

**Diffing** is the algorithm used during reconciliation to compare the previous Virtual DOM with the new Virtual DOM. It identifies the minimum changes required so that React updates only the affected parts of the Real DOM.

### Important Points

* Compares:

  * Old Virtual DOM
  * New Virtual DOM
* Detects:

  * Updated nodes
  * Added nodes
  * Removed nodes
  * Moved nodes

---

# Keys

## Definition

**Keys** are unique identifiers provided to list items that help React match elements between the old and new Virtual DOM during reconciliation. They enable React to efficiently detect additions, removals, reordering, and updates.

### Important Points

* Used **only for lists**.
* Should be unique and stable.
* Improve reconciliation performance.
* Prevent unnecessary DOM updates.

---

# React's Diffing Assumptions

React reduces the complexity of tree comparison by making two assumptions:

### 1. Elements of different types produce different trees.

Example:

```jsx
<div />

↓

<span />
```

React replaces the old element instead of deeply comparing them.

---

### 2. Developers provide stable keys for lists.

Keys help React efficiently match list items during reconciliation.

---

# Complexity

Without these assumptions:

```text
O(n³)
```

With React's assumptions:

```text
O(n)
```

---

# React Rendering Flow

```text
State / Props Change
          ↓
React schedules an update
          ↓
Component Re-renders
          ↓
Creates New Virtual DOM
          ↓
Reconciliation
          ↓
Diffing
(Old Virtual DOM vs New Virtual DOM)
          ↓
Find Minimum Changes
          ↓
Update Real DOM
          ↓
Browser Rendering
(Layout → Paint → Composite)
          ↓
Updated UI
```

---

# Real DOM vs Virtual DOM

| Real DOM                         | Virtual DOM                               |
| -------------------------------- | ----------------------------------------- |
| Managed by Browser               | Managed by React                          |
| Actual DOM displayed to the user | JavaScript representation of the Real DOM |
| Expensive to update              | Cheap to create and compare               |
| Browser renders it               | Used internally by React                  |

---

# Common Interview Questions

### What is the Virtual DOM?

A lightweight JavaScript representation of the Real DOM used by React to determine the minimum updates required before modifying the Real DOM.

---

### What is Reconciliation?

The process of comparing the previous Virtual DOM with the new Virtual DOM to determine the minimum changes required in the Real DOM.

---

### What is Diffing?

The algorithm used during reconciliation to compare the old and new Virtual DOM and identify the minimum DOM updates.

---

### Why are Keys important?

Keys provide a stable identity to list items, allowing React to efficiently detect additions, removals, reordering, and updates during reconciliation.

---

### Does React compare the Virtual DOM with the Real DOM?

**No.**

React compares:

```text
Old Virtual DOM
        ↓
New Virtual DOM
```

It then updates only the necessary parts of the Real DOM.

---

# Quick Revision

* **Virtual DOM** → JavaScript representation of the Real DOM.
* **Re-render** → Component executes again after State/Props change.
* **Reconciliation** → Compares old and new Virtual DOM.
* **Diffing** → Finds the minimum changes.
* **Keys** → Stable identifiers for list items.
* **Real DOM** → Actual DOM rendered by the browser.

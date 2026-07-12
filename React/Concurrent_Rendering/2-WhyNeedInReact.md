# ⚛️ Concurrent Rendering - Why React Needed It

---

# Why did React need Concurrent Rendering?

Before React 18, React already had the **Fiber architecture**.

A common misconception is:

```text
Fiber = Concurrent Rendering
```

This is **incorrect**.

Fiber and Concurrent Rendering are related, but they are not the same thing.

---

# Fiber vs Concurrent Rendering

Fiber provides the **architecture**.

Concurrent Rendering uses that architecture.

```text
Fiber

↓

Makes interruptible rendering possible

────────────────────────────

Concurrent Rendering

↓

Uses that capability

↓

Pause

↓

Resume

↓

Prioritize Updates
```

---

# The Problem Before Concurrent Rendering

Consider:

```jsx
function SearchPage() {

    const [query, setQuery] = useState("");

    const filteredProducts =
        products.filter(/* expensive */);

    return (
        <>
            <input />
            <ProductList />
        </>
    );
}
```

Suppose there are:

```text
100,000 Products
```

User types:

```text
A
```

React must:

```text
Update Input

↓

Filter Products

↓

Render Product List
```

---

# Before Concurrent Rendering

Everything belonged to one render.

```text
User Types

↓

setQuery()

↓

Filter 100,000 Products

↓

Render 100,000 Products

↓

Commit

↓

Input Updates
```

The input waits until the expensive rendering finishes.

The application feels slow.

---

# Multiple Keystrokes

Suppose the user types:

```text
A

AB

ABC

ABCD
```

Each keystroke causes:

```text
setQuery()

↓

Filter Products

↓

Render Product List

↓

Commit
```

Again:

```text
setQuery()

↓

Filter Products

↓

Render Product List

↓

Commit
```

React repeatedly performs expensive rendering.

Result:

```text
Typing

↓

Lag

↓

Typing

↓

Lag
```

---

# The Real Problem

Not all updates are equally important.

The user's priority is:

```text
Typing
```

Not:

```text
Rendering 100,000 Products
```

React needed a way to prioritize urgent work over expensive background rendering.

---

# React's Solution

Concurrent Rendering separates work into priorities.

```text
Urgent Work

↓

Update Input

────────────────────────

Non-Urgent Work

↓

Filter Products

↓

Render Product List
```

The input remains responsive while React performs expensive rendering later.

---

# Relationship with Fiber

Fiber introduced:

- Fiber Nodes
- Work-In-Progress Tree
- Interruptible Rendering

This gave React the **ability** to pause rendering.

However, Fiber alone does not automatically make applications responsive.

Concurrent Rendering uses:

- Fiber
- Scheduler
- Lanes

to actually pause, resume, and prioritize rendering.

---

# Evolution of React

```text
React 15
────────────────────

Stack Reconciler

↓

Synchronous Rendering

↓

Cannot Pause

────────────────────

React 16

Fiber

↓

Can Pause

↓

Can Resume

↓

Can Prioritize

(Architecture)

────────────────────

React 18

Concurrent Rendering

↓

Uses Fiber

↓

Scheduler

↓

Lanes

↓

Responsive Rendering
```

---

# Fiber vs Concurrent Rendering

| Fiber | Concurrent Rendering |
|--------|----------------------|
| Architecture | Rendering feature |
| Introduced in React 16 | Introduced in React 18 |
| Makes interruptible rendering possible | Uses interruptible rendering |
| Creates Fiber Nodes | Prioritizes updates |
| Builds the Work-In-Progress Tree | Pauses and resumes rendering |
| Provides the capability | Uses the capability |

---

# Complete Flow

```text
User Types

↓

Create Update

↓

Assign Lane

↓

Scheduler

↓

Urgent Update

↓

Update Input

────────────────────────

Background Update

↓

Filter Products

↓

Render Product List

↓

Commit
```

---

# Why Concurrent Rendering Was Needed

React needed Concurrent Rendering because expensive rendering work should not block urgent user interactions.

Without Concurrent Rendering:

```text
Typing

↓

Wait

↓

Render Finishes

↓

Input Updates
```

With Concurrent Rendering:

```text
Typing

↓

Input Updates Immediately

↓

Background Rendering Continues
```

The application feels smooth and responsive.

---

# Key Takeaways

- Fiber and Concurrent Rendering are not the same.
- Fiber introduced the architecture for interruptible rendering.
- Concurrent Rendering uses Fiber, the Scheduler, and Lanes to prioritize work.
- Before Concurrent Rendering, expensive rendering could block user interactions.
- Concurrent Rendering separates urgent work from non-urgent work.
- The goal is to improve responsiveness, not raw rendering speed.

---

# Interview Questions

## Why did React introduce Concurrent Rendering?

React introduced Concurrent Rendering so urgent user interactions, such as typing or clicking, are not blocked by expensive rendering work. It uses the Fiber architecture, Scheduler, and Lanes to pause, resume, and prioritize rendering.

---

## Is Fiber the same as Concurrent Rendering?

No.

Fiber is the underlying architecture introduced in React 16 that makes interruptible rendering possible. Concurrent Rendering is the React 18 feature that uses Fiber's capabilities together with the Scheduler and Lanes to pause, resume, and prioritize rendering.

---

## What problem does Concurrent Rendering solve?

Concurrent Rendering prevents expensive rendering tasks from blocking urgent user interactions, making React applications feel more responsive.
# ⚛️ Concurrent Rendering - `useTransition()`

---

# What is `useTransition()`?

`useTransition()` is a React Hook that allows you to mark state updates as **non-urgent** and provides information about whether the transition is currently in progress.

It returns:

```jsx
const [isPending, startTransition] = useTransition();
```

- `startTransition()` marks updates as transition (low-priority) updates.
- `isPending` indicates whether the transition is currently rendering.

---

# Why is `useTransition()` Needed?

Suppose React is rendering:

```text
100,000 Products
```

The user types:

```text
Laptop
```

Using:

```jsx
startTransition(() => {
    setResults(filteredProducts);
});
```

The input updates immediately.

However, the user has no indication that React is still rendering the product list.

The application may appear unresponsive.

---

# React's Solution

`useTransition()` provides an `isPending` value.

```jsx
const [isPending, startTransition] = useTransition();
```

Now the UI can display loading feedback while the transition is running.

Example:

```jsx
{isPending && <p>Loading results...</p>}
```

---

# Example

```jsx
import { useTransition, useState } from "react";

function Search() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const [isPending, startTransition] =
        useTransition();

    function handleChange(e) {

        const value = e.target.value;

        setQuery(value);

        startTransition(() => {
            setResults(filterProducts(value));
        });

    }

    return (
        <>
            <input
                value={query}
                onChange={handleChange}
            />

            {isPending &&
                <p>Loading...</p>
            }

            <ProductList
                products={results}
            />
        </>
    );
}
```

---

# How `isPending` Works

Timeline:

```text
User Types

↓

setQuery()

↓

Input Updates

↓

startTransition()

↓

isPending = true

↓

Render Transition

↓

Commit

↓

isPending = false
```

While React is rendering the transition:

```text
isPending

↓

true
```

Once rendering completes:

```text
isPending

↓

false
```

---

# Relationship with `startTransition()`

## `startTransition()`

```jsx
startTransition(() => {
    setResults(data);
});
```

Purpose:

```text
Mark Updates

↓

Lower Priority
```

No loading state is provided.

---

## `useTransition()`

```jsx
const [
    isPending,
    startTransition
] = useTransition();
```

Purpose:

```text
Mark Updates

+

Track Transition Status
```

It provides both:

- Lower-priority updates
- Loading state through `isPending`

---

# Complete Flow

```text
User Types
      │
      ▼
setQuery()
      │
      ▼
High Priority Lane
      │
      ▼
Immediate Render

────────────────────────

startTransition()
      │
      ▼
Transition Lane
      │
      ▼
isPending = true
      │
      ▼
Scheduler
      │
      ▼
Render Transition
      │
      ▼
Commit
      │
      ▼
isPending = false
```

---

# Difference Between `startTransition()` and `useTransition()`

| `startTransition()` | `useTransition()` |
|---------------------|-------------------|
| Standalone API | React Hook |
| Marks updates as non-urgent | Marks updates as non-urgent |
| Does not expose loading state | Provides `isPending` |
| Changes update priority | Changes update priority and exposes transition status |

---

# Real-World Example

Searching products:

```text
User Types

↓

Input Updates Immediately

↓

Loading...

↓

Results Render

↓

Loading Disappears
```

The loading indicator is controlled by:

```jsx
isPending
```

---

# Key Takeaways

- `useTransition()` is a Hook.
- It returns `[isPending, startTransition]`.
- `startTransition()` marks updates as non-urgent.
- `isPending` indicates whether the transition is currently rendering.
- `useTransition()` improves user experience by allowing loading indicators during transitions.
- `useTransition()` does not make rendering faster; it improves responsiveness and feedback.

---

# Interview Questions

## What is `useTransition()`?

`useTransition()` is a React Hook that returns `isPending` and `startTransition`. It allows developers to mark updates as non-urgent while also exposing whether the transition is currently in progress.

---

## What is `isPending`?

`isPending` is a boolean value returned by `useTransition()`. It is `true` while React is rendering a transition and becomes `false` once the transition has completed.

---

## What is the difference between `startTransition()` and `useTransition()`?

`startTransition()` only marks updates as non-urgent. `useTransition()` provides the same functionality but also returns `isPending`, allowing the UI to display loading indicators while the transition is running.

---

## Does `useTransition()` make rendering faster?

No.

`useTransition()` does not improve rendering speed. It improves user experience by prioritizing urgent updates and providing transition status through `isPending`.
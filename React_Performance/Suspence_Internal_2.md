# 📚 Module 10 - React.lazy & Suspense Internals (Part 2)

---

# Why React Cannot Wait

When React reaches a lazy component:

```jsx
const Dashboard = React.lazy(() => import("./Dashboard"));
```

and executes:

```jsx
import("./Dashboard");
```

it receives:

```text
Promise
```

React cannot do:

```text
Render Phase

↓

Wait 2 Seconds

↓

Continue Rendering
```

because the Render Phase is synchronous.

Instead, React suspends rendering of the current subtree.

---

# The Biggest Secret

React literally **throws the Promise**.

Conceptually:

```js
if (moduleNotLoaded) {
    throw promise;
}
```

This is **not** an error.

It is a **control-flow signal**.

---

# Why Throw the Promise?

Throwing the Promise allows React to:

```text
1. Stop rendering the current subtree.

↓

2. Transfer control to the nearest Suspense boundary.

↓

3. Retry rendering automatically when the Promise resolves.
```

This is the foundation of Suspense.

---

# Suspense Boundary

Example:

```jsx
<Suspense fallback={<Spinner />}>
    <Dashboard />
</Suspense>
```

Component Tree:

```text
App
│
└── Suspense
      │
      └── Dashboard
             │
             └── Chart
```

Flow:

```text
Chart

↓

React.lazy()

↓

import()

↓

Promise

↓

Throw Promise

↓

Walk Up Fiber Tree

↓

Nearest Suspense Boundary

↓

Render Fallback

↓

Commit
```

---

# Browser vs React

Browser:

```text
Starts Downloading Dashboard.js
```

React:

```text
Suspends Rendering

↓

Shows Fallback UI

↓

Waits For Promise Resolution

↓

Schedules Retry
```

These are two independent systems.

Suspense never stops the browser from downloading JavaScript.

---

# Promise Resolution

When:

```text
Dashboard.js

↓

Downloaded
```

Flow:

```text
Promise Resolves

↓

React Listener Fires

↓

Scheduler

↓

Render Phase

↓

Dashboard Executes

↓

Commit Phase

↓

Replace Spinner With Dashboard
```

Notice:

Everything still follows React's normal rendering pipeline.

---

# Why Not Return null?

Returning:

```jsx
return null;
```

does not tell React:

- Is the component intentionally returning `null`?
- Is it still loading?
- Should React retry later?

A thrown Promise clearly communicates:

```text
Async Work Is Still Pending

↓

Retry Rendering When Promise Resolves
```

---

# Error Boundary vs Suspense

React treats a Promise and an Error differently.

## Pending Promise

```text
throw Promise

↓

Suspense Boundary

↓

Loading UI

↓

Retry Later
```

---

## Error

```text
throw Error

↓

Error Boundary

↓

Error UI

↓

No Retry
```

---

# Lazy Import Scenarios

## Success

```text
React.lazy()

↓

import()

↓

Promise Pending

↓

Throw Promise

↓

Suspense

↓

Spinner

↓

Promise Resolves

↓

Scheduler

↓

Retry Render

↓

Dashboard

↓

Commit
```

---

## Failure

```text
React.lazy()

↓

import()

↓

Promise Rejected

↓

Throw Error

↓

Error Boundary

↓

Error Page
```

---

# Complete Example

```jsx
<ErrorBoundary fallback={<ErrorPage />}>
    <Suspense fallback={<Spinner />}>
        <Dashboard />
    </Suspense>
</ErrorBoundary>
```

User Experience:

```text
Dashboard Loading

↓

Spinner

────────────────────────

Dashboard Loaded

↓

Dashboard

────────────────────────

Dashboard Failed

↓

Error Page
```

---

# Complete Internal Flow

```text
Render Phase

↓

Execute App()

↓

Reach Lazy Component

↓

React.lazy()

↓

import("./Dashboard")

↓

Promise Returned

↓

Browser Starts Download

↓

Throw Promise

↓

Stop Rendering Current Subtree

↓

Walk Up Fiber Tree

↓

Nearest Suspense Boundary

↓

Render Fallback

↓

Commit Phase

────────────────────────

Browser Finishes Download

↓

Promise Resolves

↓

React Listener Fires

↓

Scheduler

↓

Retry Render

↓

Execute Dashboard()

↓

Reconciliation

↓

Commit Phase

↓

Replace Spinner With Dashboard
```

---

# Key Takeaways

- `import()` returns a Promise because module loading is asynchronous.
- React cannot pause the Render Phase while waiting for the Promise.
- React throws the Promise as a control-flow signal.
- Throwing the Promise immediately stops rendering of the current subtree.
- The nearest Suspense boundary catches the Promise and renders its fallback UI.
- Suspense does **not** pause or cancel the browser's network request.
- React attaches a listener to the Promise.
- When the Promise resolves, React schedules a new render.
- If the Promise rejects, React treats it as an error.
- Suspense handles loading; Error Boundaries handle failures.

---

# Interview Questions

## Why does React throw a Promise?

React throws the Promise to:

1. Stop rendering the current subtree.
2. Transfer control to the nearest Suspense boundary.
3. Retry rendering automatically when the Promise resolves.

---

## What does Suspense suspend?

Suspense suspends **React's rendering of the current subtree**, not the browser's network request.

---

## Does Suspense stop the browser from downloading JavaScript?

No.

The browser continues downloading JavaScript while React displays the fallback UI.

---

## What happens when the Promise resolves?

```text
Promise Resolves

↓

Scheduler

↓

Render Phase

↓

Commit Phase

↓

Replace Fallback With Component
```

---

## What happens when the Promise rejects?

```text
Promise Rejected

↓

Throw Error

↓

Error Boundary

↓

Error UI
```

---

## Suspense vs Error Boundary

| Suspense | Error Boundary |
|----------|----------------|
| Handles pending Promises | Handles thrown Errors |
| Displays fallback while loading | Displays error UI |
| Retries automatically when Promise resolves | Does not retry automatically |
| Represents temporary loading | Represents a failure |
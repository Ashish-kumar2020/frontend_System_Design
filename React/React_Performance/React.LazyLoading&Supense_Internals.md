# 📚 Module 10 - React.lazy & Suspense Internals

---

# What is React.lazy?

`React.lazy()` enables **lazy loading** of React components.

Instead of downloading a component during the initial bundle load, React downloads it only when it is first rendered.

Example:

```jsx
const Dashboard = React.lazy(() => import("./Dashboard"));
```

---

# What Happens Internally?

When React executes:

```jsx
const Dashboard = React.lazy(() => import("./Dashboard"));
```

React **does not** download the component immediately.

Instead, it creates a **Lazy Component Wrapper**.

Conceptually:

```text
React.lazy()

↓

Create Lazy Wrapper

↓

Store import() Function

↓

Wait Until Component Is Rendered
```

No network request is made yet.

---

# First Render

Suppose:

```jsx
function App() {
    return (
        <>
            <Home />
            <Dashboard />
        </>
    );
}
```

Render Flow:

```text
Execute App()

↓

<Home />

↓

<Dashboard />
```

React reaches:

```text
Dashboard
```

Now React asks:

```text
Has Dashboard.js Been Loaded?
```

Initially:

```text
NO
```

---

# Dynamic Import

React executes:

```jsx
import("./Dashboard");
```

This returns:

```text
Promise
```

because downloading JavaScript is asynchronous.

---

# Browser Starts Downloading

```text
Browser

↓

Network Request

↓

Download Dashboard.js
```

At this point:

```text
Dashboard()

↓

Cannot Execute
```

because the component code does not exist in memory yet.

---

# Why React Cannot Continue

Rendering is synchronous.

React cannot pause the Render Phase and wait for:

```text
2 Seconds

↓

Dashboard.js
```

Instead, React suspends rendering of the current subtree.

---

# Suspense

```jsx
<Suspense fallback={<Spinner />}>
    <Dashboard />
</Suspense>
```

Flow:

```text
Render Phase

↓

Reach Lazy Component

↓

Execute import()

↓

Promise Returned

↓

Suspend Rendering

↓

Show Fallback UI
```

The user sees:

```text
Spinner
```

instead of a blank screen.

---

# Browser Continues Downloading

Important:

Suspense **does not** stop the browser.

The browser continues:

```text
Network Request

↓

Download Dashboard.js
```

independently.

---

# Promise Resolves

After download:

```text
Promise

↓

Resolved
```

React is notified.

Flow:

```text
Promise Resolved

↓

Scheduler

↓

Render Phase

↓

Execute Dashboard()

↓

Commit

↓

Replace Spinner With Dashboard
```

Notice:

The Promise simply schedules another render.

Everything still follows React's normal rendering pipeline.

---

# The Biggest Secret

React literally throws the Promise.

Conceptually:

```js
if (moduleNotLoaded) {
    throw promise;
}
```

This is **not** an error.

It is a control-flow signal.

---

# Why Throw the Promise?

Throwing the Promise allows React to:

```text
1. Stop rendering the current subtree.

↓

2. Let the nearest Suspense boundary catch it.

↓

3. Know exactly when to retry rendering after the Promise resolves.
```

This is the core idea behind Suspense.

---

# Suspense Boundary

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

Throw Promise

↓

Walk Up Fiber Tree

↓

Find Suspense Boundary

↓

Render Fallback
```

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

Retry Render

↓

Dashboard Executes

↓

Commit

↓

Replace Fallback
```

---

# Why Not Return null?

If React simply returned:

```jsx
return null;
```

React would not know:

- Is the component intentionally returning `null`?
- Is it still loading?
- Should React retry later?

A thrown Promise clearly communicates:

```text
Component Is Waiting For Async Work

↓

Retry Me When This Promise Resolves
```

---

# Error Boundary vs Suspense

```text
throw Error

↓

Error Boundary

────────────────────────

throw Promise

↓

Suspense Boundary
```

React interprets them differently.

- Error → Something failed.
- Promise → Something is still loading.

---

# Browser vs React

Browser:

```text
Downloads JavaScript
```

React:

```text
Suspends Rendering

↓

Shows Fallback

↓

Waits For Promise

↓

Retries Rendering
```

These are two independent systems.

---

# Complete Internal Flow

```text
App Executes

↓

Reach Lazy Component

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

Nearest Suspense Boundary Catches Promise

↓

Render Fallback

↓

Commit

────────────────────────

Browser Finishes Download

↓

Promise Resolves

↓

Scheduler

↓

Retry Render

↓

Execute Dashboard()

↓

Commit

↓

Replace Spinner With Dashboard
```

---

# Key Takeaways

- `React.lazy()` creates a lazy wrapper, not the component itself.
- The component is downloaded only when it is first rendered.
- `import()` returns a Promise.
- React cannot wait during the Render Phase.
- React throws the Promise as a control-flow signal.
- The nearest Suspense boundary catches the Promise.
- Suspense renders the fallback UI while the browser downloads the module.
- The browser continues downloading independently of React.
- When the Promise resolves, React schedules a new render.
- The loaded component replaces the fallback during the Commit Phase.

---

# Interview Answers

### Why does `import()` return a Promise?

Because downloading JavaScript is an asynchronous network operation.

---

### What does Suspense suspend?

Suspense suspends **React's rendering of the current subtree**, not the browser's network request.

---

### Why does React throw a Promise?

React throws the Promise to:

1. Stop rendering the current subtree.
2. Transfer control to the nearest Suspense boundary.
3. Retry rendering automatically when the Promise resolves.

---

### Does Suspense stop JavaScript from downloading?

No.

The browser continues downloading the JavaScript while React displays the fallback UI.

---

### What happens after the Promise resolves?

```text
Promise Resolves

↓

Scheduler

↓

Render Phase

↓

Commit Phase

↓

Replace Fallback With Actual Component
```
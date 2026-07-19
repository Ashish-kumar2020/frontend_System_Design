# 📚 Module 10 - Memory Leaks in React

---

# What is a Memory Leak?

A memory leak occurs when a component is removed from the UI, but the resources it created continue to exist.

Example:

```text
Component

↓

Unmounted

────────────────────────

Timer

↓

Still Running ❌
```

The component is gone, but the browser is still holding references to external resources.

---

# Why Does It Happen?

React only manages:

- Components
- Fibers
- Hooks
- DOM Updates

React does **not** own:

- Timers
- Event Listeners
- WebSockets
- Browser APIs

Those resources are created by the browser's JavaScript runtime.

---

# Example - setInterval

```jsx
useEffect(() => {
    const id = setInterval(() => {
        console.log("Running...");
    }, 1000);
}, []);
```

Flow:

```text
Component Mounts

↓

useEffect()

↓

setInterval()

↓

Browser Creates Timer
```

---

# Component Unmounts

```text
Component Unmounts

↓

React Removes Fiber

↓

React Removes DOM

↓

Timer Still Running ❌
```

React does **not** automatically call:

```js
clearInterval(id);
```

because React never created the timer.

---

# The Solution

Use the cleanup function.

```jsx
useEffect(() => {
    const id = setInterval(() => {
        console.log("Running...");
    }, 1000);

    return () => {
        clearInterval(id);
    };
}, []);
```

Flow:

```text
Mount

↓

useEffect()

↓

Create Timer

────────────────────────

Unmount

↓

Cleanup Function

↓

clearInterval()

↓

Browser Removes Timer
```

---

# React vs Browser

React:

```text
Runs useEffect()

↓

Runs Cleanup
```

Browser:

```text
Creates Timer

↓

Runs Timer

↓

Removes Timer
```

React coordinates the lifecycle.

The browser owns the resource.

---

# Event Listeners

```jsx
useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
```

Without cleanup:

```text
Component Unmounts

↓

Listener Still Exists

↓

Memory Leak
```

---

# WebSockets

```jsx
useEffect(() => {
    const ws = new WebSocket("wss://example.com");

    return () => {
        ws.close();
    };
}, []);
```

Without cleanup:

```text
Component Unmounts

↓

WebSocket Still Connected

↓

Messages Continue

↓

Memory Leak

↓

Network Waste
```

---

# Fetch Requests

```jsx
useEffect(() => {
    const controller = new AbortController();

    fetch("/api/users", {
        signal: controller.signal,
    });

    return () => {
        controller.abort();
    };
}, []);
```

Why?

If the component unmounts before the request completes:

```text
Request

↓

Still Running

↓

Component Doesn't Need Result
```

Aborting avoids unnecessary work and prevents handling results for components that are no longer interested in them.

---

# Resources That Usually Need Cleanup

```text
setInterval()

↓

clearInterval()

────────────────────────

setTimeout()

↓

clearTimeout()

────────────────────────

addEventListener()

↓

removeEventListener()

────────────────────────

WebSocket()

↓

ws.close()

────────────────────────

fetch()

↓

AbortController.abort()

────────────────────────

Subscriptions

↓

unsubscribe()
```

---

# Internal Lifecycle

```text
Component Mounts

↓

Render Phase

↓

Commit Phase

↓

useEffect()

↓

Create External Resource

────────────────────────

Component Unmounts

↓

Cleanup Function

↓

Destroy External Resource

↓

React Removes Fiber
```

---

# The Golden Rule

Whenever your component creates something outside React, ask:

```text
Who owns this resource?
```

If React doesn't own it:

```text
You must clean it up.
```

---

# Mental Model

```text
useEffect()

↓

Creates Resource

↓

Component Lives

↓

Component Unmounts

↓

Cleanup Function

↓

Destroy Resource
```

---

# Key Takeaways

- Memory leaks occur when external resources outlive the component that created them.
- React does not automatically clean up browser-managed resources.
- Cleanup functions are executed on unmount and before an effect re-runs.
- Timers, event listeners, WebSockets, subscriptions, and long-running async work should usually be cleaned up.
- Always release resources you create outside React.

---

# Interview Answers

## Why doesn't React automatically clear intervals?

Because intervals are created by the browser's JavaScript runtime, not by React. React doesn't own external resources, so developers must clean them up using the cleanup function.

---

## When should you return a cleanup function?

Whenever the effect creates or subscribes to an external resource that has its own lifecycle, such as timers, event listeners, WebSockets, subscriptions, or asynchronous operations that should be canceled.

---

## What happens if a WebSocket isn't closed?

The connection remains active after the component unmounts, continuing to receive messages, consuming memory, network resources, and potentially creating duplicate connections if the component mounts again.

---

## What is the purpose of AbortController with fetch?

It allows you to cancel an in-flight request when the component unmounts or the effect is cleaned up, preventing unnecessary work and avoiding handling results that are no longer needed.
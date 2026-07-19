# 🚀 React Error Boundaries (Interview Notes)

---

# What is an Error Boundary?

An Error Boundary is a React component that catches **rendering errors** in its child component tree and displays a fallback UI instead of crashing the entire application.

---

# Why do we need Error Boundaries?

Without an Error Boundary:

```text
<App>
    ↓
Dashboard
    ↓
Profile 💥
```

Result:

```text
Entire React Tree Unmounts

↓

Blank Screen
```

React prefers showing **nothing** rather than leaving the UI in an inconsistent state.

---

# With Error Boundary

```text
<App>

↓

ErrorBoundary

↓

Dashboard

↓

Profile 💥

↓

Fallback UI
```

Only the protected subtree is replaced.

---

# Error Boundary behaves like

Conceptually similar to:

```js
try {
    renderChildren();
} catch {
    renderFallbackUI();
}
```

But internally React implements it differently.

---

# What does Error Boundary catch?

✅ Errors during Rendering

✅ Errors in Class Component Constructors

✅ Errors in Lifecycle Methods

Example:

```jsx
function Profile() {
    throw new Error("Boom");
}
```

Error Boundary catches it.

---

# What does Error Boundary NOT catch?

❌ Event Handlers

```jsx
<button
    onClick={() => {
        throw new Error("Boom");
    }}
>
```

Use:

```js
try...catch
```

instead.

---

❌ setTimeout()

```jsx
setTimeout(() => {
    throw new Error();
}, 1000);
```

---

❌ Promise.then()

```jsx
fetch(...)
.then(() => {
    throw new Error();
});
```

---

❌ async / await

```jsx
try {
    await fetch(...);
} catch(err) {}
```

Use normal try...catch.

---

❌ Server Side Rendering

Error Boundaries only work on the client.

---

# API Errors vs Render Errors

## API Failure

```jsx
try {
    await fetch(...)
} catch(err) {}
```

Handle using:

✅ try...catch

---

## Render Failure

```jsx
return <h1>{user.name}</h1>
```

If:

```jsx
user = null;
```

Rendering throws.

✅ Error Boundary catches it.

---

# Error Boundary Placement

## Correct

```jsx
<ErrorBoundary>
    <Profile />
</ErrorBoundary>
```

If Profile crashes:

```text
Profile

↓

ErrorBoundary

↓

Fallback UI
```

---

## Incorrect

```jsx
<Profile>

    <ErrorBoundary>

        <Child />

    </ErrorBoundary>

</Profile>
```

If Profile crashes:

```text
Profile

↓

💥

↓

ErrorBoundary never mounts

↓

Cannot Catch
```

Reason:

Error Boundary only catches errors from its **children**, not its parent.

---

# Why can't we create Error Boundary using Hooks?

Wrong idea:

```jsx
function ErrorBoundary({ children }) {

    const [hasError, setHasError] = useState(false);

    try {
        return children;
    } catch {
        setHasError(true);
    }

}
```

This DOES NOT work.

---

# Why?

Function Component Flow

```text
ErrorBoundary()

↓

Hook Executes

↓

return children

↓

Function Finishes ✅

↓

Profile Renders

↓

💥 Error
```

By the time the child throws:

- Parent function has already finished.
- React cannot re-enter the function.
- Hook execution is already over.

---

# Why Class Components Work?

Class Components have a persistent instance.

```jsx
class ErrorBoundary extends React.Component {}
```

React can do:

```text
Profile Throws

↓

Find ErrorBoundary

↓

Update this.state

↓

Re-render

↓

Fallback UI
```

This isn't possible with Hooks.

---

# Internal Flow

```text
Render Phase

↓

Child Throws

↓

Fiber Walks Up

↓

Find Nearest ErrorBoundary

↓

getDerivedStateFromError()

↓

Update State

↓

Re-render Boundary

↓

Fallback UI
```

---

# Interview Questions

## Q1. What is an Error Boundary?

> A React component that catches rendering errors in its descendant components and renders a fallback UI instead of crashing the entire React tree.

---

## Q2. What does Error Boundary catch?

✅ Rendering Errors

✅ Constructors

✅ Lifecycle Methods

---

## Q3. What does Error Boundary NOT catch?

❌ Event Handlers

❌ setTimeout()

❌ Promise.then()

❌ async/await

❌ SSR

---

## Q4. Does Error Boundary catch API errors?

❌ No.

API errors are asynchronous.

Handle them using:

```js
try...catch
```

If bad API data later causes a rendering error:

```jsx
user.name
```

then Error Boundary catches that rendering error.

---

## Q5. Does Error Boundary catch errors inside onClick?

```jsx
<button
    onClick={() => {
        throw new Error();
    }}
>
```

❌ No.

Reason:

Event handlers are not part of React's render phase.

---

## Q6. Will this work?

```jsx
<Profile>

    <ErrorBoundary>

        <Child />

    </ErrorBoundary>

</Profile>
```

❌ No.

Reason:

Profile crashes before ErrorBoundary is mounted.

---

## Q7. Why are Error Boundaries Class Components?

Because function components execute once and finish.

```text
Function Executes

↓

Returns JSX

↓

Execution Ends
```

When a child throws later:

React cannot resume the function.

Class components have a persistent instance.

React updates:

```text
this.state

↓

Re-render

↓

Fallback UI
```

using:

- getDerivedStateFromError()
- componentDidCatch()

---

# Golden Mental Model

```text
Render Error

↓

Fiber Walks Up

↓

Find Nearest ErrorBoundary

↓

Update Boundary State

↓

Render Fallback UI
```

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| Purpose | Prevent entire app from crashing |
| Catches | Render, Constructor, Lifecycle Errors |
| Doesn't Catch | Event Handlers, Async Errors, API Errors |
| API Errors | Handle using try...catch |
| Placement | Wrap parent around risky child |
| Hooks | Cannot implement Error Boundary |
| Reason | Parent function already finished executing |
| Implementation | Class Component |

---

# ⭐ Interview One-Liners

### Error Boundary

> Catches rendering errors in descendant components and displays a fallback UI.

---

### API Error

> Error Boundaries don't catch asynchronous errors like failed API requests.

---

### Event Handler Error

> Handle using try...catch.

---

### Why Class Component?

> Function components finish executing before child rendering begins. React cannot re-enter a completed function, so Error Boundaries rely on class lifecycle methods and a persistent instance.
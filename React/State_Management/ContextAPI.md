# 📚 State Management - Context API (Part 1)

---

# Why Was Context Introduced?

React introduced Context to solve the problem of **Prop Drilling**.

Without Context:

```text
App

↓

Layout

↓

Main

↓

Dashboard

↓

UserProfile
```

Even if only `UserProfile` needs the data, every intermediate component must receive and forward the props.

---

# Prop Drilling

## Definition

Passing props through intermediate components that do not use them, only so a deeply nested component can receive them.

Example:

```text
App

↓

Layout      ❌ Doesn't use user

↓

Main        ❌ Doesn't use user

↓

Dashboard   ❌ Doesn't use user

↓

UserProfile ✅ Uses user
```

Problems:

- Unnecessary prop forwarding.
- Increased coupling.
- Harder to maintain.
- Difficult to refactor.

---

# Context Solves Prop Drilling

Instead of:

```text
App

↓

Layout

↓

Main

↓

Dashboard

↓

UserProfile
```

React provides:

```text
             Context Provider
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
     Header     Dashboard    UserProfile
```

Consumers can access the value directly without intermediate components forwarding props.

---

# Does Context Manage State?

❌ No.

Context is **not** a state management library.

It only shares a value.

Example:

```jsx
const [theme, setTheme] = useState("dark");

<ThemeContext.Provider value={theme}>
```

State Owner:

```text
useState()

↓

Owns theme
```

Context:

```text
Provider

↓

Shares theme
```

Consumer:

```text
useContext()

↓

Reads theme
```

---

# Mental Model

```text
useState

↓

Creates State

────────────────────────

Context.Provider

↓

Shares State

────────────────────────

useContext

↓

Reads State
```

---

# What Changes After setTheme()?

```jsx
setTheme("light");
```

Flow:

```text
setTheme()

↓

Update Queue

↓

Scheduler

↓

Render Phase

↓

Execute App()

↓

useState()

↓

theme = "light"

↓

Provider

value = "light"

↓

React Detects Provider Value Changed

↓

Notify Context Consumers
```

Important:

The **Context object does not change.**

Only the **Provider's value** changes.

---

# Context Object vs Provider Value

## Context Object

```jsx
const ThemeContext = createContext();
```

Created once.

Acts as the identity for the Context.

Never changes.

---

## Provider

```jsx
<ThemeContext.Provider value={theme}>
```

The Provider's `value` changes whenever the state changes.

---

# Mental Model

```text
Context

↓

Blueprint / Identity

────────────────────────

Provider

↓

Current Value

────────────────────────

Consumer

↓

Reads Current Value
```

---

# Which Components Re-render?

Suppose:

```text
App
│
├── Header
├── Sidebar
├── Dashboard
│     └── UserProfile
└── Footer
```

Only:

```jsx
const theme = useContext(ThemeContext);
```

exists inside `UserProfile`.

When:

```jsx
setTheme("light");
```

React performs:

```text
Provider Value Changed

↓

Find ThemeContext Consumers

↓

UserProfile

↓

Schedule UserProfile
```

Context updates target **consumers**, not every component inside the Provider.

---

# Parent Re-render vs Context Propagation

These are two different mechanisms.

## Parent Re-render

```text
Parent Executes

↓

Child Executes

(Unless React.memo bails out)
```

---

## Context Propagation

```text
Provider Value Changed

↓

Find Context Consumers

↓

Schedule Consumer
```

Independent of parent renders.

---

# React.memo + Context

Example:

```jsx
const Dashboard = React.memo(function Dashboard() {
    return <UserProfile />;
});
```

```jsx
function UserProfile() {
    const theme = useContext(ThemeContext);
}
```

Flow:

```text
Provider Value Changed

↓

Dashboard

↓

React.memo

↓

Props Same

↓

Bailout

↓

Skip Dashboard()

────────────────────────

React Context Propagation

↓

Find ThemeContext Consumers

↓

UserProfile

↓

Execute UserProfile()
```

A memoized parent can bail out while a context consumer deeper in the tree still re-renders.

---

# Three Reasons a Component Re-renders

```text
1. Own State Changed

↓

2. Parent Re-rendered

↓

3. Context It Consumes Changed
```

Every React render can be explained using one (or more) of these three reasons.

---

# Complete Context Update Flow

```text
setTheme()

↓

Create Update Object

↓

Hook Update Queue

↓

Scheduler

↓

Render Phase

↓

Execute App()

↓

useState()

↓

New Theme Value

↓

Provider

value = newTheme

↓

React Detects Provider Value Changed

↓

Context Propagation

↓

Find Fibers That Consume ThemeContext

↓

Schedule Consumers

↓

Reconciliation

↓

Commit Phase

↓

DOM Updates

↓

Browser Paint
```

---

# Key Takeaways

- Context solves prop drilling.
- Context does not own state.
- `useState` (or `useReducer`, Redux, Zustand, etc.) owns the state.
- Context only shares values.
- The Context object never changes.
- The Provider's `value` changes.
- React propagates Context updates to consumers.
- Parent re-renders and Context propagation are different mechanisms.
- `React.memo` only blocks parent-triggered renders; it does not block Context updates.
- A component renders for only three reasons:
  - Its own state changed.
  - Its parent rendered.
  - A Context it consumes changed.

---

# Interview Questions

## Does Context manage state?

No. Context only shares values. State is owned by `useState`, `useReducer`, or another state management solution.

---

## What changes when setTheme() is called?

The Provider receives a new `value`. The Context object remains the same.

---

## Does every component inside a Provider re-render when the Provider value changes?

No. Context propagation targets components that consume that specific Context. Parent re-renders are a separate mechanism.

---

## Can a React.memo component still update because of Context?

Yes. `React.memo` only compares props. Context updates are propagated separately to consuming components.

---

## What are the three reasons a React component renders?

1. Its own state changed.
2. Its parent rendered.
3. A Context it consumes changed.
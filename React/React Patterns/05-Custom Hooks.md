
# 🚀 Custom Hooks (Design Pattern) - Interview Notes

---

# What is a Custom Hook?

A Custom Hook is a JavaScript function that:

- Uses one or more React Hooks.
- Starts with the prefix `use`.
- Encapsulates reusable stateful logic.
- Can be reused across multiple components.

Example:

```jsx
function useWindowWidth() {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {

        function handleResize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return width;
}
```

---

# Why do we need Custom Hooks?

Imagine multiple components require the same logic.

```text
Dashboard

↓

Resize Logic

────────────────────

Profile

↓

Resize Logic

────────────────────

Orders

↓

Resize Logic
```

The same code is duplicated.

This violates:

> DRY (Don't Repeat Yourself)

---

# Solution

Move reusable logic into a Custom Hook.

```jsx
function Dashboard() {

    const width = useWindowWidth();

}
```

```jsx
function Profile() {

    const width = useWindowWidth();

}
```

```jsx
function Orders() {

    const width = useWindowWidth();

}
```

Now the logic exists in only one place.

---

# Internal Flow

```text
Component

↓

Calls Custom Hook

↓

Hook Executes

↓

Creates Hooks

↓

Returns Data
```

The hook behaves like a normal function that internally uses React Hooks.

---

# Do Custom Hooks share state?

❌ No.

This is the biggest misconception.

Every component gets its own:

- useState()
- useEffect()
- useMemo()
- useRef()

Example:

```jsx
function A() {

    const { count } = useCounter();

}
```

```jsx
function B() {

    const { count } = useCounter();

}
```

React creates:

```text
Fiber A

↓

useState()

↓

count = 0

────────────────────

Fiber B

↓

useState()

↓

count = 0
```

Independent states.

---

# Why?

Hooks are stored inside each component's Fiber.

Every component has its own Hook Linked List.

```text
Fiber

↓

Hook List

↓

useState

↓

useEffect

↓

useMemo
```

Calling the same Custom Hook from two components creates two separate hook instances.

---

# State is NOT Shared

Example:

```jsx
function useCounter() {

    const [count, setCount] = useState(0);

    return { count, setCount };

}
```

```jsx
function A() {

    const { count, setCount } = useCounter();

}
```

```jsx
function B() {

    const { count, setCount } = useCounter();

}
```

If:

```jsx
setCount(10);
```

inside **A**:

```text
A

↓

count = 10
```

B remains:

```text
count = 0
```

Because each component has its own state.

---

# Shared Logic, NOT Shared State

Remember this forever:

```text
Custom Hooks

↓

Share Logic

❌ NOT State
```

---

# Event Listener Example

```jsx
function useWindowWidth() {

    useEffect(() => {

        window.addEventListener(...);

    }, []);

}
```

Suppose:

```jsx
function Dashboard() {

    useWindowWidth();

}
```

```jsx
function Profile() {

    useWindowWidth();

}
```

How many listeners?

Answer:

```text
Dashboard

↓

Listener #1

────────────────────

Profile

↓

Listener #2
```

Every component executes its own effect.

---

# Isn't this inefficient?

For a few components:

✅ Perfectly fine.

For many components:

```text
50 Components

↓

50 Event Listeners
```

A better approach:

```text
One Provider

↓

One Event Listener

↓

Context

↓

All Components
```

This is where the Provider Pattern becomes useful.

---

# Advantages

✅ Reusable stateful logic

✅ Cleaner components

✅ Better readability

✅ Better maintainability

✅ Separation of concerns

✅ Single source of business logic

---

# Naming Convention

Custom Hooks must start with:

```text
use
```

Examples:

```jsx
useAuth()

useFetch()

useCounter()

useWindowWidth()

useTheme()
```

Reason:

React and ESLint recognize them as Hooks and enforce the Rules of Hooks.

---

# Custom Hook vs Normal Function

## Normal Function

```jsx
function calculateTotal() {

}
```

No React Hooks.

---

## Custom Hook

```jsx
function useCounter() {

    useState();

    useEffect();

}
```

Uses React Hooks internally.

---

# Custom Hook vs Context

## Custom Hook

```text
Shares Logic
```

Every component gets its own state.

---

## Context

```text
Shares State
```

All components consume the same shared value.

---

# Interview Questions

## Q1. What is a Custom Hook?

> A Custom Hook is a reusable JavaScript function that uses React Hooks internally to encapsulate reusable stateful logic.

---

## Q2. Why do we use Custom Hooks?

To reuse stateful logic across multiple components while improving readability, maintainability, and separation of concerns.

---

## Q3. Do Custom Hooks share state?

❌ No.

They share logic.

Each component gets its own independent hook state.

---

## Q4. Why doesn't state get shared?

Because every component has its own Fiber and its own Hook Linked List.

Each call creates a new hook instance.

---

## Q5. If two components call the same Custom Hook, how many useStates are created?

One per component.

Every component gets its own Hook List.

---

## Q6. If two components use `useWindowWidth()`, how many event listeners are added?

One listener per component.

Each hook executes its own `useEffect()`.

---

## Q7. When should you use Context instead?

When multiple components need to share the same state.

Custom Hooks share logic.

Context shares state.

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| Purpose | Reuse Stateful Logic |
| Returns | Logic / State |
| Shares | Logic |
| Doesn't Share | State |
| Naming | Starts with `use` |
| State Location | Component's Fiber |
| Modern React | Preferred over HOC & Render Props |

---

# ⭐ Golden Mental Models

## Custom Hook

```text
Component

↓

Custom Hook

↓

Own State

↓

Own Effect
```

Every component gets its own hook instance.

---

## Logic vs State

```text
Custom Hooks

↓

Share Logic

────────────────────

Context

↓

Share State
```

Remember this difference.

---

# ⭐ Interview One-Liners

### Custom Hook

> A Custom Hook is a reusable function that encapsulates stateful logic using React Hooks.

---

### Why use Custom Hooks?

> They eliminate duplicated stateful logic, improve readability, and keep business logic in one place.

---

### Do Custom Hooks share state?

> No. Every component that calls a Custom Hook gets its own independent state because hooks are tied to the component's Fiber.

---

### Custom Hook vs Context

> Custom Hooks share logic. Context shares state.

---

### Modern React

```text
HOC

↓

Render Props

↓

Custom Hooks ✅
```

Custom Hooks are the preferred pattern for reusing stateful logic in modern React.
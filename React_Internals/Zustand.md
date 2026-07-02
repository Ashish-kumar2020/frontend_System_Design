# 🐻 Zustand

## What is Zustand?

Zustand is a lightweight state management library for React that provides a global store without requiring Providers or boilerplate.

---

# Why Zustand?

* Simple API
* Minimal boilerplate
* No Provider required
* Good performance
* Easy to learn

---

# Create a Store

```javascript
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,

  increment: () =>
    set((state) => ({
      count: state.count + 1
    }))
}));
```

---

# Access State

```javascript
const count = useStore((state) => state.count);
```

---

# Update State

```javascript
const increment = useStore((state) => state.increment);

increment();
```

---

# Data Flow

```text
Component

↓

Action

↓

set()

↓

Store Updated

↓

Subscribed Components Re-render
```

---

# Re-render Behavior

Only components that subscribe to the changed state re-render.

Example:

```javascript
const user = useStore((state) => state.user);
```

If only `theme` changes:

```javascript
set({ theme: "dark" });
```

The component using only `user` does **not** re-render.

---

# Zustand vs Context API

| Zustand                                     | Context API                                        |
| ------------------------------------------- | -------------------------------------------------- |
| No Provider required                        | Requires Provider                                  |
| Global state management                     | Mainly solves prop drilling                        |
| Only subscribed components re-render        | All consumers re-render when context value changes |
| Better for frequently changing global state | Better for small shared state                      |

---

# Zustand vs Redux

| Zustand                           | Redux                                 |
| --------------------------------- | ------------------------------------- |
| Very little boilerplate           | More structured architecture          |
| Easy to set up                    | Store, reducers, actions, dispatch    |
| Direct state updates with `set()` | Updates through dispatched actions    |
| Great for small and medium apps   | Great for large, complex applications |

---

# When to Use Zustand

* Global UI state
* Theme
* Authentication state
* Shopping cart
* User preferences
* Dashboards
* Small to medium applications

---

# Quick Revision

* **Zustand** → Lightweight global state management library.
* **No Provider** required.
* Uses `create()` to create a store.
* Uses `set()` to update state.
* Components subscribe using `useStore()`.
* Only subscribed components re-render when their selected state changes.
* Less boilerplate than Redux.

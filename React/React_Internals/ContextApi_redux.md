# 🗂️ Context API

## Props Drilling

Passing props through multiple intermediate components that don't use the data.

---

## Context API

Allows data to be shared across the component tree without manually passing props.

### Flow

```text
createContext()

↓

Provider

↓

useContext()

↓

Consumer
```

---

## When does Context re-render?

When the **context value changes**, **all components consuming that context** re-render.

Components that **do not consume** the context are not re-rendered because of the context update.

---

## Best Practices

* Create separate contexts for unrelated state.
* Avoid putting the entire application state into one context.
* Good for:

  * Theme
  * User
  * Language
  * Authentication
* Not ideal for frequently changing, large global state.

---

# Redux Architecture

## Redux

Redux is a state management library that stores the application's global state in a **single Store**.

---

## Store

The **single source of truth** for global application state.

Example:

```text
Store

├── user
├── cart
├── products
└── theme
```

---

## Why Redux?

* Eliminates prop drilling.
* Provides centralized state management.
* Keeps data consistent across components.
* Predictable state updates.

---

## Redux Data Flow

```text
Component

↓

dispatch(action)

↓

Reducer

↓

Store Updated

↓

useSelector()

↓

Component Re-renders
```

---

## Core Concepts

* **Store** → Holds global state.
* **Action** → Describes what happened.
* **Dispatch** → Sends an action to Redux.
* **Reducer** → Returns the new state based on the action.
* **useSelector** → Reads data from the store.
* **useDispatch** → Dispatches actions to update the store.

---

## Redux Principles

* Single source of truth.
* State is read-only.
* State is updated only by dispatching actions.
* Reducers must be pure functions.

---

# Context API vs Redux

| Context API                                  | Redux                                                     |
| -------------------------------------------- | --------------------------------------------------------- |
| Built into React                             | External library                                          |
| Solves prop drilling                         | Full state management solution                            |
| Best for small/medium global state           | Best for large applications                               |
| All consumers re-render when context changes | Components re-render only when the selected state changes |
| Simpler                                      | More structured and scalable                              |

---

# Quick Revision

* **Props Drilling** → Passing props through unnecessary intermediate components.
* **Context API** → Share data without prop drilling.
* **Store** → Centralized global state.
* **Action** → Describes a state change.
* **Dispatch** → Sends an action.
* **Reducer** → Computes the next state.
* **useSelector** → Reads state.
* **useDispatch** → Updates state.

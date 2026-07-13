# ⚛️ Hooks Internals - Why Hooks Were Introduced

---

# Before React Hooks

Before React 16.8, React had two types of components:

1. Function Components
2. Class Components

---

# Function Components

```jsx
function Header() {
    return <h1>Hello</h1>;
}
```

Function components could only render UI.

They could **not** have:

- State
- Lifecycle methods

They were commonly called **Stateless Components**.

---

# Class Components

```jsx
class Counter extends React.Component {

    state = {
        count: 0
    };

    render() {
        return (
            <h1>{this.state.count}</h1>
        );
    }

}
```

Class components supported:

- State
- Lifecycle methods
- Event handling
- Complex logic

---

# Problems with Class Components

Even a simple counter required:

- A class
- `extends React.Component`
- `this.state`
- `this.setState`
- Lifecycle methods
- Method binding (in many cases)

Example:

```jsx
class Counter extends React.Component {

    state = {
        count: 0
    };

    render() {
        return (
            <button>
                {this.state.count}
            </button>
        );
    }

}
```

This made components more verbose and harder to understand.

---

# React Team's Goal

React wanted developers to write stateful components using simple functions.

Example:

```jsx
function Counter() {

    const [count, setCount] = useState(0);

    return (
        <button
            onClick={() => setCount(count + 1)}
        >
            {count}
        </button>
    );

}
```

Function components became capable of managing state without classes.

---

# The Challenge

Function components are just JavaScript functions.

Every render React executes:

```jsx
Counter();
```

Again.

And again.

Every function call recreates its local variables.

Example:

```jsx
function Counter() {

    let count = 0;

}
```

Next render:

```jsx
function Counter() {

    let count = 0;

}
```

The previous value is lost.

So React cannot store state inside local variables.

---

# Where Does Hook State Come From?

React stores Hook state inside the component's **Fiber Node**.

Conceptually:

```text
Counter Fiber

↓

memoizedState

↓

Hook Linked List
```

Each Hook object stores its own state.

Example:

```text
Hook

↓

memoizedState = 5
```

When React executes:

```jsx
const [count] = useState();
```

It reads:

```text
Current Fiber

↓

memoizedState

↓

Current Hook

↓

Hook.memoizedState

↓

count = 5
```

React does **not** read state from the function itself.

---

# Relationship with Fiber

Every Function Component has its own Fiber Node.

```text
Counter Component

↓

Fiber Node

↓

memoizedState

↓

Hook 1

↓

Hook 2

↓

Hook 3
```

Each Hook stores:

- Current value (`memoizedState`)
- Update queue
- Pointer to the next Hook

---

# Why Hook Order Matters

React does not identify Hooks by variable names.

Instead, it traverses the Hook linked list.

```text
Hook 1

↓

Hook 2

↓

Hook 3
```

If the order changes:

```jsx
if (condition) {
    useState();
}
```

The Hook linked list becomes misaligned.

This is why Hooks must always be called in the same order.

---

# Complete Flow

```text
Counter()

↓

useState()

↓

Current Fiber

↓

memoizedState

↓

Current Hook

↓

Hook.memoizedState

↓

Return State
```

---

# Key Takeaways

- Before React 16.8, only Class Components could manage state.
- Function Components were stateless.
- React Hooks made it possible to use state and other React features inside Function Components.
- Function local variables cannot preserve state across renders.
- React stores Hook state inside the component's Fiber Node (`memoizedState`).
- Hook state is stored in a linked list attached to the Fiber Node.
- React retrieves Hook values from the Fiber, not from the function.

---

# Interview Questions

## Why were Hooks introduced?

Hooks were introduced to allow Function Components to use state and other React features without requiring Class Components. This made components simpler, more reusable, and easier to understand.

---

## Why can't React store state inside function variables?

Function Components are regular JavaScript functions. Every render calls the function again, recreating all local variables. Therefore, local variables cannot preserve state across renders.

---

## Where is Hook state stored?

Hook state is stored inside the component's Fiber Node. The Fiber's `memoizedState` property points to a linked list of Hook objects, and each Hook object stores its own state and update queue.

---

## How does `useState()` get the previous state?

When React executes `useState()`, it reads the current Hook object from the linked list stored in the component's Fiber Node and returns the value stored in `Hook.memoizedState`.
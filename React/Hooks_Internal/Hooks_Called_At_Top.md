# Why Hooks Must Be Called at the Top Level

React identifies Hooks **by their call order**, not by their variable names.

Each Function Component has a **Fiber Node**, and the Fiber's `memoizedState` points to a **linked list of Hook objects**.

During every render, React traverses this linked list in the exact order the Hooks are called.

```text
Fiber

↓

memoizedState

↓

Hook 1

↓

Hook 2

↓

Hook 3
```

If a Hook is called conditionally, inside a loop, or inside a nested function, the Hook call order changes.

Example:

```jsx
function Counter({ show }) {

    useState();      // Hook 1

    if (show) {
        useState();  // Hook 2 (sometimes skipped)
    }

    useEffect();     // Hook 3
}
```

### First Render (`show = true`)

```text
Hook 1 → useState

↓

Hook 2 → useState

↓

Hook 3 → useEffect
```

### Second Render (`show = false`)

```text
Hook 1 → useState

↓

Hook 2 → useEffect ❌
```

React reads the wrong Hook, causing the Hook linked list to become misaligned.

---

# Why Hooks Cannot Be Called Inside Event Handlers

```jsx
function App() {

    function handleClick() {
        useState(); // ❌ Invalid Hook Call
    }

}
```

Hooks only work during the **Render Phase**.

During rendering, React knows:

- Which component is rendering.
- Which Fiber Node is active.
- Which Hook object should be read next.

```text
Render Phase

↓

Current Fiber

↓

Hook Linked List

↓

useState()
```

An event handler runs **after the Render Phase**.

At that time:

- React is not rendering a component.
- There is no current Fiber.
- React cannot determine which Hook object `useState()` belongs to.

Therefore, React throws an **Invalid Hook Call** error.

---

# Key Takeaways

- Hooks are identified by **call order**, not by variable names.
- Hook state is stored in the Fiber's `memoizedState` linked list.
- Hooks must always be called in the same order on every render.
- Hooks can only be called during the **Render Phase**.
- Hooks cannot be called inside conditions, loops, nested functions, or event handlers.

---

# Interview Answer

Hooks must always be called at the top level because React identifies them by their call order. During rendering, React traverses the Hook linked list stored in the component's Fiber Node. If the Hook order changes or a Hook is called outside the Render Phase, React cannot associate the Hook call with the correct Hook object, resulting in incorrect behavior or an **Invalid Hook Call** error.
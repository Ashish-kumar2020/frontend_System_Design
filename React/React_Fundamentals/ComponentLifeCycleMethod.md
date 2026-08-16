# React Component Lifecycle — Interview Notes

## What is Component Lifecycle?

**Component Lifecycle** describes the different stages a React component goes through during its lifetime.

```text
Mount → Update → Unmount
```

For functional components:

```text
Render → Commit → Effect → Cleanup
```

---

# Class Component Lifecycle

## 1. Mounting

Mounting happens when a class component is created and inserted into the DOM.

```text
constructor()
      ↓
getDerivedStateFromProps()
      ↓
render()
      ↓
componentDidMount()
```

### `constructor()`

Initializes state and binds methods before the component is mounted.

### `getDerivedStateFromProps()`

Used to derive state from props before rendering when this pattern is required.

### `render()`

Returns the React elements that describe the UI.

### `componentDidMount()`

Runs after the component is mounted.

**Common uses:**

- API calls
- Subscriptions
- Timers
- DOM operations

---

# 2. Updating

An update can happen because of:

- State changes
- Props changes

```text
getDerivedStateFromProps()
          ↓
shouldComponentUpdate()
          ↓
render()
          ↓
getSnapshotBeforeUpdate()
          ↓
componentDidUpdate()
```

### `shouldComponentUpdate()`

Determines whether the component should continue with the update.

```js
shouldComponentUpdate(nextProps, nextState) {
    return true;
}
```

If it returns `false`, the component's update is skipped.

```text
shouldComponentUpdate()
        ↓
   ┌────┴────┐
 true       false
  ↓           ↓
render      skip update
```

### `getSnapshotBeforeUpdate()`

Captures information from the DOM immediately before React commits an update.

### `componentDidUpdate()`

Runs after React commits an update.

---

# 3. Unmounting

Unmounting happens when React removes the component from the DOM.

### `componentWillUnmount()`

Runs before the component is removed and is used for cleanup.

**Common cleanup:**

- Timers
- Event listeners
- Subscriptions
- WebSocket connections

```js
componentWillUnmount() {
    clearInterval(this.timer);
}
```

---

# Complete Class Lifecycle

```text
                 MOUNT
                   │
                   ▼
              constructor()
                   │
                   ▼
        getDerivedStateFromProps()
                   │
                   ▼
                render()
                   │
                   ▼
          componentDidMount()
                   │
                   │
             State/Props change
                   │
                   ▼
                UPDATE
                   │
                   ▼
        getDerivedStateFromProps()
                   │
                   ▼
        shouldComponentUpdate()
              /          \
           true          false
            ↓              ↓
         render         skip update
            ↓
   getSnapshotBeforeUpdate()
            ↓
    componentDidUpdate()
                   │
                   │
                 UNMOUNT
                   ↓
        componentWillUnmount()
```

---

# Functional Component Lifecycle

Functional components don't have class lifecycle methods.

React executes the component function during rendering, while Hooks such as `useEffect` are used to synchronize with external systems and perform cleanup.

## Mount

```text
Component Function Executes
          ↓
      Render Phase
          ↓
      Commit Phase
          ↓
      useEffect Runs
```

Example:

```jsx
function App() {
    useEffect(() => {
        console.log("Effect runs");

        return () => {
            console.log("Cleanup");
        };
    }, []);

    return <div>Hello</div>;
}
```

---

# Functional Component — Update

When state or props change:

```text
State / Props Change
        ↓
Component Function Executes
        ↓
Render Phase
        ↓
Commit Phase
        ↓
Previous Effect Cleanup
        ↓
New Effect Runs
```

Example:

```jsx
useEffect(() => {
    console.log("Effect");

    return () => {
        console.log("Cleanup");
    };
}, [count]);
```

When `count` changes:

```text
count changes
     ↓
render
     ↓
commit
     ↓
previous cleanup
     ↓
new effect
```

### Important

Cleanup does **not** run after every render.

It runs when:

1. The effect is going to run again because its dependencies changed.
2. The component is unmounting.

---

# Functional Component — Unmount

When the component is removed:

```text
Component Unmounts
       ↓
Effect Cleanup
```

Example:

```jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log("Running");
    }, 1000);

    return () => {
        clearInterval(timer);
    };
}, []);
```

The returned function is the **cleanup function**.

---

# Render Phase vs Commit Phase

## Render Phase

React determines what the UI should look like and calculates the required changes.

```text
State Update
     ↓
Render Phase
     ↓
"What should the UI look like?"
```

## Commit Phase

React applies the required changes to the host environment, such as the DOM.

```text
Render
  ↓
Commit
  ↓
DOM Changes
```

### Important

**Render does not necessarily mean the DOM was changed.**

```text
State Update
     ↓
Render
     ↓
React calculates changes
     ↓
Commit
     ↓
Only required DOM changes are applied
```

---

# `useEffect` — Important Interview Point

❌ Don't say:

> "`useEffect` is the replacement for `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`."

This is an oversimplification.

### Better interview answer

> "`useEffect` is used to synchronize a component with external systems after React commits, and it can return cleanup logic that runs before the effect re-runs or when the component unmounts."

---

# Class vs Functional Components

| Class Component | Functional Component |
|---|---|
| `constructor()` | Component function |
| `render()` | Component function |
| `componentDidMount()` | `useEffect()` |
| `componentDidUpdate()` | `useEffect()` with dependencies |
| `componentWillUnmount()` | Effect cleanup |
| `shouldComponentUpdate()` | `React.memo` / other optimizations |

---

# Quick Revision

## Class

```text
Mount:
constructor
    ↓
getDerivedStateFromProps
    ↓
render
    ↓
componentDidMount

Update:
getDerivedStateFromProps
    ↓
shouldComponentUpdate
    ↓
render
    ↓
getSnapshotBeforeUpdate
    ↓
componentDidUpdate

Unmount:
componentWillUnmount
```

## Functional

```text
Mount:
Function
 ↓
Render
 ↓
Commit
 ↓
Effect

Update:
State / Props
 ↓
Render
 ↓
Commit
 ↓
Previous Cleanup
 ↓
New Effect

Unmount:
Unmount
 ↓
Cleanup
```

---

# 🎯 Interview Answer

> **"Class components use lifecycle methods such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`, while functional components use rendering and Hooks such as `useEffect` to synchronize with external systems and perform cleanup."**

---

# 🧠 Final Mental Model

```text
React Component
      ↓
   RENDER
      ↓
   COMMIT
      ↓
   EFFECT
      ↓
State / Props Change
      ↓
   RENDER
      ↓
   COMMIT
      ↓
CLEANUP → NEW EFFECT
      ↓
   UNMOUNT
      ↓
   CLEANUP
```

---

# 🔥 Key Interview Points

- **Mount** → Component is created and inserted.
- **Update** → Props or state cause new rendering work.
- **Unmount** → Component is removed.
- **Render phase** → React calculates what the UI should look like.
- **Commit phase** → React applies required changes.
- `componentDidMount()` runs after mounting.
- `componentDidUpdate()` runs after an update.
- `componentWillUnmount()` is used for cleanup.
- `useEffect()` runs after commit.
- Effect cleanup runs before an effect re-runs and on unmount.
- `shouldComponentUpdate()` can prevent an update to that component.
- Don't equate `useEffect()` directly with all class lifecycle methods.
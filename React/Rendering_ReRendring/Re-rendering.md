# ⚛️ React Rendering & Re-rendering

---

# What is Rendering?

Rendering is **not** updating the DOM.

Rendering is the process where React:

- Executes component functions
- Generates JSX (React Elements)
- Builds/updates the Fiber Tree
- Performs Reconciliation
- Determines what needs to change

The actual DOM is updated later during the **Commit Phase**.

---

# Rendering Flow

```text
State Changes

↓

Schedule Render

↓

Render Phase

↓

Execute Component

↓

Generate JSX

↓

Create React Elements

↓

Build/Update Fiber Tree

↓

Reconciliation

↓

Determine Changes

────────────────────────

Commit Phase

↓

Update Real DOM

↓

Browser Paint

↓

Run useEffect()
```

---

# What Happens During Rendering?

Example:

```jsx
function App() {
    return <h1>Hello React</h1>;
}
```

During the Render Phase:

```text
Execute App()

↓

Generate JSX

↓

Create React Element

↓

Build Fiber Tree

↓

Compare with Previous Fiber Tree

↓

Determine DOM Changes
```

No DOM updates happen here.

---

# What Happens During Commit?

After reconciliation:

```text
Commit Phase

↓

Update Real DOM

↓

Browser Paint

↓

Run useEffect()
```

Only the Commit Phase updates the DOM.

---

# Rendering vs DOM Update

These are **not the same thing**.

### Rendering

```text
Execute Component Function
```

### DOM Update

```text
Apply Changes to Real DOM
```

A component can render many times without causing a DOM update.

---

# What Triggers a Re-render?

A component re-renders when:

- State changes (`setState`)
- Props change
- Context value changes
- Parent component re-renders

---

# Re-render Flow

```text
setState()

↓

Create Update

↓

Schedule Render

↓

Render Phase

↓

Execute Component

↓

Build Fiber Tree

↓

Reconciliation

↓

Commit Phase

↓

Update DOM

↓

Run useEffect()
```

---

# Parent → Child Re-render Flow

Consider:

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    return (
        <>
            <button onClick={() => setCount(c => c + 1)}>
                {count}
            </button>

            <Child />
        </>
    );
}
```

When the parent state changes:

```text
Parent Render

↓

Child Render

↓

Reconciliation

↓

Commit
```

By default, **children also render** when the parent renders.

---

# Does Child Rendering Mean DOM Updates?

No.

Example:

```jsx
function Child() {
    return <h1>Hello</h1>;
}
```

Flow:

```text
Child Render

↓

Returns Same JSX

↓

Reconciliation

↓

No DOM Changes
```

A component rendering does **not** necessarily mean the DOM updates.

---

# Rendering vs DOM Update

```text
Component Render

≠

DOM Update
```

A component may render multiple times, but React updates the DOM only if reconciliation detects changes.

---

# React.memo

`React.memo` memoizes a component.

It helps skip unnecessary renders when the component receives the same props.

Example:

```jsx
const Child = React.memo(function Child() {
    return <h1>Hello</h1>;
});
```

---

# Without React.memo

```text
Parent Render

↓

Child Render

↓

Reconciliation

↓

Commit
```

The child always renders when the parent renders.

---

# With React.memo

Flow:

```text
Parent Render

↓

Reach Child

↓

React.memo

↓

Compare Previous Props

↓

Compare Current Props

↓

Props Changed?

├── No
│
│   Skip Child Render
│
└── Yes
    │
    ▼
Execute Child

↓

Continue Rendering
```

If props haven't changed, React skips executing the child component.

---

# Important

`React.memo` does **not** prevent all re-renders.

It only skips renders caused by **unchanged props**.

If the child component's own state changes:

```jsx
setState(...)
```

the child still re-renders.

---

# React.memo Internals

When React reaches a memoized component:

```text
Parent Render

↓

Reach Memo Component

↓

Compare Previous Props

↓

Compare Current Props

↓

Shallow Comparison (Object.is)

↓

Props Changed?

├── No
│
│   Return Previous Result
│
│   Skip Child Render
│
└── Yes
    │
    ▼
Execute Child

↓

Continue Rendering
```

---

# Complete Rendering Pipeline

```text
setState()

↓

Create Update

↓

Scheduler

↓

Render Phase

↓

Execute Parent

↓

Execute Children

↓

React.memo Check

↓

Reconciliation

↓

Commit Phase

↓

Update Real DOM

↓

Browser Paint

↓

Run useEffect()
```

---

# Key Takeaways

- Rendering means calculating the next UI.
- The Render Phase never updates the DOM.
- The Commit Phase updates the DOM.
- State, props, context, or parent renders can trigger a re-render.
- By default, parent re-renders also render child components.
- Rendering a component does not mean the DOM changes.
- `React.memo` compares props using shallow comparison.
- If props are unchanged, React skips executing the child component.
- `React.memo` does not prevent re-renders caused by the component's own state or context changes.

---

# Interview Questions

## What is rendering in React?

Rendering is the process where React executes component functions, generates React elements, builds or updates the Fiber tree, and performs reconciliation to determine what needs to change. The DOM is updated later during the Commit Phase.

---

## Does rendering mean updating the DOM?

No. Rendering calculates what the UI should look like. The actual DOM updates happen during the Commit Phase.

---

## What triggers a re-render?

A component re-renders when:

- State changes
- Props change
- Context changes
- Parent component re-renders

---

## Does a parent re-render always re-render its children?

Yes, by default. React executes child components again when the parent re-renders unless an optimization such as `React.memo` skips the child render.

---

## Does a component render always cause a DOM update?

No. A component may render many times, but React updates the DOM only if reconciliation detects changes.

---

## How does React.memo work?

`React.memo` performs a shallow comparison of the previous and current props. If the props are unchanged, React skips executing the component. If any prop changes, React renders the component normally.
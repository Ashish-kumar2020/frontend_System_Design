# ⚛️ React Rendering - Render Phase vs Commit Phase

---

# React Rendering has Two Phases

Whenever React needs to update the UI, it performs the work in two separate phases.

```text
React Rendering

──────────────

1. Render Phase

2. Commit Phase
```

---

# Why Two Phases?

React first calculates **what should change**.

Only after all calculations are complete does React update the Real DOM.

This separation allows React to:

- Calculate changes without touching the browser.
- Restart or discard renders if necessary.
- Update the Real DOM only once.

---

# Complete Rendering Flow

```text
User Click
      │
      ▼
setState()
      │
      ▼
Queue Update
      │
      ▼
Process Update Queue
      │
      ▼
Update Internal State
      │
      ▼
──────────────────────────
Render Phase
──────────────────────────
      │
      ▼
Call Component Function
      │
      ▼
Create React Elements
      │
      ▼
Create New React Element Tree
      │
      ▼
Reconciliation
      │
      ▼
Diffing Algorithm
      │
      ▼
Prepare DOM Operations
      │
      ▼
──────────────────────────
Commit Phase
──────────────────────────
      │
      ▼
Update Real DOM
      │
      ▼
Browser Detects DOM Changes
      │
      ▼
Style Calculation
      │
      ▼
Layout / Reflow (if needed)
      │
      ▼
Paint
      │
      ▼
Composite
      │
      ▼
Updated UI
```

---

# Render Phase

The Render Phase is the **calculation phase**.

React only determines **what the UI should look like**.

During this phase React:

- Calls component functions.
- Executes JSX.
- Creates React Elements.
- Creates a new React Element Tree.
- Performs Reconciliation.
- Runs the Diffing Algorithm.
- Determines the DOM updates that will be required.

React **does not** modify the Real DOM during this phase.

---

# Example

```jsx
function App() {
    const [count, setCount] = useState(0);

    console.log("Rendering");

    return <h1>{count}</h1>;
}
```

User clicks:

```jsx
setCount(1);
```

Render Phase:

```text
Call App()

↓

console.log("Rendering")

↓

Create React Elements

↓

Create New React Element Tree

↓

Reconciliation

↓

Diffing

↓

Prepare DOM Operations
```

No DOM updates occur yet.

---

# Commit Phase

Once React knows exactly what changed, it enters the Commit Phase.

During this phase React:

- Updates the Real DOM.
- Attaches refs.
- Completes the DOM changes.

After React updates the Real DOM, the browser performs its rendering pipeline.

```text
Commit Phase

↓

Update Real DOM

↓

Browser Rendering Pipeline

↓

Updated Screen
```

---

# Browser Rendering Pipeline

After React updates the Real DOM, the browser performs:

```text
DOM Update
      │
      ▼
Style Calculation
      │
      ▼
Layout / Reflow (if needed)
      │
      ▼
Paint
      │
      ▼
Composite
      │
      ▼
Screen Updated
```

React's responsibility ends after updating the Real DOM.

The browser is responsible for displaying the updated UI.

---

# Where does console.log() run?

Example:

```jsx
function App() {

    console.log("Rendering");

    return <h1>Hello</h1>;
}
```

React executes:

```js
App();
```

during the Render Phase.

Therefore:

```text
Render Phase

↓

console.log()

↓

Create React Elements

↓

Reconciliation

↓

Commit Phase

↓

DOM Update
```

The console log appears **before** the Real DOM is updated.

---

# Render Phase vs Commit Phase

| Render Phase | Commit Phase |
|--------------|--------------|
| Calculates the next UI | Applies changes to the Real DOM |
| Calls component functions | Updates the browser DOM |
| Creates React Elements | Attaches refs |
| Creates new React Element Tree | Browser starts rendering pipeline |
| Performs Reconciliation | UI becomes visible |
| Runs Diffing Algorithm | Cannot be interrupted |
| No DOM updates | Updates the Real DOM |

---

# Can React Interrupt the Render Phase?

Yes.

React can safely stop rendering and restart later because:

- The Real DOM has not been modified.
- The browser has not painted anything.
- Everything exists only in memory.

Example:

```text
Render Started

↓

Create React Elements

↓

Higher Priority Update Arrives

↓

Discard Current Render

↓

Start Rendering Again
```

Nothing visible changes because React has not committed anything yet.

---

# Can React Interrupt the Commit Phase?

No.

During the Commit Phase React is modifying the Real DOM.

Once the DOM starts changing:

```text
Commit Started

↓

Update DOM

↓

Browser Uses Updated DOM
```

React cannot safely discard this work because the browser is already using the updated DOM.

---

# Why Must the Render Phase Be Pure?

React may execute the Render Phase multiple times.

For this reason, rendering should contain only calculations.

Safe:

```jsx
const fullName = firstName + lastName;

const filteredUsers = users.filter(...);

return <h1>{count}</h1>;
```

Unsafe:

```jsx
fetch("/users");

setTimeout(...);

document.querySelector(...);

localStorage.setItem(...);
```

These operations are side effects.

If React discards and restarts the render, these side effects would execute multiple times.

---

# Why useEffect Exists

Instead of:

```jsx
function App() {

    fetch("/users");

    return <div />;
}
```

Use:

```jsx
useEffect(() => {
    fetch("/users");
}, []);
```

`useEffect` runs after React has committed the DOM updates, making it the appropriate place for side effects.

---

# Mental Model

Render Phase

```text
Think

↓

Calculate

↓

Compare

↓

Prepare Updates

↓

NO DOM Changes
```

Commit Phase

```text
Apply Changes

↓

Update Real DOM

↓

Browser Paint

↓

Updated Screen
```

---

# Complete React Rendering Pipeline

```text
State Update
      │
      ▼
Render Phase
      │
      ▼
Call Component Function
      │
      ▼
Create React Elements
      │
      ▼
Create New React Element Tree
      │
      ▼
Reconciliation
      │
      ▼
Diffing Algorithm
      │
      ▼
Prepare DOM Operations
      │
      ▼
Commit Phase
      │
      ▼
Update Real DOM
      │
      ▼
Browser Rendering Pipeline
      │
      ▼
Screen Updated
```

---

# Important Notes

- React rendering consists of two phases.
- The Render Phase only calculates the next UI.
- The Commit Phase updates the Real DOM.
- `console.log()` inside a component runs during the Render Phase.
- React can interrupt and restart the Render Phase.
- React cannot interrupt the Commit Phase.
- Rendering should be pure because React may render multiple times before committing.
- Side effects belong in `useEffect`, not inside the component body.

---

# Interview Questions

## What happens during the Render Phase?

React calls component functions, creates React Elements, builds the new React Element Tree, performs Reconciliation and Diffing, and prepares the DOM updates. No Real DOM changes occur during this phase.

---

## What happens during the Commit Phase?

React applies the calculated changes to the Real DOM. After that, the browser performs style calculation, layout, paint, and compositing to display the updated UI.

---

## Why can React interrupt the Render Phase?

Because the Render Phase only performs calculations in memory and does not modify the Real DOM.

---

## Why can't React interrupt the Commit Phase?

Because React is actively updating the Real DOM. Once those changes begin, the browser relies on them to render the UI.

---

## Why should the Render Phase be pure?

Because React may render a component multiple times before committing. Pure rendering ensures that restarting or discarding a render does not cause unwanted side effects.

---

# Key Takeaways

- React rendering consists of the Render Phase and the Commit Phase.
- The Render Phase calculates the next UI without modifying the Real DOM.
- The Commit Phase applies the calculated changes to the Real DOM.
- The browser updates the visible UI only after the Commit Phase.
- The Render Phase can be interrupted and restarted.
- The Commit Phase cannot be interrupted.
- Rendering must remain pure because React may render multiple times.
- Side effects should be placed in `useEffect`.
```
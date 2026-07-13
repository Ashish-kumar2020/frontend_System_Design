# ⚛️ Hooks Internals - Hook Execution Order

---

# How Does React Identify Hooks?

React does **not** identify Hooks by:

- Variable name ❌
- Hook type ❌
- Line number ❌

React identifies Hooks **only by their execution order**.

---

# First Render

Consider:

```jsx
function App() {
    const [count] = useState(0);
    const [name] = useState("Ashish");
    const ref = useRef();

    return <h1>Hello</h1>;
}
```

During the first render, React creates a Hook object for every Hook call.

```text
Fiber
│
▼
Hook1 (useState)
│
▼
Hook2 (useState)
│
▼
Hook3 (useRef)
```

These Hooks are linked together to form the Hook linked list.

---

# Second Render

On the next render, React **does not create new Hook objects**.

Instead, it walks through the existing Hook linked list in the exact same order.

```text
Render Starts

↓

currentHook = Fiber.memoizedState

↓

Read Hook1

↓

Move Pointer

↓

Read Hook2

↓

Move Pointer

↓

Read Hook3

↓

Done
```

Each Hook call matches the next Hook object in the linked list.

---

# Example

```jsx
function App() {
    const [count] = useState(0);
    const [name] = useState("Ashish");
    const ref = useRef();
}
```

Execution order:

```text
1. useState()

↓

2. useState()

↓

3. useRef()
```

React walks:

```text
Hook1

↓

Hook2

↓

Hook3
```

The order remains identical on every render.

---

# What Happens If the Order Changes?

Example:

```jsx
function App() {
    const [count] = useState(0);

    if (count > 0) {
        useEffect(() => {});
    }

    const ref = useRef();
}
```

---

## First Render

Suppose:

```text
count = 0
```

Execution order:

```text
1. useState()

2. useRef()
```

Hook linked list:

```text
Hook1 → useState

↓

Hook2 → useRef
```

---

## Second Render

Suppose:

```text
count = 1
```

Execution order:

```text
1. useState()

2. useEffect()

3. useRef()
```

React still walks the existing Hook linked list.

```text
Hook1 → useState ✅

↓

Hook2 → Expected useEffect ❌
         Actually useRef
```

From this point onward, every subsequent Hook is matched with the wrong Hook object.

The Hook linked list becomes misaligned.

---

# Why React Throws an Error

React throws errors such as:

```text
Rendered more hooks than during the previous render.
```

or

```text
Rendered fewer hooks than expected.
```

because the Hook execution order no longer matches the Hook linked list created during previous renders.

---

# Why Hooks Must Be Called at the Top Level

React expects the Hook order to remain the same on every render.

Correct:

```text
Render 1

1. useState
2. useEffect
3. useRef

────────────────────

Render 2

1. useState
2. useEffect
3. useRef
```

Incorrect:

```text
Render 1

1. useState
2. useRef

────────────────────

Render 2

1. useState
2. useEffect
3. useRef
```

Changing the execution order breaks the Hook mapping.

---

# Complete Internal Flow

```text
Render Starts

↓

currentHook = Fiber.memoizedState

↓

Encounter Hook Call

↓

Read currentHook

↓

Move Pointer

↓

Encounter Next Hook

↓

Read currentHook

↓

Move Pointer

↓

Repeat Until Render Ends
```

---

# Key Takeaways

- React identifies Hooks by their execution order.
- Hook objects are created during the initial render.
- On subsequent renders, React walks the existing Hook linked list.
- React maintains a pointer (`currentHook`) to traverse the linked list.
- Every Hook call must occur in the same order on every render.
- Calling Hooks conditionally changes the execution order and breaks the Hook mapping.
- This is the reason behind the Rules of Hooks.

---

# Interview Questions

## How does React identify Hooks internally?

React identifies Hooks by their execution order. During every render, it walks the Hook linked list sequentially, matching each Hook call with the next Hook object in the list.

---

## Why can't Hooks be called conditionally?

Calling Hooks conditionally changes their execution order between renders. React associates Hook calls with Hook objects based solely on their order. When the order changes, React reads the wrong Hook objects, causing the Hook linked list to become misaligned.

---

## Does React create new Hook objects on every render?

No. Hook objects are created during the initial render. On subsequent renders, React traverses the existing Hook linked list, reading and updating each Hook in order.

---

## Why do the Rules of Hooks exist?

The Rules of Hooks ensure that Hooks are called in the same order on every render. This allows React to correctly associate each Hook call with its corresponding Hook object in the linked list.
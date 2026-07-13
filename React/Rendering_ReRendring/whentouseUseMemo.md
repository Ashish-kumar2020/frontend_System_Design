# ⚛️ React Rendering & Re-rendering - When `useMemo` Actually Helps

---

# Why Do We Need `useMemo`?

Without `useMemo`, objects, arrays, and computed values created inside a component are recreated on every render.

This creates a **new reference**, even if the contents remain the same.

Since `React.memo` performs a shallow comparison, the new reference causes the comparison to fail.

---

# Example Without `useMemo`

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    const user = {
        name: "Ashish",
        age: 26,
    };

    return <Child user={user} />;
}

const Child = React.memo(function Child({ user }) {
    return <h1>{user.name}</h1>;
});
```

---

# Internal Flow (Without `useMemo`)

```text
Parent Render

↓

JavaScript Executes

↓

Create Object #1

↓

Pass Object #1 to Child

↓

React Stores

memoizedProps.user = Object #1

────────────────────────────

Parent Re-renders

↓

JavaScript Executes Again

↓

Create Object #2

↓

Pass Object #2 to Child

↓

React.memo

↓

Compare

Object #1

vs

Object #2

↓

Object.is()

↓

false

↓

Props Changed

↓

Execute Child()
```

Although the object contents are identical, the references are different.

---

# Why?

Every render executes:

```jsx
const user = {
    name: "Ashish",
    age: 26,
};
```

JavaScript creates a **new object** every time.

```text
Object #1

≠

Object #2
```

React compares references, not object contents.

---

# Using `useMemo`

```jsx
const user = useMemo(() => {
    return {
        name: "Ashish",
        age: 26,
    };
}, []);
```

---

# Internal Flow (With `useMemo`)

```text
Parent Render

↓

useMemo()

↓

Dependencies Changed?

├── Yes
│
│   Create Object #1
│
│   Store in Hook.memoizedState
│
│   Return Object #1
│
└── No
    │
    ▼
Return Cached Object #1

↓

Pass Object #1 to Child

↓

React.memo

↓

Compare

Object #1

vs

Object #1

↓

Object.is()

↓

true

↓

Bailout

↓

Skip Child()
```

The object reference remains stable.

---

# Relationship Between `useMemo` and `React.memo`

```text
Parent Render

↓

useMemo

↓

Return Stable Object

↓

Pass as Props

↓

React.memo

↓

Compare Props

↓

Same Reference?

├── Yes
│
│   Bailout
│
│   Skip Child Render
│
└── No
    │
    ▼
Execute Child()
```

`useMemo` and `React.memo` complement each other.

---

# Responsibilities

## useMemo

```text
Memoizes Data

↓

Object

↓

Array

↓

Computed Value
```

Its responsibility is to **keep references stable**.

---

## React.memo

```text
Memoizes Component Rendering

↓

Compare Props

↓

Skip Rendering
```

Its responsibility is to **prevent unnecessary component renders**.

---

# useMemo vs React.memo

| useMemo | React.memo |
|----------|------------|
| Memoizes a value | Memoizes a component |
| Returns the same object, array, or computed value while dependencies are unchanged | Skips executing the component if props haven't changed |
| Runs inside the parent component | Wraps the child component |
| Helps maintain stable references | Helps prevent unnecessary re-renders |

---

# Complete Mental Model

```text
Parent Render

↓

useMemo

↓

Keep Value Stable

↓

Pass Stable Props

↓

React.memo

↓

Compare Previous Props

↓

Same?

├── Yes
│
│   Bailout
│
│   Skip Child Render
│
└── No
    │
    ▼
Execute Child()
```

---

# Key Takeaways

- Objects and arrays created during rendering receive a new reference every render.
- `React.memo` performs a shallow reference comparison using `Object.is()`.
- New object references cause `React.memo` to re-render the child.
- `useMemo` caches the object or array and returns the same reference until dependencies change.
- Stable references allow `React.memo` to perform a successful bailout.
- `useMemo` memoizes **values**.
- `React.memo` memoizes **component rendering**.

---

# Interview Questions

## Why is `useMemo` often used with `React.memo`?

`React.memo` performs a shallow comparison of props. Objects and arrays created during rendering receive a new reference every render, causing the comparison to fail. `useMemo` caches these values and returns the same reference until dependencies change, allowing `React.memo` to skip unnecessary renders.

---

## Does `React.memo` compare object contents?

No. `React.memo` performs a shallow comparison using `Object.is()` for each prop. For objects and arrays, only the references are compared.

---

## What is the difference between `useMemo` and `React.memo`?

`useMemo` memoizes values such as objects, arrays, or expensive computed results, while `React.memo` memoizes component rendering by skipping execution when props remain unchanged.

---

# Complete Process in One Sentence

When a parent re-renders, `useMemo` returns the previously cached value if its dependencies haven't changed, preserving the same reference; `React.memo` then compares the child's previous `memoizedProps` with the new `pendingProps`, performs a bailout if the references are unchanged, and skips executing the child component.
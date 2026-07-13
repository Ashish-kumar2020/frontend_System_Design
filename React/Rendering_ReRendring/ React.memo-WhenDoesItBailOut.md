# ⚛️ React.memo - When Does It Bail Out?

---

# Does a Parent Re-render Always Cause a Memoized Child to Re-render?

**No.**

A parent re-render does **not** automatically mean a child wrapped with `React.memo` will re-render.

`React.memo` only cares about **the child's props**.

---

# React.memo Decision Flow

```text
Parent Re-renders

↓

React.memo

↓

Compare Previous Props

↓

Compare Current Props

↓

Props Same?

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

The reason the parent re-rendered is irrelevant.

Only the child's props are checked.

---

# Case 1 - Parent State Changes (Child Props Same)

```jsx
function Parent() {
    const [count, setCount] = useState(0);

    return <Child name="Ashish" />;
}
```

User clicks:

```jsx
setCount(c => c + 1);
```

Flow:

```text
Parent State Changes

↓

Parent Render

↓

Child Props

name = "Ashish"

↓

React.memo

↓

Props Same

↓

Bailout

↓

Skip Child
```

`React.memo` successfully skips the child render.

---

# Case 2 - Child Props Change

```jsx
function Parent() {
    const [name, setName] = useState("Ashish");

    return <Child name={name} />;
}
```

User updates:

```jsx
setName("Rahul");
```

Flow:

```text
Parent State Changes

↓

Parent Render

↓

Child Props

"Ashish"

↓

"Rahul"

↓

React.memo

↓

Props Changed

↓

Execute Child()
```

The child re-renders because its props changed.

---

# Case 3 - New Object Created Every Render

```jsx
const user = {
    name: "Ashish",
};

return <Child user={user} />;
```

Flow:

```text
Parent Render

↓

Create Object #1

────────────────────────

Parent Render Again

↓

Create Object #2

↓

React.memo

↓

Object #1

≠

Object #2

↓

Props Changed

↓

Execute Child()
```

Although the object contents are identical, the references are different.

This is why `useMemo` is useful.

---

# What Does React.memo Actually Check?

React never asks:

```text
Did Parent Render?
```

Instead, it asks:

```text
Did Child Props Change?
```

That's the only decision it makes.

---

# The Rule

```text
Parent Re-render

↓

React.memo

↓

Compare Child Props

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

---

# Key Takeaways

- A parent re-render does not automatically re-render a memoized child.
- `React.memo` ignores why the parent rendered.
- `React.memo` only compares the child's previous and current props.
- If props are unchanged, React performs a bailout.
- If props change (including new object, array, or function references), the child renders.
- Stable references from `useMemo` and `useCallback` help `React.memo` perform successful bailouts.

---

# Interview Questions

## Does a parent re-render always cause a memoized child to re-render?

No. `React.memo` compares the child's previous and current props. If the props are referentially equal, React performs a bailout and skips rendering the child.

---

## What does `React.memo` actually compare?

`React.memo` compares the child's previous `memoizedProps` with the new `pendingProps` using a shallow comparison (`Object.is()` for each prop).

---

## Why doesn't `React.memo` skip rendering when passing a new object?

Because JavaScript creates a new object reference on every render. Even if the contents are identical, the references differ, causing the shallow comparison to fail.

---

# Complete Process in One Sentence

When a parent re-renders, `React.memo` compares the child's previously committed `memoizedProps` with the new `pendingProps`; if the props are referentially equal it performs a bailout and skips rendering the child, otherwise it executes the child component normally.
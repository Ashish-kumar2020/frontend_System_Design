# ⚛️ `useMemo` vs `React.memo` (Most Common Confusion)

---

# Common Misconception

❌ Incorrect:

- `useMemo` creates the same object.
- `React.memo` creates the same object reference.

Neither statement is correct.

---

# Correct Understanding

## `useMemo`

Its responsibility is to **cache a value** (object, array, or computed value).

If dependencies haven't changed:

- It does **not** execute the callback again.
- It returns the **previously cached value/reference**.

---

## `React.memo`

Its responsibility is to **decide whether to render a component**.

It never creates or caches objects.

It simply compares:

- Previous props (`memoizedProps`)
- Current props (`pendingProps`)

using a shallow comparison (`Object.is()`).

---

# Without `useMemo`

```jsx
const user = {
    name: "Ashish",
};
```

Every render:

```text
Parent Render

↓

Execute Object Literal

↓

Create Object #1

────────────────────

Parent Render Again

↓

Execute Object Literal

↓

Create Object #2
```

Result:

```text
Object #1

≠

Object #2
```

A new object reference is created on every render.

---

# With `useMemo`

```jsx
const user = useMemo(() => {
    return {
        name: "Ashish",
    };
}, []);
```

### First Render

```text
useMemo

↓

Dependencies Changed

↓

Execute Callback

↓

Create Object #1

↓

Store in Hook.memoizedState
```

### Second Render

```text
useMemo

↓

Dependencies Same

↓

Do NOT Execute Callback

↓

Return Cached Object #1
```

No new object is created.

The same object reference is returned.

---

# Where Does `React.memo` Come In?

React receives whatever object the parent passes.

```text
Parent

↓

Pass Props

↓

React.memo

↓

Compare Previous Props

↓

Compare Current Props

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

`React.memo` never creates objects.

It only compares references.

---

# Complete Flow Without `useMemo`

```text
Parent Render

↓

Create New Object

↓

Pass to Child

↓

React.memo

↓

Compare References

↓

Different

↓

Execute Child()
```

---

# Complete Flow With `useMemo`

```text
Parent Render

↓

useMemo

↓

Dependencies Same

↓

Return Cached Object

↓

Pass to Child

↓

React.memo

↓

Compare References

↓

Same

↓

Bailout

↓

Skip Child Render
```

---

# Responsibilities

## useMemo

```text
Memoizes

↓

Object

↓

Array

↓

Computed Value
```

Purpose:

> Keep values/references stable.

---

## React.memo

```text
Memoizes

↓

Component Rendering
```

Purpose:

> Skip rendering when props haven't changed.

---

# Key Takeaways

- Without `useMemo`, JavaScript creates a new object or array on every render.
- `useMemo` caches the value and returns the same reference until dependencies change.
- `React.memo` never creates or caches values.
- `React.memo` only compares previous and current prop references.
- Stable references from `useMemo` allow `React.memo` to perform a bailout.

---

# Interview Questions

## Does `React.memo` cache objects?

No. `React.memo` does not cache objects or values. It only compares the previous and current props to decide whether to skip rendering the component.

---

## What does `useMemo` cache?

`useMemo` caches the value returned by its callback (such as an object, array, or computed result) and returns the same reference until its dependencies change.

---

## Why are `useMemo` and `React.memo` often used together?

`useMemo` provides stable object or array references, and `React.memo` uses those stable references during its shallow prop comparison to determine whether it can skip rendering the child component.
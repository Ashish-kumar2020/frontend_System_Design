# 🧠 React.memo vs useMemo vs useCallback

---

# React.memo()

## Definition

`React.memo` is a Higher-Order Component (HOC) that memoizes a React component. It performs a **shallow comparison** of props and skips re-rendering if the props have not changed.

### Purpose

* Prevent unnecessary component re-renders.
* Useful for memoizing child components.

### Key Points

* Memoizes **components**.
* Performs **shallow comparison** of props.
* Objects and functions are compared by **reference**.
* If props change, the component re-renders.

Example:

```jsx
const Child = React.memo(function Child() {
  return <h1>Hello</h1>;
});
```

---

# useMemo()

## Definition

`useMemo` is a React Hook that memoizes a **value** (such as the result of an expensive calculation, an object, or an array). It recalculates the value only when one of its dependencies changes.

### Purpose

* Avoid expensive recalculations.
* Keep object/array references stable.

### Key Points

* Memoizes **values**.
* Does **not** prevent component re-renders.
* Returns the cached value if dependencies haven't changed.

Example:

```jsx
const user = useMemo(() => {
  return { name: "Ashish" };
}, []);
```

---

# useCallback()

## Definition

`useCallback` is a React Hook that memoizes a **function** and returns the same function reference until one of its dependencies changes.

### Purpose

* Prevent creating a new function on every render.
* Useful when passing callbacks to `React.memo` components.

### Key Points

* Memoizes **functions**.
* Keeps function references stable.
* Creates a new function only when dependencies change.

Example:

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

---

# Comparison Table

| React.memo                                | useMemo                                             | useCallback                                        |
| ----------------------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| Memoizes a component                      | Memoizes a value                                    | Memoizes a function                                |
| Prevents unnecessary component re-renders | Prevents unnecessary recalculations                 | Prevents unnecessary function recreation           |
| Performs shallow comparison of props      | Uses dependency array                               | Uses dependency array                              |
| Useful for child components               | Useful for expensive calculations, objects & arrays | Useful when passing callbacks to memoized children |

---

# Important Interview Points

### React.memo

* Memoizes **components**.
* Skips re-render if props are unchanged.

### useMemo

* Memoizes **values**.
* Does **not** stop component re-renders.
* Returns the cached value until dependencies change.

### useCallback

* Memoizes **functions**.
* Returns the same function reference until dependencies change.

---

# Easy Trick to Remember

```text
React.memo
      ↓
Memoizes Components

useMemo
      ↓
Memoizes Values

useCallback
      ↓
Memoizes Functions
```

---

# Quick Revision

* **React.memo** → Component
* **useMemo** → Value
* **useCallback** → Function

**Rule of Thumb**

* Want to avoid child component re-renders? → **React.memo**
* Want to avoid expensive calculations or keep object/array references stable? → **useMemo**
* Want to keep function references stable? → **useCallback**

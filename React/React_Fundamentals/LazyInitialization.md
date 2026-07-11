# ⚛️ React State Internals - Lazy Initialization

---

# What is Lazy Initialization?

Lazy Initialization is a performance optimization used with `useState`.

Instead of calculating the initial state on every render, React calculates it **only during the first render**.  [oai_citation:0‡React](https://react.dev/reference/react/useState?utm_source=chatgpt.com)

---

# Normal Initialization

```jsx
function expensiveCalculation() {
  console.log("Running...");
  return 100;
}

function App() {
  const [count] = useState(expensiveCalculation());
}
```

What happens?

```text
Every Render

↓

JavaScript executes

expensiveCalculation()

↓

Returns 100

↓

React receives

useState(100)
```

Even though React ignores the initial value after the first render, JavaScript still executes `expensiveCalculation()` on every render because the function call is evaluated before `useState` is called.  [oai_citation:1‡React](https://react.dev/reference/react/useState?utm_source=chatgpt.com)

---

# Lazy Initialization

```jsx
function expensiveCalculation() {
  console.log("Running...");
  return 100;
}

function App() {
  const [count] = useState(() => expensiveCalculation());
}
```

Now React receives:

```jsx
() => expensiveCalculation()
```

which is a **function**, not the result.

React decides when to call it.

---

# How Lazy Initialization Works

First Render:

```text
React

↓

Calls

expensiveCalculation()

↓

Stores

100

↓

State = 100
```

Future Renders:

```text
React

↓

Already has state

↓

Ignores initializer function

↓

Returns stored state
```

The initializer function is called only during initialization and ignored on later renders.  [oai_citation:2‡React](https://react.dev/reference/react/useState?utm_source=chatgpt.com)

---

# Comparison

## Normal Initialization

```jsx
useState(expensiveCalculation())
```

JavaScript executes:

```js
expensiveCalculation();
```

on **every render**.

---

## Lazy Initialization

```jsx
useState(() => expensiveCalculation())
```

React executes:

```js
expensiveCalculation();
```

**only once** during the initial render.

---

# Why?

Remember:

Every render executes the component function again.

```jsx
function App() {
    ...
}
```

means

```js
App();
```

runs on every render.

So this:

```jsx
useState(expensiveCalculation())
```

becomes:

```js
const value = expensiveCalculation();

useState(value);
```

JavaScript must execute `expensiveCalculation()` before passing its result to `useState`.

---

# Real Example

❌ Bad

```jsx
const [todos] = useState(createTodos());
```

If `createTodos()` is expensive, it runs on every render.

---

✅ Good

```jsx
const [todos] = useState(createTodos);
```

or

```jsx
const [todos] = useState(() => createTodos());
```

Now `createTodos()` runs only once during initialization.  [oai_citation:3‡React](https://react.dev/reference/react/useState?utm_source=chatgpt.com)

---

# Visual Flow

## Normal Initialization

```text
Render

↓

expensiveCalculation()

↓

useState(value)

↓

Render Again

↓

expensiveCalculation()

↓

useState(value)

↓

Render Again

↓

expensiveCalculation()
```

---

## Lazy Initialization

```text
First Render

↓

React calls initializer

↓

Stores result

↓

Future Render

↓

Returns stored state

↓

Initializer NOT called
```

---

# When Should You Use Lazy Initialization?

Use Lazy Initialization when creating the initial state is expensive.

Examples:

- Reading from Local Storage
- Parsing a large JSON file
- Creating a large array
- Heavy calculations
- Expensive data transformations

Do **not** use it for simple values like:

```jsx
useState(0);

useState("");

useState(false);
```

There is no performance benefit for primitive constants.

---

# Important Notes

- `useState(initialValue)` ignores the initial value after the first render.
- JavaScript still evaluates function calls before `useState` receives them.
- Lazy Initialization passes a function instead of the computed value.
- React calls the initializer only during the first render.
- Use it only for expensive initialization logic.

---

# Interview Questions

## Why is this inefficient?

```jsx
useState(createTodos());
```

Because `createTodos()` executes on every render even though React only uses the result from the first render.

---

## Why is this better?

```jsx
useState(createTodos);
```

Because React calls `createTodos` only during the initial render.

---

## What's the difference?

```jsx
useState(expensiveCalculation());
```

Passes the **result** of the function.

---

```jsx
useState(() => expensiveCalculation());
```

Passes the **function itself**.

React decides when to execute it.

---

# Key Takeaways

- Lazy Initialization is a performance optimization.
- Pass a function instead of calling the function.
- React calls the initializer only once.
- Avoid expensive calculations on every render.
- Use Lazy Initialization only when the initial state is expensive to compute.
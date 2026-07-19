# 🚀 Controlled vs Uncontrolled Components (Interview Notes)

---

# What is a Controlled Component?

A Controlled Component is a form element whose value is controlled by **React State**.

React becomes the **single source of truth**.

Example:

```jsx
function App() {

    const [name, setName] = useState("");

    return (
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    );

}
```

---

# Controlled Component Flow

```text
User Types

↓

onChange

↓

setState()

↓

React State Updates

↓

React Re-renders

↓

DOM Updates

↓

UI Changes
```

React controls the input value.

---

# Example

Initial State

```jsx
const [name, setName] = useState("");
```

User types:

```text
Ashu
```

Flow:

```text
Keyboard

↓

onChange

↓

setName("Ashu")

↓

React State

↓

Re-render

↓

<input value="Ashu" />
```

---

# What is an Uncontrolled Component?

An Uncontrolled Component is a form element whose value is managed by the **DOM (Browser)** instead of React.

React accesses the value only when needed.

Example:

```jsx
function App() {

    const inputRef = useRef();

    return (
        <input ref={inputRef} />
    );

}
```

Notice:

- No useState
- No value
- No onChange

---

# Uncontrolled Component Flow

```text
User Types

↓

Browser Updates Input Value

↓

UI Changes

↓

React Reads Value Later
```

No React re-render occurs while typing.

---

# Reading the Value

```jsx
function App() {

    const inputRef = useRef();

    function handleSubmit() {
        console.log(inputRef.current.value);
    }

    return (
        <>
            <input ref={inputRef} />

            <button onClick={handleSubmit}>
                Submit
            </button>
        </>
    );

}
```

React reads the value only when needed.

---

# Does useRef update the UI?

No.

The browser updates the UI automatically.

Example:

```jsx
<input ref={inputRef} />
```

Typing:

```text
Ashu
```

Flow:

```text
Keyboard

↓

Browser Updates DOM

↓

UI Updates
```

React is not involved.

---

# Can useRef update the DOM?

Yes.

```jsx
function handleClick() {

    inputRef.current.value = "Ashu";

}
```

Flow:

```text
Button Click

↓

inputRef.current

↓

Actual DOM Node

↓

value = "Ashu"

↓

Browser Updates UI
```

No React re-render occurs.

---

# Controlled vs Uncontrolled Flow

## Controlled

```text
User Types

↓

React State

↓

DOM

↓

UI
```

---

## Uncontrolled

```text
User Types

↓

DOM

↓

UI

↓

React Reads Value Later
```

---

# Controlled vs Uncontrolled

| Controlled | Uncontrolled |
|------------|--------------|
| React owns the state | DOM owns the state |
| useState | useRef |
| Re-render on every change | No re-render while typing |
| Easy validation | Read value when needed |
| Best for dynamic UI | Best for simple forms |

---

# When should we use Controlled Components?

Use Controlled Components when React needs to know the value immediately.

Examples:

✅ Live Form Validation

```text
Password Strength
```

---

✅ Character Counter

```text
Ashu

4 / 20
```

---

✅ Search Suggestions

```text
User Types

↓

API Call

↓

Suggestions
```

---

✅ Conditional UI

```text
Checkbox

↓

Show/Hide Fields
```

---

# When should we use Uncontrolled Components?

Use Uncontrolled Components when React only needs the final value.

Examples:

✅ Login Form

```text
Username

Password

↓

Login Click

↓

Read Values
```

---

✅ Search Form

```text
Type

↓

Click Search

↓

Read Value
```

---

✅ File Upload

```jsx
<input type="file" />
```

Access using:

```jsx
fileRef.current.files
```

---

✅ Focus Management

```jsx
inputRef.current.focus();
```

---

✅ Third-party Libraries

Examples:

- Stripe Elements
- Google Maps
- Monaco Editor
- Quill Editor

These libraries manage their own DOM.

---

# Why File Inputs are Uncontrolled?

Browsers do not allow JavaScript to set:

```jsx
<input
    type="file"
    value="file.pdf"
/>
```

For security reasons.

Instead:

```jsx
fileRef.current.files[0]
```

---

# Performance

Controlled:

```text
User Types

↓

React Re-render

↓

DOM Update
```

---

Uncontrolled:

```text
User Types

↓

Browser Updates DOM
```

Less React work.

> Note: For most applications, performance should not be the primary reason to choose uncontrolled components.

---

# Decision Tree

```text
Need value on every keystroke?

        │
   ┌────┴────┐
   │         │
  YES       NO
   │         │
Controlled  Uncontrolled
```

---

# Interview Questions

## Q1. What is a Controlled Component?

> A Controlled Component is a form element whose value is controlled by React state using props like `value` and events like `onChange`.

---

## Q2. What is an Uncontrolled Component?

> An Uncontrolled Component is a form element whose value is managed by the DOM. React accesses the value using a ref when needed.

---

## Q3. Does typing in an uncontrolled input cause a React re-render?

❌ No.

The browser updates the DOM directly.

---

## Q4. Does changing `ref.current.value` trigger a React re-render?

❌ No.

It directly updates the DOM element.

Example:

```jsx
inputRef.current.value = "Ashu";
```

---

## Q5. When should you use Controlled Components?

When React needs to respond to every input change.

Examples:

- Live validation
- Character counter
- Search suggestions
- Dynamic forms

---

## Q6. When should you use Uncontrolled Components?

When React only needs the final value.

Examples:

- Login Forms
- Search Forms
- File Uploads
- Focus Management

---

## Q7. Which one is better?

❌ Neither.

Choose based on the use case.

Controlled:

React needs every update.

Uncontrolled:

React only needs the final value.

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| Controlled | React owns the state |
| Uncontrolled | DOM owns the state |
| Controlled Hook | useState |
| Uncontrolled Hook | useRef |
| Validation | Controlled |
| File Upload | Uncontrolled |
| Focus | Uncontrolled |
| Login Form | Usually Uncontrolled |

---

# ⭐ Golden Mental Model

```text
Controlled

React

↓

DOM

────────────────────────

Uncontrolled

DOM

↓

React
```

React writes in Controlled Components.

React reads in Uncontrolled Components.

---

# ⭐ Interview One-Liners

### Controlled Component

> A Controlled Component is a form element whose value is driven by React state, making React the single source of truth.

---

### Uncontrolled Component

> An Uncontrolled Component stores its value in the DOM, and React accesses that value only when needed using a ref.

---

### Controlled vs Uncontrolled

> Controlled components are ideal for dynamic, interactive forms where React needs every update. Uncontrolled components are useful when only the final value is required, such as login forms, file uploads, and focus management.

---

### Decision Rule

```text
Need every keystroke?

↓

YES

↓

Controlled

──────────────────

Need final value only?

↓

YES

↓

Uncontrolled
```
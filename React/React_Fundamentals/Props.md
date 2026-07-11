# ⚛️ React Props

---

# What are Props?

**Props (Properties)** are used to pass data from a **Parent Component** to a **Child Component**.

Props are passed as attributes in JSX.

Example:

```jsx
function App() {
  return <Button text="Save" />;
}
```

The `text` value is a prop.

---

# Why do we need Props?

Props allow components to:

- Receive dynamic data
- Be reusable
- Communicate from Parent → Child

Without props:

```jsx
function Button() {
  return <button>Save</button>;
}
```

With props:

```jsx
function Button(props) {
  return <button>{props.text}</button>;
}

function App() {
  return <Button text="Save" />;
}
```

Now the same component can display different values.

---

# How Props Work Internally

Suppose we write:

```jsx
<Button text="Save" />
```

Babel converts it into:

```js
jsx(Button, {
  text: "Save",
});
```

or (before React 17)

```js
React.createElement(Button, {
  text: "Save",
});
```

React creates a React Element:

```js
{
  type: Button,
  props: {
    text: "Save",
  },
}
```

Notice:

The **React Element** stores the props.

---

# When does the Component receive Props?

React later executes:

```js
Button({
  text: "Save",
});
```

Therefore:

```jsx
function Button(props) {}
```

receives:

```js
{
  text: "Save",
}
```

The `props` parameter is simply a normal JavaScript object.

---

# React Element vs Component Props

## React Element

```js
{
  type: Button,
  props: {
    text: "Save",
  },
}
```

The React Element contains a `props` property.

---

## Inside the Component

```jsx
function Button(props) {
  console.log(props);
}
```

React executes:

```js
Button({
  text: "Save",
});
```

So inside the component:

```js
props
```

is simply:

```js
{
  text: "Save",
}
```

There is **no extra `props` wrapper**.

---

# Multiple Props

Example:

```jsx
<Card
  title="React"
  author="Ashu"
  likes={100}
/>
```

React executes:

```js
Card({
  title: "React",
  author: "Ashu",
  likes: 100,
});
```

Inside the component:

```jsx
function Card(props) {
  console.log(props);
}
```

Output:

```js
{
  title: "React",
  author: "Ashu",
  likes: 100,
}
```

---

# Destructuring Props

Instead of:

```jsx
function Button(props) {
  return <button>{props.text}</button>;
}
```

We can write:

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
```

Both are equivalent.

Because React passes:

```js
{
  text: "Save",
}
```

as the first argument.

---

# Parent → Child Data Flow

```text
Parent Component
        │
        ▼
<Button text="Save" />
        │
        ▼
Child Component
```

Props always flow **from Parent to Child**.

A child cannot directly change the parent's props.

---

# Complete Flow

```text
Parent writes:

<Button text="Save" />

        │
        ▼

Babel

        │
        ▼

React.createElement() / jsx()

        │
        ▼

React Element

{
   type: Button,
   props: {
      text: "Save"
   }
}

        │
        ▼

React executes

Button({
   text: "Save"
})

        │
        ▼

Component uses props.text

        │
        ▼

Returns React Elements

        │
        ▼

React updates the DOM
```

---

# Important Notes

- Props are used to pass data from Parent → Child.
- Props are passed as JSX attributes.
- Props are stored inside the React Element.
- React passes the props object as the first argument to the component.
- `props` is a normal JavaScript object.
- Components should only read props, not modify them.
- Props make components reusable.

---

# Interview Questions

## What are Props?

Props are read-only values passed from a parent component to a child component.

---

## How are props passed to a component?

React passes the props object as the first argument when executing the component.

Example:

```js
Button({
  text: "Save",
});
```

---

## What does `props` contain?

Only the values passed by the parent.

Example:

```jsx
<Button text="Save" color="red" />
```

Inside the component:

```js
{
  text: "Save",
  color: "red",
}
```

---

## Where are props stored?

Initially, props are stored inside the **React Element**.

```js
{
  type: Button,
  props: {
    text: "Save",
  },
}
```

Later, React passes this object to the component.

---

## Why do we use destructuring?

To access prop values more cleanly.

Instead of:

```jsx
props.text
```

we can write:

```jsx
{text}
```

---

# Visual Summary

```text
Parent Component
        │
        ▼

<Button text="Save" />

        │
        ▼

Babel

        │
        ▼

React Element

{
   type: Button,
   props: {
      text: "Save"
   }
}

        │
        ▼

React executes

Button({
   text: "Save"
})

        │
        ▼

Component receives

props = {
   text: "Save"
}

        │
        ▼

Returns React Elements

        │
        ▼

React updates the DOM
```

---

# Key Takeaways

- Props are used for Parent → Child communication.
- Props are passed as JSX attributes.
- React stores props inside the React Element.
- React passes props as the first argument when executing the component.
- `props` is just a normal JavaScript object.
- Destructuring props is simply JavaScript object destructuring.
- Props make components reusable and configurable.
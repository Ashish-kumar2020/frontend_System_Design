# 🚀 Render Props (Interview Notes)

---

# What are Render Props?

A Render Prop is a pattern where a component shares its logic by accepting a **function as a prop**, and that function returns the UI.

Instead of deciding **how to render**, the component delegates rendering to its parent.

---

# Why do we need Render Props?

Imagine we have a component that tracks mouse position.

```jsx
function MouseTracker() {
    // Mouse Tracking Logic

    return (
        <div>
            X: {x}
            Y: {y}
        </div>
    );
}
```

Tomorrow requirements change:

- 🐱 Cat follows mouse
- 🐶 Dog follows mouse
- 🔴 Circle follows mouse

The mouse tracking logic is identical.

Only the UI changes.

This violates:

> DRY (Don't Repeat Yourself)

---

# Solution

Separate:

```text
Logic

↓

Presentation
```

The component handles logic.

The parent decides the UI.

---

# Implementation

```jsx
function MouseTracker({ render }) {

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {

        function handleMove(e) {
            setPosition({
                x: e.clientX,
                y: e.clientY
            });
        }

        window.addEventListener("mousemove", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
        };

    }, []);

    return render(position);

}
```

Notice:

```jsx
return render(position);
```

The component no longer decides the UI.

---

# Usage

## Show Coordinates

```jsx
<MouseTracker
    render={(position) => (
        <h1>
            {position.x}, {position.y}
        </h1>
    )}
/>
```

---

## Cat follows Mouse

```jsx
<MouseTracker
    render={(position) => (
        <Cat
            x={position.x}
            y={position.y}
        />
    )}
/>
```

---

## Dog follows Mouse

```jsx
<MouseTracker
    render={(position) => (
        <Dog
            x={position.x}
            y={position.y}
        />
    )}
/>
```

Same logic.

Different UI.

---

# Why is it called Render Props?

Because a **function** is passed as a prop.

Example:

```jsx
<MouseTracker

    render={(position) => (
        <Cat x={position.x} />
    )}

/>
```

The prop:

```text
render
```

contains a function that returns JSX.

Hence:

> Render Prop

---

# Internal Flow

```text
Mouse Moves

↓

MouseTracker Updates State

↓

Calls render(position)

↓

Parent Returns JSX

↓

React Renders UI
```

---

# Does the render function have to use the data?

Example:

```jsx
<MouseTracker
    render={() => (
        <Cat />
    )}
/>
```

YES.

Mouse tracking still works.

Reason:

```text
Mouse Logic

↓

Independent

↓

render(position)

↓

Parent Ignores position
```

Ignoring the argument doesn't stop the logic from running.

The UI simply doesn't use the updated data.

---

# HOC vs Render Props

## Higher Order Component

```text
Component

↓

Wrap Component

↓

Return New Component
```

---

## Render Props

```text
Component

↓

Expose Logic

↓

Parent Decides UI
```

HOC wraps components.

Render Props expose reusable logic.

---

# Render Props vs Custom Hooks

## Render Props

```jsx
<MouseTracker
    render={(mouse) => (
        <Cat x={mouse.x} />
    )}
/>
```

Problems:

- Nested callbacks
- Harder to read
- More JSX nesting

---

## Custom Hooks

```jsx
function Dashboard() {

    const mouse = useMouse();

    return ...;

}
```

Advantages:

- Cleaner
- Easier to compose
- Easier to maintain
- No nested callbacks

---

# Callback Hell

Multiple Render Props create deep nesting.

```jsx
<AuthProvider
    render={(user) => (

        <ThemeProvider
            render={(theme) => (

                <MouseTracker
                    render={(mouse) => (

                        <Dashboard />

                    )}
                />

            )}
        />

    )}
/>
```

This is called:

> Callback Hell / Nested Render Props

---

# Modern React

Before React Hooks:

- HOCs
- Render Props

After React Hooks:

- ✅ Custom Hooks

Most reusable logic today is implemented using Custom Hooks.

---

# Interview Questions

## Q1. What are Render Props?

> A Render Prop is a pattern where a component shares logic by accepting a function as a prop. That function receives data and returns the UI to render.

---

## Q2. Why use Render Props?

To reuse logic while allowing different components to render different UIs.

---

## Q3. Why are they called Render Props?

Because a function that returns JSX is passed as a prop.

---

## Q4. Does the logic stop if the render function ignores the data?

Example:

```jsx
render={() => <Cat />}
```

❌ No.

The logic still executes.

The parent simply ignores the data.

---

## Q5. HOC vs Render Props

### HOC

- Takes Component
- Returns Component

---

### Render Props

- Takes Function
- Returns JSX

---

## Q6. Why are Render Props less common today?

Because Custom Hooks:

- Avoid nested callbacks
- Are easier to compose
- Keep components cleaner
- Improve readability

---

## Q7. Render Props vs Custom Hooks

### Render Props

```jsx
<MouseTracker
    render={(mouse) => (
        <Cat />
    )}
/>
```

Returns UI through a callback.

---

### Custom Hook

```jsx
const mouse = useMouse();
```

Returns reusable logic directly.

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| Purpose | Reuse Logic |
| How | Pass Function as Prop |
| Returns | JSX |
| UI | Controlled by Parent |
| Logic | Controlled by Child |
| Modern Alternative | Custom Hooks |
| Problem | Nested Render Props |

---

# ⭐ Golden Mental Model

```text
Component

↓

Calculates Logic

↓

Calls render(data)

↓

Parent Decides UI
```

The component owns the logic.

The parent owns the rendering.

---

# ⭐ Interview One-Liners

### Render Props

> A Render Prop is a function passed as a prop that allows a component to share reusable logic while letting the parent decide how to render the UI.

---

### Why Render Props?

> They separate business logic from presentation, allowing multiple UIs to reuse the same logic.

---

### Why Hooks replaced Render Props?

> Custom Hooks provide reusable logic without nested render functions, making components simpler, more readable, and easier to maintain.

---

### HOC vs Render Props vs Custom Hooks

```text
HOC

↓

Wrap Component

──────────────────

Render Props

↓

Pass Function

──────────────────

Custom Hooks

↓

Reuse Logic Directly ✅
```
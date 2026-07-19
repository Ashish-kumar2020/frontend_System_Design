# 🚀 Higher Order Components (HOC) - Interview Notes

---

# What is a Higher Order Component (HOC)?

A Higher Order Component (HOC) is a function that:

- Takes a component as input.
- Returns a new component with additional functionality.

```jsx
const EnhancedComponent = withFeature(Component);
```

Just like a Higher Order Function:

```js
function higherOrder(fn) {
    return function () {};
}
```

A Higher Order Component works similarly:

```jsx
function withAuth(Component) {
    return function WrappedComponent() {
        return <Component />;
    };
}
```

---

# Why do we need HOCs?

Imagine multiple pages require authentication.

Without HOC:

```jsx
function Dashboard() {

    if (!isLoggedIn) {
        return <Login />;
    }

    return <DashboardUI />;
}
```

```jsx
function Profile() {

    if (!isLoggedIn) {
        return <Login />;
    }

    return <ProfileUI />;
}
```

```jsx
function Orders() {

    if (!isLoggedIn) {
        return <Login />;
    }

    return <OrdersUI />;
}
```

Authentication logic is duplicated everywhere.

---

# Solution

Create authentication once.

```jsx
const ProtectedDashboard = withAuth(Dashboard);

const ProtectedProfile = withAuth(Profile);

const ProtectedOrders = withAuth(Orders);
```

Now authentication logic exists in only one place.

---

# Implementation

```jsx
function withAuth(Component) {

    return function AuthComponent(props) {

        if (!isLoggedIn) {
            return <Login />;
        }

        return <Component {...props} />;
    };

}
```

---

# Why do we forward props?

Correct:

```jsx
<Component {...props} />
```

Wrong:

```jsx
<Component />
```

Reason:

If parent passes:

```jsx
<ProtectedDashboard user="Ashu" />
```

Without forwarding:

```jsx
Dashboard

↓

user = undefined
```

With forwarding:

```jsx
Dashboard

↓

user = "Ashu"
```

The HOC remains transparent.

---

# HOCs can Inject Props

Example:

```jsx
function withAuth(Component) {

    return function(props) {

        return (
            <Component
                {...props}
                isLoggedIn={true}
            />
        );

    };

}
```

Wrapped component automatically receives:

```jsx
function Dashboard({ isLoggedIn }) {

}
```

---

# Composition vs Mutation

HOCs use **Composition**.

They DO NOT modify the original component.

Example:

```jsx
const ProtectedDashboard =
    withAuth(Dashboard);
```

Original:

```jsx
Dashboard
```

Still exists unchanged.

React creates:

```jsx
ProtectedDashboard
```

which internally renders:

```jsx
<Dashboard />
```

---

# Visualization

```text
Dashboard

↓

withAuth()

↓

ProtectedDashboard

↓

Dashboard
```

Original component never changes.

---

# Real World Examples

Older React libraries used HOCs extensively.

Examples:

```jsx
connect()

withRouter()

withTheme()

withStyles()
```

---

# Why were HOCs popular?

Before React Hooks (React <16.8), HOCs were the standard way to reuse component logic.

They helped share:

- Authentication
- Theme
- Redux State
- Routing
- Permissions
- Analytics

---

# Why are HOCs less common today?

Since React Hooks were introduced:

Instead of:

```jsx
export default withTheme(
    withRouter(
        withAuth(
            Dashboard
        )
    )
);
```

Developers now write:

```jsx
function Dashboard() {

    const theme = useTheme();

    const user = useAuth();

    const navigate = useNavigate();

    return ...;
}
```

Much simpler.

---

# Wrapper Hell

Multiple HOCs create deep nesting.

```text
withTheme

↓

withRouter

↓

withRedux

↓

withAnalytics

↓

Dashboard
```

This is called:

> Wrapper Hell

Custom Hooks avoid this problem.

---

# HOC vs Custom Hook

| Higher Order Component | Custom Hook |
|-------------------------|-------------|
| Takes a Component | Called inside a Component |
| Returns a New Component | Returns Logic / State |
| Wraps Components | No Wrapping |
| Adds Wrapper Components | No Extra Components |
| Common in Legacy Projects | Preferred in Modern React |

---

# When should we use HOCs?

Today:

Mostly when:

- Maintaining legacy applications
- Working with libraries exposing HOCs

For new applications:

Prefer:

✅ Custom Hooks

---

# Interview Questions

## Q1. What is a Higher Order Component?

> A Higher Order Component is a function that takes a component as input and returns a new component with additional behavior.

---

## Q2. Why do we use HOCs?

To reuse component logic without duplicating code.

Examples:

- Authentication
- Permissions
- Logging
- Analytics
- Theme

---

## Q3. Why do we write?

```jsx
<Component {...props} />
```

Instead of:

```jsx
<Component />
```

Answer:

To forward all received props to the wrapped component.

Without forwarding, the wrapped component loses its props.

---

## Q4. Does HOC modify the original component?

❌ No.

It creates a new wrapper component.

Original component remains unchanged.

This is called:

> Composition

---

## Q5. What is Wrapper Hell?

```text
withTheme

↓

withRouter

↓

withRedux

↓

Dashboard
```

Too many wrapper components make debugging and readability difficult.

---

## Q6. Why are HOCs less common today?

Because Custom Hooks:

- Don't wrap components
- Reuse logic directly
- Keep the component tree simpler
- Are easier to maintain

---

## Q7. HOC vs Custom Hook

### HOC

```jsx
const ProtectedDashboard =
    withAuth(Dashboard);
```

Returns:

New Component

---

### Custom Hook

```jsx
function Dashboard() {

    const user = useAuth();

}
```

Returns:

Logic / State

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| Purpose | Reuse Component Logic |
| Input | Component |
| Output | New Component |
| Props | Forward using {...props} |
| Original Component | Never Modified |
| Pattern | Composition |
| Modern Alternative | Custom Hooks |
| Common Today | Mostly Legacy Code |

---

# ⭐ Golden Mental Model

```text
Component

↓

HOC

↓

New Component

↓

Original Component
```

HOC wraps a component.

It never modifies it.

---

# ⭐ Interview One-Liners

### Higher Order Component

> A Higher Order Component is a function that takes a component and returns a new component with additional behavior.

---

### Composition

> HOCs use composition instead of modifying the original component.

---

### Props Forwarding

> Always forward props using `{...props}` so the wrapped component receives everything passed by its parent.

---

### Why Hooks replaced HOCs

> Custom Hooks allow reusable logic without adding extra wrapper components, making the component tree simpler, easier to read, and easier to maintain.

---

### When to use HOCs today

> HOCs are primarily encountered in legacy React applications and older libraries. For new React applications, Custom Hooks are generally the preferred approach for sharing stateful logic.
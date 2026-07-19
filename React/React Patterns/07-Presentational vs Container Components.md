# 🚀 Presentational vs Container Components (Interview Notes)

---

# What is the Presentational vs Container Pattern?

It is a design pattern that separates:

- Business Logic
- UI

into two different components.

```text
Container Component

↓

Business Logic

↓

Pass Data

↓

Presentational Component

↓

Render UI
```

---

# Why do we need this pattern?

Imagine writing everything inside one component.

```jsx
function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetch("/api/user")
            .then(res => res.json())
            .then(setUser);

    }, []);

    return (
        <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </>
    );

}
```

Responsibilities:

- Fetch API
- Manage State
- Handle Loading
- Handle Errors
- Render UI

One component is doing multiple jobs.

This violates:

> Single Responsibility Principle (SRP)

---

# Solution

Split the component into two.

---

# Container Component (Smart Component)

Responsible for:

- Fetching Data
- Business Logic
- State Management
- API Calls
- Error Handling

Example:

```jsx
function ProfileContainer() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetch("/api/user")
            .then(res => res.json())
            .then(setUser);

    }, []);

    return (
        <Profile user={user} />
    );

}
```

Notice:

No UI.

Only logic.

---

# Presentational Component (Dumb Component)

Responsible only for rendering UI.

```jsx
function Profile({ user }) {

    return (
        <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </>
    );

}
```

Notice:

- No API calls
- No useEffect
- No business logic
- No state management

Only presentation.

---

# Internal Flow

```text
Container Component

↓

Fetch Data

↓

Store State

↓

Pass Props

↓

Presentational Component

↓

Render UI
```

---

# Responsibilities

## Container Component

✅ API Calls

✅ Business Logic

✅ State

✅ Data Fetching

✅ Error Handling

---

## Presentational Component

✅ UI

✅ Styling

✅ Display Props

---

# Why was this pattern popular?

Before React Hooks:

Business logic could not easily be reused.

Developers created:

```text
containers/

ProfileContainer.jsx

OrdersContainer.jsx

DashboardContainer.jsx

────────────────────────

components/

Profile.jsx

Orders.jsx

Dashboard.jsx
```

This kept UI and logic separate.

---

# How Hooks Changed This Pattern

Today:

Instead of moving logic into another component,

we move it into a Custom Hook.

Example:

```jsx
function useUser() {

    // Fetch user

}
```

Then:

```jsx
function Profile() {

    const user = useUser();

    return (
        <ProfileCard user={user} />
    );

}
```

The hook contains the business logic.

The UI component stays focused on rendering.

---

# Modern Architecture

Before Hooks

```text
Container Component

↓

Presentational Component
```

---

After Hooks

```text
Custom Hook

↓

Small Container

↓

Presentational Component
```

Container components became much smaller because reusable logic moved into Custom Hooks.

---

# Are Container Components still used?

✅ Yes.

They are still useful when a component coordinates data, state, or business logic before passing it to UI components.

However, modern React often combines:

- Custom Hooks
- Small Container Components
- Presentational Components

instead of large "smart" components.

---

# Advantages

✅ Separation of Concerns

✅ Better Readability

✅ Easier Testing

✅ Easier Reuse

✅ Follows Single Responsibility Principle

---

# Disadvantages

❌ More Components

❌ Slightly More Boilerplate

❌ Less necessary after Hooks for many use cases

---

# Interview Questions

## Q1. What is a Presentational Component?

> A Presentational Component focuses only on rendering UI. It receives data through props and contains little or no business logic.

---

## Q2. What is a Container Component?

> A Container Component manages state, data fetching, and business logic, then passes the required data to Presentational Components.

---

## Q3. Why was this pattern introduced?

To separate business logic from presentation and follow the Single Responsibility Principle.

---

## Q4. What responsibilities belong to a Container Component?

- API Calls
- State Management
- Business Logic
- Data Fetching
- Error Handling

---

## Q5. What responsibilities belong to a Presentational Component?

- Rendering UI
- Displaying Props
- Styling
- User Interface

---

## Q6. Are Container Components obsolete after Hooks?

❌ No.

Hooks reduced the need for large container components by moving reusable logic into Custom Hooks, but the principle of separating business logic from presentation is still valuable.

---

## Q7. Is this a Container Component?

```jsx
function Profile() {

    const user = useUser();

    return (
        <ProfileCard user={user} />
    );

}
```

✅ Yes.

Reason:

It coordinates data and passes it to another component.

---

## Q8. Is this a Presentational Component?

```jsx
function ProfileCard({ user }) {

    return (
        <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </>
    );

}
```

✅ Yes.

Reason:

It only renders the UI.

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| Container Component | Business Logic |
| Presentational Component | UI |
| Before Hooks | Container + Presentational |
| After Hooks | Custom Hooks + Small Container + Presentational |
| Main Goal | Separation of Concerns |
| Principle | Single Responsibility Principle |

---

# ⭐ Golden Mental Models

## Before Hooks

```text
Container

↓

Logic

↓

Props

↓

Presentational

↓

UI
```

---

## Modern React

```text
Custom Hook

↓

Small Container

↓

Presentational Component
```

---

# ⭐ Interview One-Liners

### Presentational Component

> A Presentational Component is responsible only for rendering the UI. It receives data through props and avoids business logic.

---

### Container Component

> A Container Component manages data, state, and business logic, then passes the required data to Presentational Components.

---

### Why Hooks Changed This Pattern

> Custom Hooks moved reusable business logic out of components, making Container Components much smaller while preserving the separation of concerns.

---

### Modern React

```text
HOC

↓

Render Props

↓

Custom Hooks

↓

Provider Pattern

↓

Small Container

↓

Presentational Component
```

The separation between **logic** and **UI** still exists; modern React primarily uses **Custom Hooks** to implement that separation.
# 🚀 Compound Components (Interview Notes)

---

# What are Compound Components?

Compound Components are a design pattern where multiple smaller components work together as a single component while sharing state and behavior.

They usually communicate using **React Context**.

Example:

```jsx
<Modal>
    <Modal.Header />
    <Modal.Body />
    <Modal.Footer />
</Modal>
```

Each component has its own responsibility, but together they form one complete component.

---

# Why do we need Compound Components?

Imagine building a Modal.

Instead of:

```jsx
<Modal
    title="Delete Account"
    body="Are you sure?"
    footer={<Buttons />}
    showHeader
    showFooter
    showCloseButton
    showDivider
    theme="dark"
    ...
/>
```

The API becomes huge.

This is called:

> Prop Explosion

---

# Solution

Instead of passing many props:

```jsx
<Modal>

    <Modal.Header>
        Delete Account
    </Modal.Header>

    <Modal.Body>
        Are you sure?
    </Modal.Body>

    <Modal.Footer>
        <Button>Delete</Button>
    </Modal.Footer>

</Modal>
```

Cleaner.

More readable.

More flexible.

---

# Why are they called Compound Components?

Because multiple small components combine together to form one larger component.

Example:

```text
Modal.Header

Modal.Body

Modal.Footer

↓

Modal
```

Each component has a different responsibility.

Together they behave as one component.

---

# How do Compound Components share state?

Using **React Context**.

Example:

```jsx
const ModalContext = createContext();
```

Parent:

```jsx
function Modal({ children }) {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                setIsOpen
            }}
        >
            {children}
        </ModalContext.Provider>
    );

}
```

Child:

```jsx
function Header() {

    const { isOpen } =
        useContext(ModalContext);

}
```

All child components read the same shared state.

---

# Internal Flow

```text
Modal

↓

Create Context

↓

Provide State

↓

Header

↓

Body

↓

Footer

↓

useContext()

↓

Shared State
```

---

# Why Context?

Without Context:

```jsx
<Modal.Header
    isOpen={isOpen}
/>

<Modal.Body
    isOpen={isOpen}
/>

<Modal.Footer
    setIsOpen={setIsOpen}
/>
```

Lots of prop drilling.

With Context:

```jsx
const { isOpen } =
useContext(ModalContext);
```

Much cleaner.

---

# Descendants can access Context

This works:

```jsx
<Modal>

    <div>

        <Modal.Header />

    </div>

</Modal>
```

Reason:

Context works for every descendant.

It does NOT need to be a direct child.

---

# This does NOT work

```jsx
<Modal />

<Modal.Header />
```

Reason:

Header is outside the Provider.

No Context available.

---

# Why are Compound Components better?

Instead of configuring components using many props:

```jsx
<Tabs
    activeTab={1}
    showIndicator
    showAnimation
    orientation="vertical"
    ...
/>
```

Use:

```jsx
<Tabs>

    <Tabs.List>

        <Tabs.Trigger />

        <Tabs.Trigger />

    </Tabs.List>

    <Tabs.Content />

</Tabs>
```

Developers compose the UI naturally.

---

# Composable API

Compound Components create a composable API.

Example:

```jsx
<Tabs>

    <Tabs.List>

        <SearchBox />

        <Tabs.Trigger />

        <CustomButton />

    </Tabs.List>

</Tabs>
```

Developers decide:

- Structure
- Order
- Layout

The library provides building blocks.

---

# Real World Examples

Radix UI

```jsx
<Tabs>
```

---

Headless UI

```jsx
<Disclosure>
```

---

Material UI

```jsx
<Dialog>

    <DialogTitle />

    <DialogContent />

    <DialogActions />

</Dialog>
```

---

Reach UI

```jsx
<Menu>

<MenuButton />

<MenuItems />

</Menu>
```

Most modern UI libraries heavily use Compound Components.

---

# Advantages

✅ Avoid Prop Explosion

✅ Avoid Prop Drilling

✅ Clean API

✅ Flexible Composition

✅ Easier to Extend

✅ Better Developer Experience

---

# Disadvantages

❌ Slightly more complex implementation

❌ Usually requires Context

❌ More files/components to maintain

---

# Interview Questions

## Q1. What are Compound Components?

> Compound Components are multiple smaller components that work together as one component while sharing state and behavior, usually through React Context.

---

## Q2. Why use Compound Components?

To create a flexible, composable API while avoiding prop explosion and prop drilling.

---

## Q3. Why do Compound Components use Context?

Because multiple child components need access to the same shared state without passing props manually.

---

## Q4. Can a nested child access Context?

Example:

```jsx
<Modal>

    <div>

        <Modal.Header />

    </div>

</Modal>
```

✅ Yes.

Context is available to every descendant.

---

## Q5. Will this work?

```jsx
<Modal />

<Modal.Header />
```

❌ No.

Reason:

Header is outside the Provider.

---

## Q6. Why are Compound Components preferred over many props?

Instead of:

```jsx
<Modal
    title=""
    footer=""
    showHeader
    showFooter
    ...
/>
```

Use:

```jsx
<Modal>

    <Modal.Header />

    <Modal.Body />

    <Modal.Footer />

</Modal>
```

Cleaner and easier to extend.

---

## Q7. Why do UI libraries use Compound Components?

Because they expose a composable API that allows developers to arrange and customize child components naturally while sharing state internally.

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| Purpose | Build Flexible Components |
| Communication | React Context |
| Solves | Prop Explosion |
| Avoids | Prop Drilling |
| API | Composable |
| Children | Share State |
| Modern Usage | Radix UI, Headless UI, MUI |

---

# ⭐ Golden Mental Model

```text
Parent Component

↓

Create Context

↓

Provide State

↓

Child Components

↓

useContext()

↓

Shared State

↓

Composable API
```

---

# ⭐ Interview One-Liners

### Compound Components

> A Compound Component is a group of components that work together as one while sharing state through Context.

---

### Why Context?

> Context allows all child components to access shared state without prop drilling.

---

### Why Compound Components?

> They create a flexible and composable API while avoiding prop explosion.

---

### Modern React

Many UI libraries like **Radix UI**, **Headless UI**, and **Material UI** use Compound Components internally.

---

### HOC vs Render Props vs Compound Components vs Custom Hooks

```text
HOC

↓

Wrap Components

────────────────────

Render Props

↓

Pass Render Function

────────────────────

Compound Components

↓

Composable API + Shared Context

────────────────────

Custom Hooks

↓

Reuse Logic Directly
```
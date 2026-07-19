# 📚 Module 10 - Performance Optimization

# Topic 1 - State Colocation

---

# What is State Colocation?

**Definition**

State Colocation means:

> Keep state as close as possible to the components that actually use it.

Instead of placing state high in the component tree, move it down to the smallest subtree that needs it.

---

# Why is it important?

Remember React's rendering flow:

```text
setState()

↓

Owner Component Re-renders

↓

Children Execute

↓

Reconciliation

↓

Commit
```

The higher the state lives, the larger the subtree React has to execute.

---

# ❌ Bad Example

```jsx
function App() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Navbar />
            <Sidebar />
            <Search
                search={search}
                setSearch={setSearch}
            />
            <ProductList />
            <Footer />
        </>
    );
}
```

Component Tree

```text
App
│
├── Navbar
├── Sidebar
├── Search
├── ProductList
└── Footer
```

---

## User Types

```text
User Types

↓

setSearch()

↓

App Executes

↓

Navbar Executes

↓

Sidebar Executes

↓

Search Executes

↓

ProductList Executes

↓

Footer Executes
```

Even though only:

```text
Search

↓

ProductList
```

actually need the search state.

---

# Why is this inefficient?

The state belongs to:

```text
App
```

Whenever it changes:

```text
App

↓

Entire Subtree Executes
```

---

# ✅ Good Example

Move the state closer to where it is used.

```jsx
function SearchSection() {
    const [search, setSearch] = useState("");

    return (
        <>
            <Search
                search={search}
                setSearch={setSearch}
            />

            <ProductList search={search} />
        </>
    );
}

function App() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <SearchSection />
            <Footer />
        </>
    );
}
```

Component Tree

```text
App
│
├── Navbar
├── Sidebar
├── SearchSection
│      │
│      ├── Search
│      └── ProductList
└── Footer
```

---

## User Types

```text
User Types

↓

setSearch()

↓

SearchSection Executes

↓

Search Executes

↓

ProductList Executes
```

Notice:

```text
Navbar

❌ Doesn't Execute

────────────────────────

Sidebar

❌ Doesn't Execute

────────────────────────

Footer

❌ Doesn't Execute
```

Only the subtree that owns the state executes.

---

# Internal Flow

## Without State Colocation

```text
setSearch()

↓

App State Changed

↓

App Executes

↓

Navbar Executes

↓

Sidebar Executes

↓

Search Executes

↓

ProductList Executes

↓

Footer Executes

↓

Reconciliation

↓

Commit
```

---

## With State Colocation

```text
setSearch()

↓

SearchSection State Changed

↓

SearchSection Executes

↓

Search Executes

↓

ProductList Executes

↓

Reconciliation

↓

Commit
```

Much smaller render tree.

---

# Why is this better?

Smaller subtree means:

- Less JavaScript execution.
- Less reconciliation work.
- Fewer components to compare.
- Better performance.
- Less need for memoization.

---

# Relationship with React Internals

You already know:

```text
setState()

↓

Owner Component Executes

↓

Children Execute
```

State Colocation simply reduces the number of children affected.

Instead of:

```text
App

↓

Entire Tree
```

You get:

```text
SearchSection

↓

Small Subtree
```

---

# State Colocation vs React.memo

Many developers do this:

```text
Slow App

↓

React.memo

↓

useMemo

↓

useCallback
```

Senior engineers do this:

```text
Slow App

↓

Can I move the state lower?

↓

YES

↓

Done
```

Often, no memoization is needed.

---

# Performance Optimization Order

```text
1. State Colocation ⭐⭐⭐⭐⭐

↓

2. Component Splitting ⭐⭐⭐⭐⭐

↓

3. React.memo ⭐⭐⭐⭐

↓

4. useMemo ⭐⭐⭐

↓

5. useCallback ⭐⭐⭐
```

Architectural optimizations usually provide bigger improvements than hook-based optimizations.

---

# Golden Rule

> Keep state as local as possible.

Only lift state up when multiple components genuinely need to share it.

---

# Interview Answer

**What is State Colocation?**

State Colocation is the practice of placing state in the lowest possible component that owns or uses it. Since React re-renders the component that owns the state and its descendants, colocating state minimizes the size of the subtree that re-renders, improving performance without relying on memoization.

---

# Key Takeaways

- The owner of the state re-renders.
- Child components execute when their parent re-renders.
- Higher state ownership results in larger render trees.
- Moving state lower reduces render propagation.
- State Colocation is an architectural optimization.
- It often provides greater performance benefits than `React.memo`, `useMemo`, or `useCallback`.
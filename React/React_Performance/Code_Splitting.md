# 🚀 Code Splitting

---

# What is Code Splitting?

## Definition

**Code Splitting** is a build-time optimization technique in which the bundler (Vite/Webpack/Rollup) splits a large JavaScript bundle into multiple smaller chunks. These chunks can then be loaded only when required.

---

# Why do we need Code Splitting?

Without Code Splitting:

* Entire JavaScript bundle is downloaded initially.
* Slower initial page load.
* Unnecessary code is downloaded.

With Code Splitting:

* Smaller initial bundle.
* Faster page load.
* Better performance.
* Reduced bandwidth usage.

---

# How does Code Splitting work?

During the build:

```jsx
import("./Profile")
```

The bundler detects the **dynamic import** and creates a separate JavaScript chunk.

Example:

```text
Before Build

App.jsx
Home.jsx
Profile.jsx
Settings.jsx

        │
        ▼

After Build

main.js
profile.chunk.js
settings.chunk.js
```

---

# What triggers Code Splitting?

✅ Dynamic Import

```jsx
import("./Profile");
```

---

# React.lazy()

`React.lazy()` does **not** perform Code Splitting.

It tells React to load a component **only when it is rendered**.

Example:

```jsx
const Profile = React.lazy(() => import("./Profile"));
```

---

# Relationship

```text
Dynamic import()
        │
        ▼
Code Splitting
(Bundler creates chunks)
        │
        ▼
React.lazy()
        │
        ▼
Lazy Loading
        │
        ▼
Suspense
(Shows fallback UI)
```

---

# Code Splitting vs Lazy Loading

| Code Splitting             | Lazy Loading                      |
| -------------------------- | --------------------------------- |
| Build-time optimization    | Runtime optimization              |
| Performed by the bundler   | Performed by React & the browser  |
| Creates multiple JS chunks | Downloads chunks only when needed |

---

# Important Points

* Happens during **build time**.
* Triggered by **dynamic `import()`**.
* Bundler creates separate JavaScript chunks.
* Improves initial load performance.
* Does **not** require `React.lazy()`.

---

# Common Interview Questions

### What is Code Splitting?

Code Splitting is a build-time optimization where the bundler splits a large JavaScript bundle into multiple smaller chunks using dynamic imports.

---

### Who performs Code Splitting?

The **bundler** (Vite, Webpack, Rollup).

---

### Does React perform Code Splitting?

**No.**

React uses the chunks created by the bundler.

---

### Does Code Splitting require `React.lazy()`?

**No.**

Dynamic `import()` is enough to enable Code Splitting. `React.lazy()` is a React API for lazily loading React components.

---

# Quick Revision

* **Code Splitting** → Creates multiple JavaScript chunks.
* **Performed By** → Bundler.
* **Triggered By** → Dynamic `import()`.
* **Build Time** → ✅
* **Lazy Loading** → Downloads chunks only when needed.
* **Suspense** → Shows fallback UI while downloading.

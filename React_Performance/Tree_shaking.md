# 🌳 Tree Shaking

---

# What is Tree Shaking?

## Definition

**Tree Shaking** is a build-time optimization technique where the bundler (Vite, Webpack, Rollup) removes unused exports from the final JavaScript bundle, reducing the bundle size.

---

# Why do we need Tree Shaking?

Without Tree Shaking:

* Unused code is included in the final bundle.
* Larger bundle size.
* Slower downloads.
* Reduced performance.

With Tree Shaking:

* Removes unused exports.
* Smaller bundle size.
* Faster application loading.
* Better performance.

---

# Example

```javascript
// math.js

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}
```

```javascript
// App.js

import { add } from "./math";

console.log(add(10, 20));
```

Final Bundle:

```text
✅ add()

❌ subtract()

❌ multiply()

❌ divide()
```

The bundler removes the unused exports.

---

# How does Tree Shaking work?

```text
Source Code
        │
        ▼
Bundler analyzes imports
        │
        ▼
Finds unused exports
        │
        ▼
Removes them from the final bundle
```

---

# Named Import vs Namespace Import

### ✅ Named Import (Best)

```javascript
import { add } from "./math";
```

* Gives the bundler precise information.
* Tree Shaking is more effective.

---

### ⚠️ Namespace Import

```javascript
import * as math from "./math";
```

* Imports the entire module namespace.
* Tree Shaking may be less effective because the bundler has less precise information about which exports are actually used.

---

# Important Points

* Happens during **build time**.
* Performed by the **bundler**.
* Removes **unused exports**.
* Produces a smaller JavaScript bundle.
* Works best with **ES Modules (`import` / `export`)**.

---

# Common Interview Questions

### What is Tree Shaking?

Tree Shaking is a build-time optimization where the bundler removes unused exports from the final JavaScript bundle.

---

### Who performs Tree Shaking?

The **bundler** (Vite, Webpack, Rollup).

---

### When does Tree Shaking happen?

During the **build process**.

---

### Does React perform Tree Shaking?

**No.**

Tree Shaking is performed by the bundler.

---

### Which import style is better for Tree Shaking?

```javascript
import { add } from "./math";
```

Named imports provide more precise information, making Tree Shaking more effective.

---

# Quick Revision

* **Tree Shaking** → Removes unused exports.
* **Performed By** → Bundler.
* **Build Time** → ✅
* **Works Best With** → ES Modules.
* **Best Import Style** → Named Imports.
* **Benefit** → Smaller bundle & better performance.

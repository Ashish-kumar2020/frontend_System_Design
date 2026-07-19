# 🌑 Shadow DOM

---

# What is Shadow DOM?

## Definition

The **Shadow DOM** is a browser feature that creates an isolated DOM subtree attached to an element. It encapsulates a component's internal HTML, CSS, and JavaScript, preventing them from interfering with or being affected by the rest of the page.

---

# Why do we need Shadow DOM?

* Provides encapsulation.
* Prevents global CSS from affecting internal elements.
* Prevents internal styles from leaking outside.
* Keeps browser and Web Components isolated and reusable.

---

# Browser Examples

The browser internally uses Shadow DOM for elements like:

* `<input type="range">`
* `<input type="date">`
* `<video controls>`
* `<audio controls>`
* Many Web Components

Example:

```html
<input type="range">
```

Internally, the browser creates something similar to:

```text
input
│
└── Shadow Root
      │
      ├── Track
      ├── Thumb
      └── Progress
```

These internal elements are hidden from the normal DOM.

---

# Encapsulation

Global CSS does **not** automatically affect elements inside the Shadow DOM.

Example:

```css
button {
    background: red;
}
```

```html
<my-card></my-card>
```

If `<my-card>` contains:

```text
Shadow Root
│
└── button
```

The button inside the Shadow DOM **will not** automatically receive the red background.

---

# Important Points

* Browser feature.
* Creates an isolated DOM subtree.
* Encapsulates HTML, CSS, and JavaScript.
* Used by browsers and Web Components.
* Improves reusability and prevents style conflicts.

---

# Shadow DOM vs Virtual DOM

| Shadow DOM              | Virtual DOM                                      |
| ----------------------- | ------------------------------------------------ |
| Browser feature         | React feature                                    |
| Actual DOM subtree      | JavaScript representation                        |
| Used for encapsulation  | Used for efficient rendering                     |
| Isolates HTML, CSS & JS | Compares UI changes before updating the Real DOM |

---

# Real DOM vs Virtual DOM vs Shadow DOM

| Feature         | Real DOM            | Virtual DOM           | Shadow DOM              |
| --------------- | ------------------- | --------------------- | ----------------------- |
| Created By      | Browser             | React                 | Browser                 |
| Purpose         | Display the webpage | Efficient DOM updates | Encapsulation           |
| Visible to User | Yes                 | No                    | Internal implementation |
| Type            | Actual DOM          | JavaScript Object     | Isolated DOM subtree    |

---

# Common Interview Questions

### What is Shadow DOM?

The Shadow DOM is a browser feature that creates an isolated DOM subtree for encapsulating a component's internal HTML, CSS, and JavaScript.

---

### Is Shadow DOM a React feature?

**No.**

Shadow DOM is a **browser feature**.

---

### Does global CSS affect the Shadow DOM?

**No.**

By default, styles outside the Shadow DOM do not automatically affect elements inside it.

---

### Why is Shadow DOM used?

To provide encapsulation, prevent style leakage, and isolate a component's internal implementation.

---

# Quick Revision

* **Shadow DOM** → Browser feature for encapsulation.
* **Purpose** → Isolate HTML, CSS, and JavaScript.
* **Global CSS** → Does not automatically affect Shadow DOM.
* **Used By** → Browsers and Web Components.
* **Not Related To** → React's Virtual DOM.

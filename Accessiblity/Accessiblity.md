# ♿ Accessibility (a11y)

---

# What is Accessibility?

Accessibility means building web applications that can be used by everyone, including people with disabilities.

Benefits:

* Better user experience
* Better SEO
* Wider audience
* Compliance with accessibility standards

---

# Semantic HTML

## Definition

Semantic HTML means using HTML elements according to their intended purpose.

### Good Examples

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
<button>
<form>
```

### Non-semantic Elements

```html
<div>
<span>
```

Use these only when no semantic element fits.

### Benefits

* Better accessibility
* Better SEO
* Better code readability
* Better support for screen readers

---

# ARIA (Accessible Rich Internet Applications)

## Definition

ARIA provides additional accessibility information to assistive technologies such as screen readers.

### Common ARIA Attributes

```html
role="button"
aria-label="Search"
aria-hidden="true"
aria-expanded="true"
aria-disabled="true"
```

### Best Practice

* ✅ Use semantic HTML first.
* ✅ Use ARIA only when semantic HTML cannot provide the required accessibility.

Example:

```html
<button>Save</button>
```

is better than

```html
<div role="button">Save</div>
```

---

# Keyboard Navigation

Applications should be fully usable without a mouse.

### Common Keys

| Key         | Purpose                                |
| ----------- | -------------------------------------- |
| Tab         | Move to the next focusable element     |
| Shift + Tab | Move to the previous focusable element |
| Enter       | Activate buttons/links                 |
| Space       | Activate buttons and checkboxes        |
| Esc         | Close dialogs/modals                   |
| Arrow Keys  | Navigate menus, lists, tabs            |

### Best Practices

* Use semantic interactive elements (`button`, `a`, `input`, etc.).
* Ensure all interactive elements are keyboard accessible.
* Maintain a logical tab order.
* Keep a visible focus indicator.

---

# Quick Revision

* **Accessibility (a11y)** → Build applications usable by everyone.
* **Semantic HTML** → Use elements according to their purpose.
* **ARIA** → Adds accessibility information for assistive technologies.
* **Use ARIA only when semantic HTML is not enough.**
* **Tab** → Move focus to the next interactive element.
* **Shift + Tab** → Move focus to the previous interactive element.
* **Enter / Space** → Activate interactive elements.
* **Don't replace semantic elements (like `<button>`) with `<div>` unless absolutely necessary.**

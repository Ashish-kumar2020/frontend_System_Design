# 📜 List Virtualization (Windowing)

## What is List Virtualization?

List Virtualization is a performance optimization technique where **only the visible items (plus a small buffer)** are rendered instead of rendering the entire list.

This significantly reduces:

* DOM nodes
* Memory usage
* CPU usage
* Initial render time

---

# Why Do We Need It?

Imagine rendering:

```text
100,000 Products
```

Without virtualization:

```text
100,000 DOM Nodes ❌
```

Problems:

* Slow initial rendering
* High memory consumption
* Laggy scrolling
* Poor user experience

---

With Virtualization:

```text
Viewport

┌────────────────────┐
│ Product 21         │
│ Product 22         │
│ Product 23         │
│ Product 24         │
│ Product 25         │
└────────────────────┘

Only these items + a small buffer are rendered.
```

Instead of rendering all 100,000 items, React renders only about **20–50 DOM nodes** depending on the viewport.

---

# How It Works

```text
User Scrolls

↓

Items leaving viewport are removed

↓

New visible items are rendered

↓

DOM size remains almost constant
```

This technique is called **Windowing**.

---

# Windowing

Windowing means maintaining a small "window" of visible items.

Example:

```text
Visible Items

21
22
23
24
25
```

As the user scrolls:

```text
22
23
24
25
26
```

The DOM never contains the entire list.

---

# Benefits

* Faster initial rendering
* Lower memory usage
* Smooth scrolling
* Better scalability
* Better performance on low-end devices

---

# Virtualization vs Pagination

| Virtualization              | Pagination                        |
| --------------------------- | --------------------------------- |
| Renders only visible items  | Renders one page at a time        |
| Continuous scrolling        | Page-by-page navigation           |
| Best for infinite scrolling | Best for reports/admin tables     |
| Maintains small DOM         | Entire current page exists in DOM |

---

# Virtualization vs Lazy Loading

These are **not the same**.

## Lazy Loading

Loads data only when needed.

Example:

```text
Scroll

↓

Fetch next 20 products
```

Focus:

**Network optimization**

---

## Virtualization

Only renders visible items.

Example:

```text
1000 items already loaded

↓

Render only 15 visible items
```

Focus:

**Rendering optimization**

---

# Infinite Scroll + Virtualization

Best practice:

```text
API

↓

Infinite Scroll fetches data

↓

Virtualization renders only visible items
```

Together they optimize both:

* Network usage
* Rendering performance

---

# Recycling

Instead of creating new DOM elements every time:

```text
Old DOM Node

↓

Update its content

↓

Reuse it
```

This reduces DOM creation and improves scrolling performance.

---

# Dynamic Heights

Sometimes list items have different heights.

Example:

```text
Message 1
(height: 40px)

Message 2
(height: 120px)

Message 3
(height: 70px)
```

Libraries measure these heights dynamically to maintain smooth scrolling.

---

# Popular React Libraries

### react-window

* Lightweight
* Faster
* Recommended for most applications

---

### react-virtualized

* More features
* Supports grids, tables, dynamic heights
* Larger bundle size

---

# Common Use Cases

* E-commerce product listing
* Social media feeds
* Chat applications
* Log viewers
* Admin dashboards
* Data tables
* News feeds

---

# Best Practices

* Use virtualization for large lists (hundreds or thousands of items).
* Combine with Infinite Scroll for better performance.
* Use `React.memo` to prevent unnecessary re-renders.
* Use `useMemo` and `useCallback` where appropriate.
* Use `overscan` to render a small buffer for smoother scrolling.
* Avoid expensive operations during scroll events.

---

# Interview Definition

> List Virtualization is a rendering optimization technique where only the items currently visible in the viewport (along with a small buffer) are rendered into the DOM. As the user scrolls, off-screen items are removed and new visible items are rendered, keeping the DOM size small and improving performance.

---

# Quick Revision

* **List Virtualization** → Render only visible items.
* **Windowing** → Maintain a small viewport of rendered items.
* **Recycling** → Reuse DOM elements instead of creating new ones.
* **Dynamic Heights** → Handle variable-sized list items.
* **Virtualization ≠ Lazy Loading**
* **Virtualization + Infinite Scroll** → Best combination for large datasets.
* **Libraries** → `react-window`, `react-virtualized`
* **Best Use Cases** → Product listings, feeds, chat, dashboards, large tables.

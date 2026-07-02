# ⚡ Performance Patterns

---

# Debouncing

## Definition

Debouncing delays the execution of a function until a specified time has passed since the **last event**.

### How it works

* Every new event resets the timer.
* The function executes only after the user stops triggering the event.

### Use Cases

* Search input
* Autocomplete
* Form validation
* Search filters

### Benefits

* Reduces unnecessary API calls
* Improves performance
* Reduces server load

---

# Throttling

## Definition

Throttling limits how often a function can execute during continuous events.

### How it works

* Executes at a fixed interval (e.g., every 200 ms or 500 ms).
* Ignores intermediate events until the interval ends.

### Use Cases

* Infinite scrolling
* Scroll events
* Window resize
* Mouse movement
* Drag and drop

### Benefits

* Prevents excessive function executions
* Keeps the UI responsive

---

# Debouncing vs Throttling

| Debouncing                                   | Throttling                                           |
| -------------------------------------------- | ---------------------------------------------------- |
| Waits until the user stops triggering events | Executes at fixed intervals during continuous events |
| Search input                                 | Scroll events                                        |
| Autocomplete                                 | Infinite scroll                                      |
| Form validation                              | Window resize                                        |

---

# Virtualization

## Definition

Virtualization is a technique where **only the items visible in the viewport** are rendered.

### Why?

Rendering thousands of DOM nodes increases:

* Memory usage
* Rendering time
* Layout and paint work

Virtualization keeps the DOM small.

### Example

Without Virtualization:

```text
100,000 items
↓

100,000 DOM nodes
```

With Virtualization:

```text
100,000 items
↓

~20–30 DOM nodes
(Visible items + small buffer)
```

### Benefits

* Faster rendering
* Lower memory usage
* Smooth scrolling
* Better performance for large lists

### Common Use Cases

* Product lists
* Large tables
* Chat applications
* Activity feeds

### Popular Libraries

* react-window
* react-virtualized

---

# Quick Revision

* **Debouncing** → Wait until the user stops triggering events.
* **Throttling** → Execute at fixed intervals during continuous events.
* **Virtualization** → Render only visible items to reduce DOM size.
* **Search Bar** → Debouncing.
* **Infinite Scroll** → Throttling.
* **Large Lists/Tables** → Virtualization.

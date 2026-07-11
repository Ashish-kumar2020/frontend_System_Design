# Browser Rendering Pipeline

## Overview

Whenever a browser receives an HTML document, it does **not** directly display it on the screen.

Instead, it follows a series of steps to convert HTML and CSS into pixels that are displayed to the user.

The rendering pipeline is:

```text
HTML
    │
    ▼
HTML Parsing
    │
    ▼
DOM Tree

CSS
    │
    ▼
CSS Parsing
    │
    ▼
CSSOM Tree

DOM + CSSOM
      │
      ▼
Render Tree
      │
      ▼
Layout (Reflow)
      │
      ▼
Paint (Repaint)
      │
      ▼
Composite
      │
      ▼
Screen
```

---

# 1. HTML Parsing

When the browser receives an HTML document, it starts reading it from top to bottom.

Example:

```html
<html>
  <body>
    <h1>Hello</h1>
    <button>Click</button>
  </body>
</html>
```

The browser parses this HTML and converts it into an in-memory tree structure.

---

# 2. DOM Tree (Document Object Model)

The DOM is a tree-like representation of the HTML document.

Example:

```text
Document
│
└── html
     │
     └── body
          │
          ├── h1
          │     └── "Hello"
          │
          └── button
                └── "Click"
```

JavaScript interacts with the **DOM**, not the original HTML file.

Example:

```javascript
document.body

document.querySelector("button")

button.innerText = "Submit"
```

These operations modify the DOM Tree stored in memory.

---

# Why not modify the HTML file?

The original HTML comes from the server.

The browser does **not** modify that file.

Instead, it creates a DOM Tree in memory and updates that whenever JavaScript changes the page.

---

# 3. CSS Parsing

The browser downloads CSS files and parses them.

Example:

```css
h1 {
    color: red;
    font-size: 40px;
}

button {
    background: black;
    color: white;
}
```

---

# 4. CSSOM Tree (CSS Object Model)

The browser creates another tree containing all CSS rules.

Example:

```text
Stylesheet
│
├── h1
│     ├── color: red
│     └── font-size: 40px
│
└── button
      ├── background: black
      └── color: white
```

The CSSOM stores **styling information**, not HTML elements.

---

# Why separate DOM and CSSOM?

The browser separates structure from styling.

* DOM → HTML structure
* CSSOM → CSS rules

This makes applying CSS, handling specificity, and updating styles much more efficient.

---

# 5. Render Tree

The browser combines:

```text
DOM Tree
+
CSSOM Tree
```

to create the **Render Tree**.

The Render Tree contains:

* Visible elements
* Computed styles

Example:

```text
body
│
├── h1
│     ├── Text: Hello
│     ├── Color: Red
│     └── Font Size: 40px
│
└── button
      ├── Text: Click
      ├── Background: Black
      └── Color: White
```

### Important

Elements with:

```css
display: none;
```

exist in the DOM but **do not appear in the Render Tree** because they are not rendered.

---

# 6. Layout (Reflow)

At this stage, the browser calculates the **exact size and position** of every visible element.

Example:

```text
Header

X = 0
Y = 0
Width = 1920
Height = 80
```

```text
Card

X = 0
Y = 80
Width = 300
Height = 200
```

Now the browser knows exactly where each element should appear.

---

# Reflow

When a change affects an element's size or position, the browser must recalculate the layout.

Example:

```javascript
box.style.width = "500px";
```

The browser may also need to reposition nearby elements.

Properties that commonly trigger Reflow:

* width
* height
* margin
* padding
* font-size
* display
* Adding/removing DOM elements

---

# 7. Paint (Repaint)

Paint is the process of drawing pixels on the screen.

The browser draws:

* Background
* Text
* Borders
* Shadows
* Images

At this point, the browser creates the visual appearance of the page.

Example:

```text
Blue Button

White Text

Shadow
```

---

# Repaint

If only the visual appearance changes (not the layout), the browser performs a Repaint.

Example:

```javascript
box.style.background = "red";
```

Only the color changes.

The size and position remain the same.

Therefore:

* No Layout
* Only Paint

Properties that usually trigger Repaint:

* background
* color
* border-color
* visibility

---

# 8. Composite

The browser often paints different parts of the page into separate **layers**.

Example:

```text
Layer 1 → Navbar

Layer 2 → Video

Layer 3 → Popup
```

The Composite stage combines these painted layers into the final image shown on the screen.

Composite **does not redraw pixels**.

It works with already painted layers.

Example operations:

* Move layer
* Scale layer
* Rotate layer
* Change opacity

---

# Why is Composite important?

Operations like:

```css
transform: translateX(100px);

opacity: 0.5;
```

can often be handled during the Composite stage.

This avoids Layout and Paint, making animations smoother.

---

# Browser Pipeline Summary

```text
HTML
│
▼
HTML Parsing
│
▼
DOM Tree

CSS
│
▼
CSS Parsing
│
▼
CSSOM Tree

DOM + CSSOM
│
▼
Render Tree
│
▼
Layout
│
▼
Paint
│
▼
Composite
│
▼
Screen
```

---

# Reflow vs Repaint

| Change       | Reflow | Repaint |
| ------------ | :----: | :-----: |
| width        |    ✅   |    ✅    |
| height       |    ✅   |    ✅    |
| margin       |    ✅   |    ✅    |
| padding      |    ✅   |    ✅    |
| display      |    ✅   |    ✅    |
| font-size    |    ✅   |    ✅    |
| background   |    ❌   |    ✅    |
| color        |    ❌   |    ✅    |
| border-color |    ❌   |    ✅    |
| visibility   |    ❌   |    ✅    |

---

# Why is `transform` better than `left`?

### Changing `left`

```css
left: 100px;
```

Usually triggers:

```text
Layout

↓

Paint

↓

Composite
```

---

### Changing `transform`

```css
transform: translateX(100px);
```

Usually triggers only:

```text
Composite
```

No Layout.

No Paint.

This makes animations much more efficient.

---

# Interview Questions

## What is the DOM?

The DOM is a tree representation of the HTML document created by the browser. JavaScript interacts with the DOM instead of the original HTML file.

---

## What is the CSSOM?

The CSSOM is a tree representation of all CSS rules created by the browser during CSS parsing.

---

## What is the Render Tree?

The Render Tree is created by combining the DOM Tree and the CSSOM Tree. It contains only visible elements with their computed styles.

---

## What is Layout?

Layout is the process where the browser calculates the exact size and position of every visible element.

---

## What is Reflow?

Reflow is the recalculation of layout after a change that affects an element's size or position.

---

## What is Paint?

Paint is the process of drawing pixels such as backgrounds, borders, text, and images onto the screen.

---

## What is Repaint?

Repaint occurs when only an element's visual appearance changes without affecting its layout.

---

## What is Composite?

Composite is the final rendering stage where the browser combines painted layers into the final image displayed on the screen.

---

# One-Line Revision

### DOM

> Structure of the HTML document.

### CSSOM

> Structure of CSS rules.

### Render Tree

> Visible elements + computed styles.

### Layout

> Calculates size and position.

### Reflow

> Recalculates layout after geometry changes.

### Paint

> Draws pixels.

### Repaint

> Redraws pixels when only appearance changes.

### Composite

> Combines painted layers into the final image and efficiently handles operations like `transform` and `opacity`.

---

# Chapter Status

* ✅ HTML Parsing
* ✅ DOM Tree
* ✅ CSS Parsing
* ✅ CSSOM Tree
* ✅ Render Tree
* ✅ Layout
* ✅ Reflow
* ✅ Paint
* ✅ Repaint
* ✅ Composite



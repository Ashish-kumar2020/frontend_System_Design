# 🌐 Browser Object Model (BOM)

---

# What is BOM?

## Definition

The **Browser Object Model (BOM)** is a collection of browser-provided objects and APIs that allow JavaScript to interact with the browser environment instead of the webpage.

---

# Why do we need BOM?

* Interact with browser features.
* Access browser information.
* Navigate between pages.
* Store data in the browser.
* Control browser behavior.

---

# Common BOM Objects

### Window

The **window** object is the global object provided by the browser. All BOM objects are accessible through it.

Example:

```javascript
window.alert("Hello");

window.setTimeout(() => {}, 1000);
```

---

### Location

Represents the current URL of the browser.

Example:

```javascript
location.href

location.reload()
```

---

### History

Allows navigation through the browser history.

Example:

```javascript
history.back()

history.forward()
```

---

### Navigator

Provides information about the browser and device.

Example:

```javascript
navigator.userAgent

navigator.language

navigator.geolocation
```

---

### Screen

Provides information about the user's screen.

Example:

```javascript
screen.width

screen.height
```

---

### Storage

Browser storage APIs.

Example:

```javascript
localStorage.setItem("name", "Ashish");

sessionStorage.setItem("token", "123");
```

---

# DOM vs BOM

## DOM (Document Object Model)

### Definition

The **DOM** is a tree representation of the HTML document created by the browser. It allows JavaScript to access and manipulate the webpage.

Examples:

```javascript
document.querySelector()

document.createElement()

document.getElementById()
```

---

## BOM (Browser Object Model)

### Definition

The **BOM** represents the browser environment and provides APIs to interact with browser features such as navigation, storage, history, and browser information.

Examples:

```javascript
window

location

history

navigator

screen

localStorage

sessionStorage
```

---

# Relationship

```text
Browser
    │
    ▼
Window (Global Object)
    │
    ├── document (DOM)
    ├── location
    ├── history
    ├── navigator
    ├── screen
    ├── localStorage
    ├── sessionStorage
    └── alert()
```

> **The DOM is accessed through the `document` object, which is a property of the global `window` object.**

---

# DOM vs BOM

| DOM                                 | BOM                                         |
| ----------------------------------- | ------------------------------------------- |
| Represents the webpage              | Represents the browser                      |
| Manipulates HTML elements           | Interacts with browser features             |
| Accessed using `document`           | Accessed using `window` and related objects |
| Example: `document.querySelector()` | Example: `location.reload()`                |

---

# Common Interview Questions

### What is BOM?

The Browser Object Model (BOM) is a collection of browser-provided objects and APIs that allow JavaScript to interact with the browser environment.

---

### What is DOM?

The Document Object Model (DOM) is a tree representation of the HTML document that allows JavaScript to access and manipulate webpage elements.

---

### Is `document` part of the BOM?

**Yes.**

The `document` object represents the DOM and is exposed through the browser's global `window` object.

---

### Is `localStorage` part of the DOM?

**No.**

`localStorage` is part of the **BOM** because it interacts with the browser's storage, not the webpage.

---

# Quick Revision

* **DOM** → Represents the webpage.
* **BOM** → Represents the browser.
* **window** → Global browser object.
* **document** → DOM object.
* **location** → Current URL.
* **history** → Browser navigation.
* **navigator** → Browser information.
* **screen** → Screen information.
* **localStorage / sessionStorage** → Browser storage.

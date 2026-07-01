# 💾 Storage in the Browser

---

# LocalStorage

## Definition

**LocalStorage** is a browser storage API that stores data as **key-value pairs**. The data persists until it is explicitly removed or the user clears the browser storage.

### Key Points

* Stores **strings only**.
* Shared across all tabs of the same origin.
* Persists after page refresh and browser restart.
* Capacity: ~5–10 MB (browser dependent).

### Common Methods

```javascript
localStorage.setItem("key", "value");
localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear();
```

### Storing Objects

```javascript
localStorage.setItem("user", JSON.stringify(user));

const user = JSON.parse(localStorage.getItem("user"));
```

### Use Cases

* Theme preference
* Language preference
* User settings
* Non-sensitive persistent data

---

# SessionStorage

## Definition

**SessionStorage** is a browser storage API that stores data as **key-value pairs** for a single browser tab (session).

### Key Points

* Stores **strings only**.
* Private to a single browser tab.
* Persists after page refresh.
* Deleted when the browser tab/window is closed.

### Common Methods

```javascript
sessionStorage.setItem("key", "value");
sessionStorage.getItem("key");
sessionStorage.removeItem("key");
sessionStorage.clear();
```

### Use Cases

* Multi-step forms
* Temporary filters
* Checkout progress
* Session-specific data

---

# Cookies

## Definition

**Cookies** are small pieces of data stored by the browser. The browser automatically includes them with matching HTTP requests.

### Key Points

* Stored by the **browser**.
* Automatically sent with HTTP requests.
* Can be **Session** or **Persistent** cookies.
* Commonly used for authentication and session management.

---

## Cookie Types

### Session Cookie

* Deleted when the browser session ends.

### Persistent Cookie

* Stored until its expiration time (`Expires` or `Max-Age`).

---

## Cookie Attributes

### HttpOnly

* Prevents JavaScript from accessing the cookie.
* Protects against XSS token theft.

### Secure

* Cookie is sent **only over HTTPS**.

### SameSite

Controls whether cookies are sent with cross-site requests.

* **Strict** → Never sent on cross-site requests.
* **Lax** → Sent only for some safe cross-site navigations.
* **None** → Sent on all cross-site requests (requires `Secure`).

### Use Cases

* Authentication tokens
* Session IDs
* User login sessions

---

# IndexedDB

## Definition

**IndexedDB** is a browser-based NoSQL database used to store large amounts of structured data on the client side.

### Key Points

* Stores objects, arrays, files, and blobs.
* Supports large amounts of data.
* Asynchronous API.
* Ideal for offline-first applications.

### Use Cases

* Offline document editors
* Offline email clients
* Music caching
* Image storage
* Offline maps

---

# Comparison

| Feature                               | LocalStorage | SessionStorage         | Cookies           | IndexedDB                 |
| ------------------------------------- | ------------ | ---------------------- | ----------------- | ------------------------- |
| Storage Type                          | Key-Value    | Key-Value              | Key-Value         | Database                  |
| Stores Strings                        | ✅            | ✅                      | ✅                 | ❌ (Supports complex data) |
| Page Refresh                          | ✅            | ✅                      | ✅                 | ✅                         |
| Browser Restart                       | ✅            | ❌                      | Depends on expiry | ✅                         |
| Shared Across Tabs                    | ✅            | ❌                      | ✅                 | ✅                         |
| Automatically Sent with HTTP Requests | ❌            | ❌                      | ✅                 | ❌                         |
| Best For                              | Preferences  | Temporary session data | Authentication    | Offline & large data      |

---

# Common Interview Questions

### Which storage is shared across browser tabs?

**LocalStorage** and **Cookies**.

---

### Which storage is private to a browser tab?

**SessionStorage**.

---

### Which storage is automatically sent with HTTP requests?

**Cookies**.

---

### Which storage is best for large offline data?

**IndexedDB**.

---

### Can LocalStorage store objects?

Not directly. Convert objects using `JSON.stringify()` before storing and `JSON.parse()` after retrieving.

---

# Quick Revision

* **LocalStorage** → Persistent key-value storage.
* **SessionStorage** → Tab-specific key-value storage.
* **Cookies** → Automatically sent with HTTP requests; support `HttpOnly`, `Secure`, and `SameSite`.
* **IndexedDB** → Browser database for large structured and offline data.

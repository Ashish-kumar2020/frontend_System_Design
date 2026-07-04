# 🚀 Preload vs Prefetch

Both **Preload** and **Prefetch** are browser resource hints that help optimize resource loading.

---

# Preload

## Definition

Preload tells the browser:

> **"This resource is critical for the current page. Download it immediately."**

It assigns **high priority** to the resource.

Example:

```html id="ibvxe5"
<link
  rel="preload"
  href="/hero.webp"
  as="image"
/>
```

---

## When to Use

Use preload for resources required immediately on the current page:

* Hero images
* Fonts
* Critical CSS
* Important JavaScript
* Videos shown above the fold

---

## Browser Flow

Without Preload

```text id="mjlwm2"
HTML

↓

CSS

↓

JS

↓

Discover Hero Image

↓

Download Hero Image
```

With Preload

```text id="jlwm3"
HTML

↓

Download Hero Image Immediately

↓

Continue Parsing HTML
```

---

## Benefits

* Faster resource loading
* Better LCP
* Faster page rendering

---

## Important Points

### Preload only downloads the resource.

It **does not execute** JavaScript.

Example:

```html id="jlwm4"
<link
  rel="preload"
  href="/main.js"
  as="script"
/>
```

The script is downloaded early but executes only when:

```html id="jlwm5"
<script src="/main.js"></script>
```

is encountered.

---

### Why is `as` Required?

```html id="jlwm6"
<link
  rel="preload"
  href="/hero.webp"
  as="image"
/>
```

The `as` attribute tells the browser the resource type.

Examples:

```text id="jlwm7"
image
script
style
font
fetch
video
```

This helps the browser:

* Assign correct priority
* Apply correct caching
* Apply proper security policies

---

### Don't Preload Everything

Preloading every resource makes all of them high priority.

Result:

* Network congestion
* Poor resource prioritization
* Slower page performance

Preload **only critical resources**.

---

# Prefetch

## Definition

Prefetch tells the browser:

> **"This resource may be needed in the future. Download it when the browser is idle."**

It assigns **low priority** to the resource.

Example:

```html id="jlwm8"
<link
  rel="prefetch"
  href="/products.js"
/>
```

---

## When to Use

Use prefetch for resources likely needed on the next page:

* Next page JavaScript bundles
* Product pages
* Dashboard pages
* Future navigation assets

---

## Browser Flow

```text id="jlwm9"
Current Page Loaded

↓

Browser Becomes Idle

↓

Download Future Resources

↓

User Navigates

↓

Already Cached
```

---

## Benefits

* Faster navigation
* Better user experience
* Reduced waiting time on future pages

---

## Important Points

### Prefetch is Low Priority

Current page resources always load first.

Only after the browser is idle does it start prefetching.

---

### Prefetch is Only a Hint

The browser may skip prefetching if:

* Network is slow
* Browser is busy
* User enables Data Saver

---

### Prefetched Resources are Cached

When the user navigates later:

```text id="jlwm10"
Browser Cache

↓

Use Prefetched Resource

↓

Faster Navigation
```

---

# Preload vs Prefetch

| Preload              | Prefetch                      |
| -------------------- | ----------------------------- |
| Current page         | Future page                   |
| High priority        | Low priority                  |
| Download immediately | Download when browser is idle |
| Improves LCP         | Improves navigation speed     |
| Critical resources   | Likely future resources       |

---

# Preload vs Lazy Loading

| Preload                | Lazy Loading              |
| ---------------------- | ------------------------- |
| Download early         | Download only when needed |
| High priority          | Low priority              |
| Current page resources | Below-the-fold resources  |
| Hero image             | Footer image              |

---

# Preconnect

## Definition

Preconnect tells the browser to establish a connection with another origin before the resource is requested.

Example:

```html id="jlwm11"
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
/>
```

Without Preconnect

```text id="jlwm12"
DNS

↓

TCP

↓

TLS

↓

Download Font
```

With Preconnect

```text id="jlwm13"
DNS

↓

TCP

↓

TLS

(Already Established)

↓

Download Font Immediately
```

Use Preconnect for:

* CDN
* Google Fonts
* External APIs
* Third-party resources

---

# Interview Definition

**Preload**

> Tells the browser to prioritize downloading a critical resource required for the current page.

**Prefetch**

> Tells the browser to download resources that may be required for future navigation when the browser is idle.

**Preconnect**

> Establishes an early connection to another origin, reducing connection latency when the resource is requested.

---

# Quick Revision

* **Preload** → Current page, high priority.
* **Prefetch** → Future page, low priority.
* **Preconnect** → Establish network connection early.
* **Preload doesn't execute JavaScript; it only downloads it early.**
* **Prefetch is only a browser hint and may be skipped.**
* **Don't preload every resource—only critical ones.**
* **Use `as` with preload to specify the resource type.**

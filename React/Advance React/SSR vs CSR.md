# 🚀 SSR vs CSR (Interview Notes)

---

# What is CSR (Client Side Rendering)?

In CSR, the server sends a minimal HTML file.

Example:

```html
<body>
    <div id="root"></div>

    <script src="index.js"></script>
</body>
```

The browser downloads JavaScript.

React executes on the client.

Then React creates the UI.

---

# CSR Flow

```text
User Request

↓

Server Sends Empty HTML

↓

Browser Loads HTML

↓

Download JS Bundle

↓

Execute React

↓

API Request

↓

Build Fiber Tree

↓

Create DOM

↓

User Sees UI
```

---

# What is SSR (Server Side Rendering)?

In SSR, React executes on the server.

The server generates the HTML.

The browser immediately displays the page.

Later React hydrates it.

---

# SSR Flow

```text
User Request

↓

Server Executes React

↓

Generate HTML

↓

Send HTML

↓

Browser Paints HTML

↓

Download JS Bundle

↓

Hydration

↓

Interactive
```

---

# CSR vs SSR

| Feature | CSR | SSR |
|----------|-----|-----|
| Rendering Location | Browser | Server |
| Initial HTML | Empty Root Div | Fully Rendered HTML |
| SEO | Poor | Excellent |
| First Contentful Paint (FCP) | Slower | Faster |
| Time To Interactive (TTI) | Usually Immediate Once Rendered | After Hydration |
| Hydration Required | ❌ No | ✅ Yes |
| Initial Load | Slower | Faster |
| Client Navigation | Fast | Fast (After Hydration) |

---

# What does CSR Server return?

```html
<div id="root"></div>
```

No components.

No UI.

React builds everything in the browser.

---

# What does SSR Server return?

Example:

```html
<h1>Products</h1>

<div>iPhone</div>

<div>MacBook</div>
```

The browser can immediately display the content.

---

# Why is CSR slower initially?

```text
Request

↓

Empty HTML

↓

Download JS

↓

Execute JS

↓

Fetch Data

↓

Render UI

↓

User Sees Content
```

Until JavaScript loads, the page is usually blank or shows a loading spinner.

---

# Why is SSR faster initially?

```text
Request

↓

Server Generates HTML

↓

Browser Paints HTML

↓

User Sees Content

↓

Download JS

↓

Hydration

↓

Interactive
```

Content appears before JavaScript finishes downloading.

---

# FCP (First Contentful Paint)

Definition:

> Time until the user sees the first visible content.

### CSR

```text
Empty HTML

↓

Download JS

↓

Render

↓

FCP
```

Slower.

---

### SSR

```text
Server HTML

↓

Browser Paint

↓

FCP
```

Faster.

---

# TTI (Time To Interactive)

Definition:

> Time until the page becomes interactive.

### CSR

By the time UI appears:

- React already loaded
- Event listeners attached

Usually interactive immediately.

---

### SSR

```text
HTML Visible

↓

Download JS

↓

Hydration

↓

Interactive
```

The page may be visible before it becomes interactive.

---

# Why does SSR need Hydration?

Because server-rendered HTML is static.

Hydration:

- Builds the Fiber Tree
- Attaches Event Listeners
- Connects React State
- Reuses Existing DOM

Without hydration:

```text
Button

↓

Visible

↓

Not Clickable
```

---

# When should we use CSR?

Best for:

✅ Admin Dashboards

✅ Banking Applications

✅ CRM

✅ Gmail

✅ Trello

Reason:

- Login Required
- Highly Interactive
- SEO not important

---

# When should we use SSR?

Best for:

✅ E-commerce Product Pages

✅ Blogs

✅ News Websites

✅ Marketing Pages

Reason:

- Public Pages
- SEO Important
- Faster First Paint

---

# Real World Example

Amazon

```text
/Product/iPhone

↓

SSR
```

Reason:

SEO + Fast Initial Load

---

Amazon Orders

```text
/orders

↓

CSR
```

Reason:

Login Required

Highly Interactive

SEO doesn't matter.

---

# Advantages of CSR

✅ Simpler Backend

✅ Fast Client Navigation

✅ Great for Interactive Apps

---

# Disadvantages of CSR

❌ Slower Initial Load

❌ Poor SEO

❌ Blank Screen until JS Loads

---

# Advantages of SSR

✅ Faster First Paint

✅ Better SEO

✅ Better Social Sharing

---

# Disadvantages of SSR

❌ Higher Server Load

❌ More Complex

❌ Requires Hydration

---

# Interview Questions

## Q1. What is CSR?

> Rendering happens in the browser after downloading JavaScript.

---

## Q2. What is SSR?

> Rendering happens on the server, which sends ready-to-display HTML to the browser.

---

## Q3. Why is SSR better for SEO?

Because search engines receive meaningful HTML immediately instead of an empty root div.

---

## Q4. Why does SSR need Hydration?

Because server-rendered HTML is static.

Hydration attaches event listeners and connects React with the existing DOM.

---

## Q5. Which has a faster First Contentful Paint?

✅ SSR

Reason:

Browser receives already-rendered HTML.

---

## Q6. Which has better Time To Interactive?

Usually CSR.

Reason:

When UI appears, JavaScript is already loaded and React is running.

SSR still needs hydration before full interactivity.

---

## Q7. Which would you choose for a Banking Dashboard?

✅ CSR

Reason:

- Login Required
- Highly Interactive
- SEO not important

---

## Q8. Which would you choose for an E-commerce Product Page?

✅ SSR

Reason:

- Public Page
- SEO Important
- Faster Initial Paint

---

# ⭐ Golden Mental Model

## CSR

```text
Request

↓

Empty HTML

↓

Download JS

↓

React Executes

↓

Render UI

↓

Interactive
```

---

## SSR

```text
Request

↓

Server Renders HTML

↓

Browser Paint

↓

Download JS

↓

Hydration

↓

Interactive
```

---

# Quick Revision

| Topic | Remember |
|--------|----------|
| CSR | Browser renders UI |
| SSR | Server renders UI |
| SEO | SSR wins |
| FCP | SSR faster |
| TTI | CSR often faster after rendering |
| Hydration | Required only in SSR |
| Dashboard | CSR |
| Blog/Product Page | SSR |

---

# ⭐ Interview One-Liners

### CSR

> The server sends a minimal HTML file, and React renders the UI in the browser after JavaScript loads.

---

### SSR

> The server renders the React application into HTML and sends it to the browser, allowing faster initial content display and better SEO.

---

### FCP

> SSR usually has a better First Contentful Paint because the browser receives ready-to-render HTML.

---

### TTI

> SSR may take longer to become interactive because hydration must complete, whereas CSR is usually interactive as soon as the UI appears.

---

### Choosing Between SSR and CSR

> Choose SSR for public, SEO-sensitive pages. Choose CSR for authenticated, highly interactive applications where SEO is not important.
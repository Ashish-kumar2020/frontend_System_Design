# Rendering Strategies (SPA, CSR, SSR, SSG, ISR & Hydration)

---

# Single Page Application (SPA)

## What is SPA?

A **Single Page Application (SPA)** loads a single HTML page when the application starts. After that, navigation is handled on the client side using JavaScript without requesting a new HTML page from the server.

Example:

* React + React Router
* Vue
* Angular

---

## How SPA Works

```text
Browser

↓

GET /

↓

Server

↓

index.html

↓

React Loads

↓

Home Page

↓

User clicks About

↓

React Router changes the route

↓

React renders <About />

↓

No page reload
```

---

## Why is React called an SPA?

A React application using **React Router** behaves like an SPA because:

* Only one HTML page is loaded initially.
* Navigation does not request new HTML pages.
* React Router changes the URL.
* React re-renders the component associated with the route.

---

## Advantages

* Fast navigation
* Better user experience
* No full page reload
* Smooth transitions

---

## Disadvantages

* Poor initial load time
* JavaScript must download before rendering
* SEO is less effective than SSR
* Large JavaScript bundles can slow down the first load

---

# Client Side Rendering (CSR)

## What is CSR?

Client Side Rendering means the browser is responsible for rendering the UI.

The server only sends:

* HTML
* CSS
* JavaScript

React executes in the browser and creates the UI.

---

## Flow

```text
Browser

↓

GET /

↓

Server

↓

index.html

↓

<div id="root"></div>

↓

Download JS

↓

Execute JS

↓

React renders UI

↓

User sees page
```

---

## Example

Initial HTML:

```html
<body>
    <div id="root"></div>

    <script src="main.js"></script>
</body>
```

After React executes:

```html
<div id="root">

    <h1>Products</h1>

    <button>Add to Cart</button>

</div>
```

---

## Advantages

* Excellent user experience after the first load.
* Smooth navigation.
* Reduced server work.
* Perfect for dashboards.

---

## Disadvantages

* Blank screen while JavaScript downloads.
* Slower first render.
* SEO challenges.
* Doesn't work without JavaScript.

---

# Server Side Rendering (SSR)

## What is SSR?

Server Side Rendering means the server renders the HTML before sending it to the browser.

The browser immediately displays the page.

JavaScript downloads later.

---

## Flow

```text
Browser

↓

GET /

↓

Server renders React

↓

Server generates HTML

↓

Browser displays HTML

↓

Download JavaScript

↓

Hydration

↓

Interactive Page
```

---

## Example

Server sends:

```html
<body>

<h1>Products</h1>

<div>Product 1</div>

<button>Add to Cart</button>

</body>
```

The user sees content immediately.

---

## Advantages

* Excellent SEO
* Fast initial render
* Better user experience
* Good for public websites

---

## Disadvantages

* Server renders every request
* Increased server load
* Slower than SSG

---

# Hydration

## What is Hydration?

Hydration is the process where React attaches JavaScript event listeners to HTML that was already rendered by the server.

SSR gives the HTML.

Hydration makes it interactive.

---

## Flow

```text
Server

↓

HTML

↓

Browser displays page

↓

JavaScript downloads

↓

React attaches events

↓

Interactive page
```

---

## Important

Before hydration:

```text
Button Visible

↓

Click

↓

Nothing Happens
```

After hydration:

```text
Button Visible

↓

Click

↓

React Event Fires
```

---

## Interview Definition

Hydration is the process where React attaches event listeners to server-rendered HTML, making the page interactive without re-rendering the entire DOM.

---

# Static Site Generation (SSG)

## What is SSG?

Static Site Generation generates HTML during the build process.

Usually:

```bash
npm run build
```

The generated HTML is stored as static files.

Whenever a user requests the page, the server returns the already generated HTML.

---

## Flow

```text
Build Time

↓

Generate HTML

↓

Store HTML

↓

User Requests

↓

Return HTML
```

---

## Advantages

* Extremely fast
* Excellent SEO
* Minimal server work
* Great CDN caching

---

## Disadvantages

Content becomes stale if the data changes after the build.

To update pages:

* Rebuild
* Redeploy

---

## Best Use Cases

* Blogs
* Documentation
* Portfolio
* Marketing pages
* Landing pages

---

# Incremental Static Regeneration (ISR)

## Why ISR?

Problem with SSG:

Build Time

↓

Price = ₹80,000

↓

Database Updated

↓

₹75,000

↓

Users still see ₹80,000

---

## Solution

Regenerate the page automatically after a specified interval.

---

## Flow

```text
Build Time

↓

Generate HTML

↓

User Requests

↓

Page Older Than X Seconds?

↓

Yes

↓

Regenerate HTML

↓

Serve Updated HTML
```

---

## Advantages

* Fast like SSG
* Fresh data
* No full rebuild
* Better scalability

---

## Best Use Cases

* E-commerce
* Product pages
* News websites
* Travel websites

---

# Comparison

| Feature           | CSR         | SSR                    | SSG                 | ISR                       |
| ----------------- | ----------- | ---------------------- | ------------------- | ------------------------- |
| HTML Generated    | Browser     | Server (every request) | Build Time          | Build Time + Regeneration |
| SEO               | Poor–Medium | Excellent              | Excellent           | Excellent                 |
| Initial Load      | Slow        | Fast                   | Fastest             | Fast                      |
| Server Load       | Low         | High                   | Very Low            | Low                       |
| Content Freshness | Live        | Always Fresh           | Stale Until Rebuild | Automatically Refreshed   |
| Best Use Case     | Dashboard   | Public Dynamic Pages   | Blogs               | E-commerce                |

---

# Which Rendering Strategy Should I Choose?

## Admin Dashboard

✅ CSR

Reason:

* Authentication
* Highly interactive
* SEO not important

---

## Company Blog

✅ SSG

Reason:

* Rarely changes
* Excellent SEO
* Very fast

---

## Amazon Product Page

✅ ISR

Reason:

* Good SEO
* Prices change periodically
* Fast loading
* Fresh content

---

## Live Cricket Score

✅ SSR for the initial page

*

✅ SSE (or WebSockets) for live updates

Reason:

* Fast first render
* Real-time score updates

---

# Frequently Asked Interview Questions

## What is SPA?

A Single Page Application loads one HTML page initially and uses client-side routing to navigate without reloading the page.

---

## Difference between SPA and CSR?

SPA is an application architecture focused on client-side navigation.

CSR is a rendering strategy where the browser renders the UI.

Most React SPAs use CSR.

---

## What is SSR?

The server renders HTML before sending it to the browser.

---

## What is Hydration?

Hydration is the process where React attaches JavaScript event listeners to server-rendered HTML to make it interactive.

---

## What is SSG?

HTML is generated during the build process and served as static files.

---

## What is ISR?

ISR extends SSG by automatically regenerating static pages after a specified interval.

---

# One-Line Revision

### CSR

> Browser renders the page after downloading JavaScript.

### SSR

> Server renders the page for every request.

### SSG

> Server generates HTML once during build time.

### ISR

> Server generates HTML during build time and regenerates it automatically after a specified interval.

### Hydration

> React attaches event listeners to server-rendered HTML.

---

# Chapter Status

* ✅ SPA
* ✅ CSR
* ✅ SSR
* ✅ Hydration
* ✅ SSG
* ✅ ISR

**Rendering Strategies: Completed**

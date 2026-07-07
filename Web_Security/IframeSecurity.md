# iFrame Security (Clickjacking & Cross-Frame Attacks)

## What is an iFrame?

An **iFrame (Inline Frame)** is an HTML element used to embed one webpage inside another webpage.

Example:

```html
<iframe
    src="https://example.com"
    width="600"
    height="400">
</iframe>
```

### Common Use Cases

* YouTube videos
* Google Maps
* Payment gateways (Stripe, Razorpay)
* Chat widgets
* Advertisements
* Documentation

---

# Why are iFrames Used?

They allow external content to be displayed **without leaving the current webpage**.

Benefits:

* Reuse external applications
* Embed third-party services
* Isolate external content
* Improve user experience

---

# Security Risks of iFrames

The biggest risk is **Clickjacking**.

Other risks include:

* Cross-frame communication attacks
* Embedding malicious websites
* Data leakage through insecure messaging

---

# Clickjacking

## What is Clickjacking?

Clickjacking is an attack where a malicious website loads a legitimate website inside a **hidden or transparent iframe** and tricks users into clicking sensitive buttons.

Example:

```text
Attacker Website
        │
        ▼
Invisible iframe
(Bank Website)
        │
        ▼
User thinks they clicked:
▶ Play Video

Actually clicked:
Transfer Money
```

### Goal

* Perform unwanted actions
* Transfer money
* Change account settings
* Delete data
* Submit forms without user awareness

---

# Why Does Clickjacking Happen?

By default, browsers allow websites to be embedded inside iframes unless the target website explicitly blocks it.

---

# Protection Against Clickjacking

## 1. X-Frame-Options

Controls whether a page can be embedded inside an iframe.

### DENY

```http
X-Frame-Options: DENY
```

No website can embed this page.

---

### SAMEORIGIN

```http
X-Frame-Options: SAMEORIGIN
```

Only pages from the **same origin** can embed it.

---

# 2. Content Security Policy (Recommended)

Modern solution.

```http
Content-Security-Policy:
frame-ancestors 'self'
```

Meaning:

Only the same website can embed this page.

Allow trusted partners:

```http
Content-Security-Policy:
frame-ancestors 'self' https://partner.com
```

---

# 3. iframe sandbox

Restricts what an embedded page can do.

Example:

```html
<iframe
    src="https://example.com"
    sandbox>
</iframe>
```

Grant only required permissions.

Example:

```html
<iframe
    src="https://example.com"
    sandbox="
        allow-scripts
        allow-forms">
</iframe>
```

Common permissions:

* allow-scripts
* allow-forms
* allow-popups
* allow-downloads
* allow-same-origin

---

# Same-Origin Policy (SOP)

Two pages from different origins **cannot directly access each other's DOM or JavaScript**.

Example:

Parent:

```text
https://google.com
```

iFrame:

```text
https://facebook.com
```

This is blocked:

```js
iframe.contentWindow.document
```

Purpose:

Prevent websites from stealing data from other websites.

---

# Cross-Frame Communication

When communication is required, use:

```js
window.postMessage()
```

Parent:

```js
iframe.contentWindow.postMessage(
    "Hello",
    "https://example.com"
);
```

Receiver:

```js
window.addEventListener("message", (event) => {
    console.log(event.data);
});
```

Always validate:

```js
event.origin
```

Never trust messages from unknown origins.

---

# Frontend Developer Perspective

As a React developer you will commonly:

* Embed YouTube videos
* Embed Google Maps
* Integrate payment gateways
* Use customer support chat widgets

Best Practices:

* Use `sandbox` whenever possible.
* Verify `event.origin` before processing `postMessage`.
* Avoid embedding untrusted websites.
* Never trust cross-frame messages without validation.

---

# XSS vs Clickjacking

| XSS                                              | Clickjacking                                               |
| ------------------------------------------------ | ---------------------------------------------------------- |
| Injects malicious JavaScript                     | Tricks users into clicking hidden UI                       |
| Executes attacker code                           | Manipulates user interaction                               |
| Prevent with sanitization, CSP, HttpOnly cookies | Prevent with X-Frame-Options, CSP frame-ancestors, sandbox |

---

# Interview Questions

### What is Clickjacking?

An attack where a malicious website embeds a legitimate website inside a hidden iframe and tricks users into clicking sensitive elements.

---

### How do you prevent Clickjacking?

* X-Frame-Options
* Content-Security-Policy (`frame-ancestors`)
* iframe `sandbox`
* Same-Origin Policy
* Validate `postMessage` origins

---

### Why is Same-Origin Policy important?

It prevents one website from directly accessing another website's DOM or JavaScript, protecting user data.

---

### Why should `postMessage` validate `event.origin`?

To ensure messages are accepted **only from trusted websites** and prevent malicious sites from sending fake messages.

---

# Interview Answer (30 Seconds)

An **iFrame** allows one webpage to embed another webpage. The biggest security risk is **Clickjacking**, where an attacker loads a legitimate website inside a hidden or transparent iframe and tricks users into clicking sensitive controls. Protection mechanisms include **X-Frame-Options**, **Content Security Policy (`frame-ancestors`)**, the **sandbox** attribute, the **Same-Origin Policy**, and validating **`postMessage`** origins for secure cross-frame communication.

---

# Quick Revision

## What?

An iFrame embeds one webpage inside another.

## Why?

* Videos
* Maps
* Payments
* Chat widgets
* Ads

## Risks

* Clickjacking
* Unsafe cross-frame communication
* Embedding malicious websites

## Protection

* X-Frame-Options
* CSP (`frame-ancestors`)
* sandbox
* Same-Origin Policy
* Validate `postMessage` origins

## React Developer Takeaway

* Safely embed third-party content.
* Use `sandbox` for embedded pages.
* Always validate `event.origin` when using `postMessage`.
* Never trust messages from unknown origins.

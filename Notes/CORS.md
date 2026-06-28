# Question 13: What is CORS (Cross-Origin Resource Sharing)?

## What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a **browser security mechanism** that controls whether a web page can access resources from a different origin.

It works together with the **Same-Origin Policy (SOP)**.

Simply put,

> **CORS allows the server to decide which websites (origins) are allowed to access its resources.**

---

# Why Do We Need CORS?

Imagine you are logged into:

```text
https://mybank.com
```

Now you visit:

```text
https://evil.com
```

If browsers allowed every website to access every server, then `evil.com` could run:

```javascript
fetch("https://mybank.com/api/balance")
```

and read your bank balance.

This would be a huge security problem.

To prevent this, browsers introduced the **Same-Origin Policy (SOP)**.

---

# What is the Same-Origin Policy (SOP)?

The **Same-Origin Policy** is a browser security rule.

It says:

> **JavaScript can only freely access resources from the same origin.**

If a request is made to a different origin, the browser checks whether the server allows it.

---

# What is an Origin?

An **Origin** consists of three parts:

```text
Protocol + Domain + Port
```

Example:

```text
https://example.com:443
```

Origin:

```text
Protocol → https
Domain   → example.com
Port     → 443
```

All three must match to be considered the **same origin**.

---

# Same Origin Examples

### Same Origin ✅

```text
https://example.com
```

↓

```text
https://example.com
```

---

### Same Origin ✅

```text
https://example.com
```

↓

```text
https://example.com:443
```

Reason:

HTTPS uses **443** as the default port.

---

### Different Origin ❌

```text
https://example.com
```

↓

```text
http://example.com
```

Protocol changed.

---

### Different Origin ❌

```text
https://example.com
```

↓

```text
https://api.example.com
```

Domain (subdomain) changed.

---

### Different Origin ❌

```text
https://example.com
```

↓

```text
https://example.com:3000
```

Port changed.

---

# How Does CORS Work?

Suppose your React app is running on:

```text
http://localhost:3000
```

Your backend is running on:

```text
http://localhost:5000
```

These are **different origins** because the ports are different.

Now React makes:

```javascript
fetch("http://localhost:5000/users")
```

---

# Step 1: Browser Sends Request

The browser automatically adds an **Origin** header.

```http
GET /users

Origin: http://localhost:3000
```

The browser is telling the server:

> "This request is coming from `localhost:3000`."

---

# Step 2: Server Checks the Origin

The server decides:

> "Do I want to allow requests from `localhost:3000`?"

If yes, it responds:

```http
HTTP/1.1 200 OK

Access-Control-Allow-Origin: http://localhost:3000
```

---

# Step 3: Browser Checks the Response

The browser looks for:

```http
Access-Control-Allow-Origin
```

If the server allows the origin,

↓

The browser gives the response to your React application.

If not,

↓

The browser blocks your JavaScript from reading the response.

---

# Important Point

The request **still reaches the server**.

The server may process it successfully.

The browser simply prevents your JavaScript from accessing the response.

This is why you often see:

```text
CORS Error
```

even though the server returned **200 OK**.

---

# Simple Request vs Preflight Request

There are two kinds of cross-origin requests.

---

## 1. Simple Request

Example:

```javascript
fetch("/users")
```

or

```javascript
fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
```

For simple requests:

```text
Browser
     │
     ▼
Send Request Directly
     │
     ▼
Server Responds
     │
     ▼
Browser Checks CORS Headers
```

If allowed,

↓

JavaScript gets the response.

Otherwise,

↓

Browser blocks the response.

---

## 2. Preflight Request

Some requests are considered more sensitive.

Examples:

* PUT
* PATCH
* DELETE
* Requests with custom headers like `Authorization`
* Requests using `Content-Type: application/json`

Before sending the real request, the browser sends an **OPTIONS** request.

Example:

```http
OPTIONS /users

Origin: http://localhost:3000

Access-Control-Request-Method: DELETE

Access-Control-Request-Headers: Authorization
```

The server replies:

```http
Access-Control-Allow-Origin: http://localhost:3000

Access-Control-Allow-Methods: DELETE

Access-Control-Allow-Headers: Authorization
```

If the server allows it,

↓

The browser sends the actual request.

If not,

↓

The browser never sends the actual request.

---

# Browser Flow

## Simple Request

```text
Browser
     │
     ▼
Send Request
     │
     ▼
Server Processes Request
     │
     ▼
Server Sends Response
     │
     ▼
Browser Checks CORS
     │
 ┌───┴────┐
 │        │
Allow    Block
 │        │
 ▼        ▼
React    CORS Error
Gets Data
```

---

## Preflight Request

```text
Browser
     │
     ▼
OPTIONS Request
     │
     ▼
Server
     │
 ┌───┴────┐
 │        │
Allow    Deny
 │        │
 ▼        ▼
Send     Don't Send
Actual   Actual Request
Request
```

---

# Common CORS Headers

### Request Header

```http
Origin: http://localhost:3000
```

---

### Response Headers

```http
Access-Control-Allow-Origin
```

Specifies which origin is allowed.

---

```http
Access-Control-Allow-Methods
```

Specifies allowed HTTP methods.

Example:

```text
GET, POST, PUT, DELETE
```

---

```http
Access-Control-Allow-Headers
```

Specifies which request headers are allowed.

Example:

```text
Authorization, Content-Type
```

---

```http
Access-Control-Allow-Credentials
```

Allows cookies or credentials to be sent.

---

# Why Does Postman Work?

This is one of the most common interview questions.

**Postman is not a browser.**

CORS is enforced **only by browsers**.

Postman simply sends:

```text
Request

↓

Response
```

No CORS checks.

No Same-Origin Policy.

---

# Does CORS Protect the Server?

**No.**

This is another common interview question.

CORS **does not protect the server**.

It protects **users** by preventing malicious websites from reading responses in the browser.

Anyone can still call your API using:

* Postman
* cURL
* Another Backend Server
* Mobile Applications

To protect your API, use:

* JWT
* Sessions
* Authentication
* Authorization
* API Keys
* Rate Limiting

---

# Real-World Analogy

Imagine a visitor wants to enter a company.

* Browser = Security Guard
* React App = Visitor
* Server = Company

Visitor:

> "Can I access your data?"

Security Guard asks the company:

> "Do you allow visitors from this company?"

If the company says **Yes**,

↓

The security guard allows access.

If the company says **No**,

↓

The security guard blocks the visitor.

The security guard (browser) is enforcing the company's policy.

---

# Interview Answer (2 Minutes)

> CORS (Cross-Origin Resource Sharing) is a browser security mechanism that allows controlled access to resources across different origins. It works together with the Same-Origin Policy, which restricts JavaScript from accessing resources from another origin. An origin consists of the protocol, domain, and port. When a browser makes a cross-origin request, it automatically sends the `Origin` header. The server decides whether to allow that origin by returning headers such as `Access-Control-Allow-Origin`. For simple requests, the browser sends the request directly and checks the CORS headers in the response. For non-simple requests, the browser first sends a preflight `OPTIONS` request to ask the server for permission. If the server approves, the browser sends the actual request. CORS is enforced only by browsers and is designed to protect users, not servers.

---

# Key Interview Points

* CORS = **Cross-Origin Resource Sharing**
* CORS is a **browser security mechanism**
* Works with the **Same-Origin Policy (SOP)**
* Origin = **Protocol + Domain + Port**
* Browser automatically sends the **Origin** header.
* Server responds with **Access-Control-Allow-Origin**.
* **Simple Requests** are sent directly; the browser checks the response afterward.
* **Preflight Requests** use the **OPTIONS** method before the actual request.
* CORS protects **users**, not the server.
* Postman does **not** enforce CORS.
* Protect APIs using **Authentication** and **Authorization**, not CORS.

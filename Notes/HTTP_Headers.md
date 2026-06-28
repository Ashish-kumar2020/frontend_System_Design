# Question 10: What are HTTP Headers?

## What are HTTP Headers?

HTTP Headers are **key-value pairs** sent along with an HTTP request or response.

They provide additional information (metadata) about the request or response, such as:

* Content type
* Authentication
* Browser information
* Caching rules
* Cookies
* Compression

Headers help the **client (browser)** and **server** understand how to process the request and response.

---

# Why Do We Need HTTP Headers?

Headers allow the client and server to exchange additional information without putting it inside the request body.

They are used for:

* Authentication
* Content negotiation
* Caching
* Session management
* Compression
* Security
* CORS
* Cookies

Without headers, the browser and server would not know:

* What type of data is being sent
* Whether the user is authenticated
* Whether cached data can be used
* Whether cookies should be stored

---

# Types of HTTP Headers

There are two major types:

## 1. Request Headers

These are sent **from the client (browser) to the server**.

They provide information about:

* What the client wants
* What formats it accepts
* Authentication credentials
* Browser details
* Cookies

Example:

```http
GET /users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...
Accept: application/json
User-Agent: Chrome/138
Cookie: sessionId=abc123
```

---

## 2. Response Headers

These are sent **from the server to the client**.

They provide information about:

* Response content
* Cache policy
* Cookies
* Server details
* Compression

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600
Set-Cookie: sessionId=abc123
Content-Length: 245
```

---

# Common HTTP Headers

## 1. Content-Type

### Purpose

Specifies the format of the request or response body.

Examples:

```http
Content-Type: application/json
```

```http
Content-Type: text/html
```

```http
Content-Type: multipart/form-data
```

Without `Content-Type`, the receiver would not know how to interpret the data.

---

## 2. Authorization

### Purpose

Used to send authentication credentials to the server.

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1...
```

Common authentication methods:

* Bearer Token (JWT)
* Basic Authentication
* API Keys

---

## 3. Accept

### Purpose

Tells the server which response formats the client can accept.

Example:

```http
Accept: application/json
```

The browser is saying:

> "Please send the response in JSON format."

Other examples:

```http
Accept: text/html
```

```http
Accept: image/png
```

---

## 4. Cookie

### Purpose

Sent by the browser to the server.

Contains cookies previously stored by the browser.

Example:

```http
Cookie: sessionId=abc123
```

The server uses cookies for:

* User sessions
* Authentication
* Preferences

---

## 5. Set-Cookie

### Purpose

Sent by the server to the browser.

Instructs the browser to store a cookie.

Example:

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure
```

The browser stores the cookie and automatically sends it with future requests.

---

## 6. Cache-Control

### Purpose

Controls how browsers and proxies cache resources.

Example:

```http
Cache-Control: max-age=3600
```

Meaning:

The browser can use the cached resource for **1 hour** without contacting the server.

Other examples:

```http
Cache-Control: no-cache
```

```http
Cache-Control: no-store
```

---

## 7. User-Agent

### Purpose

Identifies the client making the request.

Example:

```http
User-Agent: Mozilla/5.0 Chrome/138
```

Servers can use this information to:

* Detect browsers
* Detect operating systems
* Serve browser-specific content

---

## 8. Origin

### Purpose

Specifies where the request originated.

Mainly used for **CORS (Cross-Origin Resource Sharing)**.

Example:

```http
Origin: https://myapp.com
```

The server uses the Origin header to decide whether the request should be allowed.

---

# Complete Example

## Request

```http
GET /users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...
Accept: application/json
User-Agent: Chrome/138
Cookie: sessionId=abc123
Origin: https://myapp.com
```

---

## Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600
Set-Cookie: sessionId=xyz987
Content-Length: 245

[
    {
        "id": 1,
        "name": "Ashish"
    }
]
```

---

# Request Headers vs Response Headers

| Request Headers        | Response Headers        |
| ---------------------- | ----------------------- |
| Sent by Browser        | Sent by Server          |
| Describe the request   | Describe the response   |
| Example: Authorization | Example: Content-Type   |
| Example: Accept        | Example: Cache-Control  |
| Example: Cookie        | Example: Set-Cookie     |
| Example: Origin        | Example: Content-Length |

---

# Real-World Analogy

Imagine ordering food online.

Your order contains:

* Your address
* Payment method
* Preferred language
* Phone number

These are **extra details** about the order.

Similarly, HTTP Headers provide additional information about an HTTP request or response.

The actual food is like the **request/response body**, while the delivery instructions are like the **headers**.

---

# Interview Answer (1–2 Minutes)

> HTTP headers are key-value pairs that provide additional information about an HTTP request or response. They help the client and server communicate metadata such as content type, authentication credentials, caching rules, cookies, browser information, and security settings. Request headers are sent from the browser to the server, while response headers are sent from the server back to the browser. Common headers include `Content-Type`, which specifies the data format; `Authorization`, which carries authentication credentials; `Accept`, which tells the server the expected response format; `Cookie` and `Set-Cookie` for session management; `Cache-Control` for caching behavior; `User-Agent` for browser identification; and `Origin`, which is primarily used for CORS validation.

---

# Key Interview Points

* HTTP Headers are **metadata** sent with requests and responses.
* They are **key-value pairs**.
* Two main types:

  * Request Headers
  * Response Headers
* `Content-Type` → Data format.
* `Authorization` → Authentication credentials.
* `Accept` → Preferred response format.
* `Cookie` → Sent by browser.
* `Set-Cookie` → Sent by server.
* `Cache-Control` → Browser caching rules.
* `User-Agent` → Client/browser information.
* `Origin` → Used for CORS validation.
* Headers do **not** contain the main data; they describe **how the data should be handled**.

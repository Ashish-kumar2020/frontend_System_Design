# Question 11: Cookies vs Sessions

## The Problem

HTTP is a **stateless protocol**, meaning the server does not remember previous requests.

Example:

```text
Request 1
POST /login
```

The server verifies the user's credentials.

A few seconds later:

```text
Request 2
GET /profile
```

How does the server know that this request is from the same user?

It doesn't.

We need a mechanism to identify users across multiple requests.

This is where **Cookies** and **Sessions** come into the picture.

---

# What is a Cookie?

A **Cookie** is a small piece of data stored in the **browser**.

It is usually created by the **server** and sent to the browser using the **`Set-Cookie`** response header.

The browser stores the cookie and automatically sends it with future requests to the same website.

### Example

Server Response:

```http
HTTP/1.1 200 OK
Set-Cookie: sessionId=abc123
```

The browser stores:

```text
Cookies

sessionId = abc123
theme = dark
language = en
```

---

# Why Do We Need Cookies?

Cookies allow the browser to remember information between multiple HTTP requests.

Common use cases:

* User Authentication
* Session Management
* Remember Me
* Language Preference
* Theme Preference
* Shopping Cart

---

# What is a Session?

A **Session** is user-specific data stored on the **server**.

The server creates a session after successfully authenticating the user.

Each session has a unique **Session ID**.

Example:

```text
Session ID: abc123

↓

{
    userId: 15,
    username: "Ashish",
    role: "Admin"
}
```

Notice:

The browser does **not** store this information.

It only stores:

```text
sessionId = abc123
```

The actual user information remains securely on the server.

---

# Complete Authentication Flow (Cookies + Sessions)

## Step 1: User Logs In

The user enters:

```text
Username: Ashish
Password: password123
```

The browser sends:

```http
POST /login
```

---

## Step 2: Server Verifies Credentials

The server checks:

* Username
* Password
* Database

If the credentials are correct, authentication succeeds.

---

## Step 3: Server Creates a Session

The server generates a unique session ID.

Example:

```text
Session ID

abc123
```

The server stores:

```text
abc123

↓

{
    userId: 15,
    username: "Ashish",
    role: "Admin"
}
```

---

## Step 4: Server Sends a Cookie

The server responds:

```http
HTTP/1.1 200 OK

Set-Cookie:
sessionId=abc123
```

The browser automatically stores the cookie.

---

## Step 5: Browser Stores the Cookie

The browser now has:

```text
Cookies

sessionId = abc123
```

---

## Step 6: Future Requests

When the user visits:

```text
/profile
```

The browser automatically sends:

```http
GET /profile

Cookie:
sessionId=abc123
```

You do **not** manually attach this cookie.

The browser automatically includes it in every request to the same domain.

---

## Step 7: Server Finds the Session

The server receives:

```text
sessionId = abc123
```

It searches its session store.

```text
abc123

↓

{
    userId:15,
    username:"Ashish",
    role:"Admin"
}
```

The server now knows:

> This request belongs to Ashish.

The user remains logged in without entering credentials again.

---

# Complete Flow Diagram

```text
User
 │
 ▼
Login
 │
 ▼
Browser
 │
 ▼
POST /login
 │
 ▼
Server
 │
 ▼
Verify Username & Password
 │
 ▼
Create Session

sessionId = abc123
 │
 ▼
Store Session on Server
 │
 ▼
Send Cookie

Set-Cookie: sessionId=abc123
 │
 ▼
Browser Stores Cookie
 │
 ▼
Future Requests
 │
 ▼
Cookie Automatically Sent
 │
 ▼
Server Finds Session
 │
 ▼
User Authenticated
```

---

# Cookies vs Sessions

| Feature            | Cookies                                 | Sessions                                  |
| ------------------ | --------------------------------------- | ----------------------------------------- |
| Storage Location   | Browser                                 | Server                                    |
| Created By         | Usually Server (`Set-Cookie`)           | Server                                    |
| Stores             | Small data like Session ID, preferences | User-specific data (User ID, Role, etc.)  |
| Size Limit         | ~4 KB                                   | Depends on server memory/storage          |
| Security           | Less secure (client-side)               | More secure (server-side)                 |
| Automatically Sent | Yes                                     | No (Session ID in cookie is sent)         |
| Lifetime           | Can expire or persist                   | Ends when session expires or is destroyed |

---

# Session Cookies vs Persistent Cookies

## Session Cookie

* Exists only while the browser session is active.
* Usually removed when the browser closes.

Example:

```http
Set-Cookie: sessionId=abc123
```

No expiration date is specified.

---

## Persistent Cookie

Has an expiration date or maximum age.

Example:

```http
Set-Cookie:
sessionId=abc123;
Expires=Fri, 30 Jun 2026
```

or

```http
Set-Cookie:
sessionId=abc123;
Max-Age=86400
```

The browser keeps the cookie even after restarting.

Commonly used for:

* Remember Me
* Language Preference
* Theme Preference

---

# Can Cookies Store Passwords?

**No.**

Passwords should **never** be stored in cookies.

Cookies usually store:

* Session ID
* JWT Token
* Theme
* Language
* User Preferences

Passwords should always remain on the server and be stored as securely hashed values.

---

# What Happens If Cookies Are Deleted?

Suppose the browser deletes:

```text
sessionId = abc123
```

The next request:

```http
GET /profile
```

contains no session cookie.

The server cannot identify the user.

The user must log in again.

> **Note:** The session may still exist on the server until it expires, but without the session ID cookie, the browser can no longer reference it.

---

# Why Do Modern Applications Use JWT Instead of Sessions?

Traditional session-based authentication requires the server to maintain session data for every logged-in user.

Example:

```text
100,000 Users

↓

100,000 Sessions Stored on Server
```

This increases server memory usage and makes scaling across multiple servers more complex.

With **JWT (JSON Web Token):**

* The server generates a signed token after login.
* The browser stores the token (commonly in an HttpOnly cookie or another storage mechanism).
* The token is sent with future requests.
* The server verifies the token's signature instead of looking up session data.

This makes authentication **stateless**, making it easier to scale distributed applications.

---

# Cookies vs JWT

| Cookies + Sessions         | JWT                                |
| -------------------------- | ---------------------------------- |
| Server stores session data | Server does not store session data |
| Browser stores Session ID  | Browser stores JWT                 |
| Server looks up Session ID | Server verifies JWT signature      |
| Stateful Authentication    | Stateless Authentication           |
| Higher server memory usage | Better scalability                 |

---

# Interview Answer (2 Minutes)

> Cookies are small pieces of data stored in the browser. They are usually created by the server using the `Set-Cookie` response header and are automatically sent with future requests to the same website. Sessions are user-specific data stored on the server. After a successful login, the server creates a session, generates a unique session ID, stores the session data on the server, and sends the session ID to the browser as a cookie. On subsequent requests, the browser automatically sends the session ID cookie, allowing the server to locate the corresponding session and identify the user. This enables persistent authentication even though HTTP is a stateless protocol.

---

# Key Interview Points

* HTTP is **stateless**.
* Cookies are stored in the **browser**.
* Sessions are stored on the **server**.
* The browser stores only the **Session ID**, not the user data.
* The server stores user-specific information such as User ID and Role.
* Cookies are automatically attached to requests for the same domain.
* `Set-Cookie` is a **response header** sent by the server.
* `Cookie` is a **request header** automatically sent by the browser.
* Session Cookies expire when the browser session ends.
* Persistent Cookies remain until their expiration time.
* Never store passwords in cookies.
* JWT is a stateless alternative to server-side sessions and is commonly used in modern web applications.

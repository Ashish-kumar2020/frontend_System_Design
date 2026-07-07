# Keeping Web Applications Secure

> Interview Notes for Frontend Developers

---

# What is Web Application Security?

Web application security is the practice of protecting web applications from attacks that can:

* Steal user data
* Execute malicious code
* Gain unauthorized access
* Modify or delete data
* Make the application unavailable

### Goals

* **Confidentiality** → Only authorized users access data.
* **Integrity** → Data cannot be modified illegally.
* **Availability** → The application remains accessible.

---

# Security Layers

```text
User Input
      │
      ▼
Validation & Sanitization
      │
      ▼
Authentication & Authorization
      │
      ▼
Secure Communication (HTTPS)
      │
      ▼
Database Protection
      │
      ▼
Infrastructure Protection
```

---

# 1. Validate User Input

## Why?

Attackers can send malicious input.

Examples:

```text
<script>alert("XSS")</script>

' OR '1'='1
```

## Prevention

* Validate on the frontend (better UX)
* Always validate again on the backend
* Reject invalid input

---

# 2. Sanitize User Input

## Why?

Users may submit HTML or JavaScript.

## Prevention

Remove dangerous content before rendering.

Libraries:

* DOMPurify
* sanitize-html

---

# 3. Escape Output

## Why?

Browsers execute HTML.

Instead of rendering:

```html
<script>alert("XSS")</script>
```

display it as plain text.

### React

Safe:

```jsx
<h1>{userInput}</h1>
```

React automatically escapes values.

Avoid:

```jsx
dangerouslySetInnerHTML
```

unless content is sanitized.

---

# 4. Use HTTPS

## Why?

Without HTTPS:

* Passwords
* Tokens
* Personal information

can be intercepted.

## Prevention

Use HTTPS (TLS encryption).

---

# 5. Hash Passwords

Never store:

```text
password123
```

Store:

```text
$2b$10$...
```

Recommended algorithms:

* bcrypt
* Argon2

---

# 6. Authentication

Purpose:

Verify user identity.

Examples:

* Login
* JWT
* Sessions
* Multi-Factor Authentication (MFA)

---

# 7. Authorization

Purpose:

Control what authenticated users are allowed to do.

Example:

```text
Admin
│
├── Delete Users ✅
├── Update Users ✅
└── View Reports ✅

User
│
├── View Profile ✅
├── Edit Profile ✅
└── Delete Users ❌
```

Always enforce authorization on the backend.

---

# 8. Prevent SQL Injection

Never build SQL queries by concatenating user input.

Use:

* Prepared Statements
* Parameterized Queries
* ORM

Examples:

* Prisma
* Sequelize
* Mongoose

---

# 9. Content Security Policy (CSP)

Restricts where resources can be loaded from.

Example:

```http
Content-Security-Policy:
script-src 'self'
```

Benefits:

* Reduces XSS risk
* Blocks unauthorized scripts

---

# 10. Prevent Clickjacking

Use:

```http
X-Frame-Options: DENY
```

or

```http
Content-Security-Policy:
frame-ancestors 'self'
```

---

# 11. Prevent CSRF

Use:

* CSRF Tokens
* SameSite Cookies
* Verify Origin/Referer headers

---

# 12. Prevent DDoS

Protection:

* CDN
* Rate Limiting
* Load Balancer
* Web Application Firewall (WAF)
* Auto Scaling

---

# 13. Secure Cookies

Use:

```http
HttpOnly
Secure
SameSite
```

### HttpOnly

JavaScript cannot access cookies.

### Secure

Cookies are sent only over HTTPS.

### SameSite

Helps protect against CSRF.

---

# 14. Security Headers

Useful HTTP headers:

* Content-Security-Policy
* X-Frame-Options
* Strict-Transport-Security (HSTS)
* X-Content-Type-Options
* Referrer-Policy

---

# 15. Keep Dependencies Updated

Old packages may contain known vulnerabilities.

Regularly:

* Update npm packages
* Remove unused dependencies
* Monitor security advisories

---

# Frontend Developer Checklist

Before shipping an application:

* ✅ Validate user input
* ✅ Sanitize HTML
* ✅ Avoid `dangerouslySetInnerHTML`
* ✅ Use HTTPS
* ✅ Handle authentication securely
* ✅ Handle authorization on the backend
* ✅ Protect cookies
* ✅ Use security headers
* ✅ Handle API errors gracefully
* ✅ Keep dependencies updated

---

# Common Attacks & Prevention

| Attack            | Prevention                              |
| ----------------- | --------------------------------------- |
| XSS               | Escape output, sanitize HTML, CSP       |
| SQL Injection     | Prepared statements, ORM                |
| CSRF              | CSRF Token, SameSite cookies            |
| Clickjacking      | X-Frame-Options, CSP frame-ancestors    |
| DDoS              | CDN, WAF, Rate Limiting, Load Balancer  |
| Session Hijacking | HTTPS, HttpOnly cookies, Secure cookies |

---

# Frequently Asked Interview Questions

## Q1. What are the three main goals of web security?

**Answer:**

* Confidentiality
* Integrity
* Availability (CIA Triad)

---

## Q2. Why is frontend validation not enough?

**Answer:**

Frontend validation improves user experience, but attackers can bypass it by sending requests directly to the backend. Therefore, backend validation is mandatory.

---

## Q3. Why should passwords never be stored in plain text?

**Answer:**

If the database is compromised, attackers can immediately read all passwords. Passwords should be hashed using algorithms like **bcrypt** or **Argon2**.

---

## Q4. What is the difference between Authentication and Authorization?

**Answer:**

Authentication verifies **who the user is**, while Authorization determines **what the authenticated user is allowed to do**.

---

## Q5. How does React help prevent XSS?

**Answer:**

React automatically escapes values rendered inside JSX, preventing injected HTML or JavaScript from executing. However, using `dangerouslySetInnerHTML` with untrusted content can still introduce XSS vulnerabilities.

---

## Q6. What is Content Security Policy (CSP)?

**Answer:**

CSP is an HTTP security header that restricts which scripts, styles, images, and other resources the browser is allowed to load, helping reduce XSS attacks.

---

## Q7. Why use HttpOnly cookies?

**Answer:**

HttpOnly cookies cannot be accessed through JavaScript, reducing the risk of session token theft via XSS.

---

## Q8. How do you protect against Clickjacking?

**Answer:**

* `X-Frame-Options`
* `Content-Security-Policy: frame-ancestors`
* `sandbox` for embedded iframes

---

## Q9. How do you protect against DDoS attacks?

**Answer:**

* CDN
* Rate Limiting
* Web Application Firewall (WAF)
* Load Balancer
* Auto Scaling

---

## Q10. Why is HTTPS important?

**Answer:**

HTTPS encrypts communication between the browser and server, protecting sensitive data such as passwords, authentication tokens, and personal information from interception.

---

# Interview Summary (1-Minute Revision)

* Validate & sanitize all user input.
* Escape HTML to prevent XSS.
* Use HTTPS for encrypted communication.
* Hash passwords using bcrypt or Argon2.
* Use secure authentication and backend authorization.
* Prevent SQL Injection with parameterized queries or ORMs.
* Protect against CSRF using SameSite cookies and CSRF tokens.
* Prevent Clickjacking using X-Frame-Options or CSP.
* Mitigate DDoS using CDNs, WAFs, rate limiting, and load balancers.
* Configure security headers.
* Keep dependencies updated.
* Implement security in **multiple layers**, not with a single mechanism.

# 🔒 Web Security

---

# Authentication vs Authorization

## Authentication

**Authentication** verifies the identity of a user.

**Question:** *Who are you?*

Examples:

* Email & Password
* OTP
* Biometrics

---

## Authorization

**Authorization** determines what an authenticated user is allowed to access.

**Question:** *What are you allowed to do?*

Examples:

* User → Dashboard ✅
* Admin → Admin Panel ✅
* User → Admin Panel ❌

---

# HTTP Status Codes

* **401 Unauthorized** → User is **not authenticated**.
* **403 Forbidden** → User is authenticated but **does not have permission**.

---

# XSS (Cross-Site Scripting)

## Definition

XSS is an attack where an attacker injects malicious JavaScript into a trusted website.

### Risks

* Steal LocalStorage tokens
* Steal SessionStorage tokens
* Modify the page
* Perform malicious actions

### HttpOnly Protection

* JavaScript **cannot** access HttpOnly cookies.
* Protects authentication cookies from XSS token theft.
* **Does not prevent XSS itself.**

---

# CSRF (Cross-Site Request Forgery)

## Definition

CSRF tricks a user's browser into sending an authenticated request to another website.

### Why it happens

* Browsers automatically send cookies with matching requests.

### Protection

* `SameSite`
* CSRF Tokens
* Origin/Referer validation

---

# LocalStorage vs HttpOnly Cookie

## LocalStorage

* JavaScript can read it.
* Browser does **not** send it automatically.
* React manually adds it to the `Authorization` header.
* Vulnerable to **XSS**.
* Not vulnerable to **traditional CSRF**.

---

## HttpOnly Cookie

* JavaScript cannot read it.
* Browser automatically sends it with requests.
* Protected against **XSS token theft**.
* Can be vulnerable to **CSRF** unless protected.

---

# Important Cookie Attributes

## HttpOnly

* JavaScript cannot access the cookie.
* Protects against XSS token theft.

---

## Secure

* Cookie is sent **only over HTTPS**.
* Prevents transmission over insecure HTTP.

---

## SameSite

Controls whether cookies are sent with cross-site requests.

* **Strict** → Never sent on cross-site requests.
* **Lax** → Sent only for safe navigations.
* **None** → Sent on all cross-site requests (requires `Secure`).

Helps protect against CSRF.

---

# JWT Best Practice

Store authentication tokens in:

```text
HttpOnly + Secure + SameSite Cookie
```

Why?

* **HttpOnly** → Prevents JavaScript from reading the token.
* **Secure** → Sends the cookie only over HTTPS.
* **SameSite** → Helps prevent CSRF attacks.

---

# XSS vs CSRF

| XSS                                            | CSRF                                                   |
| ---------------------------------------------- | ------------------------------------------------------ |
| Injects malicious JavaScript into your website | Tricks the browser into sending authenticated requests |
| Goal: Execute malicious JS / steal data        | Goal: Perform unwanted actions as the user             |
| HttpOnly helps protect cookies                 | SameSite helps mitigate the attack                     |

---

# Quick Revision

* **Authentication** → Verify identity (**Who are you?**)
* **Authorization** → Verify permissions (**What can you access?**)
* **401** → Not authenticated.
* **403** → Authenticated but not authorized.
* **XSS** → Malicious JavaScript injection.
* **CSRF** → Tricks the browser into sending authenticated requests.
* **HttpOnly** → JavaScript cannot read the cookie.
* **Secure** → Cookie sent only over HTTPS.
* **SameSite** → Controls cross-site cookie sending.
* **LocalStorage** → XSS risk.
* **HttpOnly Cookie** → Better protection against XSS token theft.
* **Best Practice** → Store JWTs in **HttpOnly + Secure + SameSite** cookies.

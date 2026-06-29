# Question 12: What is JWT (JSON Web Token)?

## What is JWT?

**JWT (JSON Web Token)** is a compact, self-contained token used for **authentication** and **authorization**.

After a user successfully logs in, the server generates a JWT and sends it to the client. The client stores this token and sends it with future requests. The server verifies the token to identify and authenticate the user.

JWT enables **stateless authentication**, meaning the server does not need to store session information for every logged-in user.

---

# Why Do We Need JWT?

HTTP is a **stateless protocol**.

Every request is independent, so the server does not remember previous requests.

Example:

```text
Request 1

POST /login
```

The server verifies the user's credentials.

Later:

```text
Request 2

GET /profile
```

How does the server know this request belongs to the same user?

JWT solves this problem by allowing the client to send a signed token with every request.

The server verifies the token and identifies the user without maintaining server-side sessions.

---

# JWT Structure

A JWT consists of **three parts** separated by dots.

```text
Header.Payload.Signature
```

Example:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOjE1LCJyb2xlIjoiQWRtaW4ifQ.
AbCdEfGhIjKlMnOpQrStUvWxYz
```

---

# Part 1: Header

The Header contains metadata about the token.

Example:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Common Fields

* `alg` → Signing algorithm (e.g., HS256, RS256)
* `typ` → Token type (`JWT`)

The header tells the server **how the token was signed**.

---

# Part 2: Payload

The Payload contains **claims**, which are pieces of information about the user.

Example:

```json
{
  "userId": 15,
  "role": "Admin",
  "exp": 1789456000
}
```

Common claims include:

* User ID
* Username
* Role
* Email
* Expiration Time (`exp`)
* Issued At (`iat`)
* Issuer (`iss`)

### Important

The payload is **Base64URL encoded**, **NOT encrypted**.

Anyone with the JWT can decode and read the payload.

Therefore, **never store confidential information** such as:

* Passwords
* Credit card numbers
* Aadhaar/PAN
* Medical records
* Bank account details

JWT should contain only the minimum information required to identify and authorize the user.

---

# Part 3: Signature

The **Signature** is the most important part of a JWT.

It proves that:

* The token was created by your server.
* The token has not been modified.

The signature is generated using:

* Encoded Header
* Encoded Payload
* Server Secret Key
* A signing algorithm (e.g., HMAC-SHA256)

Formula:

```text
Signature =
HMAC-SHA256(
    Base64Url(Header) + "." + Base64Url(Payload),
    JWT_SECRET
)
```

Example:

Header:

```json
{
  "alg": "HS256"
}
```

Payload:

```json
{
  "userId": 15,
  "role": "Admin"
}
```

Secret:

```text
mySuperSecretKey123
```

The server computes:

```text
HMAC-SHA256(
Header.Payload,
JWT_SECRET
)
```

Result:

```text
xyzABC123
```

The final JWT becomes:

```text
Header.Payload.xyzABC123
```

---

# Why Can't Someone Modify a JWT?

Suppose an attacker changes the payload:

Original:

```json
{
  "role": "User"
}
```

Modified:

```json
{
  "role": "Admin"
}
```

The payload changes, but the signature does **not**.

When the server receives the token, it generates a new signature using its secret key.

If the generated signature does not match the signature inside the JWT, the token is rejected.

The attacker cannot generate a valid signature because they do **not** know the server's secret key.

---

# Is JWT Encrypted?

**No.**

JWT is **signed**, not encrypted.

This means:

* Anyone can decode and read the Header and Payload.
* No one can modify them without invalidating the Signature.

JWT provides:

* ✅ Integrity
* ✅ Authenticity

JWT does **not** provide:

* ❌ Confidentiality

If confidential information must be protected, use **JWE (JSON Web Encryption)** or retrieve the data securely from the server after authentication.

---

# Complete JWT Authentication Flow

## Step 1: User Logs In

User enters:

```text
Username: Ashish
Password: password123
```

Browser sends:

```http
POST /login
```

---

## Step 2: Server Verifies Credentials

The server checks:

* Username
* Password
* Database

If valid, authentication succeeds.

---

## Step 3: Server Generates JWT

Example Payload:

```json
{
  "userId": 15,
  "role": "Admin"
}
```

The server signs the token using its secret key.

Generated JWT:

```text
eyJhbGciOiJIUzI1NiIs...
```

---

## Step 4: Server Sends JWT

Example Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Step 5: Browser Stores JWT

Common storage options:

* HttpOnly Cookie ✅ (Recommended)
* Local Storage
* Session Storage

---

## Step 6: Future Requests

The browser sends the token.

Example:

```http
GET /profile

Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Step 7: Server Verifies JWT

The server:

1. Reads the Header and Payload.
2. Uses its own `JWT_SECRET`.
3. Generates a new Signature.
4. Compares it with the Signature in the token.

If both signatures match:

```text
✔ Token is valid.
```

Otherwise:

```text
❌ Invalid Token.
```

The server now trusts the payload and identifies the user.

---

# Complete Authentication Flow

```text
User
 │
 ▼
Login
 │
 ▼
POST /login
 │
 ▼
Server Verifies Credentials
 │
 ▼
Generate JWT
 │
 ▼
Sign using JWT_SECRET
 │
 ▼
Send JWT
 │
 ▼
Browser Stores JWT
 │
 ▼
Future Requests
 │
 ▼
Authorization: Bearer <JWT>
 │
 ▼
Server Verifies Signature
 │
 ▼
JWT Valid?
 │
 ├───────────────┐
 │               │
Yes             No
 │               │
 ▼               ▼
User Authenticated
Reject Request
```

---

# JWT vs Session Authentication

| Feature             | Session Authentication | JWT Authentication     |
| ------------------- | ---------------------- | ---------------------- |
| Authentication Type | Stateful               | Stateless              |
| Server Storage      | Stores sessions        | No session storage     |
| Client Stores       | Session ID             | JWT                    |
| Server Memory       | Higher                 | Lower                  |
| Scalability         | Harder                 | Easier                 |
| Verification        | Session lookup         | Signature verification |

---

# Access Token vs Refresh Token

## Access Token

* Short-lived (e.g., 15 minutes)
* Sent with every API request
* Used to access protected resources

## Refresh Token

* Long-lived (e.g., 7–30 days)
* Used to obtain a new Access Token
* Usually stored in an HttpOnly Cookie

Flow:

```text
Login
   │
   ▼
Access Token (15 min)
Refresh Token (30 days)
        │
        ▼
Access Token Expires
        │
        ▼
Browser Sends Refresh Token
        │
        ▼
Server Issues New Access Token
```

---

# Where Should JWT Be Stored?

## HttpOnly Cookie ✅ (Recommended)

Advantages:

* Not accessible through JavaScript
* Better protection against XSS
* Automatically sent with requests

---

## Local Storage

Advantages:

* Easy to implement

Disadvantages:

* Accessible through JavaScript
* Vulnerable to XSS attacks

---

## Session Storage

Advantages:

* Cleared when the browser/tab closes

Disadvantages:

* Accessible through JavaScript
* Lost when the session ends

---

# Why Do JWTs Expire?

If a JWT never expired and someone stole it, they could use it forever.

The `exp` claim limits the token's lifetime.

Example:

```json
{
  "exp": 1789456000
}
```

After expiration, the server rejects the token.

The client must either:

* Use a Refresh Token to obtain a new Access Token.
* Log in again.

---

# Advantages of JWT

* Stateless authentication
* Easy to scale
* No server-side session storage
* Works well with mobile and microservices
* Supports role-based authorization

---

# Disadvantages of JWT

* Payload is readable
* Cannot revoke a token easily before it expires (without additional mechanisms)
* Larger than a simple session ID
* Must never contain sensitive information

---

# Interview Answer (2–3 Minutes)

> JWT (JSON Web Token) is a compact, self-contained token used for stateless authentication and authorization. It consists of three parts: Header, Payload, and Signature. The Header specifies the signing algorithm and token type. The Payload contains claims such as the user ID, role, and expiration time. The Signature is generated by signing the encoded Header and Payload with a secret key using an algorithm like HMAC-SHA256. JWTs are signed, not encrypted, so the payload is readable but cannot be modified without invalidating the signature. After a successful login, the server generates a JWT and sends it to the client. The client stores the token and includes it with future requests. The server verifies the token's signature to authenticate the user without storing session data, making JWT authentication scalable and stateless.

---

# Key Interview Points

* JWT = **JSON Web Token**
* Used for **Authentication** and **Authorization**
* Stateless authentication
* Structure: **Header.Payload.Signature**
* Header → Algorithm and Token Type
* Payload → Claims (User ID, Role, Expiration)
* Signature → Generated using Header + Payload + Secret Key
* Payload is **Base64URL encoded**, **NOT encrypted**
* Anyone can read the payload
* Never store confidential information in a JWT
* Signature prevents tampering
* Server verifies the signature using the secret key
* Common signing algorithm: **HS256 (HMAC-SHA256)**
* Recommended storage: **HttpOnly Cookie**
* Access Tokens are short-lived
* Refresh Tokens are long-lived


# What is Base64?

**Base64** is an **encoding scheme** that converts binary or structured data into a text format.

> **Encoding is NOT Encryption.**

The purpose of Base64 is to make data safe to transmit through systems that expect text, such as HTTP headers, URLs, and emails.

---

# Why Do We Need Base64?

Computers internally work with binary data.

Example:

```text
01001000 01100101 01101100 01101100 01101111
```

Instead of sending binary directly, Base64 converts it into readable text.

Example:

Original Text:

```text
Hello
```

Base64 Encoded:

```text
SGVsbG8=
```

The data is represented differently, but it is **not hidden**.

---

# Can Base64 Be Decoded?

**Yes.**

Anyone can decode Base64.

Example:

```text
SGVsbG8=
```

↓

Decode

↓

```text
Hello
```

There is **no secret key** required.

This is why Base64 **does not provide security**.

---

# Base64 in JWT

A JWT consists of:

```text
Header.Payload.Signature
```

The **Header** and **Payload** are JSON objects.

Example Payload:

```json
{
    "userId": 15,
    "role": "Admin"
}
```

Before sending, JWT **Base64URL encodes** the Header and Payload.

Example:

```text
eyJ1c2VySWQiOjE1LCJyb2xlIjoiQWRtaW4ifQ
```

Anyone can decode this string back into:

```json
{
    "userId": 15,
    "role": "Admin"
}
```

This is why **JWT payloads should never contain confidential information**.

---

# Base64 vs Encryption

| Base64 Encoding           | Encryption                      |
| ------------------------- | ------------------------------- |
| Converts data into text   | Converts data into ciphertext   |
| Easily reversible         | Requires a decryption key       |
| No secret key             | Uses encryption/decryption keys |
| Does not provide security | Protects confidential data      |
| Used for transmission     | Used for confidentiality        |

---

# Why Does JWT Use Base64?

JWT uses **Base64URL encoding** (a URL-safe variant of Base64) because:

* HTTP headers and URLs work with text.
* JSON objects cannot be sent directly inside a token.
* Base64URL converts the Header and Payload into a compact text format that can be safely transmitted.

**Important:** Base64URL is used only for formatting the data. The **Signature** is what protects the JWT from tampering.

---

# Key Interview Points

* Base64 is an **encoding** technique, not an **encryption** technique.
* Anyone can decode Base64 data.
* JWT uses **Base64URL** encoding for the Header and Payload.
* The JWT **Signature** provides integrity and authenticity.
* Base64 provides **no security**.
* Never store sensitive or confidential information in a JWT payload because it is readable after decoding.

---

# Interview Answer (30 Seconds)

> Base64 is an encoding scheme that converts binary or structured data into a text format. It is not a security mechanism because anyone can decode it without a key. JWT uses Base64URL encoding for its Header and Payload so they can be safely transmitted as text in HTTP requests and URLs. The security of a JWT comes from its **digital signature**, not from Base64 encoding.

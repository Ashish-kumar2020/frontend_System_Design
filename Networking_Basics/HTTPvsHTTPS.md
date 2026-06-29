# Question 6: HTTP vs HTTPS

## What is HTTP?

**HTTP (HyperText Transfer Protocol)** is an **application-layer protocol** used for communication between a client (browser) and a web server.

It defines the rules for how requests and responses are exchanged over the web.

HTTP follows a **request-response model**:

1. The client sends an HTTP request.
2. The server processes the request.
3. The server returns an HTTP response.

### Example

```http
GET /users HTTP/1.1
Host: api.example.com
```

The server responds with:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Ashish"
  }
]
```

### Characteristics of HTTP

* Stateless protocol (each request is independent)
* Uses plain text communication
* Data is **not encrypted**
* Default Port: **80**

---

# What is HTTPS?

**HTTPS (HyperText Transfer Protocol Secure)** is the secure version of HTTP.

It uses **TLS (Transport Layer Security)**—previously known as **SSL (Secure Sockets Layer)**—to encrypt communication between the browser and the server.

The communication flow remains the same as HTTP, but all data is encrypted before transmission.

### Characteristics of HTTPS

* Secure communication
* Uses TLS/SSL encryption
* Prevents eavesdropping and tampering
* Default Port: **443**

---

# Why is HTTPS More Secure?

Unlike HTTP, HTTPS encrypts all communication between the client and server.

This prevents attackers from:

* Reading sensitive information
* Modifying transmitted data
* Impersonating the website

HTTPS provides three important security features:

## 1. Encryption

Converts readable data into encrypted ciphertext.

Even if someone intercepts the network traffic, they cannot understand its contents without the encryption key.

---

## 2. Authentication

The server presents a **digital certificate** during the TLS handshake.

The browser verifies that:

* The certificate is valid.
* The certificate belongs to the requested website.
* The certificate is issued by a trusted Certificate Authority (CA).

This helps ensure you're communicating with the legitimate server.

---

## 3. Data Integrity

TLS ensures that data is not modified while travelling across the network.

If any packet is altered during transmission, the browser detects it and rejects the tampered data.

---

# What is SSL/TLS?

**SSL (Secure Sockets Layer)** and **TLS (Transport Layer Security)** are cryptographic protocols used to secure communication over the Internet.

Today, **TLS** is the modern standard, while SSL is considered obsolete. However, people often refer to them together as **SSL/TLS**.

Their main responsibilities are:

* Encrypt communication
* Authenticate the server
* Ensure data integrity

---

# When Does the TLS Handshake Happen?

The TLS handshake occurs **after the TCP connection is established but before any HTTP request is sent**.

During the handshake:

1. The browser connects to the server.
2. The server sends its digital certificate.
3. The browser verifies the certificate.
4. The client and server negotiate encryption algorithms.
5. Both generate a shared **session key**.
6. Secure communication begins.

After this, all HTTP requests and responses are encrypted using the session key.

---

# What Gets Encrypted?

After the TLS handshake, **the entire HTTP communication is encrypted**, including:

* Request headers
* Request body
* Response headers
* Response body
* Cookies
* Authentication tokens
* API responses
* Form data
* Passwords
* Payment information

The only information generally visible to intermediaries is:

* IP addresses
* Port numbers
* The fact that HTTPS is being used
* The domain name (via DNS/SNI, depending on the protocol and configuration)

---

# Can Someone Read Your Data While Using HTTPS?

An attacker **can intercept the encrypted traffic**, but **cannot read or modify its contents** without the session key.

This protects sensitive information such as:

* Login credentials
* Banking information
* Personal data
* API requests and responses

---

# HTTP vs HTTPS

| Feature         | HTTP                        | HTTPS                              |
| --------------- | --------------------------- | ---------------------------------- |
| Full Form       | HyperText Transfer Protocol | HyperText Transfer Protocol Secure |
| Security        | No encryption               | Encrypted using TLS                |
| Data Protection | ❌ No                        | ✅ Yes                              |
| Authentication  | ❌ No                        | ✅ Yes (Digital Certificate)        |
| Data Integrity  | ❌ No                        | ✅ Yes                              |
| Default Port    | 80                          | 443                                |
| URL             | `http://`                   | `https://`                         |

---

# Does HTTPS Mean a Website is Safe?

**No.**

HTTPS only guarantees that:

* The connection is encrypted.
* The website owns a valid TLS certificate.

A malicious or phishing website can also use HTTPS.

Example:

```text
https://fake-bank-login.com
```

The connection is secure, but the website itself may still be fraudulent.

Always verify the website's domain and reputation.

---

# Interview Answer (1–2 Minutes)

> HTTP (HyperText Transfer Protocol) is an application-layer protocol used for communication between browsers and web servers. It follows a request-response model and is stateless, meaning each request is independent. However, HTTP sends data in plain text, making it vulnerable to interception. HTTPS is the secure version of HTTP. It uses TLS (formerly SSL) to encrypt communication between the client and server. During the TLS handshake, the server presents its digital certificate, the browser verifies it, and both establish a shared session key. After the handshake, all HTTP requests and responses are encrypted, providing confidentiality, authentication, and data integrity. HTTPS uses port 443, while HTTP uses port 80. Although HTTPS secures the connection, it does not guarantee that a website itself is trustworthy.

---

# Key Interview Points

* HTTP = HyperText Transfer Protocol
* HTTPS = HyperText Transfer Protocol Secure
* HTTP is stateless.
* HTTP sends data in plain text.
* HTTPS encrypts communication using TLS.
* TLS provides:

  * Encryption
  * Authentication
  * Data Integrity
* TLS handshake occurs after TCP connection and before the first HTTP request.
* HTTPS uses **Port 443**.
* HTTP uses **Port 80**.
* The entire HTTP request and response are encrypted after the TLS handshake.
* HTTPS secures the connection but does **not** guarantee that a website is legitimate.

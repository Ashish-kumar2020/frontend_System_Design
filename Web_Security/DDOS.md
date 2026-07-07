# DDoS (Distributed Denial of Service) - Interview Notes

## What is DDoS?

**DDoS (Distributed Denial of Service)** is a cyberattack where **thousands or millions of compromised devices** send requests to a server simultaneously, exhausting its resources and making the application unavailable to legitimate users.

**Goal:** Make the website or API unavailable.

---

# DoS vs DDoS

## DoS (Denial of Service)

* Single attacker
* Traffic comes from one machine
* Easier to detect and block

## DDoS (Distributed Denial of Service)

* Multiple attackers (Botnet)
* Traffic comes from thousands of devices/IPs
* Much harder to detect and block

---

# Botnet

A **Botnet** is a network of infected devices controlled by a hacker.

Examples:

* PCs
* Laptops
* Mobile phones
* IoT devices
* Cloud VMs

These devices unknowingly send requests to the target server.

---

# How a DDoS Attack Works

```
Thousands of Devices
        │
        ▼
 Millions of Requests
        │
        ▼
     Target Server
        │
        ▼
 CPU/RAM/Bandwidth Exhausted
        │
        ▼
 Website/API Becomes Unavailable
```

---

# What Happens During a DDoS Attack?

* Server CPU reaches 100%
* Memory gets exhausted
* Network bandwidth is consumed
* Database connections become full
* Legitimate users cannot access the application

Possible errors:

* 429 Too Many Requests
* 502 Bad Gateway
* 503 Service Unavailable
* Request Timeout

---

# Common Types of DDoS Attacks

## 1. HTTP Flood

Millions of HTTP requests are sent.

Example:

```
GET /login
GET /products
GET /dashboard
```

Purpose:
Overload the web server.

---

## 2. SYN Flood

Attacker starts TCP handshakes but never completes them.

Result:

* Half-open connections
* Server resources become exhausted

---

## 3. UDP Flood

Massive UDP packets consume bandwidth and server resources.

---

## 4. DNS Amplification

* Small DNS request
* Very large DNS response
* Traffic gets amplified toward the victim

---

# How Companies Prevent DDoS

## 1. CDN

Examples:

* Cloudflare
* Akamai
* AWS CloudFront

Purpose:

* Absorb malicious traffic
* Cache static content
* Protect origin servers

---

## 2. Rate Limiting

Limit the number of requests per IP.

Example:

```
100 requests/minute
```

If exceeded:

```
429 Too Many Requests
```

---

## 3. Web Application Firewall (WAF)

Filters malicious traffic before it reaches the application.

Protects against:

* DDoS
* SQL Injection
* XSS

---

## 4. Load Balancer

Distributes incoming traffic across multiple servers.

```
Users
   │
   ▼
Load Balancer
   │
 ┌─┴───────┐
 ▼         ▼
Server1  Server2
```

Benefits:

* Better availability
* Prevents one server from becoming overloaded

---

## 5. Auto Scaling

Cloud platforms automatically add more servers when traffic increases.

Example:

```
1 Server
   ▼
Traffic Increases
   ▼
5 Servers
```

---

# Can React Prevent DDoS?

❌ No.

React runs in the browser.

DDoS attacks target:

* Backend servers
* APIs
* Databases
* Network infrastructure

Protection must be implemented on the server or infrastructure side.

---

# Frontend Developer Perspective

Know:

* Why APIs return **429 Too Many Requests**
* How to handle API failures gracefully
* Retry strategies with exponential backoff
* Showing proper loading/error states
* Importance of CDNs for performance and protection

---

# Interview Answer

**DDoS (Distributed Denial of Service)** is an attack where thousands of compromised devices (a botnet) send massive numbers of requests to a target server simultaneously, exhausting its resources and making it unavailable to legitimate users. Unlike a DoS attack, which originates from a single machine, DDoS traffic comes from many systems, making it much harder to block. Common defenses include **CDNs, rate limiting, Web Application Firewalls (WAFs), load balancers, and auto scaling**.

---

# Quick Revision

* DDoS = Distributed Denial of Service
* Purpose → Make a server unavailable
* Uses a **Botnet**
* Common attacks:

  * HTTP Flood
  * SYN Flood
  * UDP Flood
  * DNS Amplification
* Protection:

  * CDN
  * Rate Limiting
  * WAF
  * Load Balancer
  * Auto Scaling
* React **cannot** prevent DDoS
* Backend and infrastructure handle DDoS protection
I
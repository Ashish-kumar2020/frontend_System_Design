# 🌍 Content Delivery Network (CDN) – Interview Revision Notes

## 📖 What is a CDN?

> A **Content Delivery Network (CDN)** is a globally distributed network of servers that delivers content (HTML, CSS, JS, Images, Videos, APIs) from the **nearest server** to the user, reducing latency and improving performance. :contentReference[oaicite:0]{index=0}

---

# 🎯 Why do we need a CDN?

Without CDN

```
User (India)
      ↓
Server (USA)
      ↓
High Latency
```

With CDN

```
User (India)
      ↓
Nearest Edge Server (India)
      ↓
Fast Response
```

---

# 🏗️ CDN Components

### 1. Origin Server
- Original server where content is stored.

### 2. Edge Server
- Servers located near users.
- Cache frequently requested content.

### 3. PoP (Point of Presence)
- Data centers containing multiple Edge Servers.

---

# ⚙️ How CDN Works

```
User requests content
        ↓
Nearest Edge Server
        ↓
Cache Hit?
     ↙       ↘
   Yes        No
    ↓          ↓
Return      Fetch from
Content     Origin Server
                ↓
          Cache Content
```

---

# ✅ Cache Hit vs Cache Miss

### Cache Hit
- Content exists in cache.
- Returned immediately.
- Faster response.

### Cache Miss
- Content not in cache.
- CDN fetches from Origin Server.
- Stores it for future requests.

---

# ⭐ Benefits of CDN

- Faster load time
- Reduced latency
- Better user experience
- High availability
- Scalability
- Load balancing
- DDoS protection
- SSL/TLS security
- Lower bandwidth cost
- Better SEO

---

# 📂 Types of CDN

## 1. Pull CDN

- Content fetched **on demand**.
- CDN caches content after first request.

### Pros
- Easy to implement
- Automatic caching
- Cost-effective

### Cons
- First request is slower (Cache Miss)

---

## 2. Push CDN

- Developer uploads content to CDN manually.

### Pros
- Very fast delivery
- Full control over cache
- Latest content always available

### Cons
- Manual management
- Higher storage cost

---

## 3. Hybrid CDN

Combination of **Pull + Push CDN**.

### Advantages

- Flexible
- Optimized performance
- Handles dynamic & static content

---

# 🌍 Multi-Level CDN

Uses **multiple CDN providers/layers** instead of one.

```
User
   ↓
Regional CDN
   ↓
Primary CDN
   ↓
Secondary CDN
   ↓
Origin Server
```

### Advantages

- Lower latency
- Better reliability
- Failover support
- Better scalability
- Global coverage
- Improved security

---

# ⚖️ Load Balancing

Distributes traffic across multiple servers.

Benefits:

- Prevents server overload
- Improves availability
- Better performance

---

# 🔒 CDN Security

- DDoS Protection
- SSL/TLS Encryption
- Token Authentication
- Secure APIs
- Rate Limiting
- Geofencing

---

# 🌍 CDN Use Cases

- E-commerce websites
- Streaming platforms (Netflix, YouTube)
- Gaming
- Social media
- News websites
- Global web applications

---

# 📺 Netflix Example

Netflix uses its **Open Connect CDN**.

Benefits:

- Caches videos near users
- Adaptive streaming
- Low latency
- High availability
- Handles millions of users

---

# 🎯 Interview Questions

### What is a CDN?

> A CDN is a geographically distributed network of servers that caches content closer to users, reducing latency and improving website performance.

---

### Difference Between Origin Server and Edge Server

| Origin Server | Edge Server |
|--------------|-------------|
| Stores original content | Stores cached content |
| Single location | Multiple global locations |
| Slower | Faster |

---

### Cache Hit vs Cache Miss

| Cache Hit | Cache Miss |
|------------|------------|
| Content found in cache | Content not found |
| Fast | Slower |
| No Origin request | Fetches from Origin |

---

### Pull CDN vs Push CDN

| Pull CDN | Push CDN |
|----------|----------|
| Fetches on demand | Upload manually |
| Easy setup | More control |
| First request slower | Fast delivery |

---

# 🚀 Advantages

- Fast loading
- Reduced latency
- High availability
- Scalable
- Secure
- Better SEO
- Lower server load
- Cost efficient

---

# ❌ Limitations

- Additional cost
- Cache invalidation complexity
- Dynamic content is harder to cache
- Initial cache miss is slower

---

# 🧠 30-Second Interview Answer

> A Content Delivery Network (CDN) is a geographically distributed network of edge servers that caches content closer to users. When a user requests a resource, the CDN serves it from the nearest edge server instead of the origin server whenever possible. This reduces latency, improves website performance, increases availability, provides scalability, enhances security through features like DDoS protection, and reduces load on the origin server. :contentReference[oaicite:1]{index=1}

---

# 🔥 Quick Revision

- **CDN = Content closer to users**
- **Origin Server = Original content**
- **Edge Server = Cached content**
- **PoP = Data center containing Edge Servers**
- **Cache Hit = Fast**
- **Cache Miss = Fetch from Origin**
- **Types = Pull, Push, Hybrid**
- **Benefits = Speed + Security + Scalability + Availability**
- **Netflix uses a Multi-Level CDN (Open Connect)**
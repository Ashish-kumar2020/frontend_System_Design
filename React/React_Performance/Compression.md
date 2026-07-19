# 📦 Compression (Gzip & Brotli)

---

# What is Compression?

## Definition

**Compression** is a server-side optimization technique where files such as JavaScript, CSS, and HTML are compressed before being sent to the browser, reducing the amount of data transferred over the network.

---

# Why do we need Compression?

Without Compression:

* Larger files are transferred.
* Slower downloads.
* Higher bandwidth usage.

With Compression:

* Smaller transfer size.
* Faster downloads.
* Better page load performance.
* Lower bandwidth consumption.

---

# How does Compression work?

```text
Source Code
        │
        ▼
Bundler
(Tree Shaking → Code Splitting → Minification)
        │
        ▼
main.js (500 KB)
        │
        ▼
Server
(Gzip / Brotli)
        │
        ▼
Compressed File (120 KB)
        │
        ▼
Browser Downloads
        │
        ▼
Browser Decompresses
        │
        ▼
Executes JavaScript (500 KB)
```

---

# Gzip vs Brotli

### Gzip

* Older compression algorithm.
* Good compression.
* Widely supported.

### Brotli

* Newer compression algorithm.
* Better compression ratio than Gzip.
* Produces smaller files.
* Preferred by modern browsers.

---

# Compression vs Minification

| Minification                                    | Compression                                     |
| ----------------------------------------------- | ----------------------------------------------- |
| Build-time optimization                         | Server-side optimization                        |
| Removes whitespace, comments, line breaks, etc. | Compresses the built files for network transfer |
| Performed by the bundler                        | Performed by the server                         |
| Reduces bundle size                             | Reduces transfer size                           |

---

# Important Points

* Happens **after** the build.
* Performed by the **server**.
* Browser automatically decompresses files before execution.
* Does **not** change the application's behavior.
* Reduces **network transfer size**, not the executed JavaScript size.

---

# Common Interview Questions

### What is Compression?

Compression is a server-side optimization that reduces the size of files before sending them to the browser, improving download speed.

---

### Who performs Compression?

The **server**.

---

### Does the browser execute compressed JavaScript?

**No.**

The browser first decompresses the file and then executes the JavaScript.

---

### Which is better: Gzip or Brotli?

**Brotli** generally provides better compression and smaller file sizes than Gzip, while Gzip has broader compatibility.

---

# Quick Revision

* **Compression** → Reduces transfer size.
* **Performed By** → Server.
* **Common Algorithms** → Gzip, Brotli.
* **Browser** → Downloads compressed file → Decompresses → Executes.
* **Purpose** → Faster downloads and better performance.

# ⚙️ Build Optimization

---

# What is Build Optimization?

## Definition

**Build Optimization** is the process of optimizing an application during the production build to improve performance, reduce bundle size, and deliver faster-loading applications.

---

# Why do we need Build Optimization?

Development Build (`npm run dev`):

* Prioritizes fast development.
* Fast Hot Module Replacement (HMR).
* Fast rebuilds.
* Easy debugging.

Production Build (`npm run build`):

* Prioritizes application performance.
* Generates optimized assets for deployment.

---

# Development vs Production

| Development           | Production          |
| --------------------- | ------------------- |
| Fast rebuilds         | Optimized build     |
| Easy debugging        | Smaller bundle size |
| HMR enabled           | Better performance  |
| Not heavily optimized | Fully optimized     |

---

# Production Build Optimizations

During `npm run build`, the bundler performs:

* ✅ Tree Shaking
* ✅ Code Splitting
* ✅ Minification
* ✅ Asset Optimization
* ✅ File Hashing (for efficient browser caching)

> **Note:** Compression (Gzip/Brotli) is **not** performed by the bundler. It is usually handled by the server when serving the built files.

---

# Build Pipeline

```text id="i54b3z"
Source Code
        │
        ▼
Bundler

├── Tree Shaking
├── Code Splitting
├── Minification
├── Asset Optimization
└── File Hashing

        │
        ▼
dist/

        │
        ▼
Server

↓

Compression (Gzip/Brotli)

        │
        ▼
Browser
```

---

# Why don't we use Production Build during Development?

Because production optimizations take additional time.

During development, we want:

* Fast rebuilds.
* Instant feedback.
* Quick debugging.

Running all optimizations after every code change would significantly slow down development.

---

# Common Interview Questions

### What is Build Optimization?

Build Optimization is the process of generating an optimized production build by applying techniques such as Tree Shaking, Code Splitting, Minification, and asset optimization.

---

### Why is `npm run build` slower than `npm run dev`?

Because the bundler performs multiple optimizations to produce a production-ready build, whereas the development server prioritizes fast rebuilds and debugging.

---

### Does the bundler perform Compression?

**No.**

Compression (Gzip/Brotli) is generally handled by the **server** after the build is generated.

---

# Quick Revision

* **Development Build** → Fast development & debugging.
* **Production Build** → Optimized for performance.
* **Bundler Performs** → Tree Shaking, Code Splitting, Minification, Asset Optimization, Hashing.
* **Server Performs** → Gzip/Brotli Compression.
* **Goal** → Smaller bundles, faster loading, better user experience.

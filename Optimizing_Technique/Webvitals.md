# 🚀 Using Core Web Vitals to Measure Performance

## What are Core Web Vitals?

Core Web Vitals are **performance metrics** provided by Google that measure the real-world user experience of a website.

They **do not improve performance** themselves—they help identify performance problems.

---

# Purpose

Core Web Vitals answer three important questions:

### 1. Is the page loading quickly?

➡️ Measured by **LCP (Largest Contentful Paint)**

---

### 2. Does the page respond quickly to user interactions?

➡️ Measured by **INP (Interaction to Next Paint)**

---

### 3. Is the page visually stable while loading?

➡️ Measured by **CLS (Cumulative Layout Shift)**

---

# Performance Measurement Workflow

```text id="pqjlwm"
Build Website

↓

Measure Performance

(Lighthouse / PageSpeed Insights / Chrome DevTools)

↓

Check Core Web Vitals

LCP
INP
CLS

↓

Identify Bottlenecks

↓

Optimize

↓

Measure Again

↓

Repeat
```

---

# Example

Initial Report:

```text id="2eq5m7"
LCP : 4.5s ❌

INP : 350ms ❌

CLS : 0.25 ❌
```

This tells us:

* Page loads slowly.
* User interactions are delayed.
* Layout shifts are occurring.

---

# Improving LCP

Problem:

* Large hero image
* Slow server
* Render-blocking CSS/JS

Optimizations:

* Compress images
* Use WebP/AVIF
* Browser caching
* CDN
* Preload critical resources
* Code splitting

Result:

```text id="npjlwm"
LCP : 2.0s ✅
```

---

# Improving INP

Problem:

* Heavy JavaScript execution
* Long-running tasks
* Expensive rendering

Optimizations:

* Debouncing
* Throttling
* Memoization
* Virtualization
* Web Workers
* Reduce JavaScript execution

Result:

```text id="qjlwm2"
INP : 120ms ✅
```

---

# Improving CLS

Problem:

* Images without dimensions
* Ads inserted dynamically
* Fonts causing layout shifts

Optimizations:

* Set image width and height
* Reserve space for ads
* Preload fonts
* Skeleton loaders
* Avoid inserting content above existing content

Result:

```text id="jlwm33"
CLS : 0.03 ✅
```

---

# Final Report

```text id="jlwm44"
LCP : 2.0s ✅

INP : 120ms ✅

CLS : 0.03 ✅
```

This confirms that the performance optimizations were successful.

---

# Tools to Measure

* Chrome Lighthouse
* Chrome DevTools
* PageSpeed Insights
* Google Search Console (Core Web Vitals Report)
* Chrome User Experience Report (CrUX)

---

# Interview Definition

> Core Web Vitals are Google's performance metrics used to measure the real-world user experience of a website. They help identify performance bottlenecks related to loading speed (LCP), responsiveness (INP), and visual stability (CLS). After optimizing the application, these metrics are measured again to verify the improvement.

---

# Important Interview Point

❌ Incorrect:

> LCP, INP, and CLS improve website performance.

✅ Correct:

> LCP, INP, and CLS **measure** website performance. We optimize the application based on these metrics and then re-measure to validate the improvements.

---

# Quick Revision

* **Core Web Vitals** → Performance measurement metrics.
* **LCP** → Measures loading performance.
* **INP** → Measures responsiveness to user interactions.
* **CLS** → Measures visual stability.
* **Workflow** → Measure → Identify bottleneck → Optimize → Measure again.
* **Tools** → Lighthouse, DevTools, PageSpeed Insights, Search Console.

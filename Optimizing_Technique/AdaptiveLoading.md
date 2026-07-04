# ⚡ Adaptive Loading

## Definition

Adaptive loading is a performance optimization technique where an application adjusts the resources it loads based on the user's:

* Network speed
* Device capabilities
* Browser settings

The goal is to provide the best possible user experience under different conditions.

---

# Why Adaptive Loading?

Not all users have:

* Fast internet
* Powerful devices
* High-end CPUs

Serving the same heavy content to every user can lead to poor performance on slower devices or networks.

---

# Example

## Fast Network (4G / Wi-Fi)

Load:

* High-resolution images
* Animations
* Carousels
* Videos
* Larger JavaScript bundles

---

## Slow Network (2G / 3G)

Load:

* Compressed or low-resolution images
* Disable heavy animations
* Disable autoplay videos
* Lazy load images/components
* Smaller JavaScript bundles

---

# Detecting Network Speed

The browser provides the **Network Information API**.

Example:

```javascript id="q29jlwm"
navigator.connection.effectiveType
```

Possible values:

```text id="7x1rvn"
slow-2g
2g
3g
4g
```

Check if the user has enabled **Data Saver**:

```javascript id="3b5w89"
navigator.connection.saveData
```

---

# Common Adaptive Loading Techniques

* Lazy Loading
* Code Splitting
* Responsive Images (`srcset`, `sizes`)
* Image compression (WebP/AVIF)
* Disable heavy animations
* Disable autoplay videos
* Defer non-critical JavaScript
* Smaller bundles for slower networks

---

# Real-World Example

### Netflix

**Fast Network**

* 1080p posters
* Trailer autoplay
* Smooth animations
* High-quality thumbnails

**Slow Network**

* Compressed images
* Static thumbnails
* No autoplay
* Fewer animations
* Lazy-loaded content

---

# About AMP

**AMP (Accelerated Mobile Pages)** is a framework designed to build very fast mobile web pages.

While AMP can improve loading speed, **it is not the same as adaptive loading**. Adaptive loading is a broader strategy that adjusts resources based on user conditions.

---

# Interview Definition

> Adaptive loading is a performance optimization technique where an application dynamically adjusts the resources it loads based on the user's network conditions, device capabilities, or browser settings. This helps improve loading speed and user experience across different environments.

---

# Quick Revision

* **Adaptive Loading** → Load different resources based on network speed and device capability.
* **Purpose** → Improve performance and user experience.
* **Network Detection** → `navigator.connection.effectiveType`
* **Data Saver** → `navigator.connection.saveData`
* **Techniques** → Lazy loading, code splitting, responsive images, image compression, deferred loading, disabling heavy animations.
* **AMP** → Fast mobile page framework, **not** adaptive loading itself.

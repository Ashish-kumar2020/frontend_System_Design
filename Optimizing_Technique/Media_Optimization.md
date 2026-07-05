# 🚀 Media Optimization for Web Performance

## What is Media Optimization?

Media optimization is the process of reducing the size and improving the delivery of images, videos, GIFs, and SVGs to improve website performance and user experience.

---

# Why is Media Optimization Important?

Poorly optimized media can cause:

* Slow page loading
* Higher bandwidth usage
* Increased server load
* Poor Core Web Vitals
* Lower SEO rankings
* Higher bounce rate

---

# Core Web Vitals Affected

* **LCP** → Large images/videos delay page loading.
* **CLS** → Images without dimensions cause layout shifts.
* **INP** → Heavy media can block rendering and reduce responsiveness.

---

# Image Formats

## JPEG

* Best for photographs
* Lossy compression
* Small file size
* No transparency

---

## PNG

* Best for logos and transparent images
* Lossless compression
* Larger than JPEG

---

## WebP ⭐ (Recommended)

* Supports lossy & lossless compression
* Smaller than JPEG and PNG
* Supports transparency
* Best default choice for modern applications

---

## AVIF

* Better compression than WebP
* Very small file sizes
* Growing browser support

---

## SVG

* Vector-based
* Infinitely scalable
* Best for:

  * Logos
  * Icons
  * Charts
  * Illustrations

---

# Image Optimization Techniques

* Compress images
* Use WebP/AVIF
* Resize images appropriately
* Use responsive images
* Lazy load below-the-fold images
* Use Image CDN
* Use placeholders
* Specify image dimensions

---

# Responsive Images

## `srcset`

Serve different image sizes based on screen width.

```html
<img
  src="image.jpg"
  srcset="
    image-small.jpg 600w,
    image-medium.jpg 1200w,
    image-large.jpg 1800w
"
  sizes="(max-width:600px)100vw,50vw"
/>
```

---

## `<picture>`

Serve different image formats.

```html
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" />
</picture>
```

Browser chooses the best supported format.

---

# Image Compression

## Lossy

* Smaller file size
* Slight quality loss
* JPEG, WebP, AVIF

---

## Lossless

* No quality loss
* Larger files
* PNG, Lossless WebP

---

# Lazy Loading

Load images only when they enter the viewport.

```html
<img
  loading="lazy"
  src="image.webp"
/>
```

Benefits:

* Faster initial load
* Lower bandwidth usage
* Better LCP

---

# Image Placeholders

Used while high-quality images load.

Examples:

* LQIP (Low Quality Image Placeholder)
* BlurHash
* SVG Placeholder
* Skeleton Loader

Benefits:

* Better perceived performance
* Reduced CLS

---

# Image CDN

Examples:

* Cloudinary
* Imgix
* Cloudflare Images
* Fastly

Benefits:

* Automatic compression
* Automatic resizing
* Format conversion
* Global delivery

---

# Video Optimization

## Best Formats

* MP4 (Most compatible)
* WebM (Better compression)
* AV1 (Best compression, growing support)

---

## Video Best Practices

* Compress videos
* Use adaptive streaming (HLS/DASH)
* Lazy load videos
* Use poster images
* Prefer CDN
* Avoid self-hosting large videos

---

# Adaptive Streaming

Browser/network determines video quality.

Fast Network:

* 1080p

Slow Network:

* 480p

Benefits:

* Smooth playback
* Less buffering

Technologies:

* HLS
* DASH

---

# Poster Images

Display an image before the video loads.

```html
<video poster="thumbnail.jpg">
```

Benefits:

* Better UX
* Faster perceived loading

---

# GIF Optimization

Avoid GIFs because:

* Huge file sizes
* Poor compression
* High CPU usage

Better alternatives:

* Animated WebP
* APNG
* MP4/WebM
* CSS Animations
* Lottie

---

# Lottie

JSON-based vector animations.

Benefits:

* Very small size
* Scalable
* Smooth performance
* Better than GIFs

---

# Background Images

Best Practices:

* Compress images
* Use WebP/AVIF
* Lazy load when possible
* Use `image-set()` for responsive backgrounds
* Avoid large background images

Example:

```css
background-image: image-set(
  url("small.webp") 1x,
  url("large.webp") 2x
);
```

---

# Background Videos

Avoid:

* Large autoplay videos

Instead:

* Compress video
* Use poster image
* Lazy load
* Keep below ~5 MB when possible
* Mute autoplay videos

---

# `will-change`

Hints the browser that an element will change.

```css
will-change: transform, opacity;
```

Use only for animations.

Avoid overusing because it increases memory usage.

---

# CDN (Content Delivery Network)

Stores media on servers around the world.

Benefits:

* Faster loading
* Reduced latency
* Lower server load
* Better scalability

Examples:

* Cloudflare
* Fastly
* Akamai
* Amazon CloudFront

---

# Caching Media

Important headers:

```http
Cache-Control
Expires
ETag
```

Best Practice:

* Long cache for images, fonts, videos
* Version assets when updating files

---

# Service Workers

Cache media locally.

Benefits:

* Offline support
* Faster repeat visits
* Reduced bandwidth

---

# PWA Media Optimization

* Preload important images
* Lazy load non-critical media
* Cache with Service Workers
* Use WebP/AVIF
* Background Sync for uploads

---

# Interview Questions

## How would you optimize images?

* Compress images
* Use WebP/AVIF
* Lazy loading
* Responsive images
* CDN
* Image placeholders
* Specify width & height

---

## How would you optimize videos?

* MP4/WebM
* Adaptive streaming
* Poster image
* Lazy loading
* CDN
* Compression

---

## Why should GIFs be avoided?

* Large file size
* Poor compression
* High CPU usage

Use:

* WebP
* Lottie
* CSS animations
* MP4

---

## How do CDNs improve media performance?

* Serve media from the nearest server
* Reduce latency
* Lower origin server load
* Improve scalability

---

# Quick Revision

* **WebP** → Best general-purpose image format.
* **AVIF** → Best compression.
* **SVG** → Logos, icons, illustrations.
* **Responsive Images** → `srcset`, `<picture>`.
* **Lazy Loading** → Load media only when needed.
* **Image CDN** → Compression, resizing, global delivery.
* **Poster Image** → Placeholder before video loads.
* **Adaptive Streaming** → HLS, DASH.
* **Avoid GIFs** → Prefer WebP, MP4, Lottie.
* **Background Images** → Use `image-set()`.
* **Background Videos** → Compress, lazy load, use poster.
* **Service Worker** → Offline media caching.
* **CDN + Caching** → Faster repeat visits and global performance.

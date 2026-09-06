# 🏏 ESPN Cricinfo — Frontend System Design (HLD)

---

# Definition

ESPN Cricinfo is a large-scale cricket platform that provides:

* Live match scores
* Ball-by-ball commentary
* Match statistics
* News
* Player and team information
* Rankings
* Series and tournament information

The biggest frontend challenge is handling:

* Millions of concurrent users
* Sudden traffic spikes
* Real-time score updates
* SEO-heavy content
* Fast performance across different devices and networks

---

# Functional Requirements

The application should support:

## Match Experience

* Live Scorecard
* Match Statistics
* Ball-by-ball Commentary
* Batter statistics
* Bowler statistics
* Match information

---

## Cricket Content

* News Feed
* News Articles
* Upcoming Series
* Upcoming Tournaments
* Current Series Statistics
* Past Series Statistics

---

## Teams and Players

* Teams Page
* Player Profile
* Team Rankings
* Player Rankings

---

## Discovery

* Search Matches
* Search Teams
* Search Players
* Search Series and Tournaments

---

# Non-Functional Requirements

## Performance

The application should provide:

* Fast initial page load
* Good LCP
* Fast interaction response
* Minimal UI blocking
* Smooth scrolling

---

## Scalability

The system should handle:

* Millions of concurrent users
* Sudden traffic spikes
* Millions of users watching the same live match

Example:

```text
India vs Pakistan
        ↓
10M Concurrent Users
        ↓
Massive Traffic Spike
```

The system should scale without overwhelming the origin servers.

---

## Availability

The application should remain usable even if some services fail.

```text
Scorecard       ✅ Working

Commentary      ✅ Working

Statistics      ❌ Failed

News            ✅ Working
```

A failure in one section should not crash the entire application.

---

## Data Freshness

Live match data should reach users with minimal delay.

Examples:

* Runs
* Wickets
* Overs
* Commentary
* Match events

---

## SEO

Public pages should be discoverable by search engines.

Examples:

* News articles
* Player profiles
* Team pages
* Rankings
* Match pages

---

## Accessibility

The application should support:

* Keyboard navigation
* Screen readers
* Semantic HTML
* Proper ARIA usage
* Good contrast
* Accessible controls

---

## Platform Support

The application should work properly on:

* Desktop
* Mobile
* Tablet

---

## Offline Support

Offline support can be provided for:

* Previously visited articles
* Static pages
* Cached assets

Live match updates cannot work without an internet connection.

---

# Scale Challenges

Assume a major cricket match is happening and:

```text
10 Million Concurrent Users
```

visit the platform.

---

# Sudden Traffic Spikes

A major cricket match can create massive traffic within seconds.

The system should:

* Scale horizontally
* Use CDN and Edge caching
* Reduce origin traffic
* Handle sudden traffic spikes gracefully

---

# Reduce Origin Server Load

Requests should be served as close to the user as possible.

```text
User
  ↓
Browser Cache
  ↓
CDN / Edge Cache
  ↓
Application Cache
  ↓
Origin Server
```

The goal is:

> Serve requests from the closest available cache before reaching the origin server.

---

# Thundering Herd Problem

Imagine a wicket falls.

```text
🏏 Wicket Falls
       ↓
Millions of users need fresh data
       ↓
Potential request spike
       ↓
Origin Server Overloaded
```

The system should avoid millions of clients simultaneously requesting updated data.

Possible solutions:

* CDN caching
* Push-based updates
* Request deduplication
* Request coalescing
* Backoff strategies

---

# Partial Failures

The application should degrade gracefully.

```text
Match Page
│
├── Scorecard       ✅
│
├── Commentary      ✅
│
├── Statistics      ❌
│
└── Related News    ✅
```

The entire page should not fail because one API or service fails.

---

# Efficient Real-Time Updates

Millions of users may be watching the same match.

The architecture should efficiently distribute updates without creating unnecessary requests.

---

# Real-Time Architecture

We have multiple options for delivering real-time updates.

The correct choice depends on:

* Product requirements
* Communication direction
* Scale
* Infrastructure complexity
* Data freshness requirements

---

# 1. Short Polling

The client repeatedly requests updated data.

```text
Client
   │
   ├── GET Latest Score
   │
Server Responds Immediately
   │
Connection Closes
   │
Wait for Interval
   │
   ├── GET Latest Score
```

Example:

```text
Every 5 Seconds
        ↓
Request Latest Score
```

---

## Advantages

* Simple to implement
* Works with standard HTTP infrastructure

---

## Problems

If millions of users poll every few seconds:

```text
10M Users
   ↓
Millions of Requests
   ↓
High Server Load
   ↓
Bandwidth Waste
```

Many requests may return unchanged data.

Therefore:

> Short polling becomes inefficient at massive scale.

---

# 2. Long Polling

The client sends a request.

The server keeps the request open until:

* A new event occurs
* The request times out

```text
Client
   │
   ├── Request
   │
Server Waits...
   │
Event Occurs
   │
Server Responds
   │
Client Reconnects
```

---

## Advantages

* Reduces unnecessary requests compared to short polling
* Can provide near real-time updates

---

## Problems

* Connections need to be recreated
* Timeout handling is required
* Large-scale connection management is expensive

---

# 3. WebSockets

WebSockets provide persistent two-way communication.

```text
Client
   ⇅
Server
```

---

## Advantages

* Low latency
* Persistent connection
* Bi-directional communication

---

## Problem for Cricinfo

Cricinfo primarily requires:

```text
Server
   ↓
Client
```

Users mostly consume live updates.

They usually don't need continuous two-way communication.

WebSockets **can handle millions of connections** with proper infrastructure.

So we should not reject WebSockets simply because of scale.

However, WebSockets introduce additional complexity:

* Connection management
* Infrastructure
* Scaling
* Recovery

Therefore:

> WebSockets are possible but may be unnecessary for Cricinfo because the primary requirement is one-way server-to-client communication.

---

# 4. Server-Sent Events (SSE)

For Cricinfo, SSE is a strong choice.

Communication direction:

```text
Server
   ↓
Client
```

---

## Architecture

```text
Match Data Provider
        ↓
Event Processing System
        ↓
SSE Gateway
        ↓
Millions of Connected Clients
```

---

## Advantages

* Server-to-client communication
* Persistent connection
* No unnecessary polling
* Server pushes updates when events occur
* Automatic reconnection support
* Simpler than WebSockets for one-way communication

---

# Recommended Real-Time Strategy

```text
SSE
 ↓
Connection Fails
 ↓
Automatic Reconnection
 ↓
Repeated Failure
 ↓
Polling Fallback
```

---

# Final Decision

> Use **SSE for live match updates** with automatic reconnection and polling fallback.

---

# Frontend Architecture

We will use:

> **Feature-Based Architecture**

Example:

```text
src/
│
├── app/
│
├── features/
│   │
│   ├── match/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── news/
│   │
│   ├── teams/
│   │
│   ├── players/
│   │
│   ├── rankings/
│   │
│   └── search/
│
├── shared/
│   │
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── constants/
│
└── services/
```

---

# Why Feature-Based Architecture?

## Better Code Organization

All feature-related code stays together.

```text
Match
│
├── Components
├── API
├── Hooks
└── Types
```

---

## Better Maintainability

Developers can easily locate feature-related code.

---

## Team Scalability

Multiple teams can work independently.

```text
Team A → Match

Team B → News

Team C → Rankings
```

---

## Modularity

Features remain isolated and easier to modify.

---

## Shared Components

Reusable components are placed in a shared location.

Examples:

* Button
* Input
* Modal
* Notification
* Loader

---

## Important

Feature-based architecture improves:

* Codebase scalability
* Team scalability

It does **not automatically make the infrastructure scalable**.

---

# API Layer and Custom Hooks

Components should primarily focus on:

* Rendering UI
* Handling user interaction

Components should not contain large amounts of:

* API logic
* Data transformation
* Complex business logic

---

# Recommended Data Flow

```text
Component
    ↓
Custom Hook / Query Layer
    ↓
Service Layer
    ↓
API Client
    ↓
Backend
```

---

# API Client

The API Client is responsible for:

* HTTP requests
* Headers
* Authentication
* Request configuration
* Response parsing

Example:

```text
GET

POST

PUT

DELETE
```

---

# Service Layer

The Service Layer is responsible for:

* Endpoint-specific API calls
* Request configuration
* Data transformation
* DTO mapping

Example:

```text
getMatch()

getScorecard()

getCommentary()

getPlayer()
```

---

# Server State Layer

We can use:

> **TanStack Query**

It handles:

* Caching
* Background refetching
* Request deduplication
* Loading states
* Error states
* Retry behavior
* Pagination

Example:

```text
useMatch(matchId)
```

---

# Custom Hooks

Custom hooks can be used to:

* Reuse logic
* Encapsulate complex component logic
* Integrate browser APIs
* Manage reusable behavior

Examples:

```text
useTheme()

useAuth()

useLiveMatch()

useOnlineStatus()
```

A custom hook does not always need to be shared between multiple components.

It can also help separate complex logic from a component.

---

# State Management

State should be separated based on its purpose.

---

# 1. Local State

Use Local State when data belongs to one component.

Examples:

* Modal open/close
* Selected tab
* Input value

```text
Component
   ↓
useState
```

Avoid putting everything into global state.

---

# 2. Client / Global State

Use Global State for shared application state that does not primarily come from the server.

Examples:

* Theme
* Authentication UI state
* Global preferences
* Sidebar state

Possible solutions:

* Zustand
* Redux Toolkit

```text
Multiple Components
        ↓
Global Store
```

---

# 3. Server State

Server data should be managed separately.

Examples:

* Match data
* Rankings
* News
* Player statistics

Use:

> **TanStack Query**

It provides:

* Caching
* Refetching
* Request deduplication
* Pagination
* Background updates

---

# State Management Mental Model

```text
Used by One Component?
        ↓
Local State


Shared Client State?
        ↓
Global Store


Comes From Backend?
        ↓
Server State
```

---

# Rendering Strategy

The rendering strategy should depend on:

* SEO requirements
* Data freshness
* Personalization
* Frequency of updates
* Performance requirements

---

# 1. Server-Side Rendering (SSR)

The server generates HTML for every request.

```text
Client Request
       ↓
Server Generates HTML
       ↓
Browser Receives HTML
```

Good for:

* SEO
* Dynamic public pages
* Fresh server-rendered content

---

# 2. Static Site Generation (SSG)

Pages are generated during build time.

```text
Build Time
    ↓
Generate HTML
    ↓
Store on CDN
```

Good for:

* Mostly static pages
* Fast delivery
* Strong SEO

---

# 3. Incremental Static Regeneration (ISR)

Static pages can be regenerated periodically.

```text
CDN Cached Page
       ↓
Revalidation
       ↓
Regenerate Updated Page
       ↓
Serve Updated Version
```

Good for:

* Rankings
* Player information
* News content
* Frequently updated public pages

---

# 4. Client-Side Rendering (CSR)

The browser downloads JavaScript and renders dynamic content.

Good for:

* Highly interactive features
* User-specific content
* Dynamic client-side experiences

---

# 5. Hydration

Hydration adds JavaScript interactivity to server-rendered HTML.

```text
Server HTML
     +
JavaScript
     ↓
Interactive Application
```

---

# Rendering Strategy for Cricinfo

## Home / News Feed

Use:

> **SSR or ISR + Hydration**

Why?

* SEO
* Fast initial loading
* Cacheable content
* Dynamic sections can update on the client

---

## News Article

Use:

> **SSG / ISR**

Why?

* Public content
* SEO-heavy
* Highly cacheable

---

## Player Profile

Use:

```text
Static / Cached Profile
          +
Dynamic Statistics
```

Recommended:

> **SSG/ISR for profile content with dynamic fetching for frequently changing statistics.**

---

## Live Match Page

Recommended architecture:

```text
Initial Request
      ↓
SSR / Cached HTML
      ↓
Initial Match Data
      ↓
Hydration
      ↓
SSE Connection
      ↓
Live Updates
```

This provides:

* Fast initial rendering
* SEO support
* Real-time updates

---

## Search Results

Use:

> **CSR**

Search is:

* Highly interactive
* Query-dependent

---

## Rankings

Use:

> **ISR**

Rankings change periodically but do not need rendering for every request.

---

# Caching Strategy

Caching helps:

* Reduce latency
* Reduce server load
* Reduce bandwidth
* Improve scalability
* Improve user experience

---

# Cache Hierarchy

```text
User
 │
 ▼
Browser Cache
 │
 ▼
CDN / Edge Cache
 │
 ▼
Application Cache
 │
 ▼
Origin Server
```

The principle is:

> Serve data as close to the user as possible.

---

# What Should We Cache?

## Static JavaScript and CSS

Store in:

```text
Browser + CDN
```

Use:

* Long TTL
* Content hashing
* Immutable caching

---

## Images

Store and serve through:

```text
CDN
```

Also use:

* Responsive images
* Image optimization
* Lazy loading

---

## News Articles

Use:

```text
CDN
+
Application Cache
```

Suitable strategies:

* ISR
* Stale-While-Revalidate

---

## Player Profiles

Use:

```text
CDN
+
Application Cache
```

Frequently changing statistics can use separate caching policies.

---

## Live Match Score

Use:

```text
Initial Cached Data
        +
SSE Live Updates
```

Do not depend only on CDN caching for live updates.

---

# Cache Best Practices

## Long TTL for Versioned Static Assets

```text
app.a1b2c3.js
```

When a new deployment happens:

```text
app.d4e5f6.js
```

The browser can safely cache old assets because new versions have new file names.

---

## Short TTL for Frequently Changing Data

Examples:

* Rankings
* Recent news
* Match information

---

## Stale-While-Revalidate

```text
Serve Cached Data Immediately
            +
Fetch Updated Data in Background
```

---

## ETag and Last-Modified

Use conditional requests to avoid downloading unchanged data.

---

## User-Specific Data

Cache personalized data primarily on the client.

Avoid public CDN caching.

---

## Sensitive Data

Never publicly cache:

* Authentication tokens
* Private user data
* Sensitive personalized information

---

# Cache Invalidation Techniques

## 1. Versioning

```text
app.v1.js

app.v2.js
```

---

## 2. Time-Based

Cache expires after a specific TTL.

---

## 3. Event-Based

An event triggers cache invalidation.

```text
News Updated
    ↓
Invalidate Cache
```

---

## 4. Purge API

Explicitly remove cached content from the CDN.

---

# Performance Optimization

The goal is to provide:

> A fast, smooth, and responsive user experience.

Do not optimize randomly.

---

# Performance Optimization Strategy

```text
Measure
   ↓
Identify Bottleneck
   ↓
Optimize Critical Path
   ↓
Measure Again
```

---

# General Principles

1. Measure first
2. Identify bottlenecks
3. Optimize the critical path
4. Reduce network cost
5. Reduce main-thread work
6. Cache intelligently
7. Monitor production performance

---

# Network Optimization

Techniques:

* Brotli compression
* Gzip compression
* CDN
* HTTP caching
* Image optimization
* Reduce unnecessary requests

---

# JavaScript Optimization

Techniques:

* Code splitting
* Tree shaking
* Minification
* Lazy loading
* Remove unused dependencies

Example:

```text
Initial Bundle
     ↓
Load Critical Code


Later
     ↓
Load Feature Code On Demand
```

---

# React Performance

Use optimization only when required.

Tools:

* `React.memo`
* `useMemo`
* `useCallback`

Also:

* Avoid unnecessary state
* Keep state close to where it is used
* Avoid unnecessary re-renders

---

# Rendering Performance

Important techniques:

* Minimize unnecessary DOM nodes
* Avoid excessive component nesting
* Use virtualization for large lists
* Lazy-render expensive content
* Avoid unnecessary layout recalculations

Examples requiring virtualization:

* Large commentary lists
* Long search results
* Historical match lists

---

# Resource Loading Optimization

## Preload

Use for critical resources needed immediately.

---

## Prefetch

Use for resources likely needed in the future.

---

## Critical CSS

Load critical styles required for the initial viewport first.

---

# Reliability and Resilience

The application should continue operating even when parts of the system fail.

---

# Fault Tolerance

The system should tolerate partial failures.

Strategies:

* Replicate critical services
* Retries with exponential backoff
* Jitter
* Circuit breakers
* Graceful degradation

---

# Circuit Breaker

If a service repeatedly fails:

```text
Request
   ↓
Service Failing
   ↓
Circuit Opens
   ↓
Stop Sending Requests
```

This prevents cascading failures.

---

# High Availability

Avoid:

> **Single Point of Failure (SPOF)**

Strategies:

* Multiple service instances
* Multi-region deployment
* Automatic failover
* Health checks

---

# Timeout, Retry and Fallback

Every network request should have proper handling.

```text
Request
   ↓
Timeout?
   ↓
Retry with Backoff + Jitter
   ↓
Still Failing?
   ↓
Fallback UI
```

Avoid aggressive retries because they can increase server load during outages.

---

# Frontend Error Boundaries

A single UI failure should not crash the complete page.

```text
Match Page
│
├── Scorecard
│
├── Commentary
│
├── Statistics
│
└── Related News
```

If Statistics crashes:

```text
Scorecard      ✅

Commentary     ✅

Statistics     ❌ Error UI

Related News   ✅
```

---

# Graceful Degradation

If an advanced feature fails, provide a simpler fallback.

Example:

```text
SSE Fails
   ↓
Reconnect
   ↓
Still Fails
   ↓
Polling Fallback
```

---

# Monitoring and Alerting

Monitor:

* Error rate
* API failures
* Page performance
* SSE connection failures
* Core Web Vitals
* Client-side crashes

Alert when important thresholds are exceeded.

---

# Backup and Disaster Recovery

The backend infrastructure should support:

* Regular backups
* Point-in-time recovery
* Cross-region replication
* Disaster recovery plans
* Periodic recovery testing

---

# Capacity Planning

Prepare infrastructure for expected traffic.

```text
Normal Match
     ↓
Expected Capacity


Major Tournament
     ↓
Higher Capacity


India vs Pakistan
     ↓
Extreme Traffic Capacity
```

The system should be designed for predictable traffic spikes.

---

# Final High-Level Architecture

```text
                         USERS
                           │
                           ▼
                  Browser Cache
                           │
                           ▼
                  ┌─────────────────┐
                  │ CDN / Edge      │
                  │ Cache + Assets  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Next.js App     │
                  │ SSR / SSG / ISR │
                  └────────┬────────┘
                           │
             ┌─────────────┼──────────────┐
             │             │              │
             ▼             ▼              ▼
       ┌──────────┐  ┌──────────┐  ┌──────────┐
       │ News API │  │ Match API│  │Search API│
       └──────────┘  └────┬─────┘  └──────────┘
                          │
                          ▼
                   Event Processing
                          │
                          ▼
                   ┌─────────────┐
                   │ SSE Gateway │
                   └──────┬──────┘
                          │
                          ▼
                    LIVE CLIENTS
```

---

# Frontend Data Architecture

```text
                    React Component
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼

         Local State   Global State  Server State

         useState      Zustand/RTK   TanStack Query
                                         │
                                         ▼
                                  Service Layer
                                         │
                                         ▼
                                     API Client
                                         │
                                         ▼
                                      Backend
```

---

# Final Architecture Decisions

| Area | Decision |
|---|---|
| Frontend Framework | React / Next.js |
| Code Architecture | Feature-Based Architecture |
| Server State | TanStack Query |
| Global Client State | Zustand / Redux Toolkit |
| Local UI State | `useState` / `useReducer` |
| Live Updates | SSE |
| Real-Time Fallback | Polling |
| Static Assets | CDN + Browser Cache |
| News | SSG / ISR |
| Live Match | SSR/Cached Initial Render + Hydration + SSE |
| Search | CSR |
| Rankings | ISR |
| Error Handling | Error Boundaries + Retry + Fallback |
| Scaling | CDN / Edge-first architecture |

---

# Final Mental Model

```text
                    ESPN CRICINFO
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼

     CONTENT           MATCHES           DISCOVERY

        │                 │                 │

        ▼                 ▼                 ▼

    SEO + Cache      Real-Time SSE       Search


                          │
                          ▼

               FRONTEND ARCHITECTURE


        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼

     FEATURES           STATE          RENDERING

        │                 │                 │

Feature-Based     Local / Global     SSR / SSG
Architecture       / Server State     ISR / CSR


                          │
                          ▼

                SCALE & RELIABILITY


CDN → Edge Cache → Application → Origin


SSE → Reconnect → Polling Fallback


Error Boundary → Retry → Fallback UI
```

---

# Final Design Principle

> **Serve static and cacheable content from the edge, render SEO-critical content efficiently, push live match updates instead of repeatedly polling, separate server state from client state, and ensure that partial failures do not break the complete match experience.**
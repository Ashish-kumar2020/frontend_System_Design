# Question 14: Short Polling vs Long Polling vs SSE vs WebSockets

## Why Do We Need These Technologies?

In many applications, the server data changes frequently.

Examples:

* Chat Applications
* Live Cricket Scores
* Stock Market
* Google Docs
* Notifications
* Multiplayer Games

The question is:

> **How does the browser know when new data is available?**

There are four common approaches:

1. Short Polling
2. Long Polling
3. Server-Sent Events (SSE)
4. WebSockets

---

# 1. Short Polling

## What is Short Polling?

In short polling, the client repeatedly sends requests to the server at fixed intervals to check if new data is available.

Example:

```javascript
setInterval(() => {
    fetch("/messages");
}, 5000);
```

The browser sends a request every 5 seconds.

---

## Flow

```text
GET /messages

↓

Server Responds

↓

Wait 5 seconds

↓

GET /messages

↓

Server Responds

↓

Repeat...
```

---

## Real-Life Analogy

Imagine asking your friend every minute:

> "Any new updates?"

Friend:

> "No."

One minute later:

> "Any updates?"

Friend:

> "No."

This continues until there is finally an update.

---

## Advantages

* Very easy to implement.
* Supported by all browsers.

---

## Disadvantages

* Sends many unnecessary requests.
* Wastes server resources.
* Higher network traffic.
* Updates are delayed until the next polling interval.

---

## Use Cases

* Simple dashboards
* Small internal applications
* Applications where real-time updates are not critical

---

# 2. Long Polling

## What is Long Polling?

Long polling is an improved version of short polling.

Instead of responding immediately, the server keeps the HTTP connection open until:

* New data becomes available, or
* A timeout occurs.

After receiving the response, the client immediately sends another request.

---

## Flow

```text
Browser

↓

GET /messages

↓

Server waits...

↓

New Message Arrives

↓

Server Responds

↓

Browser sends another GET request
```

---

## Example Timeline

```text
0 sec

GET

↓

Server Waiting...

↓

10 sec

Still Waiting...

↓

20 sec

Still Waiting...

↓

25 sec

New Message

↓

Server Responds

↓

Browser sends another GET
```

If no new message arrives before the timeout (for example, 30 seconds), the server responds with an empty response, and the browser starts another long-poll request.

---

## Real-Life Analogy

You tell your friend:

> "Call me whenever there is an update."

Your friend waits.

As soon as something happens, they call you.

After the call ends, you ask them to notify you again.

---

## Advantages

* Fewer unnecessary requests than short polling.
* Better user experience.

---

## Disadvantages

* Every response closes the connection.
* Browser immediately creates a new connection.
* Still has connection overhead.

---

## Use Cases

* Legacy chat applications
* Applications requiring better real-time support than short polling

---

# 3. Server-Sent Events (SSE)

## What is SSE?

SSE (Server-Sent Events) allows the server to continuously push data to the client using a single HTTP connection.

The connection remains open, and the server keeps sending updates whenever new data is available.

Communication is **one-way**.

```text
Server

↓

Client
```

---

## Flow

```text
Browser

↓

GET /events

↓

Connection stays open

↓

Server sends Update 1

↓

Server sends Update 2

↓

Server sends Update 3
```

The browser never needs to create another request.

---

## Client Example

```javascript
const eventSource = new EventSource("/events");

eventSource.onmessage = (event) => {
    console.log(event.data);
};
```

---

## Real-Life Analogy

Imagine subscribing to a YouTube channel.

Whenever the creator uploads a new video, YouTube automatically sends you a notification.

You never ask repeatedly.

---

## Advantages

* One persistent HTTP connection.
* Lower network overhead.
* Simpler than WebSockets.
* Excellent for server-to-client updates.

---

## Disadvantages

* One-way communication only.
* Client cannot send messages using the same connection.

---

## Use Cases

* Live Cricket Scores
* Stock Market Dashboard (view only)
* News Updates
* Weather Updates
* Notification Systems
* Analytics Dashboards

---

# 4. WebSockets

## What are WebSockets?

WebSockets provide a persistent, full-duplex connection between the client and the server.

**Persistent Connection**

The connection remains open.

**Full-Duplex Communication**

Both the client and the server can send data independently at any time.

```text
Client ◀────────▶ Server
```

---

## WebSocket Handshake

The browser first sends a normal HTTP request with special headers:

```http
Upgrade: websocket

Connection: Upgrade
```

If the server accepts, it replies:

```http
101 Switching Protocols
```

After this, HTTP communication ends and the WebSocket connection begins.

---

## Flow

```text
Connection Opens

↓

Client sends Message

↓

Server sends Message

↓

Client sends Message

↓

Server sends Message

↓

Connection stays open
```

---

## Client Example

```javascript
const socket = new WebSocket("ws://localhost:5000");

socket.send("Hello");

socket.onmessage = (event) => {
    console.log(event.data);
};
```

---

## Real-Life Analogy

Imagine a phone call.

Once the call starts, both people can speak whenever they want without reconnecting after every sentence.

---

## Advantages

* Extremely fast.
* Very low latency.
* One persistent connection.
* Supports two-way communication.

---

## Disadvantages

* More complex than HTTP.
* Requires maintaining many open connections on the server.

---

## Use Cases

* WhatsApp
* Discord
* Slack
* Google Docs
* Multiplayer Games
* Uber Live Tracking
* Trading Platforms

---

# Comparison Table

| Feature          | Short Polling                   | Long Polling                    | SSE                            | WebSockets                          |
| ---------------- | ------------------------------- | ------------------------------- | ------------------------------ | ----------------------------------- |
| Connection       | New HTTP request every interval | One HTTP request waits for data | One persistent HTTP connection | One persistent WebSocket connection |
| Communication    | Client → Server                 | Client → Server                 | Server → Client                | Client ↔ Server                     |
| Real-Time        | Poor                            | Better                          | Good                           | Excellent                           |
| Bidirectional    | ❌                               | ❌                               | ❌                              | ✅                                   |
| Network Overhead | High                            | Medium                          | Low                            | Very Low                            |
| Complexity       | Low                             | Medium                          | Medium                         | High                                |

---

# Which Technology Should You Choose?

## Short Polling

Use when:

* Real-time updates are not important.
* Simplicity is preferred.

Example:

* Simple Admin Dashboard

---

## Long Polling

Use when:

* Better real-time support is needed.
* WebSockets are unavailable.

Example:

* Legacy Chat Applications

---

## Server-Sent Events (SSE)

Use when:

Only the **server** needs to send updates.

Example:

* Live Cricket Score
* Stock Market Dashboard
* Weather Updates
* Notifications
* News Feed

---

## WebSockets

Use when both the **client** and the **server** continuously exchange data.

Example:

* WhatsApp
* Google Docs
* Discord
* Multiplayer Games
* Live Collaboration Tools

---

# Easy Way to Remember

## Short Polling

```text
Browser:

"Any updates?"

↓

"No."

↓

Wait 5 seconds

↓

"Any updates?"
```

---

## Long Polling

```text
Browser:

"Tell me whenever there is an update."

↓

Server waits.

↓

Update arrives.

↓

Server responds.

↓

Browser asks again.
```

---

## SSE

```text
Browser subscribes once.

↓

Server keeps pushing updates.

↓

Connection stays open.
```

---

## WebSockets

```text
Phone Call

Client ◀────────▶ Server

Both can speak whenever they want.
```

---

# Interview Answer (2 Minutes)

> Polling and WebSocket-based technologies are used to provide real-time updates from the server. **Short Polling** repeatedly sends requests at fixed intervals, which is simple but inefficient because many requests may return no new data. **Long Polling** improves this by keeping the request open until new data is available or a timeout occurs, reducing unnecessary requests. **Server-Sent Events (SSE)** keep a single HTTP connection open and allow the server to continuously push updates to the client. SSE supports one-way communication only, making it suitable for live scores, notifications, and dashboards. **WebSockets** provide a persistent full-duplex connection where both the client and server can send messages at any time. This makes WebSockets the best choice for applications like WhatsApp, Google Docs, multiplayer games, and other real-time collaborative applications.

---

# Key Interview Points

* **Short Polling:** Client repeatedly asks the server for updates.
* **Long Polling:** Server waits before responding, then the client sends another request.
* **SSE:** One persistent HTTP connection, server pushes updates to the client.
* **WebSockets:** Persistent full-duplex connection for real-time two-way communication.
* Choose the **simplest technology that satisfies the application's requirements** instead of always choosing the most powerful one.

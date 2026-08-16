# WebSockets - Complete Revision Notes

## ✅ What I Learned

Today I built my first real-time application using **Native WebSockets**.

The goal was **not** to build a production-ready chat application, but to understand how WebSockets work internally and how to implement them from scratch for interviews.

---

# Backend

## Creating a WebSocket Server

```javascript
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({
  port: 8080,
});
```

This creates a WebSocket server that listens on port **8080**.

---

## Listening for Client Connections

```javascript
wss.on("connection", (ws) => {
    console.log("New Client Connected");
});
```

* `wss` represents the **entire WebSocket server**.
* `ws` represents **one connected client**.

### Important

* `wss` → Server
* `ws` → Individual Client Connection

---

## Receiving Messages

```javascript
ws.on("message", (message) => {
    console.log(message.toString());
});
```

The server receives incoming messages from a client.

Node.js receives data as a **Buffer**, so we convert it using:

```javascript
message.toString()
```

---

## Broadcasting Messages

```javascript
wss.clients.forEach((client) => {
    if (client !== ws) {
        client.send(message.toString());
    }
});
```

`wss.clients` contains every connected client.

We loop through all clients and send the message.

To avoid sending the message back to the sender:

```javascript
if (client !== ws)
```

---

## Client Disconnect

```javascript
ws.on("close", () => {
    console.log("Client Disconnected");
});
```

This event belongs to **ws**, not **wss**, because only an individual client disconnects.

---

## Error Handling

```javascript
ws.on("error", (err) => {
    console.log(err);
});
```

Errors are also handled on the individual client connection.

---

# Frontend (React)

## Why use `useEffect`?

```javascript
useEffect(() => {

}, []);
```

The WebSocket connection should be created only once when the component mounts.

If we create it on every render, multiple WebSocket connections will be opened.

---

## Why use `useRef`?

```javascript
const socketRef = useRef(null);
```

We use `useRef` because:

* A WebSocket is **not UI state**.
* Updating it should **not trigger a re-render**.
* The same WebSocket instance should persist across component renders.

**Interview Answer:**

> We use `useRef` because the WebSocket instance is a mutable object that should persist across renders without causing unnecessary re-renders.

---

## Creating the Connection

```javascript
socketRef.current = new WebSocket("ws://localhost:8080");
```

This starts the WebSocket handshake with the server.

---

## Connection Successful

```javascript
socketRef.current.onopen = () => {
    console.log("Connected to WebSocket Server");
};
```

This fires once the connection is established.

---

## Cleanup

```javascript
return () => {
    socketRef.current.close();
};
```

### Why?

When the component unmounts:

* Prevent memory leaks
* Close open network connections
* Free server resources
* Inform the server that the client has disconnected

Without cleanup, the server still thinks the client is connected.

---

# Sending Messages

```javascript
const sendMessage = () => {

    if (!message.trim()) return;

    socketRef.current.send(message);

    setMessage("");

};
```

Steps:

1. Prevent empty messages.
2. Send the message through the WebSocket.
3. Clear the input.

---

# Receiving Messages

```javascript
socketRef.current.onmessage = (event) => {

    setMessages((prev) => [...prev, event.data]);

};
```

Browser WebSocket messages are received inside:

```javascript
event.data
```

---

# Why Use Functional Updates?

Correct:

```javascript
setMessages((prev) => [...prev, event.data]);
```

Incorrect:

```javascript
setMessages([...messages, event.data]);
```

Using the callback ensures we always work with the latest state and avoids stale state issues.

---

# Displaying Messages

```jsx
{messages.map((msg, index) => (
    <p key={index}>{msg}</p>
))}
```

The chat UI updates automatically whenever a new message is received.

---

# useState vs useRef

## useState

Use when the UI should update.

Examples:

* Input value
* Messages
* Loading
* Username

---

## useRef

Use when the value should persist but should **not** trigger a re-render.

Examples:

* WebSocket connection
* DOM element
* Timer ID
* Previous value

---

# Mental Model

## `wss`

Represents:

```
Entire WebSocket Server
```

Responsible for:

* Accepting new connections
* Maintaining all connected clients

---

## `ws`

Represents:

```
One Connected Client
```

Responsible for:

* Sending messages
* Receiving messages
* Disconnecting
* Handling errors

---

# Message Flow

```
User Types Message
        │
        ▼
React State (message)
        │
        ▼
socket.send(message)
        │
        ▼
WebSocket Server
        │
        ▼
Broadcast to All Clients
        │
        ▼
Browser Receives Message
        │
        ▼
setMessages(prev => [...prev, event.data])
        │
        ▼
React Re-renders
        │
        ▼
Message Appears on Screen
```

---

# Interview Questions Covered

### Why use `useRef` instead of `useState`?

Because the WebSocket instance is not UI state and should not trigger re-renders.

---

### Why close the socket in the cleanup function?

To prevent memory leaks, close the network connection, free server resources, and notify the server that the client disconnected.

---

### Why `ws.on("close")` and not `wss.on("close")`?

Because `ws` represents one client connection. Only that client disconnects; the server continues running.

---

### Why `wss.clients` instead of `ws.clients`?

`wss` maintains all connected clients.

`ws` represents only one client.

---

### Why use `setMessages((prev) => [...prev, event.data])`?

Because React state updates are asynchronous, and functional updates always use the latest state.

---

# Future Improvements

Instead of sending plain strings:

```javascript
socket.send(message);
```

Prefer sending JSON:

```javascript
socket.send(
    JSON.stringify({
        type: "CHAT_MESSAGE",
        message: message,
    })
);
```

This makes the protocol extensible.

Example:

```json
{
  "type": "CHAT_MESSAGE",
  "message": "Hello"
}
```

Later we can support:

* USER_JOINED
* USER_LEFT
* TYPING
* NOTIFICATION

without changing the protocol.

---

# Homework

* Send message on **Enter** key.
* Focus the input after sending a message.
* Prevent sending if the socket is not connected (`readyState`).

---

# Status

* ✅ Theory
* ✅ Interview Questions
* ✅ Hands-on Implementation
* ✅ Basic Real-Time Chat Application

**WebSockets: Completed**

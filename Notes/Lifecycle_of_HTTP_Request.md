# Question 7: Explain the Complete Lifecycle of an HTTP Request and Response

## Interview Question

Suppose your React application executes:

```javascript
fetch("https://api.example.com/users")
    .then((res) => res.json())
    .then((data) => setUsers(data));
```

Explain everything that happens from the moment `fetch()` is called until the data is displayed on the screen.

---

# Step 1: `fetch()` is Called

When `fetch()` is invoked, the browser's **Fetch API** starts processing the request.

```javascript
fetch("https://api.example.com/users");
```

The Fetch API immediately returns a **Promise**.

This means JavaScript **does not wait** for the network request to finish. Instead, the request runs asynchronously in the background while the JavaScript thread continues executing other code.

---

# Step 2: Browser Resolves the Domain Name

The browser needs the IP address of:

```text
api.example.com
```

Since computers communicate using IP addresses, the browser performs **DNS Resolution**.

The browser checks for the IP address in the following order:

1. Browser DNS Cache
2. Operating System (OS) DNS Cache
3. DNS Server (if the IP is not found in cache)

If the IP address is found in the cache, the DNS lookup is skipped.

Otherwise, the DNS server returns the IP address.

---

# Step 3: TCP Connection

Once the browser has the IP address, it establishes a **TCP connection** with the server using the **TCP Three-Way Handshake**.

```
Client  ---- SYN ---->  Server
Client <-- SYN-ACK --- Server
Client ---- ACK ---->  Server
```

After this handshake, a reliable connection is established.

---

# Step 4: TLS Handshake (HTTPS Only)

Since the URL uses **HTTPS**, the browser performs a **TLS Handshake**.

During the handshake:

1. The server sends its digital certificate.
2. The browser verifies the certificate.
3. Both the client and server negotiate encryption algorithms.
4. They generate a shared **session key**.

From this point onward, all HTTP communication is encrypted using the session key.

---

# Step 5: Browser Sends the HTTP Request

The browser now sends an HTTP request to the server.

Example:

```http
GET /users HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer <token>
```

An HTTP request generally contains:

* HTTP Method (GET, POST, PUT, DELETE, etc.)
* URL
* Headers
* Request Body (for POST, PUT, PATCH)

---

# Step 6: Server Processes the Request

Once the request reaches the server, it goes through several stages.

Example flow:

```
HTTP Request
      ↓
Middleware
      ↓
Authentication
      ↓
Authorization
      ↓
Controller
      ↓
Business Logic
      ↓
Database
```

The server may:

* Validate authentication tokens
* Check user permissions
* Execute business logic
* Fetch data from the database
* Create an HTTP response

Example:

```javascript
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});
```

---

# Step 7: Server Sends the HTTP Response

After processing the request, the server sends an HTTP response.

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "id": 1,
        "name": "Ashish"
    }
]
```

An HTTP response contains:

* Status Code
* Headers
* Response Body

---

# Step 8: Browser Receives the Response

The Promise returned by `fetch()` is now **fulfilled**.

The first `.then()` callback executes.

```javascript
.then((res) => res.json())
```

At this stage:

`res` is **not** the actual JSON data.

It is a **Response Object**.

Example:

```javascript
{
    ok: true,
    status: 200,
    headers: {...},
    body: ReadableStream
}
```

---

# Step 9: `res.json()`

The response body is received as a **Readable Stream**.

Calling:

```javascript
res.json()
```

Reads the stream and converts it into a JavaScript object.

Example:

Before:

```
Readable Stream
```

After:

```javascript
[
    {
        id: 1,
        name: "Ashish"
    }
]
```

`res.json()` also returns a Promise.

---

# Step 10: JavaScript Receives the Data

The second `.then()` callback executes.

```javascript
.then((data) => {
    setUsers(data);
});
```

Now:

```javascript
data
```

contains the parsed JavaScript object.

---

# Step 11: React Updates State

Calling:

```javascript
setUsers(data);
```

updates the component's state.

React detects that the state has changed and schedules a re-render.

---

# Step 12: React Re-renders the Component

React executes the component function again.

Example:

```javascript
function Users() {
    const [users, setUsers] = useState([]);
}
```

Initially:

```javascript
users = [];
```

After the API response:

```javascript
users = [
    {
        id: 1,
        name: "Ashish"
    }
];
```

---

# Step 13: Virtual DOM Diffing

React creates a new **Virtual DOM**.

It compares:

* Previous Virtual DOM
* New Virtual DOM

This process is called **Diffing** or **Reconciliation**.

React determines exactly which UI elements have changed.

---

# Step 14: Real DOM Updates

React updates **only the changed elements** in the Real DOM.

Instead of rebuilding the entire page, React updates only the necessary nodes.

Finally, the browser paints the updated UI.

The user now sees the fetched data on the screen.

---

# What Happens If the Server Returns 404?

Example:

```http
HTTP/1.1 404 Not Found
```

A common misconception is that `fetch()` throws an error.

**It does not.**

The Promise returned by `fetch()` is still **resolved**.

Example:

```javascript
const response = await fetch("/users");

console.log(response.ok);     // false
console.log(response.status); // 404
```

You should manually check:

```javascript
if (!response.ok) {
    throw new Error("Request Failed");
}
```

`fetch()` rejects the Promise only when there is a network-level failure, such as:

* No internet connection
* DNS resolution failure
* CORS failure
* Connection aborted
* Network timeout (depending on implementation)

---

# Complete Flow

```text
fetch() called
        │
        ▼
Promise returned immediately
        │
        ▼
DNS Resolution
(Browser Cache → OS Cache → DNS Server)
        │
        ▼
TCP Connection Established
        │
        ▼
TLS Handshake (HTTPS)
        │
        ▼
HTTP Request Sent
        │
        ▼
Server Receives Request
        │
        ▼
Middleware
        │
        ▼
Authentication / Authorization
        │
        ▼
Business Logic
        │
        ▼
Database Query
        │
        ▼
HTTP Response Returned
        │
        ▼
fetch() Promise Resolved
        │
        ▼
Response Object Received
        │
        ▼
res.json()
        │
        ▼
JavaScript Object Created
        │
        ▼
setUsers(data)
        │
        ▼
React State Updated
        │
        ▼
Component Re-renders
        │
        ▼
Virtual DOM Diffing
        │
        ▼
Real DOM Updated
        │
        ▼
Browser Paints Updated UI
```

---

# Interview Answer (2–3 Minutes)

> "When `fetch()` is called, the browser immediately returns a Promise and starts the network request asynchronously. It first resolves the domain name to an IP address by checking the browser cache, OS cache, and then the DNS server if necessary. Once the IP address is obtained, the browser establishes a TCP connection with the server. If the request uses HTTPS, a TLS handshake is performed to establish a secure encrypted connection. The browser then sends an HTTP request containing the method, URL, headers, and optional body. The server receives the request, executes middleware, authentication, business logic, and database operations before sending an HTTP response. The browser receives a Response object, and calling `res.json()` converts the response body into a JavaScript object. The Promise resolves with this data, `setUsers(data)` updates the React state, React re-renders the component, performs Virtual DOM diffing, updates only the changed elements in the Real DOM, and finally the browser paints the updated UI."

---

# Key Interview Points

* `fetch()` returns a Promise immediately.
* Network requests are asynchronous.
* DNS resolves the domain to an IP address.
* TCP establishes a reliable connection.
* TLS secures HTTPS communication.
* Browser sends an HTTP request.
* Server processes the request and returns an HTTP response.
* `fetch()` resolves with a **Response object**, not JSON.
* `res.json()` parses the response body into a JavaScript object.
* `setState()` triggers a React re-render.
* React compares the Virtual DOM with the previous version.
* Only the changed DOM nodes are updated.
* `fetch()` **does not reject** for HTTP errors like 404 or 500.
* `fetch()` rejects only for **network-level errors**.

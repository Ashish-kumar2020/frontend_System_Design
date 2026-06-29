# What Happens When You Type `https://google.com` in the Browser?

## Overview

When you enter `https://google.com` in the browser and press **Enter**, the browser performs a series of networking and rendering steps before displaying the webpage.

---

## Step 1: User Enters the URL

The user types:

```text
https://google.com
```

into the browser's address bar and presses **Enter**.

The browser now needs to locate Google's server and request the webpage.

---

## Step 2: Browser Finds the Server's IP Address (DNS Resolution)

Since computers communicate using **IP addresses**, the browser must convert the domain name (`google.com`) into an IP address.

The browser checks for the IP address in the following order:

1. Browser DNS Cache
2. Operating System (OS) DNS Cache
3. DNS Server (if the IP isn't found in cache)

If the IP address is found in either cache, the DNS lookup is skipped.

Otherwise, the DNS server returns the IP address of `google.com`.

---

## Step 3: TCP Connection

Once the browser has the IP address, it establishes a **TCP connection** with the server.

This is done using the **TCP Three-Way Handshake**:

1. Client → SYN
2. Server → SYN + ACK
3. Client → ACK

After this handshake, a reliable connection is established.

---

## Step 4: TLS Handshake (HTTPS Only)

Since the URL starts with **HTTPS**, a **TLS Handshake** takes place.

During this process:

* The server sends its SSL/TLS certificate.
* The browser verifies that the certificate is valid.
* Both client and server agree on encryption keys.
* A secure encrypted connection is established.

Now, all communication between the browser and the server is encrypted.

---

## Step 5: Browser Sends an HTTP Request

After the secure connection is established, the browser sends an HTTP request.

Example:

```http
GET / HTTP/1.1
Host: google.com
```

The request tells the server which resource the browser wants.

---

## Step 6: Server Processes the Request

The server receives the request, processes it, and prepares the response.

The response usually contains:

* HTML
* CSS
* JavaScript
* Images
* Fonts
* Other assets

---

## Step 7: Browser Downloads Additional Resources

The browser first parses the HTML.

While parsing, it discovers references to additional resources like:

* CSS files
* JavaScript files
* Images
* Fonts
* Videos

The browser sends additional HTTP requests to download these resources.

---

## Step 8: Browser Renders the Webpage

Once the resources are downloaded, the browser starts rendering.

Rendering consists of the following steps:

### 1. Parse HTML

Creates the **DOM (Document Object Model)**.

### 2. Parse CSS

Creates the **CSSOM (CSS Object Model)**.

### 3. Create Render Tree

The browser combines the DOM and CSSOM to build the **Render Tree**.

### 4. Layout (Reflow)

Calculates the size and position of every visible element.

### 5. Paint

Draws pixels onto the screen.

### 6. Execute JavaScript

JavaScript may modify the DOM, causing the browser to re-render parts of the page if necessary.

Finally, the webpage is displayed to the user.

---

# Complete Flow

```text
User enters URL
        ↓
Browser checks DNS Cache
        ↓
OS checks DNS Cache
        ↓
DNS Lookup (if needed)
        ↓
IP Address Returned
        ↓
TCP Connection Established
        ↓
TLS Handshake (HTTPS)
        ↓
HTTP Request Sent
        ↓
Server Processes Request
        ↓
Server Returns HTML/CSS/JS
        ↓
Browser Downloads Additional Resources
        ↓
Parse HTML → DOM
        ↓
Parse CSS → CSSOM
        ↓
Create Render Tree
        ↓
Layout (Reflow)
        ↓
Paint
        ↓
Execute JavaScript
        ↓
Webpage Displayed
```

---

# Interview Answer (1–2 Minutes)

> "When a user enters `https://google.com` in the browser, the browser first resolves the domain name into an IP address by checking the browser cache, OS cache, and finally the DNS server if necessary. Once it gets the IP address, it establishes a TCP connection with the server. Since the connection uses HTTPS, a TLS handshake is performed to create a secure encrypted connection. The browser then sends an HTTP request, and the server processes it and returns HTML, CSS, JavaScript, and other resources. The browser downloads these resources, builds the DOM and CSSOM, creates the Render Tree, performs layout and paint, executes JavaScript, and finally displays the webpage."

---

# Interview Keywords

* DNS Lookup
* DNS Cache
* IP Address
* TCP Three-Way Handshake
* TLS Handshake
* HTTPS
* HTTP Request
* HTTP Response
* HTML
* CSS
* JavaScript
* DOM
* CSSOM
* Render Tree
* Layout (Reflow)
* Paint
* Browser Rendering

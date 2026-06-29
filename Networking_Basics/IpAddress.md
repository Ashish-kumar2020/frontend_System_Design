# Question 4: What is an IP Address?

## What is an IP Address?

**IP (Internet Protocol) Address** is a unique numerical identifier assigned to every device connected to a network. It allows devices to identify and communicate with each other over the Internet or a local network.

Think of an IP address as the **postal address of a house**. Just as a postal address helps deliver mail to the correct location, an IP address ensures that data reaches the correct device on a network.

Examples:

```text
IPv4: 192.168.1.10
IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

---

# Why is an IP Address Needed?

Devices on the Internet communicate by exchanging **data packets**.

Each packet contains:

* Source IP Address
* Destination IP Address

Routers use the **destination IP address** to forward packets through different networks until they reach the intended device.

Without IP addresses:

* Devices would not know where to send data.
* Routers could not determine the destination.
* Internet communication would not be possible.

### Real-world Analogy

Imagine sending a parcel.

To deliver it successfully, you need:

* Sender's Address
* Receiver's Address

Similarly, when data travels over the Internet, every packet includes:

* Source IP Address
* Destination IP Address

This ensures the packet reaches the correct destination.

---

# Difference Between IPv4 and IPv6

| IPv4                                | IPv6                                      |
| ----------------------------------- | ----------------------------------------- |
| 32-bit address                      | 128-bit address                           |
| Written in decimal format           | Written in hexadecimal format             |
| Example: `192.168.1.1`              | Example: `2001:db8::1`                    |
| Approximately 4.3 billion addresses | Approximately 340 undecillion addresses   |
| Running out of available addresses  | Designed to solve IPv4 address exhaustion |
| Older protocol                      | Newer protocol                            |

---

# Can Two Websites Have the Same IP Address?

**Yes.**

Multiple websites can share the same IP address using **Shared Hosting** or **Virtual Hosting**.

Example:

```text
example1.com  ---> 203.0.113.10
example2.com  ---> 203.0.113.10
example3.com  ---> 203.0.113.10
```

When the browser sends an HTTP request, it also includes the **Host** header:

```http
GET / HTTP/1.1
Host: example2.com
```

The web server (such as Nginx or Apache) reads the **Host** header and determines which website should handle the request.

Therefore, multiple websites can share the same IP address without any conflict.

---

# Interview Answer (1–2 Minutes)

> "An IP address, or Internet Protocol Address, is a unique numerical identifier assigned to every device connected to a network. It enables devices to communicate over the Internet by identifying the source and destination of data packets. Routers use the destination IP address to forward packets to the correct device. There are two versions of IP addresses: IPv4 and IPv6. IPv4 is a 32-bit address written in decimal notation and has a limited number of addresses, while IPv6 is a 128-bit address written in hexadecimal notation and was introduced to overcome IPv4 address exhaustion. Yes, multiple websites can share the same IP address using virtual hosting. The browser includes the requested domain name in the HTTP Host header, allowing the web server to identify and serve the correct website."

---

# Key Interview Points

* IP = Internet Protocol Address
* Unique identifier for devices on a network
* Enables communication between devices
* Data packets contain source and destination IP addresses
* Routers forward packets using the destination IP address
* IPv4 = 32-bit, decimal notation
* IPv6 = 128-bit, hexadecimal notation
* IPv6 solves IPv4 address exhaustion
* Multiple websites can share the same IP address using Virtual Hosting
* The `Host` header helps the server identify the requested website

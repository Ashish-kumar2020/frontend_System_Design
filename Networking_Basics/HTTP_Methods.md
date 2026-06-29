# Question 8: Explain the Different HTTP Methods

## What are HTTP Methods?

HTTP methods (also called **HTTP verbs**) define the action that a client wants to perform on a resource available on the server.

For example, a client may want to:

* Retrieve data
* Create new data
* Update existing data
* Delete data

Each action is represented by a different HTTP method.

---

# 1. GET

## Purpose

The **GET** method is used to **retrieve data** from the server.

It should **never modify** data on the server.

### Example

```http
GET /users
```

Response:

```json
[
  {
    "id": 1,
    "name": "Ashish"
  }
]
```

### Safe?

✅ **Yes**

GET only reads data and does not modify server state.

### Idempotent?

✅ **Yes**

Making the same GET request multiple times produces the same server state because nothing is modified.

### Real-world Example

* Get all users
* Get products
* Get user profile
* Fetch blog posts

Example APIs:

```http
GET /users
GET /products
GET /posts
GET /profile
```

---

# 2. POST

## Purpose

The **POST** method is used to **create a new resource** on the server.

### Example

```http
POST /users
```

Request Body:

```json
{
  "name": "Ashish",
  "email": "ashish@example.com"
}
```

### Safe?

❌ **No**

POST modifies server data.

### Idempotent?

❌ **No**

Sending the same POST request multiple times usually creates multiple resources.

Example:

```http
POST /orders
```

Request 1:

```text
Order #101 Created
```

Request 2:

```text
Order #102 Created
```

Every request changes the server state.

### Real-world Example

* Register a user
* Create a product
* Place an order
* Add a new blog post

Example APIs:

```http
POST /users
POST /orders
POST /products
```

---

# 3. PUT

## Purpose

The **PUT** method is used to **replace an entire resource**.

If some fields are omitted, they may be replaced or removed depending on the API implementation.

### Example

Existing User:

```json
{
  "name": "Ashish",
  "age": 25,
  "city": "Delhi"
}
```

PUT Request:

```http
PUT /users/1
```

```json
{
  "name": "Rahul",
  "age": 30,
  "city": "Mumbai"
}
```

The entire resource is replaced.

### Safe?

❌ **No**

PUT modifies server data.

### Idempotent?

✅ **Yes**

Sending the same PUT request multiple times results in the same final server state.

### Real-world Example

* Replace a user's profile
* Replace product information

Example APIs:

```http
PUT /users/1
PUT /products/10
```

---

# 4. PATCH

## Purpose

The **PATCH** method is used to **partially update an existing resource**.

Only the specified fields are modified.

### Example

Existing User:

```json
{
  "name": "Ashish",
  "age": 25,
  "city": "Delhi"
}
```

PATCH Request:

```http
PATCH /users/1
```

```json
{
  "age": 26
}
```

Updated User:

```json
{
  "name": "Ashish",
  "age": 26,
  "city": "Delhi"
}
```

Only the `age` field changes.

### Safe?

❌ **No**

PATCH modifies server data.

### Idempotent?

✅ **Usually Yes**

If the same PATCH request sets a field to the same value repeatedly, the final state remains the same.

> **Note:** PATCH can be non-idempotent depending on the operation (e.g., incrementing a counter). In most REST APIs, it is used for fixed-value updates and behaves idempotently.

### Real-world Example

* Update user email
* Change password
* Update product price

Example APIs:

```http
PATCH /users/1
PATCH /products/10
```

---

# 5. DELETE

## Purpose

The **DELETE** method is used to remove a resource from the server.

### Example

```http
DELETE /users/1
```

### Safe?

❌ **No**

DELETE modifies server data.

### Idempotent?

✅ **Yes**

Deleting the same resource multiple times results in the same final state—the resource remains deleted.

### Real-world Example

* Delete a user
* Delete a product
* Remove a comment

Example APIs:

```http
DELETE /users/1
DELETE /products/10
```

---

# Summary Table

| Method | Purpose                     | Safe  | Idempotent     |
| ------ | --------------------------- | ----- | -------------- |
| GET    | Retrieve data               | ✅ Yes | ✅ Yes          |
| POST   | Create a new resource       | ❌ No  | ❌ No           |
| PUT    | Replace an entire resource  | ❌ No  | ✅ Yes          |
| PATCH  | Partially update a resource | ❌ No  | ✅ Usually Yes* |
| DELETE | Delete a resource           | ❌ No  | ✅ Yes          |

---

# Safe vs Idempotent

## Safe Method

A method is **safe** if it **does not modify** data on the server.

Examples:

* GET

---

## Idempotent Method

A method is **idempotent** if sending the **same request multiple times** produces the **same final state** on the server.

Examples:

```http
PUT /users/1
```

Repeated 10 times:

```text
Final state remains the same.
```

---

# Bonus Interview Questions

## Why Should GET Requests Not Have a Request Body?

According to the HTTP specification, GET requests are intended to retrieve resources.

Most browsers, servers, and proxies either ignore or do not support request bodies with GET requests.

Instead, use **query parameters**.

Example:

```http
GET /users?page=2&limit=10
```

---

## When Should You Use PUT Instead of PATCH?

Use **PUT** when replacing the **entire resource**.

Example:

Before:

```json
{
  "name": "Ashish",
  "age": 25
}
```

After PUT:

```json
{
  "name": "Rahul",
  "age": 30
}
```

The whole resource is replaced.

Use **PATCH** when updating only specific fields.

Example:

```json
{
  "age": 30
}
```

Only the `age` field changes.

---

## Why is POST Not Idempotent?

POST usually creates a new resource each time it is called.

Example:

```http
POST /orders
```

Request 1:

```text
Order #101 Created
```

Request 2:

```text
Order #102 Created
```

Request 3:

```text
Order #103 Created
```

Each request changes the server state, so POST is **not idempotent**.

---

# Interview Answer (2 Minutes)

> HTTP methods define the type of operation a client wants to perform on a server resource. GET is used to retrieve data and is both safe and idempotent because it does not modify server state. POST is used to create new resources and is neither safe nor idempotent since each request can create a new resource. PUT replaces an entire resource and is idempotent because sending the same request multiple times results in the same final state. PATCH partially updates an existing resource and is generally idempotent when updating fixed values. DELETE removes a resource from the server and is idempotent because deleting an already deleted resource does not change the final state.

---

# Key Interview Points

* HTTP methods define the action to perform on a resource.
* **GET** → Retrieve data (Safe, Idempotent)
* **POST** → Create data (Not Safe, Not Idempotent)
* **PUT** → Replace entire resource (Not Safe, Idempotent)
* **PATCH** → Partially update a resource (Not Safe, Usually Idempotent)
* **DELETE** → Remove a resource (Not Safe, Idempotent)
* **Safe** means the request does **not** modify server data.
* **Idempotent** means repeating the same request results in the **same final server state**.
* GET requests should generally use **query parameters** instead of a request body.

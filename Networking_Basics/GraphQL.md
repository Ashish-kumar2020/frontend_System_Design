# GraphQL - Interview Notes

# What is GraphQL?

GraphQL is a **query language for APIs** and a **runtime** for executing those queries.

It allows the client to request **exactly the data it needs**, nothing more and nothing less.

It was developed by **Facebook (Meta)** to solve common problems with REST APIs, such as over-fetching and under-fetching of data.

---

# Why GraphQL?

In REST APIs, the server decides what data to return.

Example:

```http
GET /users/1
```

Response:

```json
{
  "id": 1,
  "name": "Ashish",
  "email": "ashish@gmail.com",
  "phone": "9876543210",
  "address": {
    "city": "Noida",
    "country": "India"
  }
}
```

Suppose the frontend only needs:

```text
name
```

The REST API still returns the entire object.

This is called **Over-fetching**.

---

Another example:

Suppose we need:

* User details
* User posts
* User comments

In REST we may need:

```http
GET /users/1

GET /users/1/posts

GET /users/1/comments
```

Multiple API calls are required.

This is called **Under-fetching**.

---

GraphQL solves both problems.

---

# How GraphQL Works

Instead of multiple endpoints, GraphQL exposes a **single endpoint**.

Example:

```http
POST /graphql
```

The client sends a query describing exactly what data it needs.

Example:

```graphql
query {
  user(id: 1) {
    name
    email
  }
}
```

Response:

```json
{
  "data": {
    "user": {
      "name": "Ashish",
      "email": "ashish@gmail.com"
    }
  }
}
```

Only the requested fields are returned.

---

# REST vs GraphQL

| REST                                       | GraphQL                                 |
| ------------------------------------------ | --------------------------------------- |
| Multiple endpoints                         | Single endpoint (`/graphql`)            |
| Server decides response                    | Client decides response                 |
| Can over-fetch data                        | Returns only requested fields           |
| Can under-fetch data                       | Multiple resources in one request       |
| Uses HTTP methods (GET, POST, PUT, DELETE) | Mostly uses POST with queries/mutations |
| Fixed response structure                   | Flexible response structure             |

---

# Over-fetching

Getting more data than required.

Example:

Need:

```text
name
```

Received:

```text
id
name
email
phone
address
company
```

---

# Under-fetching

Not getting enough data in one request.

Need:

* User
* Posts
* Comments

REST:

```text
3 API calls
```

GraphQL:

```graphql
query {
  user(id: 1) {
    name
    posts {
      title
    }
    comments {
      text
    }
  }
}
```

One request.

---

# GraphQL Operations

## Query

Used to fetch data.

Example:

```graphql
query {
  users {
    id
    name
  }
}
```

---

## Mutation

Used to create, update, or delete data.

Example:

```graphql
mutation {
  createUser(name: "Ashish") {
    id
    name
  }
}
```

---

## Subscription

Used for real-time updates.

Example:

```graphql
subscription {
  messageAdded {
    id
    message
  }
}
```

Subscriptions are commonly implemented over **WebSockets**.

---

# GraphQL Schema

A schema defines:

* Types
* Queries
* Mutations
* Relationships

Example:

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}
```

---

# Resolver

A resolver is a function that fetches the requested data.

Example:

```javascript
const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: "Ashish"
      };
    }
  }
};
```

Think of a resolver as the equivalent of a controller in REST.

---

# Advantages

* Client requests only the required data.
* Eliminates over-fetching.
* Eliminates under-fetching.
* Single endpoint.
* Strongly typed schema.
* Self-documenting APIs.
* Better developer experience.

---

# Disadvantages

* More complex backend implementation.
* Queries can become expensive if not optimized.
* Caching is more difficult than REST.
* File uploads are not built into the specification.
* Learning curve is higher than REST.

---

# When to Use GraphQL

Use GraphQL when:

* The frontend needs different fields on different screens.
* Mobile applications need to minimize network usage.
* Data comes from multiple resources.
* Clients require flexible APIs.

Prefer REST when:

* APIs are simple CRUD operations.
* Strong HTTP caching is important.
* Simplicity is preferred.

---

# GraphQL vs REST Example

## REST

```http
GET /users/1
```

Returns:

```json
{
  "id": 1,
  "name": "Ashish",
  "email": "...",
  "phone": "...",
  "address": "..."
}
```

---

## GraphQL

Query:

```graphql
query {
  user(id: 1) {
    name
  }
}
```

Returns:

```json
{
  "data": {
    "user": {
      "name": "Ashish"
    }
  }
}
```

Only the requested field is returned.

---

# Interview Questions

## What is GraphQL?

GraphQL is a query language for APIs that allows clients to request exactly the data they need using a single endpoint.

---

## Why was GraphQL created?

To solve the problems of over-fetching and under-fetching in REST APIs.

---

## What is over-fetching?

Receiving more data than required from the server.

---

## What is under-fetching?

Needing multiple API requests to retrieve all the required data.

---

## Difference between Query, Mutation, and Subscription?

* **Query** → Read data.
* **Mutation** → Create, update, or delete data.
* **Subscription** → Receive real-time updates from the server.

---

## Does GraphQL replace REST?

No.

GraphQL and REST solve similar problems in different ways.

REST is simpler and works well for many applications, while GraphQL is useful when clients need flexible data fetching.

---

## Can GraphQL use WebSockets?

Yes.

GraphQL **Subscriptions** commonly use WebSockets to provide real-time updates.

---

# One-Line Interview Summary

> **GraphQL is a query language for APIs that exposes a single endpoint and allows clients to request exactly the data they need, solving the over-fetching and under-fetching problems commonly found in REST APIs.**

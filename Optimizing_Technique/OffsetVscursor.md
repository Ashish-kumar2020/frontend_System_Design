# 📄 Offset-Based Pagination vs Cursor-Based Pagination

## Offset-Based Pagination

### Definition

Offset-based pagination fetches records by skipping a fixed number of rows.

Example:

```sql
SELECT * FROM products
LIMIT 10 OFFSET 20;
```

* `LIMIT 10` → Fetch 10 records.
* `OFFSET 20` → Skip the first 20 records.

### Example

Database:

```text
1  Product A
2  Product B
3  Product C
4  Product D
5  Product E
...
```

Request:

```text
Page 1
LIMIT 2 OFFSET 0
```

Result:

```text
Product A
Product B
```

Request:

```text
Page 2
LIMIT 2 OFFSET 2
```

Result:

```text
Product C
Product D
```

---

## Problem with Offset Pagination

Suppose records are sorted by **newest first**.

Initial data:

```text
1. Product E
2. Product D
3. Product C
4. Product B
5. Product A
```

User requests:

```text
Page 1

LIMIT 2 OFFSET 0
```

Gets:

```text
Product E
Product D
```

Now a new product is inserted:

```text
1. Product F   ← New
2. Product E
3. Product D
4. Product C
5. Product B
6. Product A
```

User requests:

```text
Page 2

LIMIT 2 OFFSET 2
```

Result:

```text
Product D
Product C
```

Notice:

❌ `Product D` appears again.

Because the newly inserted record shifted all existing rows.

This is the biggest drawback of offset-based pagination.

---

# Cursor-Based Pagination

### Definition

Cursor-based pagination fetches records **after a specific item**, instead of skipping rows.

The cursor is usually:

* ID
* Timestamp
* CreatedAt
* UpdatedAt

---

### Example

Page 1:

```text
Product E (id=105)
Product D (id=104)
```

Server returns:

```text
Next Cursor = 104
```

Next request:

```text
GET /products?cursor=104&limit=2
```

Result:

```text
Product C
Product B
```

Now a new product is inserted:

```text
Product F (id=106)
Product E (id=105)
Product D (id=104)
Product C (id=103)
Product B (id=102)
```

User still requests:

```text
cursor=104
```

Result:

```text
Product C
Product B
```

✅ No duplicate records.

The newly inserted record doesn't affect the next page because the query starts **after the cursor**, not after a row count.

---

# Advantages & Disadvantages

## Offset-Based Pagination

### Advantages

* Easy to implement.
* Supports random page navigation (Page 1, Page 5, Page 10).

### Disadvantages

* Can produce duplicate or skipped records when data changes.
* Performance degrades with large offsets because the database must skip many rows.

---

## Cursor-Based Pagination

### Advantages

* No duplicate or missing records when new data is inserted.
* Better performance on large datasets.
* Ideal for real-time applications.

### Disadvantages

* Cannot directly jump to Page 10.
* Requires a unique and ordered cursor (ID, timestamp, etc.).

---

# When to Use

### Offset Pagination

Use for:

* Admin dashboards
* Reports
* Tables with page numbers
* Small to medium datasets

---

### Cursor Pagination

Use for:

* Social media feeds
* Chat applications
* Infinite scrolling
* Activity feeds
* Real-time applications

---

# Interview Comparison

| Offset Pagination                                  | Cursor Pagination                               |
| -------------------------------------------------- | ----------------------------------------------- |
| Uses `LIMIT` + `OFFSET`                            | Uses a cursor (ID, timestamp, etc.)             |
| Supports page numbers                              | Best for infinite scrolling                     |
| Can show duplicate/skipped records if data changes | No duplicate/skipped records due to new inserts |
| Slower for large offsets                           | Faster for large datasets                       |
| Easy to implement                                  | Slightly more complex                           |

---

# Quick Revision

* **Offset Pagination** → Skip a fixed number of rows using `LIMIT` and `OFFSET`.
* **Problem** → New records can shift rows, causing duplicates or skipped records.
* **Cursor Pagination** → Fetch records after a specific cursor (ID/timestamp).
* **Benefit** → Stable pagination and better performance on large datasets.
* **Offset** → Best for page-number navigation.
* **Cursor** → Best for infinite scroll and real-time feeds.

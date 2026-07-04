# Singleton Pattern in JavaScript

> **Interview Level:** Senior Frontend (5+ Years)

------------------------------------------------------------------------

# Definition

A **Singleton** is a **design pattern** that ensures **only one instance
of an object exists** throughout the application's lifecycle.

Instead of creating a new object every time, the same instance is
returned whenever it is requested.

------------------------------------------------------------------------

# Real-world Use Cases

-   Database Connection
-   Logger
-   Authentication Service
-   Configuration Object
-   Global State Manager
-   Cache

------------------------------------------------------------------------

# Basic Implementation

``` javascript
const Singleton = (function () {
    let instance;

    function createInstance() {
        return {
            name: "Singleton Object"
        };
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
```

## Usage

``` javascript
const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();

console.log(obj1 === obj2); // true
```

------------------------------------------------------------------------

# How It Works

## First Call

``` text
instance = undefined
        ↓
createInstance()
        ↓
instance = { ... }
        ↓
Return instance
```

## Second Call

``` text
instance already exists
        ↓
Skip createInstance()
        ↓
Return existing instance
```

------------------------------------------------------------------------

# Why Use an IIFE?

``` javascript
(function () {
    // private scope
})();
```

An **IIFE (Immediately Invoked Function Expression)** creates a
**private lexical scope**.

Everything declared inside it is inaccessible from outside.

> **Important:** An IIFE is **not mandatory** to implement a Singleton.
> It is simply a convenient way to hide internal state.

------------------------------------------------------------------------

# Why is `instance` Private?

``` javascript
const Singleton = (function () {
    let instance;

    return {
        getInstance() {}
    };
})();
```

Only `getInstance()` is exposed.

``` javascript
console.log(Singleton.instance); // undefined
```

The only way to access `instance` is through `getInstance()`.

------------------------------------------------------------------------

# What is a Closure?

> **Definition:** A closure is **a function together with the lexical
> environment it closes over**.

A closure consists of:

1.  A function
2.  Its lexical environment

Example:

``` javascript
function outer() {
    let count = 0;

    function inner() {
        count++;
        return count;
    }

    return inner;
}
```

Even after `outer()` finishes, `count` survives because `inner()`
references it.

------------------------------------------------------------------------

# Why Does `instance` Still Exist?

Normally, local variables are destroyed when a function returns.

However, `getInstance()` still references:

-   `instance`
-   `createInstance()`

Therefore JavaScript keeps the lexical environment alive.

``` text
getInstance()
      │
      ▼
Lexical Environment
-------------------------
instance
createInstance()
-------------------------
```

------------------------------------------------------------------------

# Lexical Environment vs Closure

**Lexical Environment** - Stores variables and function declarations. -
Created whenever a function executes.

**Closure** - A function + the lexical environment it references.

> A closure is **not just the variable**. It is the **function together
> with its preserved lexical environment**.

------------------------------------------------------------------------

# Memory Model

``` text
Singleton
     │
     ▼
getInstance()
     │
     ▼
Lexical Environment
-------------------------
instance
createInstance()
-------------------------
```

------------------------------------------------------------------------

# Garbage Collection

JavaScript uses **reachability-based garbage collection**.

Memory is reclaimed only when it becomes unreachable.

Example:

``` javascript
let Singleton = (function () {
    let instance = 0;

    return {
        increment() {
            instance++;
            return instance;
        }
    };
})();

let fn = Singleton.increment;

Singleton = null;
```

Memory:

``` text
fn
 │
 ▼
increment()
 │
 ▼
Lexical Environment
 │
 ▼
instance
```

`instance` is **not** garbage collected because `fn` still references
`increment()`.

Only when all references to `increment()` are removed does the lexical
environment become eligible for garbage collection.

------------------------------------------------------------------------

# Does a Closure Capture the Value or the Variable?

A closure captures the **variable (binding)**, **not a snapshot of its
value**.

``` javascript
function outer() {
    let x = 10;

    function inner() {
        console.log(x);
    }

    x = 20;

    return inner;
}

const fn = outer();
fn(); // 20
```

The closure reads the **current value** stored in `x`.

------------------------------------------------------------------------

# Common Interview Questions

### Is an IIFE mandatory for a Singleton?

**No.**

The Singleton pattern only requires: - One instance - Reuse of that
instance

------------------------------------------------------------------------

### Why is `instance` private?

Because it is declared inside the IIFE and is not exposed in the
returned object.

------------------------------------------------------------------------

### Why isn't `instance` garbage collected?

Because `getInstance()` still references the lexical environment
containing `instance`.

------------------------------------------------------------------------

### Does a closure capture values or variables?

It captures the **variable (binding)**.

------------------------------------------------------------------------

### Can multiple closures share one lexical environment?

Yes.

``` javascript
function outer() {
    let count = 0;

    return {
        inc() { return ++count; },
        dec() { return --count; }
    };
}
```

Both `inc()` and `dec()` share the same `count`.

------------------------------------------------------------------------

# Interview Definition (5+ Years)

> A Singleton is a design pattern that ensures only one instance of an
> object exists and provides a global access point to it. In JavaScript,
> it is commonly implemented using closures and an IIFE to encapsulate
> private state while exposing a public method that always returns the
> same instance.

------------------------------------------------------------------------

# Quick Revision

-   Singleton → Design Pattern
-   IIFE → Creates private lexical scope
-   Closure → Function + lexical environment
-   Lexical Environment → Stores variables
-   Closure captures **variables**, not values
-   Garbage Collection → Reachability-based
-   One invocation of a function creates one lexical environment
-   Multiple closures can share the same lexical environment

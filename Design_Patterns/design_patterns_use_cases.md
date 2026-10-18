# 15 Important Design Patterns — Use Cases and When to Use Them

Frontend-focused notes for JavaScript and React interviews.

## Quick Revision Table

| # | Pattern | Use it when... |
|---|---|---|
| 1 | Singleton | You need one shared instance. |
| 2 | Observer | Multiple subscribers need to be notified when something changes. |
| 3 | Proxy | You need to control or intercept access to another object. |
| 4 | Builder | Constructing an object requires many options or steps. |
| 5 | Object Pool | Expensive objects need to be reused frequently. |
| 6 | Visitor | You need to add operations to stable object types without modifying those types. |
| 7 | Chain of Responsibility | A request must pass through multiple independent handlers. |
| 8 | Command | Actions need to be represented independently, queued, logged, or undone. |
| 9 | Strategy | You need interchangeable ways to perform the same task. |
| 10 | Adapter | Two incompatible interfaces need to work together. |
| 11 | Decorator | You need to add optional behavior without modifying the original class. |
| 12 | Facade | You want one simple interface over a complex subsystem. |
| 13 | Factory | The object to create depends on a runtime condition. |
| 14 | State | An object's behavior changes depending on its current state. |
| 15 | Module | You want to encapsulate implementation details behind a public API. |

---

## 1. Singleton Pattern

**Purpose:** Ensure that a class or service has one shared instance.

### When to use
- Multiple parts of an application need to access the same shared instance.
- Creating separate instances would cause duplicated connections or inconsistent shared state.
- You need centralized access to a shared resource.

### Frontend examples
- A shared WebSocket connection manager.
- Centralized application configuration.
- A logging service.

### Interview clue
> Multiple components need the same shared instance, and separate instances would be undesirable.

### Caution
Do not use Singleton automatically for every shared service. Global shared state can make testing and dependencies harder. JavaScript modules can often provide a shared instance without a dedicated Singleton class.

---

## 2. Observer Pattern

**Purpose:** Notify subscribers when a subject or publisher changes or emits an event.

### When to use
- Multiple independent parts of the application need to react to the same event or change.
- You want to decouple the publisher from its subscribers.
- Subscribers should be able to subscribe and unsubscribe independently.

### Frontend examples
- Event listeners.
- Store subscriptions.
- Real-time notifications.
- WebSocket event subscribers.

### Interview clue
> When an event occurs or data changes, multiple independent subscribers should be notified.

### Caution
Unsubscribe listeners when they are no longer needed to avoid memory leaks or unwanted callbacks.

---

## 3. Proxy Pattern

**Purpose:** Control or intercept access to another object.

### When to use
- You need to validate or intercept property access.
- You need to control access to an object.
- You want to add caching, lazy loading, or other behavior around access to an object.

### Frontend examples
- JavaScript `Proxy` for validating property assignments.
- A wrapper that caches expensive reads.
- Lazy access to expensive resources.

### Interview clue
> You need to control how another object is accessed without modifying the original object.

### Caution
A JavaScript `Proxy` is a language feature that can implement the Proxy pattern, but not every use of the pattern requires the built-in `Proxy` API.

---

## 4. Builder Pattern

**Purpose:** Construct complex objects step by step.

### When to use
- An object has many optional configuration values.
- Construction requires multiple steps.
- A long constructor with many parameters is difficult to read or maintain.

### Frontend examples
- Complex API request configurations.
- Chart or visualization configurations.
- Test data with optional fields.
- Complex form configurations.

### Interview clue
> An object has many options or construction steps, and creating it directly is becoming difficult to manage.

### Caution
For a simple object with only a few properties, a plain object literal is usually enough.

---

## 5. Object Pool Pattern

**Purpose:** Reuse existing objects instead of repeatedly creating and discarding them.

### When to use
- Creating or initializing objects is expensive.
- Many similar objects are needed repeatedly.
- Profiling shows that allocation or setup overhead is a performance problem.

### Frontend examples
- Reusing game objects in PixiJS.
- Reusing particles in animations.
- Reusing objects in simulations.

### Interview clue
> The application repeatedly creates and destroys expensive objects, causing measurable overhead.

### Caution
JavaScript garbage collection handles ordinary short-lived objects well. Use an object pool only when there is a demonstrated performance benefit; pools add complexity and can retain memory.

---

## 6. Visitor Pattern

**Purpose:** Add operations to a stable set of object types without putting those operations into each element class.

### When to use
- The set of element types is relatively stable.
- You need to perform several different operations on those elements.
- You want to separate operations from the data structures they operate on.

### Frontend examples
- Calculating rendering costs for different UI component types.
- Exporting component configurations.
- Analyzing or transforming an abstract syntax tree.

### Interview clue
> The object types are stable, but you need to add new operations without modifying each element class.

### Caution
Adding a new element type usually requires updating the visitor interface and its implementations. Visitor is less attractive when element types change frequently.

---

## 7. Chain of Responsibility Pattern

**Purpose:** Pass a request through a sequence of handlers. Each handler processes, rejects, or forwards the request.

### When to use
- A request must pass through several independent checks.
- Each handler should have one responsibility.
- The handler order or chain should be configurable.

### Frontend examples
- Request middleware.
- Authentication, validation, and permission checks.
- Form validation pipelines.
- Processing input through a sequence of rules.

### Interview clue
> A request needs to pass through multiple independent handlers, each responsible for one step.

### Caution
Make the order of handlers clear and ensure failures stop or forward processing according to the intended behavior.

---

## 8. Command Pattern

**Purpose:** Encapsulate a request or action as an object, separating the requester from the code that performs the action.

### When to use
- UI event handling should be separated from business logic.
- Actions need to be queued, logged, stored, or replayed.
- You need undo/redo functionality.

### Frontend examples
- Text editor actions such as Copy, Paste, Undo, and Redo.
- Undoable drawing operations.
- Toolbar commands.
- Queued user actions.

### Interview clue
> An action must be represented independently so it can be executed, stored, queued, logged, or reversed.

### Caution
Undo requires each command to preserve enough information to reverse its operation. Not every action is naturally reversible.

---

## 9. Strategy Pattern

**Purpose:** Encapsulate interchangeable algorithms or behaviors behind a common interface.

### When to use
- Several approaches perform the same overall task.
- A large `if/else` or `switch` selects between algorithms.
- The algorithm needs to change at runtime.

### Frontend examples
- Payment methods.
- Sorting strategies.
- Validation rules.
- Pricing and discount calculations.
- Different authentication methods.

### Interview clue
> The application performs the same task in different ways, and you want to switch approaches without changing the code that uses them.

### Caution
Do not create separate strategy classes when a small conditional or simple function would be clearer.

---

## 10. Adapter Pattern

**Purpose:** Make an existing interface compatible with the interface expected by the client.

### When to use
- A third-party library exposes a different API from the one your application expects.
- You need to integrate a legacy service.
- Several providers perform similar jobs but expose different method names or data formats.

### Frontend examples
- Adapting a third-party payment gateway to an application's `pay(amount)` interface.
- Normalizing different API response formats.
- Integrating different analytics providers.
- Wrapping a legacy JavaScript library.

### Interview clue
> The client expects one interface, but an existing service exposes a different interface that you cannot or should not modify.

### Caution
An adapter should translate the interface or data contract, not become a place for unrelated business logic.

---

## 11. Decorator Pattern

**Purpose:** Add behavior to an object dynamically by wrapping it, without modifying its original class.

### When to use
- Features should be optional and composable.
- Inheritance would create too many subclasses for different combinations.
- You want to extend an object's behavior while preserving its original interface.

### Frontend examples
- Adding milk and sugar to a coffee object.
- Wrapping API calls with logging or caching.
- Adding optional functionality around an existing service.
- Composing behaviors around a function or object.

### Interview clue
> You need to add optional, composable behavior without modifying the original class or creating a subclass for every combination.

### Caution
Keep the wrapped object's interface consistent and avoid deeply nested wrappers that are hard to debug.

---

## 12. Facade Pattern

**Purpose:** Provide a simple interface over a complex subsystem.

### When to use
- One workflow requires coordinating several classes or services.
- Client code must call many methods in a particular sequence.
- You want to hide subsystem details from consumers.

### Frontend examples
- A video player coordinating loading, audio initialization, and decoding.
- A checkout service coordinating cart validation, payment, and order creation.
- A service that coordinates several API calls.
- A simplified interface over multiple storage mechanisms.

### Interview clue
> A single operation requires several subsystem calls, and you want the client to invoke one simple method.

### Caution
A facade should simplify access, not become a giant class that absorbs all business logic.

---

## 13. Factory Pattern

**Purpose:** Centralize object creation and return the appropriate object based on the requirements.

### When to use
- The concrete object type depends on runtime input.
- Object creation logic is repeated across the application.
- Client code should not need to know the concrete class being created.

### Frontend examples
- Creating email, SMS, or push notification objects.
- Creating different form-field types.
- Creating chart types.
- Selecting an API client implementation.

### Interview clue
> The application needs one of several object types based on a condition, and you want to centralize that creation decision.

### Caution
A factory is not necessary for every `new` call. Use it when it meaningfully centralizes or hides creation decisions.

---

## 14. State Pattern

**Purpose:** Let an object change its behavior based on its current state by delegating behavior to state-specific objects.

### When to use
- An object has multiple states.
- The same action behaves differently in different states.
- State-dependent conditionals are becoming complicated.

### Frontend examples
- Media players: Playing, Paused, Stopped.
- Authentication flows: Logged out, Authenticating, Logged in.
- Upload processes: Pending, Uploading, Completed, Failed.
- Order workflows.

### Interview clue
> The same operation must behave differently depending on the current state, and conditional logic is becoming difficult to maintain.

### Caution
For a very simple state machine, a few explicit conditionals may be clearer than separate state classes.

---

## 15. Module Pattern

**Purpose:** Group related functionality, keep implementation details private, and expose a controlled public API.

### When to use
- Variables or functions should not be accessible from outside.
- Only selected operations should be exposed.
- Related functions and data belong together.

### Frontend examples
- A shopping cart module.
- Authentication utilities.
- A configuration manager.
- Reusable JavaScript utilities.

### Interview clue
> You want to hide internal variables and implementation details while exposing only a controlled public API.

### Caution
In modern JavaScript, ES modules (`import`/`export`) are generally preferred for organizing application code. The classic IIFE-based Module Pattern is still useful to understand.

---

## How to Recognize a Pattern in an Interview

| Problem clue | Pattern |
|---|---|
| One shared instance | Singleton |
| Multiple subscribers react to an event | Observer |
| Control or intercept access to an object | Proxy |
| Complex object construction with many options | Builder |
| Reuse expensive objects | Object Pool |
| Add operations to stable object types | Visitor |
| Request passes through multiple handlers | Chain of Responsibility |
| Represent actions independently; support undo/redo | Command |
| Switch between algorithms or behaviors | Strategy |
| Incompatible interfaces must work together | Adapter |
| Add optional behavior by wrapping an object | Decorator |
| Simplify interaction with a complex subsystem | Facade |
| Create an object based on a runtime condition | Factory |
| Behavior changes based on current state | State |
| Hide internal details behind a public API | Module |

## Final Advice

- Learn the **problem each pattern solves**, not just its definition.
- Practice one small JavaScript implementation for each pattern.
- Be able to explain the trade-offs and when *not* to use it.
- Avoid forcing patterns into simple code. A pattern is useful when it makes the design easier to understand, extend, or maintain.

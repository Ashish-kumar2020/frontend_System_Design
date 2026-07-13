User Click

↓

setState()

↓

Create Update

↓

Append to Hook Queue

↓

Scheduler

↓

Render Phase

↓

Clone Current Tree

↓

Create WIP Tree

↓

Execute Parent()

↓

React reaches <Child />

↓

React detects React.memo

↓

Read Current Fiber.memoizedProps

↓

Read WIP Fiber.pendingProps

↓

Shallow Compare
(Object.is for each prop)

↓

Props Same?

├── Yes
│
│   Bailout
│
│   Skip Child()
│
│   Reuse Previous Fiber Output
│
└── No
    │
    ▼
Execute Child()

↓

Continue Reconciliation
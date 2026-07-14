Parent Component Executes

↓

Reach useMemo()

↓

Read Hook.memoizedState

↓

Compare Dependency Array

↓

Dependencies Changed?

├─────────────────────────────┐
│                             │
│ NO                          │
│                             │
│ Return Cached Value         │
│                             │
└─────────────────────────────┘

                OR

┌─────────────────────────────┐
│ YES                         │
│                             │
│ Execute Callback            │
│                             │
│ Create New Value            │
│                             │
│ Store Value in             │
│ Hook.memoizedState          │
│                             │
│ Return New Value            │
└─────────────────────────────┘

↓

Continue Executing Parent Component
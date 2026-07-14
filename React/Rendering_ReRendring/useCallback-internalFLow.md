Parent Component Executes

↓

Reach useCallback()

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
│ Return Cached Function      │
│                             │
└─────────────────────────────┘

                OR

┌─────────────────────────────┐
│ YES                         │
│                             │
│ Create New Function         │
│                             │
│ Store Function in          │
│ Hook.memoizedState          │
│                             │
│ Return Function             │
└─────────────────────────────┘

↓

Pass Function as Prop

↓

React.memo

↓

Compare Function References

↓

Same?

├── Yes → Bailout
└── No  → Execute Child()
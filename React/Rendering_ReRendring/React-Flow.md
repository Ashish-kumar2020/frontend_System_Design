User Click

↓

setState()

↓

Create Update Object

↓

Append Update to Hook Queue

↓

Notify Scheduler

↓

Scheduler Schedules Root

↓

═══════════════════════
Render Phase
═══════════════════════

↓

Clone Current Tree

↓

Create WIP Tree

↓

Execute App()

↓

Reach useState()

↓

Read Hook Queue

↓

Process Updates

↓

Compute New State

↓

Update WIP Hook.memoizedState

↓

Generate JSX

↓

Create React Elements

↓

Update WIP Fiber Tree

↓

Reconciliation

↓

Compare Current Tree

↓

WIP Tree

↓

Find Differences

↓

Create Effect List

═══════════════════════
Commit Phase
═══════════════════════

↓

Traverse Effect List

↓

Update Real DOM

↓

Swap WIP Tree

↓

WIP becomes Current Tree

↓

Browser Layout

↓

Paint

↓

Composite

↓

Run useEffect()
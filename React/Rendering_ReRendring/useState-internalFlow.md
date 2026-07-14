User Click

↓

setState(newState)

↓

Create Update Object

↓

Append Update to Hook Update Queue

↓

Notify Scheduler

↓

Scheduler Marks Root for Update

↓

═══════════════════════════════════════
Render Phase Starts
═══════════════════════════════════════

↓

Clone Current Fiber Tree

↓

Create Work In Progress (WIP) Tree

↓

Execute Root Component (App)

↓

Reach useState()

↓

Read Hook Update Queue

↓

Process All Pending Updates

↓

Compute New State

↓

Update Hook.memoizedState

↓

Continue Executing Component

↓

Generate JSX

↓

React.createElement()

↓

Update WIP Fiber Tree

↓

Reconciliation

↓

Compare Current Tree

vs

Work In Progress Tree

↓

Find Differences

↓

Create Effect List

═══════════════════════════════════════
Commit Phase Starts
═══════════════════════════════════════

↓

Traverse Effect List

↓

Apply DOM Updates

↓

Swap Trees

(WIP Tree becomes Current Tree)

↓

Browser Layout

↓

Browser Paint

↓

Browser Composite

↓

Run useEffect()
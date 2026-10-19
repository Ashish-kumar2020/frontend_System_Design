
import './App.css'
import { Dashboard } from './component/Dashboard'
import { withAuth } from './component/withAuth'

const ProtectedDashboard = withAuth(Dashboard);
function App() {
  
  return (
    <>
      <h3>Higher Order Component</h3>
      <ProtectedDashboard/>
    </>
  )
}

export default App

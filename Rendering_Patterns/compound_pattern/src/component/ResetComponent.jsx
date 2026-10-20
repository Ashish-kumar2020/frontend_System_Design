import { useContext } from "react"
import { CompoundContext } from "../context/CompoundContext"


const ResetComponent = () => {
    const {setValues} = useContext(CompoundContext)
  return (
    <button onClick={() => setValues("Hello, world")}>Reset</button>
  )
}

export default ResetComponent
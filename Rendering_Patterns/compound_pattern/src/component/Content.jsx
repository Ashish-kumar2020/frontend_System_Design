import { useContext } from "react"
import { CompoundContext } from "../context/CompoundContext"



const Content = () => {
    const {value, setValues} = useContext(CompoundContext);
  return (
    <>
        <p>SHared Value : {value}</p>
        <button type="button" onClick={() => setValues("Value update ho ja")}>Update Value</button>
    </>
    
  )
}

export default Content
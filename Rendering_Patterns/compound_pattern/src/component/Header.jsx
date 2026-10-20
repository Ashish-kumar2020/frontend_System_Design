import { useContext } from "react"
import { CompoundContext } from "../context/CompoundContext"


export const Header = () => {
    const {value} = useContext(CompoundContext);
  return (
    <>
         <div>Header</div>   
        <p>Shared Values : {value}</p>
    </>
  )
}

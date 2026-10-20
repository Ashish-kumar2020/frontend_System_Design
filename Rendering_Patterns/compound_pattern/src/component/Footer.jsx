import { useContext } from "react"
import { CompoundContext } from "../context/CompoundContext"


export const Footer = () => {
    const {value} = useContext(CompoundContext)
  return (
    <div>Footer : {value}</div>
    
  )
}

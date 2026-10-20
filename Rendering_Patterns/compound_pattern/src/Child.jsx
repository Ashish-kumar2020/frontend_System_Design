import { useContext } from "react"
import { CompoundContext } from "./context/CompoundContext"

const Child = () => {
    const {value, setValues} = useContext(CompoundContext);

    return(
        <>
            <h3>Child Component</h3>
            <p>{value}</p>
            <button type="button" onClick={() => setValues("Wossshhh Value badal Gai na")}>Magic</button>
        </>
    )
}

export default Child;
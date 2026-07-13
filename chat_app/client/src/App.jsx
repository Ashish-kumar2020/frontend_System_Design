import { useEffect, useRef, useState } from "react";

function App() {
  // // let count = 0;
  // let [count,setCount] = useState(0);
  // function increment() {
  //   setCount(count + 5);
  //   // count = 5
  //   setCount(prev => prev + 1);
  //   console.log(count);
  // }
  // console.log(document.querySelector("h1")?.textContent);

  // const [age, setAge] = useState(26);
  // const [count, setCount] = useState(0);
  // const [name, setName] = useState("Ashish");
  // const [updateCount, setUpdateCount] = useState(false);

  
  // function increment() {
  //   const [age] = useState(20); // Hook 1

  //   if (updateCount) {
  //     const [count] = useState(0); // Hook 2 (sometimes exists)
  //   }

  //   const [name] = useState("Ashu"); // Hook 3
  // }

  //  const [count] = useState(0);

  //   if (count > 0) {

  //       useEffect(() => {});

  //   }

  //   const ref = useRef();
  return (
    <>
      <h1>Hello</h1>;
      {/* <h1>{count}</h1>
      // <button onClick={increment}>+</button> */}
      {/* <button onClick={increment}>Update State</button> */}
      {/* {age}
      {count} */}
      {name}
    </>
  );
}

export default App;

import { useState } from "react";




function App() {
  // // let count = 0;
  // let [count,setCount] = useState(0);
  // function increment() {
  //   setCount(count + 5);
  //   // count = 5
  //   setCount(prev => prev + 1);
  //   console.log(count);
  // }
  console.log(document.querySelector("h1")?.textContent);

  return (
    <>
     <h1>Hello</h1>;
      {/* <h1>{count}</h1>
      <button onClick={increment}>+</button> */}
    </>
  );
}

export default App;
import React, { createContext, useContext, useState } from "react";

const Context = createContext();

const MyContext = () => {
    const [count2, setCount2] = useState(0)
  return (  
    <div>
    <button onClick={()=>setCount2(count2+2)}>count2 {count2}</button>
      <ContextProvider>
        <Component1 />
        <Component2 />
        <Counter/>
      </ContextProvider>
    </div>
  );
};


function ContextProvider({ children }) {
  const [count, setCount] = useState(0);
  return <Context.Provider value={{count, setCount}}>{children}</Context.Provider>;
}
function Counter(){
    const {count, setCount} = useContext(Context)
    return <button onClick={() => setCount((count) => count + 1)}>
    count {count}
  </button>
}
function Component1() {
  const value = useContext(Context);
  console.log("component1 render", value);
  return <div>Component1</div>;
}
function Component2() {
  console.log("component2 render");
  return <div>Component2</div>;
}
export default MyContext;

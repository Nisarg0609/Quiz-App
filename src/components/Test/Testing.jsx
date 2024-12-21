import React, { useState } from 'react'
import Button from '../Button/Button'

const SlowComponent = ()=>{
    const words = Array.from({length:100_000},()=>"word");
    return <div>
        {
            words.map((word,i)=><span>{i} : {word}</span>)
        }
    </div>
}

const Counter = ({children})=>{
    const [count, setCount] = useState(0);
    return <div>
        <Button onClick={()=>setCount(count=>count+1)}>count : {count}</Button>
        {children}
    </div>
}

const Testing = () => {
  return (
    <div>
        <Counter>
        <SlowComponent/>
        </Counter>
    </div>
  )
}

export default Testing
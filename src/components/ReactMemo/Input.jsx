import React, { memo, useCallback, useMemo, useState } from 'react'

const SlowComponent = memo(function SlowComponent({obj:{word}, onLog}){
    const words = Array.from({length:100_000},()=>word);
    return <div>
        <button onClick={()=>onLog(word)}>click to log word</button>
        {
            words.map((word,i)=><span>{i} : {word}</span>)
        }
    </div>
})  
const Input = () => {
    const [name, setName] = useState('')
    const obj = useMemo(()=>{
        return  {
            word:'hello'
        }
    },[])

    const handleClick = useCallback(function handleClick(word){
        console.log(word)
    },[]) 

  return (
    <div>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        <SlowComponent obj={obj} onLog={handleClick}/>
    </div>
  )
}

export default Input
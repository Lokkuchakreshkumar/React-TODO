import { useState } from "react"
import axios from "axios"





export default function Input({newRefresh}){
 let [input,setInput] = useState('');
 let handleinput = (event) =>{
    setInput(event.target.value);
 }
 let handleSubmit = async(event)=>{
    event.preventDefault();
    console.log(input)

    try {
        const response = await axios.post('http://localhost:8083/',{
            input:input
        })
        console.log(response.data.body)
    } catch (error) {
        
        console.log(error)
    }
    setInput('')
newRefresh();
 }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleinput} placeholder="Add a task" className="placeholder:text-slate-700 border-2 border-black rounded-xl m-2 h-12 bg-slate-900 placeholder:p-2 pl-4 text-white outline-hidden"/>
            <button type="submit" className="ml-4 bg-green-700 w-24 h-12 rounded-2xl text-amber-300">Add</button>
        </form>
    )
}
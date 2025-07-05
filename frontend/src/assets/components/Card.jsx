import Title from "./Title.jsx"
import Input from "./Input.jsx"
import Show from "./ShowTodo.jsx"
import { useState } from "react";

export default function Card(){
let [refresh,setRefresh ] = useState(0);


   return(
   
    <div className="w-1/2 min-h-[500px] flex bg-[#1B1B1D] flex-col items-center  rounded-3xl max-sm:w-4/5">
     <Title/>
     <Input newRefresh={()=>setRefresh(prev=>prev+1)}/>
     <Show refresh = {refresh}  />
    </div>
   
   )
}
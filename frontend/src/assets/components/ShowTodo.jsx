import axios from "axios"
import { useState,useEffect } from "react";


export default function Show({refresh}){
    let [data,setData] = useState([])
    let [delete_item,setDelete] = useState(0)
    let [tick_refresh,settickrefresh] = useState(0);
    useEffect(()=>{
 async function getData(){
        let response = await axios.get('http://localhost:8083/')
        console.log(response.data)
         setData(response.data)
    }
 getData();
    },[refresh,delete_item,tick_refresh])
   
    let handleDelete = async (id) =>{
        let response = await axios.post('http://localhost:8083/delete',{
         id: id
        })
        console.log(response)
        setDelete(prev=>prev+1)
        
 }
 let handleTick = async(id,event)=>{
             console.log(event.target.checked)
             let response = await axios.post('http://localhost:8083/tick',{
               id:id
             })
             console.log('hi')
             console.log(`this is from backend:${response.data.isCompleted}`)
             settickrefresh(prev=>prev+1)
 }
 

    return(
         <div className="w-4/5 min-h-[400px] bg-transparent flex justify-center mt-8">
         <form action="">
           {
             data.map((el)=>{
               return(
                  <div className="m-4 flex items-center"  key={el._id}>
                      <input type="checkbox" checked={el.isCompleted} className="hover:cursor-pointer mr-4" onChange={()=>handleTick(el._id,event)}  />
                      <span className={`text-xl myl-4 ${el.isCompleted?"line-through text-gray-500":"text-white"}`}>{el.task}</span>
                      <button type="button" className="bg-red-600 ml-4 p-2 rounded hover:bg-red-500 hover:cursor-pointer" onClick={()=>handleDelete(el._id)}>Delete</button>
                  </div>
               )
             })
           }
         </form>
         </div>
    )
}
import mongoose from "mongoose"
import express, { urlencoded } from "express"
import dotenv from "dotenv";
import cors from "cors"
const app = express();
import todo from "./models/todo.js"

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(urlencoded({extended:true}))
async function connect_mongo(){
  await  mongoose.connect(process.env.MONGOURI)
}
app.get('/',async (req,res)=>{
  let response = await todo.find({});
  res.send(response)
})
app.post('/', async (req,res)=>{
    let body = req.body;
    let task = body.input
    await todo.create({
        task: task
    }).then((resp)=>{
        console.log(resp)
    }).catch((err)=>{
        console.log(err);
    })
    res.send('successs')
    
})
app.post('/delete', async (req,res)=>{
    console.log(req.body)
   await todo.findByIdAndDelete(req.body.id).then((resp)=>{
    console.log(resp)
   }).catch((err)=>{
    console.log(err)
   })
   res.send('success')

})
app.post('/tick',async(req,res)=>{
   let answer;
    let response = await todo.findById(req.body.id)
    
    if(!response.isCompleted){
          answer = true;
    }
    else{
          answer = false;
    }
    response.isCompleted= answer
       await response.save();
       res.send(response)
})
    connect_mongo().then(()=>{
        app.listen(process.env.PORT,()=>{
    console.log(`listening on ${process.env.PORT}`)
        console.log('connected')
        })
    }).catch((err)=>{
        console.log(err)
    })




import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import { ConnectDB } from "./config/ConnectDB.js";
import dns from 'dns'
dns.setServers(['8.8.8.8','0.0.0.0'])

const app = express()
app.use(express.json())
const PORT =3000
ConnectDB()
let data=[
  {
    "id": "1",
    "name": "Ali Khan",
    "email": "ali.khan@gmail.com",
    "field": "Computer Science"
  },
  {
    "id": "2",
    "name": "Ahmed Raza",
    "email": "ahmed.raza@gmail.com",
    "field": "Computer Science"
  },
  {
    "id": "3",
    "name": "Usman Malik",
    "email": "usman.malik@gmail.com",
    "field": "Information Technology"
  },
  {
    "id": "4",
    "name": "Hamza Ahmed",
    "email": "hamza.ahmed@gmail.com",
    "field": "Cyber Security"
  },
  {
    "id": "5",
    "name": "Bilal Hussain",
    "email": "bilal.hussain@gmail.com",
    "field": "Artificial Intelligence"
  }
]

app.get('/api/students',(req,res)=>{
    try {
        const {name,field,email} =req.query
        if(name){
            const filteredData = data.filter(item=>item.name.toLowerCase()==name.toLowerCase())
            res.status(200).json({message:`Student Found`,success:true,data:filteredData})
        }else if(field){
            const filteredData = data.filter(item=>item.field.toLowerCase()==field.toLowerCase())
            res.status(200).json({message:`Student Found`,success:true,data:filteredData})
        }else if(email){
            const filteredData = data.filter(item=>item.email.toLowerCase()==email.toLowerCase())
            res.status(200).json({message:`Student Found`,success:true,data:filteredData})
        }else{
        res.status(200).json({message:'All Student Data Fetched',success:true,data})
        }
    } catch (error) {
        res.status(404).json({message:`${error}`,success:false})
    }
})


app.get('/api/students/:id',(req,res)=>{
    const {id} = req.params
    const filteredData =  data.find(item=>item.id == id)
        if(!filteredData){
            return res.status(400).json({message:`Student With ${id} id Not Enrolled`,success:false})
        }
            res.status(200).json({message:`Student With ${id} id fetched`,data:filteredData})
})


app.post('/api/students/create',(req,res)=>{
   const {id,name,field,email} = req.body
   if(!id || !name || !field || !email){
    return res.status(400).json({message:'id,name,email and field are required',success:false})
   }
   const check = data.some(item=>item.id == id)
   if(check){
       res.status(400).json({message:`Student With ${id} id Already Enrolled`,success:false})
       return
   }
   data.push(req.body)
   res.status(201).json({message:`Student with ${id} id Addedd Successfully`,success:true,data:data})
})


app.put('/api/students/update/:id',(req,res)=>{
    const {id} = req.params
    const check = data.find(item=>item.id == id)
    if(!check){
        res.status(400).json({message:`Student with ${id} id not Enrolled`,success:false})
        return
    }
    Object.assign(check,req.body)
    res.status(200).json({message:`Student with ${id} id Updated Successfully`,success:true,data})

})


app.delete('/api/students/delete/:id',(req,res)=>{
    const {id}=req.params
    const filteredData = data.find(item=>item.id == id)
    if(filteredData){
        data = data.filter(item=>item.id != id)
        res.status(200).json({message:`Student with ${id} id Deleted Successfully`,success:true,data})
        return
    }
        res.status(400).json({message:`Student with ${id} id Not Enrolled`,success:false})
})


app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
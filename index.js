import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import { ConnectDB } from "./config/ConnectDB.js";
import dns from 'dns'
import mongoose, { Schema } from "mongoose";
import { type } from "os";
dns.setServers(['8.8.8.8','0.0.0.0'])

const app = express()
app.use(express.json())
const PORT =3000
ConnectDB()
// let data=[
//   {
//     "id": "1",
//     "name": "Ali Khan",
//     "email": "ali.khan@gmail.com",
//     "field": "Computer Science"
//   },
//   {
//     "id": "2",
//     "name": "Ahmed Raza",
//     "email": "ahmed.raza@gmail.com",
//     "field": "Computer Science"
//   },
//   {
//     "id": "3",
//     "name": "Usman Malik",
//     "email": "usman.malik@gmail.com",
//     "field": "Information Technology"
//   },
//   {
//     "id": "4",
//     "name": "Hamza Ahmed",
//     "email": "hamza.ahmed@gmail.com",
//     "field": "Cyber Security"
//   },
//   {
//     "id": "5",
//     "name": "Bilal Hussain",
//     "email": "bilal.hussain@gmail.com",
//     "field": "Artificial Intelligence"
//   }
// ]

const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        field:{type:String,required:true},

    },{timestamps:true})

    const User = mongoose.model('User',userSchema)


app.get('/api/students',async(req,res)=>{
    try {
        const allData = await User.find({})
        res.status(200).json({message:'All Student Data Fetched',success:true,data:allData})
        
    } catch (error) {
        res.status(404).json({message:`${error}`,success:false})
    }
})


app.get('/api/students/:id',async(req,res)=>{
  const filteredData =await User.findById(req.params.id)
        if(!filteredData){
            return res.status(400).json({message:`Student With ${req.params.id} id Not Enrolled`,success:false})
        }
            res.status(200).json({message:`Student With ${req.params.id} id fetched`,data:filteredData})
})


app.post('/api/students/create',async(req,res)=>{
   const {name,field,email} = req.body
   if(!name || !field || !email){
    return res.status(400).json({message:'id,name,email and field are required',success:false})
   }
    const result =  await User.create({
    email,name,field
   })
   
   res.status(201).json({message:'created successfully'})
})


app.put('/api/students/update/:id',async(req,res)=>{
    const check = await User.findByIdAndUpdate(req.params.id,(req.body))
    if(!check){
        res.status(400).json({message:`Student with ${req.params.id} id not Enrolled`,success:false})
        return
    }
    Object.assign(check,req.body)
    res.status(200).json({message:`Student with ${req.params.id} id Updated Successfully`,success:true})

})


app.delete('/api/students/delete/:id',async(req,res)=>{
    const filteredData =await User.findByIdAndDelete(req.params.id)
    if(filteredData){
        res.status(200).json({message:`Student with ${req.params.id} id Deleted Successfully`,success:true})
        return
    }
        res.status(400).json({message:`Student with ${req.params.id} id Not Enrolled`,success:false})
})


app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
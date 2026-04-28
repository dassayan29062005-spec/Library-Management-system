const express= require("express");
const {users} = require("./data/users.json")
const app=express();

const port=8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Home page"
    });
})
app.get('/users',(req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})

app.get('/users/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id===id);
    if(!user){
       return res.status(404).json({
            success:false,
            message: `user not found ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: user
    })
})

// app.all("*",(req,res)=>{
//     req.status(500).json({
//         message: "Not Built yet"
//     })
// })

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})
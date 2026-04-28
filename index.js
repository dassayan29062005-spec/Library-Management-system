const express= require("express");

const app=express();

const port=8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Home page"
    });
})

// app.all("*",(req,res)=>{
//     req.status(500).json({
//         message: "Not Built yet"
//     })
// })

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})
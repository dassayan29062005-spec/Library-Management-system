const express=require("express");
const { users}=require("../data/users.json");
const app=express.Router();



app.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})

app.get('/:id',(req,res)=>{
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

app.post('/',(req,res)=>{
    const {id,name,issue}=req.body;
    if(!id||!name||!issue){
        return res.status(400).json({
            success:false,
            message:'provide field'
        })
        

    }
    const user=users.find((each)=>each.id===id)

        if(user){
            return res.status(400).json({
                success: false,
                message: `user exist id: ${id}`
            })
        }
        users.push({
            id,
            name,
            issue
        })

       res.status(200).json({
        success: true,
        message: "data entried"
    }) 
})

// app.all("*",(req,res)=>{
//     req.status(500).json({
//         message: "Not Built yet"
//     })
// })

app.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const user=users.find((each)=>each.id===id)
    if(!user){
        return res.status(200).json({
            success:false,
            message:"user not found"
        })
    }
    // if user exist
    // Object.assign(users,data);
// ... is called spread operator
    const updtusr=users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
            }
            return each;
        
    });
    
    res.status(200).json({
        success: true,
        data:updtusr,
        message: "data updated"
    }) 
})


app.delete('/:id',(req,res)=>{
    const {id}=req.params;
    
    const user=users.find((each)=>each.id===id)
    if(!user){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }
    const deluser=users.filter((each)=>each.id!==id)

    res.status(200).json({
         success: true,
        data:deluser,
        message: `${id} data deleted`
    })
})

module.exports = app;
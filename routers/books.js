const express=require("express");
const {books}=require("../data/books.json");
// one step ahead
const app=express.Router();


app.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books
    })
})

app.get('/:id',(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id===id);
    if(!book){
       return res.status(400).json({
            success:false,
            message: `books not found ${id}`
        })
    }
    res.status(200).json({
        success: true,
        data: book
    })
})

app.post('/',(req,res)=>{
    const {id,name,author}=req.body;
    if(!id||!name||!author){
        return res.status(400).json({
            success:false,
            message:'provide field'
        })
        

    }
    const book=books.find((each)=>each.id===id)

        if(book){
            return res.status(400).json({
                success: false,
                message: `book exist id: ${id}`
            })
        }
        books.push({
            id,
            name,
            author
        })

       res.status(200).json({
        success: true,
        message: "data entried"
    }) 
})


app.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const book=books.find((each)=>each.id===id)
    if(!book){
        return res.status(200).json({
            success:false,
            message:"book not found"
        })
    }
    // if user exist
    // Object.assign(users,data);
// ... is called spread operator
    const updtbk=books.map((each)=>{
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
        data:updtbk,
        message: "data updated"
    }) 
})


app.delete('/:id',(req,res)=>{
    const {id}=req.params;
    
    const book=books.find((each)=>each.id===id)
    if(!book){
        return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }
    // const delbk=books.filter((each)=>each.id!==id)
    const delbk=books.splice(book,1);
    res.status(200).json({
         success: true,
        data:delbk,
        message: `${id} data deleted`
    })
})
module.exports=app;
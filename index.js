const express= require("express");
const {users} = require("./data/users.json")
const app=express();

const port=8081;

const usrrut=require('./routers/users.js');
const bookrut=require('./routers/books.js');

app.use(express.json());
app.use("/users",usrrut);
app.use("/books",bookrut);





app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})
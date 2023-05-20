//video 8..

const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000,()=> console.log('server is listening at port 3000'));

let user={};

app.get('/user', (req,res)=>{
    res.send(user);
})

app.post('/user',(req,res)=>{
    console.log(req.body);
    user= {...req.body};
    res.json({                     //can use res.send here as well
        message:"Data recieved",
        user:req.body
    })
})


app.patch('/user', (req,res)=>{
    console.log('req->body ' ,req.body);
    for(key in req.body){
        user[key]= req.body[key];
    }
    res.json({
        message: "data updated",
        user:user
    })
})

app.delete('/user', (req,res)=>{
    user={};
    res.json({
        message:"data deleted successfully",
        user:user
    });
});
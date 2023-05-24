//video 10..

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.listen(3000,()=> console.log('server is listening at port 3000'));

let user=[
    {
        "_id":1,
        "name": "a"
    },
    {
        "_id":2,
        "name": "b"
    },
    {
        "_id":3,
        "name": "x"
    },
    
]

const userRouter = express.Router();
const authRouter = express.Router();
app.use('/user', userRouter );
app.use('/auth', authRouter );
userRouter.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter.route('/:id')
.get(getUserById);


authRouter.route('/signup')
// .get(midfunc1,getSignup)                          //using a middleware function
.get(midfunc1,getSignup,midfunc2)
.post(postSignup);

//middleware function..
function midfunc1(req,res,next){
    console.log('middle ware1 function is called');
    next();
}
function midfunc2(req,res){
    console.log('middle 2 function is called');
}
//---------------- for mounting ---------------

async function getUsers(req,res){
    // console.log(req.query);
    // res.send(user);

    // let allUsers= await userModel.find();
    // res.json({
    //     message:'list of all users',
    //     data:allUsers
    // });

    let user = await userModel.findOne({email:'abc@gmail.com'});
    res.send(user);
}
function postUser(req,res){
    console.log(req.body);
    user= {...req.body};
    res.json({                     //can use res.send here as well
        message:"Data recieved",
        user:req.body
    })
}

async function updateUser(req,res){
    // console.log('req->body ' ,req.body);
    // for(key in req.body){
    //     user[key]= req.body[key];
    // }

    let dataToBeUpdated= req.body;
    let user = await userModel.findOneAndUpdate({email:'abc@gmail.com'},dataToBeUpdated);
    res.json({
        message: "data updated",
        user:user
    })
}

async function deleteUser(req,res){
    // user={};

    // let user = await userModel.findOneAndDelete({email:'x@gmail.com'});
    let dataToDelete= req.body;
    let user = await userModel.findOneAndDelete(dataToDelete);
    res.json({
        message:"data deleted successfully",
        user:user
    });
}

function getUserById(req,res){
    console.log("user id is-> ", req.params);
    res.send(req.params);
    // res.send(req.params.id)
}
/*
localhost:3000/user/1                   //params
localhost:3000/user/?_id=2             //query- params
*/

// function getSignup(req,res){
//     console.log('getSignup Called')
//     res.sendFile('/public/index.html', {root:__dirname});
// }

function getSignup(req,res, next){
    console.log('getSignup Called')
    res.sendFile('/public/index.html', {root:__dirname});
    next();
}
 async function postSignup(req,res){
    let userData = req.body;
    let user = await userModel.create(userData);
    console.log("userData: " ,userData);
    res.json({
        message:"user signed up",
        data: user
    })
}
const db_link='mongodb+srv://mndgmndg:mndgmndg@cluster0.ucsnz0u.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    // console.log(db)
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:3
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:3
    }
})

const userModel = mongoose.model('user',userSchema);

// (async function createUser(){
//     let user={
//         name:"Devanshi",
//         email:"abc@gmail.com",
//         password:"ala",
//         confirmPassword:"ala"
//     };

//     let data = await userModel.create(user);
//     console.log(data);
// })();
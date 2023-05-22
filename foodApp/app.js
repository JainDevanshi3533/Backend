//video 10..

const express = require('express');
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
.get(getUser)
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

function getUser(req,res){
    console.log(req.query);
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

function updateUser(req,res){
    console.log('req->body ' ,req.body);
    for(key in req.body){
        user[key]= req.body[key];
    }
    res.json({
        message: "data updated",
        user:user
    })
}

function deleteUser(req,res){
    user={};
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
function postSignup(req,res){
    let userData = req.body;
    console.log("userData: " ,userData);
    res.json({
        message:"user signed up",
        data: userData
    })
}
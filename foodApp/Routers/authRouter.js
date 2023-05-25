const express = require('express');
const userModel = require('../models/userModel');

const authRouter = express.Router();



authRouter.route('/signup')
// .get(midfunc1,getSignup)                          //using a middleware function
.get(midfunc1,getSignup,midfunc2)
.post(postSignup);

authRouter.route('/login')
.post(loginUser);

//middleware function..
function midfunc1(req,res,next){
    console.log('middle ware1 function is called');
    next();
}
function midfunc2(req,res){
    console.log('middle 2 function is called');
}
//---------------- for mounting ---------------

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
    // console.log("userData: " ,userData);
    res.json({
        message:"user signed up",
        data: user
    })
}
async function loginUser(req,res){
    try{
        let data = req.body;
        if(data.email){
            let user= await userModel.findOne({email:data.email});
            if(user){
                //bcrypt->compare
                if(user.password == data.password){
                    return res.json({
                        message:'User has logged In',
                        userDetails:data
                    })
                }else{
                    return res.json({
                        message:'Password not correct'
                    })
                }
            }else{
                return res.json({
                    message:'User not found'
                })
            }
        }else{
            return res.json({
                message:'User not found'
            })
        }
        
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
    

}
module.exports= authRouter;
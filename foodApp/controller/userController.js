const userModel = require('../models/userModel');

module.exports.getUsers= async function getUsers(req,res){
    // console.log(req.query);
    // res.send(user);

    let allUsers= await userModel.find();
    res.json({
        message:'list of all users',
        data:allUsers
    });

    // let user = await userModel.findOne({email:'abc@gmail.com'});
    // res.send(user);
}
module.exports.postUser=function postUser(req,res){
    console.log(req.body);
    user= {...req.body};
    res.json({                     //can use res.send here as well
        message:"Data recieved",
        user:req.body
    })
}

module.exports.updateUser=async function updateUser(req,res){
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

module.exports.deleteUser=async function deleteUser(req,res){
    // user={};

    // let user = await userModel.findOneAndDelete({email:'x@gmail.com'});
    let dataToDelete= req.body;
    let user = await userModel.findOneAndDelete(dataToDelete);
    res.json({
        message:"data deleted successfully",
        user:user
    });
}

module.exports.getUserById=function getUserById(req,res){
    console.log("user id is-> ", req.params);
    res.send(req.params);
    // res.send(req.params.id)
}

module.exports.getCookies=function getCookies(req,res){
    let my_cookies = req.cookies;
    console.log(my_cookies);
    res.send('cookie recieved');
}

module.exports.setCookies=function setCookies(req,res){
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.cookie('isLoggedIn',  false,{maxAge:1000*60*60*24, secure:true, httpOnly:true});      //expires-maxage: here set to 24 hours  in milliseconds
                                    // expires in         ,security , can access from server http only..i.e not from frontend using inspect: document.cookie
    res.cookie('assessibleFromfrontend', true);
    res.send('cookie has been sent');
}


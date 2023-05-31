const express = require('express');
const userRouter = express.Router();
const protectRoute = require('./authHelper');
const {getUser , getAllUser,getUserById, updateUser,deleteUser, getCookies,setCookies}=require('../controller/userController');


//user has options...
userRouter.route(':/id')
.patch(updateUser)
.delete(deleteUser)


//profile page
app.use(protectRoute);

userRouter.route('/userProfile')
.get(getUser)


//admin specific work
app.use(isAuthorised(['admin']));

userRouter.route()
.get(getAllUser);


module.exports = userRouter;
const express = require('express');
const userRouter = express.Router();
const protectRoute = require('./authHelper');
const {getUsers,postUser,getUserById, updateUser,deleteUser, getCookies,setCookies}=require('../controller/userController');

userRouter.route('/')
.get(protectRoute,getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

// userRouter.route('/:id')
// .get(getUserById);

userRouter.route('/getCookies')
.get(getCookies);
userRouter.route('/setCookies')
.get(setCookies);



module.exports = userRouter;
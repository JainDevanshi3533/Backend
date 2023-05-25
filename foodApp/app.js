//video 20..

const express = require('express');
const cookieParser= require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=> console.log('server is listening at port 3000'));

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use('/user', userRouter );
app.use('/auth', authRouter );





const express= require('express');
const app = express();

app.listen(3000);

app.get('/',(req,res)=>{
    // res.send('oooo');
    res.send('<h1><u>hellelo</u></h1>');
})

app.get('/about',(req,res)=>{
    res.send('<h1>About Page<h1>');
})

app.get('/more', (req,res)=>{

    // res.sendFile('D:\\VSworkspace\\Complete Backend\\express_server\\views\\more.html');
            // either write the absolute path or...write the relative path but also specify the root as the directory it is in.

    res.sendFile('./views/more.html', { root: __dirname});
})

app.get('/more_about',(req,res)=>{
    res.redirect('/about');
})

//404 page as a middleware..
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html', {root: __dirname});
})

//note...in normal server created using http only...there if we sent the wrong route ...the same result was shown as it is...but now..here , using this middleware ..it shows error page on the routes which are not defined
//note: Also,  the position of this middleware in the code is very important.
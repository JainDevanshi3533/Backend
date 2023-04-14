const http =require('http');
const fs= require('fs');
const server = http.createServer((req,res)=>{
    console.log('request has been made from browser to server ');
    // console.log(req);
    // console.log(req.method);
    // console.log(req.url);

    // res.setHeader('content-type','text/plain');
    // res.write('Hello ..This is Devanshi');

    res.setHeader('content-type', 'text/html');
    // res.write('<h1>Hello ..This is Devanshi</h1>');
    // res.end();

    let path='./views';
    switch(req.url){
        case '/':
            path+= '/index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+= '/about.html';
            res.statusCode=200;
            break;
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location', '/about');   // redirecting to /about    only
            res.end();
            break;
        default :
            path+= '/404.html';
            res.statusCode=404;
    }

    fs.readFile(path, (err, fileData)=>{
        if(err){
            console.log(err);
        }else{
            res.end(fileData);   //when only one res.write is to be done.
        }
    })

    // fs.readFile('./views/index.html', (err, fileData)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         // res.write(fileData);
    //         // res.end();
    //     //or
    //         res.end(fileData);   //when only one res.write is to be done.
    //     }
    // })
});

server.listen(3000, 'localhost',()=>{
    console.log('server is listening on port 3000');
})
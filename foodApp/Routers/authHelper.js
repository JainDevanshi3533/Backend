const jwt = require('jsonwebtoken');
const JWT_KEY = 'akafkj';
/*   jwt-> 
            1.header : contains algorithm for encryption
            2. payload: contain unique id;
            3. signature: signature made using-> header+ payload+ secret key.
*/
function protectRoute(req,res,next){
    if(req.cookies.isLoggedIn){
                                    //(token, secretkey)
        let isVerified = jwt.verify(req.cookies.isLoggedIn,JWT_KEY);
        if(isVerified){
           next(); 
        } else{
            return res.json({
                message:"User not verified"
            })
        }
    }else{
        return res.json({
            message:"Please login first"
        })
    }
}

module.exports= protectRoute;
const jwt = require('jsonwebtoken');
const Register = require('../models/registers');


const auth = async (req,res,next)=>{
    try{
        const token = res.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const user = Register.findOne({_id:verifyUser._id});
        console.log(user);

        next();


    }catch(err){
        res.send(err);

    }

}
module.exports= auth;
const { errorHandler, errorMsgs } = require("../utilities/errorHandle")
const { usersModel } = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const validateUser = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token,"\n");
        if(token === "null"){
            throw ("User is not loggedIn");
        }

        const  { user_id }  = jwt.verify(token, 'very_secret');
        console.log(user_id)
        const user = await usersModel.findOne({_id: user_id});
        console.log(user);
        if(!user){
           throw ("User isn't loggedIn!")
        }
        if(user.email !== "admin@admin.com"){
            throw ("User is not authorized!");
        }
        next();
    }catch(err){
        return errorHandler(res, err);
    }
}

module.exports = {
    validateUser
}
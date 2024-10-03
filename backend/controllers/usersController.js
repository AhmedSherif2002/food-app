const { usersModel } = require("../models/usersModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utilities/errorHandle");

const register = (req,res)=>{
    try{
        const user = req.body;
        let result;
        console.log(user);
        console.log("u:",user)
        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()){
            throw (validationErrors);
        }

        const saltRound = 10;
        const userPassword = user.password;
        delete user.password;
        delete user["confirm-password"];
        console.log(user);
        bcrypt.hash(userPassword, saltRound, async (err,hash)=>{
            if(err){
                throw ("error")
            }
            console.log(hash);
            console.log(usersModel)
            try{
                result = await usersModel.create({ ...user, password:hash });
                console.log("db document created",result);
                const token = jwt.sign({ user_id:result._id },"very_secret");
                res.status(201).json({
                    status: "success",
                    token
                });
            }catch(dberr){
                throw("database error",dberr);
            }
        })

        
        

    }catch(e){
        console.log(e);
        errorHandler(res,e);
    }

}

const login = async (req,res)=>{
    try{
        const user = req.body;
        const fetchedUser = await usersModel.findOne({email:user.email});
        if(!fetchedUser){
            throw ("User not found!");
        }
        console.log("email: ", fetchedUser)
        
        bcrypt.compare(user.password, fetchedUser.password, (err, result)=>{
            try{
                if(err){
                    throw("password error");
                }
                console.log(result);
                if(!result){
                    throw ("Invalid email or password")
                }else{
                    const token = jwt.sign({ user_id:fetchedUser._id },"very_secret")
                    res.status(201).json({
                        status:"success",
                        token
                    })
                }   
            }catch(e){
                console.log(e)
                errorHandler(res,e);
            }
        })
        

    }catch(err){
        console.log(err);
        errorHandler(res,err);
    }
}

module.exports = {
    register,
    login
}
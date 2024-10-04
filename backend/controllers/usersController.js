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

const getUser = async (req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            throw ("User is not logged in");
        }
        const { user_id } = jwt.verify(token, "very_secret");
        console.log(user_id);
        const user = await usersModel.findOne({ _id: user_id }).select({ password:0 }); 
        // delete user.password;
        console.log(user);
        res.status(200).json({
            status: "success",
            user: user
        })
    }catch(err){
        console.log(err);
        errorHandler(res,err);
    }
}

const logout = async (req,res)=>{
    try{
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if(!authHeader){
            throw ("No user is logged in");
        }

        const token = authHeader.split(" ")[1];

        const { user_id } = jwt.verify(token, "very_secret");
        const user = await usersModel.findOne({ _id: user_id });
        console.log(user);
    }catch(e){
        console.log(e)
        errorHandler(res, e);
    }
}

module.exports = {
    register,
    login,
    getUser
}
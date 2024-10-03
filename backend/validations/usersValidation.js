const { body } = require("express-validator");
const { usersModel } = require("../models/usersModel");

const registerValidation = ()=>{
    return [
        body("username").notEmpty().withMessage("username can't be empty"),
        body("email").notEmpty().withMessage("email can't be empty").custom(async (email)=>{
            console.log(email);
            const found = await usersModel.findOne({email:email});
            console.log(found);
            if(found){
                throw ("email is already used.");
            }
        }),
        body("password").notEmpty().withMessage("password can't be empty"),
        body("confirm-password").notEmpty().withMessage("confirm-password can't be empty").custom((pass, {req})=>{
            console.log(pass);
            if(pass !== req.body.password){
                throw("Passwords are incompatible");
            }else return true;
        }),
    ]
}

// loginValidation = ()=>{
//     return [
//         body("email").notEmpty().withMessage("email can't be empty"),
//         body("password").notEmpty().withMessage("password can't be empty")
//     ]
// }

module.exports = {
    registerValidation
}
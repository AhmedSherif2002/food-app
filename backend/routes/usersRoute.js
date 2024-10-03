const express = require("express");
const { registerValidation } = require("../validations/usersValidation");
const { register, login } = require("../controllers/usersController");
 
const usersRoute = express.Router();


usersRoute.post("/signup", registerValidation(),register)
usersRoute.post("/login", login)


module.exports = {
    usersRoute
}
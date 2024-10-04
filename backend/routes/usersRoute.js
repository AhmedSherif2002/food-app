const express = require("express");
const { registerValidation } = require("../validations/usersValidation");
const { register, login, getUser } = require("../controllers/usersController");
 
const usersRoute = express.Router();


usersRoute.post("/signup", registerValidation(),register)
usersRoute.post("/login", login)
usersRoute.get("/getUser", getUser)


module.exports = {
    usersRoute
}
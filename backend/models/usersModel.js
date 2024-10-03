const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/food-app');

const schema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // "confirm-password": String
})

const usersModel = mongoose.model("users",schema);

module.exports = {
    usersModel
}
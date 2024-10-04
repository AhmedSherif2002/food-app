const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/food-app');

const schema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: String
})

const productsModel = mongoose.model("products",schema);

module.exports = {
    productsModel
}
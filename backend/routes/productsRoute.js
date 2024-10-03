const { addProduct, getAllProducts } = require("../controllers/productsController");
const { validateUser } = require("../middlewares/userValidation");

const productsRoute = require("express").Router();

productsRoute.post("/addProduct", validateUser, addProduct);
productsRoute.get("/getProducts", getAllProducts);

module.exports = {
    productsRoute
}
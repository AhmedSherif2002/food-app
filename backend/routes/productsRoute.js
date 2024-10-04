const { addProduct, getAllProducts, deleteProduct, updateProduct } = require("../controllers/productsController");
const { validateUser } = require("../middlewares/userValidation");

const productsRoute = require("express").Router();

productsRoute.post("/addProduct", validateUser, addProduct);
productsRoute.get("/getProducts", getAllProducts);
productsRoute.delete("/deleteProduct/:id", validateUser, deleteProduct);
productsRoute.put("/updateProduct/:id", validateUser, updateProduct);

module.exports = {
    productsRoute
}
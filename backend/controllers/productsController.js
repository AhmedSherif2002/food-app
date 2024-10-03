const { productsModel } = require("../models/productsModel");
const { errorHandler, errorMsgs } = require("../utilities/errorHandle");

const addProduct = async (req,res)=>{
    try{
        console.log(req.body);
        const product = req.body;
        if(product.title === ""){
            throw ("Title is required");
        } 
        if(product.price === ""){
            throw ("Price is required");   
        }
        const fetchedProduct = await productsModel.find({ title: product.title });
        if(fetchedProduct.length !== 0){
            throw ("Product is already added");
        }

        const result = await productsModel.create(product);
        console.log(result);
        res.status(201).json({
            status: errorMsgs.SUCCESS,
        });
    }catch(e){
        console.log(e)
        errorHandler(res,e);
    }
}

const getAllProducts = async (req,res)=>{
    try{
        const products = await productsModel.find();
        console.log(products);
        res.status(201).json({
            status: errorMsgs.SUCCESS,
            products
        })
    }catch(e){
        console.log(e)
        errorHandler(res,e);
    }
}

module.exports = {
    addProduct,
    getAllProducts
}
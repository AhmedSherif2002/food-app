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
        const query = req.query;
        let category = "";
        if(Object.keys(query).length !== 0){
            console.log(query);
            console.log(query.category);
            category = query.category;
        }
        const products = category === "" ? await productsModel.find():await productsModel.find({ category: category });
        console.log("products: ",products);
        res.status(201).json({
            status: errorMsgs.SUCCESS,
            products
        })
    }catch(e){
        console.log(e)
        errorHandler(res,e);
    }
}

const deleteProduct = async (req,res)=>{
    try{
        const product_id = req.params.id;
        console.log(product_id);
        const result = await productsModel.deleteOne({ _id:product_id });
        console.log(result);
        res.status(201).json({
            status: errorMsgs.SUCCESS
        })
    }catch(err){
        console.log(err);
        errorHandler(res,err);
    }
}

const updateProduct = async (req, res)=>{
    try{
        const product_id = req.params.id;
        const product = req.body;
        if(product.title === ""){
            throw ("Title is required");
        } 
        if(product.price === ""){
            throw ("Price is required");   
        }
        console.log(product_id, product);
        const result = await productsModel.updateOne({ _id:product_id }, 
            { 
                title: product.title,
                description: product.description,
                price: product.price
            }
        );
        console.log(result);
        res.status(201).json({
            status: errorMsgs.SUCCESS
        })
    }catch(err){
        console.log(err);
        errorHandler(res,err);
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
}
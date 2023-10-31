const Product = require('../models/product')



//1
const getAllProductsStatic = async(req,res)=>{
   const products = await Product.find({company:"Ikea"})
    res.status(200).json({products, nbHits:products.length})
}


//2
const getAllProducts = async(req,res)=>{
    const products = await Product.find(req.query)
    res.status(200).json({products})
}






//export
module.exports = {getAllProductsStatic, getAllProducts}


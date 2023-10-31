const Product = require('../models/product')



//1
const getAllProductsStatic = async(req,res)=>{
    const search = 'ab'
    
    const products = await Product.find({name:{ $regex: search, $options: 'i'}})
   
    res.status(200).json({products, nbHits:products.length})
}


//2
const getAllProducts = async(req,res)=>{
    const {featured, company, name} = req.query
    const queryObject = {}
    
    //featured
    if(featured){
        queryObject.featured === "true"? true:false
    }

    //company
    if(company){
        queryObject.company = company
    }

    //name
    if(name){
        queryObject.name = { $regex: name, $options: 'i'}
    }

    const products = await Product.find(queryObject)
    res.status(200).json({products, nbHits: products.length})
}






//export
module.exports = {getAllProductsStatic, getAllProducts}


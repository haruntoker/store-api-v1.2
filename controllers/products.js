const Product = require('../models/product')



//1 testing
const getAllProductsStatic = async(req,res)=>{
    
    
    const products = await Product.find({}).sort('-name price')
   
    res.status(200).json({products, nbHits:products.length})
}


//2 
const getAllProducts = async(req,res)=>{
    const {featured, company, name, sort} = req.query
    const queryObject = {}
    
    //featured
    if(featured){
        queryObject.featured === "true" //? true:false
    }

    //company
    if(company){
        queryObject.company = company
    }

    //name
    if(name){
        queryObject.name = { $regex: name, $options: 'i'}
    }
    
    




let result = Product.find(queryObject)
if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList)
}else{
    result = result.sort('createdAt')
}

const products = await result

res.status(200).json({products, nbHits: products.length})
}






//export
module.exports = {getAllProductsStatic, getAllProducts}


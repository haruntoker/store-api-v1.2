const Product = require('../models/product')



//1 testing
const getAllProductsStatic = async(req,res)=>{
    
    
    const products = await Product.find({price:{$gt:90}})
    .sort('price')
    .select('name price rating')
    
   
    res.status(200).json({products, nbHits:products.length})
}


//2 
const getAllProducts = async(req,res)=>{
    const {featured, company, name, sort, fields, numericFilter} = req.query
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
    
    // numeric Filter
    if(numericFilter){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx, (match)=>`-${operatorMap[match]}-`)
       
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }



//sorting
let result = Product.find(queryObject)
if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList)
}else{
    result = result.sort('createdAt')
}

//fields filtering
if(fields){
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList)
}

const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10
const skip = (page - 1) * limit;

result = result.skip(skip).limit(limit)

const products = await result

res.status(200).json({products, nbHits: products.length})
}






//export
module.exports = {getAllProductsStatic, getAllProducts}

